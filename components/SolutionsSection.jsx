/* eslint-disable @next/next/no-img-element */
import {
  Target,
  ArrowRight,
  Calculator,
  TreePine,
  TrendingDown,
} from "lucide-react";

const solutions = [
  {
    icon: <Calculator className="w-9 h-9 text-[#78B943]" />,
    hoverIcon: <Calculator className="w-9 h-9 text-black" />,
    title: "Calculate",
    subtitle: "Measure Your Impact",
    description:
      "Comprehensive carbon footprint analysis across all areas of your life and business operations.",
    features: ["Real-time tracking", "Detailed reporting", "Historical data"],
    color: "primary",
  },
  {
    icon: <TrendingDown className="w-9 h-9 text-[#78B943]" />,
    hoverIcon: <TrendingDown className="w-9 h-9 text-black" />,
    title: "Reduce",
    subtitle: "Smart Recommendations",
    description:
      "AI-powered insights and actionable recommendations to minimize your environmental impact.",
    features: ["Personalized plans", "Progress tracking", "Expert guidance"],
    color: "secondary",
  },
  {
    icon: <TreePine className="w-9 h-9 text-[#78B943]" />,
    hoverIcon: <TreePine className="w-9 h-9 text-black" />,
    title: "Offset",
    subtitle: "Verified Projects",
    description:
      "Invest in certified carbon offset projects that create real environmental and social impact.",
    features: ["Verified projects", "Transparent tracking", "Impact reports"],
    color: "primary",
  },
];

export default function SolutionsSection() {
  return (
    <section
      id="solutions"
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
        {/* header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 md:gap-0 px-4">
          <div className="text-center md:text-left max-w-2xl mx-auto md:mx-0">
            <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
              <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
                <Target size={22} strokeWidth={2} className="text-green-500" />
              </span>
              <span className="uppercase text-green-600 tracking-widest text-xs font-semibold">
                Solutions
              </span>
            </div>
            <h2 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight">
              Complete <span className="text-primary">Carbon Management</span> Solutions
            </h2>
            <p className="text-lg text-[#767676] mt-4 max-w-xl">
              From measurement to action - our comprehensive platform guides you
              through every step of your sustainability journey.
            </p>
          </div>
        </div>

        <div className="flex flex-row flex-wrap justify-center gap-7 mb-8">
          {solutions.map((solution, idx) => (
            <div
              key={solution.title}
              className={`
                group relative rounded-3xl border-2 border-[#EAEAEA] bg-white
                transition-all duration-500 hover:bg-[#97D34B] hover:border-[#97D34B] hover:shadow-xl cursor-pointer
                w-[340px] min-h-[350px] flex flex-col
              `}
            >
              <div className="p-6 flex flex-col h-full">
                <div className="mb-4 p-3 rounded-full bg-[#EAFDD5] group-hover:bg-[#78B943] transition-colors duration-300 w-fit">
                  <span className="block group-hover:hidden">
                    {solution.icon}
                  </span>
                  <span className="hidden group-hover:block">
                    {solution.hoverIcon}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-1 text-[#163820] group-hover:text-white transition-colors duration-300">
                    {solution.title}
                  </h3>
                  <p className="text-sm text-[#767676] group-hover:text-white/80 font-medium transition-colors duration-300">
                    {solution.subtitle}
                  </p>
                </div>

                <p className="text-[#767676] group-hover:text-white/90 transition-colors duration-300 mb-4 leading-relaxed">
                  {solution.description}
                </p>

                {/* Features list */}
                <div className="flex-1 flex flex-col gap-2 mb-4">
                  {solution.features.map((feature, i) => (
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
                    font-semibold text-[#FFA726] group-hover:text-white 
                    transition-colors duration-300 flex items-center
                  "
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
