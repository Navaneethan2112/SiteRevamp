import { LoginButton } from '@/components/auth/login-button';
import { Button } from '@/components/ui/button';
import { Play, Rocket } from 'lucide-react';

export function Hero() {
  return (
    <section className="pt-24 pb-16 gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Empowering Small Businesses with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Smart WhatsApp Messaging
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Connect with your customers like never before with automated campaigns, approved templates, and powerful analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <LoginButton className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover-scale">
                <Rocket className="mr-2 h-4 w-4" />
                Start Free Trial
              </LoginButton>
              <Button variant="secondary" className="glass-effect text-white px-8 py-4 rounded-lg font-semibold hover-scale border-white/20">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
            
            <div className="mt-12 flex items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white" data-testid="text-active-users">10K+</div>
                <div className="text-blue-200 text-sm">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white" data-testid="text-messages-sent">50M+</div>
                <div className="text-blue-200 text-sm">Messages Sent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white" data-testid="text-uptime">99.9%</div>
                <div className="text-blue-200 text-sm">Uptime</div>
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
