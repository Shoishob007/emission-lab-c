import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FaqSection = () => {
  const [openItems, setOpenItems] = useState([0]);

  const toggleItem = (index) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "How accurate are your carbon footprint calculations?",
      answer: "Our calculations are based on internationally recognized methodologies and updated emission factors from leading climate research institutions. We achieve 95%+ accuracy for most calculations and continuously improve our algorithms based on the latest scientific data."
    },
    {
      question: "What types of carbon offset projects do you support?",
      answer: "We support verified projects across multiple categories including renewable energy, reforestation, methane capture, and community-based initiatives. All projects are certified by recognized standards like Gold Standard, VCS, or CDM."
    },
    {
      question: "How can I integrate your API into my business?",
      answer: "Our RESTful API is designed for easy integration with comprehensive documentation, SDKs for popular programming languages, and dedicated developer support. Most implementations can be completed within a few hours."
    },
    {
      question: "Do you offer solutions for large enterprises?",
      answer: "Yes, we provide enterprise-grade solutions including custom integrations, dedicated support, advanced reporting, and white-label options. Contact our enterprise team for a tailored solution."
    },
    {
      question: "How do you ensure the quality of offset projects?",
      answer: "We conduct thorough due diligence on all projects, including on-site verification, third-party audits, and continuous monitoring. We only work with projects that meet stringent additionality and permanence criteria."
    },
    {
      question: "Can I track the impact of my contributions?",
      answer: "Absolutely! Our platform provides detailed tracking and reporting on your environmental impact, including real-time project updates, impact metrics, and personalized sustainability insights."
    },
    {
      question: "What is your pricing model?",
      answer: "We offer flexible pricing based on usage, from individual subscriptions to enterprise packages. Carbon offsets are priced competitively starting from $15 per ton of CO₂, with volume discounts available."
    },
    {
      question: "How does your AI-powered recommendation system work?",
      answer: "Our AI analyzes your carbon footprint data, lifestyle patterns, and industry benchmarks to provide personalized recommendations. The system learns from your actions and continuously optimizes suggestions for maximum impact."
    }
  ];

  return (
    <section className="py-20 relative">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.02
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about our carbon management platform
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-border/50">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-primary/5 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-foreground pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openItems.includes(index) ? (
                        <Minus className="w-5 h-5 text-primary" />
                      ) : (
                        <Plus className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </button>
                  
                  {openItems.includes(index) && (
                    <div className="px-6 pb-6 animate-fadeInUp">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;