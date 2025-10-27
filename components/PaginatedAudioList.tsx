'use client';

import { useState, useEffect, useRef } from 'react';
import { AudioCard } from './AudioCard';
import { AudioModal } from './AudioModal';
import { NextLevelCTA } from './NextLevelCTA';
import { ChevronLeft, ChevronRight, Loader2, AlertCircle, Play, Pause, X } from 'lucide-react';

interface AudioItem {
  id: string;
  level: string;
  title: string;
  duration: string;
  file: string;
  snippet?: string;
  transcript: string;
  vocab: Array<{ term: string; meaning: string }>;
  quiz: Array<any>;
}

interface PaginatedResponse {
  items: AudioItem[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

interface PaginatedAudioListProps {
  level: string;
  pageSize?: number;
  onAudioSelect?: (audio: AudioItem) => void;
}

export function PaginatedAudioList({ 
  level, 
  pageSize = 12,
  onAudioSelect 
}: PaginatedAudioListProps) {
  const [data, setData] = useState<PaginatedResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAudioId, setSelectedAudioId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAudio, setModalAudio] = useState<AudioItem | null>(null);
  const [currentAudio, setCurrentAudio] = useState<AudioItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedAudioId(null);
    setIsModalOpen(false);
    setModalAudio(null);
    // Stop audio when changing levels
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentAudio(null);
    setIsPlaying(false);
  }, [level]);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    
    const fetchAudios = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `/api/audios?level=${level}&page=${currentPage}&pageSize=${pageSize}`,
          { signal: abortController.signal }
        );
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const result: PaginatedResponse = await response.json();
        
        if (isMounted && !abortController.signal.aborted) {
          setData(result);
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          // Expected error when component unmounts, ignore it
          return;
        }
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error al cargar audios');
          console.error('Error fetching audios:', err);
        }
      } finally {
        if (isMounted && !abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchAudios();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [level, currentPage, pageSize]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (data && currentPage < data.totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRetry = () => {
    setCurrentPage(currentPage);
  };

  const handleAudioPlayClick = (id: string) => {
    const audio = data?.items.find(item => item.id === id);
    if (audio) {
      // If clicking on a different audio, stop current one
      if (currentAudio?.id !== audio.id) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          audioRef.current.src = audio.file;
          audioRef.current.load();
        }
        setCurrentAudio(audio);
        setIsPlaying(false);
      }
      
      setModalAudio(audio);
      setIsModalOpen(true);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
        });
      }
    }
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentAudio(null);
    setIsPlaying(false);
  };

  const handleShowTranscript = () => {
    if (modalAudio) {
      setSelectedAudioId(modalAudio.id);
      setIsModalOpen(false);
      onAudioSelect?.(modalAudio);
      
      // Wait for content to render, then scroll to transcript
      setTimeout(() => {
        const transcriptSection = document.getElementById('transcript-section');
        if (transcriptSection) {
          const yOffset = -100; // Offset for sticky header
          const y = transcriptSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
          
          // Auto-expand transcript if collapsed
          setTimeout(() => {
            const expandButton = document.querySelector('[data-testid="button-toggle-transcript"]') as HTMLButtonElement;
            if (expandButton && expandButton.getAttribute('aria-expanded') === 'false') {
              expandButton.click();
            }
          }, 400);
        }
      }, 300);
    }
  };

  const handleShowQuiz = () => {
    if (modalAudio) {
      setSelectedAudioId(modalAudio.id);
      setIsModalOpen(false);
      onAudioSelect?.(modalAudio);
      
      // Wait for content to render, then scroll to quiz
      setTimeout(() => {
        const quizSection = document.getElementById('quiz-section');
        if (quizSection) {
          const yOffset = -100; // Offset for sticky header
          const y = quizSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4" data-testid="loading-state">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Cargando audios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4" data-testid="error-state">
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-6 w-6" />
          <p className="font-medium">{error}</p>
        </div>
        <button
          onClick={handleRetry}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover-elevate active-elevate-2 border-2 border-primary-border"
          data-testid="button-retry"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4" data-testid="empty-state">
        <p className="text-lg text-muted-foreground">
          No hay audios disponibles en este nivel.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Persistent audio element */}
      <audio
        ref={audioRef}
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />

      {/* Floating mini player when audio is loaded and modal is closed */}
      {currentAudio && !isModalOpen && (
        <div 
          className="fixed bottom-4 right-4 bg-background border-2 rounded-xl shadow-lg p-4 flex items-center gap-3 z-40 max-w-sm"
          data-testid="mini-player"
        >
          <button
            onClick={handlePlayPause}
            className="p-2 rounded-full bg-primary text-primary-foreground hover-elevate active-elevate-2 border-2 border-primary-border flex-shrink-0"
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
            data-testid="button-mini-play-pause"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{currentAudio.title}</p>
            <p className="text-xs text-muted-foreground">
              {isPlaying ? "Reproduciendo..." : "Pausado"}
            </p>
          </div>
          <button
            onClick={handleStopAudio}
            className="p-2 rounded-lg hover-elevate active-elevate-2 flex-shrink-0"
            aria-label="Cerrar reproductor"
            data-testid="button-mini-close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="space-y-8" data-testid="paginated-audio-list">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.slice(0, 2).map((audio) => (
            <AudioCard
              key={audio.id}
              id={audio.id}
              title={audio.title}
              duration={audio.duration}
              snippet={audio.snippet}
              level={audio.level}
              onPlayClick={() => handleAudioPlayClick(audio.id)}
            />
          ))}
          
          {data.items.length > 2 && (
            <>
              <div className="ad-placeholder bg-muted/30 rounded-xl border-2 border-dashed border-muted-foreground/20 p-6 flex items-center justify-center min-h-[200px]" data-testid="ad-placeholder">
                <p className="text-sm text-muted-foreground text-center">
                  Ad Placement
                </p>
              </div>

              {data.items.slice(2).map((audio) => (
                <AudioCard
                  key={audio.id}
                  id={audio.id}
                  title={audio.title}
                  duration={audio.duration}
                  snippet={audio.snippet}
                  level={audio.level}
                  onPlayClick={() => handleAudioPlayClick(audio.id)}
                />
              ))}
            </>
          )}
        </div>

        {data.totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 pt-8 border-t">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-md border hover-elevate active-elevate-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:no-default-hover-elevate"
              data-testid="button-previous-page"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </button>

            <span className="text-sm text-muted-foreground" data-testid="text-page-info">
              Página {currentPage} de {data.totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === data.totalPages}
              className="flex items-center gap-2 px-4 py-2 rounded-md border hover-elevate active-elevate-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:no-default-hover-elevate"
              data-testid="button-next-page">
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {data.total > 0 && (
          <>
            <p className="text-center text-sm text-muted-foreground" data-testid="text-total-audios">
              {data.total} {data.total === 1 ? 'audio' : 'audios'} en total
            </p>
            <NextLevelCTA currentLevel={level as 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2'} />
          </>
        )}
      </div>

      {modalAudio && (
        <AudioModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          audio={{
            id: modalAudio.id,
            title: modalAudio.title,
            file: modalAudio.file,
            snippet: modalAudio.snippet,
            level: modalAudio.level,
          }}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onShowTranscript={handleShowTranscript}
          onShowQuiz={handleShowQuiz}
        />
      )}
    </>
  );
}
