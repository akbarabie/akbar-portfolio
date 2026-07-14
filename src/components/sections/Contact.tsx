import { getTranslations } from "next-intl/server";
import { Mail } from "lucide-react";
import { WhatsappIcon, GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ContactForm } from "./ContactForm";
import { siteConfig } from "@/data/site-config";

export async function Contact() {
  const t = await getTranslations("contact");
  const whatsappUrl = `https://wa.me/${siteConfig.social.whatsapp}`;

  const links = [
    { href: `mailto:${siteConfig.social.email}`, icon: Mail, label: siteConfig.social.email },
    { href: whatsappUrl, icon: WhatsappIcon, label: t("chatWhatsapp") },
    { href: siteConfig.social.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
    { href: siteConfig.social.github, icon: GithubIcon, label: "GitHub" },
  ];

  return (
    <section id="contact" className="py-24">
      <Container>
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{t("title")}</h2>
          <p className="mt-3 max-w-xl text-text-muted">{t("subtitle")}</p>
        </AnimatedSection>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <AnimatedSection className="space-y-4">
            {links.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent/50"
              >
                <Icon size={20} className="text-accent" />
                <span className="text-foreground">{label}</span>
              </a>
            ))}
          </AnimatedSection>

          <AnimatedSection>
            <ContactForm />
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}