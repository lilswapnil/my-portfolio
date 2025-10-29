export type Certificate = {
  id: string;
  name: string;
  issuer: string;
  issueDate?: string;           // YYYY-MM or ISO
  expirationDate?: string | null;
  credentialId?: string;
  credentialUrl?: string;       // LinkedIn credential URL
  certificateUrl?: string;      // Direct certificate file/image URL
  image?: string;               // e.g., /certificates/name.png (place in /public)
  skills?: string[];
};

export const certificates: Certificate[] = [
  {
    id: "mozilla-js-foundations-professional-certificate-2025-09",
    name: "JavaScript Foundations Professional Certificate by Mozilla",
    issuer: "Mozilla",
    issueDate: "2025-09",
    expirationDate: null,
    skills: ["Web Development", "JavaScript"],
  },
  {
    id: "scrimba-intro-to-ai-engineering-2025-10",
    name: "Intro to AI Engineering",
    issuer: "Scrimba",
    issueDate: "2025-10",
    expirationDate: null,
    skills: ["Artificial Intelligence (AI)", "JavaScript"],
  },
  {
    id: "linkedin-it-security-foundations-network-security-2025-09",
    name: "IT Security Foundations: Network Security",
    issuer: "LinkedIn Learning",
    issueDate: "2025-09",
    expirationDate: null,
    skills: ["Network Security"],
  },
  {
    id: "linkedin-javascript-essential-training-2025-09",
    name: "JavaScript Essential Training",
    issuer: "LinkedIn Learning",
    issueDate: "2025-09",
    expirationDate: null,
    skills: ["JavaScript"],
  },
  {
    id: "linkedin-network-administration-core-skills-2025-09",
    name: "Network Administration: Build Core Skills for Network Management and Security",
    issuer: "LinkedIn Learning",
    issueDate: "2025-09",
    expirationDate: null,
    skills: ["Network Security", "Network Administration", "Network Troubleshooting"],
  },
  {
    id: "linkedin-learning-network-troubleshooting-2025-08",
    name: "Learning Network Troubleshooting: Practical Network Diagnostics and Solutions",
    issuer: "LinkedIn Learning",
    issueDate: "2025-08",
    expirationDate: null,
    skills: ["Network Troubleshooting"],
  },
  {
    id: "linkedin-networking-foundations-ip-addressing-2025-08",
    name: "Networking Foundations: IP Addressing",
    issuer: "LinkedIn Learning",
    issueDate: "2025-08",
    expirationDate: null,
    skills: ["IP Addressing"],
  },
  {
    id: "linkedin-networking-foundations-lans-2025-08",
    name: "Networking Foundations: Local Area Networks (LANs)",
    issuer: "LinkedIn Learning",
    issueDate: "2025-08",
    expirationDate: null,
  },
  {
    id: "linkedin-networking-foundations-basics-2025-08",
    name: "Networking Foundations: Networking Basics",
    issuer: "LinkedIn Learning",
    issueDate: "2025-08",
    expirationDate: null,
    skills: ["Network Administration"],
  },
  {
    id: "linkedin-express-essentials-nodejs-2025-05",
    name: "Express Essentials: Build Powerful Web Apps with Node.js",
    issuer: "LinkedIn Learning",
    issueDate: "2025-05",
    expirationDate: null,
    skills: ["Web Application Development", "Express.js"],
  },
  {
    id: "linkedin-html-essential-training-2025-05",
    name: "HTML Essential Training",
    issuer: "LinkedIn Learning",
    issueDate: "2025-05",
    expirationDate: null,
    skills: ["Front-End Development", "Web Development", "HTML", "HTML Scripting"],
  },
  {
    id: "linkedin-learning-git-and-github-2025-05",
    name: "Learning Git and GitHub",
    issuer: "LinkedIn Learning",
    issueDate: "2025-05",
    expirationDate: null,
    skills: ["GitHub"],
  },
  {
    id: "linkedin-learning-the-javascript-language-2025-05",
    name: "Learning the JavaScript Language",
    issuer: "LinkedIn Learning",
    issueDate: "2025-05",
    expirationDate: null,
    skills: ["JavaScript"],
  },
  {
    id: "stanford-divide-and-conquer-2024-12",
    name: "Divide and Conquer, Sorting and Searching, and Randomized Algorithms",
    issuer: "Stanford University",
    issueDate: "2024-12",
    expirationDate: null,
    credentialId: "U26E67KZ7XT5",
  },
  {
    id: "linkedin-working-with-upset-customers-2024-08",
    name: "Working with Upset Customers (2020)",
    issuer: "LinkedIn Learning",
    issueDate: "2024-08",
    expirationDate: null,
    skills: ["Customer Escalation Management"],
  },
  {
    id: "google-technical-support-fundamentals-2021-05",
    name: "Technical Support Fundamentals",
    issuer: "Google",
    issueDate: "2021-05",
    expirationDate: null,
  },
];