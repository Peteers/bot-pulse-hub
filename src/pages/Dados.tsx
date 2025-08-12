import { useState, useEffect } from 'react';
import { ArrowLeft, MessageCircle, Globe, Filter, Calendar, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';

interface MessageData {
  id: number;
  platform: 'telegram' | 'twitter';
  original_content: string;
  filtered_content: string;
  status: 'success' | 'error' | 'pending';
  timestamp: string;
  source: string;
  filters_applied: string[];
}

const mockMessages: MessageData[] = [
  {
    id: 1,
    platform: 'telegram',
    original_content: '🚀 BITCOIN EXPLODE E VAI PRA LUA! COMPRE AGORA!!! 📈💰',
    filtered_content: '📈 Bitcoin registra alta significativa no mercado',
    status: 'success',
    timestamp: '2024-12-20T10:30:00Z',
    source: '@criptonoticias',
    filters_applied: ['caps_filter', 'emoji_filter', 'sensational_filter']
  },
  {
    id: 2,
    platform: 'twitter',
    original_content: 'BREAKING: S&P 500 hits new ATH!!! This is HUGE! 🔥🔥🔥',
    filtered_content: 'S&P 500 atinge novo máximo histórico',
    status: 'success',
    timestamp: '2024-12-20T10:25:00Z',
    source: '@TradingView',
    filters_applied: ['caps_filter', 'emoji_filter', 'translation_filter']
  },
  {
    id: 3,
    platform: 'telegram',
    original_content: '⚡ Regulamentação crypto na Europa pode impactar mercado',
    filtered_content: '⚡ Nova regulamentação de criptomoedas na Europa',
    status: 'pending',
    timestamp: '2024-12-20T10:20:00Z',
    source: '@cryptoeurope',
    filters_applied: ['content_filter']
  }
];

export default function Dados() {
  const [messages, setMessages] = useState<MessageData[]>(mockMessages);
  const [loading, setLoading] = useState(false);
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const loadMessages = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 800);
  };

  const filteredMessages = messages.filter(message => {
    if (platformFilter !== 'all' && message.platform !== platformFilter) return false;
    if (statusFilter !== 'all' && message.status !== statusFilter) return false;
    return true;
  });

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR');
  };

  const getPlatformIcon = (platform: string) => {
    return platform === 'telegram' ? MessageCircle : Globe;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="status-online">Enviado</Badge>;
      case 'error':
        return <Badge className="status-error">Erro</Badge>;
      case 'pending':
        return <Badge className="status-warning">Processando</Badge>;
      default:
        return <Badge className="status-info">Aguardando</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Link to="/">
          <Button variant="outline" size="icon" className="tech-card-glow">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">
            <span className="glow-text">Dados Filtrados</span>
          </h1>
          <p className="text-muted-foreground">
            Histórico de mensagens processadas e filtradas
          </p>
        </div>
        
        <Button
          onClick={loadMessages}
          disabled={loading}
          size="sm"
          className="btn-tech-outline"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      {/* Filters */}
      <Card className="tech-card-glow mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Plataforma</label>
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="telegram">Telegram</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="success">Enviado</SelectItem>
                  <SelectItem value="pending">Processando</SelectItem>
                  <SelectItem value="error">Erro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                className="btn-tech"
                onClick={() => {
                  setPlatformFilter('all');
                  setStatusFilter('all');
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="tech-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{filteredMessages.length}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="tech-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">
                {filteredMessages.filter(m => m.status === 'success').length}
              </p>
              <p className="text-sm text-muted-foreground">Enviadas</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="tech-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">
                {filteredMessages.filter(m => m.status === 'pending').length}
              </p>
              <p className="text-sm text-muted-foreground">Processando</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="tech-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-error">
                {filteredMessages.filter(m => m.status === 'error').length}
              </p>
              <p className="text-sm text-muted-foreground">Erros</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="tech-card animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredMessages.length === 0 ? (
          <Card className="tech-card">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Nenhuma mensagem encontrada com os filtros selecionados.</p>
            </CardContent>
          </Card>
        ) : (
          filteredMessages.map((message) => {
            const PlatformIcon = getPlatformIcon(message.platform);
            
            return (
              <Card key={message.id} className="tech-card-glow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg border flex-shrink-0 ${
                      message.platform === 'telegram' ? 'platform-telegram' : 'platform-twitter'
                    }`}>
                      <PlatformIcon className="h-6 w-6" />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="font-mono text-sm text-muted-foreground">
                            {message.source}
                          </span>
                          {getStatusBadge(message.status)}
                        </div>
                        
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span className="font-mono">{formatTime(message.timestamp)}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">Conteúdo Original:</h4>
                          <p className="text-sm text-foreground bg-muted/20 p-3 rounded border">
                            {message.original_content}
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">Após Filtros:</h4>
                          <p className="text-sm text-foreground bg-primary/5 border border-primary/20 p-3 rounded">
                            {message.filtered_content}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-muted-foreground">Filtros aplicados:</span>
                        {message.filters_applied.map((filter, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {filter.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Badge variant="outline" className="px-3 py-1">
            Página 1 de 1
          </Badge>
          <Button variant="outline" size="sm" disabled>
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}