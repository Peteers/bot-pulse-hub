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