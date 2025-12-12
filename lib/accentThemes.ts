export interface AccentTheme {
  slug: string;
  code: string;
  country: string;
  title: string;
  subtitle: string;
  href: string;
  flag: string;
  icon: string;
  region: string;
  levelRange: string;
  speed: string;
  colors: {
    primary: string;
    secondary: string;
    gradient: string;
    accentBar: string;
    text: string;
  };
  fontFamily?: string;
}

export const ACCENT_THEMES: AccentTheme[] = [
  {
    slug: 'mexican',
    code: 'MX',
    country: 'Mexico',
    title: 'Mexican Accent',
    subtitle: 'Learn the melodic and clear Mexican Spanish accent',
    href: '/spanish-accents-by-country/mexican',
    flag: '🇲🇽',
    icon: '🌮',
    region: 'North America',
    levelRange: 'A1–C1',
    speed: 'Moderate',
    colors: {
      primary: 'hsl(145 63% 42%)',
      secondary: 'hsl(0 72% 51%)',
      gradient: 'linear-gradient(135deg, hsl(145 63% 95%) 0%, hsl(0 72% 97%) 100%)',
      accentBar: 'hsl(145 63% 42%)',
      text: 'hsl(145 63% 32%)',
    },
    fontFamily: 'var(--font-poppins)',
  },
  {
    slug: 'argentine',
    code: 'AR',
    country: 'Argentina',
    title: 'Argentine Accent',
    subtitle: 'Discover the unique rioplatense accent with Italian influences',
    href: '/spanish-accents-by-country/argentine',
    flag: '🇦🇷',
    icon: '🧉',
    region: 'South America',
    levelRange: 'A2–C2',
    speed: 'Fast',
    colors: {
      primary: 'hsl(199 89% 48%)',
      secondary: 'hsl(0 0% 100%)',
      gradient: 'linear-gradient(135deg, hsl(199 89% 96%) 0%, hsl(199 50% 98%) 100%)',
      accentBar: 'hsl(199 89% 48%)',
      text: 'hsl(199 89% 35%)',
    },
  },
  {
    slug: 'spanish',
    code: 'ES',
    country: 'Spain',
    title: 'Spanish Accent',
    subtitle: 'Master the Castilian Spanish accent from Spain',
    href: '/spanish-accents-by-country/spanish',
    flag: '🇪🇸',
    icon: '☕',
    region: 'Europe',
    levelRange: 'A1–C2',
    speed: 'Fast',
    colors: {
      primary: 'hsl(0 72% 51%)',
      secondary: 'hsl(45 93% 47%)',
      gradient: 'linear-gradient(135deg, hsl(0 72% 97%) 0%, hsl(45 93% 97%) 100%)',
      accentBar: 'hsl(0 72% 51%)',
      text: 'hsl(0 72% 40%)',
    },
  },
  {
    slug: 'colombian',
    code: 'CO',
    country: 'Colombia',
    title: 'Colombian Accent',
    subtitle: 'Experience the clear and neutral Colombian Spanish',
    href: '/spanish-accents-by-country/colombian',
    flag: '🇨🇴',
    icon: '🌄',
    region: 'South America',
    levelRange: 'A1–B2',
    speed: 'Slow',
    colors: {
      primary: 'hsl(45 93% 47%)',
      secondary: 'hsl(210 79% 46%)',
      gradient: 'linear-gradient(135deg, hsl(45 93% 97%) 0%, hsl(210 79% 97%) 100%)',
      accentBar: 'hsl(45 93% 47%)',
      text: 'hsl(45 93% 30%)',
    },
  },
  {
    slug: 'cuban',
    code: 'CU',
    country: 'Cuba',
    title: 'Cuban Accent',
    subtitle: 'Explore the vibrant Caribbean rhythms of Cuban Spanish',
    href: '/spanish-accents-by-country/cuban',
    flag: '🇨🇺',
    icon: '🎺',
    region: 'Caribbean',
    levelRange: 'B1–C1',
    speed: 'Fast',
    colors: {
      primary: 'hsl(210 79% 46%)',
      secondary: 'hsl(0 72% 51%)',
      gradient: 'linear-gradient(135deg, hsl(210 79% 96%) 0%, hsl(0 72% 97%) 100%)',
      accentBar: 'hsl(210 79% 46%)',
      text: 'hsl(210 79% 35%)',
    },
  },
];

export function getAccentTheme(slug: string): AccentTheme | undefined {
  return ACCENT_THEMES.find((theme) => theme.slug === slug);
}
