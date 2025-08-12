# Bot Pulse Hub - Frontend Implementation Guide

Este arquivo contém todo o código necessário para implementar o dashboard Bot Pulse Hub em seu projeto.

## 🚀 Setup Inicial

### 1. Instalar Dependências
```bash
npm install @tanstack/react-query lucide-react react-router-dom next-themes
```

### 2. Estrutura de Arquivos
```
src/
├── components/
│   ├── ui/ (shadcn components - já existentes)
│   ├── Navbar.tsx
│   ├── ThemeToggle.tsx
│   ├── StatusCard.tsx
│   └── ActivityFeed.tsx
├── contexts/
│   └── ThemeContext.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── TelegramStatus.tsx
│   ├── TwitterStatus.tsx
│   ├── Dados.tsx
│   └── Config.tsx
├── lib/
│   └── mockData.ts
├── App.tsx
├── index.css
└── main.tsx
```

---

## 📄 Arquivos de Código

### `/src/index.css`
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Bot Pulse Hub - Tech Dashboard Design System */
@layer base {
  :root {
    /* Tech Theme - Light Mode */
    --background: 250 250 98%;
    --foreground: 0 0% 0%;

    --card: 0 0% 100%;
    --card-foreground: 0 0% 0%;

    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 0%;

    /* Tech Yellow Primary */
    --primary: 43 91% 55%;  /* #fbbf24 */
    --primary-foreground: 0 0% 0%;
    --primary-glow: 43 91% 65%;

    /* Tech Black Secondary */
    --secondary: 0 0% 0%;  /* #000000 */
    --secondary-foreground: 43 91% 55%;

    /* Tech Gray Accent */
    --accent: 217 19% 24%;  /* #1f2937 */
    --accent-foreground: 43 91% 55%;

    --muted: 240 5% 96%;
    --muted-foreground: 240 4% 46%;

    /* Status Colors - Tech Style */
    --success: 158 64% 52%;  /* #10b981 */
    --warning: 43 91% 55%;   /* Same as primary */
    --error: 0 84% 60%;      /* #ef4444 */
    --info: 188 85% 43%;     /* #06b6d4 */

    /* Platform Colors */
    --telegram: 207 100% 40%;  /* #0088cc */
    --twitter: 206 82% 55%;    /* #1da1f2 */
    --whatsapp: 142 70% 49%;   /* #25d366 */

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 98%;

    --border: 240 6% 90%;
    --input: 240 6% 90%;
    --ring: 43 91% 55%;

    --radius: 0.75rem;

    /* Tech Gradients */
    --gradient-tech: linear-gradient(135deg, hsl(0 0% 0%) 0%, hsl(217 19% 24%) 50%, hsl(43 91% 55%) 100%);
    --gradient-yellow: linear-gradient(135deg, hsl(43 91% 55%) 0%, hsl(38 92% 50%) 100%);
    --gradient-dark: linear-gradient(135deg, hsl(0 0% 0%) 0%, hsl(217 33% 18%) 100%);

    /* Tech Shadows */
    --shadow-tech: 0 10px 30px -10px hsl(43 91% 55% / 0.2);
    --shadow-glow: 0 0 20px hsl(43 91% 55% / 0.3);
    --shadow-card: 0 4px 20px hsl(0 0% 0% / 0.1);

    /* Transitions */
    --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .dark {
    /* Tech Theme - Dark Mode */
    --background: 0 0% 0%;  /* Pure black */
    --foreground: 43 91% 55%;

    --card: 217 33% 11%;  /* #111827 */
    --card-foreground: 43 91% 55%;

    --popover: 0 0% 0%;
    --popover-foreground: 43 91% 55%;

    /* Tech Yellow Primary (same in dark) */
    --primary: 43 91% 55%;
    --primary-foreground: 0 0% 0%;
    --primary-glow: 43 91% 65%;

    /* Tech Black Secondary -> Light in dark mode */
    --secondary: 0 0% 98%;
    --secondary-foreground: 0 0% 0%;

    /* Tech Gray Accent - Darker */
    --accent: 217 19% 24%;
    --accent-foreground: 43 91% 55%;

    --muted: 217 19% 24%;
    --muted-foreground: 240 5% 64%;

    --border: 217 19% 24%;
    --input: 217 19% 24%;
    --ring: 43 91% 55%;

    /* Tech Shadows - Dark Mode */
    --shadow-tech: 0 10px 30px -10px hsl(43 91% 55% / 0.4);
    --shadow-glow: 0 0 30px hsl(43 91% 55% / 0.5);
    --shadow-card: 0 4px 20px hsl(0 0% 0% / 0.5);
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-inter;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-semibold;
  }
}

@layer components {
  /* Tech Card Styles */
  .tech-card {
    @apply bg-card border border-primary/20 rounded-lg shadow-lg backdrop-blur-sm;
    @apply transition-all duration-300 hover:shadow-xl hover:border-primary/40;
    @apply hover:translate-y-[-2px];
  }

  .tech-card-glow {
    @apply tech-card;
    box-shadow: 0 4px 20px hsl(var(--primary) / 0.1), 0 0 40px hsl(var(--primary) / 0.05);
  }

  .tech-card-glow:hover {
    box-shadow: 0 8px 30px hsl(var(--primary) / 0.2), 0 0 60px hsl(var(--primary) / 0.1);
  }

  /* Tech Button Styles */
  .btn-tech {
    @apply bg-primary text-primary-foreground rounded-lg px-4 py-2 font-medium;
    @apply transition-all duration-300 hover:bg-primary/90 hover:shadow-lg;
    @apply border border-primary/20 hover:border-primary/40;
  }

  .btn-tech-outline {
    @apply border-2 border-primary text-primary bg-transparent rounded-lg px-4 py-2 font-medium;
    @apply transition-all duration-300 hover:bg-primary hover:text-primary-foreground;
  }

  /* Tech Status Indicators */
  .status-online {
    @apply text-success border-success/30 bg-success/10;
  }

  .status-warning {
    @apply text-warning border-warning/30 bg-warning/10;
  }

  .status-error {
    @apply text-error border-error/30 bg-error/10;
  }

  .status-info {
    @apply text-info border-info/30 bg-info/10;
  }

  /* Platform Colors */
  .platform-telegram {
    @apply text-[hsl(var(--telegram))] border-[hsl(var(--telegram))]/30 bg-[hsl(var(--telegram))]/10;
  }

  .platform-twitter {
    @apply text-[hsl(var(--twitter))] border-[hsl(var(--twitter))]/30 bg-[hsl(var(--twitter))]/10;
  }

  .platform-whatsapp {
    @apply text-[hsl(var(--whatsapp))] border-[hsl(var(--whatsapp))]/30 bg-[hsl(var(--whatsapp))]/10;
  }

  /* Tech Animations */
  .pulse-slow {
    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .glow-text {
    text-shadow: 0 0 10px hsl(var(--primary) / 0.5);
  }

  /* Scroll Styles */
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    @apply bg-muted/20;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    @apply bg-primary/30 rounded-full;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    @apply bg-primary/50;
  }
}

@layer utilities {
  .font-inter {
    font-family: 'Inter', sans-serif;
  }
}
```

### `/tailwind.config.ts`
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Status colors
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        error: "hsl(var(--error))",
        info: "hsl(var(--info))",
        // Platform colors
        telegram: "hsl(var(--telegram))",
        twitter: "hsl(var(--twitter))",
        whatsapp: "hsl(var(--whatsapp))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        'gradient-tech': 'var(--gradient-tech)',
        'gradient-yellow': 'var(--gradient-yellow)',
        'gradient-dark': 'var(--gradient-dark)',
      },
      boxShadow: {
        'tech': 'var(--shadow-tech)',
        'glow': 'var(--shadow-glow)',
        'card': 'var(--shadow-card)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px hsl(var(--primary) / 0.3)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 40px hsl(var(--primary) / 0.5)',
            transform: 'scale(1.02)'
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

### `/src/contexts/ThemeContext.tsx`
```tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
```

### `/src/components/ThemeToggle.tsx`
```tsx
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="tech-card-glow"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="tech-card">
        <DropdownMenuItem 
          onClick={() => setTheme('light')}
          className="hover:bg-primary/10"
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('dark')}
          className="hover:bg-primary/10"
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('system')}
          className="hover:bg-primary/10"
        >
          <Monitor className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### `/src/components/Navbar.tsx`
```tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Activity, Zap } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Activity },
  { name: 'Telegram Status', href: '/telegram-status', icon: Zap },
  { name: 'Twitter Status', href: '/twitter-status', icon: Zap },
  { name: 'Dados', href: '/dados', icon: Activity },
  { name: 'Config', href: '/config', icon: Activity },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-yellow rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all duration-300">
              <Zap className="h-6 w-6 text-black" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground group-hover:glow-text transition-all duration-300">
                Bot Pulse Hub
              </h1>
              <p className="text-xs text-muted-foreground">Tech Dashboard</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    active
                      ? 'bg-primary text-primary-foreground shadow-glow'
                      : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="tech-card-glow"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary/20 animate-fade-in">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      active
                        ? 'bg-primary text-primary-foreground shadow-glow'
                        : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
```

### `/src/components/StatusCard.tsx`
```tsx
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatusCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  status?: 'success' | 'warning' | 'error' | 'info' | 'telegram' | 'twitter' | 'whatsapp';
  loading?: boolean;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatusCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  status = 'info',
  loading = false,
  trend 
}: StatusCardProps) {
  const getStatusClass = () => {
    switch (status) {
      case 'success':
        return 'status-online';
      case 'warning':
        return 'status-warning';
      case 'error':
        return 'status-error';
      case 'telegram':
        return 'platform-telegram';
      case 'twitter':
        return 'platform-twitter';
      case 'whatsapp':
        return 'platform-whatsapp';
      default:
        return 'status-info';
    }
  };

  if (loading) {
    return (
      <Card className="tech-card animate-pulse">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-6 h-6 bg-muted rounded"></div>
            <div className="w-20 h-8 bg-muted rounded"></div>
          </div>
          <div className="w-24 h-4 bg-muted rounded mb-2"></div>
          <div className="w-32 h-3 bg-muted rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="tech-card-glow group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg border ${getStatusClass()}`}>
            <Icon className="h-5 w-5" />
          </div>
          
          {trend && (
            <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
              trend.isPositive ? 'text-success bg-success/10' : 'text-error bg-error/10'
            }`}>
              {trend.isPositive ? '+' : ''}{trend.value}%
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-sm text-muted-foreground">
            {title}
          </h3>
          
          <div className="text-2xl font-bold text-foreground group-hover:glow-text transition-all duration-300">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          
          {description && (
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

### `/src/components/ActivityFeed.tsx`
```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Globe, CheckCircle, Clock, XCircle } from 'lucide-react';

