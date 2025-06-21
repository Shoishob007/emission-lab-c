/* eslint-disable @next/next/no-img-element */
import { Calculator, BarChart3, TrendingDown, Zap } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Calculator className="w-7 h-7 text-primary" />,
    title: "Precise Calculations",
    description:
      "Advanced algorithms for accurate carbon footprint assessment across all lifestyle factors.",
  },
  {
    icon: <BarChart3 className="w-7 h-7 text-secondary" />,
    title: "Detailed Analytics",
    description:
      "Comprehensive reporting with interactive charts and actionable insights for reduction.",
  },
  {
    icon: <TrendingDown className="w-7 h-7 text-primary" />,
    title: "Reduction Tracking",
    description:
      "Monitor your progress with real-time tracking and personalized improvement suggestions.",
  },
  {
    icon: <Zap className="w-7 h-7 text-secondary" />,
    title: "Instant Results",
    description:
      "Get immediate feedback and start your sustainability journey within seconds.",
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 px-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
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
            <h2
              className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight mb-4"
              style={{
                fontFamily: '"Montserrat", Arial, Helvetica, sans-serif',
                letterSpacing: 0,
                lineHeight: 1.18,
              }}
            >
              Calculate Your{" "}
              <span className="text-primary">Carbon Footprint</span>
            </h2>
            <p className="text-base md:text-lg text-[#767676] mb-6 leading-relaxed">
              Take the first step towards carbon neutrality with our
              comprehensive footprint calculator. Analyze your lifestyle,
              transportation, energy usage, and consumption patterns to get your
              most accurate carbon assessment.
            </p>
          </div>
          <div className="items-center p-6">
            <Link href="/calculator" passHref legacyBehavior>
              <button
                className="px-7 py-3 rounded-lg bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-base flex items-center gap-2 shadow-lg transition w-fit"
                style={{
                  fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
                }}
              >
                Start Calculating <Calculator className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Stacked Photos*/}
          <div className="w-full lg:w-1/2 relative" style={{ minHeight: 340 }}>
            <div
              className="rounded-2xl overflow-hidden shadow-xl absolute lg:right-0 lg:top-20 z-10"
              style={{
                width: 330,
                height: 250,
                background: "#f3f3f3",
                boxShadow: "0 8px 32px 0 rgba(0,0,0,0.14)",
              }}
            >
              <img
              src="/landing-page/1.jpg"
                              alt="Carbon footprint calculation"
                className="w-full h-full object-cover"
                draggable={false}
              />
              {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%]">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between shadow-lg">
                  <div>
                    <div className="text-xl font-bold text-primary">2.1 tons</div>
                    <div className="text-xs text-muted-foreground">Monthly CO₂ Emissions</div>
                  </div>
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div> */}
            </div>
            <div
              className="rounded-2xl overflow-hidden shadow-xl absolute lg:top-0 z-0"
              style={{
                width: 330,
                height: 250,
                transform: "scale(0.96)",
                background: "#f3f3f3",
                boxShadow: "0 8px 32px 0 rgba(0,0,0,0.14)",
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
          <div className="w-full lg:w-1/2 bg-[#F7F7F7] rounded-2xl py-7 px-8 flex flex-col gap-5">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-sm mr-2">
                  {feature.icon}
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