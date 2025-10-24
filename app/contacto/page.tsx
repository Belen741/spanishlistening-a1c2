import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contacto - Spanish Listening',
  description: 'Ponte en contacto con Spanish Listening para preguntas, sugerencias o colaboraciones.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-3xl">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 hover-elevate px-3 py-2 rounded-md transition-colors"
        data-testid="link-back"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-page-title">
        Contacto
      </h1>

      <div className="bg-card border rounded-xl p-8 space-y-6">
        <p className="text-lg leading-relaxed" data-testid="text-contact-intro">
          ¿Tienes alguna pregunta, sugerencia o comentario sobre Spanish Listening? Me encantaría escucharte.
        </p>

        <div className="flex items-start gap-4 p-6 bg-primary/5 border-l-4 border-l-primary rounded-md">
          <Mail className="h-6 w-6 text-primary mt-1" />
          <div>
            <h2 className="font-semibold text-lg mb-2">Correo electrónico</h2>
            <p className="text-muted-foreground mb-3">
              Para consultas generales, sugerencias o colaboraciones:
            </p>
            <a 
              href="mailto:contact@spanishlistening.com" 
              className="text-primary hover:underline font-medium"
              data-testid="link-email"
            >
              contact@spanishlistening.com
            </a>
          </div>
        </div>

        <div className="pt-6 border-t">
          <h2 className="font-semibold text-lg mb-3">Sobre Belén</h2>
          <p className="text-muted-foreground leading-relaxed">
            Soy profesora de español online y creadora de Spanish Listening. Mi objetivo es ayudar a estudiantes de español de todo el mundo a mejorar su comprensión auditiva mediante contenido original y ejercicios interactivos.
          </p>
        </div>
      </div>
    </div>
  );
}
