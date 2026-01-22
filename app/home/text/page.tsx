import React from "react";
import styles from "./texts.module.css";

const items: Array<{ label: string; special?: boolean; bold?: boolean }> = [
  { label: "Python" },
  { label: "JavaScript" },
  
  { label: "TypeScript" },
  { label: "Java" },
  { label: "SQL" },
  { label: "Bash" },
  { label: "HTML" },
  { label: "CSS" },
  { label: "React" },
  { label: "Next.js" },
  { label: "Angular" },
  
  { label: "TailwindCSS" },
  { label: "Node.js" },
  { label: "Express" },
  { label: "Spring Boot" },
  { label: "FastAPI" },
  { label: "Django" },
  { label: "Flask" },
  { label: "PostgreSQL" },
  { label: "MySQL" },
  { label: "SQL Server" },
  
  { label: "MongoDB" },
  { label: "DynamoDB" },
  { label: "Apache Spark" },
  { label: "Apache Hadoop" },
  { label: "Tableau" },
  { label: "Power BI" },
  { label: "Matplotlib" },
  { label: "Seaborn" },
  { label: "Transformers" },
  { label: "BERT" },
  { label: "LLaMA" },
  { label: "LoRA" },
  { label: "LangChain" },
  { label: "TensorFlow" },
  { label: "Keras" },
  { label: "PyTorch" },
  { label: "scikit-learn" },
  { label: "OpenCV" },
  { label: "spaCy" },
  { label: "AWS EC2" },
  { label: "AWS S3" },
  { label: "AWS Lambda" },
  { label: "Docker" },
  { label: "Kubernetes" },
  { label: "Terraform" },
  { label: "Jenkins" },
  { label: "GitHub Actions" },
  { label: "RESTful APIs" },
  { label: "Linux/Unix" },
  { label: "Software Engineer", special: true, bold: true },
];

export default function Page(): React.ReactElement {
  return (
    <main className={styles.page}>
      <div className={styles.stuckGridWrapper}>
        <div className={styles.stuckGrid}>
          {items.map((item, idx) => {
            const cn = `${styles.gridItem} ${item.special ? styles.special : ""}`;
            return (
              <div key={`${item.label}-${idx}`} className={cn}>
                {item.bold ? <b>{item.label}</b> : item.label}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
