/* eslint-disable @next/next/no-img-element */
import { Award, Users, Globe, TrendingUp } from 'lucide-react';

const FactsSection = () => {
  const facts = [
    { icon: <Award className="w-8 h-8" />, number: "15+", label: "Awards Won", color: "text-yellow-400" },
    { icon: <Users className="w-8 h-8" />, number: "2M+", label: "Active Users", color: "text-green-400" },
    { icon: <Globe className="w-8 h-8" />, number: "120+", label: "Countries", color: "text-blue-400" },
    { icon: <TrendingUp className="w-8 h-8" />, number: "98%", label: "Success Rate", color: "text-purple-400" }
  ];

  return (
    <section className="py-20 relative bg-green-900">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 3D Image */}
          <div className="relative">
            <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl transform perspective-1000 rotate-y-12">
              <img 
                src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Environmental data visualization"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-400/20" />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-green-400/20 rounded-full animate-float backdrop-blur-sm" />
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-blue-400/20 rounded-full animate-float-leaf backdrop-blur-sm" />
          </div>

          {/* Content with numbers */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Impact by the <span className="text-green-300">Numbers</span>
            </h2>
            <p className="text-xl text-green-100 mb-12 leading-relaxed">
              Our commitment to environmental excellence is reflected in the measurable 
              impact we&apos;ve created across the globe through innovative sustainability solutions.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              {facts.map((fact, index) => (
                <div key={index} className="text-center group">
                  <div className={`flex justify-center mb-4 ${fact.color} group-hover:scale-110 transition-transform duration-300`}>
                    {fact.icon}
                  </div>
                  <div className="text-4xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors duration-300">
                    {fact.number}
                  </div>
                  <div className="text-green-100 text-sm">
                    {fact.label}
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

export default FactsSection;