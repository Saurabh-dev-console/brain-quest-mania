export type Language = 'en' | 'hi';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'mcq' | 'tf' | 'riddle';
export type Category = 'puzzle' | 'gk' | 'mixed';
export type Mode = 'puzzle' | 'gk' | 'mixed';

export interface Question {
  id: string;
  category: Category;
  difficulty: Difficulty;
  type: QuestionType;
  prompt: string;
  options?: string[];
  correctIndex?: number;
  correctValue?: string;
  explanation: string;
  imageUrl?: string;
  language: Language;
}

export interface SessionConfig {
  mode: Mode;
  difficulty: Difficulty;
  questionCount: 5 | 10 | 20;
  timer: 0 | 10 | 20 | 30;
  negativeMarkingEnabled: boolean;
  language: Language;
}

export interface QuestionResult {
  questionId: string;
  userAnswer: string | number | null;
  correctAnswer: string | number;
  isCorrect: boolean;
  timeTaken: number;
  pointsEarned: number;
}

export interface SessionProgress {
  currentIndex: number;
  answers: QuestionResult[];
  score: number;
  currentStreak: number;
  maxStreak: number;
  startTime: number;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  config: SessionConfig;
  finalScore: number;
  accuracy: number;
  duration: number;
  maxStreak: number;
  totalQuestions: number;
  correctCount: number;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: Language;
  soundEnabled: boolean;
}
