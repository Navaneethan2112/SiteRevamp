import { LoginButton } from '@/components/auth/login-button';
import { Button } from '@/components/ui/button';
import { Play, MessageSquare, Bot, BarChart3, Users } from 'lucide-react';

export function Hero() {
  return (
    <section className="pt-24 pb-16 gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <div className="mb-4">
              <span className="inline-block bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                ✅ Official WhatsApp Business API Partner
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              Enterprise{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                WhatsApp Business Platform
              </span>{' '}
              for Modern Businesses
            </h1>
            <p className="text-lg lg:text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
              Transform your customer communication with our professional WhatsApp Business API platform. 
              Features intelligent chatbots, bulk messaging campaigns, and comprehensive analytics for businesses across UAE and India.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Bulk Messaging
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                <Bot className="h-4 w-4 mr-2" />
                AI Chatbots
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                <Users className="h-4 w-4 mr-2" />
                CRM Integration
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover-scale text-base"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Request Business Demo
              </Button>
              <Button variant="secondary" className="glass-effect text-white px-8 py-4 rounded-lg font-semibold hover-scale border-white/20 text-base">
                <Play className="mr-2 h-4 w-4" />
                View Case Studies
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white" data-testid="text-active-users">500+</div>
                <div className="text-blue-200 text-sm">Enterprise Clients</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white" data-testid="text-messages-sent">25M+</div>
                <div className="text-blue-200 text-sm">Messages Delivered</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white" data-testid="text-uptime">99.9%</div>
                <div className="text-blue-200 text-sm">API Uptime</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white" data-testid="text-response-time">2.5s</div>
                <div className="text-blue-200 text-sm">Avg Response Time</div>
              </div>
            </div>
          </div>
          
          <div className="lg:pl-8">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Modern SaaS dashboard interface" 
              className="rounded-2xl shadow-2xl hover-scale"
              data-testid="img-dashboard-preview"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
