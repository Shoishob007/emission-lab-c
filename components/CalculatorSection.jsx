/* eslint-disable @next/next/no-img-element */
import {
  Calculator,
  BarChart3,
  TrendingDown,
  Zap,
  TrainTrack,
  EarthIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const features = [
  {
    icon: <Calculator strokeWidth={2} />,
    title: "Precise Calculations",
    description:
      "Advanced algorithms for accurate carbon footprint assessment.",
  },
  {
    icon: <TrainTrack strokeWidth={2} />,
    title: "Track Your Travel",
    description:
      "Estimate emissions for where you go with flight, bus, train and where you stay at hotels.",
  },
  {
    icon: <EarthIcon strokeWidth={2} />,
    title: "Create Impact",
    description:
      "Understand how your journey affects the planet and how you contribute to restore balance.",
  },
  {
    icon: <TrendingDown strokeWidth={2} />,
    title: "Reduction Tracking",
    description:
      "Monitor your progress with real-time tracking and personalized improvement suggestions.",
  },
  {
    icon: <Zap strokeWidth={2} />,
    title: "Instant Results",
    description:
      "Get your results in real-time and start your sustainability journey within seconds.",
  },
];

export default function CalculatorSection() {
  return (
    <section
      className="relative py-12 md:py-20 bg-white flex justify-center items-center overflow-x-hidden"
      style={{
        minHeight: "650px",
      }}
    >
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 px-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
                <Calculator
                  size={22}
                  strokeWidth={2}
                  className="text-primary"
                />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-semibold">
                Calculator
              </span>
            </div>
            <h2 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight mb-1">
              Calculate Your{" "}
              <span className="text-primary">Carbon Footprint</span>
            </h2>
            <p className="font-semibold text-[#767676] text-base sm:text-lg leading-tight mb-4">
              No login required — calculate anytime, anywhere.
            </p>
            <p className="text-base md:text-lg text-[#767676] mb-6 leading-relaxed">
              Take the first step towards carbon neutrality with our AI-Powered
              footprint calculator. Analyze you consumption pattern on your
              travel and get your most accurate carbon assessment.
            </p>
          </div>
          <div className="items-center p-6">
            <Link href="/calculator" passHref legacyBehavior>
              <button className="px-7 py-3 rounded-lg bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-base flex items-center gap-2 shadow-lg transition w-fit">
                Start Calculating <Calculator className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 items-start">
          {/* Stacked Photos*/}
          <div
            className="w-full lg:w-1/2 relative flex items-center justify-center"
            style={{ minHeight: 340 }}
          >
            {/* Mobile stacked */}
            <div className="block lg:hidden relative" style={{ height: 350 }}>
              <div
                className="rounded-2xl overflow-hidden absolute"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-60%, -60%)",
                  width: 270,
                  height: 180,
                  background: "#f3f3f3",
                  zIndex: 2,
                  boxShadow: "0 8px 32px 0 rgba(0,0,0,0.14)",
                }}
              >
                <img
                  src="/landing-page/1.jpg"
                  alt="Carbon footprint calculation"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
              <div
                className="rounded-2xl overflow-hidden absolute"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-40%, -20%)",
                  width: 270,
                  height: 180,
                  background: "#f3f3f3",
                  zIndex: 1,
                  boxShadow: "0 8px 32px 0 rgba(0,0,0,0.14)",
                }}
              >
                <img
                  src="https://res.cloudinary.com/dmazsiqdy/image/upload/v1751538666/emisison-lab/3_gtg0zi.jpg"
                  alt="Carbon footprint calculation"
                  className="w-full h-full object-cover"
                  draggable={false}
                  style={{ filter: "brightness(0.93)" }}
                />
              </div>
            </div>

            {/* Desktop diagonal stack */}
            <div
              className="hidden lg:block rounded-2xl overflow-hidden absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-40%, -30%)",
                width: 330,
                height: 250,
                background: "#f3f3f3",
                boxShadow: "0 8px 32px 0 rgba(0,0,0,0.14)",
                zIndex: 10,
              }}
            >
              <img
                src="https://res.cloudinary.com/dmazsiqdy/image/upload/v1751538683/emisison-lab/1_zehacf.jpg"
                alt="Carbon footprint calculation"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
            <div
              className="hidden lg:block rounded-2xl overflow-hidden absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-60%, -70%) scale(0.96)",
                width: 330,
                height: 250,
                background: "#f3f3f3",
                boxShadow: "0 8px 32px 0 rgba(0,0,0,0.14)",
                zIndex: 0,
              }}
            >
              <img
                src="/landing-page/3.jpg"
                alt="Carbon footprint calculation"
                className="w-full h-full object-cover"
                draggable={false}
                style={{ filter: "brightness(0.93)" }}
              />
            </div>
          </div>

          {/* Features */}
          <div className="w-full lg:w-1/2 bg-[#F7F7F7] rounded-2xl p-4 sm:p-6 flex flex-col gap-4">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-sm mr-2 p-1.5 shrink-0">
                  {React.cloneElement(feature.icon, {
                    className: "w-full h-full text-secondary",
                  })}
                </span>
                <div>
                  <div className="text-base font-semibold text-[#163820] mb-1">
                    {feature.title}
                  </div>
                  <div className="text-sm text-[#767676]">
                    {feature.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
