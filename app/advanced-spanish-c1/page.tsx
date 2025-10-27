import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getLevelBySlug } from '@lib/levels';
import { AdSlot } from '@components/AdSlot';
import { LevelPageClient } from '@components/LevelPageClient';
import { SaveLastLevel } from '@components/SaveLastLevel';

export const metadata: Metadata = {
  title: 'Advanced Spanish',
  description: 'Practica tu comprensión auditiva en español con ejercicios de nivel C1. Avanzado - Textos largos y exigentes',
  openGraph: {
    title: 'Advanced Spanish',
    description: 'Avanzado - Textos largos y exigentes',
  },
};

export default async function AdvancedSpanishC1Page() {
  const level = getLevelBySlug('c1');

  if (!level) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <SaveLastLevel level="c1" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-8">
          <div>
            <div className="mb-4">
              <div
                className="inline-block rounded-lg px-3 py-1 text-sm font-semibold text-white mb-3"
                style={{ backgroundColor: level.color }}
                data-testid={`badge-level-${level.slug}`}
              >
                Nivel {level.name}
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-level-title">
              Advanced Spanish - C1
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-level-description">
              🗣️ Everyday Spanish conversations for advanced learners (with transcripts and quizzes)
            </p>
          </div>

          <LevelPageClient levelSlug="c1" />
        </div>

        <aside className="space-y-6">
          <AdSlot slot="sidebar" className="sticky top-4" />
        </aside>
      </div>
    </div>
  );
}
