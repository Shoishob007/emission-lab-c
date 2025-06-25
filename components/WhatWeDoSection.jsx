/* eslint-disable @next/next/no-img-element */
import {
  Calculator,
  TrendingDown,
  Zap,
  Leaf,
  Shield,
  Users,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: <Calculator className="w-9 h-9 text-primary" />,
    hoverIcon: <Calculator className="w-9 h-9 text-black" />,
    title: "Carbon Footprint Analysis",
    description:
      "Comprehensive assessment of your environmental impact with detailed reporting.",
    features: ["Real-time tracking", "Detailed analytics", "Custom reports"],
  },
  {
    icon: <TrendingDown className="w-9 h-9 text-primary" />,
    hoverIcon: <TrendingDown className="w-9 h-9 text-black" />,
    title: "Emission Reduction Plans",
    description:
      "Personalized strategies to minimize your carbon footprint effectively.",
    features: ["AI-powered insights", "Progress monitoring", "Expert guidance"],
  },
  {
    icon: <Zap className="w-9 h-9 text-primary" />,
    hoverIcon: <Zap className="w-9 h-9 text-black" />,
    title: "Carbon Offset Solutions",
    description:
      "Invest in verified projects to neutralize your environmental impact.",
    features: ["Verified projects", "Global portfolio", "Impact tracking"],
  },
];

const highlights = [
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Certified & Verified",
    description: "All our solutions meet international environmental standards",
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Expert Support",
    description: "Dedicated team of environmental scientists and consultants",
  },
  {
    icon: <Leaf className="w-6 h-6 text-primary" />,
    title: "Measurable Impact",
    description: "Track and verify your positive environmental contributions",
  },
];

export default function WhatWeDoSection() {
  return (
    <section
      className="relative py-20 bg-white flex justify-center items-center overflow-x-hidden"
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
          <div className="text-center md:text-left max-w-2xl">
            <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
              <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
                <Leaf size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-semibold">
                What We Do
              </span>
            </div>
            <h2 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight">
              Innovative <span className="text-primary">Solutions</span> for a
              Sustainable Future!
            </h2>
          </div>
        </div>

        <div className="flex flex-row flex-wrap justify-center gap-7 mb-16">
          {services.map((service, idx) => (
            <div
              key={service.title}
              className="
                group relative rounded-3xl border-2 border-[#EAEAEA] bg-white
                transition-all duration-500 hover:bg-[#97D34B] hover:border-[#97D34B] hover:shadow-xl cursor-pointer
                w-[340px] min-h-[350px] flex flex-col
              "
            >
              <div className="p-6 flex flex-col h-full">
                <div className="mb-4 p-3 rounded-full bg-[#EAFDD5] group-hover:bg-[#78B943] transition-colors duration-300 w-fit">
                  <span className="block group-hover:hidden">
                    {service.icon}
                  </span>
                  <span className="hidden group-hover:block">
                    {service.hoverIcon}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-3 text-[#163820] group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-[#767676] group-hover:text-white/90 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>

                <div className="flex-1 flex flex-col gap-2 mb-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-[#78B943] rounded-full group-hover:bg-white transition-colors duration-300 mt-1.5" />
                      <span className="text-[#767676] group-hover:text-white/90 transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex justify-end">
                  <span
                    className="
                    font-semibold text-btn-primary group-hover:text-white 
                    transition-colors duration-300 flex items-center
                  "
                  >
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why it works */}
        {/* <div className="flex flex-col items-center justify-center gap-12">
          <div className="w-full max-w-2xl text-center mb-6">
            <h3 className="text-3xl font-bold text-[#163820] mb-2">
              Why Our <span className="text-primary">Approach</span> Works
            </h3>
            <p className="text-lg text-[#767676] leading-relaxed">
              We combine cutting-edge technology with scientific rigor to
              deliver environmental solutions that create real, measurable
              impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-md p-8 min-h-[200px] transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4 w-12 h-12 bg-[#F7F7F7] rounded-xl flex items-center justify-center group-hover:bg-[#EAFDD5] transition-colors duration-300">
                    {highlight.icon}
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-[#163820]">
                    {highlight.title}
                  </h4>
                  <p className="text-[#767676] mb-4">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}
