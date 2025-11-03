'use client';

import { Badge as BadgeType } from '@/lib/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Lock } from 'lucide-react';

interface BadgeDisplayProps {
  badges: BadgeType[];
  maxDisplay?: number;
  className?: string;
}

export function BadgeDisplay({ badges, maxDisplay, className = '' }: BadgeDisplayProps) {
  const unlockedBadges = badges.filter(b => b.unlocked);
  const displayBadges = maxDisplay ? badges.slice(0, maxDisplay) : badges;

  return (
    <div className={`space-y-4 ${className}`} data-testid="badge-display">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Insignias</h3>
        <span className="text-sm text-muted-foreground" data-testid="badge-count">
          {unlockedBadges.length}/{badges.length}
        </span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {displayBadges.map((badge) => (
          <Card 
            key={badge.id} 
            className={`transition-all ${badge.unlocked ? 'hover-elevate' : 'opacity-50'}`}
            data-testid={`badge-${badge.id}`}
          >
            <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
              <div className="relative">
                <span className="text-4xl">{badge.icon}</span>
                {!badge.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-full">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <p className="font-medium text-sm">{badge.name}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{badge.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
