import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoginButton } from '@/components/auth/login-button';

const plans = [
  {
    name: "Starter",
    description: "Perfect for small businesses getting started",
    price: "₹2,999",
    period: "/month",
    features: [
      "1,000 messages/month",
      "Basic chatbot",
      "WhatsApp API integration",
      "Email support",
      "5 approved templates"
    ],
    popular: false
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses",
    price: "₹7,999",
    period: "/month",
    features: [
      "10,000 messages/month",
      "Advanced chatbot with AI",
      "Bulk messaging",
      "Campaign management",
      "Analytics dashboard",
      "Priority support",
      "25 approved templates",
      "Facebook Business integration"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    description: "For large organizations with complex needs",
    price: "Custom",
    period: "",
    features: [
      "Unlimited messages",
      "Custom integrations",
      "Dedicated account manager",
      "24/7 phone support",
      "Custom templates",
      "Multi-location support",
      "Advanced analytics",
      "White-label solution"
    ],
    popular: false
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your business needs. All plans include our core features and 24/7 support.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`p-8 rounded-2xl border hover-scale relative ${
                plan.popular 
                  ? 'bg-primary/5 border-2 border-primary' 
                  : 'bg-background border-border'
              }`}
              data-testid={`card-plan-${plan.name.toLowerCase()}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <div className="mb-8">
                <span className="text-4xl font-bold" data-testid={`text-price-${plan.name.toLowerCase()}`}>
                  {plan.price}
                </span>
                <span className="text-muted-foreground">{plan.period}</span>
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
