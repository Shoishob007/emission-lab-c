import { Brain, Lightbulb, Target, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SolutionsSection = () => {
  const solutions = [
    {
      icon: <Target className="w-12 h-12 text-primary" />,
      title: "Calculate",
      subtitle: "Measure Your Impact",
      description: "Comprehensive carbon footprint analysis across all areas of your life and business operations.",
      features: ["Real-time tracking", "Detailed reporting", "Historical data"],
      color: "primary"
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-secondary" />,
      title: "Reduce",
      subtitle: "Smart Recommendations",
      description: "AI-powered insights and actionable recommendations to minimize your environmental impact.",
      features: ["Personalized plans", "Progress tracking", "Expert guidance"],
      color: "secondary"
    },
    {
      icon: <Brain className="w-12 h-12 text-primary" />,
      title: "Offset",
      subtitle: "Verified Projects",
      description: "Invest in certified carbon offset projects that create real environmental and social impact.",
      features: ["Verified projects", "Transparent tracking", "Impact reports"],
      color: "primary"
    }
  ];

  return (
    <section id="solutions" className="py-20 relative">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.04
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Complete <span className="text-primary">Carbon Management</span> Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From measurement to action - our comprehensive platform guides you through every step of your sustainability journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-4 bg-white/90 backdrop-blur-sm border-border/50 relative overflow-hidden">
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${solution.color === 'primary' ? 'from-primary/5 to-primary/10' : 'from-secondary/5 to-secondary/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <CardContent className="p-8 relative z-10">
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {solution.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {solution.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    {solution.subtitle}
                  </p>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6 text-center">
                  {solution.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${solution.color === 'primary' ? 'bg-primary' : 'bg-secondary'}`} />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Section */}
        <Card className="bg-blue-gradient border-border/50 shadow-xl">
          <CardContent className="p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="w-8 h-8 text-secondary" />
                  <h3 className="text-3xl font-bold text-foreground">
                    AI-Powered Sustainability
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Harness the power of artificial intelligence to optimize your carbon reduction strategies. 
                  Our advanced algorithms analyze your data to provide personalized recommendations and predict 
                  the most effective pathways to carbon neutrality.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span className="text-muted-foreground">Machine learning optimization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span className="text-muted-foreground">Predictive analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span className="text-muted-foreground">Automated reporting</span>
                  </div>
                </div>
                <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                  Explore AI Features
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              
              <div className="relative">
                <div className="w-full h-64 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl flex items-center justify-center">
                  <Brain className="w-24 h-24 text-secondary/60 animate-float" />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-secondary/20 rounded-full animate-float-leaf" />
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary/20 rounded-full animate-grow" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SolutionsSection;