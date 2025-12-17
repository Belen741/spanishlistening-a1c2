import audiosData from '../data/audios.json';

export interface AudioEntry {
  id: string;
  level: string;
  title: string;
  duration: string;
  file: string;
  snippet: string;
  transcript: string;
  vocab: { term: string; meaning: string }[];
  quiz: {
    id: string;
    type: string;
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  }[];
  slug: string;
  category: string;
  path: string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function resolveCategory(level: string): string {
  const categoryMap: Record<string, string> = {
    'a1': 'a1',
    'a2': 'a2',
    'b1': 'b1',
    'b2': 'b2',
    'c1': 'c1',
    'c2': 'c2',
    'accent-mexican': 'mexican',
    'accent-argentine': 'argentine',
    'accent-spanish': 'spanish',
    'accent-colombian': 'colombian',
    'accent-cuban': 'cuban',
  };
  return categoryMap[level] || level;
}

function getCategoryDisplayName(category: string): string {
  const displayNames: Record<string, string> = {
    'a1': 'Level A1 - Beginner',
    'a2': 'Level A2 - Elementary',
    'b1': 'Level B1 - Intermediate',
    'b2': 'Level B2 - Upper Intermediate',
    'c1': 'Level C1 - Advanced',
    'c2': 'Level C2 - Mastery',
    'mexican': 'Mexican Spanish',
    'argentine': 'Argentine Spanish',
    'spanish': 'Spanish from Spain',
    'colombian': 'Colombian Spanish',
    'cuban': 'Cuban Spanish',
  };
  return displayNames[category] || category;
}

function isAccentCategory(category: string): boolean {
  return ['mexican', 'argentine', 'spanish', 'colombian', 'cuban'].includes(category);
}

const audioIndex: AudioEntry[] = (audiosData as any[]).map((audio) => {
  const slug = generateSlug(audio.title);
  const category = resolveCategory(audio.level);
  const path = `/spanish-listening/${category}/${slug}`;
  
  return {
    ...audio,
    slug,
    category,
    path,
  };
});

export function getAllAudios(): AudioEntry[] {
  return audioIndex;
}

export function getAudiosByCategory(category: string): AudioEntry[] {
  return audioIndex.filter((audio) => audio.category === category);
}

export function getAudioByPath(category: string, slug: string): AudioEntry | undefined {
  return audioIndex.find(
    (audio) => audio.category === category && audio.slug === slug
  );
}

export function getAllCategories(): string[] {
  return [...new Set(audioIndex.map((audio) => audio.category))];
}

export function getAllAudioPaths(): { category: string; audio: string }[] {
  return audioIndex.map((audio) => ({
    category: audio.category,
    audio: audio.slug,
  }));
}

export { getCategoryDisplayName, isAccentCategory };
