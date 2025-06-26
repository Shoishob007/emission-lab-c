/* eslint-disable @next/next/no-img-element */
import { Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const aiFeatureList = [
  {
    title: "Automated Emissions Detection",
    description:
      "AI connects with your tools (ERP, travel systems, utility data) to track emissions — no manual work required.",
  },
  {
    title: "Personalized Reduction Recommendations",
    description:
      "Get smart suggestions on how to reduce your footprint based on your lifestyle, travel patterns, or business operations.",
  },
  {
    title: "Predictive Climate Insights",
    description:
      "See how your choices affect long-term carbon trends — with clear simulations and outcome forecasting.",
  },
  {
    title: "Offset Optimization",
    description:
      "AI matches you with the most impactful, verified carbon offset projects based on your footprint and values.",
  },
  {
    title: "Continuous Improvement Engine",
    description:
      "The more you use it, the smarter it gets — adapting to your habits and improving recommendations over time.",
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

export default function AiSection() {
  return (
    <section
      id="ai"
      className="relative py-12 md:py-20 bg-white flex justify-center items-center overflow-x-hidden"
      style={{ minHeight: "650px" }}
    >
      <div className="relative z-10 w-full max-w-[1350px] mx-auto px-4 flex flex-col gap-12">
        {/* First Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 px-4">
          {/* Left */}
          <div className="w-full lg:w-1/2 max-w-[600px] flex flex-col justify-center sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
                <Brain size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-semibold">
                Artificial Intelligence
              </span>
            </div>
            <h2 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight mb-1 capitalize">
              AI-Powered <span className="text-primary">Sustainability</span>
            </h2>
            <p className="font-semibold text-[#767676] text-base sm:text-lg leading-tight mb-4">
              Smarter Climate Action Starts with Intelligence
            </p>
            <p className="text-base md:text-lg text-[#767676] mb-2 leading-relaxed max-w-xl">
              We use the power of AI and machine learning to help individuals
              and businesses make data-driven, impactful climate decisions — in
              real time.
            </p>
          </div>
          {/* Right: Image */}
          <div className="w-full lg:w-1/2 flex items-center justify-center sm:p-6">
            <div
              className="rounded-full overflow-hidden flex items-center justify-center border-[#F7F7F7] mx-auto"
              style={{
                width: "100%",
                maxWidth: "320px",
                aspectRatio: "1/1",
                position: "relative",
              }}
            >
              {/* <img
                src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1000&q=80"
                alt="AI Scientific Visualization"
                className="absolute top-0 left-0 w-full h-full object-cover"
                draggable={false}
              /> */}
              {/* <DotLottieReact
      src="https://lottie.host/40155ee2-cb11-48b0-a9e7-5dd5a35f883f/YocZp2ejdG.lottie"
      loop
      autoplay
      className="w-full h-full absolute top-0 left-0"
    /> */}
              <DotLottieReact
                src="https://lottie.host/29ae73da-0f99-4932-87f4-392277631bb5/ObJtllLMGH.lottie"
                loop
                autoplay
              />
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 px-4">
          {/* Left: Help and Regenerative */}
          <div className="w-full lg:w-1/2 max-w-[600px] flex flex-col gap-6 p-2 sm:p-6">
            <div>
              <div className="font-semibold text-[#163820] text-base mb-2">
                Get help For Businesses
              </div>
              <ul className="flex flex-col gap-2 mb-4">
                {businessHelp.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-btn-primary mt-1 flex-shrink-0" />
                    <span className="text-[#767676] text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Built for a Regenerative Future */}
            <div>
              <div className="font-semibold text-[#163820] text-base mb-2">
                Built for a Regenerative Future
              </div>
              <ul className="flex flex-col gap-2">
                {regenerativeList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-btn-primary mt-1 flex-shrink-0" />
                    <span className="text-[#767676] text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button
              size="lg"
              className="mt-4 px-7 py-3 rounded-lg bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-base flex justify-center items-center gap-2 shadow-lg transition w-full sm:w-fit"
              type="button"
            >
              Explore AI Features <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
          {/* Right */}
          <div className="w-full lg:w-1/2 max-w-[600px] flex flex-col gap-4 bg-[#F7F7F7] rounded-2xl p-4 sm:p-6">
            {/* <div className="text-lg font-semibold text-[#163820] mb-2">
              What AI Does for You
            </div> */}
            {aiFeatureList.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-sm mr-2">
                  <Brain className="w-6 h-6 text-secondary" />
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
