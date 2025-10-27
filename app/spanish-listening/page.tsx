'use client';

import Link from 'next/link';
import { LevelCard } from '../../components/LevelCard';
import { LEVELS } from '../../lib/levels';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* SEO-only H1 (visually hidden) */}
      <h1 className="sr-only">
        Spanish Listening – Audios por niveles A1–C2 con transcripciones y quizzes
      </h1>

      {/* Compact Tagline */}
      <section className="max-w-3xl mx-auto px-4 pt-4 pb-2">
        <p className="text-center text-sm md:text-base text-muted-foreground">
          🎧 Improve your Spanish listening with real audios, transcripts, and quizzes by Belén.
        </p>
      </section>

      {/* Levels Section - Above the Fold */}
      <section className="container mx-auto px-4 py-6 max-w-6xl">
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
