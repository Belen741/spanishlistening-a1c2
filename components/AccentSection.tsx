'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ChevronDown, ChevronUp, Volume2 } from 'lucide-react';
import type { AudioItem } from '@/types/level';
import type { AccentInfo } from '@/lib/levels';

const AudioPlayer = dynamic(() => import('@components/AudioPlayer').then(mod => ({ default: mod.AudioPlayer })), {
  loading: () => <div className="h-16 bg-card rounded-lg border animate-pulse" />,
  ssr: false,
});

const Transcript = dynamic(() => import('@components/Transcript').then(mod => ({ default: mod.Transcript })), {
  loading: () => <div className="h-32 bg-card rounded-xl border animate-pulse" />,
});

const VocabList = dynamic(() => import('@components/VocabList').then(mod => ({ default: mod.VocabList })), {
  loading: () => <div className="h-48 bg-card rounded-xl border animate-pulse" />,
});

const Quiz = dynamic(() => import('@components/Quiz').then(mod => ({ default: mod.Quiz })), {
  loading: () => <div className="h-96 bg-card rounded-xl border animate-pulse" />,
  ssr: false,
});

interface AccentSectionProps {
  accent: AccentInfo;
}

export function AccentSection({ accent }: AccentSectionProps) {
  const [audios, setAudios] = useState<AudioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedAudio, setSelectedAudio] = useState<AudioItem | null>(null);

  useEffect(() => {
    async function fetchAudios() {
      try {
        const response = await fetch(`/api/audios?level=${accent.slug}`);
        if (response.ok) {
          const data = await response.json();
          setAudios(Array.isArray(data) ? data : (data.items || []));
        }
      } catch (error) {
        console.error('Error fetching audios:', error);
        setAudios([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAudios();
  }, [accent.slug]);

  const handleAudioSelect = (audio: AudioItem) => {
    setSelectedAudio(selectedAudio?.id === audio.id ? null : audio);
  };

  return (
    <section 
      id={accent.slug}
      className="border rounded-xl overflow-hidden"
      data-testid={`section-${accent.slug}`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 md:p-6 hover-elevate active-elevate-2 transition-colors"
        style={{ backgroundColor: `${accent.color}15` }}
        data-testid={`button-toggle-${accent.slug}`}
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div 
            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: accent.color }}
          >
            {accent.countryCode}
          </div>
          <div className="text-left">
            <h2 className="text-lg md:text-xl font-bold" style={{ color: accent.color }}>
              {accent.name}
            </h2>
            <p className="text-sm text-muted-foreground hidden md:block">
              {accent.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {audios.length} {audios.length === 1 ? 'audio' : 'audios'}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="p-4 md:p-6 pt-0 space-y-4">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-20 bg-card rounded-lg border animate-pulse" />
              ))}
            </div>
          ) : audios.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Volume2 className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>No audios available yet for {accent.country}.</p>
              <p className="text-sm mt-1">Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {audios.map((audio) => (
                <div key={audio.id} className="space-y-4">
                  <div
                    className={`
                      border rounded-lg p-4 cursor-pointer transition-all
                      ${selectedAudio?.id === audio.id 
                        ? 'ring-2 bg-accent/30' 
                        : 'hover-elevate active-elevate-2'
                      }
                    `}
                    style={{ 
                      borderColor: selectedAudio?.id === audio.id ? accent.color : undefined
                    }}
                    onClick={() => handleAudioSelect(audio)}
                    data-testid={`audio-card-${audio.id}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{audio.title}</h3>
                      <span className="text-sm text-muted-foreground">{audio.duration}</span>
                    </div>
                    {audio.snippet && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{audio.snippet}</p>
                    )}
                  </div>

                  {selectedAudio?.id === audio.id && (
                    <div className="space-y-6 pl-4 border-l-2" style={{ borderColor: accent.color }}>
                      <AudioPlayer 
                        src={audio.file} 
                        title={audio.title}
                      />
                      
                      <div id={`transcript-${audio.id}`}>
                        <Transcript text={audio.transcript} />
                      </div>
                      
                      <div id={`vocab-${audio.id}`}>
                        <VocabList items={audio.vocab} />
                      </div>
                      
                      <div id={`quiz-${audio.id}`}>
                        <Quiz 
                          questions={audio.quiz} 
                          levelSlug={`${accent.slug}-${audio.id}`}
                          audioId={audio.id}
                          level={audio.level}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
