// src/lib/localized-project.ts
import type { Project, ProjectSection } from "@/types/project";

export function getLocalizedTagline(project: Project, locale: string): string {
  return locale === "id" && project.taglineId ? project.taglineId : project.tagline;
}

export function getLocalizedSectionContent(section: ProjectSection, locale: string): string[] {
  return locale === "id" && section.contentId ? section.contentId : section.content;
}