'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Headphones, ChevronRight } from 'lucide-react';
import { LevelCard } from '../components/LevelCard';
import { LEVELS, ACCENTS_LEVEL } from '../lib/levels';

export default function HomePage() {
  const [lastLevel, setLastLevel] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('sl:lastLevel');
    if (stored) setLastLevel(stored);
  }, []);

  const getLevelUrl = (levelSlug: string) => {
    const urlMap: Record<string, string> = {
      'a1': '/spanish-audio-for-beginners-a1',
      'a2': '/spanish-audio-for-beginners-a2',
      'b1': '/intermediate-spanish-b1',
      'b2': '/intermediate-spanish-b2',
      'c1': '/advanced-spanish-c1',
      'c2': '/advanced-spanish-c2',
    };
    return urlMap[levelSlug] || `/nivel/${levelSlug}`;
  };

  const handleCtaClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'home_cta_click', {
        variant: lastLevel ? 'continue' : 'explore',
        last_level: lastLevel || 'none',
      });
    }
    
    if (lastLevel) {
      window.location.href = getLevelUrl(lastLevel);
    } else {
      const nivelesSection = document.getElementById('niveles');
      if (nivelesSection) {
        const yOffset = -80;
        const y = nivelesSection.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const ctaLabel = lastLevel ? `Continuar en Nivel ${lastLevel.toUpperCase()}` : 'Explorar niveles ↓';

  return (
    <div className="min-h-screen bg-background">
      <h1 className="sr-only">
        Spanish Listening A1–C2: audios con transcripciones, vocabulario y quizzes
      </h1>

      <section className="max-w-3xl mx-auto px-4 pt-4 pb-1">
        <p className="text-center text-sm md:text-base text-muted-foreground">
          Improve your Spanish listening with real audios, transcripts, and quizzes by Belén.
        </p>
        
        <div className="mt-3 flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={handleCtaClick}
            className="bg-primary text-primary-foreground hover-elevate active-elevate-2 px-6 py-2 rounded-md font-medium text-sm transition-all"
            data-testid="button-cta-main"
          >
            {ctaLabel}
          </button>
          {lastLevel && (
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-choose-other-level"
            >
              Elegir otro nivel
            </Link>
          )}
        </div>

        <ul className="mt-3 grid grid-cols-3 gap-2 text-center text-xs md:text-sm text-muted-foreground">
          <li>Short audios</li>
          <li>Transcript</li>
          <li>Quiz</li>
        </ul>
      </section>

      <section className="container mx-auto px-4 py-6 max-w-6xl">
        <Link 
          href={ACCENTS_LEVEL.url}
          className="block group"
          data-testid="link-accents-section"
        >
          <div 
            className="relative overflow-hidden rounded-xl px-8 md:px-10 py-6 md:py-8 transition-all duration-300 group-hover:scale-[1.01] group-hover:brightness-105"
            style={{ 
              background: `linear-gradient(135deg, hsl(45 95% 55%) 0%, hsl(30 90% 55%) 35%, hsl(15 85% 50%) 70%, hsl(0 80% 50%) 100%)`,
            }}
          >
            <div 
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' d='M0,160L48,170.7C96,181,192,203,288,186.7C384,171,480,117,576,112C672,107,768,149,864,165.3C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            
            <div className="relative flex items-center gap-4 md:gap-5">
              <div className="bg-white/25 backdrop-blur-sm rounded-full p-3 shadow-lg">
                <Headphones className="h-7 w-7 md:h-8 md:w-8 text-white drop-shadow-md" />
              </div>
              <div className="flex-1">
                <h2 
                  className="text-xl md:text-2xl font-extrabold text-white mb-1" 
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.15)' }}
                  data-testid="text-accents-heading"
                >
                  Spanish Accents by Country
                </h2>
                <p 
                  className="text-white/95 text-sm md:text-base font-medium"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                >
                  Explore how Spanish sounds in Spain, Mexico, Argentina, Colombia and more
                </p>
                
                <div className="flex items-center gap-2 mt-3">
                  {[
                    { code: 'MX', colors: ['#006847', '#fff', '#ce1126'] },
                    { code: 'ES', colors: ['#c60b1e', '#ffc400', '#c60b1e'] },
                    { code: 'CO', colors: ['#fcd116', '#003893', '#ce1126'] },
                    { code: 'AR', colors: ['#74acdf', '#fff', '#74acdf'] },
                    { code: 'PR', colors: ['#ed0000', '#fff', '#0050f0'] },
                  ].map((flag) => (
                    <div 
                      key={flag.code}
                      className="w-6 h-6 rounded-full overflow-hidden shadow-md border border-white/30 flex-shrink-0"
                      style={{
                        background: `linear-gradient(180deg, ${flag.colors[0]} 0%, ${flag.colors[0]} 33%, ${flag.colors[1]} 33%, ${flag.colors[1]} 66%, ${flag.colors[2]} 66%, ${flag.colors[2]} 100%)`,
                      }}
                      title={flag.code}
                    />
                  ))}
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium transition-all duration-300 group-hover:bg-white/30 group-hover:scale-105 shadow-lg">
                <span className="text-sm">Explore</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>
        </Link>
      </section>

      <section id="niveles" className="container mx-auto px-4 py-4 max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6" data-testid="text-levels-heading">
          Choose your level
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEVELS.map((level) => (
            <LevelCard
              key={level.slug}
              level={level}
            />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 max-w-md text-center">
        <h3 className="text-lg font-semibold mb-2" data-testid="text-feedback-heading">
          Comments and Suggestions
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          Have feedback or ideas? I'd love to hear from you!
        </p>
        <a 
          href="mailto:hablandoconbelen@gmail.com"
          className="inline-flex items-center gap-2 text-primary hover:underline"
          data-testid="link-feedback-email"
        >
          hablandoconbelen@gmail.com
        </a>
      </section>

      <footer className="border-t mt-8">
        <div className="container mx-auto px-6 py-8 max-w-6xl">
          <nav className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-muted-foreground">
            <Link 
              href="/legal/privacidad" 
              className="hover:text-foreground transition-colors hover-elevate px-3 py-2 rounded-md" 
              data-testid="link-privacy"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/legal/terminos" 
              className="hover:text-foreground transition-colors hover-elevate px-3 py-2 rounded-md" 
              data-testid="link-terms"
            >
              Terms and Conditions
            </Link>
            <Link 
              href="/contacto" 
              className="hover:text-foreground transition-colors hover-elevate px-3 py-2 rounded-md" 
              data-testid="link-contact"
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
