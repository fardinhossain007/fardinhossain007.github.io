import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import FibonacciSpiral from "./FibonacciSpiral";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "hey, I'm fardin.";
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-20"
    >
      <div className="container mx-auto text-center">
        {/* Fibonacci Spiral */}
        <div className="mb-8 mt-12">
          <FibonacciSpiral />
        </div>

        {/* Main heading with typing effect */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-foreground">{displayText.slice(0, 5)}</span>
          <span className="text-primary">{displayText.slice(5)}</span>
          <span className={`${showCursor ? "opacity-100" : "opacity-0"}`}>|</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          I build things that (hopefully) don't break in production.
        </p>

        {/* Introduction */}
        <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed">
          Data scientist by day, debugging enthusiast by night. Currently pursuing my Master's 
          in Data Science at NYIT while automating everything I can get my hands on. 
          If it involves Python, machine learning, or making computers do the boring stuff, I'm in.
        </p>

        {/* CTA Button */}
        <Button
          size="lg"
          variant="outline"
          className="border-2 border-primary bg-transparent text-primary hover:bg-primary/10 transition-all duration-300 rounded-xl px-8 py-6 text-lg font-medium"
          onClick={() => window.location.href = "mailto:fardintonu@gmail.com"}
        >
          <Mail className="mr-3 h-5 w-5" />
          Say hi!
        </Button>
      </div>
    </section>
  );
}
