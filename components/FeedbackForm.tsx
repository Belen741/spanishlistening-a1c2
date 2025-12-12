'use client';

import { useState } from 'react';
import { Send, MessageSquare, Lightbulb, CheckCircle } from 'lucide-react';

export function FeedbackForm() {
  const [type, setType] = useState<'comment' | 'suggestion'>('suggestion');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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
        body: JSON.stringify({ name, email, message, type }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error al enviar');
      }

      setIsSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar el mensaje');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-card border rounded-xl p-6 text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold mb-2">Mensaje enviado</h3>
        <p className="text-muted-foreground mb-4">Gracias por tu feedback</p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-primary hover:underline text-sm"
          data-testid="button-send-another"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        Comentarios y Sugerencias
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setType('suggestion')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
              type === 'suggestion'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background hover-elevate'
            }`}
            data-testid="button-type-suggestion"
          >
            <Lightbulb className="h-4 w-4" />
            Sugerencia
          </button>
          <button
            type="button"
            onClick={() => setType('comment')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
              type === 'comment'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background hover-elevate'
            }`}
            data-testid="button-type-comment"
          >
            <MessageSquare className="h-4 w-4" />
            Comentario
          </button>
        </div>

        <div>
          <label htmlFor="feedback-name" className="block text-sm font-medium mb-1">
            Nombre (opcional)
          </label>
          <input
            id="feedback-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            data-testid="input-feedback-name"
          />
        </div>

        <div>
          <label htmlFor="feedback-email" className="block text-sm font-medium mb-1">
            Email (opcional)
          </label>
          <input
            id="feedback-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            data-testid="input-feedback-email"
          />
        </div>

        <div>
          <label htmlFor="feedback-message" className="block text-sm font-medium mb-1">
            Mensaje *
          </label>
          <textarea
            id="feedback-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={type === 'suggestion' ? 'Cuéntame tu sugerencia...' : 'Escribe tu comentario...'}
            rows={4}
            required
            className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            data-testid="input-feedback-message"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500" data-testid="text-feedback-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !message.trim()}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover-elevate active-elevate-2 disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="button-submit-feedback"
        >
          {isSubmitting ? (
            'Enviando...'
          ) : (
            <>
              <Send className="h-4 w-4" />
              Enviar
            </>
          )}
        </button>
      </form>
    </div>
  );
}
