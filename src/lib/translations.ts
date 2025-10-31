import { Language } from '@/types';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    appName: 'Brain Checker',
    tagline: 'Challenge Your Mind',
    
    // Modes
    modePuzzle: 'Brain Puzzles',
    modeGk: 'General Knowledge',
    modeMixed: 'Mixed Challenge',
    
    // Difficulty
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    
    // Home
    selectMode: 'Select Mode',
    selectDifficulty: 'Select Difficulty',
    questionCount: 'Questions',
    timerPerQuestion: 'Timer',
    timerOff: 'Off',
    negativeMarking: 'Negative Marking',
    startQuiz: 'Start Quiz',
    
    // Game
    question: 'Question',
    of: 'of',
    score: 'Score',
    streak: 'Streak',
    accuracy: 'Accuracy',
    timeRemaining: 'Time Remaining',
    submit: 'Submit',
    next: 'Next',
    pause: 'Pause',
    resume: 'Resume',
    quit: 'Quit',
    confirmQuit: 'Are you sure you want to quit? Your progress will be lost.',
    cancel: 'Cancel',
    trueOption: 'True',
    falseOption: 'False',
    
    // Result
    quizComplete: 'Quiz Complete!',
    finalScore: 'Final Score',
    totalQuestions: 'Total Questions',
    correctAnswers: 'Correct',
    wrongAnswers: 'Wrong',
    totalTime: 'Total Time',
    bestStreak: 'Best Streak',
    reviewAnswers: 'Review Answers',
    retryQuiz: 'Retry Quiz',
    goHome: 'Go Home',
    
    // Review
    reviewTitle: 'Answer Review',
    yourAnswer: 'Your Answer',
    correctAnswer: 'Correct Answer',
    explanation: 'Explanation',
    timeTaken: 'Time Taken',
    pointsEarned: 'Points',
    correct: 'Correct',
    incorrect: 'Incorrect',
    unanswered: 'Unanswered',
    
    // Leaderboard
    leaderboard: 'Leaderboard',
    personalBest: 'Personal Best',
    noHistory: 'No quiz history yet. Complete a quiz to see your records!',
    date: 'Date',
    mode: 'Mode',
    difficulty: 'Difficulty',
    questions: 'Questions',
    accuracyShort: 'Acc',
    time: 'Time',
    clearHistory: 'Clear History',
    confirmClear: 'Are you sure you want to clear all history?',
    
    // Settings
    settings: 'Settings',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    language: 'Language',
    english: 'English',
    hindi: 'हिन्दी',
    sound: 'Sound Effects',
    resetData: 'Reset All Data',
    confirmReset: 'This will delete all your quiz history and settings. Continue?',
    
    // Navigation
    home: 'Home',
    play: 'Play',
    
    // Common
    seconds: 's',
    loading: 'Loading...',
  },
  hi: {
    appName: 'ब्रेन चेकर',
    tagline: 'अपने दिमाग को चुनौती दें',
    
    // Modes
    modePuzzle: 'ब्रेन पज़ल्स',
    modeGk: 'सामान्य ज्ञान',
    modeMixed: 'मिश्रित चुनौती',
    
    // Difficulty
    easy: 'आसान',
    medium: 'मध्यम',
    hard: 'कठिन',
    
    // Home
    selectMode: 'मोड चुनें',
    selectDifficulty: 'कठिनाई चुनें',
    questionCount: 'प्रश्न',
    timerPerQuestion: 'टाइमर',
    timerOff: 'बंद',
    negativeMarking: 'नकारात्मक अंकन',
    startQuiz: 'क्विज शुरू करें',
    
    // Game
    question: 'प्रश्न',
    of: 'का',
    score: 'स्कोर',
    streak: 'स्ट्रीक',
    accuracy: 'सटीकता',
    timeRemaining: 'शेष समय',
    submit: 'जमा करें',
    next: 'अगला',
    pause: 'रोकें',
    resume: 'जारी रखें',
    quit: 'छोड़ें',
    confirmQuit: 'क्या आप वाकई छोड़ना चाहते हैं? आपकी प्रगति खो जाएगी।',
    cancel: 'रद्द करें',
    trueOption: 'सही',
    falseOption: 'गलत',
    
    // Result
    quizComplete: 'क्विज पूर्ण!',
    finalScore: 'अंतिम स्कोर',
    totalQuestions: 'कुल प्रश्न',
    correctAnswers: 'सही',
    wrongAnswers: 'गलत',
    totalTime: 'कुल समय',
    bestStreak: 'सर्वश्रेष्ठ स्ट्रीक',
    reviewAnswers: 'उत्तर समीक्षा',
    retryQuiz: 'फिर से प्रयास करें',
    goHome: 'होम पर जाएं',
    
    // Review
    reviewTitle: 'उत्तर समीक्षा',
    yourAnswer: 'आपका उत्तर',
    correctAnswer: 'सही उत्तर',
    explanation: 'व्याख्या',
    timeTaken: 'लिया गया समय',
    pointsEarned: 'अंक',
    correct: 'सही',
    incorrect: 'गलत',
    unanswered: 'अनुत्तरित',
    
    // Leaderboard
    leaderboard: 'लीडरबोर्ड',
    personalBest: 'व्यक्तिगत सर्वश्रेष्ठ',
    noHistory: 'अभी तक कोई क्विज इतिहास नहीं। अपने रिकॉर्ड देखने के लिए एक क्विज पूर्ण करें!',
    date: 'तारीख',
    mode: 'मोड',
    difficulty: 'कठिनाई',
    questions: 'प्रश्न',
    accuracyShort: 'सटीकता',
    time: 'समय',
    clearHistory: 'इतिहास साफ़ करें',
    confirmClear: 'क्या आप सभी इतिहास हटाना चाहते हैं?',
    
    // Settings
    settings: 'सेटिंग्स',
    theme: 'थीम',
    light: 'लाइट',
    dark: 'डार्क',
    system: 'सिस्टम',
    language: 'भाषा',
    english: 'English',
    hindi: 'हिन्दी',
    sound: 'ध्वनि प्रभाव',
    resetData: 'सभी डेटा रीसेट करें',
    confirmReset: 'यह आपके सभी क्विज इतिहास और सेटिंग्स को हटा देगा। जारी रखें?',
    
    // Navigation
    home: 'होम',
    play: 'खेलें',
    
    // Common
    seconds: 'से',
    loading: 'लोड हो रहा है...',
  },
};

export const t = (key: string, lang: Language): string => {
  return translations[lang][key] || key;
};
