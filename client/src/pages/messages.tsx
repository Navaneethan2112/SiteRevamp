import { ProtectedRoute } from '@/components/auth/protected-route';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Clock } from 'lucide-react';

export default function Messages() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        
        <div className="flex">
          <DashboardSidebar />
          
          <main className="flex-1 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Messages</h1>
              <p className="text-muted-foreground">
                Manage your WhatsApp messaging campaigns and communications.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Messages Sent Today</h3>
                  <MessageSquare className="text-primary" size={20} />
                </div>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-sm text-green-500">+12% from yesterday</p>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Pending Messages</h3>
                  <Clock className="text-orange-500" size={20} />
                </div>
                <div className="text-2xl font-bold">56</div>
                <p className="text-sm text-muted-foreground">In queue</p>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Delivery Rate</h3>
                  <Send className="text-green-500" size={20} />
                </div>
                <div className="text-2xl font-bold">98.5%</div>
                <p className="text-sm text-green-500">+2.1% from last week</p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Recent Messages</h3>
                <Button>Send New Message</Button>
              </div>
              
              <div className="text-center py-12">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Messages Feature Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced messaging capabilities will be available once you integrate with WhatsApp Business API.
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