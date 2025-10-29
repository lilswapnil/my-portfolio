export type Project = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  githubRepo?: string; // "owner/repo"
  liveUrl?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    id: "musix",
    title: "Musix",
    description: "AI generated music recommendation",
    tags: ["AI", "Music", "Recommender"],
    githubRepo: "lilswapnil/musix",
    // liveUrl: "https://musix.example.com"
  },
  {
    id: "movizzz",
    title: "Movizzz",
    description: "AI generated Movie recommendation",
    tags: ["AI", "Movies", "Recommender"],
    githubRepo: "lilswapnil/moviezzz",
    // liveUrl: "https://movizzz.example.com"
  },
  {
    id: "trends-analytics",
    title: "Trends Analytics & Sentiment Mining",
    description: "Gaming Applications sentiment analysis",
    tags: ["NLP", "Sentiment", "Analytics"],
    githubRepo: "lilswapnil/trends-analytics",
  },
  {
    id: "wildlife-monitoring",
    title: "Smart Wildlife Monitoring",
    description: "Real-time wildlife tracking system",
    tags: ["IoT", "Computer Vision"],
    githubRepo: "lilswapnil/wildlife-monitoring",
  },
  {
    id: "university-erp",
    title: "University Recruitment ERP System",
    description: "Recruitment workflow and data management",
    tags: ["ERP", "Full-Stack"],
    githubRepo: "lilswapnil/university-erp",
  },
  {
    id: "llm-from-scratch",
    title: "LLM from Scratch",
    description: "Educational implementation of core Transformer/LLM components.",
    tags: ["AI", "LLM", "Transformers", "Deep Learning"],
    githubRepo: "lilswapnil/LLM-from-scratch",
  },
  {
    id: "lms-using-agenticai",
    title: "LMS using Agentic AI",
    description: "Agentic AI–powered learning management system.",
    tags: ["Agentic AI", "LMS", "AI", "Full-Stack"],
    githubRepo: "lilswapnil/LMS-using-agenticAI",
  },
  {
    id: "ai-assistant",
    title: "AI Assistant",
    description: "Conversational assistant with tool use and LLM orchestration.",
    tags: ["AI", "Assistant", "LLM", "RAG"],
    githubRepo: "lilswapnil/AI-Assistant",
  },
  {
    id: "book-scraper",
    title: "Book Scraper",
    description: "Web scraper for book metadata and reviews.",
    tags: ["Scraping", "ETL", "Automation"],
    githubRepo: "lilswapnil/book-scraper",
  },
];
