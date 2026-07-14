export interface Skill {
  name: string;
  comingSoon?: boolean;
  highlight?: boolean; // true = ikut ditampilkan di strip "Core Tech Stack" pada About
}

export interface SkillCategory {
  key: "programming" | "machineLearning" | "data" | "deployment";
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    key: "programming",
    skills: [
      { name: "Python", highlight: true },
      { name: "SQL", highlight: true },
      { name: "JavaScript" },
      { name: "Golang", comingSoon: true },
    ],
  },
  {
    key: "machineLearning",
    skills: [
      { name: "Scikit-learn", highlight: true },
      { name: "XGBoost" },
      { name: "PyTorch", highlight: true },
      { name: "TensorFlow", highlight: true },
    ],
  },
  {
    key: "data",
    skills: [
      { name: "Pandas", highlight: true },
      { name: "NumPy" },
      { name: "PostgreSQL", highlight: true },
      { name: "BigQuery" },
    ],
  },
  {
    key: "deployment",
    skills: [
      { name: "Docker" },
      { name: "FastAPI", highlight: true },
      { name: "Vercel" },
      { name: "Render" },
    ],
  },
];

// Dipakai khusus untuk strip "Core Tech Stack" di About Me
export const coreStack: Skill[] = skillCategories.flatMap((category) =>
  category.skills.filter((skill) => skill.highlight)
);