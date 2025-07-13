/* eslint-disable @next/next/no-img-element */
import {
  Award,
  Users,
  Globe,
  ChevronRight,
  Settings,
  ArrowRight,
  Info,
} from "lucide-react";
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
      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-8 md:gap-10 items-center justify-center px-2 sm:px-4 py-0">
        {/* LEFT: Content */}
        <div className="flex-1 flex flex-col justify-center items-start text-white py-8 sm:py-10 px-4 w-full max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
              <Info size={22} strokeWidth={2} className="text-primary" />
            </span>
            <span className="uppercase text-primary tracking-widest text-sm font-semibold">
              Our Facts
            </span>
          </div>

          <h2 className="font-bold text-white text-3xl sm:text-4xl leading-tight mb-4 capitalize">
            Key <span className="text-primary">environmental facts</span> for{" "}
            <br className="hidden sm:block" />a sustainable future
          </h2>

          <p className="text-green-100 text-base sm:text-lg mb-6 leading-relaxed max-w-xl">
            Discover essential facts about our planet&apos;s health, climate
            change, and sustainability efforts. Understanding these facts
            empowers us to take action.
          </p>

          {/* Arrow List  */}
          <div className="mb-10 grid grid-cols-1 gap-y-2 w-full max-w-2xl">
            {reasons.map((reason, i) => (
              <div key={i} className="flex items-center gap-2 mb-1">
                <ArrowRight className="w-5 h-5 text-btn-primary flex-shrink-0" />
                <span className="text-green-50 text-base font-medium">
                  {reason}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-green-700/50 mb-10 max-w-xl" />

          {/* Animated Numbers */}
          <div className="grid grid-cols-3 gap-x-2 sm:gap-x-0 gap-y-6 w-full max-w-xl">
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
                <div className="text-green-200 font-medium text-xs sm:text-sm uppercase tracking-wide px-2">
                  {fact.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Illustration */}
        <div className="flex-1 min-w-0 w-full h-full flex items-center justify-center relative">
          <div
            className="relative flex items-center justify-center w-full h-full"
            style={{
              minWidth: "0",
              minHeight: "0",
              maxWidth: 500,
              maxHeight: 950,
              width: "100%",
              height: "100%",
            }}
          >
            <img
              src="https://res.cloudinary.com/dmazsiqdy/image/upload/v1751539147/emisison-lab/man-plant-2_yglkq7.png"
              alt="Person holding a plant"
              className="w-full h-auto object-contain rounded-b-3xl drop-shadow-2xl mx-auto"
              draggable={false}
              style={{
                maxHeight: 950,
                minHeight: 280,
                marginTop: 0,
                display: "block",
              }}
            />
          </div>
        </div>
      </div>
      {/* Prevent section from shrinking too much on mobile */}
      <style>{`
        @media (max-width: 1024px) {
          .min-h-\\[700px\\] {
            min-height: 0 !important;
          }
        }
        @media (max-width: 640px) {
          section {
            padding-bottom: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
