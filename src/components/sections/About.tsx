import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { StatCard } from "@/components/ui/StatCard";
import { PillarCard } from "@/components/ui/PillarCard";
import { coreStack } from "@/data/skills";
import { siteConfig } from "@/data/site-config";

const STAT_KEYS = ["experience", "employees", "efficiency", "portfolio"] as const;
const PILLARS = [
  { roleIndex: 0, descriptionKey: "da" },
  { roleIndex: 1, descriptionKey: "ds" },
  { roleIndex: 2, descriptionKey: "de" },
] as const;

export async function About() {
  const t = await getTranslations("about");

  return (
    <section id="about" className="py-24 sm:py-32">
      <Container>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start">
          <PhotoFrame
            src="/images/akbar2.png"
            alt={`Foto ${siteConfig.name}`}
            className="mx-auto max-w-xs lg:mx-0"
            aspectRatio="aspect-[3/4]"
          />

          <div className="space-y-10">
            <p className="text-lg leading-relaxed text-text-muted">{t("bio")}</p>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
                {t("education.title")}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-text-muted">
                <li>{t("education.s2")}</li>
                <li>{t("education.s1")}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
                {t("techStackTitle")}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {coreStack.map((skill) => (
                  <span
                    key={skill.name}
                    className="rounded-full border border-white/10 bg-card px-3 py-1 text-xs font-medium text-foreground/80"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STAT_KEYS.map((key) => (
            <StatCard
              key={key}
              value={t(`stats.${key}.value`)}
              label={t(`stats.${key}.label`)}
            />
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            {t("projectsTitle")}
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {PILLARS.map(({ roleIndex, descriptionKey }) => (
              <PillarCard
                key={descriptionKey}
                role={siteConfig.role[roleIndex]}
                description={t(`projects.${descriptionKey}`)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}