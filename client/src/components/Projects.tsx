import { ExternalLink, Github, Folder } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Automated PCB Defect Detection with AI",
    description: "Designed and trained a ResNet-18 multi-label CNN for PCB defect detection, achieving 90.62% F1-score with 98.46% recall on the DeepPCB dataset using optimized precision-recall thresholds. Built an automated deep learning pipeline with augmentation, feature calibration, and real-time inference (~40 img/sec) for industrial inspection.",
    technologies: ["Python", "PyTorch", "ResNet-18", "OpenCV", "Computer Vision"],
    githubUrl: "https://github.com/fardinhossain007",
    featured: true,
  },
  {
    title: "Formula 1 Podium Predictor",
    description: "Developed ML system predicting F1 podium finishers with 96.6% accuracy by training and comparing 4 models on 5 years of race data; Random Forest outperformed XGBoost and Neural Network with 88.9% precision/recall. Engineered 60+ features including driver momentum, hot streaks, and circuit history through temporal analysis; identified recent form as top predictor (11.9% importance ranking).",
    technologies: ["Python", "Scikit-learn", "XGBoost", "TensorFlow", "FastF1 API"],
    githubUrl: "https://github.com/fardinhossain007",
    featured: true,
  },
  {
    title: "NYC Taxi Fare Prediction",
    description: "Developed regression model predicting taxi fares with $1.79 RMSE and 85.3% R² on 1M samples; trained and evaluated 4 models with Random Forest outperforming Gradient Boosting, achieving 0% unreasonable predictions. Created 20+ engineered features from geospatial and temporal data including rush hour premiums (+7-15%) and inflation tracking (+48% 2016-2025); implemented dual-tier data cleaning improving airport trip predictions by 60% while maintaining 77% data retention rate.",
    technologies: ["Python", "Random Forest", "Pandas", "NumPy", "Matplotlib"],
    githubUrl: "https://github.com/fardinhossain007",
  },
  {
    title: "Biodegradable Flexible PCB",
    description: "University of Southampton undergraduate thesis project exploring cellulose acetate as an eco-friendly alternative to traditional flexible PCB substrates. Designed and printed a fully functional LED circuit on biodegradable material using Autodesk Eagle for circuit design and programmed an ATTINY85 via Arduino IDE.",
    technologies: ["Eagle PCB", "Arduino IDE", "Materials Science", "Circuit Design"],
  },
  {
    title: "Smart Meter with Buck Converter",
    description: "University of Southampton project: Built a buck-switching power supply converting 230V AC to 5V DC for a smart meter with advanced energy management. Designed the schematic and PCB layout using Cadence OrCAD to integrate the power supply with microcontroller and interface circuitry.",
    technologies: ["OrCAD PCB Designer", "Power Electronics", "Embedded Systems"],
  },
];

export default function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="min-h-screen py-20 bg-card">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">
          <span className="text-accent">/</span> things I've built
        </h2>

        {/* Featured Projects */}
        <div className="space-y-12 mb-16">
          {featuredProjects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-background border border-border rounded-lg p-6 md:p-8 hover:border-accent/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Project icon */}
                <div className="w-full md:w-1/4 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center border border-border group-hover:border-accent/30 transition-all">
                  <Folder className="w-16 h-16 text-primary/60" />
                </div>

                {/* Project details */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-foreground/70 mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-accent transition-colors"
                        aria-label="View on GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-accent transition-colors"
                        aria-label="View live demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <Card
              key={index}
              className="bg-background border-border hover:border-accent/50 transition-all duration-300 group hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <Folder className="w-10 h-10 text-primary/60 group-hover:text-accent transition-colors" />
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-accent transition-colors"
                        aria-label="View on GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-accent transition-colors"
                        aria-label="View live demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-accent transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-foreground/70 leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs font-mono text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
