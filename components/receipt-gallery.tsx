'use client';

import * as React from 'react';
import { X } from 'lucide-react';

const hostelworldScreenshots: string[] = [
  '/reviews/image12.jpg',
  '/reviews/image5.png',
  '/reviews/image2.png',
  '/reviews/image16.png',
  '/reviews/image7.png',
  '/reviews/image14.png',
  '/reviews/image6.png',
  '/reviews/image11.png',
  '/reviews/image3.png',
  '/reviews/image9.png',
  '/reviews/image8.jpg',
  '/reviews/image13.png',
  '/reviews/image10.png',
  '/reviews/image1.png',
  '/reviews/image4.png',
  '/reviews/image15.png',
];

const googleScreenshots: string[] = [
  '/reviews/google1.png',
  '/reviews/google2.png',
  '/reviews/google3.png',
  '/reviews/google4.png',
  '/reviews/google5.png',
  '/reviews/google6.png',
  '/reviews/google7.png',
  '/reviews/google8.png',
  '/reviews/google9.png',
  '/reviews/google10.png',
  '/reviews/google11.png',
  '/reviews/google12.png',
  '/reviews/google13.png',
  '/reviews/google14.png',
];

const allScreenshots: string[] = [
  ...hostelworldScreenshots,
  ...googleScreenshots,
];

export function ReceiptGallery() {
  const [activeTab, setActiveTab] = React.useState<'all' | 'hostelworld' | 'google'>('all');
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  // Close modal on Escape key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getActiveScreenshots = () => {
    switch (activeTab) {
      case 'hostelworld':
        return hostelworldScreenshots;
      case 'google':
        return googleScreenshots;
      case 'all':
      default:
        return allScreenshots;
    }
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex justify-center mb-12 select-none">
        <div className="bg-secondary/80 dark:bg-zinc-800/80 p-1.5 rounded-full inline-flex flex-wrap gap-1 justify-center border border-border/40">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase transition-all duration-300 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            All Reviews
          </button>
          <button
            onClick={() => setActiveTab('hostelworld')}
            className={`px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase transition-all duration-300 cursor-pointer ${
              activeTab === 'hostelworld'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Hostelworld Proof
          </button>
          <button
            onClick={() => setActiveTab('google')}
            className={`px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase transition-all duration-300 cursor-pointer ${
              activeTab === 'google'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Google & Shared Proof
          </button>
        </div>
      </div>

      {/* Screenshots Gallery */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 select-none animate-fade-in">
        {getActiveScreenshots().map((src, idx) => (
          <div
            key={`${activeTab}-${idx}-${src}`}
            onClick={() => setSelectedImage(src)}
            className="break-inside-avoid bg-white dark:bg-zinc-800/80 p-3 rounded-2xl border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group hover:scale-[1.02] flex flex-col justify-center relative overflow-hidden mb-6"
          >
            <img
              src={src}
              alt={`Review Screenshot ${idx + 1}`}
              loading="lazy"
              className="rounded-xl w-full h-auto object-contain border border-black/5 dark:border-white/5"
            />
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 transition-all duration-300 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] flex items-center justify-center">
            <button 
              className="absolute top-[-48px] right-0 text-white hover:text-primary transition-colors p-2 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedImage}
              alt="Expanded Review Screenshot"
              className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl border border-white/10 object-contain transition-transform duration-300 scale-100"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
