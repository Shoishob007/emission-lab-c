/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const users = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/65.jpg",
];

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center bg-no-repeat bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
      }}
    >
      {/* gradient overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-12 md:px-10 lg:px-16 relative z-10">
        <div className="max-w-2xl bg-transparent rounded-xl p-6 lg:p-8">
          <div
            className={`flex items-center gap-2 mb-4 transition-opacity duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="inline-flex items-center justify-center bg-green-900/30 rounded-full p-2">
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-green-400"
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
            <span className="uppercase text-green-200 tracking-widest text-xs font-semibold">
              Welcome to Emission Lab
            </span>
          </div>

          {/* Heading */}
          <h1
            className={`transition-all duration-1000 font-extrabold text-white drop-shadow-lg leading-tight 
              text-3xl md:text-4xl lg:text-5xl mb-4 tracking-tight
              ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }
            `}
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              lineHeight: 1.2,
            }}
          >
            Preserving Nature <br />
            For a Better Earth <br />
            Tomorrow!
          </h1>

          {/* Subheading */}
          <p
            className={`transition-all duration-1000 delay-150 text-base md:text-lg text-gray-200 max-w-2xl mb-6 font-medium ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Join us in safeguarding our planet through sustainable solutions and
            eco-friendly initiatives. Together, we can protect nature, conserve
            resources, and create a healthier Earth for future generations.
          </p>

          {/* Social Proof & Button Row */}
          <div
            className={`flex flex-col sm:flex-row items-start sm:items-center gap-6 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {users.map((src, idx) => (
                  <img
                    key={src}
                    src={src}
                    alt={`user${idx + 1}`}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="font-bold text-white text-base leading-tight">
                  5000+
                </div>
                <div className="text-gray-300 text-xs">Active Review</div>
              </div>
            </div>
            <button className="inline-flex items-center px-6 py-3 bg-yellow-400 text-gray-900 text-base font-semibold rounded-md shadow-lg transition hover:bg-yellow-500 focus:outline-none">
              Get In Touch <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
