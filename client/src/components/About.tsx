import { User } from "lucide-react";

export default function About() {
  const technologies = [
    "Python (Pandas, NumPy, PyTorch)",
    "C/C++",
    "SQL & NoSQL Databases",
    "Machine Learning & NLP",
    "TensorFlow & Scikit-learn",
    "PowerBI & Tableau",
    "Docker & Git",
    "MATLAB",
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3">
          <span className="text-black">/</span> about me
        </h2>

        <div className="max-w-3xl space-y-8">
          <div className="flex items-start gap-8">
            <div className="hidden md:block">
              <div className="w-32 h-32 rounded-lg border-2 border-primary/20 flex items-center justify-center bg-background">
                <User className="w-16 h-16 text-primary/40" />
              </div>
            </div>

            <div className="flex-1 space-y-4 text-foreground/90 leading-relaxed">
              <p>
                I'm currently pursuing my <strong className="text-black">Master of Science in Data Science</strong> at <strong className="text-black">New York Institute of Technology</strong> (expected May 2027). 
                Before this, I graduated from the <strong className="text-black">University of Southampton</strong> with a <strong className="text-black">Bachelor of Engineering in Electrical and Electronics Engineering</strong> (June 2023).
              </p>
              
              <p>
                I bring over a year of hands-on IT work experience, specializing in automation, data analytics, and system optimization.
              </p>
            </div>
          </div>

          {/* Technologies Section */}
          <div className="pt-4">
            <p className="text-foreground/80 mb-4">
              Here are some technologies I have been working with:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {technologies.map((tech, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-foreground/80">
                  <span className="text-primary">▹</span>
                  <span className="font-mono">{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Interests */}
          <div className="pt-4 text-foreground/80">
            <p>
              Outside of work, I'm interested in following the developments of science. I also play a lot of video games. And make python scripts to make my life easier :)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
