import { useState, useEffect } from 'react';
import { Send, MessageCircle, Globe, BarChart3, Settings, RefreshCw, Zap } from 'lucide-react';
import { StatusCard } from '@/components/StatusCard';
import { ActivityFeed } from '@/components/ActivityFeed';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { fetchDashboardStats, fetchServiceStatus, DashboardStats, ServiceStatus } from '@/lib/mockData';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsData, statusData] = await Promise.all([
        fetchDashboardStats(),
        fetchServiceStatus()
      ]);
      setStats(statsData);
      setServiceStatus(statusData);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatLastUpdate = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            <span className="glow-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">
            Monitoramento em tempo real do Bot News Hub
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-sm text-muted-foreground font-mono">
            Última atualização: {formatLastUpdate(lastUpdate)}
          </div>
          <Button
            onClick={loadData}
            disabled={loading}
            size="sm"
            className="btn-tech-outline"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard
          title="Mensagens Enviadas"
          value={stats?.sent_count || 0}
          description="Total de mensagens processadas"
          icon={Send}
          status="success"
          loading={loading}
          trend={{ value: 12.5, isPositive: true }}
        />
        
        <StatusCard
          title="Do Telegram"
          value={stats?.telegram_sent || 0}
          description="Mensagens do Telegram"
          icon={MessageCircle}
          status="telegram"
          loading={loading}
          trend={{ value: 8.3, isPositive: true }}
        />
        
        <StatusCard
          title="Do Twitter"
          value={stats?.twitter_sent || 0}
          description="Posts do Twitter"
          icon={Globe}
          status="twitter"
          loading={loading}
          trend={{ value: 15.7, isPositive: true }}
        />
        
        <StatusCard
          title="Taxa de Sucesso"
          value={stats ? `${stats.success_rate}%` : '0%'}
          description="Mensagens enviadas com sucesso"
          icon={BarChart3}
          status="info"
          loading={loading}
          trend={{ value: 2.1, isPositive: true }}
        />
      </div>

      {/* Services Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service Status Cards */}
        <Card className="tech-card-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-telegram" />
              Status Telegram
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Conexão</span>
                <Badge className={serviceStatus?.telegram.connected ? 'status-online' : 'status-error'}>
                  {serviceStatus?.telegram.connected ? 'Conectado' : 'Desconectado'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Autenticação</span>
                <Badge className={serviceStatus?.telegram.authenticated ? 'status-online' : 'status-warning'}>
                  {serviceStatus?.telegram.authenticated ? 'Autenticado' : 'Pendente'}
                </Badge>
              </div>
              
              {serviceStatus?.telegram.user && (
                <div className="pt-2 border-t border-primary/10">
                  <p className="text-sm font-medium">{serviceStatus.telegram.user.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{serviceStatus.telegram.user.phone}</p>
                </div>
              )}
              
              <Link to="/telegram-status">
                <Button className="w-full btn-tech mt-3">
                  Ver Detalhes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="tech-card-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Globe className="h-5 w-5 text-twitter" />
              Status Twitter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Monitoramento</span>
                <Badge className={serviceStatus?.twitter.monitoring ? 'status-online' : 'status-error'}>
                  {serviceStatus?.twitter.monitoring ? 'Ativo' : 'Parado'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Perfis</span>
                <span className="text-sm font-medium">{serviceStatus?.twitter.profiles || 0}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Modo</span>
                <Badge className="status-info">
                  {serviceStatus?.twitter.mode === 'api' ? 'API' : 'Scraping'}
                </Badge>
              </div>
              
              <Link to="/twitter-status">
                <Button className="w-full btn-tech mt-3">
                  Ver Detalhes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="tech-card-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link to="/dados">
                <Button className="w-full btn-tech-outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Ver Dados Filtrados
                </Button>
              </Link>
              
              <Link to="/config">
                <Button className="w-full btn-tech-outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações
                </Button>
              </Link>
              
              <Button className="w-full btn-tech-outline" onClick={loadData}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Atualizar Dados
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <ActivityFeed />
      </div>
    </div>
  );
}