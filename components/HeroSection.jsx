/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    image:
      "https://res.cloudinary.com/dmazsiqdy/image/upload/v1751481357/emisison-lab/hero-carousel/78_nbf1ye.jpg",
    headline: (
      <>
        Join us on the Journey to regenerate the Earth
        <br />
        <span className="block">—Powered by purpose, driven by Data</span>
      </>
    ),
    subheading:
      "The all-in-one platform led you to a mission to drive the Erach Renewal Initiatives, restoring the balance between people, purpose, and the planet",
    primary: { text: "Learn How We Help", href: "#about" },
    secondary: { text: "Question In Mind?", href: "#faq" },
  },
  {
    image:
      "https://res.cloudinary.com/dmazsiqdy/image/upload/v1751481892/emisison-lab/hero-carousel/2150196692_p3csru.jpg",
    headline: (
      <>
        Measure. Reduce. Offset.
        <br />
        <span className="block">
          Your Path to a Sustainable Future Starts Here.
        </span>
      </>
    ),
    subheading:
      "Empowering individuals, businesses, and organizations to easily understand and manage their carbon footprint for a greener planet.",
    primary: { text: "Calculate Your Footprint Now", href: "/calculator" },
    secondary: { text: "Having Trouble?", href: "/contact" },
  },
  {
    image:
      "https://res.cloudinary.com/dmazsiqdy/image/upload/v1751481358/emisison-lab/hero-carousel/Green_Simple_Natural_Outdoor_Travel_Vlog_YouTube_Intro_Video_1_pa72rd.jpg",
    headline: (
      <>
        Unlock Your Climate Impact.
        <br />
        <span className="block">
          Simplified Carbon Management for a Healthier World.
        </span>
      </>
    ),
    subheading:
      "Discover precisely where your emissions come from, gain actionable insights to reduce them, and contribute to verified climate protection projects.",
    primary: { text: "Start Your Journey", href: "/login" },
    secondary: { text: "See Our Solutions", href: "#solutions" },
  },
  {
    image:
      "https://res.cloudinary.com/dmazsiqdy/image/upload/v1751481357/emisison-lab/hero-carousel/8_u6ih0l.png",
    headline: (
      <>
        The Future of Sustainability is Integrated.
        <br />
        <span className="block">Power Your Platform with Our Carbon APIs.</span>
      </>
    ),
    subheading:
      "Empower your applications with our robust API suite and drive measurable climate action and fostering a greener digital ecosystem.",
    primary: { text: "Explore Our APIs", href: "/apiPage" },
    secondary: { text: "View AI Features", href: "/aiPage" },
  },
];

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // transition handler
  const goToNextSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 1000);
  };

  // Auto-advance both slide and text together
  useEffect(() => {
    const interval = setInterval(goToNextSlide, 10000);
    return () => clearInterval(interval);
  }, [isTransitioning]);

  const getSlideClass = (idx) => {
    if (currentSlide !== idx) return "opacity-0";

    return "opacity-100";
  };

  const getTransitionClass = (idx) => {
    if (currentSlide === idx) {
      return "translate-x-0";
    }

    if (idx === (currentSlide + 1) % slides.length) {
      // entering slide from right
      return "translate-x-full";
    } else {
      // exiting slide to left
      return "-translate-x-full";
    }
  };

  return (
    <section className="relative h-[calc(100vh-96px)] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {slides.map((slide, idx) => (
        <div
          key={`slide-${idx}`}
          className={`
            absolute inset-0 transition-all duration-1000 ease-in-out
            ${getSlideClass(idx)}
            ${getTransitionClass(idx)}
          `}
          aria-hidden={currentSlide !== idx}
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
            draggable={false}
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-r from-black/50 to-black/50" />
          </div>
        </div>
      ))}

      <div className="relative z-10 flex flex-1 justify-center items-center w-full min-h-screen">
        <div className="max-w-5xl w-full px-4 py-12 bg-transparent rounded-xl flex flex-col items-center">
          {/* Animated Headline */}
          <h1
            className={`
              font-extrabold text-white drop-shadow-lg leading-tight 
              text-3xl md:text-4xl lg:text-5xl mb-4 tracking-tight text-center
              ${isVisible ? "animate-slideUp" : "opacity-0"}
            `}
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              lineHeight: 1.2,
              minHeight: "110px",
            }}
            key={currentSlide + "-headline"}
          >
            {slides[currentSlide].headline}
          </h1>

          {/* Animated Subheading */}
          <p
            className={`
              text-base md:text-lg text-gray-200 max-w-2xl mb-8 font-medium text-center
              ${isVisible ? "animate-fadeInUp" : "opacity-0"}
            `}
            style={{
              minHeight: "56px",
            }}
            key={currentSlide + "-subheading"}
          >
            {slides[currentSlide].subheading}
          </p>

          {/* Buttons */}
          <div
            className={`
              flex flex-col sm:flex-row items-center justify-center gap-4 w-full
              ${isVisible ? "animate-fadeInUp" : "opacity-0"}
              transition-opacity duration-400
            `}
            key={currentSlide + "-cta"}
          >
            <Link
              href={slides[currentSlide].primary.href}
              className="inline-flex items-center px-7 py-3 bg-btn-primary hover:bg-btn-primary-hover text-white text-base font-semibold rounded-md shadow-lg transition focus:outline-none"
            >
              {slides[currentSlide].primary.text}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href={slides[currentSlide].secondary.href}
              className="inline-flex items-center px-7 py-3 bg-btn-secondary hover:bg-btn-secondary-hover text-white text-base font-semibold rounded-md shadow-lg transition focus:outline-none"
            >
              {slides[currentSlide].secondary.text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;