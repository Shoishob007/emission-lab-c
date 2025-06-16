import { Calculator, TrendingDown, Zap, Leaf, Shield, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const WhatWeDoSection = () => {
  const services = [
    {
      icon: <Calculator className="w-12 h-12 text-primary" />,
      title: "Carbon Footprint Analysis",
      description: "Comprehensive assessment of your environmental impact with detailed reporting.",
      features: ["Real-time tracking", "Detailed analytics", "Custom reports"]
    },
    {
      icon: <TrendingDown className="w-12 h-12 text-secondary" />,
      title: "Emission Reduction Plans",
      description: "Personalized strategies to minimize your carbon footprint effectively.",
      features: ["AI-powered insights", "Progress monitoring", "Expert guidance"]
    },
    {
      icon: <Zap className="w-12 h-12 text-primary" />,
      title: "Carbon Offset Solutions",
      description: "Invest in verified projects to neutralize your environmental impact.",
      features: ["Verified projects", "Global portfolio", "Impact tracking"]
    }
  ];

  const highlights = [
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Certified & Verified",
      description: "All our solutions meet international environmental standards"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Expert Support",
      description: "Dedicated team of environmental scientists and consultants"
    },
    {
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      title: "Measurable Impact",
      description: "Track and verify your positive environmental contributions"
    }
  ];

  return (
    <section className="py-20 relative">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.03
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What We <span className="text-primary">Do</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive environmental solutions designed to make sustainability accessible and actionable for everyone
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Cards Side */}
          <div className="space-y-6">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-border/50 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Important Notes Side */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Why Our <span className="text-secondary">Approach</span> Works
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We combine cutting-edge technology with scientific rigor to deliver 
                environmental solutions that create real, measurable impact. Our platform 
                is designed for scalability and accuracy.
              </p>
            </div>
            
            <div className="space-y-6">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {highlight.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {highlight.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-green-gradient rounded-2xl p-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">15M+</div>
                <div className="text-muted-foreground">Tons of CO₂ Offset</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;