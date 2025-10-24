'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Search } from 'lucide-react';
import FormattedDialogue from './FormattedDialogue';

interface TranscriptProps {
  text: string;
}

export function Transcript({ text }: TranscriptProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getHighlightedHtml = (text: string, search: string): string => {
    if (!search.trim()) return text;
    
    // Escapar caracteres especiales de regex en el término de búsqueda
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Reemplazar todas las coincidencias con <mark> tags
    return text.replace(
      new RegExp(`(${escapedSearch})`, 'gi'),
      '<mark class="bg-primary/30 rounded px-0.5">$1</mark>'
    );
  };

  return (
    <div className="bg-card rounded-xl border" data-testid="transcript-container">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-5 bg-primary/5 hover-elevate active-elevate-2 rounded-t-xl border-l-4 border-l-primary"
        aria-expanded={isExpanded}
        data-testid="button-toggle-transcript"
      >
        <h3 className="font-bold text-lg flex items-center gap-2">
          Transcripción
          {!isExpanded && <span className="text-sm text-muted-foreground font-normal">(Click para expandir)</span>}
        </h3>
        {isExpanded ? (
          <ChevronUp className="h-6 w-6 text-primary" />
        ) : (
          <ChevronDown className="h-6 w-6 text-primary" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t p-4 space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Buscar en la transcripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                data-testid="input-search-transcript"
              />
            </div>
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-md border hover-elevate active-elevate-2 flex items-center gap-2"
              data-testid="button-copy-transcript"
            >
              <Copy className="h-4 w-4" />
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>

          <div className="max-w-none bg-muted/30 rounded-lg p-4" data-testid="text-transcript-content">
            <FormattedDialogue value={getHighlightedHtml(text, searchTerm)} />
          </div>
        </div>
      )}
    </div>
  );
}
