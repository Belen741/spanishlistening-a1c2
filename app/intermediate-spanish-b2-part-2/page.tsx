import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getLevelBySlug } from '@lib/levels';
import { LevelPageClient } from '@components/LevelPageClient';
import { SaveLastLevel } from '@components/SaveLastLevel';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Intermediate Spanish B2 - Part 2',
  description: 'Más ejercicios de comprensión auditiva en español nivel B2. Intermedio Alto - Textos complejos y abstractos - Segunda parte',
  openGraph: {
    title: 'Intermediate Spanish B2 - Part 2',
    description: 'Intermedio Alto - Textos complejos y abstractos - Segunda parte',
  },
};

export default async function IntermediateSpanishB2Part2Page() {
  const level = getLevelBySlug('b2');

  if (!level) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <SaveLastLevel level="b2-2" />
      <div className="space-y-8">
        <div>
          <div className="mb-4">
            <div
              className="inline-block rounded-lg px-3 py-1 text-sm font-semibold text-white mb-3"
              style={{ backgroundColor: level.color }}
              data-testid="badge-level-b2-2"
            >
              Nivel {level.name} - Parte 2
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-level-title">
            Intermediate Spanish - B2 (Part 2)
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="text-level-description">
            More everyday Spanish conversations for intermediate learners (with transcripts and quizzes)
          </p>
          
          <div className="flex gap-3 mt-4">
            <Link
              href="/intermediate-spanish-b2"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm font-medium"
              data-testid="link-b2-part-1"
            >
              ← Part 1
            </Link>
            <span className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
              Part 2
            </span>
          </div>
        </div>

        <div>
          <LevelPageClient levelSlug="b2-2" />
        </div>
      </div>
    </div>
  );
}
