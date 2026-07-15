// src/app/[locale]/projects/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ProjectCoverPlaceholder } from "@/components/ui/ProjectCoverPlaceholder";
import { GithubIcon } from "@/components/ui/icons"; // sesuaikan kalau nama export beda
import { publicAssetExists } from "@/lib/asset-exists";
import { getLocalizedTagline, getLocalizedSectionContent } from "@/lib/localized-project";
import { projects } from "@/data/projects";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const tagline = getLocalizedTagline(project, locale);

  return {
    title: project.title,
    description: tagline,
    openGraph: {
      title: project.title,
      description: tagline,
      images: [project.assets.cover],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const t = await getTranslations("projects");
  const hasCover = publicAssetExists(project.assets.cover);
  const tagline = getLocalizedTagline(project, locale);

  return (
    <article>
      <Container className="py-24">
        <AnimatedSection>
          <Badge className="mb-4">{t(`categories.${project.category}`)}</Badge>
          <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
            {project.title}
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-text-muted">{tagline}</p>

          <div className="mb-10 flex flex-wrap gap-3">
            {project.links.github && (
              <Button asChild variant="outline">
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="size-4" />
                  {t("viewOnGithub")}
                </a>
              </Button>
            )}
            {project.links.liveDemo && (
              <Button asChild>
                <a href={project.links.liveDemo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4" />
                  {t("viewLiveDemo")}
                </a>
              </Button>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-2xl border border-border">
            {hasCover ? (
              <Image
                src={project.assets.cover}
                alt={project.title}
                fill
                priority
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-cover"
              />
            ) : (
              <ProjectCoverPlaceholder category={project.category} title={project.title} />
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mb-12 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs text-text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </AnimatedSection>

        <div className="max-w-3xl space-y-10">
          {project.sections.map((section) => {
            const paragraphs = getLocalizedSectionContent(section, locale);
            return (
              <AnimatedSection key={section.key}>
                <h2 className="mb-3 text-2xl font-semibold text-foreground">
                  {t(`sections.${section.key}`)}
                </h2>
                {paragraphs.length === 1 ? (
                  <p className="leading-relaxed text-text-muted">{paragraphs[0]}</p>
                ) : (
                  <ul className="list-inside list-disc space-y-2 leading-relaxed text-text-muted">
                    {paragraphs.map((paragraph, i) => (
                      <li key={i}>{paragraph}</li>
                    ))}
                  </ul>
                )}
              </AnimatedSection>
            );
          })}
        </div>
      </Container>
    </article>
  );
}