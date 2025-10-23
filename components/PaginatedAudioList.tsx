'use client';

import { useState, useEffect } from 'react';
import { AudioCard } from './AudioCard';
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';

interface AudioItem {
  id: string;
  level: string;
  title: string;
  duration: string;
  file: string;
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

  useEffect(() => {
    setCurrentPage(1);
    setSelectedAudioId(null);
  }, [level]);

  useEffect(() => {
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
        
        if (!abortController.signal.aborted) {
          setData(result);
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        setError(err instanceof Error ? err.message : 'Error al cargar audios');
        console.error('Error fetching audios:', err);
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchAudios();

    return () => {
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

  const handleAudioSelect = (id: string) => {
    setSelectedAudioId(id);
    const audio = data?.items.find(item => item.id === id);
    if (audio && onAudioSelect) {
      onAudioSelect(audio);
    }
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
    <div className="space-y-8" data-testid="paginated-audio-list">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.items.map((audio) => (
          <AudioCard
            key={audio.id}
            id={audio.id}
            title={audio.title}
            duration={audio.duration}
            file={audio.file}
            onSelect={handleAudioSelect}
          />
        ))}
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
            data-testid="button-next-page"
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {data.total > 0 && (
        <p className="text-center text-sm text-muted-foreground" data-testid="text-total-audios">
          {data.total} {data.total === 1 ? 'audio' : 'audios'} en total
        </p>
      )}
    </div>
  );
}
