export interface AudioProgress {
  audioId: string;
  level: string;
  completed: boolean;
  listenedAt?: Date;
  listenPercentage: number; // Porcentaje de reproducción (0-100)
  quizScore?: number;
  quizAttempts: number;
}

export interface DailyStreak {
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string;
  totalDays: number;
}

export interface LevelStats {
  level: string;
  totalAudios: number;
  completedAudios: number;
  averageScore: number;
  totalQuizzes: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  category: 'streak' | 'completion' | 'mastery' | 'speed';
}

export interface UserProgress {
  audioProgress: Record<string, AudioProgress>;
  streak: DailyStreak;
  badges: Badge[];
  totalListeningTime: number;
  createdAt: Date;
  lastUpdatedAt: Date;
}

const STORAGE_KEY = 'spanish-listening-progress';

const AVAILABLE_BADGES: Omit<Badge, 'unlocked' | 'unlockedAt'>[] = [
  {
    id: 'first-audio',
    name: 'Primer Paso',
    description: 'Escucha tu primer audio',
    icon: '🎧',
    category: 'completion'
  },
  {
    id: 'streak-7',
    name: 'Una Semana',
    description: 'Practica 7 días seguidos',
    icon: '🔥',
    category: 'streak'
  },
  {
    id: 'streak-30',
    name: 'Un Mes',
    description: 'Practica 30 días seguidos',
    icon: '⭐',
    category: 'streak'
  },
  {
    id: 'streak-100',
    name: 'Centenario',
    description: 'Practica 100 días seguidos',
    icon: '👑',
    category: 'streak'
  },
  {
    id: 'complete-level-a1',
    name: 'Principiante Completo',
    description: 'Completa todos los audios del nivel A1',
    icon: '🌱',
    category: 'completion'
  },
  {
    id: 'complete-level-a2',
    name: 'Elemental Completo',
    description: 'Completa todos los audios del nivel A2',
    icon: '🌿',
    category: 'completion'
  },
  {
    id: 'complete-level-b1',
    name: 'Intermedio Completo',
    description: 'Completa todos los audios del nivel B1',
    icon: '🌳',
    category: 'completion'
  },
  {
    id: 'complete-level-b2',
    name: 'Intermedio Alto Completo',
    description: 'Completa todos los audios del nivel B2',
    icon: '🏔️',
    category: 'completion'
  },
  {
    id: 'complete-level-c1',
    name: 'Avanzado Completo',
    description: 'Completa todos los audios del nivel C1',
    icon: '🚀',
    category: 'completion'
  },
  {
    id: 'complete-level-c2',
    name: 'Maestría Completo',
    description: 'Completa todos los audios del nivel C2',
    icon: '💎',
    category: 'completion'
  },
  {
    id: 'perfect-score',
    name: 'Perfeccionista',
    description: 'Obtén 100% en 5 quizzes',
    icon: '💯',
    category: 'mastery'
  },
  {
    id: 'quiz-master',
    name: 'Maestro del Quiz',
    description: 'Completa 50 quizzes',
    icon: '📝',
    category: 'mastery'
  },
  {
    id: 'audio-lover',
    name: 'Amante del Audio',
    description: 'Escucha 100 audios',
    icon: '🎵',
    category: 'completion'
  },
  {
    id: 'speed-learner',
    name: 'Aprendiz Rápido',
    description: 'Completa un nivel en menos de una semana',
    icon: '⚡',
    category: 'speed'
  }
];

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return createDefaultProgress();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return createDefaultProgress();
    }

    const parsed = JSON.parse(stored);
    return {
      ...parsed,
      createdAt: new Date(parsed.createdAt),
      lastUpdatedAt: new Date(parsed.lastUpdatedAt),
      badges: parsed.badges.map((badge: Badge) => ({
        ...badge,
        unlockedAt: badge.unlockedAt ? new Date(badge.unlockedAt) : undefined
      }))
    };
  } catch (error) {
    console.error('Error loading progress:', error);
    return createDefaultProgress();
  }
}

