import { Code, Zap, Globe, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ApiSection = () => {
  const features = [
    {
      icon: <Code className="w-8 h-8 text-primary" />,
      title: "RESTful API",
      description: "Simple, intuitive endpoints for seamless integration"
    },
    {
      icon: <Zap className="w-8 h-8 text-secondary" />,
      title: "Real-time Data",
      description: "Live carbon calculations and offset tracking"
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "Global Coverage",
      description: "Worldwide emission factors and offset projects"
    },
    {
      icon: <Shield className="w-8 h-8 text-secondary" />,
      title: "Enterprise Security",
      description: "Bank-level encryption and data protection"
    }
  ];

  return (
    <section id="api" className="py-20 relative">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.03
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful <span className="text-primary">API</span> Integration
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Integrate carbon measurement and offsetting capabilities directly into your business workflows with our robust APIs
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Build Sustainable <span className="text-secondary">Applications</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our comprehensive API suite enables developers to embed environmental consciousness 
              directly into their applications, making sustainability accessible to millions of users.
            </p>
            
            <div className="grid gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              View Documentation
            </Button>
          </div>

          <div className="relative">
            <Card className="bg-slate-900 text-white border-none shadow-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="ml-4 text-sm text-gray-400">api.ecosphere.com</span>
                </div>
                
                <div className="space-y-4 text-sm font-mono">
                  <div>
                    <span className="text-blue-400">POST</span>
                    <span className="text-gray-300"> /api/calculate</span>
                  </div>
                  <div className="text-gray-300">
                    {`{
  "transport": {
    "distance": 1200,
    "mode": "car"
  },
  "energy": {
    "consumption": 450,
    "source": "grid"
  }
}`}
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="text-green-400">Response:</div>
                    <div className="text-gray-300">
                      {`{
  "carbonFootprint": 2.1,
  "unit": "tons_co2",
  "breakdown": {
    "transport": 1.2,
    "energy": 0.9
  }
}`}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full animate-float" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary/20 rounded-full animate-float-leaf" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApiSection;