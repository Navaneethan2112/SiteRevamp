import { 
  MessageSquare, 
  Bot, 
  BarChart3, 
  Send, 
  Shield, 
  Megaphone 
} from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: "WhatsApp Business API",
    description: "Direct integration with WhatsApp Business API for reliable message delivery and advanced features.",
    color: "text-primary"
  },
  {
    icon: Bot,
    title: "Automated Chatbots",
    description: "Intelligent chatbots that handle customer queries 24/7 with natural language processing.",
    color: "text-accent"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive analytics and reporting to track your messaging campaigns and customer engagement.",
    color: "text-green-500"
  },
  {
    icon: Send,
    title: "Bulk Messaging",
    description: "Send personalized bulk messages to thousands of contacts with approved templates.",
    color: "text-blue-500"
  },
  {
    icon: Shield,
    title: "Meta Approved Templates",
    description: "Use pre-approved message templates that comply with Meta policies and guidelines.",
    color: "text-purple-500"
  },
  {
    icon: Megaphone,
    title: "Campaign Management",
    description: "Create, schedule, and manage marketing campaigns with advanced targeting options.",
    color: "text-orange-500"
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features for Modern Businesses</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to transform your customer communication and grow your business with WhatsApp.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="bg-background p-8 rounded-2xl border border-border hover-scale"
                data-testid={`card-feature-${index}`}
              >
                <div className={`w-12 h-12 bg-${feature.color.split('-')[1]}-500/10 rounded-lg flex items-center justify-center mb-6`}>
                  <IconComponent className={`text-2xl ${feature.color}`} size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
