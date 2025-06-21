/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    headline: (
      <>
        Join us on the Journey to regenerate the Earth
        <br />
        <span className="block">—Powered by purpose, driven by Data</span>
      </>
    ),
    subheading:
      "The all-in-one platform led you to a mission to drive the Erach Renewal Initiatives, restoring the balance between people, purpose, and the planet",
    primary: "Learn How We Help",
    secondary: "See our Services",
  },
  {
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
    primary: "Calculate Your Footprint Now",
    secondary: "Learn How We Help",
  },
  {
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
    primary: "Start Your Journey",
    secondary: "See Our Solutions",
  },
  {
    headline: (
      <>
        The Future of Sustainability is Integrated.
        <br />
        <span className="block">Power Your Platform with Our Carbon APIs.</span>
      </>
    ),
    subheading:
      "Empower your applications with our robust API suite and drive measurable climate action and fostering a greener digital ecosystem.",
    primary: "Explore Our APIs",
    secondary: "View Documentation",
  },
];

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);

  // Slide interval
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsVisible(true);
      }, 400);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        videoRef.current.muted = true;
        videoRef.current.play();
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video */}
      <div className="absolute inset-0 z-0">
        <video
  ref={videoRef}
  autoPlay
  loop
  muted
  playsInline
  className="w-full h-full object-cover"
>
  <source src="https://res.cloudinary.com/dmazsiqdy/video/upload/v1750540137/emisison-lab/video-3.mp4" type="video/mp4" />
  <img
    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    alt="Nature background fallback"
    className="w-full h-full object-cover"
  />
</video>
      </div>
      {/* gradient overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

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
            <button className="inline-flex items-center px-7 py-3 bg-btn-primary hover:bg-btn-primary-hover text-white text-base font-semibold rounded-md shadow-lg transition focus:outline-none">
              {slides[currentSlide].primary}
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="inline-flex items-center px-7 py-3 bg-btn-secondary hover:bg-btn-secondary-hover text-white text-base font-semibold rounded-md shadow-lg transition focus:outline-none">
              {slides[currentSlide].secondary}
            </button>
          </div>
          {/* 
          // If want to re-enable avatars/reviews later
          */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;