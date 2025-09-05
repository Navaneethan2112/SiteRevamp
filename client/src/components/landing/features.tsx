import { 
  MessageSquare, 
  Bot, 
  BarChart3, 
  Send, 
  Shield, 
  Megaphone 
} from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export function Features() {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: MessageSquare,
      titleKey: "enterpriseApi",
      descriptionKey: "enterpriseApiDesc",
      color: "text-primary"
    },
    {
      icon: Bot,
      titleKey: "aiChatbotsFeature",
      descriptionKey: "aiChatbotsDesc",
      color: "text-purple-500"
    },
    {
      icon: BarChart3,
      titleKey: "analyticsBI",
      descriptionKey: "analyticsBIDesc",
      color: "text-green-500"
    },
    {
      icon: Send,
      titleKey: "bulkCampaigns",
      descriptionKey: "bulkCampaignsDesc",
      color: "text-blue-500"
    },
    {
      icon: Shield,
      titleKey: "complianceSecurity",
      descriptionKey: "complianceSecurityDesc",
      color: "text-amber-500"
    },
    {
      icon: Megaphone,
      titleKey: "multiChannelIntegration",
      descriptionKey: "multiChannelDesc",
      color: "text-orange-500"
    }
  ];
  
  return (
    <section id="features" className="py-20 bg-card relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
            {t('featuresTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t('featuresDescription')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="group bg-background/80 backdrop-blur-sm p-8 rounded-2xl border border-border hover:border-violet-200 dark:hover:border-violet-800 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-2"
                data-testid={`card-feature-${index}`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`text-2xl ${feature.color} group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300`} size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(feature.descriptionKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}