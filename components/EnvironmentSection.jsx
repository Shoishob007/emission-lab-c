/* eslint-disable @next/next/no-img-element */
import { Award, Users, Globe, ArrowRight, Info } from "lucide-react";
import CountUp from "react-countup";
import { useRef, useEffect, useState } from "react";

const facts = [
  {
    icon: <Globe className="w-10 h-10 text-primary" />,
    number: 78,
    suffix: "%",
    label: "Recognize climate change as a major threat",
  },
  {
    icon: <Award className="w-10 h-10 text-primary" />,
    number: 196,
    suffix: "",
    label: "Countries signed the Paris Agreement",
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    number: 1.7,
    suffix: "T",
    label: "Trillion USD invested in energy transition (2023)",
    decimals: 1,
  },
];

const reasons = [
  "Global Travel Emissions Are Soaring",
  "Businesses Drive Over 70% of Emissions",
  "Individual Climate Action Adds Up",
  "Verified Carbon Offsets Make a Real Difference",
];

export default function FactsAndEnvironmentSection() {
  const [startCount, setStartCount] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) setStartCount(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex justify-center items-center py-12 md:py-20 min-h-[700px] bg-[#0A2D23] overflow-x-hidden"
    >
      {/* Background leafy overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
        }}
      />
      <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center px-2 sm:px-4 py-0">
        {/* LEFT: Content - 5 columns */}
        <div className="lg:col-span-5 flex flex-col justify-center items-start text-white sm:py-10 px-4">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
              <Info size={22} strokeWidth={2} className="text-primary" />
            </span>
            <span className="uppercase text-primary tracking-widest text-sm font-semibold">
              Our Facts
            </span>
          </div>

          <h2 className="font-bold text-white text-3xl sm:text-4xl leading-tight mb-4 capitalize">
            Key <span className="text-primary">environmental facts</span> for a
            sustainable future
          </h2>

          <p className="text-white text-base sm:text-lg mb-6 leading-relaxed">
            Discover essential facts about our planet&apos;s health, climate
            change, and sustainability efforts. Understanding these facts
            empowers us to take action.
          </p>

          {/* Arrow List  */}
          <div className="mb-10 grid grid-cols-1 gap-y-2 w-full">
            {reasons.map((reason, i) => (
              <div key={i} className="flex items-center gap-2 mb-1">
                <ArrowRight className="w-5 h-5 text-btn-primary flex-shrink-0" />
                <span className="text-white text-base font-medium">
                  {reason}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-green-700/50 mb-10" />

          {/* Animated Numbers */}
          <div className="grid grid-cols-3 gap-x-2 sm:gap-x-0 gap-y-6 w-full">
            {facts.map((fact, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center border-r border-green-800 last:border-none py-2"
              >
                <div className="mb-2 sm:mb-3">{fact.icon}</div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-1 text-white">
                  {startCount ? (
                    <CountUp
                      end={fact.number}
                      duration={5}
                      suffix={fact.suffix}
                      decimals={fact.decimals || 0}
                    />
                  ) : (
                    `0${fact.suffix}`
                  )}
                </div>
                <div className="text-green-100 font-medium text-xs sm:text-sm uppercase tracking-wide px-2">
                  {fact.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER: Illustration - 4 columns */}
        <div className="lg:col-span-4 flex items-center justify-center relative order-3 lg:order-2">
          <div
            className="relative flex items-center justify-center w-full"
            style={{
              maxWidth: 500,
              maxHeight: 900,
            }}
          >
            <img
              src="https://res.cloudinary.com/dmazsiqdy/image/upload/f_auto,q_auto:good,w_1200/v1751539147/emisison-lab/man-plant-2_yglkq7.png"
              alt="Person holding a plant"
              className="w-full h-auto object-contain rounded-b-3xl drop-shadow-2xl mx-auto"
              draggable={false}
              style={{
                maxHeight: 900,
                minHeight: 280,
                marginTop: 0,
                display: "block",
              }}
            />
          </div>
        </div>

        {/* RIGHT: Large Impact Counter - 3 columns */}
        <div className="lg:col-span-3 flex flex-col justify-center items-center lg:items-end text-white py-8 sm:py-10 px-4 order-2 lg:order-3">
          <div className="text-center lg:text-right">
            <p className="text-white text-lg sm:text-xl mb-3 font-medium">
              Our Collective Climate Impact
            </p>
            <div className="flex items-baseline justify-center lg:justify-end gap-2 mb-2">
              <span className="text-white text-lg sm:text-xl font-medium">
                Over
              </span>
              <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-none">
                {startCount ? (
                  <CountUp end={50000} duration={3} separator="," />
                ) : (
                  "0"
                )}
              </div>
            </div>
            <div className="flex items-baseline justify-center lg:justify-end gap-2 flex-wrap">
              <span className="text-white text-lg sm:text-xl font-medium">
                kg CO<sub className="text-sm">2</sub>e
              </span>
              <span className="text-primary text-lg sm:text-xl md:text-3xl font-bold">
                offset
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Prevent section from shrinking too much on mobile */}
      {/* <style>{`
        @media (max-width: 1024px) {
          .min-h-\\[700px\\] {
            min-height: 0 !important;
          }
        }
      `}</style> */}
    </section>
  );
}
