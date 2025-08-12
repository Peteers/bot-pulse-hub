import { useState } from 'react';
import { ArrowLeft, Settings, MessageCircle, Globe, Shield, Bell, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Link } from 'react-router-dom';

export default function Config() {
  const [telegramEnabled, setTelegramEnabled] = useState(true);
  const [twitterEnabled, setTwitterEnabled] = useState(true);
  const [autoFilter, setAutoFilter] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [checkInterval, setCheckInterval] = useState([15]);

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
            <span className="glow-text">Configurações</span>
          </h1>
          <p className="text-muted-foreground">
            Gerencie as configurações do Bot Pulse Hub
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Configuration */}
        <Card className="tech-card-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Configuração de Serviços
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-telegram" />
                  <span className="font-medium">Telegram</span>
                  <Badge className={telegramEnabled ? 'status-online' : 'status-error'}>
                    {telegramEnabled ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Monitoramento de canais do Telegram
                </p>
              </div>
              <Switch
                checked={telegramEnabled}
                onCheckedChange={setTelegramEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-twitter" />
                  <span className="font-medium">Twitter</span>
                  <Badge className={twitterEnabled ? 'status-online' : 'status-error'}>
                    {twitterEnabled ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Monitoramento de perfis do Twitter
                </p>
              </div>
              <Switch
                checked={twitterEnabled}
                onCheckedChange={setTwitterEnabled}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">
                Intervalo de Verificação: {checkInterval[0]} minutos
              </label>
              <Slider
                value={checkInterval}
                onValueChange={setCheckInterval}
                max={60}
                min={5}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5 min</span>
                <span>60 min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filter Settings */}
        <Card className="tech-card-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Configuração de Filtros
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="font-medium">Filtro Automático</span>
                <p className="text-sm text-muted-foreground">
                  Aplicar filtros automaticamente nas mensagens
                </p>
              </div>
              <Switch
                checked={autoFilter}
                onCheckedChange={setAutoFilter}
              />
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Filtros Ativos:</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded border border-primary/20">
                  <span className="text-sm">Remover CAPS LOCK excessivo</span>
                  <Badge className="status-online">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded border border-primary/20">
                  <span className="text-sm">Filtrar emojis excessivos</span>
                  <Badge className="status-online">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded border border-primary/20">
                  <span className="text-sm">Remover linguagem sensacionalista</span>
                  <Badge className="status-online">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded border border-primary/20">
                  <span className="text-sm">Tradução automática</span>
                  <Badge className="status-warning">Configurar</Badge>
                </div>
              </div>
            </div>

            <Button className="w-full btn-tech-outline">
              <Shield className="h-4 w-4 mr-2" />
              Configurar Filtros
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="tech-card-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="font-medium">Notificações Ativas</span>
                <p className="text-sm text-muted-foreground">
                  Receber alertas sobre o status do sistema
                </p>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>

            {notificationsEnabled && (
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Tipos de Notificação:</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Erros de conexão</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Falhas na autenticação</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Relatórios diários</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Mensagens com alto engajamento</span>
                  </label>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* System Statistics */}
        <Card className="tech-card-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-primary" />
              Estatísticas do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">99.2%</p>
                <p className="text-xs text-muted-foreground">Uptime</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">1.2s</p>
                <p className="text-xs text-muted-foreground">Latência Média</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">15GB</p>
                <p className="text-xs text-muted-foreground">Dados Processados</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-xs text-muted-foreground">Erros Críticos</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Uso de CPU:</span>
                <span className="font-medium">23%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '23%' }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Uso de Memória:</span>
                <span className="font-medium">67%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-warning h-2 rounded-full" style={{ width: '67%' }}></div>
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
                Salvar Configurações
              </Button>
              
              <Button className="btn-tech-outline flex-1">
                <Settings className="h-4 w-4 mr-2" />
                Configurações Avançadas
              </Button>
              
              <Button className="bg-error text-error-foreground hover:bg-error/90 flex-1">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reiniciar Sistema
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}