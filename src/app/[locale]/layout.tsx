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
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";
import { BackgroundDecoration } from "@/components/ui/BackgroundDecoration";
import "../globals.css"; // naik satu level karena layout.tsx sekarang di dalam [locale]/
import { SITE_URL } from "@/lib/seo";

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
     // metadataBase WAJIB ada — tanpa ini, Next.js gak bisa resolve URL
    // relatif (og:image, alternates.languages, dst) jadi absolute URL yang
    // valid. Tanpa metadataBase, og:image sebelumnya generate URL relatif
    // yang DITOLAK sama Facebook/Twitter/LinkedIn crawler (mereka wajib
    // absolute URL) — jadi social preview card kemungkinan besar gak
    // muncul sama sekali sebelum fix ini.
    metadataBase: new URL(SITE_URL),
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
        <PersonJsonLd />
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