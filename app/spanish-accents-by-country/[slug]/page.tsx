'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeft, Volume2, Home } from 'lucide-react';
import { ACCENT_COUNTRIES, type AccentInfo } from '@/lib/levels';
import type { AudioItem } from '@/types/level';

const AudioPlayer = dynamic(
  () => import('@/components/AudioPlayer').then(mod => ({ default: mod.AudioPlayer })),
  {
    loading: () => <div className="h-16 bg-card rounded-lg border animate-pulse" />,
    ssr: false,
  }
);

const Transcript = dynamic(
  () => import('@/components/Transcript').then(mod => ({ default: mod.Transcript })),
  {
    loading: () => <div className="h-32 bg-card rounded-xl border animate-pulse" />,
  }
);

const VocabList = dynamic(
  () => import('@/components/VocabList').then(mod => ({ default: mod.VocabList })),
  {
    loading: () => <div className="h-48 bg-card rounded-xl border animate-pulse" />,
  }
);

const Quiz = dynamic(
  () => import('@/components/Quiz').then(mod => ({ default: mod.Quiz })),
  {
    loading: () => <div className="h-96 bg-card rounded-xl border animate-pulse" />,
    ssr: false,
  }
);

function getAccentByUrlSlug(urlSlug: string): AccentInfo | undefined {
  const mapping: Record<string, string> = {
    'mexican': 'accent-mexican',
    'argentine': 'accent-argentine',
    'spanish': 'accent-spanish',
    'colombian': 'accent-colombian',
    'cuban': 'accent-cuban',
  };
  const accentSlug = mapping[urlSlug];
  return ACCENT_COUNTRIES.find(a => a.slug === accentSlug);
}

function getUrlSlug(accent: AccentInfo): string {
  return accent.slug.replace('accent-', '');
}

export default function AccentDetailPage({ params }: { params: { slug: string } }) {
  const [audios, setAudios] = useState<AudioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAudio, setSelectedAudio] = useState<AudioItem | null>(null);

  const accent = getAccentByUrlSlug(params.slug);

  useEffect(() => {
    if (!accent) return;
    
    async function fetchAudios() {
      try {
        const response = await fetch(`/api/audios?level=${accent!.slug}`);
        if (response.ok) {
          const data = await response.json();
          setAudios(Array.isArray(data) ? data : (data.items || []));
        }
      } catch (error) {
        console.error('Error fetching audios:', error);
        setAudios([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAudios();
  }, [accent]);

  if (!accent) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Accent not found</h1>
        <Link 
          href="/spanish-accents-by-country"
          className="text-primary hover:underline"
        >
          Back to all accents
        </Link>
      </div>
    );
  }

  const handleAudioSelect = (audio: AudioItem) => {
    setSelectedAudio(selectedAudio?.id === audio.id ? null : audio);
  };

  const otherAccents = ACCENT_COUNTRIES.filter(a => a.slug !== accent.slug);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6">
        <Link 
          href="/spanish-accents-by-country"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          data-testid="button-back-accents"
        >
          <ArrowLeft className="h-4 w-4" />
          All Accents
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-6">
          <div 
            className="rounded-xl p-6"
            style={{ backgroundColor: `${accent.color}15` }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: accent.color }}
              >
                {accent.countryCode}
              </div>
              <div>
                <h1 
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: accent.color }}
                  data-testid="text-accent-title"
                >
                  {accent.name}
                </h1>
                <p className="text-muted-foreground">{accent.description}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Audio Lessons ({audios.length})
            </h2>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-card rounded-lg border animate-pulse" />
                ))}
              </div>
            ) : audios.length === 0 ? (
              <div className="text-center py-12 bg-card border rounded-xl">
                <Volume2 className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-30" />
                <p className="text-muted-foreground">No audios available yet for {accent.country}.</p>
                <p className="text-sm text-muted-foreground mt-1">Check back soon!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {audios.map((audio) => (
                  <div key={audio.id} className="space-y-4">
                    <div
                      className={`
                        border rounded-lg p-4 cursor-pointer transition-all
                        ${selectedAudio?.id === audio.id 
                          ? 'ring-2 bg-accent/30' 
                          : 'hover-elevate active-elevate-2'
                        }
                      `}
                      style={{ 
                        borderColor: selectedAudio?.id === audio.id ? accent.color : undefined
                      }}
                      onClick={() => handleAudioSelect(audio)}
                      data-testid={`audio-card-${audio.id}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{audio.title}</h3>
                        <span className="text-sm text-muted-foreground">{audio.duration}</span>
                      </div>
                      {audio.snippet && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{audio.snippet}</p>
                      )}
                    </div>

                    {selectedAudio?.id === audio.id && (
                      <div className="space-y-6 pl-4 border-l-2" style={{ borderColor: accent.color }}>
                        <AudioPlayer 
                          src={audio.file} 
                          title={audio.title}
                        />
                        
                        <div id={`transcript-${audio.id}`}>
                          <Transcript text={audio.transcript} />
                        </div>
                        
                        <div id={`vocab-${audio.id}`}>
                          <VocabList items={audio.vocab} />
                        </div>
                        
                        <div id={`quiz-${audio.id}`}>
                          <Quiz 
                            questions={audio.quiz} 
                            levelSlug={`${accent.slug}-${audio.id}`}
                            audioId={audio.id}
                            level={audio.level}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-accent/30 border rounded-xl p-6 space-y-4 mt-8" data-testid="next-level-cta">
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold">
                Ready to practice by level?
              </p>
              <p className="text-sm text-muted-foreground">
                Continue your learning journey with our CEFR-structured lessons.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/spanish-audio-for-beginners-a1"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover-elevate active-elevate-2 border-2 border-primary-border font-medium"
                data-testid="button-start-a1"
              >
                Start with Level A1
              </Link>
              <Link
                href="/spanish-listening"
                className="flex items-center gap-2 px-6 py-3 bg-background border rounded-lg hover-elevate active-elevate-2 font-medium"
                data-testid="button-back-home"
              >
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        <aside className="space-y-6 hidden xl:block">
          <div className="sticky top-4 space-y-6">
            <nav className="bg-card border rounded-xl p-4">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">
                OTHER ACCENTS
              </h3>
              <div className="space-y-1">
                {otherAccents.map((otherAccent) => (
                  <Link
                    key={otherAccent.slug}
                    href={`/spanish-accents-by-country/${getUrlSlug(otherAccent)}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover-elevate active-elevate-2 transition-colors"
                    data-testid={`nav-${otherAccent.slug}`}
                  >
                    <span 
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: otherAccent.color }}
                    >
                      {otherAccent.countryCode.charAt(0)}
                    </span>
                    <span>{otherAccent.country}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
