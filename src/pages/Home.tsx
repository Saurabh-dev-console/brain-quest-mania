import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, BookOpen, Sparkles, ChevronRight } from 'lucide-react';
import { SessionConfig, Mode, Difficulty } from '@/types';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useApp();

  const [config, setConfig] = useState<SessionConfig>({
    mode: 'puzzle',
    difficulty: 'medium',
    questionCount: 10,
    timer: 0,
    negativeMarkingEnabled: false,
    language,
  });

  const modes: Array<{ value: Mode; icon: React.ElementType; label: string; gradient: string }> = [
    { value: 'puzzle', icon: Brain, label: t('modePuzzle', language), gradient: 'gradient-primary' },
    { value: 'gk', icon: BookOpen, label: t('modeGk', language), gradient: 'gradient-accent' },
    { value: 'mixed', icon: Sparkles, label: t('modeMixed', language), gradient: 'gradient-success' },
  ];

  const startQuiz = () => {
    navigate('/play', { state: { config } });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Mode Selection */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">{t('selectMode', language)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {modes.map((mode) => {
              const Icon = mode.icon;
              const isSelected = config.mode === mode.value;
              return (
                <Card
                  key={mode.value}
                  className={`p-6 cursor-pointer transition-smooth hover:shadow-lg ${
                    isSelected ? 'ring-2 ring-primary shadow-glow' : ''
                  }`}
                  onClick={() => setConfig({ ...config, mode: mode.value })}
                >
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className={`p-4 rounded-xl ${mode.gradient}`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">{mode.label}</h3>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Settings Card */}
        <Card className="p-6 gradient-card shadow-md">
          <div className="space-y-6">
            {/* Difficulty */}
            <div className="space-y-2">
              <Label htmlFor="difficulty" className="text-base font-semibold">
                {t('selectDifficulty', language)}
              </Label>
              <Select
                value={config.difficulty}
                onValueChange={(value: Difficulty) =>
                  setConfig({ ...config, difficulty: value })
                }
              >
                <SelectTrigger id="difficulty" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">{t('easy', language)}</SelectItem>
                  <SelectItem value="medium">{t('medium', language)}</SelectItem>
                  <SelectItem value="hard">{t('hard', language)}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Question Count */}
            <div className="space-y-2">
              <Label htmlFor="count" className="text-base font-semibold">
                {t('questionCount', language)}
              </Label>
              <Select
                value={config.questionCount.toString()}
                onValueChange={(value) =>
                  setConfig({ ...config, questionCount: parseInt(value) as 5 | 10 | 20 })
                }
              >
                <SelectTrigger id="count" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 {t('questions', language)}</SelectItem>
                  <SelectItem value="10">10 {t('questions', language)}</SelectItem>
                  <SelectItem value="20">20 {t('questions', language)}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Timer */}
            <div className="space-y-2">
              <Label htmlFor="timer" className="text-base font-semibold">
                {t('timerPerQuestion', language)}
              </Label>
              <Select
                value={config.timer.toString()}
                onValueChange={(value) =>
                  setConfig({ ...config, timer: parseInt(value) as 0 | 10 | 20 | 30 })
                }
              >
                <SelectTrigger id="timer" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">{t('timerOff', language)}</SelectItem>
                  <SelectItem value="10">10 {t('seconds', language)}</SelectItem>
                  <SelectItem value="20">20 {t('seconds', language)}</SelectItem>
                  <SelectItem value="30">30 {t('seconds', language)}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Negative Marking */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <Label htmlFor="negative" className="text-base font-medium cursor-pointer">
                {t('negativeMarking', language)}
              </Label>
              <Switch
                id="negative"
                checked={config.negativeMarkingEnabled}
                onCheckedChange={(checked) =>
                  setConfig({ ...config, negativeMarkingEnabled: checked })
                }
              />
            </div>
          </div>
        </Card>

        {/* Start Button */}
        <Button
          onClick={startQuiz}
          size="lg"
          className="w-full gradient-primary shadow-lg hover:shadow-glow transition-smooth text-lg h-14 group"
        >
          {t('startQuiz', language)}
          <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
        </Button>
      </div>
    </div>
  );
};

export default Home;
