'use client';

import { ThemeProvider } from './ThemeProvider';
import { Header } from './Header';
import Link from 'next/link';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          {children}
        </main>
        
        <footer className="border-t bg-card mt-12">
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Spanish Listening. Todos los derechos reservados.</p>
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
  );
}
