'use client';

import { Flame } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  className?: string;
}

export function StreakCounter({ currentStreak, longestStreak, className = '' }: StreakCounterProps) {
  return (
    <Card className={`${className}`} data-testid="streak-counter">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${currentStreak > 0 ? 'bg-orange-100 dark:bg-orange-900' : 'bg-muted'}`}>
              <Flame className={`w-6 h-6 ${currentStreak > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-muted-foreground'}`} />
            </div>
            <div>
              <p className="text-2xl font-bold" data-testid="current-streak">{currentStreak}</p>
              <p className="text-sm text-muted-foreground">Racha actual</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-semibold text-muted-foreground" data-testid="longest-streak">{longestStreak}</p>
            <p className="text-xs text-muted-foreground">Mejor racha</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
