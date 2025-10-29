"use client";

import { useMemo, useState } from "react";
import type { Certificate } from "@/data/certificates";
import { certificates } from "@/data/certificates";
import { Building2, GraduationCap, Linkedin, ExternalLink, FileText, IdCard } from "lucide-react";

function formatMonth(date?: string) {
  if (!date) return null;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

// Infer role tags from skills/name/issuer
function inferRoles(c: Certificate): string[] {
  const roles = new Set<string>();
  const skills = (c.skills ?? []).map((s) => s.toLowerCase());
  const name = c.name.toLowerCase();
  const issuer = c.issuer.toLowerCase();

  // AI/ML
  if (skills.some((s) => s.includes("artificial intelligence") || s === "ai")) roles.add("AI/ML");

  // Frontend
  if (skills.some((s) => s.includes("javascript") || s.includes("front-end") || s.includes("web development") || s.includes("html")))
    roles.add("Frontend");

  // Backend
  if (skills.some((s) => s.includes("express"))) roles.add("Backend");

  // Networking
  if (skills.some((s) => s.includes("network") || s.includes("ip addressing")) || name.includes("network"))
    roles.add("Networking");

  // Security
  if (skills.some((s) => s.includes("security"))) roles.add("Security");

  // Tools
  if (skills.some((s) => s.includes("github") || s === "git")) roles.add("Tools");

  // Support / IT
  if (skills.some((s) => s.includes("customer") || s.includes("support")) || issuer.includes("google"))
    roles.add("Support/IT");

  // Algorithms / CS
  if (issuer.includes("stanford") || name.includes("algorithms") || name.includes("sorting") || name.includes("randomized"))
    roles.add("Algorithms/CS");

  return Array.from(roles);
}

// Add an issuer icon helper
function IssuerIcon({ issuer, className = "h-5 w-5" }: { issuer: string; className?: string }) {
  const key = issuer.toLowerCase();
  if (key.includes("university")) return <GraduationCap className={className} aria-hidden />;
  if (key.includes("linkedin")) return <Linkedin className={className} aria-hidden />;
  // Default
  return <Building2 className={className} aria-hidden />;
}

export default function Credentials() {
  const roleOptions = useMemo(() => {
    const set = new Set<string>();
    certificates.forEach((c) => inferRoles(c).forEach((r) => set.add(r)));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const [selectedRole, setSelectedRole] = useState<string>("All");

  const visible = useMemo(() => {
    if (selectedRole === "All") return certificates;
    return certificates.filter((c) => inferRoles(c).includes(selectedRole));
  }, [selectedRole]);

  const hasCerts = visible.length > 0;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Licence & Certificates</h1>

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

        {!hasCerts ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-8 text-gray-600">
            No certificates for this role. Try a different filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((c) => {
              const issued = formatMonth(c.issueDate);
              const expires = c.expirationDate ? formatMonth(c.expirationDate) : null;

              return (
                <div
                  key={c.id}
                  className="p-5 bg-gray-800 text-white rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    
                    <div>
                      <h2 className="text-lg font-semibold leading-tight">{c.name}</h2>
                      <p className="text-gray-300 text-sm flex items-center gap-1.5">
                        <IssuerIcon issuer={c.issuer} className="h-4 w-4" />
                        <span>{c.issuer}</span>
                      </p>
                      <p className="text-gray-400 text-xs">
                        {issued ? `Issued ${issued}` : null}
                        {issued && expires ? " · " : null}
                        {expires ? `Expires ${expires}` : null}
                      </p>
                    </div>
                  </div>

                  {c.skills?.length ? (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {c.skills.map((s) => (
                        <span key={s} className="text-xs bg-gray-700 px-2 py-1 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="flex gap-2 mt-2">
                    {c.credentialUrl ? (
                      <a
                        href={c.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 text-sm bg-blue-600 rounded hover:bg-blue-700 transition inline-flex items-center gap-2"
                      >
                        <Linkedin className="h-4 w-4" aria-hidden />
                        <span>View on LinkedIn</span>
                        <ExternalLink className="h-4 w-4 opacity-80" aria-hidden />
                      </a>
                    ) : null}
                    {c.certificateUrl ? (
                      <a
                        href={c.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 text-sm bg-gray-700 rounded hover:bg-gray-600 transition inline-flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" aria-hidden />
                        <span>Certificate</span>
                      </a>
                    ) : null}
                    {c.credentialId ? (
                      <span className="ml-auto text-xs text-gray-300 self-center inline-flex items-center gap-1.5">
                        <IdCard className="h-4 w-4" aria-hidden />
                        <span>ID: {c.credentialId}</span>
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}