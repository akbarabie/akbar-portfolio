"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LABELS: Record<string, string> = { id: "ID", en: "EN" };

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      role="group"
      aria-label="Ganti bahasa / Switch language"
      className="flex items-center gap-1 rounded-full border border-white/10 p-0.5 text-xs font-medium"
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-pressed={locale === loc}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            locale === loc
              ? "bg-accent text-white"
              : "text-foreground/60 hover:text-foreground"
          }`}
        >
          {LABELS[loc]}
        </button>
      ))}
    </div>
  );
}