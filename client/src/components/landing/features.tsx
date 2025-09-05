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
    title: "Enterprise WhatsApp API",
    description: "Official WhatsApp Business API integration with enterprise-grade reliability, compliance monitoring, and 99.9% uptime SLA for mission-critical communications.",
    color: "text-primary"
  },
  {
    icon: Bot,
    title: "AI-Powered Chatbots",
    description: "Intelligent conversational AI that handles complex customer inquiries, lead qualification, and support automation 24/7 with natural language processing.",
    color: "text-purple-500"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics & BI",
    description: "Comprehensive business intelligence dashboard with real-time metrics, conversion tracking, ROI analysis, and customizable reporting for data-driven decisions.",
    color: "text-green-500"
  },
  {
    icon: Send,
    title: "Bulk Campaign Management",
    description: "Execute large-scale messaging campaigns with advanced segmentation, A/B testing, delivery optimization, and compliance monitoring for maximum ROI.",
    color: "text-blue-500"
  },
  {
    icon: Shield,
    title: "Compliance & Security",
    description: "ISO 27001 certified platform with GDPR compliance, end-to-end encryption, message auditing, and regulatory adherence for UAE and India markets.",
    color: "text-amber-500"
  },
  {
    icon: Megaphone,
    title: "Multi-Channel Integration",
    description: "Seamlessly integrate with CRM systems, helpdesks, marketing automation platforms, and ERP systems for unified customer communication workflows.",
    color: "text-orange-500"
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Enterprise-Grade WhatsApp Business Solutions</h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Comprehensive WhatsApp Business API platform designed for enterprises across UAE and India. 
            Features advanced automation, AI-powered chatbots, and enterprise integrations with guaranteed SLAs.
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
