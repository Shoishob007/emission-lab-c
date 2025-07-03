"use client";
import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getFaqs } from "@/utils/api/getFaqs";

export default function FaqSection() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openItems, setOpenItems] = useState([0]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getFaqs();
        setFaqs(result);
      } catch {
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const toggleItem = (index) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section
      id="faq"
      className="relative py-8 md:py-20 bg-white overflow-x-hidden flex justify-center items-center"
      style={{
        backgroundImage: "url('/city1.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "650px",
      }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          pointerEvents: "none",
          background:
            "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.8) 100%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight capitalize">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about our carbon management platform
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                Loading FAQs...
              </div>
            ) : faqs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No FAQs found.
              </div>
            ) : (
              faqs.map((faq, index) => (
                <Card
                  key={faq.id}
                  className="group hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-border/50"
                >
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
                      <div className="px-6 pt-2 pb-2 animate-fadeInUp">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}