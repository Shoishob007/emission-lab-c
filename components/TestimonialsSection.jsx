/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import testimonials from "@/utils/data/testimonials.json";

// fixed image
const fixedImage = "/landing-page/testimonial.jpg";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const prevTestimonial = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  // For stars
  const stars = Array.from({ length: 5 });

  return (
    <section className="relative flex justify-center items-center py-20 min-h-[700px] px-2 bg-white">
      {/* Dot pattern bg */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml;utf8,<svg width="1600" height="850" xmlns="http://www.w3.org/2000/svg"><g fill="%231b4636" fill-opacity="0.13"><circle cx="5" cy="5" r="2"/><circle cx="25" cy="25" r="2"/><circle cx="45" cy="5" r="2"/><circle cx="65" cy="25" r="2"/></g></svg>\')',
          backgroundRepeat: "repeat",
          opacity: 0.18,
        }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
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
                Testimonials
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
              What our <span className="text-primary">supporters and</span>
              <br />
              <span className="text-primary">partners</span> say about our
              impact
            </h2>
          </div>
          {/* Google rating */}
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <FcGoogle size={32} title="Google" />
            <div className="flex items-center gap-1">
              {stars.map((_, i) => (
                <Star
                  key={i}
                  width={18}
                  height={18}
                  fill="#FFA726"
                  stroke="#FFA726"
                />
              ))}
            </div>
            <div className="text-orange-500 text-base font-semibold ml-2">
              5-star Customer Review
            </div>
          </div>
        </div>

        {/* Main testimonial */}
        <div className="mt-8 w-full flex flex-col lg:flex-row items-stretch justify-center gap-10">
          {/* Fixed Image */}
          <div className="flex-1 flex justify-center items-center min-w-[340px]">
            <div className="rounded-2xl overflow-hidden shadow-lg w-full max-w-[420px] h-[340px] bg-green-50/40 flex items-center justify-center">
              <img
                src={fixedImage}
                alt="Testimonial Hero"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Testimonial content */}
          <div className="flex-[1.5] flex flex-col justify-between px-2">
            <div className="flex items-center gap-4 mb-3">
              <img
                src={testimonials[current].companyLogo}
                alt={testimonials[current].company}
                className="h-8 w-8 rounded-full bg-green-100"
              />
              <span className="text-[#163820] font-bold text-xl">
                {testimonials[current].company}
              </span>
            </div>
            <div className="flex gap-2 items-center mb-3">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <Star
                  key={i}
                  width={16}
                  height={16}
                  fill="#FFA726"
                  stroke="#FFA726"
                />
              ))}
            </div>
            <blockquote className="text-[#163820] text-base md:text-lg leading-relaxed mb-4">
              &quot;{testimonials[current].quote}&quot;
            </blockquote>
            <div className="flex items-center gap-3 mt-4">
              <img
                src={testimonials[current].image}
                alt={testimonials[current].name}
                className="h-12 w-12 rounded-full object-cover border-2 border-primary"
              />
              <div>
                <div className="font-semibold text-[#163820]">
                  {testimonials[current].name}
                </div>
                <div className="text-green-700 text-sm">
                  {testimonials[current].role}
                </div>
              </div>
            </div>
            {/* Pagination dots and arrows */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 transition"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-green-800" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      current === idx ? "bg-green-600" : "bg-green-200"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 transition"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-green-800" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
