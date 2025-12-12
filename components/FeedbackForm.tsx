'use client';

import { useState } from 'react';
import { Send, MessageSquare, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

export function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message, type: 'suggestion' }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error al enviar');
      }

      setIsSuccess(true);
      setName('');
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="border rounded-lg p-4 text-center bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
        <CheckCircle className="h-5 w-5 text-green-500 mx-auto mb-2" />
        <p className="text-sm text-green-700 dark:text-green-400">Gracias por tu mensaje</p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-xs text-muted-foreground hover:underline mt-1"
          data-testid="button-send-another"
        >
          Enviar otro
        </button>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm text-muted-foreground hover:bg-accent/50 transition-colors"
        data-testid="button-toggle-feedback"
      >
        <span className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Comentarios y sugerencias
        </span>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="p-4 pt-0 space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre (opcional)"
            className="w-full px-3 py-2 text-sm rounded-lg border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            data-testid="input-feedback-name"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tu mensaje..."
            rows={3}
            required
            className="w-full px-3 py-2 text-sm rounded-lg border bg-background focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            data-testid="input-feedback-message"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting || !message.trim()}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg font-medium hover-elevate disabled:opacity-50"
            data-testid="button-submit-feedback"
          >
            <Send className="h-3 w-3" />
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      )}
    </div>
  );
}
