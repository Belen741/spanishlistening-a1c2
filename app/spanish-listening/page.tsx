'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LevelCard } from '../../components/LevelCard';
import { LEVELS } from '../../lib/levels';

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
        // Calculate offset for sticky header (approximately 60px)
        const yOffset = -80;
        const y = nivelesSection.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const ctaLabel = lastLevel ? `Continuar en Nivel ${lastLevel.toUpperCase()}` : 'Explorar niveles ↓';

  return (
    <div className="min-h-screen bg-background">
      {/* SEO-only H1 (visually hidden) */}
      <h1 className="sr-only">
        Spanish Listening A1–C2: audios con transcripciones, vocabulario y quizzes
      </h1>

      {/* Hero Section with Smart CTA */}
      <section className="max-w-3xl mx-auto px-4 pt-4 pb-1">
        <p className="text-center text-sm md:text-base text-muted-foreground">
          🔊 Improve your Spanish listening with real audios, transcripts, and quizzes by Belén.
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
              href="/spanish-listening"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-choose-other-level"
            >
              Elegir otro nivel
            </Link>
          )}
        </div>

        <ul className="mt-3 grid grid-cols-3 gap-2 text-center text-xs md:text-sm text-muted-foreground">
          <li>⏱️ Short audios</li>
          <li>📝 Transcript</li>
          <li>❓ Quiz</li>
        </ul>
      </section>

      {/* Levels Section - Above the Fold */}
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

      {/* Footer Links */}
      <footer className="border-t mt-16">
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
