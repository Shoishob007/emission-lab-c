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
    icon: <Calculator className="w-9 h-9 text-primary" />,
    hoverIcon: <Calculator className="w-9 h-9 text-white/90" />,
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
    icon: <TrendingDown className="w-9 h-9 text-primary" />,
    hoverIcon: <TrendingDown className="w-9 h-9 text-white/90" />,
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
    icon: <TreePine className="w-9 h-9 text-primary" />,
    hoverIcon: <TreePine className="w-9 h-9 text-white/90" />,
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
    icon: <Shield className="w-9 h-9 text-primary" />,
    hoverIcon: <Shield className="w-9 h-9 text-white/90" />,
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
    icon: <Handshake className="w-9 h-9 text-primary" />,
    hoverIcon: <Handshake className="w-9 h-9 text-white/90" />,
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
      className="relative py-20 bg-white flex justify-center items-center overflow-x-hidden overflow-y-auto"
      style={{
        minHeight: "650px",
        backgroundImage: "url('/city1-rotated.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay */}
      <div
        className="absolute inset-0"
        style={{
          pointerEvents: "none",
          background:
            "linear-gradient(to top right, rgba(255,255,255,0.85) 0%, rgba(255,255,255,1) 60%, rgba(255,255,255,1) 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4">
        {/*  header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-14 gap-6 md:gap-0 px-4">
          <div className="sm:text-center md:text-left max-w-2xl">
            <div className="flex items-center gap-2 mb-3 justify-start">
              <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
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

        <div className="flex flex-row flex-wrap justify-center gap-7">
  {services.map((service, idx) => (
    <div
      key={service.title}
      className="
        group relative rounded-3xl border-2 border-[#EAEAEA] bg-white
        transition-all duration-500 hover:bg-[#97D34B] hover:border-[#97D34B] hover:shadow-xl cursor-pointer
        w-[340px] min-h-[270px] flex flex-col
      "
    >
      <div className="p-6 flex flex-col h-full">
        {/* ICON + TITLE ROW */}
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-full bg-[#EAFDD5] group-hover:bg-[#78B943] transition-colors duration-300 w-fit">
            <span className="block group-hover:hidden">
              {service.icon}
            </span>
            <span className="hidden group-hover:block">
              {service.hoverIcon}
            </span>
          </div>
          <h3 className="text-xl font-bold text-[#163820] group-hover:text-white transition-colors duration-300">
            {service.title}
          </h3>
        </div>
        {/* DESC */}
        <p className="text-[#767676] group-hover:text-white/90 transition-colors duration-300">
          {service.description}
        </p>
      </div>
    </div>
  ))}
</div>
      </div>
    </section>
  );
}
