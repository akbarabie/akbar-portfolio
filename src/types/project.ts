// src/types/project.ts

export type ProjectCategory = "data-analyst" | "data-scientist" | "data-engineer";

// Section key yang tersedia. Tidak semua project pakai semua key — tiap project
// cuma include section yang relevan di array `sections`-nya.
//
// Label tiap key hidup di messages/*.json ("projects.sections.*"), supaya tetap
// bilingual tanpa menduplikasi paragraf panjang (yang English-only by design).
export type SectionKey =
  | "businessProblem"
  | "classDefinition"
  | "categories"
  | "dataset"
  | "methodology"
  | "featureEngineering"
  | "modelDevelopment"
  | "modelEvaluation"
  | "architecture"
  | "deployment"
  | "impact"
  | "aiAgent";

export interface ProjectSection {
  key: SectionKey;
  content: string[];
  contentId?: string[];
}

export interface ProjectLinks {
  github?: string;
  liveDemo?: string;
}

export interface ProjectAssets {
  cover: string;
  screenshots?: string[];
  architectureDiagram?: string;
}

export interface Project {
  slug: string;
  title: string;
  // Semua role yang benar-benar dikerjakan di project ini, diurutkan sesuai
  // urutan pengerjaan aktual. Index [0] dipakai sebagai kategori "primer" di
  // tempat yang cuma butuh satu (mis. ProjectCoverPlaceholder icon).
  categories: ProjectCategory[];
  year: string;
  tagline: string;
  taglineId?: string;
  techStack: string[];
  links: ProjectLinks;
  assets: ProjectAssets;
  sections: ProjectSection[];
  featured?: boolean;
}