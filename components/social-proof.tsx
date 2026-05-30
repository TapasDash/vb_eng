'use client';

import * as React from 'react';
import { Film, Instagram, Video } from 'lucide-react';

interface HighlightItem {
  id: string;
  title: string;
  url: string;
}

interface EmbedItem {
  id: string;
  embedCode: string;
}

const highlights: HighlightItem[] = [
  {
    id: "street-cricket",
    title: "STREET CRICKET (SLIDE 7)",
    url: "https://www.instagram.com/p/DSsgK6NAcyw/?img_index=7"
  },
  {
    id: "pai-cult",
    title: "PAI CULT HIGHLIGHTS",
    url: "https://www.instagram.com/stories/highlights/18094025729504254/"
  }
];

const embeds: EmbedItem[] = [
  {
    id: "post-awkbeardo",
    embedCode: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DUc23Rekvjv/" data-instgrm-version="14" style="background:#FFF; border:0; margin: 1px; max-width:540px; min-width:326px; padding:0; width:100%;"></blockquote>`
  },
  {
    id: "reel-codybackpackers",
    embedCode: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DTszmA-kyzA/" data-instgrm-version="14" style="background:#FFF; border:0; margin: 1px; max-width:540px; min-width:326px; padding:0; width:100%;"></blockquote>`
  }
];

const vaultVideos = [
  {
    id: "street-cricket",
    src: "/videos/compressed_cricket_on_street.mp4", 
    title: "BOXING DAY CRICKET",
    desc: "Role: Event Architect. Action: Shut down the street for a 50-person makeshift Ashes match."
  },
  {
    id: "trophy-lift",
    src: "/videos/compressed_trophy_lifing.mp4",
    title: "THE TROPHY LIFT",
    desc: "Role: Crowd Control. Action: Synchronizing a room of 100+ guests during peak hours."
  },
  {
    id: "pool-takeover",
    src: "/videos/compressed_panjabi_mc_dance.mp4",
    title: "POOL DECK",
    desc: "Role: Energy Amplification. Action: Breaking daytime inertia and driving physical participation."
  },
  {
    id: "waterfall-logistics",
    src: "/videos/compressed_stciky_waterfall_trip.mp4",
    title: "OFF-SITE EXCURSIONS",
    desc: "Role: Logistics & Dynamics. Action: Moving a 50+ person group through jungle and river tours."
  },
  {
    id: "loud-screams",
    src: "/videos/compressed_loud_voices_screams.mp4",
    title: "ROOM ENERGY SPIKE",
    desc: "Role: Energy Amplification. Action: Directing room acoustics and volume building exercises."
  },
  {
    id: "sticky-waterfall-tour",
    src: "/videos/compressed_sticky_waterfall_tour.mp4",
    title: "STICKY WATERFALL TOUR",
    desc: "Role: Logistics & Safety. Action: Organizing and climbing sticky limestone waterfall formations."
  },
  {
    id: "tunak-dance",
    src: "/videos/compressed_tunak_tunak_tun_dance.mp4",
    title: "DANCE-OFF HYPE",
    desc: "Role: Crowd Control. Action: Leading a full common room in coordinated dance choreography."
  },
  {
    id: "tipsy-tubing",
    src: "/videos/compressed_tipsy_tubing.mp4",
    title: "TIPSY TUBING",
    desc: "Role: Logistics & Dynamics. Action: Steering and guiding large groups safely down river channels."
  },
  {
    id: "nipple-awards",
    src: "/videos/compressed_best_nipple.mp4",
    title: "HOSTEL GAMES",
    desc: "Role: Social Connection. Action: Designing micro-events and icebreakers to connect solo travelers."
  },
  {
    id: "victory-speech",
    src: "/videos/compressed_victory_speech.mp4",
    title: "THE VICTORY SPEECH",
    desc: "Role: Crowd Connection. Action: Bringing closure to night events with audience appreciation and recap."
  }
];

function EmbedContainer({ embedCode }: { embedCode: string }) {
  return (
    <div className="w-full rounded-2xl bg-card border border-border/50 p-4 min-h-[450px] flex items-center justify-center relative overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="w-full h-full flex flex-col items-center justify-center min-h-[410px] rounded-xl bg-background/30 overflow-hidden">
        <div 
          className="w-full h-full flex justify-center items-center"
          dangerouslySetInnerHTML={{ __html: embedCode }}
        />
      </div>
    </div>
  );
}

export function SocialProof() {
  React.useEffect(() => {
    // Process Instagram embeds on client mount/render
    if (typeof window !== 'undefined') {
      const processEmbeds = () => {
        if ((window as any).instgrm?.Embeds?.process) {
          (window as any).instgrm.Embeds.process();
        }
      };

      if (!(window as any).instgrm) {
        const script = document.createElement('script');
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        script.onload = processEmbeds;
        document.body.appendChild(script);
      } else {
        processEmbeds();
      }
    }
  }, []);

  return (
    <section className="w-full bg-secondary/30 px-4 py-24 md:py-32 border-t border-border/50">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* SECTION 1: THE HIGHLIGHT TAPES (STORY LINKS) */}
        <div className="space-y-12">
          {/* Header matching other sections */}
          <div className="flex items-center gap-3 mb-12">
            <Film className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              THE TAPES.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {highlights.map((item) => (
              <a 
                key={item.id}
                href={item.url}
                target={item.url === '#' ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="block w-full cursor-pointer"
              >
                <div className="soft-card aspect-square w-full flex items-center justify-center p-6 text-center select-none group">
                  <span className="text-2xl md:text-3xl font-bold tracking-widest text-foreground uppercase group-hover:text-primary transition-colors">
                    {item.title}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* SECTION 2: THE SURVEILLANCE FEED (IG EMBEDS) */}
        <div className="space-y-12">
          {/* Header matching other sections */}
          <div className="flex items-center gap-3 mb-12">
            <Instagram className="w-8 h-8 text-accent" />
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              LIVE FEED.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {embeds.map((item) => (
              <EmbedContainer key={item.id} embedCode={item.embedCode} />
            ))}
          </div>
        </div>

        {/* SECTION 3: THE UNRELEASED VAULT (VIDEO GRID) */}
        <div className="space-y-12 rounded-none">
          {/* Header matching other sections */}
          <div className="space-y-2 mb-12 rounded-none">
            <div className="flex items-center gap-3 rounded-none">
              <Video className="w-8 h-8 text-primary rounded-none" />
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground rounded-none">
                THE UNRELEASED VAULT
              </h2>
            </div>
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-mono rounded-none">
              Raw footage. Crowd control. Zero edits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto rounded-none">
            {vaultVideos.map((video) => (
              <div key={video.id} className="space-y-3 rounded-none">
                <video
                  src={video.src}
                  controls
                  preload="metadata"
                  playsInline
                  className="w-full aspect-video object-cover rounded-none border border-zinc-800 bg-black"
                />
                <div className="space-y-1 px-1 rounded-none">
                  <h3 className="text-lg font-bold tracking-wider text-foreground uppercase rounded-none">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground rounded-none">
                    {video.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
