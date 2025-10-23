export interface VocabItem {
  term: string;
  meaning: string;
}

export interface QuizQuestion {
  id: string;
  type: 'single' | 'multiple';
  question: string;
  options: string[];
  answerIndex: number | number[]; // single: number, multiple: number[]
  explanation: string;
}

export interface LevelContent {
  title: string;
  audioSrc: string;
  transcript: string;
  vocab: VocabItem[];
  quiz: QuizQuestion[];
}

export type LevelSlug = 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2';

export interface LevelInfo {
  slug: LevelSlug;
  name: string;
  description: string;
  color: string;
}
