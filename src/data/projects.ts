// src/data/projects.ts
import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "investor-risk-profiling",
    title: "Investor Risk Profile Classification for MiFID II Compliance",
    category: "data-scientist",
    year: "2026",
    tagline:
      "4-class investor risk classifier on 21K+ records, with zero high-risk misclassifications.",
    techStack: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "XGBoost",
      "SciPy (Stats)",
      "Streamlit",
      "Hugging Face Spaces",
    ],
    links: {
      github: "https://github.com/akbarabie/risk_profile_prediction", // TODO: isi link repo
      liveDemo: "https://huggingface.co/spaces/Mrabb20/risk_profile_prediction", // TODO: isi link Streamlit / HF Spaces
    },
    assets: {
      cover: "/images/projects/risk_profile.png", // placeholder, file belum ada
      screenshots: [],
      architectureDiagram: undefined,
    },
    featured: true,
    sections: [
      {
        key: "businessProblem",
        content: [
          "Relationship Manager and Compliance teams needed a systematic way to classify investor risk profiles — Conservative, Income, Balanced, Aggressive — to meet MiFID II-driven suitability assessment requirements.",
        ],
      },
      {
        key: "classDefinition",
        content: [
          "Conservative: prioritizes capital preservation above growth, with minimal tolerance for volatility.",
          "Income: seeks steady, low-volatility returns through dividend- and interest-generating assets rather than capital appreciation.",
          "Balanced: accepts moderate volatility in exchange for a blend of income and growth.",
          "Aggressive: prioritizes long-term capital growth and can tolerate significant short-term volatility, including heavier equity exposure.",
        ],
      },
      {
        key: "dataset",
        content: [
          "21,000+ investor records spanning demographic, financial, and behavioral attributes.",
        ],
      },
      {
        key: "methodology",
        content: [
          "Designed a leakage-safe pipeline architecture, starting with a stratified train-test split to preserve the distribution of all four risk categories before any transformation was applied.",
        ],
      },
      {
        key: "featureEngineering",
        content: [
          "Applied IQR-based outlier capping and built a ColumnTransformer combining StandardScaler for numeric features with a hybrid One-Hot/Ordinal encoding scheme for categoricals. Feature relevance was validated through ANOVA F-tests and Chi-Square tests, and multicollinearity was resolved via correlation-driven feature selection.",
        ],
      },
      {
        key: "modelDevelopment",
        content: [
          "Benchmarked five algorithms — KNN, SVM, Decision Tree, Random Forest, XGBoost — via 5-fold cross-validation, then tuned the best performer with RandomizedSearchCV.",
        ],
      },
      {
        key: "modelEvaluation",
        content: [
          "Improved F1-Macro by roughly 1.3 points over baseline while achieving zero high-risk misclassifications — no Conservative investor was ever misclassified as Aggressive, a critical safety property for regulatory risk tooling.",
        ],
      },
      {
        key: "deployment",
        content: [
          "Deployed as an interactive Streamlit web app on Hugging Face Spaces, with a custom preprocessing transformer module for production-safe model serialization.",
        ],
      },
    ],
  },
  {
    slug: "pizza-sales-performance",
    title: "Pizza Sales Performance 2025 & Q1 Projection 2026",
    category: "data-analyst",
    year: "2026",
    tagline:
      "50K+ transaction analysis validating a high-margin 'Golden Hour' to support a 20% Q1 growth target.",
    techStack: [
      "Python",
      "Pandas",
      "NumPy",
      "SciPy (Stats)",
      "Matplotlib",
      "Seaborn",
      "Tableau Desktop",
      "Microsoft Excel",
    ],
    links: {
      github: "https://github.com/akbarabie/pizza-sales-analysis/tree/main", // TODO: isi link repo
      liveDemo: "https://public.tableau.com/views/M01_Muhammad_Akbar_Suharbi/DashboardMain?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link", // TODO: isi link Tableau Public (kalau dipublish)
    },
    assets: {
      cover: "/images/projects/pizza.webp", // placeholder, file belum ada
      screenshots: [],
      architectureDiagram: undefined,
    },
    sections: [
      {
        key: "businessProblem",
        content: [
          "The business needed to identify operational inefficiencies and revenue-generating patterns within its retail transaction data to support a 20% growth target for Q1 2026.",
        ],
      },
      {
        key: "dataset",
        content: [
          "50,000+ historical retail transactions, cleaned and restructured for time-series and categorical analysis.",
        ],
      },
      {
        key: "methodology",
        content: [
          "Built a data cleansing pipeline in Python to resolve time-delta anomalies in the raw transaction logs, then applied descriptive statistics (skewness and kurtosis) alongside inferential hypothesis testing (independent t-test) to validate patterns in the cleaned data.",
        ],
      },
      {
        key: "impact",
        content: [
          "Statistically confirmed a high-margin 'Golden Hour' during lunch peaks, translating the finding into actionable inventory and promotional strategies.",
        ],
      },
      {
        key: "deployment",
        content: [
          "Delivered the analysis as an interactive Executive Dashboard in Tableau, giving stakeholders a self-serve view of the underlying patterns.",
        ],
      },
    ],
  },
  {
    slug: "medical-report-crr",
    title: "Medical Report CRR",
    category: "data-engineer",
    year: "2021",
    tagline:
      "Web-based CRR reporting platform — automated data migration and dashboarding, cutting manual reporting time by 70%.",
    techStack: [
      "PHP",
      "CodeIgniter",
      "MySQL",
      "JavaScript",
      "Bootstrap",
      "CSS",
      "Microsoft Excel",
    ],
    links: {
      github: "#", // TODO: isi link repo
      liveDemo: "#", // kemungkinan besar kosong permanen — internal tool, bukan public-facing
    },
    assets: {
      cover: "/images/projects/crr.webp", // placeholder, file belum ada
      screenshots: [],
      architectureDiagram: undefined,
    },
    sections: [
      {
        key: "businessProblem",
        content: [
          "Manual processing of credit recovery report (CRR) data created reporting delays and inconsistent, error-prone data visualization for stakeholders monitoring recovery performance.",
        ],
      },
      {
        key: "architecture",
        content: [
          "Built a web-based platform integrating a MySQL database with a CodeIgniter backend and Bootstrap frontend, handling the migration of legacy report data into a structured schema suited for the new summary dashboard.",
        ],
      },
      {
        key: "deployment",
        content: [
          "Delivered as an interactive summary dashboard, replacing manual report compilation with an automated, queryable interface.",
        ],
      },
      {
        key: "impact",
        content: [
          "Reduced manual reporting time by 70% and improved the accuracy of stakeholder-facing data visualizations.",
        ],
      },
    ],
  },
];