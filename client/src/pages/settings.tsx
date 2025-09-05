import { ProtectedRoute } from '@/components/auth/protected-route';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, User, Bell, Shield, CreditCard } from 'lucide-react';

export default function Settings() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        
        <div className="flex">
          <DashboardSidebar />
          
          <main className="flex-1 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account preferences and application settings.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Profile Settings */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-card p-6 rounded-2xl border border-border">
                  <div className="flex items-center space-x-2 mb-6">
                    <User className="text-primary" size={20} />
                    <h3 className="text-lg font-semibold">Profile Settings</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Your full name" />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+1 (555) 123-4567" />
                    </div>
                    
                    <Button>Save Changes</Button>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-2xl border border-border">
                  <div className="flex items-center space-x-2 mb-6">
                    <Bell className="text-primary" size={20} />
                    <h3 className="text-lg font-semibold">Notification Settings</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive email updates about your campaigns</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>SMS Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get SMS alerts for important events</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Marketing Updates</Label>
                        <p className="text-sm text-muted-foreground">Receive product updates and tips</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Settings */}
              <div className="space-y-6">
                <div className="bg-card p-6 rounded-2xl border border-border">
                  <div className="flex items-center space-x-2 mb-4">
                    <CreditCard className="text-primary" size={20} />
                    <h3 className="text-lg font-semibold">Billing</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">Current Plan</p>
                    <div className="text-xl font-bold">Professional</div>
                    <p className="text-sm text-muted-foreground">₹7,999/month</p>
                    <Button variant="outline" className="w-full">Manage Billing</Button>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-2xl border border-border">
                  <div className="flex items-center space-x-2 mb-4">
                    <Shield className="text-primary" size={20} />
                    <h3 className="text-lg font-semibold">Security</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full">Change Password</Button>
                    <Button variant="outline" className="w-full">Two-Factor Auth</Button>
                    <Button variant="outline" className="w-full">Login History</Button>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-2xl border border-border">
                  <div className="flex items-center space-x-2 mb-4">
                    <SettingsIcon className="text-primary" size={20} />
                    <h3 className="text-lg font-semibold">WhatsApp API</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">API Status</p>
                    <div className="text-sm text-yellow-600">Not Connected</div>
                    <Button variant="outline" className="w-full">Connect API</Button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}