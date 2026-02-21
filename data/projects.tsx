// --- Consolidated from projects.ts ---
// Example projects data
// ...existing code...
export type Project = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  githubRepo?: string; // "owner/repo"
  liveUrl?: string;
  image?: string;
  // New optional details
  tech?: string[];
  highlights?: string[];
  role?: string;
  timeframe?: string;
  category?: string; // e.g. 'Full-Stack', 'Data Analysis', 'ML Project', etc.
  notebookUrl?: string; // Direct notebook link for Python/ML/Data projects
  emoji?: string; // Project emoji for visual identification
  section?: string; // Main category section: 'Full-Stack & Systems', 'AI & ML', 'Data Science'
};

export const projects: Project[] = [
  {
    id: "musix",
    title: "Musix",
    emoji: "🎵",
    description: "AI music platform with hybrid collaborative filtering and RAG-enhanced recommendations.",
    tags: ["AI", "Full-Stack", "Machine Learning"],
    githubRepo: "lilswapnil/musix",
    liveUrl: "https://musix-now.vercel.app/",
    tech: ["JavaScript", "React", "Node.js", "Express", "MongoDB", "REST APIs", "JWT", "CSS"],
    highlights: [
      "Personalized recommendations using hybrid content + collaborative filtering.",
      "RAG-powered prompt context from track metadata and user history.",
      "Edge caching for sub-100ms recommendation latencies.",
    ],
    role: "Full‑Stack",
    timeframe: "2024",
    category: "Full-Stack / AI / Recommender",
    section: "Full-Stack & Systems",
  },
  {
    id: "moviz",
    title: "Moviez",
    emoji: "🎬",
    description: "SSR movie discovery app with TMDB API integration, dynamic routing, and SEO optimization.",
    tags: ["Full-Stack", "AI", "Machine Learning"],
    githubRepo: "lilswapnil/moviezzz",
    liveUrl: "https://moviezzz-one.vercel.app/login",
    tech: ["TypeScript", "Next.js", "React", "Python", "FastAPI", "Tailwind CSS", "Vercel", "REST APIs"],
    highlights: [
      "Blends embeddings with popularity priors to improve cold‑start picks.",
      "User feedback loop fine‑tunes similarity weights in real‑time.",
      "Server Actions stream recommendations with suspense fallbacks.",
    ],
    role: "Full‑Stack",
    timeframe: "2024",
    category: "Full-Stack / AI / Recommender",
    section: "Full-Stack & Systems",
    notebookUrl: "https://github.com/lilswapnil/moviezzz/blob/main/notebook/imdb-scraper.ipynb",
  },
  {
    id: "gaming-trends",
    title: "Gaming Analytics",
    emoji: "🎮",
    description: "Sentiment analysis with automated ETL pipeline and domain-tuned classification models.",
    tags: ["Data Science", "Machine Learning", "NLP"],
    githubRepo: "lilswapnil/trends-analytics",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "Scikit-learn", "Jupyter"],
    highlights: [
      "ETL pipeline scrapes reviews, deduplicates and normalizes text at scale.",
      "Domain‑tuned sentiment classifier surpasses baseline by 9% F1.",
      "Interactive dashboards for trends, topics and cohorts.",
    ],
    role: "Data Scientist",
    timeframe: "2023",
    category: "Data Science / Analytics",
    section: "Data Science",
    notebookUrl: "https://github.com/lilswapnil/gaming-analytics/blob/main/Gaming.ipynb",
  },
  {
    id: "wildlife-monitoring",
    title: "Forest Watch",
    emoji: "🌲",
    description: "Edge computing wildlife system with ESP32, real-time telemetry, and event-driven architecture.",
    tags: ["IoT", "Embedded Systems", "Full-Stack"],
    githubRepo: "lilswapnil/wildlife-monitoring",
    tech: ["C++", "ESP32", "Arduino", "Python", "MQTT", "AWS IoT Core", "WebSocket", "Flask"],
    highlights: [
      "On‑device object detection with low‑power edge hardware.",
      "Event‑driven uploads reduce bandwidth by 70%.",
      "Geo‑tagged alerts and timeline replay UI.",
    ],
    role: "IoT Engineer",
    timeframe: "2023",
    category: "IoT / Edge Computing",
    section: "Full-Stack & Systems",
  },
  {
    id: "lung-cancer-detection",
    title: "Lung Cancer Detection",
    emoji: "🫁",
    description: "ML classification pipeline with feature engineering achieving 94% accuracy on medical imaging.",
    tags: ["Deep Learning", "Computer Vision", "AI"],
    githubRepo: "lilswapnil/lung-cancer-detection",
    tech: ["Python", "NumPy", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch", "OpenCV", "Matplotlib", "Jupyter"],
    highlights: [
      "Developed end-to-end ML pipeline for lung cancer detection using 1,018+ LIDC-IDRI medical imaging dataset.",
      "Implemented deep learning models achieving 94% accuracy, and 96% specificity in nodule classification.",
      "Built sophisticated preprocessing pipeline for medical image normalization, noise reduction, ROI extraction.",
    ],
    role: "ML Engineer",
    timeframe: "2025",
    category: "ML / Healthcare",
    section: "AI & ML",
  },
  {
    id: "kdrama-analytics",
    title: "K-Drama Analytics",
    emoji: "📺",
    description: "Exploratory data analysis uncovering genre distribution, trends, and release patterns.",
    tags: ["Data Science", "Data Analysis", "Visualization"],
    githubRepo: "lilswapnil/kdrama-analytics",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "Jupyter"],
    highlights: [
      "Data collection and cleaning for K-Drama datasets.",
      "Visualizations for trends, ratings, and genres.",
      "Interactive dashboards for exploring K-Drama statistics.",
    ],
    role: "Data Analyst",
    timeframe: "2025",
    category: "Data Science / Analytics",
    section: "Data Science",
    notebookUrl: "https://github.com/lilswapnil/kdrama-analytics/blob/main/analyze.ipynb"
  },
  {
    id: "university-erp",
    title: "University Recruitment ERP",
    emoji: "🏫",
    description: "Enterprise system with RBAC, configurable approval workflows, and audit trail compliance.",
    tags: ["ETL", "System Design", "Backend"],
    githubRepo: "lilswapnil/university-erp",
    tech: ["TypeScript", "React", "Node.js", "Express", "PostgreSQL", "SQL", "JWT", "REST APIs"],
    highlights: [
      "Configurable workflows with role‑based approvals.",
      "Audit trails and exportable reports for compliance.",
      "Queued jobs for bulk imports and scheduled notifications.",
    ],
    role: "Full‑Stack",
    timeframe: "2022",
    category: "Full-Stack / ERP",
    section: "Full-Stack & Systems",
  },
  {
    id: "cost-aware-AI-system",
    title: "LLM From Scratch",
    emoji: "🏗️",
    description: "Transformer built from scratch with custom attention mechanisms and training loop implementation.",
    tags: ["Deep Learning", "AI", "NLP"],
    githubRepo: "lilswapnil/cost-aware-AI-system",
    tech: ["Python", "PyTorch", "NumPy", "Matplotlib", "Jupyter"],
    highlights: [
      "Implements custom tokenization, attention mechanisms, multi-head attention, MLP blocks, and a full training loop.",
      "Step-by-step notebooks with clear visualizations.",
      "Comprehensive unit tests for tensor shapes and gradient correctness."],
    role: "AI/ML",
    timeframe: "2024",
    category: "AI / Deep Learning",
    section: "AI & ML",
  },
  {
    id: "lms-using-agenticai",
    title: "Agentic AI LMS Assistant",
    emoji: "🧠",
    description: "LMS with RAG integration, autonomous tool orchestration, and multi-step reasoning workflows.",
    tags: ["AI", "Full-Stack", "NLP"],
    githubRepo: "lilswapnil/LMS-using-agenticAI",
    tech: ["Python", "TypeScript", "LangChain", "OpenAI", "Next.js", "React", "FastAPI", "Pinecone", "Vector DB"],
    highlights: [
      "Agent tools for quiz generation, grading and remediation plans.",
      "Context‑aware tutoring from course materials and notes.",
      "Granular RBAC for admins, instructors and learners.",
    ],
    role: "AI Engineer",
    timeframe: "2024",
    category: "AI / LMS",
    section: "AI & ML",
  },
  {
    id: "book-recommender",
    title: "Book Recommender",
    emoji: "📚",
    description: "Semantic search engine using transformer embeddings, zero-shot learning, and FAISS indexing.",
    tags: ["Machine Learning", "NLP", "AI"],
    githubRepo: "lilswapnil/book-recommendation-system",
    tech: ["Python", "Transformers", "HuggingFace", "FAISS", "Scikit-learn", "NumPy", "Pandas", "Jupyter"],
    highlights: [
      "Leverages pre-trained transformer embeddings for semantic similarity.",
      "Zero-shot classification for genre and theme matching.",
      "Fast approximate nearest neighbor search with FAISS.",
    ],
    role: "ML Engineer",
    timeframe: "2023",
    category: "AI / NLP / Recommender",
    section: "AI & ML",
  },
];
