import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';
import { getAllAudioPaths, getAudioByPath, getCategoryDisplayName, isAccentCategory } from '@lib/audioIndex';
import { AudioDetailClient } from '@components/AudioDetailClient';

export async function generateStaticParams() {
  const paths = getAllAudioPaths();
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; audio: string };
}): Promise<Metadata> {
  const audio = getAudioByPath(params.category, params.audio);
  
  if (!audio) {
    return {
      title: 'Audio not found | Spanish Listening',
    };
  }

  const categoryName = getCategoryDisplayName(params.category);
  const title = `${audio.title} - ${categoryName} | Spanish Listening`;
  const description = audio.snippet;

  return {
    title,
    description,
    openGraph: {
      title: audio.title,
      description,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: audio.title,
      description,
    },
  };
}

export default async function AudioDetailPage({
  params,
}: {
  params: { category: string; audio: string };
}) {
  const audio = getAudioByPath(params.category, params.audio);

  if (!audio) {
    notFound();
  }

  const categoryName = getCategoryDisplayName(params.category);
  const isAccent = isAccentCategory(params.category);
  
  const levelUrlMap: Record<string, string> = {
    'a1': '/spanish-audio-for-beginners-a1',
    'a2': '/spanish-audio-for-beginners-a2',
    'b1': '/intermediate-spanish-b1',
    'b2': '/intermediate-spanish-b2',
    'c1': '/advanced-spanish-c1',
    'c2': '/advanced-spanish-c2',
  };
  
  const backLink = isAccent 
    ? `/spanish-accents-by-country/${params.category}`
    : levelUrlMap[params.category] || `/nivel/${params.category}`;
  
  const backLinkLabel = `Back to ${categoryName}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" data-testid="breadcrumb">
        <Link 
          href="/" 
          className="hover:text-foreground transition-colors flex items-center gap-1"
          data-testid="breadcrumb-home"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
        <span>/</span>
        <Link 
          href={backLink} 
          className="hover:text-foreground transition-colors"
          data-testid="breadcrumb-category"
        >
          {categoryName}
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium truncate max-w-[200px]" data-testid="breadcrumb-audio">
          {audio.title}
        </span>
      </nav>

      <div className="mb-6">
        <Link 
          href={backLink}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          data-testid="link-back"
        >
          <ChevronLeft className="h-4 w-4" />
          {backLinkLabel}
        </Link>
      </div>

      <header className="mb-8">
        <div 
          className="inline-block rounded-lg px-3 py-1 text-sm font-semibold text-white mb-3"
          style={{ 
            backgroundColor: isAccent ? '#6366f1' : 
              params.category === 'a1' ? '#22c55e' :
              params.category === 'a2' ? '#84cc16' :
              params.category === 'b1' ? '#eab308' :
              params.category === 'b2' ? '#f97316' :
              params.category === 'c1' ? '#ef4444' :
              params.category === 'c2' ? '#dc2626' : '#6366f1'
          }}
          data-testid="badge-category"
        >
          {categoryName}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2" data-testid="text-audio-title">
          {audio.title}
        </h1>
        <p className="text-muted-foreground" data-testid="text-audio-snippet">
          {audio.snippet}
        </p>
        <p className="text-sm text-muted-foreground mt-2" data-testid="text-audio-duration">
          Duration: {audio.duration}
        </p>
      </header>

      <AudioDetailClient audio={audio} />

      <div className="mt-12 pt-8 border-t">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Ready for more practice?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              href={backLink}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover-elevate active-elevate-2 font-medium"
              data-testid="button-more-audios"
            >
              More {categoryName} audios
            </Link>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-background border rounded-lg hover-elevate active-elevate-2 font-medium"
              data-testid="button-all-levels"
            >
              <Home className="h-4 w-4" />
              All levels
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
