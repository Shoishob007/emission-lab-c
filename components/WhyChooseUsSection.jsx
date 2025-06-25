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
                className="text-primary"
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
            <span className="uppercase text-primary tracking-widest text-xs font-semibold">
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
            Your partner for{" "}
            <span className="text-primary">sustainable environmental</span>{" "}
            solutions
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
                  <ArrowRight className="w-[18px] h-[18px] text-btn-primary" />
                </span>
                <span className="text-[#767676] text-base font-medium">
                  {reason}
                </span>
              </div>
            ))}
          </div>
          <button
            className="mt-2 px-7 py-3 rounded-lg bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-base flex justify-center items-center gap-2 shadow-lg transition mx-auto sm:mx-0 w-fit"
            type="button"
          >
            Contact Us <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right: Images grid */}
        <div className="w-full lg:w-1/2 max-w-[600px] min-w-[320px] p-4 flex flex-col items-center justify-center">
          {/* Responsive grid for images */}
          <div className="grid grid-cols-2 gap-4 sm:gap-7 w-full">
            {/* Left column */}
            <div className="flex flex-col gap-4 sm:gap-7">
              <div className="rounded-2xl overflow-hidden aspect-square w-full min-w-0 max-w-[250px] mx-auto">
                <img
                  src="/landing-page/sus-1.jpg"
                  alt="Sustainable Solutions"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square w-full min-w-0 max-w-[250px] mx-auto">
                <img
                  src="/landing-page/sus-3.jpg"
                  alt="Sustainable Solutions"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            </div>

            {/* Right column */}
            <div
              className="
        rounded-2xl overflow-hidden
        aspect-square w-full min-w-0 max-w-[320px] mx-auto
        sm:aspect-auto sm:max-w-[250px] sm:max-h-[528px] sm:h-full
      "
            >
              <img
                src="/landing-page/sus-6.jpg"
                alt="Sustainable Solutions"
                className="w-full h-full object-cover"
                draggable={false}
                style={{
                  minHeight: 0,
                  maxHeight: "528px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;