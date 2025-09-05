import { useQuery } from '@tanstack/react-query';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { StatsGrid } from '@/components/dashboard/stats-grid';

interface Campaign {
  id: string;
  name: string;
  messagesSent: number;
  status: string;
}

interface Template {
  id: string;
  name: string;
  status: string;
}

export default function Dashboard() {
  const { data: campaigns, isLoading: campaignsLoading } = useQuery<Campaign[]>({
    queryKey: ['/api/campaigns'],
  });

  const { data: templates, isLoading: templatesLoading } = useQuery<Template[]>({
    queryKey: ['/api/templates'],
  });

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        
        <div className="flex">
          <DashboardSidebar />
          
          <main className="flex-1 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
              <p className="text-muted-foreground">
                Here's what's happening with your messaging campaigns today.
              </p>
            </div>
            
            <StatsGrid />
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Campaigns */}
              <div className="bg-card p-6 rounded-2xl border border-border">
                <h3 className="text-lg font-semibold mb-4">Recent Campaigns</h3>
                <div className="space-y-4">
                  {campaignsLoading ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-muted rounded mb-2"></div>
                          <div className="h-3 bg-muted rounded w-2/3"></div>
                        </div>
                      ))}
                    </div>
                  ) : campaigns && campaigns.length > 0 ? (
                    campaigns.slice(0, 5).map((campaign) => (
                      <div 
                        key={campaign.id}
                        className="flex items-center justify-between p-4 bg-background rounded-lg"
                        data-testid={`card-campaign-${campaign.id}`}
                      >
                        <div>
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {campaign.messagesSent.toLocaleString()} messages sent
                          </div>
                        </div>
                        <span 
                          className={`px-2 py-1 rounded text-xs ${
                            campaign.status === 'active' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}
                          data-testid={`status-campaign-${campaign.id}`}
                        >
                          {campaign.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No campaigns yet</p>
                      <button className="mt-2 text-primary hover:underline">
                        Create your first campaign
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Message Templates */}
              <div className="bg-card p-6 rounded-2xl border border-border">
                <h3 className="text-lg font-semibold mb-4">Message Templates</h3>
                <div className="space-y-4">
                  {templatesLoading ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-muted rounded mb-2"></div>
                          <div className="h-3 bg-muted rounded w-2/3"></div>
                        </div>
                      ))}
                    </div>
                  ) : templates && templates.length > 0 ? (
                    templates.slice(0, 5).map((template) => (
                      <div 
                        key={template.id}
                        className="flex items-center justify-between p-4 bg-background rounded-lg"
                        data-testid={`card-template-${template.id}`}
                      >
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {template.status === 'approved' ? 'Approved by Meta' : 'Pending approval'}
                          </div>
                        </div>
                        <span 
                          className={`px-2 py-1 rounded text-xs ${
                            template.status === 'approved'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}
                          data-testid={`status-template-${template.id}`}
                        >
                          {template.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No templates yet</p>
                      <button className="mt-2 text-primary hover:underline">
                        Create your first template
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
