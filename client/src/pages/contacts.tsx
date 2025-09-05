import { ProtectedRoute } from '@/components/auth/protected-route';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, Search, Filter } from 'lucide-react';

export default function Contacts() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        
        <div className="flex">
          <DashboardSidebar />
          
          <main className="flex-1 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Contacts</h1>
              <p className="text-muted-foreground">
                Manage your customer contacts and communication lists.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Contacts</h3>
                  <Users className="text-primary" size={20} />
                </div>
                <div className="text-2xl font-bold">8,924</div>
                <p className="text-sm text-green-500">+248 this week</p>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Active Contacts</h3>
                  <UserPlus className="text-green-500" size={20} />
                </div>
                <div className="text-2xl font-bold">7,156</div>
                <p className="text-sm text-muted-foreground">80.2% of total</p>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">New This Month</h3>
                  <UserPlus className="text-blue-500" size={20} />
                </div>
                <div className="text-2xl font-bold">1,023</div>
                <p className="text-sm text-green-500">+15% from last month</p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Contact Management</h3>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Contact
                  </Button>
                </div>
              </div>
              
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Contact Management Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced contact management, segmentation, and bulk operations will be available soon.
                </p>
                <Button variant="outline">Import Contacts</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}