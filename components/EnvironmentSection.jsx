/* eslint-disable @next/next/no-img-element */

import { Leaf, TreePine, Droplets, Wind } from 'lucide-react';

const EnvironmentSection = () => {
  const contributions = [
    {
      icon: <TreePine className="w-6 h-6 text-green-600" />,
      title: "2.5M+ Trees Planted",
      description: "Across 15 countries in reforestation projects"
    },
    {
      icon: <Droplets className="w-6 h-6 text-blue-600" />,
      title: "Water Conservation",
      description: "50M liters saved through smart management systems"
    },
    {
      icon: <Wind className="w-6 h-6 text-green-600" />,
      title: "Clean Energy",
      description: "250MW renewable energy capacity installed"
    },
    {
      icon: <Leaf className="w-6 h-6 text-blue-600" />,
      title: "Carbon Offset",
      description: "15M tons CO₂ neutralized through verified projects"
    }
  ];

  return (
    <section className="py-20 relative">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.04
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Overlapped Images */}
          <div className="relative">
            <div className="relative">
              <div className="w-80 h-80 rounded-3xl overflow-hidden shadow-2xl">
                <img 
src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"                  alt="Forest conservation"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 rounded-3xl overflow-hidden shadow-2xl">
                <img 
src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"                  alt="Solar energy"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            
            {/* Floating stats */}
            <div className="absolute top-8 -left-8 bg-white rounded-2xl p-4 shadow-lg animate-float">
              <div className="text-2xl font-bold text-green-600">98%</div>
              <div className="text-xs text-gray-600">Project Success</div>
            </div>
            <div className="absolute bottom-20 -left-12 bg-white rounded-2xl p-4 shadow-lg animate-float-leaf">
              <div className="text-2xl font-bold text-blue-600">120+</div>
              <div className="text-xs text-gray-600">Countries</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Environmental <span className="text-primary">Contribution</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Making a measurable difference in the fight against climate change through 
              innovative solutions and verified environmental projects worldwide.
            </p>
            
            <div className="space-y-6">
              {contributions.map((contribution, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {contribution.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                      {contribution.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {contribution.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnvironmentSection;