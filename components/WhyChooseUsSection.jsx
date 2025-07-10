/* eslint-disable @next/next/no-img-element */
import { ArrowRight, Settings } from "lucide-react";
import Link from "next/link";

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
            <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
              <Settings size={22} strokeWidth={2} className="text-primary" />
            </span>
            <span className="uppercase text-primary tracking-widest text-xs font-semibold">
              Why Choose Us
            </span>
          </div>
          <h2
            className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight mb-4 capitalize"
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
          <div className="bg-[#F7F7F7] rounded-2xl py-7 px-4 mb-8 flex flex-col gap-5">
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
          <Link href="/contact">
            <button
              className="mt-2 px-7 py-3 rounded-lg bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-base flex justify-center items-center gap-2 shadow-lg transition mx-auto sm:mx-0 w-fit"
              type="button"
            >
              Contact Us <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>

        {/* Right: Images grid */}
        <div className="w-full lg:w-1/2 max-w-[600px] min-w-[320px] p-4 flex flex-col items-center justify-center">
          {/* Responsive grid for images */}
          <div className="grid grid-cols-2 gap-4 sm:gap-7 w-full">
            {/* Left column */}
            <div className="flex flex-col gap-4 sm:gap-7">
              <div className="rounded-2xl overflow-hidden aspect-square w-full min-w-0 max-w-[250px] mx-auto">
                <img
                  src="https://res.cloudinary.com/dmazsiqdy/image/upload/v1751538666/emisison-lab/sus-1_jupdd7.jpg"
                  alt="Sustainable Solutions"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square w-full min-w-0 max-w-[250px] mx-auto">
                <img
                  src="https://res.cloudinary.com/dmazsiqdy/image/upload/v1751538669/emisison-lab/sus-3_kwhwm7.jpg"
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
                src="https://res.cloudinary.com/dmazsiqdy/image/upload/v1751538687/emisison-lab/sus-6_vvnrn7.jpg"
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
