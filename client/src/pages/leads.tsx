import { ProtectedRoute } from '@/components/auth/protected-route';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, Phone, Mail, Building, Calendar, User, TrendingUp } from 'lucide-react';

// Mock data for demonstration - this would come from your database
const mockLeads = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh@techsolutions.com',
    phone: '+91 9876543210',
    company: 'Tech Solutions Ltd',
    plan: 'professional',
    employees: '51-200',
    currentSolution: 'WhatsApp Business App',
    message: 'Looking for bulk messaging solution for customer support',
    status: 'new',
    createdAt: '2025-01-05',
    priority: 'high'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@retailhub.com',
    phone: '+91 8765432109',
    company: 'Retail Hub India',
    plan: 'starter',
    employees: '11-50',
    currentSolution: 'None',
    message: 'Want to start WhatsApp marketing for our retail business',
    status: 'contacted',
    createdAt: '2025-01-04',
    priority: 'medium'
  },
  {
    id: '3',
    name: 'Arjun Patel',
    email: 'arjun@manufacturingco.com',
    phone: '+91 7654321098',
    company: 'Manufacturing Co',
    plan: 'enterprise',
    employees: '1000+',
    currentSolution: 'Custom solution',
    message: 'Need enterprise-level WhatsApp integration with our ERP system',
    status: 'demo-scheduled',
    createdAt: '2025-01-03',
    priority: 'high'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'contacted': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'demo-scheduled': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'proposal-sent': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'closed-won': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
    case 'closed-lost': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPlanColor = (plan: string) => {
  switch (plan) {
    case 'starter': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'professional': return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'enterprise': return 'bg-orange-50 text-orange-700 border-orange-200';
    default: return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export default function Leads() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        
        <div className="flex">
          <DashboardSidebar />
          
          <main className="flex-1 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Business Leads</h1>
              <p className="text-muted-foreground">
                Manage and track all business inquiries and demo requests from your website.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                      <p className="text-2xl font-bold">47</p>
                    </div>
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-xs text-green-500 mt-2">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">New This Week</p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-500" />
                  </div>
                  <p className="text-xs text-blue-500 mt-2">3 high priority</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Demos Scheduled</p>
                      <p className="text-2xl font-bold">5</p>
                    </div>
                    <Calendar className="h-8 w-8 text-green-500" />
                  </div>
                  <p className="text-xs text-green-500 mt-2">This week</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                      <p className="text-2xl font-bold">68%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-500" />
                  </div>
                  <p className="text-xs text-purple-500 mt-2">Above average</p>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <div className="bg-card p-6 rounded-2xl border border-border mb-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Lead Management</h3>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline">
                    Export
                  </Button>
                </div>
              </div>
              
              <div className="flex space-x-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Search leads..." className="pl-10" />
                </div>
              </div>

              {/* Lead Cards */}
              <div className="space-y-4">
                {mockLeads.map((lead) => (
                  <Card key={lead.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="grid lg:grid-cols-4 gap-6 items-start">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{lead.name}</h4>
                              <p className="text-sm text-muted-foreground">{lead.createdAt}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Mail className="h-3 w-3 mr-2" />
                              {lead.email}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Phone className="h-3 w-3 mr-2" />
                              {lead.phone}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Building className="h-3 w-3 mr-2" />
                              {lead.company}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="space-y-2">
                            <Badge className={getPlanColor(lead.plan)}>
                              {lead.plan.charAt(0).toUpperCase() + lead.plan.slice(1)} Plan
                            </Badge>
                            <p className="text-sm text-muted-foreground">
                              <strong>Size:</strong> {lead.employees} employees
                            </p>
                            <p className="text-sm text-muted-foreground">
                              <strong>Current:</strong> {lead.currentSolution}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground mb-2"><strong>Requirements:</strong></p>
                          <p className="text-sm line-clamp-3">{lead.message}</p>
                        </div>

                        <div className="flex flex-col space-y-3">
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Phone className="h-3 w-3 mr-1" />
                              Call
                            </Button>
                            <Button size="sm" variant="outline">
                              <Mail className="h-3 w-3 mr-1" />
                              Email
                            </Button>
                          </div>

                          <Button size="sm" className="w-full">
                            Schedule Demo
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}