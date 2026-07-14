import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RotatingText } from "@/components/ui/RotatingText";
import { siteConfig } from "@/data/site-config";

export function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-12">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {siteConfig.name}
            </h1>

            <p className="mt-3 text-2xl md:text-3xl font-medium text-accent">
              <RotatingText roles={siteConfig.role} />
            </p>

            <p className="mt-6 max-w-xl text-lg text-text-muted">
              {siteConfig.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <a href="projects">View Projects</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/cv/cv_mas.pdf" download>
                  Download CV
                </a>
              </Button>
            </div>
          </div>

          <PhotoFrame
            src="/images/akbar.png"
            alt={`Foto profesional ${siteConfig.name}`}
            priority
            aspectRatio="aspect-[2/3]" //coba ini kalau 4/5 masih kurang pas
          />
        </div>
      </Container>
    </section>
  );
}