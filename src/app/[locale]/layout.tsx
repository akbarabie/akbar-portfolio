import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/data/site-config";
import { BackgroundDecoration } from "@/components/ui/BackgroundDecoration";
import "../globals.css"; // naik satu level karena layout.tsx sekarang di dalam [locale]/

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: siteConfig.title,
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Wajib: mengaktifkan static rendering per-locale.
  // Tanpa ini, next-intl fallback ke headers() untuk baca locale,
  // yang memaksa SEMUA halaman jadi dynamic render (buruk untuk performa/SEO).
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground antialiased">
        <BackgroundDecoration />
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            {children}
          </ThemeProvider>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}