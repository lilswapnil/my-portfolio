"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";

type GitHubInfo = {
  html_url: string;
  stargazers_count: number;
  description?: string;
  homepage?: string;
  language?: string;
  topics?: string[];
};

type Enriched = { project: Project; roles: string[]; gh: GitHubInfo | null };

async function fetchGitHub(repo: string, signal?: AbortSignal): Promise<GitHubInfo | null> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    const res = await fetch(`https://api.github.com/repos/${repo}`, { headers, signal });
    if (!res.ok) return null;
    const data = (await res.json()) as GitHubInfo;
    return data;
  } catch {
    return null;
  }
}

function inferProjectRoles(p: Project): string[] {
  const roles = new Set<string>();
  const tags = (p.tags ?? []).map((t) => t.toLowerCase());
  const title = p.title.toLowerCase();

  if (tags.some((t) => ["ai", "llm", "transformers"].includes(t) || t.includes("rag"))) roles.add("AI/ML");
  if (tags.some((t) => t.includes("assistant") || t.includes("agentic"))) roles.add("Assistant/Agentic");
  if (tags.some((t) => t.includes("recommender"))) roles.add("Recommender Systems");
  if (tags.some((t) => t.includes("nlp") || t.includes("sentiment"))) roles.add("NLP");
  if (tags.some((t) => t.includes("computer vision") || t.includes("vision"))) roles.add("Computer Vision");
  if (tags.some((t) => t.includes("iot"))) roles.add("IoT/Embedded");
  if (tags.some((t) => t.includes("etl") || t.includes("scraping") || t.includes("automation"))) roles.add("Data/ETL");
  if (tags.some((t) => t.includes("full-stack") || t.includes("full stack"))) roles.add("Full-Stack");
  if (tags.some((t) => t.includes("lms")) || title.includes("lms")) roles.add("Education/LMS");
  if (roles.size === 0 && (title.includes("ai") || title.includes("assistant"))) roles.add("AI/ML");

  return Array.from(roles);
}

// In-memory cache to avoid refetch in-session
const ghMemCache = new Map<string, GitHubInfo>();

function readSessionCache(repo: string): GitHubInfo | null {
  try {
    const raw = sessionStorage.getItem(`gh:${repo}`);
    if (!raw) return null;
    return JSON.parse(raw) as GitHubInfo;
  } catch {
    return null;
  }
}

function writeSessionCache(repo: string, data: GitHubInfo) {
  try {
    sessionStorage.setItem(`gh:${repo}`, JSON.stringify(data));
  } catch {
    // ignore quota issues
  }
}

function useGitHubInfo(repo?: string, rootMargin = "200px") {
  const [gh, setGh] = useState<GitHubInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(!!repo);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!repo) {
      setLoading(false);
      return;
    }

    // Cache hit (memory or session)
    const mem = ghMemCache.get(repo);
    if (mem) {
      setGh(mem);
      setLoading(false);
      return;
    }
    const sess = readSessionCache(repo);
    if (sess) {
      ghMemCache.set(repo, sess);
      setGh(sess);
      setLoading(false);
      return;
    }

    let observer: IntersectionObserver | null = null;
    let aborted = false;
    let controller: AbortController | null = null;

    const fetchWhenVisible = async () => {
      if (aborted || !repo) return;
      setLoading(true);
      controller = new AbortController();
      const data = await fetchGitHub(repo, controller.signal);
      if (aborted) return;
      if (data) {
        ghMemCache.set(repo, data);
        writeSessionCache(repo, data);
      }
      setGh(data);
      setLoading(false);
    };

    const el = ref.current;
    if (!el) {
      // If ref not yet attached, just fetch (fallback)
      fetchWhenVisible();
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) {
          observer?.disconnect();
          fetchWhenVisible();
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );

    observer.observe(el);

    return () => {
      aborted = true;
      observer?.disconnect();
      controller?.abort();
    };
  }, [repo, rootMargin]);

  return { gh, loading, ref };
}

export default function Projects() {
  // Prepare items immediately; defer GitHub fetch per-card on visibility
  const [items] = useState<Enriched[]>(
    () => projects.map((p) => ({ project: p, roles: inferProjectRoles(p), gh: null as GitHubInfo | null }))
  );

  return <ProjectsClient items={items} />;
}

function ProjectsClient({ items }: { items: Enriched[] }) {
  const roleOptions = useMemo(() => {
    const set = new Set<string>();
    items.forEach(({ roles }) => roles.forEach((r) => set.add(r)));
    return ["All", ...Array.from(set).sort()];
  }, [items]);

  const [selectedRole, setSelectedRole] = useState<string>("All");

  const visible = useMemo(() => {
    if (selectedRole === "All") return items;
    return items.filter(({ roles }) => roles.includes(selectedRole));
  }, [items, selectedRole]);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Projects</h1>

        {/* Role filter chips */}
        <div className="mb-8 -mx-4 px-4 overflow-x-auto">
          <div className="flex gap-2 whitespace-nowrap">
            {roleOptions.map((role) => {
              const active = role === selectedRole;
              return (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={[
                    "px-3 py-1.5 rounded-full text-sm border transition",
                    active
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100",
                  ].join(" ")}
                >
                  {role}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map(({ project }) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

const ProjectCard = memo(function ProjectCard({ project }: { project: Project }) {
  const { gh, loading, ref } = useGitHubInfo(project.githubRepo);

  const learnMoreHref = project.liveUrl || gh?.homepage || (gh?.html_url ?? (project.githubRepo ? `https://github.com/${project.githubRepo}` : "#"));
  const desc = gh?.description || project.description;
  const stars = gh?.stargazers_count;

  return (
    <div
      ref={ref}
      className="project-card p-6 bg-gray-800 rounded-lg shadow-lg text-white hover:shadow-xl transition-shadow duration-300"
    >
      <h2 className="text-2xl font-bold mb-4">{project.title}</h2>

      {/* Description (skeleton while loading and no local description) */}
      {desc ? (
        <p className="text-gray-300 mb-3">{desc}</p>
      ) : (
        <div className="mb-3 animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-11/12 mb-2" />
          <div className="h-4 bg-gray-700 rounded w-9/12" />
        </div>
      )}

      {project.tags?.length ? (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((t) => (
            <span key={t} className="text-xs bg-gray-700 px-2 py-1 rounded">
              {t}
            </span>
          ))}
        </div>
      ) : null}

      <div className="flex items-center justify-between mt-4">
        <a
          href={learnMoreHref}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Learn More
        </a>

        {/* GitHub link + stars, skeleton while loading */}
        {project.githubRepo || gh?.html_url ? (
          loading && stars == null ? (
            <div className="h-4 bg-blue-900/40 rounded w-28 animate-pulse" />
          ) : (
            <a
              href={gh?.html_url || `https://github.com/${project.githubRepo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-300 hover:text-blue-200"
            >
              View on GitHub{typeof stars === "number" ? ` ★ ${stars}` : ""}
            </a>
          )
        ) : null}
      </div>
    </div>
  );
});