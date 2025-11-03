import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getLevelBySlug } from '@lib/levels';
import { LevelPageClient } from '@components/LevelPageClient';
import { SaveLastLevel } from '@components/SaveLastLevel';

export const metadata: Metadata = {
  title: 'Intermediate Spanish',
  description: 'Practica tu comprensión auditiva en español con ejercicios de nivel B1. Intermedio - Temas conocidos y de interés personal',
  openGraph: {
    title: 'Intermediate Spanish',
    description: 'Intermedio - Temas conocidos y de interés personal',
  },
};

export default async function IntermediateSpanishB1Page() {
  const level = getLevelBySlug('b1');

  if (!level) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <SaveLastLevel level="b1" />
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
            Intermediate Spanish - B1
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="text-level-description">
            🗣️ Everyday Spanish conversations for intermediate learners (with transcripts and quizzes)
          </p>
        </div>

        <LevelPageClient levelSlug="b1" />
      </div>
    </div>
  );
}
