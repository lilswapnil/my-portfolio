"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
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
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [colors, setColors] = useState<{ primary: string; secondary: string }>({ primary: '', secondary: '' });

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

  useEffect(() => {
    setMounted(true);
    // Generate random green and blue hues
    const greenShades = ['bg-green-500', 'bg-green-600', 'bg-emerald-500', 'bg-teal-500'];
    const blueShades = ['bg-blue-500', 'bg-blue-600', 'bg-cyan-500', 'bg-indigo-500'];
    setColors({
      primary: greenShades[Math.floor(Math.random() * greenShades.length)],
      secondary: blueShades[Math.floor(Math.random() * blueShades.length)]
    });
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';
  const hasCerts = visible.length > 0;

  return (
    <div className={`min-h-screen py-16 ${isDark ? 'dark' : ''}`}>
      {/* Background gradient blur effect with molecular animation */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 spiral-1 ${colors.primary}`} />
        <div className={`absolute bottom-40 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 spiral-2 ${colors.secondary}`} />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className={`text-5xl md:text-6xl font-bold mb-3 text-primary ${isDark ? 'dark' : ''}`}>
            Licenses & Certificates
          </h1>
          <p className={`text-lg text-secondary ${isDark ? 'dark' : ''}`}>
            Professional credentials and achievements
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-12">
          <div className={`glass-container rounded-2xl p-4 md:p-6 ${isDark ? 'dark' : ''}`}>
            <h3 className={`text-sm font-semibold mb-4 text-secondary ${isDark ? 'dark' : ''} uppercase tracking-wider`}>
              Filter by Category
            </h3>
            <div className="flex flex-wrap gap-3">
              {roleOptions.map((role) => {
                const active = role === selectedRole;
                return (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                      ${
                        active
                          ? `glass-button ${isDark ? 'dark' : ''} scale-105 shadow-lg`
                          : `border ${isDark ? 'border-gray-700/50 text-secondary' : 'border-white/40 text-secondary'} 
                             hover:border-white/60 hover:scale-105 ${isDark ? 'dark' : ''}`
                      }
                    `}
                  >
                    {role}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className={`mb-8 text-sm text-tertiary ${isDark ? 'dark' : ''}`}>
          Showing {visible.length} credential{visible.length !== 1 ? 's' : ''}
        </div>

        {!hasCerts ? (
          <div className={`text-center py-16 glass-container rounded-2xl ${isDark ? 'dark' : ''}`}>
            <p className={`text-lg text-secondary ${isDark ? 'dark' : ''}`}>
              No credentials found for this category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((c) => {
              const issued = formatMonth(c.issueDate);
              const expires = c.expirationDate ? formatMonth(c.expirationDate) : null;

              return (
                <div
                  key={c.id}
                  className={`group glass-container rounded-2xl p-6 h-full flex flex-col transition-all duration-500 
                    hover:scale-105 hover:shadow-2xl shadow-lg ${isDark ? 'dark' : ''}`}
                >
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-start gap-3 mb-3">
                      
                      <div className="flex-1">
                        <h2 className={`text-lg font-bold text-primary group-hover:text-accent transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
                          {c.name}
                        </h2>
                        <p className={`text-secondary text-sm flex items-center gap-1.5 ${isDark ? 'dark' : ''}`}>
                          {c.issuer}
                        </p>
                      </div>
                    </div>

                    {/* Dates */}
                    <p className={`text-xs text-tertiary ${isDark ? 'dark' : ''}`}>
                      {issued ? `Issued ${issued}` : null}
                      {issued && expires ? " · " : null}
                      {expires ? `Expires ${expires}` : null}
                    </p>
                  </div>

                  {/* Skills/Tags */}
                  {c.skills?.length ? (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {c.skills.map((s) => (
                        <span 
                          key={s} 
                          className={`text-xs px-3 py-1 rounded-full font-medium border transition-all duration-300 ${
                            isDark 
                              ? 'bg-purple-900/30 text-white-300 border-purple-700/50 group-hover:bg-purple-800/50' 
                              : 'bg-purple-100/40 text-white-700 border-purple-200/70 group-hover:bg-purple-100/60'
                          }`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {/* Actions */}
                  <div className="mt-auto pt-6 border-t flex flex-col gap-3" style={{
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'
                  }}>
                    <div className="flex flex-wrap gap-2">
                      {c.credentialUrl ? (
                        <a
                          href={c.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 min-w-max px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 
                            glass-button flex items-center justify-center gap-2 group-hover:scale-105 ${isDark ? 'dark' : ''}`}
                        >
                          <Linkedin className="h-4 w-4" aria-hidden />
                          <span>LinkedIn</span>
                        </a>
                      ) : null}
                      {c.certificateUrl ? (
                        <a
                          href={c.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 min-w-max px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 
                            glass-button flex items-center justify-center gap-2 group-hover:scale-105 ${isDark ? 'dark' : ''}`}
                        >
                          <FileText className="h-4 w-4" aria-hidden />
                          <span>Certificate</span>
                        </a>
                      ) : null}
                    </div>

                    {c.credentialId ? (
                      <div className={`text-xs text-tertiary ${isDark ? 'dark' : ''} flex items-center gap-1.5 pt-2 border-t`} style={{
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)'
                      }}>
                        <IdCard className="h-3.5 w-3.5" aria-hidden />
                        <span className="truncate">ID: {c.credentialId}</span>
                      </div>
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