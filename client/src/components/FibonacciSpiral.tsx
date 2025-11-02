import { useEffect, useRef, useState } from "react";

export default function FibonacciSpiral() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [scrollScale, setScrollScale] = useState(0.6); // Start bigger
  const [scrollOpacity, setScrollOpacity] = useState(1);

  // Handle scroll-based scaling and fading
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Scale grows from 0.6 to 2.5 as user scrolls down (much bigger)
      // Grows over first 60% of viewport height
      const scaleProgress = Math.min(scrollY / (windowHeight * 0.6), 1);
      const scale = 0.6 + (scaleProgress * 1.9); // 0.6 to 2.5
      setScrollScale(scale);
      
      // Fade out starts at 40% scroll and completes at 60%
      const fadeStart = windowHeight * 0.4;
      const fadeEnd = windowHeight * 0.6;
      
      if (scrollY < fadeStart) {
        setScrollOpacity(1);
      } else if (scrollY > fadeEnd) {
        setScrollOpacity(0);
      } else {
        const fadeProgress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        setScrollOpacity(1 - fadeProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation loop for drawing/undrawing
  useEffect(() => {
    const drawDuration = 2500;
    const pauseDuration = 800;
    const undrawDuration = 1500;
    const cycleDuration = drawDuration + pauseDuration + undrawDuration + pauseDuration;

    let startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const cyclePosition = elapsed % cycleDuration;

      let progress = 0;

      if (cyclePosition < drawDuration) {
        progress = (cyclePosition / drawDuration) * 10;
      } else if (cyclePosition < drawDuration + pauseDuration) {
        progress = 10;
      } else if (cyclePosition < drawDuration + pauseDuration + undrawDuration) {
        const undrawProgress = (cyclePosition - drawDuration - pauseDuration) / undrawDuration;
        progress = 10 * (1 - undrawProgress);
      } else {
        progress = 0;
      }

      setAnimationProgress(progress);
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    const baseScale = 1.8;
    const scale = baseScale * scrollScale; // Apply scroll-based scaling

    // Calculate positions for proper golden spiral layout
    const rectangles: Array<{ x: number; y: number; size: number; direction: number }> = [];
    rectangles.push({ x: 0, y: 0, size: fibonacci[0], direction: 0 });
    rectangles.push({ x: -fibonacci[1], y: 0, size: fibonacci[1], direction: 1 });
    rectangles.push({ x: -fibonacci[1], y: -fibonacci[2], size: fibonacci[2], direction: 2 });
    rectangles.push({ x: fibonacci[2] - fibonacci[1], y: -fibonacci[2], size: fibonacci[3], direction: 3 });
    rectangles.push({ x: fibonacci[2] - fibonacci[1], y: 0, size: fibonacci[4], direction: 0 });
    rectangles.push({ x: -fibonacci[1] - fibonacci[5], y: -fibonacci[2], size: fibonacci[5], direction: 1 });
    rectangles.push({ x: -fibonacci[1] - fibonacci[5], y: -fibonacci[2] - fibonacci[6], size: fibonacci[6], direction: 2 });
    rectangles.push({ x: fibonacci[6] - fibonacci[1] - fibonacci[5], y: -fibonacci[2] - fibonacci[6], size: fibonacci[7], direction: 3 });
    rectangles.push({ x: fibonacci[6] - fibonacci[1] - fibonacci[5], y: fibonacci[7] - fibonacci[2] - fibonacci[6], size: fibonacci[8], direction: 0 });
    rectangles.push({ x: -fibonacci[1] - fibonacci[5] - fibonacci[9], y: fibonacci[7] - fibonacci[2] - fibonacci[6], size: fibonacci[9], direction: 1 });

    const steps = Math.floor(animationProgress);
    const partialProgress = animationProgress % 1;

    ctx.strokeStyle = "#1e3a8a";
    ctx.lineWidth = 2;
    ctx.globalAlpha = scrollOpacity; // Apply scroll-based opacity

    // Function to draw one spiral
    const drawSpiral = (flipX: number, flipY: number) => {
      ctx.save();
      ctx.scale(flipX, flipY);

      // Draw completed rectangles and arcs
      for (let i = 0; i < steps && i < rectangles.length; i++) {
        const rect = rectangles[i];
        const size = rect.size * scale;
        const x = rect.x * scale;
        const y = rect.y * scale;

        ctx.globalAlpha = 0.6 * scrollOpacity;
        ctx.strokeRect(x, y, size, size);

        // Draw arc
        ctx.globalAlpha = 0.75 * scrollOpacity;
        ctx.beginPath();
        
        let centerX, centerY, startAngle, endAngle;
        
        switch (i % 4) {
          case 0:
            centerX = x + size;
            centerY = y + size;
            startAngle = Math.PI;
            endAngle = Math.PI * 1.5;
            break;
          case 1:
            centerX = x;
            centerY = y + size;
            startAngle = Math.PI * 1.5;
            endAngle = Math.PI * 2;
            break;
          case 2:
            centerX = x;
            centerY = y;
            startAngle = 0;
            endAngle = Math.PI * 0.5;
            break;
          case 3:
            centerX = x + size;
            centerY = y;
            startAngle = Math.PI * 0.5;
            endAngle = Math.PI;
            break;
          default:
            centerX = x;
            centerY = y;
            startAngle = 0;
            endAngle = Math.PI * 0.5;
        }
        
        ctx.arc(centerX, centerY, size, startAngle, endAngle);
        ctx.stroke();
      }

      // Draw partial rectangle and arc
      if (partialProgress > 0 && steps < rectangles.length) {
        const rect = rectangles[steps];
        const size = rect.size * scale;
        const x = rect.x * scale;
        const y = rect.y * scale;

        const rectProgress = Math.min(partialProgress / 0.3, 1);
        if (rectProgress > 0) {
          ctx.globalAlpha = 0.6 * partialProgress * scrollOpacity;
          ctx.beginPath();
          ctx.moveTo(x, y);
          
          const perim = size * 4;
          const drawLength = perim * rectProgress;
          
          if (drawLength <= size) {
            ctx.lineTo(x + drawLength, y);
          } else if (drawLength <= size * 2) {
            ctx.lineTo(x + size, y);
            ctx.lineTo(x + size, y + (drawLength - size));
          } else if (drawLength <= size * 3) {
            ctx.lineTo(x + size, y);
            ctx.lineTo(x + size, y + size);
            ctx.lineTo(x + size - (drawLength - size * 2), y + size);
          } else {
            ctx.lineTo(x + size, y);
            ctx.lineTo(x + size, y + size);
            ctx.lineTo(x, y + size);
            ctx.lineTo(x, y + size - (drawLength - size * 3));
          }
          ctx.stroke();
        }

        const arcProgress = Math.max(0, (partialProgress - 0.3) / 0.7);
        if (arcProgress > 0) {
          ctx.globalAlpha = 0.75 * partialProgress * scrollOpacity;
          ctx.beginPath();

          let centerX, centerY, startAngle, endAngle;
          
          switch (steps % 4) {
            case 0:
              centerX = x + size;
              centerY = y + size;
              startAngle = Math.PI;
              endAngle = Math.PI + (Math.PI * 0.5 * arcProgress);
              break;
            case 1:
              centerX = x;
              centerY = y + size;
              startAngle = Math.PI * 1.5;
              endAngle = Math.PI * 1.5 + (Math.PI * 0.5 * arcProgress);
              break;
            case 2:
              centerX = x;
              centerY = y;
              startAngle = 0;
              endAngle = Math.PI * 0.5 * arcProgress;
              break;
            case 3:
              centerX = x + size;
              centerY = y;
              startAngle = Math.PI * 0.5;
              endAngle = Math.PI * 0.5 + (Math.PI * 0.5 * arcProgress);
              break;
            default:
              centerX = x;
              centerY = y;
              startAngle = 0;
              endAngle = Math.PI * 0.5 * arcProgress;
          }

          ctx.arc(centerX, centerY, size, startAngle, endAngle);
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    // Draw 4 mirrored spirals from center
    ctx.save();
    ctx.translate(width / 2, height / 2);

    // Top-right quadrant (original)
    drawSpiral(1, 1);
    
    // Top-left quadrant (flip X)
    drawSpiral(-1, 1);
    
    // Bottom-left quadrant (flip X and Y)
    drawSpiral(-1, -1);
    
    // Bottom-right quadrant (flip Y)
    drawSpiral(1, -1);

    ctx.restore();
  }, [animationProgress, scrollScale, scrollOpacity]);

  return (
    <div ref={containerRef} className="transition-opacity duration-300">
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="mx-auto"
        style={{ maxWidth: "100%" }}
      />
    </div>
  );
}
