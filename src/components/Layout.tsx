import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Home, Trophy, Settings } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language } = useApp();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl gradient-primary shadow-glow">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-smooth">
                  {t('appName', language)}
                </h1>
                <p className="text-xs text-muted-foreground">{t('tagline', language)}</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <nav className="bg-card border-t border-border shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <Link
              to="/"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-smooth ${
                isActive('/')
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Home className="h-5 w-5" />
              <span className="text-xs font-medium">{t('home', language)}</span>
            </Link>

            <Link
              to="/leaderboard"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-smooth ${
                isActive('/leaderboard')
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Trophy className="h-5 w-5" />
              <span className="text-xs font-medium">{t('leaderboard', language)}</span>
            </Link>

            <Link
              to="/settings"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-smooth ${
                isActive('/settings')
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span className="text-xs font-medium">{t('settings', language)}</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
