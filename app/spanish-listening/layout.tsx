import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spanish Listening',
  description: 'Practice your Spanish listening comprehension with real audios, transcripts, and quizzes for all levels (A1–C2).',
  keywords: 'Spanish listening, learn Spanish, listening comprehension, Spanish practice, A1, A2, B1, B2, C1, C2, CEFR',
  openGraph: {
    title: 'Spanish Listening',
    description: 'Practice your Spanish listening comprehension with real audios, transcripts, and quizzes for all levels',
    type: 'website',
  },
};

export default function SpanishListeningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
