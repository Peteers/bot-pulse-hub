import { useState, useEffect } from 'react';
import { ArrowLeft, Globe, CheckCircle, XCircle, AlertTriangle, RefreshCw, Play, Pause, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { fetchServiceStatus, ServiceStatus } from '@/lib/mockData';

export default function TwitterStatus() {
  const [status, setStatus] = useState<ServiceStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const loadStatus = async () => {
    try {
      setLoading(true);
      const data = await fetchServiceStatus();
      setStatus(data);
    } catch (error) {
      console.error('Error loading Twitter status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  const getMainStatus = () => {
    if (!status?.twitter) return { text: 'Carregando...', icon: AlertTriangle, status: 'warning' };
    
    if (status.twitter.configured && status.twitter.monitoring) {
      return { text: 'Monitorando Ativamente', icon: CheckCircle, status: 'success' };
    } else if (status.twitter.configured) {
      return { text: 'Configurado - Monitoramento Pausado', icon: AlertTriangle, status: 'warning' };
    } else {
      return { text: 'Não Configurado', icon: XCircle, status: 'error' };
    }
  };

  const formatLastCheck = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Agora mesmo';
    if (diffMinutes < 60) return `${diffMinutes} minutos atrás`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} horas atrás`;
    
    return date.toLocaleDateString('pt-BR');
  };

  const mainStatus = getMainStatus();
  const StatusIcon = mainStatus.icon;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Link to="/">
          <Button variant="outline" size="icon" className="tech-card-glow">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            <span className="glow-text">Status Twitter</span>
          </h1>
          <p className="text-muted-foreground">
            Monitoramento de perfis e configurações
          </p>
        </div>
        
        <Button
          onClick={loadStatus}
          disabled={loading}
          size="sm"
          className="btn-tech-outline ml-auto"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Status */}
        <Card className="tech-card-glow lg:col-span-2">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`p-6 rounded-full border-4 ${
                mainStatus.status === 'success' ? 'border-success bg-success/10' :
                mainStatus.status === 'warning' ? 'border-warning bg-warning/10' :
                'border-error bg-error/10'
              }`}>
                <StatusIcon className={`h-12 w-12 ${
                  mainStatus.status === 'success' ? 'text-success' :
                  mainStatus.status === 'warning' ? 'text-warning' :
                  'text-error'
                }`} />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {mainStatus.text}
                </h2>
                <p className="text-muted-foreground">
                  {status?.twitter.last_check && (
                    <>Última verificação: {formatLastCheck(status.twitter.last_check)}</>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration Details */}
        <Card className="tech-card-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-twitter" />
              Configuração
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className={status?.twitter.configured ? 'status-online' : 'status-error'}>
                  {status?.twitter.configured ? 'Configurado' : 'Não Configurado'}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Monitoramento</span>
                <Badge className={status?.twitter.monitoring ? 'status-online' : 'status-warning'}>
                  {status?.twitter.monitoring ? 'Ativo' : 'Pausado'}
                </Badge>
              </div>

              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Modo de Operação</span>
                <Badge className="status-info">
                  {status?.twitter.mode === 'api' ? 'API Oficial' : 'Web Scraping'}
                </Badge>
              </div>

              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Intervalo</span>
                <span className="text-sm font-medium text-foreground">
                  {status?.twitter.interval || 0} min
                </span>
              </div>
            </div>

            {status?.twitter.nitter_instance && status.twitter.mode === 'scraping' && (
              <div className="p-3 rounded-lg border border-info/30 bg-info/10">
                <p className="text-sm text-info font-medium">Instância Nitter:</p>
                <p className="text-sm text-info/80 font-mono">{status.twitter.nitter_instance}</p>
              </div>
            )}

            {status?.twitter.error && (
              <div className="p-3 rounded-lg border border-error/30 bg-error/10">
                <p className="text-sm text-error font-medium">Erro:</p>
                <p className="text-sm text-error/80">{status.twitter.error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Monitoring Details */}
        <Card className="tech-card-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Perfis Monitorados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{status?.twitter.profiles || 0}</p>
                <p className="text-sm text-muted-foreground">Perfis ativos</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Verificação a cada:</span>
                  <span className="font-medium">{status?.twitter.interval || 0} minutos</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Próxima verificação:</span>
                  <span className="font-medium font-mono">
                    {status?.twitter.interval ? `${status.twitter.interval - (new Date().getMinutes() % status.twitter.interval)} min` : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="tech-card-glow lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              Métricas de Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Posts Coletados (24h)</span>
                <p className="text-2xl font-bold text-foreground">127</p>
                <p className="text-xs text-success">+12% vs ontem</p>
              </div>
              
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Taxa de Sucesso</span>
                <p className="text-2xl font-bold text-foreground">98.5%</p>
                <p className="text-xs text-success">Excelente</p>
              </div>
              
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Tempo Médio</span>
                <p className="text-2xl font-bold text-foreground">2.3s</p>
                <p className="text-xs text-muted-foreground">Por verificação</p>
              </div>
              
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Últimos Erros</span>
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-xs text-success">Nas últimas 24h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Control Actions */}
        <Card className="tech-card-glow lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className={status?.twitter.monitoring ? "bg-warning text-warning-foreground hover:bg-warning/90" : "btn-tech"}
                disabled={!status?.twitter.configured}
              >
                {status?.twitter.monitoring ? (
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
              
              <Button className="btn-tech-outline flex-1">
                <Users className="h-4 w-4 mr-2" />
                Gerenciar Perfis
              </Button>
              
              <Button className="btn-tech-outline flex-1">
                <Globe className="h-4 w-4 mr-2" />
                Configurar API
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}