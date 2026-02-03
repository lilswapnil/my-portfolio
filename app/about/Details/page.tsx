"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { syr, sppu, bvp, syr_icon, sppu_icon, bvp_icon } from "../../../data/images";
import styles from "../Details/details.module.css";

const education = [
  {
    icon: syr_icon,
    image: syr,
    title: "Syracuse University",
    subtitle: "Masters in Computer Science",
    description:
      "My master’s studies focused on building a strong foundation in systems, data, and applied AI. I worked across areas like artificial intelligence, natural language processing, databases, operating systems, and algorithms, with an emphasis on turning theory into production-oriented projects. Through hands-on work in data pipelines, AI-driven analytics, and real-time systems, I developed a practical approach to designing reliable, scalable software.",
  },
  {
    icon: sppu_icon,
    image: sppu,
    title: "Pune University",
    subtitle: "Bachelors in Information Technology",
    description:
      "During my undergraduate studies, I built a comprehensive foundation in software engineering, databases, cloud computing, and machine learning. I worked on projects ranging from full-stack web systems to applied machine learning, including a medical imaging capstone. This experience shaped my interest in combining data, engineering, and problem-solving to build systems with real-world impact.",
  },
  {
    icon: bvp_icon,
    image: bvp,
    title: "Bharati Vidyapeeth",
    subtitle: "Diploma in Computer Technology",
    description:
      "My diploma program laid the groundwork for my technical journey, introducing me to core computer science fundamentals such as data structures, object-oriented programming, operating systems, networks, and databases. Through early projects and hands-on coursework, I developed a strong comfort with programming and system thinking that continues to influence how I approach engineering problems today.",
  },
];

export default function Details() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // prevents hydration mismatch (same pattern as Projects)

  const isDark = theme === "dark";

  return (
    <div className={`${styles.root} min-h-screen flex flex-col ${isDark ? "dark" : ""}`}>
      <main className={`${styles.main} flex-1`}>
        {education.map((item, idx) => (
          <section className={styles.section} key={`${item.title}-${idx}`}>
            <figure className={styles.imageContainer}>
              <Image
                src={item.image}
                alt={`${item.title} campus`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.heroImage}
                priority={idx === 0}
              />
            </figure>

            {/* Glass container like Projects */}
            <article
              className={`glass-container rounded-2xl p-6 md:p-8 ${styles.content} ${isDark ? "dark" : ""}`}
            >
              <div className={styles.headerBlock}>
                {item.icon && (
                  <Image
                    src={item.icon}
                    alt=""
                    width={150}
                    height={150}
                    className={styles.schoolIcon}
                    aria-hidden="true"
                  />
                )}
                <h2
                  className={`${styles.sectionTitle} ${!isDark ? 'text-black' : ''}`}
                >
                  {item.title}
                </h2>
              </div>

              <h3
                className={`${styles.sectionSubtitle} ${!isDark ? 'text-black' : ''}`}
              >
                {item.subtitle}
              </h3>
              <p
                className={`${styles.description} ${!isDark ? 'text-black' : ''}`}
              >
                {item.description}
              </p>
            </article>
          </section>
        ))}
      </main>
    </div>
  );
}