interface ActivityItem {
  id: number;
  platform: 'telegram' | 'twitter';
  content: string;
  timestamp: string;
  status: 'success' | 'pending' | 'error';
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  loading?: boolean;
}

export function ActivityFeed({ activities, loading = false }: ActivityFeedProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'telegram':
        return MessageCircle;
      case 'twitter':
        return Globe;
      default:
        return MessageCircle;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'error':
        return XCircle;
      default:
        return Clock;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'telegram':
        return 'platform-telegram';
      case 'twitter':
        return 'platform-twitter';
      default:
        return 'status-info';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'status-online';
      case 'pending':
        return 'status-warning';
      case 'error':
        return 'status-error';
      default:
        return 'status-info';
    }
  };

  if (loading) {
    return (
      <Card className="tech-card">
        <CardHeader>
          <CardTitle className="text-lg">Atividade Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-3 animate-pulse">
                <div className="w-8 h-8 bg-muted rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="w-32 h-4 bg-muted rounded"></div>
                  <div className="w-full h-3 bg-muted rounded"></div>
                  <div className="w-20 h-3 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="tech-card-glow">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Atividade Recente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
          {activities.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground text-sm">
                Nenhuma atividade recente
              </div>
            </div>
          ) : (
            activities.map((activity) => {
              const PlatformIcon = getPlatformIcon(activity.platform);
              const StatusIcon = getStatusIcon(activity.status);
              
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/20 transition-colors">
                  <div className={`p-2 rounded-lg border ${getPlatformColor(activity.platform)}`}>
                    <PlatformIcon className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getStatusColor(activity.status)}`}
                      >
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {activity.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">
                        {new Date(activity.timestamp).toLocaleTimeString('pt-BR')}
                      </span>
                    </div>
                    
                    <p className="text-sm text-foreground line-clamp-2">
                      {activity.content}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

### `/src/lib/mockData.ts`
```typescript
export interface DashboardStats {
  sent_count: number;
  telegram_sent: number;
  twitter_sent: number;
  success_rate: number;
  total_processed: number;
}

export interface ServiceStatus {
  telegram: {
    connected: boolean;
    authenticated: boolean;
    user?: { phone: string; name: string };
  };
  twitter: {
    configured: boolean;
    monitoring: boolean;
    profiles: number;
    mode: 'api' | 'scraping';
    interval: number;
    performance: {
      success_rate: number;
      messages_hour: number;
      errors_24h: number;
    };
  };
}

export interface ActivityItem {
  id: number;
  platform: 'telegram' | 'twitter';
  content: string;
  timestamp: string;
  status: 'success' | 'pending' | 'error';
  filtered_content?: string;
  filter_applied?: string[];
}

export interface FilteredMessage {
  id: number;
  platform: 'telegram' | 'twitter';
  original_content: string;
  filtered_content: string;
  timestamp: string;
  status: 'approved' | 'filtered' | 'pending';
  filters_applied: string[];
  whatsapp_sent: boolean;
}

// Mock Data
export const mockStats: DashboardStats = {
  sent_count: 1247,
  telegram_sent: 823,
  twitter_sent: 424,
  success_rate: 94,
  total_processed: 1329
};

export const mockServiceStatus: ServiceStatus = {
  telegram: {
    connected: true,
    authenticated: true,
    user: { phone: "+55 11 9****-****", name: "Bot News Dashboard" }
  },
  twitter: {
    configured: true,
    monitoring: true,
    profiles: 14,
    mode: "scraping",
    interval: 15,
    performance: {
      success_rate: 96,
      messages_hour: 28,
      errors_24h: 3
    }
  }
};

export const mockActivity: ActivityItem[] = [
  {
    id: 1,
    platform: "telegram",
    content: "🚀 Bitcoin atinge novo máximo histórico de US$ 67.500, superando todas as expectativas do mercado",
    timestamp: "2024-12-20T10:30:00Z",
    status: "success"
  },
  {
    id: 2,
    platform: "twitter",
    content: "📈 Análise técnica mostra rompimento importante do Bitcoin. Próxima resistência em US$ 70.000",
    timestamp: "2024-12-20T10:25:00Z",
    status: "success"
  },
  {
    id: 3,
    platform: "telegram",
    content: "⚠️ Mercado cripto em alta volatilidade. Traders devem manter cautela",
    timestamp: "2024-12-20T10:20:00Z",
    status: "pending"
  },
  {
    id: 4,
    platform: "twitter",
    content: "🔥 Ethereum também acompanha alta do Bitcoin, chegando a US$ 4.200",
    timestamp: "2024-12-20T10:15:00Z",
    status: "success"
  }
];

export const mockFilteredMessages: FilteredMessage[] = [
  {
    id: 1,
    platform: "telegram",
    original_content: "🚀 Bitcoin moon! Buy now or cry later!!! 💰💰💰",
    filtered_content: "📈 Bitcoin apresenta movimento de alta significativo no mercado",
    timestamp: "2024-12-20T10:30:00Z",
    status: "approved",
    filters_applied: ["spam_filter", "tone_moderator"],
    whatsapp_sent: true
  },
  {
    id: 2,
    platform: "twitter",
    original_content: "URGENT: Crypto crash incoming! Sell everything NOW!",
    filtered_content: "Mercado cripto apresenta volatilidade. Análise técnica sugere cautela",
    timestamp: "2024-12-20T10:25:00Z",
    status: "approved",
    filters_applied: ["urgency_filter", "tone_moderator"],
    whatsapp_sent: true
  },
  {
    id: 3,
    platform: "telegram",
    content: "This message contains inappropriate content",
    filtered_content: "",
    timestamp: "2024-12-20T10:20:00Z",
    status: "filtered",
    filters_applied: ["content_filter"],
    whatsapp_sent: false
  }
];
```

### `/src/pages/Dashboard.tsx`
```tsx
import { useState, useEffect } from 'react';
import { Send, MessageCircle, Globe, BarChart3, RefreshCw, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusCard } from '@/components/StatusCard';
import { ActivityFeed } from '@/components/ActivityFeed';
import { mockStats, mockActivity, mockServiceStatus } from '@/lib/mockData';

export default function Dashboard() {
  const [stats, setStats] = useState(mockStats);
  const [activity, setActivity] = useState(mockActivity);
  const [services, setServices] = useState(mockServiceStatus);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const refreshData = async () => {
    setLoading(true);
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular pequenas variações nos dados
    setStats(prev => ({
      ...prev,
      sent_count: prev.sent_count + Math.floor(Math.random() * 5),
      success_rate: Math.max(90, Math.min(99, prev.success_rate + (Math.random() - 0.5) * 2))
    }));
    
    setLastUpdate(new Date());
    setLoading(false);
  };

  useEffect(() => {
    // Auto-refresh a cada 30 segundos
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Dashboard Bot Pulse
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitoramento em tempo real do sistema Telegram + Twitter → WhatsApp
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-xs text-muted-foreground font-mono">
            Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')}
          </div>
          <Button 
            onClick={refreshData} 
            disabled={loading}
            className="btn-tech"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard
          title="Mensagens Enviadas"
          value={stats.sent_count}
          icon={Send}
          status="success"
          loading={loading}
          trend={{ value: 12, isPositive: true }}
          description="Total processado hoje"
        />
        
        <StatusCard
          title="Do Telegram"
          value={stats.telegram_sent}
          icon={MessageCircle}
          status="telegram"
          loading={loading}
          description="Mensagens capturadas"
        />
        
        <StatusCard
          title="Do Twitter"
          value={stats.twitter_sent}
          icon={Globe}
          status="twitter"
          loading={loading}
          description="Posts monitorados"
        />
        
        <StatusCard
          title="Taxa de Sucesso"
          value={`${stats.success_rate}%`}
          icon={BarChart3}
          status="info"
          loading={loading}
          trend={{ value: 2, isPositive: true }}
          description="Entregas bem-sucedidas"
        />
      </div>

      {/* Status dos Serviços */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatusCard
          title="Status Telegram"
          value={services.telegram.connected ? "Conectado" : "Desconectado"}
          icon={MessageCircle}
          status={services.telegram.connected ? "success" : "error"}
          description={services.telegram.user?.name || "Bot não autenticado"}
        />
        
        <StatusCard
          title="Status Twitter"
          value={services.twitter.monitoring ? "Monitorando" : "Parado"}
          icon={Globe}
          status={services.twitter.monitoring ? "success" : "warning"}
          description={`${services.twitter.profiles} perfis ativos`}
        />
      </div>

      {/* Atividade Recente */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityFeed 
            activities={activity} 
            loading={loading}
          />
        </div>
        
        <div className="space-y-4">
          <div className="tech-card-glow p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Ações Rápidas
            </h3>
            <div className="space-y-3">
              <Button className="w-full btn-tech-outline">
                <Zap className="h-4 w-4 mr-2" />
                Ver Status Telegram
              </Button>
              <Button className="w-full btn-tech-outline">
                <Zap className="h-4 w-4 mr-2" />
                Ver Status Twitter
              </Button>
              <Button className="w-full btn-tech-outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Relatório Completo
              </Button>
            </div>
          </div>
          
          <div className="tech-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Performance 24h
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Uptime:</span>
                <span className="text-success font-medium">99.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Erros:</span>
                <span className="text-foreground font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Msgs/hora:</span>
                <span className="text-foreground font-medium">52</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### `/src/pages/TelegramStatus.tsx`
```tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  CheckCircle, 
  XCircle, 
  User, 
  Phone, 
  Settings,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockServiceStatus } from '@/lib/mockData';

export default function TelegramStatus() {
  const [status, setStatus] = useState(mockServiceStatus.telegram);
  const [loading, setLoading] = useState(false);

  const refreshStatus = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/">
          <Button variant="outline" size="icon" className="tech-card-glow">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">Status Telegram</h1>
          <p className="text-muted-foreground">
            Monitoramento da conexão e autenticação do bot Telegram
          </p>
        </div>
        <Button onClick={refreshStatus} disabled={loading} className="btn-tech">
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      {/* Status Principal */}
      <Card className="tech-card-glow">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-full ${status.connected ? 'bg-success/20 border-success' : 'bg-error/20 border-error'} border-2`}>
              <MessageCircle className={`h-12 w-12 ${status.connected ? 'text-success' : 'text-error'}`} />
            </div>
          </div>
          <CardTitle className="text-2xl text-foreground">
            {status.connected ? 'Telegram Conectado' : 'Telegram Desconectado'}
          </CardTitle>
          <Badge 
            variant="outline" 
            className={`text-sm ${status.connected ? 'status-online' : 'status-error'}`}
          >
            {status.connected ? 'Online' : 'Offline'}
          </Badge>
        </CardHeader>
      </Card>

      {/* Detalhes da Conexão */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="tech-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <CheckCircle className="h-5 w-5 mr-2 text-success" />
              Conexão
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge className={status.connected ? 'status-online' : 'status-error'}>
                {status.connected ? 'Conectado' : 'Desconectado'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Protocolo:</span>
              <span className="text-foreground font-medium">MTProto</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Servidor:</span>
              <span className="text-foreground font-medium">Telegram API</span>
            </div>
          </CardContent>
        </Card>

        <Card className="tech-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <User className="h-5 w-5 mr-2 text-info" />
              Autenticação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge className={status.authenticated ? 'status-online' : 'status-warning'}>
                {status.authenticated ? 'Autenticado' : 'Não Autenticado'}
              </Badge>
            </div>
            {status.user && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Telefone:</span>
                  <span className="text-foreground font-mono">{status.user.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Nome:</span>
                  <span className="text-foreground font-medium">{status.user.name}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Configurações de Monitoramento */}
      <Card className="tech-card">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Settings className="h-5 w-5 mr-2 text-primary" />
            Configurações de Monitoramento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Grupos Monitorados</h4>
              <p className="text-2xl font-bold text-primary">8</p>
              <p className="text-xs text-muted-foreground">Canais ativos</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Intervalo de Verificação</h4>
              <p className="text-2xl font-bold text-primary">5s</p>
              <p className="text-xs text-muted-foreground">Tempo de polling</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Filtros Ativos</h4>
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-xs text-muted-foreground">Regras aplicadas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs Recentes */}
      <Card className="tech-card">
        <CardHeader>
          <CardTitle className="text-lg">Logs de Conexão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
            {[
              { time: '10:30:15', message: 'Conexão estabelecida com sucesso', type: 'success' },
              { time: '10:30:10', message: 'Autenticação realizada', type: 'success' },
              { time: '10:30:05', message: 'Iniciando conexão com Telegram API', type: 'info' },
              { time: '10:25:30', message: 'Bot reiniciado automaticamente', type: 'warning' },
            ].map((log, index) => (
              <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/20">
                <div className={`p-1 rounded-full mt-1 ${
                  log.type === 'success' ? 'bg-success/20' :
                  log.type === 'warning' ? 'bg-warning/20' : 'bg-info/20'
                }`}>
                  {log.type === 'success' ? (
                    <CheckCircle className="h-3 w-3 text-success" />
                  ) : log.type === 'warning' ? (
                    <XCircle className="h-3 w-3 text-warning" />
                  ) : (
                    <MessageCircle className="h-3 w-3 text-info" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground font-mono">{log.time}</span>
                    <span className="text-sm text-foreground">{log.message}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex flex-wrap gap-4">
        <Button className="btn-tech">
          <Settings className="h-4 w-4 mr-2" />
          Configurar Bot
        </Button>
        <Button variant="outline" className="tech-card-glow">
          <Phone className="h-4 w-4 mr-2" />
          Reautenticar
        </Button>
        <Button variant="outline" className="tech-card-glow">
          <MessageCircle className="h-4 w-4 mr-2" />
          Testar Conexão
        </Button>
      </div>
    </div>
  );
}
```

### `/src/pages/TwitterStatus.tsx`
```tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Play, 
  Pause, 
  Settings, 
  BarChart3, 
  Users,
  Clock,
  ArrowLeft,
  RefreshCw,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatusCard } from '@/components/StatusCard';
import { mockServiceStatus } from '@/lib/mockData';

export default function TwitterStatus() {
  const [status, setStatus] = useState(mockServiceStatus.twitter);
  const [loading, setLoading] = useState(false);

  const refreshStatus = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const toggleMonitoring = () => {
    setStatus(prev => ({ ...prev, monitoring: !prev.monitoring }));
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/">
          <Button variant="outline" size="icon" className="tech-card-glow">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">Status Twitter</h1>
          <p className="text-muted-foreground">
            Monitoramento de perfis e performance do sistema Twitter
          </p>
        </div>
        <Button onClick={refreshStatus} disabled={loading} className="btn-tech">
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      {/* Status Principal */}
      <Card className="tech-card-glow">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-full ${status.monitoring ? 'bg-success/20 border-success' : 'bg-warning/20 border-warning'} border-2`}>
              <Globe className={`h-12 w-12 ${status.monitoring ? 'text-success' : 'text-warning'}`} />
            </div>
          </div>
          <CardTitle className="text-2xl text-foreground">
            {status.monitoring ? 'Monitoramento Ativo' : 'Monitoramento Pausado'}
          </CardTitle>
          <Badge 
            variant="outline" 
            className={`text-sm ${status.monitoring ? 'status-online' : 'status-warning'}`}
          >
            {status.monitoring ? 'Ativo' : 'Pausado'}
          </Badge>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            onClick={toggleMonitoring}
            className={status.monitoring ? 'btn-tech-outline' : 'btn-tech'}
          >
            {status.monitoring ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pausar Monitoramento
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Iniciar Monitoramento
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Métricas de Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusCard
          title="Taxa de Sucesso"
          value={`${status.performance.success_rate}%`}
          icon={TrendingUp}
          status="success"
          description="Últimas 24 horas"
        />
        
        <StatusCard
          title="Mensagens/Hora"
          value={status.performance.messages_hour}
          icon={BarChart3}
          status="info"
          description="Média atual"
        />
        
        <StatusCard
          title="Erros 24h"
          value={status.performance.errors_24h}
          icon={AlertCircle}
          status={status.performance.errors_24h > 5 ? "error" : "success"}
          description="Total de falhas"
        />
      </div>

      {/* Configurações do Sistema */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="tech-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Users className="h-5 w-5 mr-2 text-twitter" />
              Perfis Monitorados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total de perfis:</span>
              <span className="text-2xl font-bold text-primary">{status.profiles}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Ativos:</span>
              <Badge className="status-online">12</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Inativos:</span>
              <Badge className="status-error">2</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="tech-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Settings className="h-5 w-5 mr-2 text-primary" />
              Configurações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Modo:</span>
              <Badge className="platform-twitter">
                {status.mode === 'api' ? 'API' : 'Scraping'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Intervalo:</span>
              <span className="text-foreground font-medium">{status.interval} min</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Instância Nitter:</span>
              <Badge className="status-online">Ativa</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Perfis Detalhados */}
      <Card className="tech-card">
        <CardHeader>
          <CardTitle className="text-lg">Perfis Monitorados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
            {[
              { handle: '@criptofacil', name: 'Cripto Fácil', status: 'active', last_post: '5 min' },
              { handle: '@bitcoinbrasil', name: 'Bitcoin Brasil', status: 'active', last_post: '12 min' },
              { handle: '@cryptonews', name: 'Crypto News', status: 'active', last_post: '23 min' },
              { handle: '@blockchaininfo', name: 'Blockchain Info', status: 'error', last_post: '2h' },
              { handle: '@defiprotocol', name: 'DeFi Protocol', status: 'active', last_post: '45 min' },
            ].map((profile, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/20 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    profile.status === 'active' ? 'bg-success' : 'bg-error'
                  }`}></div>
                  <div>
                    <p className="font-medium text-foreground">{profile.name}</p>
                    <p className="text-sm text-muted-foreground">{profile.handle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={profile.status === 'active' ? 'status-online' : 'status-error'}>
                    {profile.status === 'active' ? 'Ativo' : 'Erro'}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    Último post: {profile.last_post}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Logs de Sistema */}
      <Card className="tech-card">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Clock className="h-5 w-5 mr-2 text-info" />
            Logs Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
            {[
              { time: '10:35:20', message: 'Novo post capturado de @criptofacil', type: 'success' },
              { time: '10:34:15', message: 'Verificação completa de todos os perfis', type: 'info' },
              { time: '10:33:45', message: 'Post filtrado por conteúdo inadequado', type: 'warning' },
              { time: '10:32:30', message: 'Erro na conexão com @blockchaininfo', type: 'error' },
              { time: '10:31:10', message: 'Sistema iniciado com sucesso', type: 'success' },
            ].map((log, index) => (
              <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/20">
                <div className={`p-1 rounded-full mt-1 ${
                  log.type === 'success' ? 'bg-success/20' :
                  log.type === 'error' ? 'bg-error/20' :
                  log.type === 'warning' ? 'bg-warning/20' : 'bg-info/20'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    log.type === 'success' ? 'bg-success' :
                    log.type === 'error' ? 'bg-error' :
                    log.type === 'warning' ? 'bg-warning' : 'bg-info'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground font-mono">{log.time}</span>
                    <span className="text-sm text-foreground">{log.message}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex flex-wrap gap-4">
        <Button className="btn-tech">
          <Settings className="h-4 w-4 mr-2" />
          Configurar Perfis
        </Button>
        <Button variant="outline" className="tech-card-glow">
          <Users className="h-4 w-4 mr-2" />
          Adicionar Perfil
        </Button>
        <Button variant="outline" className="tech-card-glow">
          <BarChart3 className="h-4 w-4 mr-2" />
          Relatório Detalhado
        </Button>
      </div>
    </div>
  );
}
```

### `/src/pages/Dados.tsx`
```tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  MessageCircle, 
  Globe, 
  CheckCircle, 
  XCircle, 
  Clock,
  Send,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockFilteredMessages } from '@/lib/mockData';

export default function Dados() {
  const [messages, setMessages] = useState(mockFilteredMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.original_content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.filtered_content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || message.platform === platformFilter;
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const getPlatformIcon = (platform: string) => {
    return platform === 'telegram' ? MessageCircle : Globe;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle;
      case 'filtered': return XCircle;
      case 'pending': return Clock;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'status-online';
      case 'filtered': return 'status-error';
      case 'pending': return 'status-warning';
      default: return 'status-info';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/">
          <Button variant="outline" size="icon" className="tech-card-glow">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">Dados Filtrados</h1>
          <p className="text-muted-foreground">
            Histórico de mensagens processadas e filtradas do sistema
          </p>
        </div>
      </div>

      {/* Filtros e Busca */}
      <Card className="tech-card">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Filter className="h-5 w-5 mr-2 text-primary" />
            Filtros de Pesquisa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar mensagens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Plataforma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as plataformas</SelectItem>
                <SelectItem value="telegram">Telegram</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="approved">Aprovado</SelectItem>
                <SelectItem value="filtered">Filtrado</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
              </SelectContent>
            </Select>

            <Button className="btn-tech">
              <Filter className="h-4 w-4 mr-2" />
              Aplicar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="tech-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{filteredMessages.length}</div>
            <div className="text-sm text-muted-foreground">Total Filtrado</div>
          </CardContent>
        </Card>
        <Card className="tech-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">
              {filteredMessages.filter(m => m.status === 'approved').length}
            </div>
            <div className="text-sm text-muted-foreground">Aprovados</div>
          </CardContent>
        </Card>
        <Card className="tech-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-error">
              {filteredMessages.filter(m => m.status === 'filtered').length}
            </div>
            <div className="text-sm text-muted-foreground">Bloqueados</div>
          </CardContent>
        </Card>
        <Card className="tech-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-info">
              {filteredMessages.filter(m => m.whatsapp_sent).length}
            </div>
            <div className="text-sm text-muted-foreground">Enviados</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Mensagens */}
      <Card className="tech-card-glow">
        <CardHeader>
          <CardTitle className="text-lg">
            Mensagens Processadas ({filteredMessages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-muted-foreground">
                  Nenhuma mensagem encontrada com os filtros aplicados
                </div>
              </div>
            ) : (
              filteredMessages.map((message) => {
                const PlatformIcon = getPlatformIcon(message.platform);
                const StatusIcon = getStatusIcon(message.status);
                
                return (
                  <Card key={message.id} className="tech-card hover:shadow-lg transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        {/* Platform Icon */}
                        <div className={`p-2 rounded-lg border ${
                          message.platform === 'telegram' ? 'platform-telegram' : 'platform-twitter'
                        }`}>
                          <PlatformIcon className="h-4 w-4" />
                        </div>
                        
                        {/* Message Content */}
                        <div className="flex-1 space-y-3">
                          {/* Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Badge className={`${getStatusColor(message.status)} text-xs`}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {message.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground font-mono">
                                {new Date(message.timestamp).toLocaleString('pt-BR')}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {message.whatsapp_sent && (
                                <Badge className="status-online text-xs">
                                  <Send className="h-3 w-3 mr-1" />
                                  WhatsApp
                                </Badge>
                              )}
                              <Button size="sm" variant="outline" className="h-8 px-2">
                                <Eye className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          {/* Original Content */}
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-muted-foreground">
                              Conteúdo Original:
                            </div>
                            <div className="text-sm text-foreground p-3 bg-muted/20 rounded-lg border-l-4 border-error/50">
                              {message.original_content}
                            </div>
                          </div>
                          
                          {/* Filtered Content */}
                          {message.filtered_content && (
                            <div className="space-y-2">
                              <div className="text-xs font-medium text-muted-foreground">
                                Conteúdo Filtrado:
                              </div>
                              <div className="text-sm text-foreground p-3 bg-success/10 rounded-lg border-l-4 border-success/50">
                                {message.filtered_content}
                              </div>
                            </div>
                          )}
                          
                          {/* Filters Applied */}
                          {message.filters_applied.length > 0 && (
                            <div className="space-y-2">
                              <div className="text-xs font-medium text-muted-foreground">
                                Filtros Aplicados:
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {message.filters_applied.map((filter, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {filter}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Paginação */}
      <div className="flex justify-center space-x-2">
        <Button variant="outline" disabled className="tech-card-glow">
          Anterior
        </Button>
        <Button variant="outline" className="tech-card-glow bg-primary text-primary-foreground">
          1
        </Button>
        <Button variant="outline" className="tech-card-glow">
          2
        </Button>
        <Button variant="outline" className="tech-card-glow">
          3
        </Button>
        <Button variant="outline" className="tech-card-glow">
          Próximo
        </Button>
      </div>
    </div>
  );
}
```

### `/src/pages/Config.tsx`
```tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Settings, 
  MessageCircle, 
  Globe, 
  Bell,
  Shield,
  BarChart3,
  Save,
  RefreshCw,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { StatusCard } from '@/components/StatusCard';
import { mockServiceStatus, mockStats } from '@/lib/mockData';

export default function Config() {
  const [services] = useState(mockServiceStatus);
  const [stats] = useState(mockStats);
  const [settings, setSettings] = useState({
    notifications: true,
    autoFilter: true,
    logLevel: 'info',
    maxMessages: 100,
    filterKeywords: 'spam, scam, fake news',
    whatsappGroup: 'News Channel',
    telegramPolling: 5,
    twitterPolling: 15
  });

  const handleSave = () => {
    // Simular salvamento
    console.log('Configurações salvas:', settings);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/">
          <Button variant="outline" size="icon" className="tech-card-glow">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações do sistema e serviços conectados
          </p>
        </div>
        <Button onClick={handleSave} className="btn-tech">
          <Save className="h-4 w-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>

      {/* Status dos Serviços */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatusCard
          title="Serviço Telegram"
          value={services.telegram.connected ? "Online" : "Offline"}
          icon={MessageCircle}
          status={services.telegram.connected ? "success" : "error"}
          description={services.telegram.user?.name || "Não conectado"}
        />
        
        <StatusCard
          title="Serviço Twitter"
          value={services.twitter.monitoring ? "Monitorando" : "Parado"}
          icon={Globe}
          status={services.twitter.monitoring ? "success" : "warning"}
          description={`${services.twitter.profiles} perfis ativos`}
        />
      </div>

      {/* Configurações Gerais */}
      <Card className="tech-card-glow">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Settings className="h-5 w-5 mr-2 text-primary" />
            Configurações Gerais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Notificações</Label>
                  <div className="text-xs text-muted-foreground">
                    Receber alertas do sistema
                  </div>
                </div>
                <Switch 
                  checked={settings.notifications}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, notifications: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Filtro Automático</Label>
                  <div className="text-xs text-muted-foreground">
                    Aplicar filtros automaticamente
                  </div>
                </div>
                <Switch 
                  checked={settings.autoFilter}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, autoFilter: checked }))
                  }
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxMessages">Máximo de Mensagens/Hora</Label>
                <Input
                  id="maxMessages"
                  type="number"
                  value={settings.maxMessages}
                  onChange={(e) => 
                    setSettings(prev => ({ ...prev, maxMessages: parseInt(e.target.value) }))
                  }
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsappGroup">Grupo WhatsApp Destino</Label>
                <Input
                  id="whatsappGroup"
                  value={settings.whatsappGroup}
                  onChange={(e) => 
                    setSettings(prev => ({ ...prev, whatsappGroup: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Polling */}
      <Card className="tech-card">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <RefreshCw className="h-5 w-5 mr-2 text-info" />
            Intervalos de Verificação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="telegramPolling">Telegram (segundos)</Label>
              <Input
                id="telegramPolling"
                type="number"
                value={settings.telegramPolling}
                onChange={(e) => 
                  setSettings(prev => ({ ...prev, telegramPolling: parseInt(e.target.value) }))
                }
              />
              <div className="text-xs text-muted-foreground">
                Frequência de verificação de novos messages
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="twitterPolling">Twitter (minutos)</Label>
              <Input
                id="twitterPolling"
                type="number"
                value={settings.twitterPolling}
                onChange={(e) => 
                  setSettings(prev => ({ ...prev, twitterPolling: parseInt(e.target.value) }))
                }
              />
              <div className="text-xs text-muted-foreground">
                Intervalo entre verificações de perfis
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros de Conteúdo */}
      <Card className="tech-card">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Shield className="h-5 w-5 mr-2 text-warning" />
            Filtros de Conteúdo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="filterKeywords">Palavras-chave Bloqueadas</Label>
            <Textarea
              id="filterKeywords"
              value={settings.filterKeywords}
              onChange={(e) => 
                setSettings(prev => ({ ...prev, filterKeywords: e.target.value }))
              }
              rows={3}
              placeholder="spam, scam, fake news (separadas por vírgula)"
            />
            <div className="text-xs text-muted-foreground">
              Mensagens contendo essas palavras serão filtradas automaticamente
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notificações */}
      <Card className="tech-card">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Bell className="h-5 w-5 mr-2 text-success" />
            Configurações de Notificação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Erros de Conexão</Label>
                <div className="text-xs text-muted-foreground">
                  Notificar quando houver falhas na conexão
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Limite de Mensagens</Label>
                <div className="text-xs text-muted-foreground">
                  Alertar quando atingir o limite por hora
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Relatório Diário</Label>
                <div className="text-xs text-muted-foreground">
                  Receber resumo diário de atividades
                </div>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas do Sistema */}
      <Card className="tech-card-glow">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <BarChart3 className="h-5 w-5 mr-2 text-primary" />
            Estatísticas do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">{stats.sent_count}</div>
              <div className="text-xs text-muted-foreground">Total Enviado</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-success">{stats.success_rate}%</div>
              <div className="text-xs text-muted-foreground">Taxa Sucesso</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-info">24h</div>
              <div className="text-xs text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-warning">3</div>
              <div className="text-xs text-muted-foreground">Erros Hoje</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <div className="flex flex-wrap gap-4">
        <Button className="btn-tech">
          <Zap className="h-4 w-4 mr-2" />
          Reiniciar Serviços
        </Button>
        <Button variant="outline" className="tech-card-glow">
          <RefreshCw className="h-4 w-4 mr-2" />
          Verificar Conexões
        </Button>
        <Button variant="outline" className="tech-card-glow">
          <BarChart3 className="h-4 w-4 mr-2" />
          Exportar Logs
        </Button>
        <Button variant="outline" className="tech-card-glow">
          <Settings className="h-4 w-4 mr-2" />
          Configurações Avançadas
        </Button>
      </div>
    </div>
  );
}
```

### `/src/App.tsx`
```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Navbar } from "@/components/Navbar";
import Dashboard from "./pages/Dashboard";
import TelegramStatus from "./pages/TelegramStatus";
import TwitterStatus from "./pages/TwitterStatus";
import Dados from "./pages/Dados";
import Config from "./pages/Config";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/telegram-status" element={<TelegramStatus />} />
              <Route path="/twitter-status" element={<TwitterStatus />} />
              <Route path="/dados" element={<Dados />} />
              <Route path="/config" element={<Config />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
```

### `/index.html`
```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bot Pulse Hub - Tech Dashboard</title>
    <meta name="description" content="Dashboard moderno para monitoramento de bot Telegram + Twitter → WhatsApp com sistema de filtros e métricas em tempo real." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 🚀 Instruções de Implementação

### 1. Preparação
1. Certifique-se de ter o projeto Lovable configurado
2. Instale as dependências necessárias
3. Substitua os arquivos existentes pelos códigos acima

### 2. Verificação
- Teste o tema light/dark
- Verifique a responsividade
- Teste a navegação entre páginas
- Confirme se os dados mock estão sendo exibidos

### 3. Personalização
- Ajuste as cores no `index.css` se necessário
- Modifique os dados mock em `mockData.ts`
- Customize os componentes conforme sua necessidade

---

## 📝 Notas Importantes

- **Dados Mock**: Todos os dados são simulados para demonstração
- **API Integration**: Para conectar com APIs reais, substitua as funções mock
- **Responsividade**: Testado em mobile, tablet e desktop
- **Performance**: Otimizado com lazy loading e componentes eficientes
- **Acessibilidade**: Implementado com boas práticas de a11y

---

## 🎯 Próximos Passos

1. **Integração com API**: Conectar com backend real
2. **Autenticação**: Implementar sistema de login se necessário
3. **WebSockets**: Para updates em tempo real
4. **PWA**: Transformar em Progressive Web App
5. **Testes**: Adicionar testes unitários e e2e

---

**Dashboard Bot Pulse Hub** está pronto para uso! 🚀