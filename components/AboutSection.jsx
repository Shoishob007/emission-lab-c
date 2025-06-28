/* eslint-disable @next/next/no-img-element */
import { ArrowRight, BadgeCheck, CheckCircle } from "lucide-react";

function YearsBadge() {
  return (
    <div
      style={{
        width: 110,
        height: 110,
        borderRadius: "50%",
        background: "#07372B",
        border: "6px solid #fff",
        boxShadow: "0 6px 24px 0 rgba(7,55,43,.10)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        pointerEvents: "none",
        fontWeight: 700,
      }}
      className="select-none"
    >
      <span
        style={{
          display: "block",
          fontWeight: 700,
          fontSize: "1.4rem",
          color: "#fff",
        }}
      >
        25+
      </span>
      <span
        style={{
          fontWeight: 500,
          color: "#fff",
          fontSize: "0.85rem",
          marginTop: 0,
          lineHeight: 1.3,
          display: "block",
        }}
      >
        Years of
        <br />
        experience
      </span>
    </div>
  );
}

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative py-8 md:py-20 bg-white overflow-x-hidden flex justify-center items-center"
      style={{
        backgroundImage: "url('/city1.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "650px",
      }}
    >
      {/* BG overlay */}
      <div
        className="absolute inset-0"
        style={{
          pointerEvents: "none",
          background:
            "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.8) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center w-full max-w-[1200px] mx-auto px-4 gap-10">
        <div
          className="relative flex flex-row items-center justify-center w-full lg:w-1/2 max-w-[520px] min-w-[300px] p-4"
          style={{ minHeight: 400 }}
        >
          {/* Left Image */}
          <div
            style={{
              width: 225,
              height: 450,
              borderTopLeftRadius: 105,
              borderTopRightRadius: 105,
              borderBottomLeftRadius: 105,
              borderBottomRightRadius: 105,
              overflow: "hidden",
              zIndex: 1,
              position: "relative",
              background: "#f3f3f3",
              marginBottom: 50,
            }}
          >
            <img
              src="/landing-page/protecting-nature-1.jpg"
              alt="Protecting nature"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          {/* Right Image */}
          <div
            style={{
              width: 225,
              height: 450,
              borderTopLeftRadius: 105,
              borderTopRightRadius: 105,
              borderBottomLeftRadius: 105,
              borderBottomRightRadius: 105,
              overflow: "hidden",
              zIndex: 1,
              position: "relative",
              background: "#f3f3f3",
              marginLeft: 30,
              marginTop: 50,
            }}
          >
            <img
              src="/landing-page/protecting-nature-2.jpg"
              alt="Protecting nature"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          {/* Static Years Badge */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
            }}
          >
            <YearsBadge />
          </div>
        </div>

        {/* Right */}
        <div id="who-we-are" className="w-full lg:w-1/2 max-w-[520px] min-w-[300px] p-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
              <svg
                width="18"
                height="18"
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
              Who we are
            </span>
          </div>
          {/* Title */}
          <h2 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight mb-4 capitalize">
            About <span className="text-primary">Us</span>
          </h2>
          {/* Description */}
          <p className="text-base md:text-lg text-[#767676] mb-4 leading-relaxed max-w-xl">
            <b>Emission Lab</b> is a climate-tech initiative born from urgency — and driven by hope.
          </p>
          <p className="text-base md:text-lg text-[#767676] mb-4 leading-relaxed max-w-xl">
            We are a team of technologists, environmentalists, and innovators who believe that data, AI, and human action can work together to restore the planet’s balance.
          </p>
          <p className="text-base md:text-lg text-[#767676] mb-4 leading-relaxed max-w-xl">
            Our mission is to drive Earth Renewal Initiatives — restoring the balance between people, purpose, and the planet. We aim to empower individuals, businesses, and institutions to understand, reduce, and offset their carbon footprint.
          </p>
          <p className="text-base md:text-lg text-[#767676] mb-8 leading-relaxed max-w-xl">
            Join us on the journey to regenerate the Earth — powered by purpose, driven by data.
          </p>
          {/* Features CTA */}
          {/* <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex-1 min-w-[260px] flex items-center bg-white border border-gray-200 rounded-xl py-2 px-4 shadow-sm">
                <span className="mr-3 flex items-center justify-center w-8 h-8 rounded-full text-primary bg-primary/20">
                  <CheckCircle
                    className="w-5 h-5 text-primary"
                    strokeWidth={2}
                  />
                </span>
                <span className="font-semibold text-[#163820] text-sm md:text-base">
                  Partnerships For <br className="hidden sm:block" />
                  Planetary Progress
                </span>
              </div>
              <div className="flex-1 min-w-[260px] flex items-center bg-white border border-gray-200 rounded-xl py-2 px-4 shadow-sm">
                <span className="mr-3 flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary">
                  <CheckCircle
                    className="w-5 h-5 text-primary"
                    strokeWidth={2}
                  />
                </span>
                <span className="font-semibold text-[#163820] text-sm md:text-base">
                  Leading The Way
                  <br className="hidden sm:block" />
                  In Conservation
                </span>
              </div>
            </div>
          </div> */}
          {/* Signature/Person & CTA */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Arlene McCoy"
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />
              <div>
                <div className="font-bold text-[#163820] leading-tight text-sm">
                  Arlene McCoy
                </div>
                <div className="text-gray-400 text-xs font-medium">
                  CEO &amp; founder
                </div>
              </div>
            </div>
            {/* <button className="ml-2 px-5 py-2.5 rounded-lg bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-sm flex items-center gap-2 shadow-lg transition">
              More About Us <ArrowRight className="w-4 h-4" />
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;