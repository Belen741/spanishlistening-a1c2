import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { getLevelBySlug, isValidLevelSlug, LEVELS } from '@lib/levels';
import type { LevelContent } from '@/types/level';
import { AdSlot } from '@components/AdSlot';

const AudioPlayer = dynamic(() => import('@components/AudioPlayer').then(mod => ({ default: mod.AudioPlayer })), {
  loading: () => <div className="h-48 bg-card rounded-xl border animate-pulse" />,
  ssr: false,
});

const Transcript = dynamic(() => import('@components/Transcript').then(mod => ({ default: mod.Transcript })), {
  loading: () => <div className="h-32 bg-card rounded-xl border animate-pulse" />,
});

const VocabList = dynamic(() => import('@components/VocabList').then(mod => ({ default: mod.VocabList })), {
  loading: () => <div className="h-48 bg-card rounded-xl border animate-pulse" />,
});

const Quiz = dynamic(() => import('@components/Quiz').then(mod => ({ default: mod.Quiz })), {
  loading: () => <div className="h-96 bg-card rounded-xl border animate-pulse" />,
  ssr: false,
});

export async function generateStaticParams() {
  return LEVELS.map((level) => ({
    slug: level.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const level = getLevelBySlug(params.slug);
  
  if (!level) {
    return {
      title: 'Nivel no encontrado',
    };
  }

  return {
    title: `Nivel ${level.name} - ${level.description} | Listening por Niveles`,
    description: `Practica tu comprensión auditiva en español con ejercicios de nivel ${level.name}. ${level.description}`,
    openGraph: {
      title: `Nivel ${level.name} - Listening`,
      description: level.description,
    },
  };
}

async function getLevelContent(slug: string): Promise<LevelContent | null> {
  try {
    const content = await import(`@/content/${slug}.json`);
    return content.default;
  } catch (error) {
    console.error(`Failed to load content for ${slug}:`, error);
    return null;
  }
}

export default async function LevelPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!isValidLevelSlug(params.slug)) {
    notFound();
  }

  const level = getLevelBySlug(params.slug);
  const content = await getLevelContent(params.slug);

  if (!level || !content) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
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
              {content.title}
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-level-description">
              {level.description}
            </p>
          </div>

          <AdSlot slot="in-content" />

          <Suspense fallback={<div className="h-48 bg-card rounded-xl border animate-pulse" />}>
            <AudioPlayer src={content.audioSrc} title={content.title} />
          </Suspense>

          <Suspense fallback={<div className="h-32 bg-card rounded-xl border animate-pulse" />}>
            <Transcript text={content.transcript} />
          </Suspense>

          <Suspense fallback={<div className="h-48 bg-card rounded-xl border animate-pulse" />}>
            <VocabList items={content.vocab} />
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-card rounded-xl border animate-pulse" />}>
            <Quiz questions={content.quiz} levelSlug={params.slug} />
          </Suspense>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <AdSlot slot="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  );
}
