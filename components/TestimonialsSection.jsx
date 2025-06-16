/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Environmental Director",
      company: "GreenTech Corp",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b593?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "EcoSphere transformed our approach to sustainability. Their AI-powered insights helped us reduce our carbon footprint by 40% in just one year.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Sustainability Manager",
      company: "Innovation Labs",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "The platform's comprehensive tracking and verified offset projects gave us the confidence to commit to carbon neutrality by 2025.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Chief Operations Officer",
      company: "Sustainable Ventures",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "Working with EcoSphere has been game-changing. Their API integration made it seamless to embed sustainability into our core operations.",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 relative bg-green-900">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Happy customers"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-400/20" />
            </div>
            
            {/* Floating testimonial count */}
            <div className="absolute -top-8 -right-8 bg-white rounded-2xl p-6 shadow-lg animate-float">
              <div className="text-3xl font-bold text-primary">1000+</div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
          </div>

          {/* Testimonials Side */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our <span className="text-green-300">Clients</span> Say
            </h2>
            <p className="text-xl text-green-100 mb-12">
              Hear from organizations that have transformed their environmental impact with our platform
            </p>
            
            <Card className="bg-white/10 backdrop-blur-sm border-green-300/20 text-white">
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <Quote className="w-12 h-12 text-green-300" />
                </div>
                
                <blockquote className="text-lg leading-relaxed mb-6 text-center">
                  &quot;{testimonials[currentTestimonial].quote}&quot;
                </blockquote>
                
                <div className="flex items-center justify-center gap-4">
                  <img 
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-white">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-green-200 text-sm">
                      {testimonials[currentTestimonial].role}
                    </div>
                    <div className="text-green-300 text-sm">
                      {testimonials[currentTestimonial].company}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevTestimonial}
                    className="border-green-300/20 text-white hover:bg-green-300/20"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextTestimonial}
                    className="border-green-300/20 text-white hover:bg-green-300/20"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex justify-center gap-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        index === currentTestimonial ? 'bg-green-300' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;