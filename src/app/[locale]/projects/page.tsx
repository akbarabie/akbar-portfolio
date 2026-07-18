// src/app/[locale]/projects/page.tsx
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";
import { routing } from "@/i18n/routing";
import { buildLanguageAlternates } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { languages: buildLanguageAlternates("/projects") },
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");

  return (
    <Container className="py-24">
      <AnimatedSection>
        <h1 className="mb-4 text-4xl font-bold text-foreground">{t("title")}</h1>
        <p className="mb-12 max-w-2xl text-text-muted">{t("subtitle")}</p>
      </AnimatedSection>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <AnimatedSection key={project.slug}>
            <ProjectCard project={project} />
          </AnimatedSection>
        ))}
      </div>
    </Container>
  );
}
