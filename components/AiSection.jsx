/* eslint-disable @next/next/no-img-element */
import { Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const aiFeatures = [
  "Machine learning optimization",
  "Predictive analytics",
  "Automated reporting",
];

export default function AiSection() {
  return (
    <section
      id="ai"
      className="relative py-12 md:py-20 bg-white flex justify-center items-center overflow-x-hidden"
      style={{
        minHeight: "650px",
      }}
    >
      <div className="relative z-10 w-full max-w-[1350px] mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-10">
        {/* Left: Content */}
        <div className="w-full lg:w-1/2 max-w-[560px] min-w-[320px] p-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
              <Brain size={22} strokeWidth={2} className="text-primary" />
            </span>
            <span className="uppercase text-primary tracking-widest text-xs font-semibold">
              Artificial Intelligence
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
            AI-Powered <span className="text-primary">Sustainability</span>
          </h2>
          <p className="text-base md:text-lg text-[#767676] mb-8 leading-relaxed max-w-xl">
            Harness the power of artificial intelligence to optimize your carbon
            reduction strategies. Our advanced algorithms analyze your data to
            provide personalized recommendations and predict the most effective
            pathways to carbon neutrality.
          </p>
          <div className="bg-[#F7F7F7] rounded-2xl py-7 px-8 mb-8 flex flex-col gap-5">
            {aiFeatures.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#FFA7261A]">
                  <ArrowRight className="w-[18px] h-[18px] text-[#FFA726]" />
                </span>
                <span className="text-[#767676] text-base font-medium">
                  {feature}
                </span>
              </div>
            ))}
          </div>
          <Button
            size="lg"
            className="mt-2 px-7 py-3 rounded-lg bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-base flex items-center gap-2 shadow-lg transition w-fit"
            type="button"
          >
            Explore AI Features <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Right: Circular Image */}
        <div className="w-full lg:w-1/2 max-w-[600px] min-w-[320px] p-4 flex items-center justify-center">
          <div
            className="rounded-full overflow-hidden flex items-center justify-center bg-[#F7F7F7] border-8 border-[#F7F7F7] shadow-lg"
            style={{
              width: "100%",
              height: "0",
              paddingBottom: "100%",
              maxWidth: "450px",
              maxHeight: "450px",
              position: "relative",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1000&q=80"
              alt="AI Scientific Visualization"
              className="absolute top-0 left-0 w-full h-full object-cover"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
