import type { Metadata } from 'next';
import { ACCENTS_LEVEL } from '@lib/levels';
import { AdSlot } from '@components/AdSlot';
import { LevelPageClient } from '@components/LevelPageClient';
import { SaveLastLevel } from '@components/SaveLastLevel';

export const metadata: Metadata = {
  title: 'Spanish Accents by Country - Learn Different Spanish Dialects',
  description: 'Explore Spanish accents from different countries. Listen to native speakers from Spain, Mexico, Argentina, Colombia and more with transcripts and quizzes.',
  openGraph: {
    title: 'Spanish Accents by Country',
    description: 'Explore Spanish accents from different countries with audio examples, transcripts and quizzes.',
  },
};

export default function SpanishAccentsByCountryPage() {
  const level = ACCENTS_LEVEL;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <SaveLastLevel level="accents" />
      <div className="space-y-8">
        <div>
          <div className="mb-4">
            <div
              className="inline-block rounded-lg px-3 py-1 text-sm font-semibold text-white mb-3"
              style={{ backgroundColor: level.color }}
              data-testid="badge-level-accents"
            >
              Spanish Accents
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-level-title">
            Spanish Accents by Country
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="text-level-description">
            Discover how Spanish sounds across different countries with native speakers from Spain, Mexico, Argentina, Colombia and more.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-8">
          <LevelPageClient levelSlug="accents" />
          
          <aside className="space-y-6 hidden xl:block">
            <AdSlot slot="sidebar" className="sticky top-4" />
          </aside>
        </div>
      </div>
    </div>
  );
}
