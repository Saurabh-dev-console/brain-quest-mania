import React, { useState } from 'react';
import { Settings as SettingsIcon, Sun, Moon, Monitor, Globe, Volume2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { resetAllData } from '@/lib/storage';
import { t } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

export const Settings: React.FC = () => {
  const { settings, updateSettings, language, refreshHistory } = useApp();
  const [showResetDialog, setShowResetDialog] = useState(false);

  const handleReset = () => {
    resetAllData();
    refreshHistory();
    setShowResetDialog(false);
    window.location.reload();
  };

  const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  };

  const ThemeIcon = themeIcons[settings.theme];

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl gradient-primary shadow-glow">
            <SettingsIcon className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('settings', language)}</h1>
            <p className="text-muted-foreground">Customize your experience</p>
          </div>
        </div>

        {/* Theme */}
        <Card className="p-6 gradient-card shadow-md">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <ThemeIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <Label className="text-base font-semibold">{t('theme', language)}</Label>
                <p className="text-sm text-muted-foreground">Choose your visual preference</p>
              </div>
            </div>
            <Select
              value={settings.theme}
              onValueChange={(value: 'light' | 'dark' | 'system') =>
                updateSettings({ theme: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    {t('light', language)}
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    {t('dark', language)}
                  </div>
                </SelectItem>
                <SelectItem value="system">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    {t('system', language)}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Language */}
        <Card className="p-6 gradient-card shadow-md">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Globe className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1">
                <Label className="text-base font-semibold">{t('language', language)}</Label>
                <p className="text-sm text-muted-foreground">Select your preferred language</p>
              </div>
            </div>
            <Select
              value={settings.language}
              onValueChange={(value: 'en' | 'hi') =>
                updateSettings({ language: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{t('english', language)}</SelectItem>
                <SelectItem value="hi">{t('hindi', language)}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Sound */}
        <Card className="p-6 gradient-card shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Volume2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <Label htmlFor="sound" className="text-base font-semibold cursor-pointer">
                  {t('sound', language)}
                </Label>
                <p className="text-sm text-muted-foreground">Enable audio feedback</p>
              </div>
            </div>
            <Switch
              id="sound"
              checked={settings.soundEnabled}
              onCheckedChange={(checked) => updateSettings({ soundEnabled: checked })}
            />
          </div>
        </Card>

        {/* Reset Data */}
        <Card className="p-6 bg-destructive/5 border-destructive/20">
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold text-destructive">
                {t('resetData', language)}
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Clear all quiz history and reset settings
              </p>
            </div>
            <Button
              onClick={() => setShowResetDialog(true)}
              variant="destructive"
              className="w-full"
            >
              {t('resetData', language)}
            </Button>
          </div>
        </Card>
      </div>

      {/* Reset Dialog */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('resetData', language)}</AlertDialogTitle>
            <AlertDialogDescription>{t('confirmReset', language)}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel', language)}</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset}>{t('resetData', language)}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;
