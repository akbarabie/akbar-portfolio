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
  | "dataset"
  | "methodology"
  | "featureEngineering"
  | "modelDevelopment"
  | "modelEvaluation"
  | "architecture"
  | "deployment"
  | "impact";

export interface ProjectSection {
  key: SectionKey;
  // 1 elemen -> dirender sebagai paragraf. >1 elemen -> dirender sebagai bullet list.
  content: string[];
}

export interface ProjectLinks {
  github?: string;
  liveDemo?: string;
}

export interface ProjectAssets {
  cover: string; // path relatif ke /public, wajib diisi walau file fisiknya belum ada
  screenshots?: string[];
  architectureDiagram?: string;
}

export interface Project {
  slug: string; // dipakai di /projects/[slug]
  title: string;
  category: ProjectCategory;
  year: string;
  tagline: string; // one-liner buat card di homepage
  techStack: string[];
  links: ProjectLinks;
  assets: ProjectAssets;
  sections: ProjectSection[];
  featured?: boolean; // flag flagship project (Investor Risk Profiling -> AI Playground)
}