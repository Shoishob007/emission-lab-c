/* eslint-disable @next/next/no-img-element */
import {
  Calculator,
  TrendingDown,
  Leaf,
  Shield,
  TreePine,
  Handshake,
} from "lucide-react";

const services = [
  {
    icon: <Calculator className="w-7 h-7 text-primary" />,
    hoverIcon: <Calculator className="w-7 h-7 text-white/90" />,
    title: "Calculate Emissions",
    description:
      "Track carbon emissions across travel, energy, operations, supply chain, and more. Our tools support individuals, teams, and organizations through intuitive dashboards and robust APIs.",
    features: [
      "Travel, energy, operations, supply chain",
      "Dashboards & robust APIs",
      "For individuals, teams & organizations",
    ],
  },
  {
    icon: <TrendingDown className="w-7 h-7 text-primary" />,
    hoverIcon: <TrendingDown className="w-7 h-7 text-white/90" />,
    title: "Reduce",
    description:
      "Leverage AI-driven insights to optimize energy use, promote sustainable choices, and guide your journey to lower emissions — backed by automated tracking and actionable tips.",
    features: [
      "AI-driven optimization",
      "Sustainable choices",
      "Automated tracking & tips",
    ],
  },
  {
    icon: <TreePine className="w-7 h-7 text-primary" />,
    hoverIcon: <TreePine className="w-7 h-7 text-white/90" />,
    title: "Offset",
    description:
      "Offset unavoidable emissions by supporting verified carbon projects — from forest restoration and renewable energy to clean water and sustainable agriculture.",
    features: [
      "Support verified projects",
      "Forest, energy, water, agriculture",
      "Offset unavoidable emissions",
    ],
  },
  {
    icon: <Shield className="w-7 h-7 text-primary" />,
    hoverIcon: <Shield className="w-7 h-7 text-white/90" />,
    title: "Enable Integration",
    description:
      "With powerful APIs, we integrate with your existing systems — from logistics to cloud infrastructure — making climate action seamless and intelligent.",
    features: [
      "Robust API integration",
      "Works with logistics & cloud",
      "Seamless, intelligent automation",
    ],
  },
  {
    icon: <Handshake className="w-7 h-7 text-primary" />,
    hoverIcon: <Handshake className="w-7 h-7 text-white/90" />,
    title: "Partnering with Business",
    description:
      "With believe, help and row together. We integrate and support Airlines & OTAs, Enterprise Application, Travel & Logistics Platforms.",
    features: [
      "Airlines & OTAs",
      "Enterprise Applications",
      "Travel & Logistics Platforms",
    ],
  },
];

export default function WhatWeDoSection() {
  return (
    <section
      id="what-we-do"
      className="relative py-16 md:py-20 bg-white flex justify-center items-center overflow-x-hidden"
    >
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 md:gap-0">
          <div className="text-center md:text-left max-w-4xl">
            <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
              <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
                <Leaf size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-semibold">
                What We Do
              </span>
            </div>
            <h2 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight capitalize">
              Innovative <span className="text-primary">Solutions</span> for a
              Sustainable Future!
            </h2>
          </div>
        </div>

        {/* Services Grid - Responsive Layout */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service, idx) => (
            <div
              key={service.title}
              className={`
                group relative rounded-xl border border-[#E0E0E0] bg-white/90
                transition-all duration-400 hover:bg-[#97D34B] hover:shadow-lg hover:border-[#97D34B]
                w-full flex flex-col items-center p-5 shadow-sm
                min-h-[250px] h-full
              `}
              style={{
                boxShadow: "0 2px 16px 0 rgba(151, 211, 75, 0.08)",
              }}
            >
              {/* Icon */}
              <div className="mb-4 flex items-center justify-center rounded-full bg-[#EAFDD5] group-hover:bg-[#78B943] transition-colors duration-200 w-12 h-12 mx-auto shadow">
                <span className="block group-hover:hidden">{service.icon}</span>
                <span className="hidden group-hover:block">
                  {service.hoverIcon}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-lg font-bold text-[#163820] group-hover:text-white transition-colors duration-300 mb-3 text-center">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-base sm:text-sm text-[#767676] group-hover:text-white/90 transition-colors duration-300 text-center">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
