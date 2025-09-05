import { useQuery } from '@tanstack/react-query';
import { MessageSquare, Reply, Users, TrendingUp } from 'lucide-react';

interface DashboardStats {
  messagesSent: number;
  responseRate: string;
  activeContacts: number;
  conversionRate: string;
}

export function StatsGrid() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['/api/dashboard/stats'],
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card p-6 rounded-2xl border border-border animate-pulse">
            <div className="h-4 bg-muted rounded mb-4"></div>
            <div className="h-8 bg-muted rounded mb-2"></div>
            <div className="h-3 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const statsData = [
    {
      title: 'Messages Sent',
      value: stats?.messagesSent?.toLocaleString() || '0',
      change: '+12% from last month',
      icon: MessageSquare,
      color: 'text-primary'
    },
    {
      title: 'Response Rate',
      value: stats?.responseRate || '0%',
      change: '+5.2% from last month',
      icon: Reply,
      color: 'text-accent'
    },
    {
      title: 'Active Contacts',
      value: stats?.activeContacts?.toLocaleString() || '0',
      change: '+248 new this week',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      title: 'Conversion Rate',
      value: stats?.conversionRate || '0%',
      change: '+3.1% from last month',
      icon: TrendingUp,
      color: 'text-green-500'
    }
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div 
            key={index}
            className="bg-card p-6 rounded-2xl border border-border"
            data-testid={`card-stat-${index}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
              <IconComponent className={stat.color} size={20} />
            </div>
            <div className="text-2xl font-bold" data-testid={`text-stat-value-${index}`}>
              {stat.value}
            </div>
            <p className="text-sm text-green-500">{stat.change}</p>
          </div>
        );
      })}
    </div>
  );
}
