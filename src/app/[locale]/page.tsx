// src/app/[locale]/page.tsx
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { siteConfig } from "@/data/site-config";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Contact } from "@/components/sections/Contact";
import { buildLanguageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.tagline,
  alternates: { languages: buildLanguageAlternates("/") },
};

export default function Home() {
  return (
    <>
      <AnimatedSection>
        <Hero />
      </AnimatedSection>
      <AnimatedSection>
        <About />
      </AnimatedSection>
      <AnimatedSection>
        <Skills />
      </AnimatedSection>
      <AnimatedSection>
        <Timeline />
      </AnimatedSection>
      <AnimatedSection>
        <Contact />
      </AnimatedSection>
    </>
  );
}