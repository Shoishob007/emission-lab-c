/* eslint-disable @next/next/no-img-element */
import {
  Target,
  ArrowRight,
  Calculator,
  TreePine,
  TrendingDown,
} from "lucide-react";
import Link from "next/link";

const solutions = [
  {
    icon: <Calculator className="w-9 h-9 text-primary" />,
    hoverIcon: <Calculator className="w-9 h-9 text-black" />,
    title: "Calculate",
    subtitle: "Understand Your Impact",
    description:
      "Comprehensive carbon footprint analysis across all areas of your life and business.",
    features: [
      "Track emissions across individuals, teams, or entire businesses.",
      "Real-time dashboard with actionable insights.",
      "API integration for automated emission tracking.",
    ],
    motivation: "You can't reduce what you don't measure.",
    color: "primary",
    href: "/calculatorPage",
  },
  {
    icon: <TrendingDown className="w-9 h-9 text-primary" />,
    hoverIcon: <TrendingDown className="w-9 h-9 text-black" />,
    title: "Reduce",
    subtitle: "Turn Insights into Action",
    description:
      "AI-powered insights and actionable recommendations to minimize your environmental impact.",
    features: [
      "Personalized tips and strategies to cut down emissions.",
      "Set your customized reduction plan and targets.",
      "Get recommendations for low-carbon alternatives.",
    ],
    motivation: "Small changes, big climate impact.",
    color: "secondary",
    href: "/reducePage",
  },
  {
    icon: <TreePine className="w-9 h-9 text-primary" />,
    hoverIcon: <TreePine className="w-9 h-9 text-black" />,
    title: "Offset",
    subtitle: "Balance What's Inevitable",
    description:
      "Donate in certified carbon offset projects that create real environmental and social impact.",
    features: [
      "Offset unavoidable emissions through verified global projects.",
      "Choose from reforestation, renewable energy, and community carbon projects.",
      "Transparent offset tracking with certificates.",
    ],
    motivation: "Positive action = balanced climate.",
    color: "primary",
    href: "/offsetPage",
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
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-3 justify-center">
              <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
                <Target size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-semibold">
                Solutions
              </span>
            </div>
            <h2 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight capitalize">
              Complete{" "}
              <span className="text-primary">Carbon Management Solutions</span>{" "}
              for Business & Individuals on your Travel
            </h2>
            <p className="text-lg text-[#767676] mt-4 max-w-7xl">
              From measurement to action; our platform enables you to measure
              carbon emissions, track environmental impact, provide
              recommendations and offset their carbon footprint by supporting
              certified climate protection projects around the world.
            </p>
          </div>
        </div>

        <div className="flex flex-row flex-wrap justify-center gap-7 mb-8">
          {solutions.map((solution, idx) => (
            <Link
    key={solution.title}
    href={solution.href}
    className={`
      group relative rounded-3xl border-2 border-[#EAEAEA] bg-white
      transition-all duration-500 hover:bg-[#97D34B] hover:border-[#97D34B] hover:shadow-xl cursor-pointer
      w-[340px] min-h-[350px] flex flex-col
      no-underline
    `}
    tabIndex={0}
    aria-label={`Learn more about ${solution.title}`}
  >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-[#EAFDD5] group-hover:bg-[#78B943] transition-colors duration-300 w-fit">
                    <span className="block group-hover:hidden">
                      {solution.icon}
                    </span>
                    <span className="hidden group-hover:block">
                      {solution.hoverIcon}
                    </span>
                  </div>
                  <div className="">
                    <h3 className="text-xl font-bold mb-1 text-[#163820] group-hover:text-white transition-colors duration-300">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-[#767676] group-hover:text-white/80 font-medium transition-colors duration-300">
                      {solution.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-[#767676] group-hover:text-white/90 transition-colors duration-300 mb-4 leading-relaxed">
                  {solution.description}
                </p>

                {/* Features list */}
                <div className="flex-1 flex flex-col gap-2 mb-4">
                  {solution.features.map((feature, i) => (
                    <div key={i} className="flex items-baseline gap-2 text-sm">
  <div className="w-2 h-2 bg-[#78B943] rounded-full flex-shrink-0 mt-1"></div>
  <span className="text-[#767676] group-hover:text-white/90 transition-colors duration-300 leading-tight">
    {feature}
  </span>
</div>
                  ))}
                </div>

                <p className="text-sm italic text-[#767676] group-hover:text-white/80 font-medium transition-colors duration-300">
                  &quot;{solution.motivation}&quot;
                </p>

                <div className="mt-4 flex justify-end">
                  <span
                    className="
                    font-semibold text-btn-primary group-hover:text-white 
                    transition-colors duration-300 flex items-center
                  "
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
