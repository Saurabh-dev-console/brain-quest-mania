import { Question, SessionConfig, Difficulty } from '@/types';
import { questions } from '@/data/questions';

const shuffle = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getRandomQuestions = (config: SessionConfig): Question[] => {
  // Filter by language
  let pool = questions.filter((q) => q.language === config.language);

  // Filter by mode and difficulty
  if (config.mode === 'mixed') {
    // For mixed mode, get weighted questions from each difficulty
    const easyCount = Math.ceil(config.questionCount * 0.4);
    const mediumCount = Math.ceil(config.questionCount * 0.35);
    const hardCount = config.questionCount - easyCount - mediumCount;

    const easy = shuffle(pool.filter((q) => q.difficulty === 'easy')).slice(0, easyCount);
    const medium = shuffle(pool.filter((q) => q.difficulty === 'medium')).slice(0, mediumCount);
    const hard = shuffle(pool.filter((q) => q.difficulty === 'hard')).slice(0, hardCount);

    pool = shuffle([...easy, ...medium, ...hard]);
  } else {
    // Filter by category (puzzle or gk) and difficulty
    pool = pool.filter(
      (q) => 
        (config.mode === 'puzzle' ? q.category === 'puzzle' : q.category === 'gk') &&
        q.difficulty === config.difficulty
    );
    pool = shuffle(pool);
  }

  // Return the required number of questions
  return pool.slice(0, config.questionCount);
};
