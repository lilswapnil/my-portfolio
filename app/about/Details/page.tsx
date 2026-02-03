

import React from "react";
import { syr, sppu, bvp, syr_icon, sppu_icon, bvp_icon } from "../../../data/images";

const education = [
    {
        icon: syr_icon,
        image: syr,
        title: "Syracuse University",
        subtitle : "M.S. in Computer Science",
        description:
            "My master’s studies focused on building a strong foundation in systems, data, and applied AI. I worked across areas like artificial intelligence, natural language processing, databases, operating systems, and algorithms, with an emphasis on turning theory into production-oriented projects. Through hands-on work in data pipelines, AI-driven analytics, and real-time systems, I developed a practical approach to designing reliable, scalable software.",
    },
    {
        icon: sppu_icon,
        image: sppu,
        title: "Pune University",
        subtitle: "B.E. in Information Technology",
        description:
            "During my undergraduate studies, I built a comprehensive foundation in software engineering, databases, cloud computing, and machine learning. I worked on projects ranging from full-stack web systems to applied machine learning, including a medical imaging capstone. This experience shaped my interest in combining data, engineering, and problem-solving to build systems with real-world impact.",
    },
    {
        icon: bvp_icon,
        image: bvp,
        title:
            "Bharati Vidyapeeth Institute Of Technology",
        subtitle: "Diploma in Computer Technology",
        description:
            "My diploma program laid the groundwork for my technical journey, introducing me to core computer science fundamentals such as data structures, object-oriented programming, operating systems, networks, and databases. Through early projects and hands-on coursework, I developed a strong comfort with programming and system thinking that continues to influence how I approach engineering problems today.",
    },
];

import styles from "../Details/details.module.css";

export default function Details() {
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    React.useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setIsDarkMode(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);
    return (
        <div className={`${styles.root} min-h-screen flex flex-col`}>
            <main className={`${styles.main} flex-1`}>
                {education.map((item, idx) => (
                    <section className={styles.section} key={item.title}>
                        <figure className={styles.imageContainer}>
                            <img src={item.image} alt={item.title} loading="lazy" />
                        </figure>
                        <article className={styles.content}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {item.icon && (
                                    <img src={item.icon} alt={item.title + ' icon'} style={{ width: 150, height: 150, marginBottom: 8 }} />
                                )}
                                <h2 className={styles.sectionTitle}>{item.title}</h2>
                            </div>
                            <h3 className={styles.sectionSubtitle}>{item.subtitle}</h3>
                            <p>{item.description}</p>
                        </article>
                    </section>
                ))}
            </main>
        </div>
    );
}
