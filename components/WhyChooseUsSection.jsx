/* eslint-disable @next/next/no-img-element */
import { ArrowRight } from "lucide-react";

const reasons = [
  "Expert Team with Extensive Environmental Knowledge",
  "Commitment to Regulatory Compliance and Standards",
  "Comprehensive Environmental Impact Assessments and Reports",
];

const WhyChooseUsSection = () => {
  return (
    <section
      id="why-choose-us"
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
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-green-500"
                viewBox="0 0 24 24"
              >
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                <circle
                  cx="12"
                  cy="12"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </span>
            <span className="uppercase text-green-600 tracking-widest text-xs font-semibold">
              Why Choose Us
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
            Your partner for <span className="text-[#78B943]">sustainable environmental</span> solutions
          </h2>
          <p className="text-base md:text-lg text-[#767676] mb-8 leading-relaxed max-w-xl">
            We are committed to delivering innovative and sustainable
            environmental solutions. Our team of experts helps you minimize
            environmental impact.
          </p>
          <div className="bg-[#F7F7F7] rounded-2xl py-7 px-8 mb-8 flex flex-col gap-5">
            {reasons.map((reason, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#FFA7261A]">
                  <ArrowRight className="w-[18px] h-[18px] text-[#FFA726]" />
                </span>
                <span className="text-[#767676] text-base font-medium">
                  {reason}
                </span>
              </div>
            ))}
          </div>
          <button
            className="mt-2 px-7 py-3 rounded-lg bg-[#FFA726] hover:bg-[#ff9800] text-white font-bold text-base flex items-center gap-2 shadow-lg transition w-fit"
            type="button"
          >
            Contact Us <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right: Images grid */}
        <div className="w-full lg:w-1/2 max-w-[600px] min-w-[320px] p-4 flex flex-col items-center justify-center">
          <div className="grid grid-cols-2 gap-7 w-full">
            <div className="flex flex-col gap-7">
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  minWidth: 180,
                  minHeight: 180,
                  maxWidth: 250,
                  maxHeight: 250,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                  alt="Globe with tree and city"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  minWidth: 180,
                  minHeight: 180,
                  maxWidth: 250,
                  maxHeight: 250,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
                  alt="Children planting"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            </div>

            {/* Right column */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                width: "100%",
                height: "calc(200% + 28px)",
                minWidth: 180,
                minHeight: 368,
                maxWidth: 250,
                maxHeight: 528,
                marginTop: 50
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                alt="Tree with wind turbines"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
