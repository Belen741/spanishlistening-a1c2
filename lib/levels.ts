import type { LevelInfo, LevelSlug } from '@/types/level';

export const LEVELS: LevelInfo[] = [
  {
    slug: 'a1',
    name: 'A1',
    description: 'Principiante - Conversaciones básicas del día a día',
    color: 'hsl(180 70% 50%)',
  },
  {
    slug: 'a2',
    name: 'A2',
    description: 'Elemental - Situaciones cotidianas y familiares',
    color: 'hsl(200 70% 50%)',
  },
  {
    slug: 'b1',
    name: 'B1',
    description: 'Intermedio - Temas conocidos y de interés personal',
    color: 'hsl(220 70% 50%)',
  },
  {
    slug: 'b2',
    name: 'B2',
    description: 'Intermedio Alto - Textos complejos y abstractos',
    color: 'hsl(240 70% 50%)',
  },
  {
    slug: 'c1',
    name: 'C1',
    description: 'Avanzado - Textos largos y exigentes',
    color: 'hsl(260 45% 75%)',
  },
  {
    slug: 'c2',
    name: 'C2',
    description: 'Maestría - Comprensión total y expresión precisa',
    color: 'hsl(280 45% 75%)',
  },
];

export function getLevelBySlug(slug: string): LevelInfo | undefined {
  return LEVELS.find((level) => level.slug === slug);
}

export function isValidLevelSlug(slug: string): slug is LevelSlug {
  return LEVELS.some((level) => level.slug === slug);
}
