import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, Pause, Play as PlayIcon, X } from 'lucide-react';
import { Question, QuestionResult, SessionConfig, SessionProgress } from '@/types';
import { getRandomQuestions } from '@/lib/questionRandomizer';
import { calculatePoints, formatTime } from '@/lib/scoring';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export const Play: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useApp();
  
  const config = location.state?.config as SessionConfig;
  
  const [questions] = useState<Question[]>(() => getRandomQuestions(config));
  const [progress, setProgress] = useState<SessionProgress>({
    currentIndex: 0,
    answers: [],
    score: 0,
    currentStreak: 0,
    maxStreak: 0,
    startTime: Date.now(),
  });
  
  const [userAnswer, setUserAnswer] = useState<string | number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(config.timer);
  const [isPaused, setIsPaused] = useState(false);
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const currentQuestion = questions[progress.currentIndex];

  // Timer effect
  useEffect(() => {
    if (config.timer === 0 || isPaused) return;

    if (timeRemaining <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1) as 0 | 10 | 20 | 30);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isPaused, config.timer]);

  const handleSubmit = () => {
    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
    const correctAnswer = currentQuestion.type === 'tf' 
      ? currentQuestion.correctValue 
      : currentQuestion.correctIndex;
    
    const isCorrect = userAnswer === correctAnswer || 
      (currentQuestion.type === 'mcq' && userAnswer === correctAnswer);

    const newStreak = isCorrect ? progress.currentStreak + 1 : 0;
    const maxStreak = Math.max(progress.maxStreak, newStreak);

    const points = calculatePoints(
      currentQuestion.difficulty,
      isCorrect,
      progress.currentStreak,
      timeRemaining,
      config.timer,
      config.negativeMarkingEnabled
    );

    const result: QuestionResult = {
      questionId: currentQuestion.id,
      userAnswer,
      correctAnswer,
      isCorrect,
      timeTaken,
      pointsEarned: points,
    };

    const newProgress: SessionProgress = {
      ...progress,
      answers: [...progress.answers, result],
      score: progress.score + points,
      currentStreak: newStreak,
      maxStreak,
    };

    setProgress(newProgress);

    // Move to next question or finish
    if (progress.currentIndex + 1 < questions.length) {
      setProgress({ ...newProgress, currentIndex: newProgress.currentIndex + 1 });
      setUserAnswer(null);
      setTimeRemaining(config.timer);
      setQuestionStartTime(Date.now());
    } else {
      // Quiz complete
      navigate('/result', {
        state: {
          config,
          questions,
          progress: newProgress,
        },
      });
    }
  };

  const handleQuit = () => {
    setShowQuitDialog(false);
    navigate('/');
  };

  if (!config || questions.length === 0) {
    navigate('/');
    return null;
  }

  const progressPercent = ((progress.currentIndex + 1) / questions.length) * 100;
  const timerPercent = config.timer > 0 ? (timeRemaining / config.timer) * 100 : 100;
  const accuracy = progress.answers.length > 0
    ? Math.round((progress.answers.filter((a) => a.isCorrect).length / progress.answers.length) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="space-y-6">
        {/* HUD */}
        <Card className="p-4 gradient-card shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">{t('score', language)}</div>
              <div className="text-2xl font-bold text-primary">{progress.score}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">{t('streak', language)}</div>
              <div className="text-2xl font-bold text-accent">{progress.currentStreak}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">{t('accuracy', language)}</div>
              <div className="text-2xl font-bold text-success">{accuracy}%</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">{t('question', language)}</div>
              <div className="text-2xl font-bold text-foreground">
                {progress.currentIndex + 1}/{questions.length}
              </div>
            </div>
          </div>

          <Progress value={progressPercent} className="h-2" />
        </Card>

        {/* Timer */}
        {config.timer > 0 && (
          <Card className="p-4 bg-gradient-to-r from-accent/10 to-accent/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                <span className="font-semibold">{t('timeRemaining', language)}</span>
              </div>
              <span className="text-2xl font-bold text-accent">{formatTime(timeRemaining)}</span>
            </div>
            <Progress value={timerPercent} />
          </Card>
        )}

        {/* Question */}
        <Card className="p-8 gradient-card shadow-lg">
          <div className="space-y-6">
            <div>
              <div className="text-sm text-muted-foreground mb-2">
                {t('question', language)} {progress.currentIndex + 1} {t('of', language)} {questions.length}
              </div>
              <h2 className="text-2xl font-bold text-foreground leading-relaxed">
                {currentQuestion.prompt}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.type === 'tf' ? (
                <RadioGroup
                  value={userAnswer?.toString()}
                  onValueChange={(value) => setUserAnswer(value)}
                >
                  <div className="flex items-center space-x-2 p-4 rounded-lg border-2 border-border hover:border-primary transition-smooth cursor-pointer">
                    <RadioGroupItem value="true" id="true" />
                    <Label htmlFor="true" className="flex-1 cursor-pointer text-lg">
                      {t('trueOption', language)}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border-2 border-border hover:border-primary transition-smooth cursor-pointer">
                    <RadioGroupItem value="false" id="false" />
                    <Label htmlFor="false" className="flex-1 cursor-pointer text-lg">
                      {t('falseOption', language)}
                    </Label>
                  </div>
                </RadioGroup>
              ) : (
                <RadioGroup
                  value={userAnswer?.toString()}
                  onValueChange={(value) => setUserAnswer(parseInt(value))}
                >
                  {currentQuestion.options?.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-4 rounded-lg border-2 border-border hover:border-primary transition-smooth cursor-pointer"
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-lg">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={() => setIsPaused(!isPaused)}
            variant="outline"
            size="lg"
            className="flex-1"
          >
            {isPaused ? (
              <>
                <PlayIcon className="mr-2 h-5 w-5" />
                {t('resume', language)}
              </>
            ) : (
              <>
                <Pause className="mr-2 h-5 w-5" />
                {t('pause', language)}
              </>
            )}
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={userAnswer === null || isPaused}
            size="lg"
            className="flex-1 gradient-primary shadow-lg"
          >
            {progress.currentIndex + 1 === questions.length ? t('submit', language) : t('next', language)}
          </Button>

          <Button
            onClick={() => setShowQuitDialog(true)}
            variant="destructive"
            size="lg"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Quit Dialog */}
      <AlertDialog open={showQuitDialog} onOpenChange={setShowQuitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('quit', language)}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('confirmQuit', language)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel', language)}</AlertDialogCancel>
            <AlertDialogAction onClick={handleQuit}>{t('quit', language)}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Play;
