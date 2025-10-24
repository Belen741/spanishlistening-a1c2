'use client';

import { useState } from 'react';
import { Copy, ChevronDown, ChevronUp } from 'lucide-react';
import type { VocabItem } from '@/types/level';

interface VocabListProps {
  items: VocabItem[];
}

export function VocabList({ items }: VocabListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (item: VocabItem, index: number) => {
    try {
      await navigator.clipboard.writeText(`${item.term} - ${item.meaning}`);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-card rounded-xl border" data-testid="vocab-list">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-5 bg-primary/5 hover-elevate active-elevate-2 rounded-t-xl border-l-4 border-l-primary"
        aria-expanded={isExpanded}
        data-testid="button-toggle-vocab"
      >
        <h3 className="font-bold text-lg flex items-center gap-2">
          Vocabulario Clave
          {!isExpanded && <span className="text-sm text-muted-foreground font-normal">({items.length} palabras)</span>}
        </h3>
        {isExpanded ? (
          <ChevronUp className="h-6 w-6 text-primary" />
        ) : (
          <ChevronDown className="h-6 w-6 text-primary" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="group relative p-4 rounded-lg border bg-background hover-elevate active-elevate-2 transition-all"
            data-testid={`vocab-item-${index}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <dt className="font-semibold text-base mb-1 font-mono" data-testid={`vocab-term-${index}`}>
                  {item.term}
                </dt>
                <dd className="text-sm text-muted-foreground" data-testid={`vocab-meaning-${index}`}>
                  {item.meaning}
                </dd>
              </div>
              <button
                onClick={() => handleCopy(item, index)}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded hover:bg-muted transition-all"
                title="Copiar"
                data-testid={`button-copy-vocab-${index}`}
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            {copiedIndex === index && (
              <span className="absolute top-2 right-2 text-xs text-success font-medium">
                ✓ Copiado
              </span>
            )}
          </div>
        ))}
          </div>
        </div>
      )}
    </div>
  );
}
