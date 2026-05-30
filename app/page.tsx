import { Hero } from '@/components/hero';
import { Manifesto } from '@/components/manifesto';
import { Philosophy } from '@/components/philosophy';
import { HostelRep } from '@/components/hostel-rep';
import { SocialProof } from '@/components/social-proof';
import { CorePillars } from '@/components/core-pillars';
import { ReceiptsSection } from '@/components/receipts-section';
import { Impact } from '@/components/impact';
import { RawTape } from '@/components/raw-tape';
import { Contact } from '@/components/contact';
import { VibeController } from '@/components/vibe-controller';

export default function Home() {
  return (
    <main className="w-full bg-background text-foreground relative min-h-screen">
      <Hero />
      <Manifesto />
      <Philosophy />
      <HostelRep />
      <ReceiptsSection />
      <SocialProof />
      <CorePillars />
      <Impact />
      <RawTape />
      <Contact />
      <VibeController />
    </main>
  );
}
