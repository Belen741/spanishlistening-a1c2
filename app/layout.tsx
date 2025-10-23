import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@components/ThemeProvider';
import { Header } from '@components/Header';
import Link from 'next/link';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Listening por Niveles - Práctica de Comprensión Auditiva',
  description: 'Mejora tu comprensión auditiva en español con ejercicios organizados por niveles CEFR (A1-C2). Incluye audios, transcripciones, vocabulario y quizzes evaluables.',
  keywords: 'listening, español, comprensión auditiva, A1, A2, B1, B2, C1, C2, CEFR, práctica',
  openGraph: {
    title: 'Listening por Niveles',
    description: 'Práctica de comprensión auditiva en español por niveles CEFR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            
            <main className="flex-1">
              {children}
            </main>
            
            <footer className="border-t bg-card mt-12">
              <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                  <p>© {new Date().getFullYear()} Listening por Niveles. Todos los derechos reservados.</p>
                  <nav className="flex gap-6">
                    <Link href="/legal/privacidad" className="hover:text-foreground transition-colors" data-testid="link-privacy">
                      Política de Privacidad
                    </Link>
                    <Link href="/legal/terminos" className="hover:text-foreground transition-colors" data-testid="link-terms">
                      Términos y Condiciones
                    </Link>
                  </nav>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
