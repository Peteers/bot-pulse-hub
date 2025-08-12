export interface DashboardStats {
  sent_count: number;
  telegram_sent: number;
  twitter_sent: number;
  success_rate: number;
  total_processed: number;
  last_updated: string;
}

export interface ServiceStatus {
  telegram: {
    connected: boolean;
    authenticated: boolean;
    user?: { 
      phone: string; 
      name: string;
      id: string;
    };
    last_activity: string;
    error?: string;
  };
  twitter: {
    configured: boolean;
    monitoring: boolean;
    profiles: number;
    mode: 'api' | 'scraping';
    interval: number;
    last_check: string;
    nitter_instance?: string;
    error?: string;
  };
}

export const mockStats: DashboardStats = {
  sent_count: 1247,
  telegram_sent: 823,
  twitter_sent: 424,
  success_rate: 94.2,
  total_processed: 1329,
  last_updated: new Date().toISOString()
};

export const mockServiceStatus: ServiceStatus = {
  telegram: {
    connected: true,
    authenticated: true,
    user: {
      phone: '+55 11 9****-****',
      name: 'Bot News Hub',
      id: '123456789'
    },
    last_activity: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  },
  twitter: {
    configured: true,
    monitoring: true,
    profiles: 14,
    mode: 'scraping',
    interval: 15,
    last_check: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    nitter_instance: 'nitter.net'
  }
};

// Simulate API calls with promises
export const fetchDashboardStats = (): Promise<DashboardStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...mockStats,
        last_updated: new Date().toISOString()
      });
    }, 800);
  });
};

export const fetchServiceStatus = (): Promise<ServiceStatus> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockServiceStatus);
    }, 600);
  });
};