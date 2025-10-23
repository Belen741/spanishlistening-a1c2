'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { PaginatedAudioList } from './PaginatedAudioList';
import type { AudioItem } from '@/types/level';

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

interface LevelPageClientProps {
  levelSlug: string;
}

export function LevelPageClient({ levelSlug }: LevelPageClientProps) {
  const [selectedAudio, setSelectedAudio] = useState<AudioItem | null>(null);

  useEffect(() => {
    setSelectedAudio(null);
  }, [levelSlug]);

  return (
    <div className="space-y-8">
      <PaginatedAudioList 
        level={levelSlug} 
        onAudioSelect={setSelectedAudio}
      />

      {selectedAudio && (
        <div className="space-y-8 mt-12 pt-8 border-t">
          <div>
            <h2 className="text-2xl font-bold mb-6" data-testid="text-selected-audio-title">
              {selectedAudio.title}
            </h2>
          </div>

          <Transcript text={selectedAudio.transcript} />
          <VocabList items={selectedAudio.vocab} />
          <Quiz questions={selectedAudio.quiz} levelSlug={`${levelSlug}-${selectedAudio.id}`} />
        </div>
      )}
    </div>
  );
}
