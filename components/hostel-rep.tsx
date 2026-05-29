'use client';

import * as React from 'react';
import { Anchor, Calendar, MapPin } from 'lucide-react';

interface HostelExperience {
  dates: string;
  hostelName: string;
  location: string;
  role: string;
  action: string;
  roi: string;
  reference: string;
  igHandle: string;
  igLink: string;
}

const experiences: HostelExperience[] = [
  {
    dates: '25 Dec 2025 - 14 Jan 2026',
    hostelName: 'The Cabin Backpackers',
    location: 'Chiang Mai',
    role: 'Day-to-Night Crowd Control.',
    action: 'Led Doi Suthep temple runs and Sticky Waterfall tours by day. Capitalized on the Ashes Boxing Day Test by taking over the street for a massive hostel cricket match. Hosted quizzes, karaoke, and night market crawls after dark.',
    roi: 'I kept the guests out of their beds and engaged in the hostel’s ecosystem. Constant, structured activity meant longer stays, better reviews, and a packed common room every single night.',
    reference: "Don't take my word for it. DM the managers, Satang and Cookie, at @thecabinhostel and ask about Tapas.",
    igHandle: '@thecabinhostel',
    igLink: 'https://www.instagram.com/thecabinhostel/'
  },
  {
    dates: '19 Jan 2026 - 29 Jan 2026',
    hostelName: 'Cody Backpackers',
    location: 'Pai',
    role: 'Community Architect & Entertainer.',
    action: "Built the bonfire culture, ran waterfall tours, and hosted legendary karaoke. I didn't just entertain the guests in person; I built their digital community. I launched and managed the 'Cody Cult' WhatsApp group and ran a mini IG campaign (still on their highlights). I am still the admin today.",
    roi: "I am an ambivert. I read the room. If guests were tired, I let them chill. If they wanted chaos, I turned it on. That lack of pressure built massive trust. By creating the 'Cody Cult', I turned transient backpackers into a loyal, returning community.",
    reference: 'DM the owner, Danny, at @codybackpackers and ask about Tapas.',
    igHandle: '@codybackpackers',
    igLink: 'https://www.instagram.com/codybackpackers/'
  },
  {
    dates: '30 Jan 2026 - 15 Mar 2026',
    hostelName: 'Pai Circus Hostel',
    location: 'Pai',
    role: 'High-Volume Energy Architect.',
    action: "Ran massive beer pong tournaments and legendary quiz nights. Invented completely new games to keep a high-energy crowd guessing, then led the pub crawls. To lock in the crowd, I launched the 'Pai Circus Social' WhatsApp group.",
    roi: 'Direct ranking growth through pure hospitality. My events got guests writing specific, 5-star Hostelworld reviews because the energy was unmatched. I scaled their social infrastructure on the ground and online.',
    reference: 'DM the manager, David, at @pai_circus_hostel and ask about Tapas.',
    igHandle: '@pai_circus_hostel',
    igLink: 'https://www.instagram.com/pai_circus_hostel/'
  }
];

export function HostelRep() {
  return (
    <section className="w-full bg-background px-4 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-16">
          <Anchor className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            The Track Record
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Bio (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight uppercase tracking-tight text-foreground">
              I don't drink.
            </h3>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-8">
              Which means I actually do the job. I build the culture, scale the energy, and push your Hostelworld ranking up. Here is the proof.
            </p>

            <div className="flex flex-wrap gap-3 text-xs font-medium tracking-wide select-none">
              <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full shadow-sm border border-border/40">
                Location: SE Asia
              </div>
              <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full shadow-sm border border-border/40">
                Crutch: None
              </div>
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-sm">
                Engine: Social
              </div>
            </div>
          </div>
          
          {/* Right Column: Timeline cards (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            {experiences.map((exp, idx) => (
              <div 
                key={idx}
                className="soft-card p-6 md:p-8 bg-card border border-border/50 transition-all duration-300 relative group flex flex-col gap-5"
              >
                {/* Date & Location Badges */}
                <div className="flex flex-wrap gap-3 items-center justify-between text-xs font-mono text-muted-foreground border-b border-border/30 pb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>{exp.dates}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {exp.hostelName}
                    </h4>
                    {exp.igLink && (
                      <a 
                        href={exp.igLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1 text-xs text-primary hover:text-accent hover:underline font-semibold font-mono"
                      >
                        {exp.igHandle}
                      </a>
                    )}
                  </div>
                  
                  {/* Role and Action Details */}
                  <div className="space-y-3">
                    <p className="text-sm">
                      <strong className="text-primary tracking-widest uppercase font-mono text-xs mr-2">Role:</strong>
                      <span className="text-foreground font-semibold">{exp.role}</span>
                    </p>
                    <p className="text-sm leading-relaxed">
                      <strong className="text-accent tracking-widest uppercase font-mono text-xs mr-2">Action:</strong>
                      <span className="text-muted-foreground font-medium">{exp.action}</span>
                    </p>
                  </div>
                  
                  {/* ROI Box */}
                  <div className="bg-primary/5 dark:bg-emerald-950/20 p-4 rounded-xl border border-primary/20 text-sm leading-relaxed">
                    <strong className="text-primary tracking-widest uppercase font-mono text-xs block mb-1">ROI:</strong>
                    <span className="text-foreground font-medium">{exp.roi}</span>
                  </div>

                  {/* Reference */}
                  {exp.reference && (
                    <div className="border-t border-border/30 pt-3 text-xs text-muted-foreground italic flex items-start gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-foreground font-bold not-italic mt-0.5">Ref:</span>
                      <span>{exp.reference}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
