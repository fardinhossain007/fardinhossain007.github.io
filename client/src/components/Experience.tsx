import { useState } from "react";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  responsibilities: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: "New York Institute of Technology",
    role: "Student Worker - Institutional Research",
    period: "JANUARY 2026 – PRESENT",
    location: "Dhaka, Bangladesh",
    responsibilities: [
      "Built Python automation scripts using Tenable.sc API to extract and process vulnerability data, reducing manual analysis time by 50% and enabling same-day risk assessments for the security team.",
      "Designed Power BI dashboards tracking vulnerability trends across 500+ assets by severity and remediation status, providing executive visibility into high-risk security gaps and improving patch deployment prioritization.",
    ],
  },
  {
    company: "Air Alliance Ltd.",
    role: "Management Trainee – Information Technology",
    period: "AUGUST 2024 – AUGUST 2025",
    location: "Dhaka, Bangladesh",
    responsibilities: [
      "Deployed and managed Microsoft Entra ID and Intune MDM across 200+ endpoints in collaboration with IT team, standardizing security policies across 3 office locations and reducing unauthorized access incidents by 40%.",
      "Provided technical support for email configuration, hardware provisioning, and software troubleshooting for 200+ employees, maintaining 95%+ uptime and ensuring compliance with corporate IT policies.",
      "Automated IT asset management by designing a MySQL relational database with schemas linking assets to departments and users, and building an IT-facing interface to add, update, and retire assets; used Navicat for schema management and data validation, replacing manual spreadsheet tracking.,
    ],
  },
  {
    company: "Robi Axiata Ltd.",
    role: "Risk and Compliance Intern",
    period: "APRIL 2024 – JULY 2024",
    location: "Dhaka, Bangladesh",
    responsibilities: [
      "Built Python automation scripts using Tenable.sc API to extract and process vulnerability data, reducing manual analysis time by 50% and enabling same-day risk assessments for the security team.",
      "Designed Power BI dashboards tracking vulnerability trends across 500+ assets by severity and remediation status, providing executive visibility into high-risk security gaps and improving patch deployment prioritization.",
    ],
  },
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="min-h-screen py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">
          <span className="text-accent">/</span> experience
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Tab buttons */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
            {experiences.map((exp, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-3 text-left whitespace-nowrap md:whitespace-normal transition-all duration-300 border-l-2 md:border-l-2 ${
                  activeTab === index
                    ? "border-accent text-accent bg-accent/5"
                    : "border-border text-muted-foreground hover:bg-muted/50"
                }`}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold">
                  {experiences[activeTab].role}{" "}
                  <span className="text-accent">@ {experiences[activeTab].company}</span>
                </h3>
                <p className="text-sm text-muted-foreground mt-2 font-mono">
                  {experiences[activeTab].period}
                </p>
                <p className="text-sm text-muted-foreground font-mono">
                  {experiences[activeTab].location}
                </p>
              </div>

              <ul className="space-y-4">
                {experiences[activeTab].responsibilities.map((item, index) => (
                  <li key={index} className="flex gap-3 text-foreground/80">
                    <span className="text-accent mt-1 flex-shrink-0">▹</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
