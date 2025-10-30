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
};

export const projects: Project[] = [
  {
    id: "musix",
    title: "Musix",
    description: "AI generated music recommendation",
    tags: ["AI", "Music", "Recommender"],
    githubRepo: "lilswapnil/musix",
    // liveUrl: "https://musix.example.com"
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "OpenAI API"],
    highlights: [
      "Personalized recommendations using hybrid content + collaborative filtering.",
      "RAG-powered prompt context from track metadata and user history.",
      "Edge caching for sub-100ms recommendation latencies.",
    ],
    role: "Full‑Stack",
    timeframe: "2024",
  },
  {
    id: "movizzz",
    title: "Movizzz",
    description: "AI generated Movie recommendation",
    tags: ["AI", "Movies", "Recommender"],
    githubRepo: "lilswapnil/moviezzz",
    // liveUrl: "https://movizzz.example.com"
    tech: ["Next.js", "TypeScript", "Python", "FastAPI", "TMDB API"],
    highlights: [
      "Blends embeddings with popularity priors to improve cold‑start picks.",
      "User feedback loop fine‑tunes similarity weights in real‑time.",
      "Server Actions stream recommendations with suspense fallbacks.",
    ],
    role: "Full‑Stack",
    timeframe: "2024",
  },
  {
    id: "trends-analytics",
    title: "Trends Analytics & Sentiment Mining",
    description: "Gaming Applications sentiment analysis",
    tags: ["NLP", "Sentiment", "Analytics"],
    githubRepo: "lilswapnil/trends-analytics",
    tech: ["Python", "Pandas", "scikit‑learn", "spaCy", "Plotly", "Airflow"],
    highlights: [
      "ETL pipeline scrapes reviews, deduplicates and normalizes text at scale.",
      "Domain‑tuned sentiment classifier surpasses baseline by 9% F1.",
      "Interactive dashboards for trends, topics and cohorts.",
    ],
    role: "Data/ETL",
    timeframe: "2023",
  },
  {
    id: "wildlife-monitoring",
    title: "Smart Wildlife Monitoring",
    description: "Real-time wildlife tracking system",
    tags: ["IoT", "Computer Vision"],
    githubRepo: "lilswapnil/wildlife-monitoring",
    tech: ["Raspberry Pi", "YOLOv8", "Python", "MQTT", "AWS IoT Core", "S3"],
    highlights: [
      "On‑device object detection with low‑power edge hardware.",
      "Event‑driven uploads reduce bandwidth by 70%.",
      "Geo‑tagged alerts and timeline replay UI.",
    ],
    role: "IoT/Embedded",
    timeframe: "2023",
  },
  {
    id: "university-erp",
    title: "University Recruitment ERP System",
    description: "Recruitment workflow and data management",
    tags: ["ERP", "Full-Stack"],
    githubRepo: "lilswapnil/university-erp",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "Redis"],
    highlights: [
      "Configurable workflows with role‑based approvals.",
      "Audit trails and exportable reports for compliance.",
      "Queued jobs for bulk imports and scheduled notifications.",
    ],
    role: "Full‑Stack",
    timeframe: "2022",
  },
  {
    id: "llm-from-scratch",
    title: "LLM from Scratch",
    description: "Educational implementation of core Transformer/LLM components.",
    tags: ["AI", "LLM", "Transformers", "Deep Learning"],
    githubRepo: "lilswapnil/LLM-from-scratch",
    tech: ["Python", "PyTorch", "NumPy", "Matplotlib"],
    highlights: [
      "Implements tokenization, attention, MHA, MLP blocks and training loop.",
      "Clean notebooks with step‑by‑step visualizations.",
      "Unit tests validate tensor shapes and gradients.",
    ],
    role: "AI/ML",
    timeframe: "2024",
  },
  {
    id: "lms-using-agenticai",
    title: "LMS using Agentic AI",
    description: "Agentic AI–powered learning management system.",
    tags: ["Agentic AI", "LMS", "AI", "Full-Stack"],
    githubRepo: "lilswapnil/LMS-using-agenticAI",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "LangChain", "OpenAI"],
    highlights: [
      "Agent tools for quiz generation, grading and remediation plans.",
      "Context‑aware tutoring from course materials and notes.",
      "Granular RBAC for admins, instructors and learners.",
    ],
    role: "Full‑Stack",
    timeframe: "2024",
  },
  {
    id: "ai-assistant",
    title: "AI Assistant",
    description: "Conversational assistant with tool use and LLM orchestration.",
    tags: ["AI", "Assistant", "LLM", "RAG"],
    githubRepo: "lilswapnil/AI-Assistant",
    tech: ["Node.js", "TypeScript", "FastAPI", "LangChain", "Pinecone"],
    highlights: [
      "Tool‑calling with function schemas and guarded execution.",
      "Retriever augments responses with fresh context.",
      "Streaming UI with partial thoughts and citations.",
    ],
    role: "Assistant/Agentic",
    timeframe: "2024",
  },
  {
    id: "book-scraper",
    title: "Book Scraper",
    description: "Web scraper for book metadata and reviews.",
    tags: ["Scraping", "ETL", "Automation"],
    githubRepo: "lilswapnil/book-scraper",
    tech: ["Python", "Playwright", "BeautifulSoup", "SQLite"],
    highlights: [
      "Rotating proxies and backoff for resilient crawling.",
      "Parses nested pagination and normalizes entities.",
      "CSV exports and lightweight analytics notebook.",
    ],
    role: "Data/ETL",
    timeframe: "2022",
  },
];