function createDefaultProgress(): UserProgress {
  return {
    audioProgress: {},
    streak: {
      currentStreak: 0,
      longestStreak: 0,
      lastPracticeDate: '',
      totalDays: 0
    },
    badges: AVAILABLE_BADGES.map(badge => ({
      ...badge,
      unlocked: false
    })),
    totalListeningTime: 0,
    createdAt: new Date(),
    lastUpdatedAt: new Date()
  };
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;

  try {
    const toSave = {
      ...progress,
      lastUpdatedAt: new Date()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
}

export function markAudioAsListened(audioId: string, level: string, percentage: number = 0): void {
  const progress = getProgress();
  
  if (!progress.audioProgress[audioId]) {
    progress.audioProgress[audioId] = {
      audioId,
      level,
      completed: false,
      quizAttempts: 0,
      listenPercentage: 0
    };
  }

  progress.audioProgress[audioId].listenedAt = new Date();
  progress.audioProgress[audioId].listenPercentage = Math.max(
    progress.audioProgress[audioId].listenPercentage || 0,
    percentage
  );
  
  updateStreak(progress);
  checkAndUnlockBadges(progress);
  saveProgress(progress);
}

export function recordQuizResult(audioId: string, level: string, score: number): void {
  const progress = getProgress();
  
  if (!progress.audioProgress[audioId]) {
    progress.audioProgress[audioId] = {
      audioId,
      level,
      completed: false,
      quizAttempts: 0,
      listenPercentage: 0
    };
  }

  const audioProgress = progress.audioProgress[audioId];
  audioProgress.quizScore = score;
  audioProgress.quizAttempts += 1;
  audioProgress.completed = true;
  
  updateStreak(progress);
  checkAndUnlockBadges(progress);
  saveProgress(progress);
}

function updateStreak(progress: UserProgress): void {
  const today = new Date().toISOString().split('T')[0];
  const lastDate = progress.streak.lastPracticeDate;

  if (!lastDate) {
    progress.streak.currentStreak = 1;
    progress.streak.longestStreak = 1;
    progress.streak.totalDays = 1;
    progress.streak.lastPracticeDate = today;
    return;
  }

  if (lastDate === today) {
    return;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (lastDate === yesterdayStr) {
    progress.streak.currentStreak += 1;
    progress.streak.longestStreak = Math.max(
      progress.streak.longestStreak,
      progress.streak.currentStreak
    );
  } else {
    progress.streak.currentStreak = 1;
  }

  progress.streak.totalDays += 1;
  progress.streak.lastPracticeDate = today;
}

function checkAndUnlockBadges(progress: UserProgress): void {
  const stats = calculateStats(progress);
  
  progress.badges.forEach(badge => {
    if (badge.unlocked) return;

    let shouldUnlock = false;

    switch (badge.id) {
      case 'first-audio':
        shouldUnlock = Object.keys(progress.audioProgress).length >= 1;
        break;
      case 'streak-7':
        shouldUnlock = progress.streak.currentStreak >= 7;
        break;
      case 'streak-30':
        shouldUnlock = progress.streak.currentStreak >= 30;
        break;
      case 'streak-100':
        shouldUnlock = progress.streak.currentStreak >= 100;
        break;
      case 'complete-level-a1':
        shouldUnlock = stats.find(s => s.level === 'a1')?.completedAudios === 6;
        break;
      case 'complete-level-a2':
        shouldUnlock = stats.find(s => s.level === 'a2')?.completedAudios === 6;
        break;
      case 'complete-level-b1':
        shouldUnlock = stats.find(s => s.level === 'b1')?.completedAudios === 6;
        break;
      case 'complete-level-b2':
        shouldUnlock = stats.find(s => s.level === 'b2')?.completedAudios === 6;
        break;
      case 'complete-level-c1':
        shouldUnlock = stats.find(s => s.level === 'c1')?.completedAudios === 6;
        break;
      case 'complete-level-c2':
        shouldUnlock = stats.find(s => s.level === 'c2')?.completedAudios === 6;
        break;
      case 'perfect-score':
        const perfectScores = Object.values(progress.audioProgress).filter(
          a => a.quizScore === 100
        ).length;
        shouldUnlock = perfectScores >= 5;
        break;
      case 'quiz-master':
        const totalQuizzes = Object.values(progress.audioProgress).filter(
          a => a.quizAttempts > 0
        ).length;
        shouldUnlock = totalQuizzes >= 50;
        break;
      case 'audio-lover':
        shouldUnlock = Object.keys(progress.audioProgress).length >= 100;
        break;
    }

    if (shouldUnlock) {
      badge.unlocked = true;
      badge.unlockedAt = new Date();
    }
  });
}

export function calculateStats(progress: UserProgress): LevelStats[] {
  const levels = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];
  const audiosPerLevel = 6;

  return levels.map(level => {
    const levelAudios = Object.values(progress.audioProgress).filter(
      a => a.level === level
    );

    const completed = levelAudios.filter(a => a.completed).length;
    const scores = levelAudios
      .map(a => a.quizScore)
      .filter((score): score is number => score !== undefined);
    
    const avgScore = scores.length > 0
      ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
      : 0;

    return {
      level,
      totalAudios: audiosPerLevel,
      completedAudios: completed,
      averageScore: avgScore,
      totalQuizzes: levelAudios.filter(a => a.quizAttempts > 0).length
    };
  });
}

export function getOverallProgress(progress: UserProgress): number {
  const totalAudios = 36;
  const completed = Object.values(progress.audioProgress).filter(
    a => a.completed
  ).length;
  
  return Math.round((completed / totalAudios) * 100);
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
