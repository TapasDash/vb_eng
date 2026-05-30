'use client';

import * as React from 'react';
import { useVibe } from '@/components/theme-provider';
import { Film, Disc, Instagram, Video } from 'lucide-react';
import { InstagramEmbed } from 'react-social-media-embed';

interface MediaItem {
  id: string;
  name: string;
  location: string;
  desc: string;
  embedUrl: string;
}

const mediaList: MediaItem[] = [
  {
    id: 'TAPE_02',
    name: 'Instagram Post',
    location: 'Pai, TH',
    desc: 'Vibe check by @awkbeardo.',
    embedUrl: 'https://www.instagram.com/p/DUc23Rekvjv/'
  },
  { 
    id: 'TAPE_01', 
    name: 'Instagram Reel', 
    location: 'Bangkok, TH', 
    desc: 'Event highlights straight from the gram.',
    embedUrl: 'https://www.instagram.com/reel/DTszmA-kyzA/'
  },
];

export function RawTape() {
  const { vibeLevel } = useVibe();
  const [activeMedia, setActiveMedia] = React.useState(mediaList[0]);
  const [isGlitching, setIsGlitching] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Flashing static noise when switching media
  const handleMediaSwitch = (media: MediaItem) => {
    setIsGlitching(true);
    // Play static sound bleep
    if (typeof window !== 'undefined') {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const bufferSize = audioCtx.sampleRate * 0.1; // 100ms
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 800; // Softer static
        
        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        noise.start();
      } catch (e) {}
    }

    setTimeout(() => {
      setActiveMedia(media);
      setIsGlitching(false);
    }, 300);
  };

  return (
    <section className="w-full bg-secondary/30 px-4 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-12">
          <Instagram className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            The Gallery
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Media Feed (lg:col-span-8) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="soft-card p-4 bg-card border border-border/50 relative min-h-[500px] flex items-center justify-center overflow-hidden">
              {isGlitching ? (
                <div className="absolute inset-0 bg-secondary animate-pulse flex items-center justify-center">
                  <span className="font-mono text-muted-foreground tracking-widest text-sm">TUNING...</span>
                </div>
              ) : (
                <div className="w-full flex items-center justify-center overflow-y-auto max-h-[500px]">
                  {mounted ? (
                    <InstagramEmbed url={activeMedia.embedUrl} width={400} />
                  ) : (
                    <div className="w-[400px] h-[400px] bg-secondary/10 animate-pulse rounded-xl flex items-center justify-center">
                      <span className="text-xs text-muted-foreground font-mono">LOADING MEDIA...</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right: Media select checklist (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6 z-10 select-none">

            {/* Offline disclaimer box */}
            <div className="soft-card p-5 bg-secondary/30 border border-border/50 text-muted-foreground text-sm leading-relaxed">
              <p>
                These are real memories from events I've hosted. I believe in putting the phone down and living in the moment, but sometimes we catch lightning in a bottle.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
