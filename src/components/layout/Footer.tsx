// src/components/layout/Footer.tsx
import Link from "next/link";
import { Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { WhatsappIcon, GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { siteConfig } from "@/data/site-config";

const socials = [
  { label: "Email", href: `mailto:${siteConfig.social.email}`, icon: Mail },
  { label: "WhatsApp", href: `https://wa.me/${siteConfig.social.whatsapp}`, icon: WhatsappIcon },
  { label: "GitHub", href: siteConfig.social.github, icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedinIcon },
];

export async function Footer() {
  const year = new Date().getFullYear();
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-text-muted sm:flex-row">
        <p className="font-mono">
          &copy; {year} {siteConfig.name}. {t("rights")}
        </p>

        <div className="flex items-center gap-4">
          {socials.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              <Icon size={18} />
            </Link>
          ))}
        </div>
        <p className="font-mono">{t("builtWith")}</p>
      </div>
    </footer>
  );
}