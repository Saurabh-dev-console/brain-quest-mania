import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, ArrowLeft } from 'lucide-react';
import { Question, SessionProgress } from '@/types';
import { formatTime } from '@/lib/scoring';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const Review: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useApp();

  const questions = location.state?.questions as Question[];
  const progress = location.state?.progress as SessionProgress;

  if (!questions || !progress) {
    navigate('/');
    return null;
  }

  const getAnswerText = (question: Question, answer: string | number | null): string => {
    if (answer === null) return t('unanswered', language);
    
    if (question.type === 'tf') {
      return answer === 'true' ? t('trueOption', language) : t('falseOption', language);
    }
    
    if (question.type === 'mcq' && question.options) {
      return question.options[answer as number] || t('unanswered', language);
    }
    
    return String(answer);
  };

  const getCorrectAnswerText = (question: Question): string => {
    if (question.type === 'tf') {
      return question.correctValue === 'true' ? t('trueOption', language) : t('falseOption', language);
    }
    
    if (question.type === 'mcq' && question.options && question.correctIndex !== undefined) {
      return question.options[question.correctIndex];
    }
    
    return question.correctValue || '';
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('reviewTitle', language)}</h1>
            <p className="text-muted-foreground">
              {progress.answers.filter((a) => a.isCorrect).length} / {questions.length} {t('correct', language)}
            </p>
          </div>
          <Button onClick={() => navigate('/')} variant="outline" size="lg">
            <ArrowLeft className="mr-2 h-5 w-5" />
            {t('goHome', language)}
          </Button>
        </div>

        {/* Questions Review */}
        <div className="space-y-4">
          {questions.map((question, index) => {
            const result = progress.answers[index];
            const isCorrect = result?.isCorrect;

            return (
              <Card key={question.id} className="p-6 gradient-card shadow-md">
                <div className="space-y-4">
                  {/* Question Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={isCorrect ? 'default' : 'destructive'} className="text-xs">
                          {t('question', language)} {index + 1}
                        </Badge>
                        <Badge variant="outline" className="text-xs capitalize">
                          {question.difficulty}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{question.prompt}</h3>
                    </div>
                    <div className="text-right">
                      {isCorrect ? (
                        <CheckCircle className="h-8 w-8 text-success" />
                      ) : (
                        <XCircle className="h-8 w-8 text-destructive" />
                      )}
                    </div>
                  </div>

                  {/* Answers */}
                  <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div>
                      <div className="text-sm font-semibold text-muted-foreground mb-1">
                        {t('yourAnswer', language)}
                      </div>
                      <div className={`text-base font-medium ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                        {getAnswerText(question, result?.userAnswer)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-muted-foreground mb-1">
                        {t('correctAnswer', language)}
                      </div>
                      <div className="text-base font-medium text-success">
                        {getCorrectAnswerText(question)}
                      </div>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="text-sm font-semibold text-primary mb-1">
                      {t('explanation', language)}
                    </div>
                    <p className="text-foreground leading-relaxed">{question.explanation}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{t('timeTaken', language)}: {formatTime(result?.timeTaken || 0)}</span>
                    </div>
                    <div>
                      {t('pointsEarned', language)}: <span className="font-semibold">{result?.pointsEarned || 0}</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom Action */}
        <Button onClick={() => navigate('/')} size="lg" className="w-full gradient-primary shadow-lg">
          <ArrowLeft className="mr-2 h-5 w-5" />
          {t('goHome', language)}
        </Button>
      </div>
    </div>
  );
};

export default Review;
