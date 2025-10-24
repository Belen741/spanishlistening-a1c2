'use client';

import Link from 'next/link';
import { LevelCard } from '@components/LevelCard';
import { LEVELS } from '@lib/levels';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-8 md:py-12 max-w-4xl text-center">
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          style={{ color: '#3b82f6' }}
          data-testid="text-main-title"
        >
          Bienvenido a Spanish Listening
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="text-subtitle">
          Practica tu comprensión auditiva en español con audios reales, transcripciones y ejercicios interactivos.
        </p>

        <div className="bg-card border rounded-xl p-8 mb-4 text-left max-w-2xl mx-auto">
          <p className="text-base leading-relaxed text-foreground" data-testid="text-introduction">
            I'm Belén, an online Spanish teacher and creator of Spanish Listening. On this site, you'll find audios organized by level (A1 to C2), each with transcripts, key vocabulary, and quizzes. All materials are original and designed for Spanish learners like you.
          </p>
        </div>
      </section>

      {/* Levels Section */}
      <section className="container mx-auto px-6 py-4 max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10" data-testid="text-levels-heading">
          Elige tu nivel
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
