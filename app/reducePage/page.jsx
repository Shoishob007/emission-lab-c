/* eslint-disable @next/next/no-img-element */
"use client";
import {
  ArrowRight,
  Info,
  BarChart3,
  Lightbulb,
  TrendingDown,
  Route,
  ListChecks,
  Plane,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const IMAGE_EARTH = "/landing-page/sus-3.jpg";
const IMAGE_ACTION = "/landing-page/sus-3.jpg";

export default function ReducePage() {
  const steps = [
    {
      icon: <BarChart3 className="w-7 h-7 text-secondary" />,
      title: "Analyze your data",
      desc: "Finds your high-emission areas and top opportunities.",
    },
    {
      icon: <Route className="w-7 h-7 text-secondary" />,
      title: "Suggests pathways",
      desc: "Custom reduction strategies tailored to your profile.",
    },
    {
      icon: <Plane className="w-7 h-7 text-secondary" />,
      title: "Low-carbon travel",
      desc: "Helps you choose smarter travel options.",
    },
    {
      icon: <ListChecks className="w-7 h-7 text-secondary" />,
      title: "Real carbon savings",
      desc: "Actionable alternatives, best practices, and tracking.",
    },
  ];

  return (
    <section className="min-h-[100vh] py-14 px-2 font-['Montserrat','Arial','Helvetica',sans-serif'] bg-transparent">
      <div className="max-w-6xl mx-auto px-4">
        {/* HEADER: Reduce */}
        <div className="grid md:grid-cols-[320px_1fr] gap-8 md:gap-16 mb-16">
          {/* Image left for desktop, below on mobile */}
          <div className="hidden md:block">
            <img
              src={IMAGE_EARTH}
              alt="Reduce emissions"
              className="rounded-full w-full object-cover aspect-square bg-white shadow"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
                <TrendingDown
                  size={22}
                  strokeWidth={2}
                  className="text-primary"
                />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-bold">
                Reduce
              </span>
            </div>
            <h1 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight mb-3 capitalize">
              After understanding your carbon footprint,{" "}
              <span className="text-primary">take action to reduce it.</span>
            </h1>
            <p className="text-[#767676] text-base sm:text-lg max-w-4xl mt-3 mb-4">
              You can identify, plan, and implement strategies to lower your
              emissions — whether you&apos;re an individual, team, or business.
            </p>
            <p className="text-[#767676] text-base sm:text-lg mb-4 max-w-2xl">
              This isn&apos;t about perfection. It&apos;s about progress —
              empowering users with personalized recommendations and
              climate-smart alternatives to make more sustainable choices.
            </p>
            {/* Mobile image, below content */}
            <div className="mt-6 md:hidden">
              <img
                src={IMAGE_EARTH}
                alt="Reduce emissions"
                className="rounded-full w-full aspect-square object-cover bg-white shadow"
              />
            </div>
          </div>
        </div>

        {/* WHY IS REDUCING IMPORTANT */}
        <div className="grid md:grid-cols-[1fr_320px] gap-8 md:gap-16 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
                <Info size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-bold">
                Why is Reducing Emissions Important?
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#163820] mb-2 capitalize">
              Measuring is good,{" "}
              <span className="text-primary">Reducing is vital</span>
            </h2>
            <ul className="text-[#767676] text-base sm:text-lg space-y-2 mt-3">
              <li className="flex items-center gap-2">
                <ArrowRight className="text-[#FFA726] min-w-5" size={18} />
                Saves energy, costs, and resources.
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="text-[#FFA726] min-w-5" size={18} />
                Aligns with climate goals
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="text-[#FFA726] min-w-5" size={18} />
                Builds habits that support long-term sustainability.
              </li>
            </ul>
          </div>
          <div className="relative">
            <img
              src={IMAGE_EARTH}
              alt="Reduce emissions"
              className="rounded-full w-full object-cover aspect-square bg-white shadow"
            />
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="mb-16">
          <div className="w-full flex flex-col md:flex-row md:items-stretch md:gap-12 gap-8">
            {/* Main text/content */}
            <div className="flex-1 flex flex-col justify-center md:justify-start">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
                  <Settings
                    size={22}
                    strokeWidth={2}
                    className="text-primary"
                  />
                </span>
                <span className="uppercase text-primary tracking-widest text-xs font-semibold">
                  How it works
                </span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#163820] mb-2 capitalize"
              >
                Turn <span className="text-primary">insight</span> into{" "}
                <span className="text-primary">action</span>
              </h2>
              <p className="text-base md:text-lg text-[#767676] mb-6 leading-relaxed">
                Our step-by-step reduction system helps you analyze, strategize,
                and take real climate action. Each step is designed to be
                actionable and measurable, so you can make progress at your own
                pace.
              </p>
            </div>
            {/* Features */}
            <div className="w-full md:w-[380px] bg-[#F7F7F7] rounded-2xl py-7 px-6 flex flex-col gap-5 mx-auto">
              {steps.map((step, i) => (
                <HowItWorksFeature
                  key={i}
                  icon={step.icon}
                  title={step.title}
                  desc={step.desc}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>

        {/* SMALL STEPS BIG IMPACT */}
        <div className="mb-20 flex flex-col items-center justify-center">
          <div className="w-full max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-2 justify-center">
              <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
                <Lightbulb size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-bold">
                Small steps. Big impact.
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#163820] mb-2 text-center capitalize">
              Simple changes,{" "}
              <span className="text-primary">meaningful results</span>
            </h2>
            <p className="text-[#767676] text-base sm:text-lg max-w-6xl mt-3 mb-4 mx-auto text-center">
              From switching to LED lights to reducing flight frequency — every
              action matters. Our tools and insights help you take climate
              action at your own pace, without the overwhelm.
            </p>
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="w-full flex flex-col items-center justify-center mb-2">
          <div className="bg-primary/20 border border-[#e2f0e4] rounded-3xl py-10 px-6 shadow flex flex-col items-center w-full max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#163820] mb-2 text-center">
              Ready to Take Action?
            </h3>
            <p className="text-[#767676] text-lg text-center mb-6">
              👉 Explore smart, everyday ways to shrink your carbon footprint.
            </p>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-3 bg-[#FFA726] hover:bg-[#ffb84d] transition text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg shadow-[#FFA72633] focus:ring-4 focus:ring-[#FFA72644] animate-bounce"
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

// HOW IT WORKS
function HowItWorksFeature({ icon, title, desc, index }) {
  // Animation
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            delay: index * 0.18,
            duration: 0.5,
            ease: "easeOut",
          },
        },
      }}
      className="flex items-start gap-3"
    >
      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white mr-2">
        {icon}
      </span>
      <div>
        <div className="text-base font-semibold text-[#163820] mb-1">
          {title}
        </div>
        <div className="text-sm text-[#767676]">{desc}</div>
      </div>
    </motion.div>
  );
}
