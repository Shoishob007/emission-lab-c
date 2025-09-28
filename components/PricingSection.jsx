import { Check, ArrowRight, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PricingSection = () => {
  const plans = [
    {
      name: "Individual",
      price: "$9",
      period: "/month",
      description: "Perfect for personal carbon management",
      features: [
        "Personal carbon footprint tracking",
        "Basic reduction recommendations",
        "5 tons CO₂ offset included",
        "Monthly impact reports",
        "Mobile app access",
        "Email support"
      ],
      popular: false,
      buttonText: "Start Free Trial",
      buttonVariant: "outline"
    },
    {
      name: "Business",
      price: "$49",
      period: "/month",
      description: "Ideal for small to medium businesses",
      features: [
        "Team carbon footprint management",
        "Advanced AI recommendations",
        "25 tons CO₂ offset included",
        "Custom reporting & analytics",
        "API access (1000 calls/month)",
        "Priority support",
        "Sustainability certification",
        "White-label options"
      ],
      popular: true,
      buttonText: "Start Free Trial",
      buttonVariant: "default"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations and custom needs",
      features: [
        "Unlimited carbon tracking",
        "Custom AI model training",
        "Unlimited CO₂ offset credits",
        "Advanced integrations",
        "Unlimited API calls",
        "Dedicated account manager",
        "Custom compliance reporting",
        "SLA guarantees"
      ],
      popular: false,
      buttonText: "Contact Sales",
      buttonVariant: "outline"
    }
  ];

  return (
    <section className="py-20 relative">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.03
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary">Pricing</span> & Subscription
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your sustainability journey. All plans include our core features with different limits and support levels.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-border/50 ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground text-lg">{plan.period}</span>
                </div>
                <p className="text-muted-foreground">
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent className="px-8 pb-8">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.buttonVariant}
                  size="lg" 
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                >
                  {plan.buttonText}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-blue-gradient rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Start Your Free Trial Today
            </h3>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              All plans come with a 14-day free trial. No credit card required. 
              Cancel anytime. Experience the full power of our platform risk-free.
            </p>
            
            {/* <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">14 Days</div>
                <div className="text-muted-foreground">Free Trial</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-2">24/7</div>
                <div className="text-muted-foreground">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-muted-foreground">Uptime SLA</div>
              </div>
            </div> */}
            
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;