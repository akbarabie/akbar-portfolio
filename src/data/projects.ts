// src/data/projects.ts
import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "investor-risk-profiling",
    title: "Investor Risk Profile Classification for MiFID II Compliance",
    categories: ["data-scientist"],
    year: "2026",
    tagline:
      "4-class investor risk classifier on 21K+ records, with zero high-risk misclassifications.",
    taglineId: 
      "Klasifikasi profil risiko investor 4-kelas pada 21K+ catatan, tanpa salah klasifikasi risiko tinggi.",
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
      github: "https://github.com/akbarabie/risk_profile_prediction",
      liveDemo: "https://huggingface.co/spaces/Mrabb20/risk_profile_prediction",
    },
    assets: {
      cover: "/images/projects/risk_profile.png",
      screenshots: [],
      architectureDiagram: undefined,
    },
    // TODO: catatan dari sesi sebelumnya — ini kandidat demo utama AI Playground,
    // tapi keputusan featured/AI Playground belum difinalisasi. Belum diaktifkan
    // di sini biar konsisten sama state project sebelum perubahan ini.
    sections: [
      {
        key: "businessProblem",
        content: [
          "Relationship Manager and Compliance teams needed a systematic way to classify investor risk profiles — Conservative, Income, Balanced, Aggressive — to meet MiFID II-driven suitability assessment requirements.",
        ],
        contentId: [
          "Tim Relationship Manager dan Compliance membutuhkan cara sistematis untuk mengklasifikasikan profil risiko investor — Conservative, Income, Balanced, Aggressive — guna memenuhi persyaratan penilaian kesesuaian (suitability assessment) yang diamanatkan MiFID II."
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
        contentId: [
          "Conservative: mengutamakan pelestarian modal di atas pertumbuhan, dengan toleransi minimal terhadap volatilitas.", "Income: mengincar imbal hasil stabil dan berisiko rendah melalui aset penghasil dividen dan bunga, bukan kenaikan nilai modal.", "Balanced: menerima volatilitas moderat demi kombinasi antara penghasilan dan pertumbuhan.", "Aggressive: mengutamakan pertumbuhan modal jangka panjang dan mampu menoleransi volatilitas jangka pendek yang signifikan, termasuk eksposur saham yang lebih besar."
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
    categories: ["data-analyst"],
    year: "2026",
    tagline:
      "50K+ transaction analysis validating a high-margin 'Golden Hour' to support a 20% Q1 growth target.",
    taglineId: 
      "Analisis 50K+ transaksi yang memvalidasi 'Golden Hour' bermargin tinggi untuk mendukung target pertumbuhan Q1 sebesar 20%.",
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
      github: "https://github.com/akbarabie/pizza-sales-analysis/tree/main",
      liveDemo: "https://public.tableau.com/views/M01_Muhammad_Akbar_Suharbi/DashboardMain?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    },
    assets: {
      cover: "/images/projects/pizza.webp",
      screenshots: [],
      architectureDiagram: undefined,
    },
    sections: [
      {
        key: "businessProblem",
        content: [
          "The business needed to identify operational inefficiencies and revenue-generating patterns within its retail transaction data to support a 20% growth target for Q1 2026.",
        ],
        contentId: [
          "Bisnis ini membutuhkan identifikasi inefisiensi operasional dan pola penghasil pendapatan dari data transaksi ritelnya, untuk mendukung target pertumbuhan 20% pada Q1 2026."
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
        contentId: [
          "Secara statistik mengonfirmasi adanya 'Golden Hour' bermargin tinggi saat jam makan siang, dan menerjemahkan temuan tersebut menjadi strategi inventori dan promosi yang bisa langsung dieksekusi."
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
    categories: ["data-engineer"],
    year: "2021",
    tagline:
      "Web-based CRR reporting platform — automated data migration and dashboarding, cutting manual reporting time by 70%.",
    taglineId:
      "Platform pelaporan CRR berbasis web — migrasi data dan dashboarding otomatis, memangkas waktu pelaporan manual sebesar 70%.",
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
      github: "#",
      liveDemo: "#",
    },
    assets: {
      cover: "/images/projects/crr.webp",
      screenshots: [],
      architectureDiagram: undefined,
    },
    sections: [
      {
        key: "businessProblem",
        content: [
          "Manual processing of credit recovery report (CRR) data created reporting delays and inconsistent, error-prone data visualization for stakeholders monitoring recovery performance.",
        ],
        contentId: [
          "Pemrosesan manual data credit recovery report (CRR) menyebabkan keterlambatan pelaporan serta visualisasi data yang tidak konsisten dan rawan kesalahan bagi stakeholder yang memantau kinerja recovery."
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
        contentId: [
          "Memangkas waktu pelaporan manual sebesar 70% dan meningkatkan akurasi visualisasi data yang disajikan kepada stakeholder."
        ],
      },
    ],
  },
  {
    slug: "indonesian-news-classification",
    title: "Automatic Indonesian News Classification",
    categories: ["data-scientist"],
    year: "2026", // TODO: confirm — inferred from Hacktiv8 timing, not stated in README
    tagline:
      "End-to-end NLP pipeline classifying Indonesian news headlines into 5 categories with a 4-model ensemble, deployed for editorial teams.",
    taglineId:
      "Pipeline NLP end-to-end yang mengklasifikasikan judul berita Indonesia ke 5 kategori dengan ensemble 4 model, di-deploy untuk tim editorial.",
    techStack: [
      "Python",
      "TensorFlow",
      "Keras",
      "Scikit-learn",
      "Gensim (Word2Vec)",
      "Sastrawi",
      "Streamlit",
      "Streamlit Community Cloud",
    ],
    links: {
      github: "https://github.com/akbarabie/indonesian-news-classification-ann",
      liveDemo: "https://indonesian-news-classification.streamlit.app/",
    },
    assets: {
      cover: "/images/projects/image_news.png",
      screenshots: [],
      architectureDiagram: undefined,
    },
    sections: [
      {
        key: "businessProblem",
        content: [
          "Digital newsrooms still tag fresh articles into categories such as finance, sport, and travel manually the moment a headline is written — a slow step prone to inconsistency between editors under publishing pressure. Built an NLP classifier that predicts a headline's category from its text alone, giving editorial teams a fast, consistent first-pass suggestion to confirm or correct instead of deciding from a blank slate.",
        ],
        contentId: [
          "Redaksi berita digital masih menandai kategori artikel (finance, sport, travel, dll) secara manual begitu judul ditulis — langkah yang lambat dan rawan tidak konsisten antar editor di bawah tekanan tenggat penerbitan. Membangun classifier NLP yang memprediksi kategori berita hanya dari teksnya, memberi tim editorial saran awal yang cepat dan konsisten untuk dikonfirmasi atau dikoreksi, alih-alih menentukan dari nol."
        ],
      },
      {
        key: "categories",
        content: [
          "Finance — 43.8% of the modeling dataset.",
          "Travel — 20.0% of the dataset.",
          "Health — 15.2% of the dataset.",
          "Oto (automotive) — 13.5% of the dataset.",
          "Sport — 7.5% of the dataset, the smallest and most imbalanced class.",
        ],
        contentId: [
          "Finance — 43.8% dari dataset pemodelan.",
          "Travel — 20.0% dari dataset.",
          "Health — 15.2% dari dataset.",
          "Oto (otomotif) — 13.5% dari dataset.",
          "Sport — 7.5% dari dataset, kelas terkecil dan paling tidak seimbang."
        ],
      },
      {
        key: "dataset",
        content: [
          "91,017 headlines scraped from detik.com (January–June 2020), narrowed from 9 original categories to the 5 in scope and deduplicated, leaving 32,318 headlines with a 5.8x imbalance between the largest and smallest class.",
        ],
      },
      {
        key: "methodology",
        content: [
          "Text cleaning (lowercasing, non-alphabet removal, Indonesian stopword removal via Sastrawi), a stratified 70/15/15 train-validation-test split, and full seed control across random, NumPy, and TensorFlow for end-to-end reproducibility.",
        ],
      },
      {
        key: "featureEngineering",
        content: [
          "Tokenized headlines with a Keras Tokenizer (10,000-word vocabulary, padded to 15 tokens) and applied class_weight during training to counter the 5.8x class imbalance, guided by EDA findings on headline length and word frequency per category.",
        ],
      },
      {
        key: "modelDevelopment",
        content: [
          "Benchmarked a Dense ANN (Embedding → GlobalAveragePooling1D → Dense) trained from scratch, then improved on it with a Functional-API TextCNN using parallel Conv1D branches (kernel sizes 2, 3, 4) to capture bigram/trigram/four-gram patterns. Combined three TextCNN variants with a fourth variant using Word2Vec-pretrained embeddings (trained only on the training split to avoid leakage) through a soft-voting ensemble.",
        ],
      },
      {
        key: "modelEvaluation",
        content: [
          "The 4-model ensemble improved F1-Macro to 0.8929 from a 0.8896 Dense ANN benchmark. Finance and travel remained the most confused pair — a vocabulary-overlap limitation rather than an architecture gap — while class_weight kept recall high (0.95) on sport, the smallest class.",
        ],
      },
      {
        key: "deployment",
        content: [
          "Deployed as a 3-page Streamlit app — EDA, and single/batch prediction with an adjustable confidence threshold, CSV export, and a manual-review flag for low-confidence predictions — on Streamlit Community Cloud.",
        ],
      },
    ],
  },
  {
    slug: "smart-pharma-inventory-intelligence",
    title: "Smart Pharma Inventory Intelligence",
    categories: ["data-engineer", "data-analyst", "data-scientist"],
    year: "2026", // TODO: confirm — inferred from Hacktiv8 timing
    tagline:
      "Demand forecasting, expiry-risk detection, and an AI procurement assistant for a vital-medicine warehouse — built solo across all three data roles.",
    taglineId:
      "Sistem peramalan stok, deteksi risiko kadaluwarsa, dan asisten pengadaan berbasis AI untuk gudang obat vital — dikerjakan solo lintas tiga peran data.",
    techStack: [
      "Python",
      "Apache Airflow",
      "MinIO",
      "Great Expectations",
      "PostgreSQL (Neon)",
      "Prophet",
      "Scikit-learn",
      "API Google Gemini API",
      "Streamlit",
      "Docker Compose",
      "LLM",
      "AI Agent",
    ],
    links: {
      github: "https://github.com/akbarabie/smart_pharma_inventory", // TODO: isi link repo
      liveDemo: "https://smart-pharma-inventory.streamlit.app/",
    },
    assets: {
      cover: "/images/projects/smart_pharma.png", // TODO: isi cover, file belum ada
      screenshots: [],
      architectureDiagram: undefined,
    },
    sections: [
      {
        key: "businessProblem",
        content: [
          "Hospital pharmacy warehouses managing vital medicines face two compounding risks that are usually handled manually: running out of critical stock, and losing inventory to expiry. Built a batch-scored data platform — orchestrated through a single weekly Airflow DAG — that forecasts demand per medicine-warehouse pair, flags batches at risk of expiring before they sell through, and turns those signals into procurement recommendations reviewable through a Streamlit app.",
        ],
        contentId: [
          "Gudang farmasi rumah sakit yang mengelola obat vital menghadapi dua risiko yang saling berkaitan dan biasanya masih ditangani manual: kehabisan stok obat kritis, dan kerugian akibat obat kadaluwarsa. Dibangun sebuah platform data batch-scored — diorkestrasi lewat satu DAG Airflow mingguan — yang meramalkan demand per kombinasi obat-gudang, menandai batch berisiko kadaluwarsa sebelum terjual habis, dan mengubah sinyal tersebut menjadi rekomendasi pengadaan yang bisa direview lewat aplikasi Streamlit.",
        ],
      },
      {
        key: "architecture",
        content: [
          "Data flows through a medallion architecture — Bronze (raw, MinIO) validated by a Great Expectations data-quality gate, Silver (cleaned, corrupted rows quarantined), and Gold (star schema) — before feeding two parallel models and an LLM-narrated recommendation agent. The whole pipeline, from extraction to model training, is orchestrated by a single Airflow DAG on a weekly schedule; the Streamlit app reads only from the Gold layer and never runs a model live, a deliberate batch-scoring rather than live-inference design.",
        ],
        contentId: [
          "Data mengalir lewat arsitektur medallion — Bronze (raw, MinIO) yang divalidasi lewat gerbang data quality Great Expectations, Silver (data bersih, baris rusak dikarantina), dan Gold (star schema) — sebelum masuk ke dua model paralel dan agent rekomendasi bernarasi LLM. Seluruh pipeline, dari ekstraksi sampai training model, diorkestrasi oleh satu DAG Airflow dengan jadwal mingguan; aplikasi Streamlit hanya membaca dari layer Gold dan tidak pernah menjalankan model secara live — desain batch-scoring yang disengaja, bukan live inference.",
        ],
      },
      {
        key: "dataset",
        content: [
          "Combines one real dataset — Indonesia's e-Fornas essential-medicines catalog (663 medicines) — with simulated stock movement, batch, and expiry data, since no public dataset matched this project's schema. Procurement price data (e-Katalog LKPP) was dropped from scope after three official channels — API, manual download, and the open-data portal — all proved unusable, rather than being replaced with synthetic prices.",
        ],
        contentId: [
          "Menggabungkan satu dataset nyata — katalog obat esensial e-Fornas Kemenkes Indonesia (663 obat) — dengan data pergerakan stok, batch, dan kadaluwarsa yang disimulasikan, karena tidak ada dataset publik yang sesuai skema project ini. Data harga pengadaan (e-Katalog LKPP) dihapus dari scope setelah tiga jalur resmi — API, unduhan manual, dan portal data terbuka — semuanya terbukti tidak bisa dipakai, bukan digantikan dengan harga sintetis.",
        ],
      },
      {
        key: "modelDevelopment",
        content: [
          "Demand forecasting uses one Prophet model per medicine-warehouse pair (80 combinations total), with yearly seasonality disabled since roughly two years of history wasn't enough to trust an annual pattern, but weekly seasonality enabled to capture the deliberately-designed weekend demand dip.",
          "Expiry-risk classification compares Logistic Regression, XGBoost, and LightGBM under repeated 5-fold cross-validation, with risk labels derived from batch-level in/out totals versus expiry date rather than taken from raw data, to avoid leakage.",
        ],
        contentId: [
          "Peramalan demand memakai satu model Prophet per kombinasi obat-gudang (80 kombinasi), dengan yearly seasonality dimatikan karena histori sekitar dua tahun belum cukup dipercaya untuk pola tahunan, tapi weekly seasonality diaktifkan untuk menangkap penurunan demand akhir pekan yang memang didesain dalam simulasi.",
          "Klasifikasi risiko kadaluwarsa membandingkan Logistic Regression, XGBoost, dan LightGBM lewat repeated 5-fold cross-validation, dengan label risiko diturunkan dari total masuk-keluar per batch dibanding tanggal kadaluwarsa — bukan diambil dari data mentah — untuk menghindari data leakage.",
        ],
      },
      {
        key: "modelEvaluation",
        content: [
          "Prophet beat a seasonal-naive baseline in 79 of 80 combinations, cutting MAPE from 41.85% to 29.21% on a 60-day time-based holdout.",
          "Logistic Regression was the strongest of the three at ROC-AUC 0.557 — barely above chance. Rather than hide this, the limitation is reported directly: with only 168 training rows, tree ensembles overfit and underperformed the baseline, and the underlying waste/stockout outcome appears dominated by random daily-demand variance rather than a learnable batch pattern.",
        ],
        contentId: [
          "Prophet mengalahkan baseline seasonal-naive di 79 dari 80 kombinasi, menurunkan MAPE dari 41.85% ke 29.21% pada holdout berbasis waktu 60 hari terakhir.",
          "Logistic Regression jadi yang terkuat dari ketiganya dengan ROC-AUC 0.557 — nyaris setara tebakan acak. Alih-alih disembunyikan, keterbatasan ini dilaporkan langsung: dengan cuma 168 baris data training, model berbasis pohon jadi overfit dan performanya di bawah baseline, dan outcome waste/kehabisan stok tampaknya lebih didominasi variasi acak konsumsi harian daripada pola batch yang bisa dipelajari.",
        ],
      },
      {
        key: "aiAgent",
        content: [
          "A procurement recommendation generator reads both model outputs, selects the 15 highest-risk batches per run, and decides the action type (redistribution, fast discount, FEFO priority) through rule-based code operating on the actual numbers — an LLM (Gemini) is only called afterward to narrate the result, and is never asked to recompute anything, following an explicit anti-hallucination rule from the project's PRD.",
          "A separate Q&A chatbot answers stock, expiry, and risk questions through three constrained function-calling tools rather than free text-to-SQL, deliberately trading flexibility for a lower risk of an incorrect or unsafe generated query.",
        ],
        contentId: [
          "Sebuah generator rekomendasi pengadaan membaca kedua output model, memilih 15 batch berisiko tertinggi per run, dan menentukan jenis tindakan (redistribusi, diskon cepat, prioritas FEFO) lewat kode berbasis aturan yang bekerja di atas angka aktual — LLM (Gemini) baru dipanggil setelahnya untuk merangkai narasinya, dan tidak pernah diminta menghitung ulang apa pun, mengikuti aturan anti-halusinasi eksplisit dari PRD project ini.",
          "Chatbot Q&A terpisah menjawab pertanyaan seputar stok, kadaluwarsa, dan risiko lewat tiga tool function-calling yang dibatasi, bukan text-to-SQL bebas — trade-off yang disengaja demi risiko query salah atau berbahaya yang lebih rendah.",
        ],
      },
      {
        key: "deployment",
        content: [
          "Deployed with Neon Postgres as the shared hosted database for the Silver and Gold schemas, a local Airflow instance in Docker Compose running the weekly pipeline, and the Streamlit app itself hosted on Streamlit Community Cloud, split into Data Scientist and Data Analyst page groups.",
        ],
        contentId: [
          "Dideploy dengan Neon Postgres sebagai database hosted bersama untuk schema Silver dan Gold, instance Airflow lokal via Docker Compose yang menjalankan pipeline mingguan, dan aplikasi Streamlit sendiri di-hosting di Streamlit Community Cloud, terbagi jadi grup halaman Data Scientist dan Data Analyst.",
        ],
      },
    ],
  },
];