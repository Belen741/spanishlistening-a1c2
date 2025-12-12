import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, ArrowRight } from 'lucide-react';
import { ACCENTS_LEVEL, ACCENT_COUNTRIES } from '@lib/levels';
import { AdSlot } from '@components/AdSlot';
import { SaveLastLevel } from '@components/SaveLastLevel';

export const metadata: Metadata = {
  title: 'Spanish Accents by Country - Learn Different Spanish Dialects',
  description: 'Explore Spanish accents from Mexico, Argentina, Spain, Colombia and Cuba. Listen to native speakers with transcripts, vocabulary and quizzes.',
  openGraph: {
    title: 'Spanish Accents by Country',
    description: 'Explore Spanish accents from different countries with audio examples, transcripts and quizzes.',
  },
};

function getUrlSlug(accentSlug: string): string {
  return accentSlug.replace('accent-', '');
}

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
            Discover how Spanish sounds across different countries. Click on a country to explore audio from native speakers with transcripts, vocabulary and quizzes.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-8">
          <div className="space-y-4">
            {ACCENT_COUNTRIES.map((accent) => {
              const isMexican = accent.slug === 'accent-mexican';
              return (
                <Link
                  key={accent.slug}
                  href={`/spanish-accents-by-country/${getUrlSlug(accent.slug)}`}
                  className="block border rounded-xl overflow-hidden hover-elevate active-elevate-2 transition-all"
                  data-testid={`card-accent-${accent.slug}`}
                >
                  <div 
                    className="flex items-center justify-between p-4 md:p-6"
                    style={{ 
                      backgroundColor: `${accent.color}15`,
                      fontFamily: isMexican ? 'var(--font-poppins)' : undefined,
                    }}
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div 
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                        style={{ backgroundColor: accent.color }}
                      >
                        {accent.countryCode}
                      </div>
                      <div className="text-left">
                        <h2 
                          className="text-lg md:text-xl" 
                          style={{ 
                            color: accent.color,
                            fontWeight: isMexican ? 600 : 700,
                            lineHeight: isMexican ? 1.4 : undefined,
                          }}
                        >
                          {accent.name}
                        </h2>
                        <p 
                          className="text-sm text-muted-foreground hidden md:block"
                          style={{
                            fontWeight: isMexican ? 400 : undefined,
                            lineHeight: isMexican ? 1.6 : undefined,
                          }}
                        >
                          {accent.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Link>
              );
            })}

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
                  COUNTRIES
                </h3>
                <div className="space-y-1">
                  {ACCENT_COUNTRIES.map((accent) => (
                    <Link
                      key={accent.slug}
                      href={`/spanish-accents-by-country/${getUrlSlug(accent.slug)}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover-elevate active-elevate-2 transition-colors"
                      data-testid={`nav-${accent.slug}`}
                    >
                      <span 
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: accent.color }}
                      >
                        {accent.countryCode.charAt(0)}
                      </span>
                      <span>{accent.country}</span>
                    </Link>
                  ))}
                </div>
              </nav>
              <AdSlot slot="sidebar" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
