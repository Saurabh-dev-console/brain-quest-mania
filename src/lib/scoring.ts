import { Difficulty } from '@/types';

const BASE_POINTS: Record<Difficulty, number> = {
  easy: 10,
  medium: 20,
  hard: 30,
};

const STREAK_BONUS_PER_LEVEL = 2;
const MAX_STREAK_BONUS = 10;

const TIME_BONUS_CAP: Record<Difficulty, number> = {
  easy: 5,
  medium: 10,
  hard: 15,
};

export const calculatePoints = (
  difficulty: Difficulty,
  isCorrect: boolean,
  streak: number,
  timeRemaining: number,
  timerDuration: number,
  negativeMarkingEnabled: boolean
): number => {
  if (!isCorrect) {
    if (negativeMarkingEnabled) {
      return Math.floor(-BASE_POINTS[difficulty] * 0.25);
    }
    return 0;
  }

  let points = BASE_POINTS[difficulty];

  // Streak bonus
  const streakBonus = Math.min(streak * STREAK_BONUS_PER_LEVEL, MAX_STREAK_BONUS);
  points += streakBonus;

  // Time bonus
  if (timerDuration > 0 && timeRemaining > 0) {
    const timeBonus = Math.min(timeRemaining, TIME_BONUS_CAP[difficulty]);
    points += timeBonus;
  }

  return points;
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatAccuracy = (correct: number, total: number): string => {
  if (total === 0) return '0%';
  return `${Math.round((correct / total) * 100)}%`;
};
