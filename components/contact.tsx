'use client';

import * as React from 'react';
import { Eye } from 'lucide-react';

export function Contact() {
  return (
    <section className="w-full bg-background px-4 py-24 md:py-32 border-t-4 border-foreground rounded-none">
      <div className="max-w-6xl mx-auto space-y-12 rounded-none">
        
        {/* Header matching existing H2 styling */}
        <div className="flex items-center gap-3 rounded-none">
          <Eye className="w-8 h-8 text-primary rounded-none" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground rounded-none uppercase">
            THE EVIDENCE
          </h2>
        </div>

        {/* Body Copy */}
        <p className="text-lg md:text-2xl leading-relaxed text-foreground rounded-none font-medium max-w-4xl">
          I don't embed my whole life into a web page. If you want to see the exact moment we hijacked Chiang Mai for Boxing Day cricket (
          <a 
            href="https://www.instagram.com/p/DSsgK6NAcyw/?img_index=7" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="underline hover:text-primary transition-colors font-bold"
          >
            check Slide 7 for the bat swing
          </a>
          ), or the raw chaos of the{" "}
          <a 
            href="https://www.instagram.com/stories/highlights/18094025729504254/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="underline hover:text-primary transition-colors font-bold"
          >
            Pai Cult Story Highlights
          </a>{" "}
          —{" "}
          <a 
            href="https://instagram.com/awkbeardo" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="underline hover:text-primary transition-colors font-bold"
          >
            go to the source
          </a>
          .
        </p>

        {/* The Direct Line (Contact Links) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-foreground rounded-none mt-12">
          {/* Link 1: Instagram */}
          <a 
            href="https://instagram.com/awkbeardo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-center items-start p-12 bg-background hover:bg-foreground hover:text-background text-foreground transition-colors duration-300 border-b-4 md:border-b-0 md:border-r-4 border-foreground group rounded-none"
          >
            <span className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-background/70 mb-4 font-mono rounded-none">
              INSTAGRAM
            </span>
            <span className="text-2xl md:text-4xl font-black tracking-tighter break-all uppercase rounded-none">
              @awkbeardo
            </span>
          </a>

          {/* Link 2: Email */}
          <a 
            href="mailto:tapasdahs017@gmail.com"
            className="flex flex-col justify-center items-start p-12 bg-background hover:bg-foreground hover:text-background text-foreground transition-colors duration-300 group rounded-none"
          >
            <span className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-background/70 mb-4 font-mono rounded-none">
              EMAIL
            </span>
            <span className="text-2xl md:text-4xl font-black tracking-tighter break-all uppercase rounded-none">
              tapasdahs017@gmail.com
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}
