'use client';

import { LevelCard } from '@components/LevelCard';
import { LEVELS } from '@lib/levels';
import { BookOpen, Headphones, MessageSquare, Award } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-title">
          Listening por Niveles
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-subtitle">
          Mejora tu comprensión auditiva en español con ejercicios organizados por niveles CEFR
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {LEVELS.map((level) => (
          <LevelCard
            key={level.slug}
            level={level}
          />
        ))}
      </div>

      <div className="bg-card rounded-xl border p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          ¿Cómo usar esta sección?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center space-y-3">
            <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary">
              <Headphones className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">1. Escucha</h3>
            <p className="text-sm text-muted-foreground">
              Reproduce el audio y presta atención al contenido
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">2. Lee</h3>
            <p className="text-sm text-muted-foreground">
              Consulta la transcripción y el vocabulario clave
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">3. Practica</h3>
            <p className="text-sm text-muted-foreground">
              Completa el quiz de comprensión
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">4. Avanza</h3>
            <p className="text-sm text-muted-foreground">
              Mejora tu puntuación y sube de nivel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
