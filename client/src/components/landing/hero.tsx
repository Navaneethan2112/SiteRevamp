import { LoginButton } from '@/components/auth/login-button';
import { Button } from '@/components/ui/button';
import { Play, MessageSquare, Bot, BarChart3, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export function Hero() {
  const { t } = useLanguage();
  
  return (
    <section className="pt-24 pb-16 gradient-bg relative overflow-hidden">
      {/* Minimal decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary/10 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-6 h-6 bg-primary/5 rounded-full"></div>
        <div className="absolute top-1/2 right-10 w-2 h-2 bg-primary/15 rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <div className="mb-4">
              <span className="inline-block bg-muted text-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
                {t('apiPartner')}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              {t('heroTitle1')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                {t('heroTitle2')}
              </span>{' '}
              {t('heroTitle3')}
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              {t('heroDescription')}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 justify-center lg:justify-start">
              <div className="flex items-center bg-muted rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-foreground text-xs sm:text-sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                {t('bulkMessaging')}
              </div>
              <div className="flex items-center bg-muted rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-foreground text-xs sm:text-sm">
                <Bot className="h-4 w-4 mr-2" />
                {t('aiChatbots')}
              </div>
              <div className="flex items-center bg-muted rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-foreground text-xs sm:text-sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                {t('analytics')}
              </div>
              <div className="flex items-center bg-muted rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-foreground text-xs sm:text-sm">
                <Users className="h-4 w-4 mr-2" />
                {t('crmIntegration')}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-primary text-primary-foreground px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover-scale text-sm sm:text-base w-full sm:w-auto"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                {t('requestBusinessDemo')}
              </Button>
              <Button variant="secondary" className="glass-effect text-foreground px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover-scale border-border text-sm sm:text-base w-full sm:w-auto">
                <Play className="mr-2 h-4 w-4" />
                {t('viewCaseStudies')}
              </Button>
            </div>
            
            <div className="mt-8 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-active-users">500+</div>
                <div className="text-muted-foreground text-xs sm:text-sm">{t('enterpriseClients')}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-messages-sent">25M+</div>
                <div className="text-muted-foreground text-xs sm:text-sm">{t('messagesDelivered')}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-uptime">99.9%</div>
                <div className="text-muted-foreground text-xs sm:text-sm">{t('apiUptime')}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-response-time">2.5s</div>
                <div className="text-muted-foreground text-xs sm:text-sm">{t('avgResponseTime')}</div>
              </div>
            </div>
          </div>
          
          <div className="lg:pl-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Modern SaaS dashboard interface" 
                className="rounded-2xl shadow-2xl hover-scale animate-float"
                data-testid="img-dashboard-preview"
              />
              {/* Minimal accent elements around the image */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary/20 rounded-full"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-primary/10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
