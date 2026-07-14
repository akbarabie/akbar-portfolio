// src/components/layout/Footer.tsx
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
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
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 text-sm text-text-muted sm:grid sm:grid-cols-3 sm:items-center">
        <div className="inline-flex items-center gap-1.5 font-mono sm:justify-self-start">
          <MapPin size={13} className="shrink-0" />
          {siteConfig.location}
        </div>

        <div className="flex items-center gap-4 sm:justify-self-center">
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

        <div className="text-center font-mono leading-relaxed sm:justify-self-end sm:text-right">
          <p>&copy; {year} {siteConfig.name}.</p>
          <p>{t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}