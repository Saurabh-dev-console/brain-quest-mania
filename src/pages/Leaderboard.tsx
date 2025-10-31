import React, { useState } from 'react';
import { Trophy, Calendar, Target, Clock, Trash2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { clearHistory, getBestScores } from '@/lib/storage';
import { formatTime, formatAccuracy } from '@/lib/scoring';
import { t } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

export const Leaderboard: React.FC = () => {
  const { language, history, refreshHistory } = useApp();
  const [showClearDialog, setShowClearDialog] = useState(false);

  const handleClearHistory = () => {
    clearHistory();
    refreshHistory();
    setShowClearDialog(false);
  };

  const bestScores = getBestScores(history);

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getModeLabel = (mode: string): string => {
    if (mode === 'puzzle') return t('modePuzzle', language);
    if (mode === 'gk') return t('modeGk', language);
    return t('modeMixed', language);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl gradient-accent shadow-glow">
              <Trophy className="h-7 w-7 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t('leaderboard', language)}</h1>
              <p className="text-muted-foreground">{t('personalBest', language)}</p>
            </div>
          </div>

          {history.length > 0 && (
            <Button
              onClick={() => setShowClearDialog(true)}
              variant="outline"
              size="sm"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {t('clearHistory', language)}
            </Button>
          )}
        </div>

        {/* Best Scores */}
        {bestScores.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">{t('personalBest', language)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bestScores.map((item) => (
                <Card key={item.id} className="p-5 gradient-card shadow-md hover:shadow-lg transition-smooth">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-foreground">{getModeLabel(item.config.mode)}</div>
                        <Badge variant="outline" className="mt-1 capitalize">
                          {item.config.difficulty}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                          {item.finalScore}
                        </div>
                        <div className="text-xs text-muted-foreground">{t('score', language)}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div>
                        <div className="text-success font-semibold">{formatAccuracy(item.correctCount, item.totalQuestions)}</div>
                        <div className="text-xs text-muted-foreground">{t('accuracyShort', language)}</div>
                      </div>
                      <div>
                        <div className="text-accent font-semibold">{formatTime(item.duration)}</div>
                        <div className="text-xs text-muted-foreground">{t('time', language)}</div>
                      </div>
                      <div>
                        <div className="text-primary font-semibold">{item.maxStreak}</div>
                        <div className="text-xs text-muted-foreground">{t('streak', language)}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All History */}
        {history.length > 0 ? (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">All Attempts</h2>
            <div className="space-y-3">
              {history.map((item) => (
                <Card key={item.id} className="p-4 hover:shadow-md transition-smooth">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-foreground">{getModeLabel(item.config.mode)}</span>
                        <Badge variant="outline" className="text-xs capitalize">{item.config.difficulty}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {item.totalQuestions} {t('questions', language)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(item.timestamp)}
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{item.finalScore}</div>
                        <div className="text-xs text-muted-foreground">{t('score', language)}</div>
                      </div>
                      <div className="hidden sm:flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4 text-success" />
                          <span>{formatAccuracy(item.correctCount, item.totalQuestions)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-accent" />
                          <span>{formatTime(item.duration)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-lg text-muted-foreground">{t('noHistory', language)}</p>
          </Card>
        )}
      </div>

      {/* Clear History Dialog */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('clearHistory', language)}</AlertDialogTitle>
            <AlertDialogDescription>{t('confirmClear', language)}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel', language)}</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearHistory}>{t('clearHistory', language)}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Leaderboard;
