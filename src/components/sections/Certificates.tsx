import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { CertificateGallery } from "@/components/ui/CertificateGallery";
import { certificates } from "@/data/certificates";

export async function Certificates() {
  const t = await getTranslations("certificates");

  return (
    <section id="certificates" className="py-24 sm:py-32">
      <Container>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 max-w-2xl text-text-muted">{t("subtitle")}</p>

        <div className="mt-12">
          <CertificateGallery
            certificates={certificates}
            labels={{
              issued: t("issued"),
              credentialId: t("credentialId"),
              viewLarger: t("viewLarger"),
              close: t("close"),
              previous: t("previous"),
              next: t("next"),
              dragHint: t("dragHint"),
            }}
          />
        </div>
      </Container>
    </section>
  );
}
