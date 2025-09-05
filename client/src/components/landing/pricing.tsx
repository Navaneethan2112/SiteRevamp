import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoginButton } from '@/components/auth/login-button';
import { useLanguage } from '@/contexts/language-context';
import { useCurrency } from '@/contexts/currency-context';

const plans = [
  {
    name: "Starter",
    description: "Perfect for small businesses getting started",
    pricing: {
      USD: { amount: 79, symbol: "$" },
      AED: { amount: 299, symbol: "AED " },
      INR: { amount: 2999, symbol: "₹" }
    },
    period: "/month",
    features: [
      "5,000 messages/month",
      "Basic chatbot automation",
      "WhatsApp Business API",
      "Email support",
      "10 approved templates",
      "Campaign scheduling",
      "Basic analytics"
    ],
    popular: false
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses with advanced needs",
    pricing: {
      USD: { amount: 199, symbol: "$" },
      AED: { amount: 749, symbol: "AED " },
      INR: { amount: 7999, symbol: "₹" }
    },
    period: "/month",
    features: [
      "25,000 messages/month",
      "AI-powered chatbot",
      "Bulk messaging campaigns",
      "Advanced campaign management",
      "Comprehensive analytics dashboard",
      "Priority support (24/7)",
      "50+ approved templates",
      "Multi-media support",
      "Contact segmentation",
      "API access"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    description: "For large organizations with custom requirements",
    pricing: {
      USD: { amount: "Custom", symbol: "" },
      AED: { amount: "Custom", symbol: "" },
      INR: { amount: "Custom", symbol: "" }
    },
    period: "",
    features: [
      "Unlimited messages",
      "Custom chatbot development",
      "White-label solution",
      "Dedicated account manager",
      "24/7 phone support",
      "Custom integrations & API",
      "Multi-location management",
      "Advanced reporting & analytics",
      "Custom templates & branding",
      "SLA guarantees",
      "On-premise deployment option"
    ],
    popular: false
  }
];

export function Pricing() {
  const { t } = useLanguage();
  const { currency } = useCurrency();

  return (
    <section id="pricing" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">{t('pricingTitle')}</h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t('pricingDescription')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`p-6 sm:p-8 rounded-2xl border hover-scale relative ${
                plan.popular 
                  ? 'bg-primary/5 border-2 border-primary' 
                  : 'bg-background border-border'
              }`}
              data-testid={`card-plan-${plan.name.toLowerCase()}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
{t('mostPopular')}
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{t(plan.name.toLowerCase())}</h3>
              <p className="text-muted-foreground mb-6">{t(plan.name.toLowerCase() + 'Desc')}</p>
              <div className="mb-8">
                <span className="text-4xl font-bold" data-testid={`text-price-${plan.name.toLowerCase()}`}>
                  {plan.pricing[currency as keyof typeof plan.pricing].symbol}
                  {plan.pricing[currency as keyof typeof plan.pricing].amount}
                </span>
                <span className="text-muted-foreground">{plan.period === '/month' ? t('month') : plan.period}</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="text-green-500 flex-shrink-0" size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={plan.name === 'Enterprise' ? "outline" : (plan.popular ? "default" : "outline")}
                className={`w-full ${
                  plan.name === 'Enterprise' ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground' :
                  plan.popular 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                }`}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                data-testid={`button-${plan.name === 'Enterprise' ? 'contact-sales' : 'get-started'}`}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Request Demo'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
