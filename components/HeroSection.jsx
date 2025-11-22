/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
    primary: { text: "Learn How We Help", href: "#about" },
    secondary: { text: "Question In Mind?", href: "#faq" },
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
    primary: { text: "Calculate Your Footprint Now", href: "/calculator" },
    secondary: { text: "Learn More", href: "/calculatorPage" },
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
    primary: { text: "Start Your Journey", href: "/login" },
    secondary: { text: "See Our Solutions", href: "#solutions" },
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
    primary: { text: "Explore Our APIs", href: "/apiPage" },
    secondary: { text: "View AI Features", href: "/aiPage" },
  },
];

const videoUrl =
  "https://res.cloudinary.com/dmazsiqdy/video/upload/q_auto:low,vc_h264,f_mp4,br_500k,ac_none,w_1280,c_limit,so_0,du_10/v1763811305/emisison-lab/Join_us_on_the_Journey_toregeneratethe_Earth_Powered_by_purpose_driven_by_Data_1_ebzzsj.mp4";

const mobileVideoUrl =
  "https://res.cloudinary.com/dmazsiqdy/video/upload/q_auto:low,vc_h264,f_mp4,br_300k,ac_none,w_720,c_limit,so_0,du_10/v1763811305/emisison-lab/Join_us_on_the_Journey_toregeneratethe_Earth_Powered_by_purpose_driven_by_Data_1_ebzzsj.mp4";

const posterUrl =
  "https://res.cloudinary.com/dmazsiqdy/video/upload/so_0,q_auto:low,f_jpg,w_1920/v1763811305/emisison-lab/Join_us_on_the_Journey_toregeneratethe_Earth_Powered_by_purpose_driven_by_Data_1_ebzzsj.jpg";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // loading video immediately for faster start
    setShouldLoadVideo(true);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[calc(100vh-96px)] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${posterUrl})`,
          backgroundColor: "#1a1a1a",
        }}
      />

      {/* Background video */}
      {shouldLoadVideo && (
        <video
          src={isMobile ? mobileVideoUrl : videoUrl}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={posterUrl}
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/50 to-black/50" />

      {/* Text content */}
      <div className="relative z-10 flex flex-1 justify-center items-center w-full min-h-screen">
        <div className="max-w-5xl w-full px-4 py-12 bg-transparent rounded-xl flex flex-col items-center">
          {/* Headline */}
          <h1
            className="font-extrabold text-white drop-shadow-lg leading-tight text-3xl md:text-4xl lg:text-5xl mb-4 tracking-tight text-center transition-all duration-500"
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

          {/* Subheading */}
          <p
            className="text-base md:text-lg text-gray-200 max-w-2xl mb-8 font-medium text-center transition-all duration-500"
            style={{ minHeight: "56px" }}
            key={currentSlide + "-subheading"}
          >
            {slides[currentSlide].subheading}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full transition-opacity duration-400">
            <Link
              href={slides[currentSlide].primary.href}
              className="inline-flex items-center px-7 py-3 bg-btn-primary hover:bg-btn-primary-hover text-white text-base font-semibold rounded-md shadow-lg transition focus:outline-none"
            >
              {slides[currentSlide].primary.text}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>

            {slides[currentSlide].secondary && (
              <Link
                href={slides[currentSlide].secondary.href}
                className="inline-flex items-center px-7 py-3 bg-btn-secondary hover:bg-btn-secondary-hover text-white text-base font-semibold rounded-md shadow-lg transition focus:outline-none"
              >
                {slides[currentSlide].secondary.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;