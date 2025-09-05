import { ProtectedRoute } from '@/components/auth/protected-route';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Eye, Target } from 'lucide-react';

export default function Analytics() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        
        <div className="flex">
          <DashboardSidebar />
          
          <main className="flex-1 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Analytics</h1>
              <p className="text-muted-foreground">
                Track your messaging performance and customer engagement.
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Views</h3>
                  <Eye className="text-primary" size={20} />
                </div>
                <div className="text-2xl font-bold">24,589</div>
                <p className="text-sm text-green-500">+18% from last month</p>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Click Rate</h3>
                  <Target className="text-blue-500" size={20} />
                </div>
                <div className="text-2xl font-bold">12.4%</div>
                <p className="text-sm text-green-500">+2.3% from last month</p>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Engagement</h3>
                  <TrendingUp className="text-green-500" size={20} />
                </div>
                <div className="text-2xl font-bold">68.7%</div>
                <p className="text-sm text-green-500">+7.2% from last month</p>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Conversions</h3>
                  <BarChart3 className="text-purple-500" size={20} />
                </div>
                <div className="text-2xl font-bold">1,847</div>
                <p className="text-sm text-green-500">+12% from last month</p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Performance Charts</h3>
                <Button variant="outline">Export Report</Button>
              </div>
              
              <div className="text-center py-12">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Advanced Analytics Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  Detailed charts, reports, and insights will be available with WhatsApp Business API integration.
                </p>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}