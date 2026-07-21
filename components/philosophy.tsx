'use client';

import * as React from 'react';
import { useVibe } from '@/components/theme-provider';
import { ShieldCheck, HeartCrack, Layers, Sparkles } from 'lucide-react';

function TiltCard({ 
  title, 
  icon: Icon,
  description,
  number
}: { 
  title: string; 
  icon: React.ComponentType<any>;
  description: string;
  number: string;
}) {
  const [transform, setTransform] = React.useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const { vibeLevel } = useVibe();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation degree based on hover position (-10 to 10 deg)
    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = -(((y / rect.height) - 0.5) * 12);
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      className="soft-card p-8 transition-all duration-200 ease-out cursor-default relative overflow-hidden group select-none flex flex-col justify-between min-h-[300px]"
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="p-3 bg-secondary rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            <Icon className="w-8 h-8" />
          </div>
          <span className="text-4xl font-black text-muted/30 group-hover:text-primary/10 transition-colors duration-300">{number}</span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

export function Philosophy() {
  return (
    <section className="w-full bg-secondary/30 px-4 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-16">
          <Sparkles className="w-8 h-8 text-accent" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            The Philosophy
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TiltCard 
            title="Authenticity"
            icon={ShieldCheck}
            number="01"
            description="Zero alcohol required. Pure, magnetic presence that brings people out of their shell."
          />
          
          <TiltCard 
            title="Independence"
            icon={HeartCrack}
            number="02"
            description="I don't wait for a party to happen, I spark the flame and let everyone shine."
          />

          <TiltCard 
            title="Community"
            icon={Layers}
            number="03"
            description="Creating deep, authentic bonds that stick long after the backpacks are packed."
          />
        </div>
      </div>
    </section>
  );
}
