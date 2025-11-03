'use client';

import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export function ProgressBar({ 
  current, 
  total, 
  label, 
  showPercentage = true,
  className = '' 
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className={`space-y-2 ${className}`} data-testid="progress-bar">
      {label && (
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium">{label}</span>
          {showPercentage && (
            <span className="text-muted-foreground">
              {current}/{total} ({percentage}%)
            </span>
          )}
        </div>
      )}
      <Progress value={percentage} className="h-2" data-testid="progress-bar-indicator" />
    </div>
  );
}
