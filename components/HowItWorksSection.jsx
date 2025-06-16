/* eslint-disable @next/next/no-img-element */
import { Search, Calculator, TrendingDown, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Search className="w-16 h-16 text-primary" />,
      title: "1. Assess Your Impact",
      description: "Complete our comprehensive carbon footprint assessment to understand your current environmental impact across all areas of life.",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: <Calculator className="w-16 h-16 text-secondary" />,
      title: "2. Get Your Results",
      description: "Receive detailed analytics and personalized insights about your carbon emissions with actionable recommendations for reduction.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: <TrendingDown className="w-16 h-16 text-primary" />,
      title: "3. Reduce Emissions",
      description: "Implement our AI-powered reduction strategies and track your progress with real-time monitoring and expert guidance.",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <CheckCircle className="w-16 h-16 text-secondary" />,
      title: "4. Offset & Monitor",
      description: "Invest in verified carbon offset projects and continuously monitor your environmental impact with detailed reporting.",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="py-20 relative bg-slate-50/50">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.02
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our streamlined process makes carbon management simple, effective, and accessible for everyone
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-white/90 backdrop-blur-sm border-border/50 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="text-white group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;