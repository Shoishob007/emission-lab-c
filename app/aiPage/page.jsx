/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Brain,
  ArrowRight,
  TrendingUp,
  Zap,
  Target,
  BarChart3,
  Bot,
  Lightbulb,
  Settings,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";

// Data
const aiFeatureList = [
  {
    title: "Automated Emissions Detection",
    description:
      "AI connects with your tools (ERP, travel systems, utility data) to track emissions — no manual work required.",
    icon: <Bot className="w-6 h-6 text-secondary" />,
  },
  {
    title: "Personalized Reduction Recommendations",
    description:
      "Get smart suggestions on how to reduce your footprint based on your lifestyle, travel patterns, or business operations.",
    icon: <Target className="w-6 h-6 text-secondary" />,
  },
  {
    title: "Predictive Climate Insights",
    description:
      "See how your choices affect long-term carbon trends — with clear simulations and outcome forecasting.",
    icon: <TrendingUp className="w-6 h-6 text-secondary" />,
  },
  {
    title: "Offset Optimization",
    description:
      "AI matches you with the most impactful, verified carbon offset projects based on your footprint and values.",
    icon: <Globe className="w-6 h-6 text-secondary" />,
  },
  {
    title: "Continuous Improvement Engine",
    description:
      "The more you use it, the smarter it gets — adapting to your habits and improving recommendations over time.",
    icon: <Zap className="w-6 h-6 text-secondary" />,
  },
];

const businessHelp = [
  "Get prediction and recommendation of environmental impact data by your business",
  "Track team and production level emissions",
  "AI-powered dashboards for sustainability planning",
  "Integrates seamlessly with enterprise tools (API ready)",
];

const regenerativeList = [
  "Real-time insights",
  "Continuous optimization",
  "Science-based decisions",
];

const aiCapabilities = [
  {
    icon: <BarChart3 className="w-8 h-8 text-secondary" />,
    title: "Smart Analytics",
    description: "Advanced data processing for actionable insights",
  },
  {
    icon: <Settings className="w-8 h-8 text-secondary" />,
    title: "Auto Integration",
    description: "Seamless connection with existing systems",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-secondary" />,
    title: "Intelligent Recommendations",
    description: "Personalized suggestions based on your data",
  },
];

