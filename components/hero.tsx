'use client';

import * as React from 'react';
import { useVibe } from '@/components/theme-provider';
import { Terminal, Sparkles, Users, Music } from 'lucide-react';

export function Hero() {
  const { vibeLevel } = useVibe();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Status message rotation
  const statuses = [
    "Hosting socials",
    "Hosting great nights",
    "Building community",
    "Connecting good people"
  ];
  const [statusIdx, setStatusIdx] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % statuses.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Canvas background animation based on Vibe Level
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Floating orbs
    const numOrbs = 15;
    const orbs = Array(numOrbs).fill(0).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 100 + 50,
      hueOffset: Math.random() * 30
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Determine base hue based on vibe
      let baseHue = 40; // Cream/Warm
      let lightness = 90;
      let saturation = 20;
      let speedFactor = 0.5;

      if (vibeLevel > 79) {
        baseHue = 260; // Indigo/Purple
        lightness = 30;
        saturation = 60;
        speedFactor = 2;
      } else if (vibeLevel > 40) {
        baseHue = 20; // Terracotta/Orange
        lightness = 70;
        saturation = 50;
        speedFactor = 1.2;
      }

      ctx.globalCompositeOperation = vibeLevel > 79 ? 'screen' : 'multiply';

      orbs.forEach(orb => {
        // Update positions
        orb.x += orb.vx * speedFactor;
        orb.y += orb.vy * speedFactor;

        // Bounce off walls
        if (orb.x < -orb.radius) orb.x = width + orb.radius;
        if (orb.x > width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = height + orb.radius;
        if (orb.y > height + orb.radius) orb.y = -orb.radius;

        // Draw soft gradient orb
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, `hsla(${baseHue + orb.hueOffset}, ${saturation}%, ${lightness}%, 0.15)`);
        gradient.addColorStop(1, `hsla(${baseHue + orb.hueOffset}, ${saturation}%, ${lightness}%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Subtle grid overlay
      if (vibeLevel <= 79) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = `hsla(${baseHue}, 10%, 50%, 0.03)`;
        ctx.lineWidth = 1;
        const gridSize = 40;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [vibeLevel]);

  // Split title to allow hover letter animations
  const title1 = "VIBE ENGINEER";
  const title2 = "& HOST";

  return (
    <section className="relative w-full h-screen flex flex-col justify-between overflow-hidden bg-background">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 film-grain" />

      {/* Top Floating Bar */}
      <div className="w-full pt-6 px-6 flex justify-center z-10 select-none pointer-events-none">
        <div className="soft-card px-6 py-2 rounded-full flex items-center gap-4 text-xs font-medium tracking-wide pointer-events-auto backdrop-blur-md bg-card/80">
          <div className="flex items-center gap-2 text-primary">
            {vibeLevel > 79 ? (
              <Music className="w-4 h-4 animate-pulse" />
            ) : vibeLevel > 40 ? (
              <Sparkles className="w-4 h-4 animate-spin-slow" />
            ) : (
              <Users className="w-4 h-4 animate-float" />
            )}
            <span>ACTIVE</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="hidden md:block text-muted-foreground w-64 text-center">
            {statuses[statusIdx]}
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="text-accent">
            VOL: {vibeLevel}%
          </div>
        </div>
      </div>

      {/* Central Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 z-10 text-center select-none">
        <div className="max-w-6xl flex flex-col items-center">
          
          <h1 className="text-[10vw] md:text-[8vw] leading-none font-bold tracking-tight mb-8 flex flex-col items-center">
            {/* Row 1 */}
            <span className="flex flex-wrap justify-center text-foreground">
              {title1.split(" ").map((word, wIdx) => (
                <span key={wIdx} className="flex mr-6 md:mr-10 last:mr-0">
                  {word.split("").map((letter, lIdx) => (
                    <span
                      key={lIdx}
                      className="inline-block transition-all duration-300 hover:-translate-y-4 hover:text-primary cursor-default select-none hover:rotate-6"
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              ))}
            </span>

            {/* Row 2 */}
            <span className="flex flex-wrap justify-center gap-x-2 md:gap-x-4 text-accent mt-2">
              {title2.split(" ").map((word, wIdx) => (
                <span key={wIdx} className="flex">
                  {word.split("").map((letter, lIdx) => (
                    <span
                      key={lIdx}
                      className="inline-block transition-all duration-300 hover:-translate-y-4 hover:text-primary cursor-default select-none hover:-rotate-6"
                      style={{
                        animationDelay: `${lIdx * 0.1}s`
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </h1>

          {/* Subtitle Badge */}
          <div className="soft-card px-8 py-4 rounded-full flex items-center gap-3 backdrop-blur-md bg-card/90">
            <Terminal className="w-5 h-5 text-primary animate-gentle-pulse" />
            <p className="text-lg md:text-xl font-medium text-foreground tracking-wide">
              Sober. Intuitive. Community Host. I don't chase the crowd's energy, I feel it, shape it, and make strangers feel like family.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Ticker */}
      <div className="w-full border-t border-border/50 py-3 overflow-hidden select-none z-10 bg-background/50 backdrop-blur-sm">
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap text-xs font-medium tracking-widest uppercase text-muted-foreground">
          <span className="mx-6">Vibe coordination</span>
          <span className="mx-6 text-primary">•</span>
          <span className="mx-6">Connecting people</span>
          <span className="mx-6 text-primary">•</span>
          <span className="mx-6">50+ events hosted</span>
          <span className="mx-6 text-primary">•</span>
          <span className="mx-6">Real connections</span>
          <span className="mx-6 text-primary">•</span>
          <span className="mx-6">Vibe coordination</span>
          <span className="mx-6 text-primary">•</span>
          <span className="mx-6">Connecting people</span>
        </div>
      </div>
    </section>
  );
}
