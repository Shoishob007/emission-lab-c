"use client";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import CalculatorSection from "@/components/CalculatorSection";
import SolutionsSection from "@/components/SolutionsSection";
import ApiSection from "@/components/ApiSection";
import ProjectsSection from "@/components/ProjectsSection";
import FactsAndEnvironmentSection from "@/components/EnvironmentSection";
import FactsSection from "@/components/FactsSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import DonateSection from "@/components/DonateSection";
import FaqSection from "@/components/FaqSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CarbonEmissionWorldMap from "@/components/map/page";
import BlogSection from "@/components/BlogSection";
import AiSection from "@/components/AiSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import { Leaf, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

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
      <SolutionsSection />
      <CalculatorSection />
      <AiSection />
      <ApiSection />
      {/* <WhatWeDoSection /> */}
      {/* <HowItWorksSection /> */}
      <WhyChooseUsSection />
      <ProjectsSection />
      <BlogSection />
      <FaqSection />
      {/* <ServicesSection /> */}
      <FactsAndEnvironmentSection />
      <CarbonEmissionWorldMap />

      <AboutSection />
      {/* <FactsSection /> */}
      {/* <DonateSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <PricingSection /> */}

      <ContactSection />
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