export default function AiPage() {
  return (
    <section
      id="ai"
      className="min-h-[100vh] py-14 px-2 font-['Montserrat','Arial','Helvetica',sans-serif] bg-white"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* HERO SECTION */}
        <div className="w-full max-w-5xl mx-auto mb-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 max-w-[600px] flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
                    <Brain size={22} strokeWidth={2} className="text-primary" />
                  </span>
                <span className="uppercase text-primary tracking-widest text-xs font-semibold">
                  Artificial Intelligence
                </span>
              </div>
              <h1 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight mb-3 capitalize">
                AI-Powered <span className="text-primary">Sustainability</span>
              </h1>
              {/* <p className="font-semibold text-[#767676] text-base sm:text-lg leading-tight mb-4">
                Smarter Climate Action Starts with Intelligence
              </p> */}
              <p className="text-base md:text-lg text-[#767676] mb-6 leading-relaxed max-w-xl">
                We use the power of AI and machine learning to help individuals
                and businesses make data-driven, impactful climate decisions —
                in real time.
              </p>

              {/* AI Capabilities */}
              <div className="flex items-center gap-0 sm:gap-3 justify-between w-full mb-6 px-2 sm:px-0">
                {aiCapabilities.map((cap, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col items-center text-center min-w-[80px]">
                      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#F7F7F7] shadow-inner border border-[#eaeaea] mb-2">
                        {cap.icon}
                      </div>
                      <span className="font-semibold text-xs text-[#163820] mb-1">
                        {cap.title}
                      </span>
                      <span className="text-[11px] text-[#767676]">
                        {cap.description}
                      </span>
                    </div>
                    {/* {i < aiCapabilities.length - 1 && (
                      <div className="hidden sm:block h-1 w-8 bg-gradient-to-r from-primary to-secondary rounded-full mx-1" />
                    )} */}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
              <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
                <DotLottieReact
                  src="https://lottie.host/40155ee2-cb11-48b0-a9e7-5dd5a35f883f/YocZp2ejdG.lottie"
                  loop
                  autoplay
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* AI FEATURES SHOWCASE */}
        <div className="">
          {/* Grid: Left */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* LEFT: Business Help + Regenerative Future */}
            <div className="w-full flex flex-col-reverse sm:flex-col gap-10 order-2 sm:order-1">
              <div className="relative flex items-center justify-center">
                <img
                  src="https://res.cloudinary.com/dmazsiqdy/image/upload/v1751539519/emisison-lab/2147717388_cupqx6.jpg"
                  alt="API Integration"
                  className="rounded-full w-full max-w-[350px] object-cover aspect-square bg-white shadow"
                />
              </div>
              {/* Business Help */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
                    <BarChart3
                      size={20}
                      strokeWidth={2}
                      className="text-primary"
                    />
                  </span>
                  <span className="font-bold text-[#163820] text-lg">
                    Get help For Businesses
                  </span>
                </div>
                {businessHelp.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 mb-1">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full">
                      <ArrowRight className="w-[18px] h-[18px] text-btn-primary" />
                    </span>
                    <span className="text-[#767676] text-base font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              {/* Built for Regenerative Future */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
                    <Globe size={20} strokeWidth={2} className="text-primary" />
                  </span>
                  <span className="font-bold text-[#163820] text-lg">
                    Built for a Regenerative Future
                  </span>
                </div>
                {regenerativeList.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 mb-1">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full">
                      <ArrowRight className="w-[18px] h-[18px] text-btn-primary" />
                    </span>
                    <span className="text-[#767676] text-base font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: AI Features */}
            <div className="w-full flex flex-col items-center order-1 sm:order-2">
              {/* Main header/intro */}
              <div className="w-full max-w-[520px] mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
                    <Brain size={22} strokeWidth={2} className="text-primary" />
                  </span>
                  <span className="uppercase text-primary tracking-widest text-xs font-semibold">
                    What AI Does for You
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#163820] mb-1">
                  Discover Powerful{" "}
                  <span className="text-primary">AI Features</span>
                </h2>
                <p className="text-base text-[#767676]">
                  Each feature below helps you or your business take climate
                  action with less effort and greater impact.
                </p>
              </div>
              <div className="w-full max-w-[520px] bg-[#F7F7F7] rounded-2xl px-1 py-3 sm:px-6 sm:py-6 shadow-sm flex flex-col gap-2">
                {aiFeatureList.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4 py-3">
                    <div className="flex items-center justify-center bg-white rounded-full w-10 h-10 flex-shrink-0">
                      {React.cloneElement(feature.icon, {
                        className: "w-5 h-5 text-secondary",
                      })}
                    </div>
                    <div>
                      <div className="font-bold text-[#163820] text-base mb-1">
                        {feature.title}
                      </div>
                      <div className="text-[#767676] text-sm">
                        {feature.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        {/* <div className="w-full flex flex-col items-center justify-center mb-2">
          <div className="bg-primary/20 border border-[#e2f0e4] rounded-3xl py-10 px-2 sm:px-6 shadow flex flex-col items-center w-full max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#163820] mb-2 text-center capitalize">
              Ready to supercharge your climate journey with AI?
            </h3>
            <p className="text-[#767676] text-lg text-center mb-6">
              👉 Get started today and let intelligent automation guide your
              sustainability efforts.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#FFA726] hover:bg-[#ffb84d] transition text-white font-bold py-3 px-4 sm:px-8 rounded-full text-lg shadow-lg shadow-[#FFA72633] focus:ring-4 focus:ring-[#FFA72644] animate-bounce"
              style={{ letterSpacing: "0.02em" }}
            >
              Talk to AI Experts <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div> */}
      </div>
    </section>
  );
}
