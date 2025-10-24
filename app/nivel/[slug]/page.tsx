import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getLevelBySlug, isValidLevelSlug, LEVELS } from '@lib/levels';
import { AdSlot } from '@components/AdSlot';
import { LevelPageClient } from '@components/LevelPageClient';

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
      title: 'Nivel no encontrado | Spanish Listening',
    };
  }

  return {
    title: params.slug === 'a1' || params.slug === 'a2'
      ? 'Spanish audio for beginners'
      : params.slug === 'b1'
      ? 'Intermediate Spanish'
      : `Nivel ${level.name} - ${level.description} | Spanish Listening`,
    description: `Practica tu comprensión auditiva en español con ejercicios de nivel ${level.name}. ${level.description}`,
    openGraph: {
      title: params.slug === 'a1' || params.slug === 'a2'
        ? 'Spanish audio for beginners'
        : params.slug === 'b1'
        ? 'Intermediate Spanish'
        : `Nivel ${level.name} - Spanish Listening`,
      description: level.description,
    },
  };
}

export default async function LevelPage({
  params,
}: {
  params: { slug: string };
}) {
  // Redirect A1, A2, and B1 to their custom URLs
  if (params.slug === 'a1') {
    redirect('/spanish-audio-for-beginners-a1');
  }
  
  if (params.slug === 'a2') {
    redirect('/spanish-audio-for-beginners-a2');
  }
  
  if (params.slug === 'b1') {
    redirect('/intermediate-spanish-b1');
  }

  if (!isValidLevelSlug(params.slug)) {
    notFound();
  }

  const level = getLevelBySlug(params.slug);

  if (!level) {
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
              {level.slug === 'a1' ? 'Spanish audio for beginners A1' : level.slug === 'a2' ? 'Spanish audio for beginners A2' : level.slug === 'b1' ? 'Intermediate Spanish - B1' : `Ejercicios de Listening - ${level.name}`}
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-level-description">
              {level.description}
            </p>
          </div>

          <LevelPageClient levelSlug={params.slug} />
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
