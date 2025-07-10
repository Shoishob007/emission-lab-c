/* eslint-disable @next/next/no-img-element */
"use client";
import {
  ArrowRight,
  Plane,
  Bus,
  Train,
  Building2,
  TreePine,
  Info,
  Check,
  Settings,
  MessageCircleQuestionIcon,
} from "lucide-react";
import Link from "next/link";

const calcScopes = [
  {
    id: 1,
    name: "Flights",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    desc: "Estimate carbon from air travel with simple input.",
  },
  {
    id: 2,
    name: "Bus",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    desc: "Calculate your bus travel's environmental impact.",
  },
  {
    id: 3,
    name: "Train travel",
    image: "/business/train.jpg",
    desc: "See emissions from rail journeys, fast.",
  },
  {
    id: 4,
    name: "Corporate & Business",
    image: "/landing-page/corporate.jpg",
    desc: "Analyze business or work-related consumptions.",
  },
  {
    id: 5,
    name: "And more",
    image: "/landing-page/more-calc.jpg",
    desc: "More categories coming soon!",
  },
];

export default function CalcPage() {
  return (
    <section className="min-h-[100vh] py-14 px-2 bg-transparent">
      <div className="max-w-6xl mx-auto px-4">
        {/* 1. HEADER SECTION */}
        <div className="grid md:grid-cols-[320px_1fr] gap-8 md:gap-16 mb-16 items-center">
          <div className="relative">
            <img
              src="https://res.cloudinary.com/dmazsiqdy/image/upload/v1751543740/emisison-lab/hero-carousel/2150196640_a3fuvi.jpg"
              alt="Carbon Footprint"
              className="rounded-full w-full object-cover aspect-square bg-white shadow"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
                <Info size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-bold">
                Carbon Footprint Calculator
              </span>
            </div>
            <h1 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight mb-2 capitalize">
              What is the{" "}
              <span className="text-primary">Carbon Footprint Calculator?</span>
            </h1>
            <p className="text-[#767676] text-base sm:text-lg max-w-7xl mt-3 mb-4">
              The Carbon Footprint Calculator is a simple yet powerful tool
              designed to help individuals understand their environmental
              impact. It gives you a clear picture of your footprint, so you can
              reduce, mitigate and communicate it with full transparency.
            </p>
            <p className="text-[#767676] text-base sm:text-lg mb-4 max-w-2xl">
              By analyzing everyday activities — such as travel, energy use, and
              consumption habits — the calculator estimates the amount of
              greenhouse gases (GHGs) you release into the atmosphere.
            </p>
            <div className="flex items-center gap-2 mt-3 ">
              <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
                <span className="font-semibold text-primary text-base">
                  <Check />
                </span>
              </span>
              <span className="text-[#163820] text-base font-semibold">
                Measured in CO₂e (kilograms/tons)
              </span>
            </div>
          </div>
        </div>

        {/* 2. WHY DOES IT MATTER */}
        <div className="grid md:grid-cols-[1fr_320px] gap-8 md:gap-16 mb-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
                <Info size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-bold">
                Why does it matter?
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#163820] mb-2 capitalize">
              Why should you{" "}
              <span className="text-primary">know your footprint?</span>
            </h2>
            <p className="text-[#767676] text-base sm:text-lg max-w-7xl mt-3 mb-4">
              We all contribute to climate change through the choices we make —
              often without realizing it. Whether it’s flying, commuting, or
              streaming online content, every action has a carbon cost.
            </p>
            <ul className="text-[#767676] text-base sm:text-lg space-y-2 mt-3">
              <li className="flex items-center gap-2">
                <ArrowRight className="text-btn-primary min-w-5" size={18} />
                <span>
                  <b>Awareness is the first step toward change.</b>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="text-btn-primary min-w-5" size={18} />
                Understanding your footprint helps you make smarter, more
                sustainable decisions.
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="text-btn-primary min-w-5" size={18} />
                Small changes can add up to big climate impact when done
                collectively.
              </li>
            </ul>
          </div>
          <div className="relative">
            <img
              src="https://res.cloudinary.com/dmazsiqdy/image/upload/v1751543740/emisison-lab/hero-carousel/2148997061_nmspea.jpg"
              alt="Earth climate change"
              className="rounded-full w-full object-cover aspect-square bg-white shadow"
            />
          </div>
        </div>

        {/* 3. WHAT CAN YOU CALCULATE */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
              <Check size={22} strokeWidth={2} className="text-primary" />
            </span>
            <span className="uppercase text-primary tracking-widest text-xs font-bold">
              What can you calculate?
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#163820] mb-4 capitalize">
            Instantly estimate{" "}
            <span className="text-primary">your emissions</span>
          </h2>
          <div className="w-full max-w-6xl grid gap-8 md:gap-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1">
            {calcScopes.map((scope) => (
              <div
                key={scope.id}
                className="group relative rounded-2xl overflow-hidden shadow-lg bg-white cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
                tabIndex={0}
                role="button"
                aria-label={scope.name}
                style={{ border: "1px solid #EAEAEA" }}
              >
                <div className="relative w-full h-56">
                  <img
                    src={scope.image}
                    alt={scope.name}
                    className="object-cover object-center w-full h-full transition-all duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 z-10 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
                    {scope.name}
                  </h3>
                  <p className="text-gray-50 text-base font-medium mb-5 line-clamp-3 drop-shadow">
                    {scope.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. WHAT CAN YOU DO AFTER CALCULATING */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 md:gap-16">
            {/* Desktop image - left column */}
            <div className="hidden md:block">
              <img
                src="https://res.cloudinary.com/dmazsiqdy/image/upload/v1751543740/emisison-lab/hero-carousel/2151262650_sytshg.jpg"
                alt="Offset and reduce"
                className="rounded-full w-full object-cover aspect-square bg-white shadow"
              />
            </div>
            {/* Content */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
                  <MessageCircleQuestionIcon
                    size={22}
                    strokeWidth={2}
                    className="text-primary"
                  />
                </span>
                <span className="uppercase text-primary tracking-widest text-xs font-bold">
                  What can you do after calculating?
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#163820] mb-2 capitalize">
                Take <span className="text-primary">real action</span> toward a
                lighter footprint
              </h2>
              <ul className="text-[#767676] text-base sm:text-lg space-y-2 mt-3">
                <li className="flex items-center gap-2">
                  <ArrowRight className="text-btn-primary min-w-5" size={18} />
                  Reduce emissions through sustainable lifestyle choices.
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="text-btn-primary min-w-5" size={18} />
                  Offset your unavoidable emissions via verified climate
                  projects.
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="text-btn-primary min-w-5" size={18} />
                  Track progress over time via your personal dashboard{" "}
                  <span className="italic text-xs text-[#8b5cf6]">
                    (coming soon)
                  </span>
                  .
                </li>
              </ul>
              {/* Mobile image, after content */}
              <div className="mt-6 md:hidden">
                <img
                  src="https://res.cloudinary.com/dmazsiqdy/image/upload/v1751543740/emisison-lab/hero-carousel/2151262650_sytshg.jpg"
                  alt="Offset and reduce"
                  className="rounded-full w-full aspect-square object-cover bg-white shadow"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 5. CTA SECTION */}
        <div className="w-full flex flex-col items-center justify-center mb-2">
          <div className="bg-primary/20 border border-[#e2f0e4] rounded-3xl py-10 px-6 shadow flex flex-col items-center w-full max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#163820] mb-2 text-center capitalize">
              Ready to Know Your Impact?
            </h3>
            <p className="text-[#767676] text-lg text-center mb-6">
              Use our calculator for free and start your journey to a lighter
              footprint.
            </p>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-3 bg-btn-primary hover:bg-btn-primary-hover transition text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg shadow-[#FFA72633] focus:ring-4 focus:ring-[#FFA72644] animate-bounce"
              style={{ letterSpacing: "0.02em" }}
            >
              Calculate Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
