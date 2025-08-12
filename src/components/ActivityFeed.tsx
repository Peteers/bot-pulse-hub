import { useState, useEffect } from 'react';
import { MessageCircle, Globe, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ActivityItem {
  id: number;
  platform: 'telegram' | 'twitter';
  content: string;
  timestamp: string;
  status: 'success' | 'error' | 'pending';
  source?: string;
}

const mockActivity: ActivityItem[] = [
  {
    id: 1,
    platform: 'telegram',
    content: '🚀 Bitcoin atinge novo máximo histórico de US$ 67.500',
    timestamp: '2024-12-20T10:30:00Z',
    status: 'success',
    source: '@criptonoticias'
  },
  {
    id: 2,
    platform: 'twitter',
    content: '📈 Análise técnica mostra rompimento importante no S&P 500',
    timestamp: '2024-12-20T10:25:00Z',
    status: 'success',
    source: '@TradingView'
  },
  {
    id: 3,
    platform: 'telegram',
    content: '⚡ Notícia sobre nova regulamentação de crypto na Europa',
    timestamp: '2024-12-20T10:20:00Z',
    status: 'pending',
    source: '@cryptoeurope'
  },
  {
    id: 4,
    platform: 'twitter',
    content: '🔔 Alerta: Volatilidade extrema detectada no mercado de altcoins',
    timestamp: '2024-12-20T10:15:00Z',
    status: 'success',
    source: '@CoinDesk'
  },
  {
    id: 5,
    platform: 'telegram',
    content: '📊 Relatório semanal de DeFi protocols - TVL em alta',
    timestamp: '2024-12-20T10:10:00Z',
    status: 'error',
    source: '@defiprotocols'
  }
];

export function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>(mockActivity);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLoading(true);
      setTimeout(() => {
        // Simulate adding new activity
        const newActivity: ActivityItem = {
          id: Date.now(),
          platform: Math.random() > 0.5 ? 'telegram' : 'twitter',
          content: `📰 Nova notícia processada em tempo real - ${new Date().toLocaleTimeString()}`,
          timestamp: new Date().toISOString(),
          status: 'success',
          source: '@newsbot'
        };
        
        setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
        setLoading(false);
      }, 1000);
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const getPlatformIcon = (platform: string) => {
    return platform === 'telegram' ? MessageCircle : Globe;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-3 w-3 text-success" />;
      case 'error':
        return <XCircle className="h-3 w-3 text-error" />;
      case 'pending':
        return <AlertCircle className="h-3 w-3 text-warning" />;
      default:
        return <Clock className="h-3 w-3 text-info" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="status-online text-xs">Enviado</Badge>;
      case 'error':
        return <Badge className="status-error text-xs">Erro</Badge>;
      case 'pending':
        return <Badge className="status-warning text-xs">Processando</Badge>;
      default:
        return <Badge className="status-info text-xs">Aguardando</Badge>;
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="tech-card-glow h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Atividade Recente
          </CardTitle>
          {loading && (
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="px-6 pb-6">
        <div className="space-y-4 custom-scrollbar max-h-96 overflow-y-auto">
          {activities.map((activity, index) => {
            const PlatformIcon = getPlatformIcon(activity.platform);
            
            return (
              <div 
                key={activity.id}
                className={`flex items-start space-x-3 p-3 rounded-lg border border-primary/10 bg-card/50 hover:bg-primary/5 transition-all duration-300 ${
                  index === 0 && loading ? 'animate-fade-in' : ''
                }`}
              >
                <div className={`p-2 rounded-lg border flex-shrink-0 ${
                  activity.platform === 'telegram' ? 'platform-telegram' : 'platform-twitter'
                }`}>
                  <PlatformIcon className="h-4 w-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      {activity.source && (
                        <span className="text-xs font-mono text-muted-foreground">
                          {activity.source}
                        </span>
                      )}
                      {getStatusBadge(activity.status)}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      {getStatusIcon(activity.status)}
                      <span className="font-mono">{formatTime(activity.timestamp)}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-foreground line-clamp-2">
                    {activity.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-300 font-medium">
            Ver todas as atividades →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}