'use client';

import * as React from 'react';
import { ReceiptGallery } from '@/components/receipt-gallery';
import { MessageCircle } from 'lucide-react';

export function ReceiptsSection() {
  return (
    <section className="w-full bg-secondary/30 px-4 py-24 md:py-32 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-16">
          <MessageCircle className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            What They Say
          </h2>
        </div>
        <ReceiptGallery />
      </div>
    </section>
  );
}
