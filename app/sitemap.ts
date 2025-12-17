import { MetadataRoute } from 'next';
import { LEVELS } from '@lib/levels';
import { ACCENT_THEMES } from '@lib/accentThemes';
import { getAllAudios } from '@lib/audioIndex';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.spanishlisteninga1c2.com';
  
  const audioPages = getAllAudios().map((audio) => ({
    url: `${baseUrl}${audio.path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const levelUrlMap: Record<string, string> = {
    'a1': '/spanish-audio-for-beginners-a1',
    'a2': '/spanish-audio-for-beginners-a2',
    'b1': '/intermediate-spanish-b1',
    'b2': '/intermediate-spanish-b2',
    'c1': '/advanced-spanish-c1',
    'c2': '/advanced-spanish-c2',
  };

  const levelPages = LEVELS.map((level) => ({
    url: `${baseUrl}${levelUrlMap[level.slug] || `/nivel/${level.slug}`}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const accentPages = ACCENT_THEMES.map((accent) => ({
    url: `${baseUrl}${accent.href}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/spanish-listening`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/spanish-accents-by-country`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...levelPages,
    ...accentPages,
    ...audioPages,
    {
      url: `${baseUrl}/intermediate-spanish-b2-part-2`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/advanced-spanish-classes`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/legal/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/terminos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];
}
