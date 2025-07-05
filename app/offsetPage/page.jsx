/* eslint-disable @next/next/no-img-element */
"use client";
import {
  ArrowRight,
  TrendingUp,
  Globe2,
  BadgeCheck,
  HandCoins,
  Settings,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Offset projects
const projects = [
  {
    title: "Renewable Energy Implementation",
    image: "/landing-page/renewable-energy-project.jpg",
    description:
      "Our renewable energy solutions harness the power of natural resources like solar.",
    cta: { text: "Read More", href: "/projects/1" },
  },
  {
    title: "Reforestation to Restore Natural",
    image: "/landing-page/reforestration-project.jpg",
    description:
      "Planting trees and restoring forests to absorb carbon and improve biodiversity.",
    cta: { text: "Read More", href: "/projects/2" },
  },
  {
    title: "Climate Action for a Greener Planet",
    image: "/landing-page/climate-awarness.jpg",
    description:
      "Community-driven projects empowering climate awareness and action.",
    cta: { text: "Read More", href: "/projects/3" },
  },
];

const flow = [
  {
    icon: <Settings className="w-7 h-7 text-secondary" />,
    color: "text-gray-700",
    title: "Calculate",
    desc: "Estimate your emissions for free.",
  },
  {
    icon: <BadgeCheck className="w-7 h-7 text-secondary" />,
    color: "text-gray-700",
    title: "Review",
    desc: "Get tailored offset suggestions.",
  },
  {
    icon: <Globe2 className="w-7 h-7 text-secondary" />,
    color: "text-gray-700",
    title: "Choose",
    desc: "Pick a project or let us auto-match.",
  },
  {
    icon: <HandCoins className="w-7 h-7 text-secondary" />,
    color: "text-gray-700",
    title: "Contribute",
    desc: "Support with one-time or recurring payment.",
  },
  {
    icon: <CheckCircle2 className="w-7 h-7 text-secondary" />,
    color: "text-gray-700",
    title: "Get Certified",
    desc: "Receive certificates & track offset history.",
  },
];

export default function OffsetPage() {
  return (
    <section className="min-h-[100vh] py-14 px-2 font-['Montserrat','Arial','Helvetica',sans-serif'] bg-transparent">
      <div className="max-w-6xl mx-auto px-4">
        {/* HEADER & WHY OFFSETTING MATTERS */}
        <div className="w-full max-w-5xl mx-auto mb-16">
          <div className="flex justify-center items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
              <TrendingUp size={22} strokeWidth={2} className="text-primary" />
            </span>
            <span className="uppercase text-primary tracking-widest text-xs font-bold">
              Offset
            </span>
          </div>
          <h1 className="font-bold text-center text-[#163820] text-3xl sm:text-4xl leading-tight mb-3 capitalize">
            Even after{" "}
            <span className="text-primary">reducing your emissions</span>, some
            carbon output is unavoidable.
          </h1>
          <p className="text-[#767676] text-base sm:text-lg max-w-5xl mt-3 mb-4">
            Carbon Offsetting allows you to take climate responsibility by
            funding verified environmental projects that absorb or reduce
            greenhouse gases elsewhere.{" "}
            <span className="font-semibold text-[#163820]">
              <br />
              Offsetting is not a free pass to pollute
            </span>
            , but a powerful tool to balance your footprint — while supporting
            global sustainability efforts.
          </p>
          <div className="flex flex-col gap-2 mb-6 mt-6 max-w-2xl">
            <WhyMattersItem>
              Helps neutralize unavoidable emissions
            </WhyMattersItem>
            <WhyMattersItem>
              Supports global climate action aligned with the{" "}
              <span className="font-semibold text-[#163820]">
                Paris Agreement
              </span>
              .
            </WhyMattersItem>
            <WhyMattersItem>
              Directly contributes to{" "}
              <span className="font-semibold text-[#163820]">
                nature restoration
              </span>{" "}
              and{" "}
              <span className="font-semibold text-[#163820]">
                renewable energy
              </span>
              .
            </WhyMattersItem>
            <WhyMattersItem>
              Builds climate-conscious habits across individuals and
              organizations.
            </WhyMattersItem>
          </div>
        </div>

        {/* HOW TO OFFSET - Timeline */}
        <div className="w-full flex flex-col items-center mb-20">
          <div className="max-w-4xl w-full">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
                <Settings size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-semibold">
                How to Offset
              </span>
            </div>
            <h2 className="font-bold text-[#163820] text-center text-2xl sm:text-3xl mb-6 capitalize">
              Offset your <span className="text-primary">emission</span> in a
              few simple steps
            </h2>
            <OffsetTimeline steps={flow} />
          </div>
        </div>

        {/* OUR OFFSET PROJECTS */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
                  <Globe2 size={22} strokeWidth={2} className="text-primary" />
                </span>
                <span className="uppercase text-primary tracking-widest text-xs font-semibold">
                  Our Projects
                </span>
              </div>
              <h2 className="font-bold text-[#163820] text-2xl sm:text-3xl mb-2 capitalize">
                Verified.{" "}
                <span className="text-[#37c048]">Transparent. Impactful</span>
              </h2>
              <div className="text-[#767676] text-base sm:text-lg mt-3 max-w-xl">
                All our offset projects are:
                <ul className="mt-2 list-disc pl-5 space-y-1 text-[#767676] text-sm sm:text-lg">
                  <li>Verified by global standards</li>
                  <li>Fully traceable with certificates</li>
                  <li>Option to select specific project types</li>
                  <li>Offered in units — you choose how much to offset</li>
                </ul>
              </div>
              <Link
                href="/projectsPage"
                className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FFA726] hover:bg-[#ffb84d] text-white font-bold text-base transition whitespace-nowrap shadow"
              >
                See More Projects <ArrowRight className="w-5 h-5 text-white" />
              </Link>
            </div>
            {/* Project cards */}
            <div className="w-full lg:w-[480px] flex flex-col gap-7 mt-10 lg:mt-0">
              {projects.map((project, i) => (
                <ProjectCard key={i} {...project} />
              ))}
            </div>
          </div>
        </div>

        {/* SMALL STEPS BIG IMPACT */}
        <div className="mb-20 flex flex-col items-center justify-center">
          <div className="w-full max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-2 justify-center">
              <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
                <Lightbulb size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-bold">
                Your action. Global impact.
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#163820] mb-2 text-center capitalize">
              Every Action Plants a Seed{" "}
              <span className="text-primary">for Tomorrow</span>
            </h2>
            <p className="text-[#767676] text-base sm:text-lg max-w-4xl mt-3 mb-4 mx-auto text-center">
              Offsetting isn&apos;t just about numbers — it&apos;s about
              regenerating ecosystems, empowering communities, and investing in
              a better future.
            </p>
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="w-full flex flex-col items-center justify-center mb-2">
          <div className="bg-primary/20 border border-[#e2f0e4] rounded-3xl py-10 px-6 shadow flex flex-col items-center w-full max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#163820] mb-2 text-center capitalize">
              Take Responsibility. Make a Difference.
            </h3>
            <p className="text-[#767676] text-lg text-center mb-6">
              👉 Browse verified climate projects &amp; offset your footprint
              today.
            </p>
            <Link
              href="/projectsPage"
              className="inline-flex items-center gap-3 bg-[#FFA726] hover:bg-[#ffb84d] transition text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg shadow-[#FFA72633] focus:ring-4 focus:ring-[#FFA72644] animate-bounce"
              style={{ letterSpacing: "0.02em" }}
            >
              Calculate to Offset <ArrowRight className="w-5 h-5 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyMattersItem({ children }) {
  return (
    <div className="flex items-center gap-2 text-[#767676] text-base sm:text-lg">
      <ArrowRight className="text-btn-primary min-w-5" size={18} />
      <span>{children}</span>
    </div>
  );
}

// time for "How to Offset"
function OffsetTimeline({ steps }) {
  return (
    <div className="offset-timeline w-full relative mt-4">
      {/* Mobile Layout */}
      <div className="flex flex-col md:hidden">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-4 w-full mb-8">
            <div className="flex flex-col items-center">
              <span className="mb-2">{step.icon}</span>
              {i !== steps.length - 1 && (
                <span
                  className="w-1 h-16"
                  style={{
                    background:
                      "linear-gradient(180deg,#16bf2f 40%,#16bf2f 100%)",
                    zIndex: 0,
                  }}
                />
              )}
            </div>

            {/* Content column */}
            <div className="flex-1 pt-1">
              <div className={`font-bold ${step.color} text-lg mb-1`}>
                {step.title}
              </div>
              <div className="text-[#767676] text-sm">{step.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex">
        {steps.map((step, i) => (
          <div
            key={i}
            className="relative flex flex-col items-center flex-1 min-w-[120px]"
          >
            <div className="relative flex flex-col items-center">
              <span className="mb-2">{step.icon}</span>
              {/* Horizontal line */}
              {i !== steps.length - 1 && (
                <span
                  className="absolute left-full top-1/2 -translate-y-1/2 h-1 w-[100px] md:w-[140px]"
                  style={{
                    background:
                      "linear-gradient(90deg,#e2f0e4 40%,#FFA726 100%)",
                    zIndex: 0,
                  }}
                />
              )}
            </div>
            <div
              className={`font-bold ${step.color} text-lg text-center mb-1 mt-2`}
            >
              {step.title}
            </div>
            <div className="text-[#767676] text-sm text-center max-w-[170px]">
              {step.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// Project Cards
function ProjectCard({ title, image, description, cta }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden flex flex-row h-[140px] bg-[#18352b] items-stretch group cursor-pointer transition-shadow duration-400"
      style={{
        minWidth: 280,
        maxWidth: 480,
        boxShadow: "0 8px 32px 0 rgba(0,0,0,0.14)",
      }}
    >
      {/*  badge */}
      <span className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-xs font-semibold bg-btn-primary text-white shadow shadow-[#FFA72655] select-none">
        Coming Soon
      </span>

      <img
        src={image}
        alt={title}
        className="!h-120px sm:h-full sm:w-[44%] min-w-[110px] object-cover transition-transform duration-500 group-hover:scale-105"
        draggable={false}
        style={{ display: "block" }}
      />
      <div className="flex-1 flex flex-col justify-center px-5">
        <div className="font-semibold text-white text-lg leading-snug truncate mt-3 sm:mt-0">
          {title}
        </div>
        <div className="text-white/90 text-sm mt-2 line-clamp-3">
          {description}
        </div>
        <Link
          href={cta.href}
          className={`
            inline-flex items-center gap-1 font-semibold text-btn-primary hover:underline text-base mt-2
            opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-400
          `}
        >
          {cta.text} <ArrowRight className="w-4 h-4 text-btn-primary" />
        </Link>
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 transition-all duration-400 pointer-events-none" />
      <style jsx>{`
        @media (max-width: 600px) {
          div[class*="flex-row"] {
            flex-direction: column !important;
            height: auto !important;
            min-width: 0 !important;
            max-width: 100% !important;
          }
          img {
            height: 120px !important;
          }
        }
      `}</style>
    </div>
  );
}
