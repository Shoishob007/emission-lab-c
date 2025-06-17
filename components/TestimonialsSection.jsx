/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";


const testimonials = [
  {
    name: "Roshan Singh",
    role: "General Manager",
    company: "Logoipsum",
    companyLogo: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",
    groupImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",
    quote:
      "Their sustainability initiatives have truly made a difference! Proud to support their efforts for a greener planet. Innovative solutions that bring real environmental impact. Their work in water conservation is outstanding. Implementing their green practices in my business has been a game-changer. Highly recommended!",
    rating: 5
  },
  {
    name: "Sarah Johnson",
    role: "Head of Sustainability",
    company: "Eco Partners",
    companyLogo: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80",
    groupImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",
    quote:
      "The dedication and innovation from this team helped us reach our sustainability goals faster than we thought possible. Their platform is intuitive and reliable.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Sustainability Analyst",
    company: "GreenTech",
    companyLogo: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    groupImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",
    quote:
      "Working with them has opened new doors for us. The carbon tracking tools are state-of-the-art and their team is always ready to help.",
    rating: 5
  },
  {
    name: "Emma Rodriguez",
    role: "Chief Operations Officer",
    company: "Sustainable Ventures",
    companyLogo: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    groupImage: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
    quote:
      "Their API integration made it seamless to embed sustainability into our core operations. The impact on our business and the environment has been incredible.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const prevTestimonial = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  // For stars
  const stars = Array.from({ length: 5 });

  return (
    <section
      className="relative flex justify-center items-center py-20 min-h-[700px] px-2 bg-white"
    >
      {/* Dot pattern bg */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg width=\"1600\" height=\"850\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"%231b4636\" fill-opacity=\"0.13\"><circle cx=\"5\" cy=\"5\" r=\"2\"/><circle cx=\"25\" cy=\"25\" r=\"2\"/><circle cx=\"45\" cy=\"5\" r=\"2\"/><circle cx=\"65\" cy=\"25\" r=\"2\"/></g></svg>')",
          backgroundRepeat: "repeat",
          opacity: 0.18
        }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400" viewBox="0 0 24 24">
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
              <span className="uppercase text-green-600 tracking-widest text-xs font-semibold">
                Testimonials
              </span>
            </div>
            <h2 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight mb-4"
              style={{
                fontFamily: '"Montserrat", Arial, Helvetica, sans-serif',
                letterSpacing: 0,
                lineHeight: 1.18,
              }}>
              What our supporters and<br />partners say about our impact
            </h2>
          </div>
          {/* Google rating */}
          <div className="flex items-center gap-4 mt-6 md:mt-0">
  <FcGoogle size={32} title="Google" />
  <div className="flex items-center gap-1">
    {stars.map((_, i) => (
      <svg key={i} width="18" height="18" fill="#FFA726" viewBox="0 0 24 24">
        <path d="M12 17.75L6.16 21l1.13-6.62L2 9.99l6.66-.97L12 3.75l3.34 5.27 6.66.97-4.8 4.4L17.84 21z" />
      </svg>
    ))}
  </div>
  <div className="text-orange-500 text-base font-semibold ml-2">5.00 Customer Review</div>
</div>
        </div>

        {/* Main testimonial card */}
        <div className="mt-8 w-full flex flex-col lg:flex-row items-stretch justify-center gap-10">
          {/* Left: Image */}
          <div className="flex-1 flex justify-center items-center min-w-[340px]">
            <div className="rounded-2xl overflow-hidden shadow-lg w-full max-w-[420px] h-[340px] bg-green-50/40 flex items-center justify-center">
              <img
                src={testimonials[current].groupImage}
                alt={testimonials[current].company}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Right: Testimonial content */}
          <div className="flex-[1.5] flex flex-col justify-between px-2">
            <div className="flex items-center gap-4 mb-3">
              <img src={testimonials[current].companyLogo} alt={testimonials[current].company} className="h-8 w-8 rounded-full bg-green-100" />
              <span className="text-[#163820] font-bold text-xl">{testimonials[current].company}</span>
            </div>
            <div className="flex gap-2 items-center mb-3">
              <svg width="28" height="28" fill="#FFA726" viewBox="0 0 24 24">
                <path d="M17.65 17.65q-1.05 0-1.8-.75T15.1 15.1q0-1.05.75-1.8t1.8-.75q1.05 0 1.8.75t.75 1.8q0 1.05-.75 1.8t-1.8.75Zm-11.3 0q-1.05 0-1.8-.75T3.8 15.1q0-1.05.75-1.8t1.8-.75q1.05 0 1.8.75t.75 1.8q0 1.05-.75 1.8t-1.8.75Z" />
              </svg>
            </div>
            <blockquote className="text-[#163820] text-base md:text-lg leading-relaxed mb-4">
              &quot;{testimonials[current].quote}&quot;
            </blockquote>
            <div className="flex items-center gap-3 mt-4">
              <img
                src={testimonials[current].image}
                alt={testimonials[current].name}
                className="h-12 w-12 rounded-full object-cover border-2 border-green-400"
              />
              <div>
                <div className="font-semibold text-[#163820]">{testimonials[current].name}</div>
                <div className="text-green-700 text-sm">{testimonials[current].role}</div>
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
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${current === idx ? 'bg-green-600' : 'bg-green-200'}`}
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

        {/* Brand logos row */}
        {/* <div className="w-full border-t border-green-800 mt-16 pt-8 flex flex-wrap gap-8 justify-center items-center">
          {brands.map((logo, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <img src={logo} alt="Brand logo" className="h-8 w-auto" />
              <span className="text-white font-semibold text-lg">Logoipsum</span>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}