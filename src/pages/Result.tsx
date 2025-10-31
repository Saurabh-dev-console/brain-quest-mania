import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Trophy, Target, Clock, Zap, Home, Eye, RotateCcw } from 'lucide-react';
import { Question, SessionConfig, SessionProgress } from '@/types';
import { saveHistory } from '@/lib/storage';
import { formatTime, formatAccuracy } from '@/lib/scoring';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, refreshHistory } = useApp();

  const config = location.state?.config as SessionConfig;
  const questions = location.state?.questions as Question[];
  const progress = location.state?.progress as SessionProgress;

  useEffect(() => {
    if (!config || !progress) {
      navigate('/');
      return;
    }

    // Save to history
    const duration = Math.floor((Date.now() - progress.startTime) / 1000);
    const correctCount = progress.answers.filter((a) => a.isCorrect).length;
    const accuracy = (correctCount / progress.answers.length) * 100;

    const historyItem = {
      id: `${Date.now()}`,
      timestamp: Date.now(),
      config,
      finalScore: progress.score,
      accuracy,
      duration,
      maxStreak: progress.maxStreak,
      totalQuestions: questions.length,
      correctCount,
    };

    saveHistory(historyItem);
    refreshHistory();
  }, []);

  if (!config || !progress) {
    return null;
  }

  const duration = Math.floor((Date.now() - progress.startTime) / 1000);
  const correctCount = progress.answers.filter((a) => a.isCorrect).length;
  const wrongCount = progress.answers.length - correctCount;

  const handleReview = () => {
    navigate('/review', { state: { config, questions, progress } });
  };

  const handleRetry = () => {
    navigate('/play', { state: { config } });
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-block p-4 rounded-full gradient-primary shadow-glow">
            <Trophy className="h-12 w-12 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('quizComplete', language)}
          </h1>
        </div>

        {/* Score Card */}
        <Card className="p-8 gradient-card shadow-lg">
          <div className="text-center space-y-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">{t('finalScore', language)}</div>
              <div className="text-6xl font-bold gradient-primary bg-clip-text text-transparent">
                {progress.score}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <Target className="h-6 w-6 mx-auto mb-1 text-success" />
                <div className="text-2xl font-bold text-success">{correctCount}</div>
                <div className="text-xs text-muted-foreground">{t('correctAnswers', language)}</div>
              </div>
              <div className="text-center">
                <Target className="h-6 w-6 mx-auto mb-1 text-destructive" />
                <div className="text-2xl font-bold text-destructive">{wrongCount}</div>
                <div className="text-xs text-muted-foreground">{t('wrongAnswers', language)}</div>
              </div>
              <div className="text-center">
                <Clock className="h-6 w-6 mx-auto mb-1 text-accent" />
                <div className="text-2xl font-bold text-accent">{formatTime(duration)}</div>
                <div className="text-xs text-muted-foreground">{t('totalTime', language)}</div>
              </div>
              <div className="text-center">
                <Zap className="h-6 w-6 mx-auto mb-1 text-primary" />
                <div className="text-2xl font-bold text-primary">{progress.maxStreak}</div>
                <div className="text-xs text-muted-foreground">{t('bestStreak', language)}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-1">{t('totalQuestions', language)}</div>
            <div className="text-3xl font-bold text-foreground">{questions.length}</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-1">{t('accuracy', language)}</div>
            <div className="text-3xl font-bold text-success">
              {formatAccuracy(correctCount, questions.length)}
            </div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-1">{t('difficulty', language)}</div>
            <div className="text-3xl font-bold text-accent capitalize">{config.difficulty}</div>
          </Card>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleReview}
            size="lg"
            className="w-full gradient-primary shadow-lg"
          >
            <Eye className="mr-2 h-5 w-5" />
            {t('reviewAnswers', language)}
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button onClick={handleRetry} size="lg" variant="outline">
              <RotateCcw className="mr-2 h-5 w-5" />
              {t('retryQuiz', language)}
            </Button>
            <Button onClick={handleHome} size="lg" variant="outline">
              <Home className="mr-2 h-5 w-5" />
              {t('goHome', language)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
