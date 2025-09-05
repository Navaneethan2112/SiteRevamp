import { ProtectedRoute } from '@/components/auth/protected-route';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { Button } from '@/components/ui/button';
import { Bot, Zap, Users, MessageCircle } from 'lucide-react';

export default function Chatbots() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        
        <div className="flex">
          <DashboardSidebar />
          
          <main className="flex-1 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Chatbots</h1>
              <p className="text-muted-foreground">
                Create and manage AI-powered chatbots for customer support.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Active Chatbots</h3>
                  <Bot className="text-primary" size={20} />
                </div>
                <div className="text-2xl font-bold">3</div>
                <p className="text-sm text-green-500">All running smoothly</p>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Conversations Handled</h3>
                  <MessageCircle className="text-blue-500" size={20} />
                </div>
                <div className="text-2xl font-bold">847</div>
                <p className="text-sm text-green-500">This week</p>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Resolution Rate</h3>
                  <Zap className="text-yellow-500" size={20} />
                </div>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-sm text-green-500">+5% improvement</p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Your Chatbots</h3>
                <Button>Create New Bot</Button>
              </div>
              
              <div className="text-center py-12">
                <Bot className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">AI Chatbots Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced chatbot builder with natural language processing will be available soon.
                </p>
                <Button variant="outline">Get Notified</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}