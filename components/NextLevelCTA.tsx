'use client';

import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';

interface NextLevelCTAProps {
  currentLevel: 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2';
}

const levelMap: Record<string, { next?: string; url?: string; label?: string }> = {
  a1: { next: 'A2', url: '/spanish-audio-for-beginners-a2', label: 'Ir al nivel A2' },
  a2: { next: 'B1', url: '/intermediate-spanish-b1', label: 'Ir al nivel B1' },
  b1: { next: 'B2', url: '/intermediate-spanish-b2', label: 'Ir al nivel B2' },
  b2: { next: 'C1', url: '/advanced-spanish-c1', label: 'Ir al nivel C1' },
  c1: { next: 'C2', url: '/advanced-spanish-c2', label: 'Ir al nivel C2' },
  c2: {},
};

export function NextLevelCTA({ currentLevel }: NextLevelCTAProps) {
  const levelInfo = levelMap[currentLevel];

  return (
    <div className="bg-accent/30 border rounded-xl p-6 space-y-4 mt-8" data-testid="next-level-cta">
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold">
          🎯 ¿Listo para el siguiente reto?
        </p>
        <p className="text-sm text-muted-foreground">
          👉 {levelInfo.next ? `Explora los audios del nivel ${levelInfo.next}` : 'Completa tus audios favoritos'} o repite tus favoritos.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {levelInfo.next && levelInfo.url && (
          <Link
            href={levelInfo.url}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover-elevate active-elevate-2 border-2 border-primary-border font-medium"
            data-testid="button-next-level"
          >
            {levelInfo.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
        <Link
          href="/spanish-listening"
          className="flex items-center gap-2 px-6 py-3 bg-background border rounded-lg hover-elevate active-elevate-2 font-medium"
          data-testid="button-back-home"
        >
          <Home className="h-4 w-4" />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
