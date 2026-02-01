// Tip: in Next.js, assets in /public are referenced WITHOUT "/public"
// e.g. "/icons/ap.svg" not "./public/icons/ap.svg"

export type Tile = {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
};

export const tilesData: Tile[] = [
  {
    id: 1,
    title: 'The Associated Press Elections Systems',
    description: 'High-stakes, real-time reporting',
    imageUrl: '/icons/ap.svg',
  },
  {
    id: 2,
    title: '72% Ingestion Increase',
    description: 'Peak-night throughput optimization',
  },
  {
    id: 3,
    title: '99% Data Accuracy',
    description: 'Election-grade data integrity',
  },
  {
    id: 4,
    title: '98.9% Pipeline Uptime',
    description: 'Resilient monitoring + retries',
  },
  {
    id: 5,
    title: 'Real-Time Data Pipelines',
    description: 'Low-latency ingestion at scale',
  },
  {
    id: 6,
    title: 'Agentic AI for LMS/ERP',
    description: 'Autonomous workflows in production',
  },
  {
    id: 7,
    title: 'DigitalEdu LMS Systems',
    description: '10K+ users in production',
    imageUrl: '/icons/DE.jpeg'
  },
  {
    id: 8,
    title: 'Adaptive Learning ML',
    description: '25% accuracy improvement',
  },
  {
    id: 9,
    title: 'iConsult Full-Stack Delivery',
    description: 'React/Node apps shipped end-to-end',
    imageUrl: '/icons/iC.jpeg'
  },
  {
    id: 10,
    title: 'Cloud & DevOps Automation',
    description: 'CI/CD + IaC for reliability',
  },
  {
    id: 11,
    title: 'FastAPI + Backend APIs',
    description: 'REST services for products',
  },
  {
    id: 12,
    title: 'MS Computer Science',
    description: 'Syracuse University foundation',
    imageUrl: '/icons/su.png',
  },
  {
    id: 13,
    title: 'Tech Support at Scale',
    description: '15K tickets, 95% satisfaction',
    imageUrl:'icons/sul.jpeg'
  },
  {
    id: 14,
    title: 'Spring Boot Engineering',
    description: 'APIs + enterprise delivery',
  },
  {
  id: 15,
  title: 'Production Systems Design',
  description: 'Reliability, observability, and scale'
}
];
