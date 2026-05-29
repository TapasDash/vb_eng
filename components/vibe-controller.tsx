'use client';

import * as React from 'react';
import { useVibe } from '@/components/theme-provider';
import { Sliders, Volume2, VolumeX, Sparkles, Music } from 'lucide-react';

export function VibeController() {
  const { vibeLevel, setVibeLevel } = useVibe();
  const [isMuted, setIsMuted] = React.useState(true); // Default muted for ambient
  const [prevLevel, setPrevLevel] = React.useState(25);
  const [showTooltip, setShowTooltip] = React.useState(false);

  // Audio Context Refs for Ambient Engine
  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const droneOscsRef = React.useRef<OscillatorNode[]>([]);
  const droneGainRef = React.useRef<GainNode | null>(null);

  // Initialize and update Ambient Engine
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!isMuted && vibeLevel > 0) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // If we don't have oscillators yet, create them
      if (droneOscsRef.current.length === 0) {
        const masterGain = ctx.createGain();
        masterGain.connect(ctx.destination);
        droneGainRef.current = masterGain;

        // Create a C Major 7 / D minor 9 ambient chord drone
        const frequencies = [130.81, 196.00, 261.63, 329.63]; // C3, G3, C4, E4
        
        frequencies.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
          const oscGain = ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.value = freq;
          
          // Detune slightly for chorusing effect
          osc.detune.value = i * 4 - 6;

          // Spread panning
          if (panner) {
            panner.pan.value = (i % 2 === 0 ? -1 : 1) * 0.4;
            osc.connect(panner);
            panner.connect(oscGain);
          } else {
            osc.connect(oscGain);
          }
          
          oscGain.connect(masterGain);
          
          // Set very low initial gain
          oscGain.gain.value = 0.05;
          
          osc.start();
          droneOscsRef.current.push(osc);
        });
      }

      // Modulate parameters based on vibeLevel
      if (droneGainRef.current) {
        // Volume maps softly from 0 to 0.3
        const targetVol = Math.max(0.01, (vibeLevel / 100) * 0.2);
        droneGainRef.current.gain.setTargetAtTime(targetVol, ctx.currentTime, 0.5);
      }

      // Modulate frequencies based on vibe state
      const isLoud = vibeLevel > 50;
      const isRave = vibeLevel > 79;
      
      droneOscsRef.current.forEach((osc, i) => {
        if (isRave) {
          osc.type = i % 2 === 0 ? 'triangle' : 'sine';
        } else if (isLoud) {
          osc.type = 'sine';
        } else {
          osc.type = 'sine';
        }
      });

    } else {
      // Fade out and stop
      if (droneGainRef.current && audioCtxRef.current) {
        droneGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
      }
    }

    return () => {
      // Cleanup happens on unmount
    };
  }, [vibeLevel, isMuted]);

  // Play a soft UI interaction chime
  const playChime = (pitchIndex: number) => {
    if (isMuted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Soft pentatonic scale chimes
    const scale = [440, 493.88, 554.37, 659.25, 739.99]; 
    const freq = scale[pitchIndex % scale.length];

    osc.type = 'sine';
    osc.frequency.value = freq;
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const level = parseInt(e.target.value, 10);
    setVibeLevel(level);
    if (isMuted) setIsMuted(false);
    
    // Play subtle chime on slider move
    if (level % 10 === 0) {
      playChime(Math.floor(level / 20));
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVibeLevel(prevLevel);
      // Let the useEffect handle the drone
    } else {
      setIsMuted(true);
      setPrevLevel(vibeLevel);
      setVibeLevel(0);
    }
  };

  const applyPreset = (level: number) => {
    setVibeLevel(level);
    if (isMuted) setIsMuted(false);
    playChime(Math.floor(level / 20));
  };

  const getVibeStatus = (level: number) => {
    if (level <= 25) return { label: 'Chill', color: 'text-muted-foreground' };
    if (level <= 50) return { label: 'Focus', color: 'text-primary' };
    if (level <= 75) return { label: 'Upbeat', color: 'text-accent' };
    return { label: 'Midnight', color: 'text-accent font-bold' };
  };

  const status = getVibeStatus(vibeLevel);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <div 
        className="soft-card p-5 w-72 md:w-80 transition-all duration-500 bg-card rounded-2xl border border-border flex flex-col relative overflow-hidden"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Top Bar - Teenage Engineering OP-1 style */}
        <div className="flex items-center justify-between pb-4 border-b border-border/50 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
              <Music className={`w-3 h-3 text-primary ${!isMuted && vibeLevel > 0 ? 'animate-spin-slow' : ''}`} />
            </div>
            <span className="font-semibold text-xs tracking-widest text-muted-foreground uppercase">OP-VIBE</span>
          </div>
          
          <button 
            onClick={toggleMute}
            className={`p-2 rounded-full transition-colors cursor-pointer ${isMuted ? 'bg-secondary text-muted-foreground' : 'bg-primary text-primary-foreground shadow-sm'}`}
            title={isMuted ? "Play ambient music" : "Mute ambient music"}
          >
            {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
          </button>
        </div>

        {/* Display Screen */}
        <div className="bg-secondary/50 rounded-xl p-4 mb-4 border border-border/50 flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs font-medium">
            <span className="text-muted-foreground">LVL</span>
            <span className="text-foreground font-mono text-lg">{vibeLevel}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase text-muted-foreground tracking-wider">Mode</span>
            <span className={`text-xs uppercase font-bold tracking-widest ${status.color}`}>
              {status.label}
            </span>
          </div>
        </div>

        {/* Fader / Slider (styled like a tape dial or sleek fader) */}
        <div className="flex flex-col gap-2 mb-5">
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={vibeLevel}
            onChange={handleSliderChange}
            className="w-full h-2 rounded-full cursor-pointer appearance-none bg-secondary overflow-hidden focus:outline-none"
            style={{
              background: `linear-gradient(to right, var(--primary) ${vibeLevel}%, var(--secondary) ${vibeLevel}%)`
            }}
          />
        </div>

        {/* Color Buttons - OP-1 aesthetic */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          <button 
            onClick={() => applyPreset(15)} 
            className={`h-8 rounded-full border border-border/50 flex items-center justify-center transition-all ${vibeLevel <= 25 ? 'bg-white shadow-sm border-transparent text-black' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'}`}
          >
            <div className={`w-3 h-3 rounded-full ${vibeLevel <= 25 ? 'bg-gray-400' : 'bg-gray-300'}`}></div>
          </button>
          <button 
            onClick={() => applyPreset(45)} 
            className={`h-8 rounded-full border border-border/50 flex items-center justify-center transition-all ${vibeLevel > 25 && vibeLevel <= 50 ? 'bg-primary shadow-sm border-transparent text-primary-foreground' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'}`}
          >
            <div className={`w-3 h-3 rounded-full ${vibeLevel > 25 && vibeLevel <= 50 ? 'bg-white/80' : 'bg-primary/50'}`}></div>
          </button>
          <button 
            onClick={() => applyPreset(65)} 
            className={`h-8 rounded-full border border-border/50 flex items-center justify-center transition-all ${vibeLevel > 50 && vibeLevel <= 75 ? 'bg-accent shadow-sm border-transparent text-accent-foreground' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'}`}
          >
            <div className={`w-3 h-3 rounded-full ${vibeLevel > 50 && vibeLevel <= 75 ? 'bg-white/80' : 'bg-accent/50'}`}></div>
          </button>
          <button 
            onClick={() => applyPreset(95)} 
            className={`h-8 rounded-full border border-border/50 flex items-center justify-center transition-all ${vibeLevel > 75 ? 'bg-[#FFB703] shadow-sm border-transparent text-black' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'}`}
          >
            <div className={`w-3 h-3 rounded-full ${vibeLevel > 75 ? 'bg-white/80' : 'bg-[#FFB703]/50'}`}></div>
          </button>
        </div>

        {/* Playful tooltip */}
        <div className={`absolute bottom-2 left-0 right-0 flex justify-center transition-opacity duration-300 ${showTooltip ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-[9px] bg-foreground text-background px-2 py-1 rounded-full uppercase tracking-widest font-medium">
            Turn up the vibe
          </span>
        </div>
      </div>
    </div>
  );
}
