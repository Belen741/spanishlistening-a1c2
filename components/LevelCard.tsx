import Link from 'next/link';
import { Headphones, CheckCircle2 } from 'lucide-react';
import type { LevelInfo } from '@/types/level';

interface LevelCardProps {
  level: LevelInfo;
  hasCompleted?: boolean;
}

export function LevelCard({ level, hasCompleted = false }: LevelCardProps) {
  return (
    <Link
      href={`/nivel/${level.slug}`}
      prefetch={false}
      className="group relative block"
      data-testid={`card-level-${level.slug}`}
    >
      <div className="relative rounded-2xl border-2 bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1 overflow-visible">
        {hasCompleted && (
          <div className="absolute -top-2 -right-2 z-10">
            <div className="bg-success text-success-foreground rounded-full p-1" data-testid={`icon-completed-${level.slug}`}>
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        )}
        
        <div className="flex items-start justify-between mb-4">
          <div
            className="rounded-lg px-3 py-1 text-sm font-semibold text-white"
            style={{ backgroundColor: level.color }}
            data-testid={`badge-${level.slug}`}
          >
            {level.name}
          </div>
          <Headphones className="h-6 w-6 text-muted-foreground" />
        </div>

        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors" data-testid={`text-level-name-${level.slug}`}>
          Nivel {level.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed" data-testid={`text-level-description-${level.slug}`}>
          {level.description}
        </p>

        <div className="pt-4 border-t">
          <span className="text-primary font-medium text-sm group-hover:underline">
            Comenzar práctica →
          </span>
        </div>
      </div>
    </Link>
  );
}
