'use client';

import * as React from 'react';
import { useVibe } from '@/components/theme-provider';
import { Flame, ShieldCheck, Heart, Sparkles, Activity, CheckCircle2, Eye, Compass } from 'lucide-react';

export function Manifesto() {
  const { vibeLevel } = useVibe();
  const [activeHighlight, setActiveHighlight] = React.useState<string | null>(null);

  const pillars = [
    {
      id: 'clarity',
      tag: '0% Alcohol',
      title: 'Zero Crutches. Pure Focus.',
      description: 'While others need booze to break the ice or get too wasted to notice who is standing alone, I stay 100% sober with total clarity.',
      icon: ShieldCheck,
      color: 'text-primary'
    },
    {
      id: 'ambivert',
      tag: 'Ambivert Intuition',
      title: 'Reading the Room\'s Pulse',
      description: 'Sensing when to turn the energy all the way up, when to spark a massive laugh, and when to let people just sit together and breathe.',
      icon: Eye,
      color: 'text-accent'
    },
    {
      id: 'connection',
      tag: 'Real Presence',
      title: 'Unforgettable Human Moments',
      description: 'No cheap tricks or forced party games. Just organic human connection that turns a room of strangers into a tight-knit family.',
      icon: Heart,
      color: 'text-primary'
    }
  ];

  return (
    <section className="w-full bg-background/80 px-4 py-24 md:py-36 relative overflow-hidden transition-colors duration-500">
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header Badge */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border/60 text-xs font-mono tracking-widest uppercase text-muted-foreground mb-6 backdrop-blur-md shadow-sm">
            <Compass className="w-3.5 h-3.5 text-primary animate-spin-slow" />
            <span>The Operating Code</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground max-w-3xl leading-tight">
            Clear Head.<br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Electric Rooms.
            </span>
          </h2>
        </div>

        {/* Primary Editorial Manifesto Stage */}
        <div className="soft-card p-8 md:p-16 bg-card/90 backdrop-blur-xl border border-border/60 shadow-2xl rounded-3xl relative overflow-hidden group">
          
          {/* Subtle Live Room Pulse Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-border/40 text-xs font-mono text-muted-foreground select-none">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="font-bold tracking-wider text-foreground">ROOM PULSE • ACTIVE</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span>CLARITY: 100%</span>
              </div>
              <div className="w-px h-3 bg-border" />
              <span>SOBER ENGINE</span>
            </div>
          </div>

          {/* Large Main Statement */}
          <div className="relative text-xl md:text-3xl font-serif leading-relaxed text-foreground tracking-normal mb-12">
            <span className="text-6xl md:text-8xl font-black text-primary/20 absolute -top-8 -left-6 md:-top-12 md:-left-10 select-none font-sans pointer-events-none">
              “
            </span>

            <p className="relative z-10">
              I don't touch a drop of alcohol. I'm an ambivert, I read a room's heart before I ever open my mouth. While others rely on booze to break the ice or get too wasted to notice who's left out in the corner, I stand in the middle with absolute clarity.
            </p>

            <p className="relative z-10 mt-6">
              I feel the shift, when to ignite a crowd into laughter, when to turn the energy all the way up, and when to let strangers just sit together and feel at home. No cheap tricks. No liquid courage. Just raw human connection, real presence, and unforgettable nights.
            </p>
          </div>

          {/* Key Attribute Pill Tags */}
          <div className="flex flex-wrap gap-3 pt-6 border-t border-border/40">
            {pillars.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveHighlight(activeHighlight === p.id ? null : p.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-2 border ${
                  activeHighlight === p.id 
                    ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105' 
                    : 'bg-secondary/60 text-muted-foreground border-border/50 hover:bg-secondary hover:text-foreground'
                }`}
              >
                <p.icon className={`w-3.5 h-3.5 ${activeHighlight === p.id ? 'text-primary-foreground' : p.color}`} />
                <span>{p.tag}</span>
              </button>
            ))}
          </div>

          {/* Active Highlight Drawer (if clicked) */}
          {activeHighlight && (
            <div className="mt-6 p-6 rounded-2xl bg-secondary/80 border border-primary/30 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
              {(() => {
                const item = pillars.find(p => p.id === activeHighlight);
                if (!item) return null;
                return (
                  <div className="flex items-start gap-4">
                    <item.icon className={`w-6 h-6 shrink-0 mt-0.5 ${item.color}`} />
                    <div>
                      <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* 3 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="soft-card p-8 bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl flex flex-col justify-between hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-secondary rounded-xl group-hover:bg-primary/10 transition-colors">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest font-bold">
                    0{idx + 1}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Authentic Proof Footer Stamp */}
        <div className="mt-16 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground/80 bg-card/40 px-6 py-3 rounded-full border border-border/40 backdrop-blur-sm">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>REAL HUMAN HOSTING • NO AI SLOP • UNFILTERED REALITY</span>
          </div>
        </div>

      </div>
    </section>
  );
}
