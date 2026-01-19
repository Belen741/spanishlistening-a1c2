import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Poppins } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ClientLayout } from '../components/ClientLayout';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Spanish Listening - Práctica de Comprensión Auditiva',
  description: 'Mejora tu comprensión auditiva en español con ejercicios organizados por niveles CEFR (A1-C2). Incluye audios, transcripciones, vocabulario y quizzes evaluables.',
  keywords: 'listening, español, comprensión auditiva, A1, A2, B1, B2, C1, C2, CEFR, práctica, Spanish listening',
  openGraph: {
    title: 'Spanish Listening',
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M66R69M44C"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M66R69M44C');
          `}
        </Script>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7163907475738249"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${poppins.variable}`} suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
