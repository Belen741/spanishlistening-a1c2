import type { LevelInfo, LevelSlug } from '@/types/level';

export const ACCENTS_LEVEL: LevelInfo = {
  slug: 'accents',
  name: 'Accents',
  description: 'Explore Spanish accents from different countries',
  color: 'hsl(30 90% 55%)',
  url: '/spanish-accents-by-country',
  icon: 'globe',
};

export interface AccentInfo {
  slug: string;
  name: string;
  country: string;
  countryCode: string;
  color: string;
  description: string;
}

export const ACCENT_COUNTRIES: AccentInfo[] = [
  {
    slug: 'accent-mexican',
    name: 'Mexican Accent',
    country: 'Mexico',
    countryCode: 'MX',
    color: 'hsl(145 63% 42%)',
    description: 'Learn the melodic and clear Mexican Spanish accent',
  },
  {
    slug: 'accent-argentine',
    name: 'Argentine Accent',
    country: 'Argentina',
    countryCode: 'AR',
    color: 'hsl(199 89% 48%)',
    description: 'Discover the unique rioplatense accent with its Italian influences',
  },
  {
    slug: 'accent-spanish',
    name: 'Spanish Accent',
    country: 'Spain',
    countryCode: 'ES',
    color: 'hsl(0 72% 51%)',
    description: 'Master the Castilian Spanish accent from Spain',
  },
  {
    slug: 'accent-colombian',
    name: 'Colombian Accent',
    country: 'Colombia',
    countryCode: 'CO',
    color: 'hsl(45 93% 47%)',
    description: 'Experience the clear and neutral Colombian Spanish',
  },
  {
    slug: 'accent-puerto-rican',
    name: 'Puerto Rican Accent',
    country: 'Puerto Rico',
    countryCode: 'PR',
    color: 'hsl(210 79% 46%)',
    description: 'Explore the Caribbean rhythms of Puerto Rican Spanish',
  },
];

export const LEVELS: LevelInfo[] = [
  {
    slug: 'a1',
    name: 'A1',
    description: 'Principiante - Conversaciones básicas del día a día',
    color: 'hsl(180 70% 50%)',
    url: '/spanish-audio-for-beginners-a1',
  },
  {
    slug: 'a2',
    name: 'A2',
    description: 'Elemental - Situaciones cotidianas y familiares',
    color: 'hsl(200 70% 50%)',
    url: '/spanish-audio-for-beginners-a2',
  },
  {
    slug: 'b1',
    name: 'B1',
    description: 'Intermedio - Temas conocidos y de interés personal',
    color: 'hsl(220 70% 50%)',
    url: '/intermediate-spanish-b1',
  },
  {
    slug: 'b2',
    name: 'B2',
    description: 'Intermedio Alto - Textos complejos y abstractos',
    color: 'hsl(240 70% 50%)',
    url: '/intermediate-spanish-b2',
  },
  {
    slug: 'c1',
    name: 'C1',
    description: 'Avanzado - Textos largos y exigentes',
    color: 'hsl(260 45% 75%)',
    url: '/advanced-spanish-c1',
  },
  {
    slug: 'c2',
    name: 'C2',
    description: 'Maestría - Comprensión total y expresión precisa',
    color: 'hsl(280 45% 75%)',
    url: '/advanced-spanish-c2',
  },
];

export function getLevelBySlug(slug: string): LevelInfo | undefined {
  return LEVELS.find((level) => level.slug === slug);
}

export function isValidLevelSlug(slug: string): slug is LevelSlug {
  return LEVELS.some((level) => level.slug === slug);
}
