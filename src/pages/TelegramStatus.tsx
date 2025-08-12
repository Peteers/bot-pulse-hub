import { useState, useEffect } from 'react';
import { ArrowLeft, MessageCircle, CheckCircle, XCircle, AlertTriangle, RefreshCw, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { fetchServiceStatus, ServiceStatus } from '@/lib/mockData';

export default function TelegramStatus() {
  const [status, setStatus] = useState<ServiceStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const loadStatus = async () => {
    try {
      setLoading(true);
      const data = await fetchServiceStatus();
      setStatus(data);
    } catch (error) {
      console.error('Error loading Telegram status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  const getMainStatus = () => {
    if (!status?.telegram) return { text: 'Carregando...', icon: AlertTriangle, status: 'warning' };
    
    if (status.telegram.connected && status.telegram.authenticated) {
      return { text: 'Conectado e Autenticado', icon: CheckCircle, status: 'success' };
    } else if (status.telegram.connected) {
      return { text: 'Conectado - Aguardando Autenticação', icon: AlertTriangle, status: 'warning' };
    } else {
      return { text: 'Desconectado', icon: XCircle, status: 'error' };
    }
  };

  const formatLastActivity = (timestamp: string) => {
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
            <span className="glow-text">Status Telegram</span>
          </h1>
          <p className="text-muted-foreground">
            Monitoramento da conexão e autenticação
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
                  {status?.telegram.last_activity && (
                    <>Última atividade: {formatLastActivity(status.telegram.last_activity)}</>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connection Details */}
        <Card className="tech-card-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-telegram" />
              Detalhes da Conexão
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Status da Conexão</span>
                <Badge className={status?.telegram.connected ? 'status-online' : 'status-error'}>
                  {status?.telegram.connected ? 'Conectado' : 'Desconectado'}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Autenticação</span>
                <Badge className={status?.telegram.authenticated ? 'status-online' : 'status-warning'}>
                  {status?.telegram.authenticated ? 'Autenticado' : 'Pendente'}
                </Badge>
              </div>
            </div>

            {status?.telegram.error && (
              <div className="p-3 rounded-lg border border-error/30 bg-error/10">
                <p className="text-sm text-error font-medium">Erro:</p>
                <p className="text-sm text-error/80">{status.telegram.error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* User Information */}
        <Card className="tech-card-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Informações do Usuário
            </CardTitle>
          </CardHeader>
          <CardContent>
            {status?.telegram.user ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{status.telegram.user.name}</p>
                    <p className="text-sm text-muted-foreground">ID: {status.telegram.user.id}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-mono text-muted-foreground">
                    {status.telegram.user.phone}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">
                  {status?.telegram.connected ? 'Usuário não autenticado' : 'Sem conexão'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Monitoring Settings */}
        <Card className="tech-card-glow lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Configurações de Monitoramento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Canais Monitorados</span>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Canais ativos</p>
              </div>
              
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Mensagens/Hora</span>
                <p className="text-2xl font-bold text-foreground">45</p>
                <p className="text-xs text-muted-foreground">Média das últimas 24h</p>
              </div>
              
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Filtros Ativos</span>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-xs text-muted-foreground">Regras de filtro</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card className="tech-card-glow lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-tech flex-1">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reconectar Telegram
              </Button>
              
              <Button className="btn-tech-outline flex-1">
                <MessageCircle className="h-4 w-4 mr-2" />
                Configurar Canais
              </Button>
              
              <Button className="btn-tech-outline flex-1">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Configurar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}