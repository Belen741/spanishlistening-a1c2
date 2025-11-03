'use client';

import { useEffect, useState } from 'react';
import { 
  getProgress, 
  calculateStats, 
  getOverallProgress,
  type UserProgress,
  type LevelStats
} from '@/lib/progress';
import { ProgressBar } from '@/components/ProgressBar';
import { StreakCounter } from '@/components/StreakCounter';
import { BadgeDisplay } from '@/components/BadgeDisplay';
import { StatsCard } from '@/components/StatsCard';
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  Target,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';

const LEVEL_NAMES: Record<string, string> = {
  a1: 'A1 - Principiante',
  a2: 'A2 - Elemental',
  b1: 'B1 - Intermedio',
  b2: 'B2 - Intermedio Alto',
  c1: 'C1 - Avanzado',
  c2: 'C2 - Maestría'
};

const LEVEL_LINKS: Record<string, string> = {
  a1: '/spanish-audio-for-beginners-a1',
  a2: '/spanish-audio-for-beginners-a2',
  b1: '/intermediate-spanish-b1',
  b2: '/intermediate-spanish-b2',
  c1: '/advanced-spanish-c1',
  c2: '/advanced-spanish-c2'
};

export default function ProgresoPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [stats, setStats] = useState<LevelStats[]>([]);

  useEffect(() => {
    const userProgress = getProgress();
    setProgress(userProgress);
    setStats(calculateStats(userProgress));
  }, []);

  if (!progress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Cargando...</div>
      </div>
    );
  }

  const overallProgress = getOverallProgress(progress);
  const totalCompleted = Object.values(progress.audioProgress).filter(a => a.completed).length;
  const totalQuizzes = Object.values(progress.audioProgress).filter(a => a.quizAttempts > 0).length;
  const unlockedBadges = progress.badges.filter(b => b.unlocked).length;

  const allScores = Object.values(progress.audioProgress)
    .map(a => a.quizScore)
    .filter((score): score is number => score !== undefined);
  
  const averageScore = allScores.length > 0
    ? Math.round(allScores.reduce((sum, score) => sum + score, 0) / allScores.length)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Mi Progreso</h1>
          <p className="text-muted-foreground">
            Sigue tu avance en el aprendizaje del español
          </p>
        </div>

        {/* Overall Progress */}
        <div className="mb-8">
          <ProgressBar 
            current={totalCompleted} 
            total={36} 
            label="Progreso General"
            className="mb-4"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Audios Completados"
            value={totalCompleted}
            description="de 36 totales"
            icon={CheckCircle2}
          />
          <StatsCard
            title="Quizzes Realizados"
            value={totalQuizzes}
            description="evaluaciones hechas"
            icon={BookOpen}
          />
          <StatsCard
            title="Precisión Promedio"
            value={`${averageScore}%`}
            description="en tus quizzes"
            icon={Target}
          />
          <StatsCard
            title="Insignias"
            value={`${unlockedBadges}/${progress.badges.length}`}
            description="logros desbloqueados"
            icon={Award}
          />
        </div>

        {/* Streak Counter */}
        <div className="mb-8">
          <StreakCounter 
            currentStreak={progress.streak.currentStreak}
            longestStreak={progress.streak.longestStreak}
          />
        </div>

        {/* Level Progress */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Progreso por Nivel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((levelStat) => (
              <Link 
                href={LEVEL_LINKS[levelStat.level]}
                key={levelStat.level}
                className="block"
                data-testid={`level-progress-${levelStat.level}`}
              >
                <div className="p-6 rounded-md border border-card-border bg-card hover-elevate transition-all">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-lg">
                      {LEVEL_NAMES[levelStat.level]}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {levelStat.completedAudios}/{levelStat.totalAudios}
                    </span>
                  </div>
                  <ProgressBar
                    current={levelStat.completedAudios}
                    total={levelStat.totalAudios}
                    showPercentage={false}
                  />
                  <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{levelStat.totalQuizzes} quizzes</span>
                    </div>
                    {levelStat.averageScore > 0 && (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{levelStat.averageScore}% promedio</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div>
          <BadgeDisplay badges={progress.badges} />
        </div>
      </div>
    </div>
  );
}
