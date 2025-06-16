"use client";
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import CalculatorSection from '@/components/CalculatorSection';
import SolutionsSection from '@/components/SolutionsSection';
import ApiSection from '@/components/ApiSection';
import ProjectsSection from '@/components/ProjectsSection';
import EnvironmentSection from '@/components/EnvironmentSection';
import FactsSection from '@/components/FactsSection';
import WhatWeDoSection from '@/components/WhatWeDoSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import DonateSection from '@/components/DonateSection';
import FaqSection from '@/components/FaqSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogSection from '@/components/BlogSection';
import PricingSection from '@/components/PricingSection';
import FooterSection from "@/components/FooterSection";
import { Leaf, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const HomeSection = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <CalculatorSection />
      <SolutionsSection />
      <ApiSection />
      <ProjectsSection />
      <EnvironmentSection />
      <FactsSection />
      <WhatWeDoSection />
      <HowItWorksSection />
      <DonateSection />
      <FaqSection />
      <TestimonialsSection />
      <BlogSection />
      <PricingSection />
      {/* <ContactSection /> */}

      {/* Footer */}
      <FooterSection />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 z-50 bg-primary hover:bg-primary/90 shadow-lg animate-float"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};

export default HomeSection;
