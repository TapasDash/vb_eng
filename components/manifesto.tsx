'use client';

import * as React from 'react';
import { useVibe } from '@/components/theme-provider';
import { Edit3, Check, FileText } from 'lucide-react';

export function Manifesto() {
  const { vibeLevel } = useVibe();
  const [typedText, setTypedText] = React.useState('');
  const [isDone, setIsDone] = React.useState(false);
  const fullText = "I don't touch a drop of alcohol. I'm an ambivert, I read a room's heart before I ever open my mouth. While others rely on booze to break the ice or get too wasted to notice who's left out in the corner, I stand in the middle with absolute clarity. I feel the shift, when to ignite a crowd into laughter, when to turn the energy all the way up, and when to let strangers just sit together and feel at home. No cheap tricks. No liquid courage. Just raw human connection, real presence, and unforgettable nights.";

  // Simple typewriter effect
  React.useEffect(() => {
    let index = 0;
    setTypedText('');
    setIsDone(false);
    
    // Adjust typing speed based on vibe level (faster in rave mode)
    const speed = vibeLevel > 79 ? 15 : vibeLevel > 40 ? 25 : 40;

    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setIsDone(true);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [vibeLevel]);

  return (
    <section className="w-full bg-secondary/30 px-4 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <h2 className="text-3xl md:text-5xl font-bold mb-10 tracking-tight text-foreground flex items-center gap-3">
          <FileText className="w-8 h-8 text-primary" />
          Clear Head. Loud Room.
        </h2>

        {/* Clean Notes App Window */}
        <div className="soft-card overflow-hidden bg-card transition-all duration-300">
          {/* Window Header Bar */}
          <div className="w-full bg-secondary/50 border-b border-border/50 px-4 py-3 flex justify-between items-center select-none">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10 inline-block"></span>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground tracking-wide">
              <span>thoughts.txt</span>
            </div>

            <div className="text-muted-foreground">
              <Edit3 className="w-4 h-4" />
            </div>
          </div>

          {/* Notes Content Area */}
          <div className="p-8 md:p-12 font-serif text-lg md:text-2xl leading-relaxed min-h-64 select-text relative">
            <div className="text-xs font-sans text-muted-foreground mb-8 select-none flex items-center justify-between border-b border-border/30 pb-4">
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit' })}</span>
            </div>

            <div className="relative text-foreground whitespace-pre-wrap">
              {typedText}
              <span 
                className={`inline-block w-0.5 h-6 ml-1 bg-primary align-middle ${isDone ? 'animate-pulse' : ''}`}
                style={{
                  animationDuration: '1s'
                }}
              />
            </div>

            {isDone && (
              <div className="mt-12 text-sm text-muted-foreground flex items-center gap-2 animate-in fade-in duration-1000">
                <Check className="w-4 h-4 text-primary" />
                <span>Saved locally</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
