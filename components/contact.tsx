'use client';

import * as React from 'react';
import { useVibe } from '@/components/theme-provider';
import { Send, Instagram, Github, Twitter, Linkedin, ArrowUp, Sparkles, Mail } from 'lucide-react';

export function Contact() {
  const { vibeLevel } = useVibe();
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const scrollToTop = () => {
    // Play soft pop when scrolling up
    if (typeof window !== 'undefined') {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      } catch(e) {}
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Play soft click
    if (typeof window !== 'undefined') {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      } catch(e) {}
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset submitted banner after 5s
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <>
      <section className="w-full bg-secondary/30 px-4 py-24 md:py-32 relative overflow-hidden">
        {/* Decorative background shape */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Left: General Info */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="w-8 h-8 text-primary" />
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                    Say Hello.
                  </h2>
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                  Need a solid web app built? Or just want to grab a coffee in Bangkok? Send me a message. I'm always open to new connections.
                </p>
              </div>

              {/* Social Channels List */}
              <div className="space-y-4">
                <span className="text-sm font-medium text-muted-foreground block">Find me online</span>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer shadow-sm"
                    title="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer shadow-sm"
                    title="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer shadow-sm"
                    title="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer shadow-sm"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="soft-card p-6 md:p-8 relative bg-card/80 backdrop-blur-sm border border-border/50">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-sm font-medium text-foreground">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="bg-background border border-border/50 text-foreground p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 transition-all shadow-sm"
                    placeholder="Your name"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="text-sm font-medium text-foreground">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="bg-background border border-border/50 text-foreground p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 transition-all shadow-sm"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-message" className="text-sm font-medium text-foreground">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    disabled={isSubmitting}
                    className="bg-background border border-border/50 text-foreground p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 resize-none transition-all shadow-sm"
                    placeholder="How can we collaborate?"
                  />
                </div>

                {isSubmitted && (
                  <div className="bg-primary/10 border border-primary/20 text-primary p-3 rounded-xl text-sm flex items-center gap-2 select-none animate-in fade-in zoom-in duration-300">
                    <Sparkles className="w-4 h-4" />
                    <span>Message sent! I'll get back to you soon.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full bg-primary text-primary-foreground font-bold text-sm py-4 rounded-xl cursor-pointer hover:bg-primary/90 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
      
      {/* Footer scroll to top trigger */}
      <div className="w-full py-12 flex justify-center bg-secondary/10">
        <button
          onClick={scrollToTop}
          className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer border-none bg-transparent"
        >
          <div className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all">
            <ArrowUp className="w-5 h-5" />
          </div>
          <span className="text-xs font-medium uppercase tracking-wider">Back to Top</span>
        </button>
      </div>
    </>
  );
}
