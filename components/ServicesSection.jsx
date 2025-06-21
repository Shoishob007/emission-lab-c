/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import {
  ArrowRight,
  Trees,
  Leaf,
  Sprout,
  Factory,
  Lightbulb,
  Droplets,
  LeafyGreen,
  Flower2,
  MountainSnow,
  Recycle,
} from "lucide-react";

const services = [
  {
    icon: <Trees size={32} strokeWidth={1.5} className="text-[#78B943]" />,
    hoverIcon: <Trees size={32} strokeWidth={1.5} className="text-black" />,
    title: "Sustainable Forestry",
    description:
      "Comprehensive forest management for long-term ecological balance.",
  },
  {
    icon: <LeafyGreen size={32} strokeWidth={1.5} className="text-[#78B943]" />,
    hoverIcon: (
      <LeafyGreen size={32} strokeWidth={1.5} className="text-black" />
    ),
    title: "Biodiversity Preservation",
    description: "Protecting ecosystems and endangered species habitats.",
  },
  {
    icon: <Sprout size={32} strokeWidth={1.5} className="text-[#78B943]" />,
    hoverIcon: <Sprout size={32} strokeWidth={1.5} className="text-black" />,
    title: "Eco-Friendly Consulting",
    description: "Expert guidance for sustainable business practices.",
  },
  {
    icon: <Factory size={32} strokeWidth={1.5} className="text-[#78B943]" />,
    hoverIcon: <Factory size={32} strokeWidth={1.5} className="text-black" />,
    title: "Green Building Solutions",
    description: "LEED-certified sustainable construction methods.",
  },
  {
    icon: <Lightbulb size={32} strokeWidth={1.5} className="text-[#78B943]" />,
    hoverIcon: <Lightbulb size={32} strokeWidth={1.5} className="text-black" />,
    title: "Energy Audit",
    description: "Comprehensive analysis for energy efficiency optimization.",
  },
  {
    icon: <Droplets size={32} strokeWidth={1.5} className="text-[#78B943]" />,
    hoverIcon: <Droplets size={32} strokeWidth={1.5} className="text-black" />,
    title: "Water Management",
    description: "Innovative solutions for water conservation.",
  },
  {
    icon: <Flower2 size={32} strokeWidth={1.5} className="text-[#78B943]" />,
    hoverIcon: <Flower2 size={32} strokeWidth={1.5} className="text-black" />,
    title: "Organic Farming",
    description: "Sustainable agricultural practices.",
  },
  {
    icon: (
      <MountainSnow size={32} strokeWidth={1.5} className="text-[#78B943]" />
    ),
    hoverIcon: (
      <MountainSnow size={32} strokeWidth={1.5} className="text-black" />
    ),
    title: "Ecosystem Restoration",
    description: "Rehabilitating damaged natural environments.",
  },
];

const CARDS_PER_PAGE = 4;

const ServicesSection = () => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(services.length / CARDS_PER_PAGE);
  const sliderRef = useRef(null);

  const handleDotClick = (idx) => {
    setPage(idx);
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = idx * sliderRef.current.offsetWidth;
    }
  };

  const visibleServices = services.slice(
    page * CARDS_PER_PAGE,
    (page + 1) * CARDS_PER_PAGE
  );

  return (
    <section
      id="about"
      className="relative py-8 md:py-20 bg-white overflow-x-hidden flex justify-center items-center"
      style={{
        backgroundImage: "url('/city1-rotated.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "650px",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          pointerEvents: "none",
          background:
            "linear-gradient(to top right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 100%)",
        }}
      />

      <div className="relative z-10 items-center w-full max-w-[1200px] mx-auto px-4 gap-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 md:gap-0 px-4">
          <div className="text-center md:text-left max-w-2xl">
            <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
              <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
                <Leaf size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-semibold">
                Our Services
              </span>
            </div>
            <h2 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight mb-4">
              Comprehensive Environmental Solutions for a Sustainable Future
            </h2>
          </div>
          <button className="mt-2 px-7 py-3 rounded-lg bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-base flex items-center gap-2 shadow-lg transition w-fit">
            View All Services <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>

        {/* Cards slider */}
        <div
          ref={sliderRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full transition-all duration-500"
        >
          {visibleServices.map((service, i) => (
            <div
              key={`${service.title}-${i}`}
              className="group relative h-full rounded-3xl border-2 border-[#EAEAEA] bg-white py-6 px-4 transition-all duration-300 hover:bg-[#97D34B] hover:border-[#97D34B] hover:shadow-xl cursor-pointer"
            >
              <div className="mb-6 p-4 rounded-full bg-[#EAFDD5] group-hover:bg-[#78B943] transition-colors duration-300">
                <span className="block group-hover:hidden">{service.icon}</span>
                <span className="hidden group-hover:block">
                  {service.hoverIcon}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2 text-[#163820] group-hover:text-white transition-colors duration-300">
                {service.title}
              </h3>

              <p className="mb-4 text-[#767676] group-hover:text-white/90 transition-colors duration-300">
                {service.description}
              </p>

              <div className="font-semibold text-[#FFA726] group-hover:text-white transition-colors duration-300 flex items-center">
                Read More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                page === idx
                  ? "bg-[#FFA726] w-6"
                  : "bg-[#EAEAEA] hover:bg-[#FFA726]/50"
              }`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
