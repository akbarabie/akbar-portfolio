import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { timelineData } from "@/data/timeline";

export async function Timeline() {
  const t = await getTranslations("timeline");

  return (
    <section id="timeline" className="py-24">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 text-text-muted max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="relative">
          <div className="timeline-line" aria-hidden="true" />
          <div className="flex flex-col">
            {timelineData.map((entry, index) => (
              <TimelineItem
                key={entry.id}
                index={index}
                institution={entry.institution}
                period={t(`items.${entry.id}.period`)}
                title={t(`items.${entry.id}.title`)}
                description={t(`items.${entry.id}.description`)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}