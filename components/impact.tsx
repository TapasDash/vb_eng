'use client';

import * as React from 'react';
import { useVibe } from '@/components/theme-provider';
import { Award, Users, Database, Activity } from 'lucide-react';

function StatGauge({ 
  value, 
  max, 
  title, 
  subtitle, 
  icon: Icon,
  unit = ''
}: { 
  value: number; 
  max: number; 
  title: string; 
  subtitle: string; 
  icon: React.ComponentType<any>;
  unit?: string;
}) {
  const { vibeLevel } = useVibe();
  const [offset, setOffset] = React.useState(283); // Circumference of r=45 is 2*pi*r = 282.7

  React.useEffect(() => {
    // Calculate animated gauge fill based on value vs max
    const percentage = value / max;
    const progress = 283 - (283 * percentage);
    
    // Add minor variation based on Vibe Level for interactivity
    const vibeAdjustment = (vibeLevel / 100) * 10; // wiggle up to 10%
    const finalProgress = Math.max(0, Math.min(283, progress - vibeAdjustment));
    
    const timeout = setTimeout(() => {
      setOffset(finalProgress);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [value, max, vibeLevel]);

  return (
    <div className="soft-card p-8 flex flex-col items-center justify-between text-center relative group select-none min-h-[320px] transition-all duration-300 hover:-translate-y-2">
      <div className="absolute top-6 left-6 opacity-30 group-hover:text-primary group-hover:opacity-100 transition-all duration-300">
        <Icon className="w-6 h-6" />
      </div>

      {/* SVG Circular Ring Gauge */}
      <div className="relative w-36 h-36 flex items-center justify-center my-6">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="72"
            cy="72"
            r="45"
            className="stroke-secondary fill-transparent"
            strokeWidth="12"
          />
          {/* Animated progress circle */}
          <circle
            cx="72"
            cy="72"
            r="45"
            className="stroke-primary fill-transparent transition-all duration-1000 ease-out drop-shadow-md"
            strokeWidth="12"
            strokeDasharray="283"
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-center flex flex-col items-center">
          <span className="text-4xl font-bold tracking-tight text-foreground">
            {value}{unit}
          </span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-primary mb-2">{title}</h4>
        <p className="text-lg font-semibold text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

export function Impact() {
  return (
    <section className="w-full bg-background px-4 py-24 md:py-32 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                The Impact
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">By the numbers</p>
          </div>
          <div className="bg-secondary/50 text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium select-none shadow-sm backdrop-blur-sm border border-border/50">
            Real Stats
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatGauge
            value={50}
            max={60}
            title="Events Hosted"
            subtitle="Day Parties & Socials"
            icon={Award}
            unit="+"
          />
          
          <StatGauge
            value={5}
            max={6}
            title="People Engaged"
            subtitle="Backpackers Connected"
            icon={Users}
            unit="k+"
          />

          <StatGauge
            value={99}
            max={100}
            title="Good Vibes"
            subtitle="Connections Formed"
            icon={Database}
            unit="%"
          />
        </div>
      </div>
    </section>
  );
}
