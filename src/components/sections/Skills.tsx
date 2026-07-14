import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { skillCategories } from "@/data/skills";

export async function Skills() {
  const t = await getTranslations("skills");

  return (
    <section id="skills" className="py-24 sm:py-32">
      <Container>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category) => (
            <div
              key={category.key}
              className="rounded-2xl border border-white/10 bg-card p-6 shadow-lg shadow-black/20 transition-transform duration-300 hover:-translate-y-1"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
                {t(`categories.${category.key}`)}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center justify-between text-sm text-text-muted"
                  >
                    <span>{skill.name}</span>
                    {skill.comingSoon && (
                      <Badge variant="outline" className="text-[10px]">
                        {t("comingSoon")}
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}