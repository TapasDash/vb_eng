'use client';

import * as React from 'react';
import { useVibe } from '@/components/theme-provider';
import { Sliders, Users, FileCheck, Anchor } from 'lucide-react';

export function CorePillars() {
  const { vibeLevel } = useVibe();

  return (
    <section className="w-full bg-background px-4 py-24 md:py-32 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center gap-3 mb-16">
          <Anchor className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Core Pillars
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="soft-card p-8 flex flex-col justify-between min-h-64 group hover:scale-[1.02] transition-transform duration-300">
            <div>
              <div className="mb-8 flex justify-between items-center text-primary">
                <div className="p-3 bg-secondary rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Sliders className="w-8 h-8" />
                </div>
                <span className="font-sans font-bold text-4xl text-muted/30 group-hover:text-primary/10 transition-colors duration-300">01</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Event Hosting</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Bringing people together and throwing great day parties without needing liquid courage.
              </p>
            </div>
          </div>
          
          {/* Pillar 2 */}
          <div className="soft-card p-8 flex flex-col justify-between min-h-64 group hover:scale-[1.02] transition-transform duration-300">
            <div>
              <div className="mb-8 flex justify-between items-center text-primary">
                <div className="p-3 bg-secondary rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Users className="w-8 h-8" />
                </div>
                <span className="font-sans font-bold text-4xl text-muted/30 group-hover:text-primary/10 transition-colors duration-300">02</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Crowd Connection</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Breaking the ice, connecting solo travelers, and making sure everyone in the hostel feels included.
              </p>
            </div>
          </div>
          
          {/* Pillar 3 */}
          <div className="soft-card p-8 flex flex-col justify-between min-h-64 group hover:scale-[1.02] transition-transform duration-300">
            <div>
              <div className="mb-8 flex justify-between items-center text-primary">
                <div className="p-3 bg-secondary rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <FileCheck className="w-8 h-8" />
                </div>
                <span className="font-sans font-bold text-4xl text-muted/30 group-hover:text-primary/10 transition-colors duration-300">03</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Real Proof</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Real reviews and history from hosting events across Thailand, Vietnam, and beyond.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
