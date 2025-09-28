/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Code,
  Zap,
  ArrowRight,
  FolderSync,
  FileJson,
  Check,
  Plane,
  Globe,
  TreePine,
  BadgeCheck,
  LayoutDashboard,
  TrendingUp,
  Users,
  PlaneTakeoff,
  Handshake,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const travelFeatures = [
  {
    icon: <Plane strokeWidth={2} />,
    title: "Flight Emission API",
    description:
      "Estimate carbon emissions per passenger or route using verified methodologies.",
  },
  {
    icon: <TreePine strokeWidth={2} />,
    title: "Offset Integration API",
    description:
      "Let your users instantly offset their travel emissions with a portfolio of verified carbon projects (reforestation, renewable energy, biodiversity).",
  },
  {
    icon: <Globe strokeWidth={2} />,
    title: "Multi-modal Transport Support",
    description:
      "Support for flights, trains, buses, and last-mile delivery in one simple integration.",
  },
];

const bookingFeatures = [
  {
    icon: <BadgeCheck strokeWidth={2} />,
    title: "Seamless API Integration",
    description:
      "Add sustainability at booking, cart, or payment stages without friction.",
  },
  {
    icon: <FileJson strokeWidth={2} />,
    title: "Green Travel Badges & CO₂ Labels",
    description:
      "Display badges or carbon labels on listings and at checkout for transparency.",
  },
  {
    icon: <LayoutDashboard strokeWidth={2} />,
    title: "Real-time Emissions Dashboard",
    description: "Instant internal reporting for your travel platform or OTA.",
  },
];

const businessBenefits = [
  {
    icon: <Users strokeWidth={2} />,
    title: "Build Trust & Loyalty",
    description:
      "Offer climate-conscious choices and build a reputation for sustainability.",
  },
  {
    icon: <TrendingUp strokeWidth={2} />,
    title: "Support ESG Goals",
    description:
      "Traceable emissions and offset reporting to support internal and external targets.",
  },
  {
    icon: <Zap strokeWidth={2} />,
    title: "AI-Generated Carbon Forecasts",
    description:
      "Get forward-looking insights and trend analysis for your business footprint.",
  },
  {
    icon: <Check strokeWidth={2} />,
    title: "Stay Ahead of Regulation",
    description:
      "Future-proof your platform for evolving compliance and customer expectations.",
  },
];

const ctaButtons = [
  {
    label: "Explore Our APIs",
    href: "/apiPage",
    style: "bg-btn-primary hover:bg-btn-primary-hover text-white",
    icon: <ArrowRight className="w-5 h-5" />,
  },
  {
    label: "Book a Demo",
    href: "/contact",
    style: "bg-btn-primary hover:bg-btn-primary-hover text-white",
    icon: <ArrowRight className="w-5 h-5" />,
  },
  {
    label: "Contact Our Team",
    href: "/contact",
    style: "bg-btn-primary hover:bg-btn-primary-hover text-white",
    icon: <ArrowRight className="w-5 h-5" />,
  },
];

export default function NewBusinessPage() {
  const router = useRouter();

  return (
    <section className="bg-[#0A2D23] min-h-screen py-12 px-4 flex flex-col items-center justify-start">
      <div className="max-w-6xl mx-auto px-3">
        {/* Header Section */}
        <div className="grid md:grid-cols-[720px_1fr] gap-8 md:gap-16 mb-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
                <Handshake size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-bold">
                Business Solutions
              </span>
            </div>
            <h1 className="font-bold text-3xl sm:text-4xl leading-tight mb-2 capitalize text-white">
              Empower Your Platform with{" "}
              <span className="text-primary">Emission Lab’s API Solutions</span>
            </h1>
            <p className="text-base sm:text-lg mt-3 mb-4 max-w-2xl text-white/90">
              At Emission Lab, we understand that modern businesses are expected
              to do more than operate efficiently — they’re expected to operate
              &nbsp;sustainably. Whether you&apos;re an Airline, an Online
              Travel Agency (OTA), or a global logistics provider, your
              customers expect transparency, responsibility, and measurable
              impact.
            </p>
            <p className="text-base sm:text-lg mb-4 max-w-2xl text-white/90">
              We’ve built real-time API solutions designed specifically for
              business environments like yours.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://res.cloudinary.com/dmazsiqdy/image/upload/v1752140066/emisison-lab/2150196705_fpw74u.jpg"
              alt="Business API"
              className="rounded-full w-full object-cover aspect-square shadow"
            />
          </div>
        </div>

        {/* Travel & Aviation Section */}
        <div className="grid md:grid-cols-[1fr_720px] gap-8 md:gap-16 mb-16 items-center">
          <div className="relative order-2 md:order-1">
            <img
              src="https://res.cloudinary.com/dmazsiqdy/image/upload/v1752139948/emisison-lab/2151908117_nzjw8u.jpg"
              alt="Travel API"
              className="rounded-full w-full object-cover aspect-square bg-white shadow"
            />
          </div>
          <div className="order-1 md:order-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
                <PlaneTakeoff
                  size={22}
                  strokeWidth={2}
                  className="text-primary"
                />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-bold">
                Tailored for Travel & Aviation
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 capitalize">
              Calculate &amp; Offset{" "}
              <span className="text-primary">in Real Time</span>
            </h2>
            <ul className="space-y-5 mt-5">
              {travelFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex items-center justify-center bg-transparent rounded-full border border-white/50 p-2 w-10 h-10 shadow">
                    {React.cloneElement(feature.icon, {
                      className: "w-5 h-5 text-secondary",
                    })}
                  </span>
                  <span>
                    <span className="font-semibold text-white/90">
                      {feature.title}
                    </span>
                    <br />
                    <span className="text-white/70 text-base">
                      {feature.description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* OTA/Booking Platform Section */}
        <div className="mb-16">
          <div className="w-full max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-stretch md:gap-12 gap-8">
              <div className="md:w-1/2 flex flex-col">
                <div className="flex flex-col ">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
                      <FileJson
                        size={22}
                        strokeWidth={2}
                        className="text-primary"
                      />
                    </span>
                    <span className="uppercase text-primary tracking-widest text-xs font-semibold">
                      Designed for OTAs &amp; Booking Platforms
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 capitalize">
                    Create <span className="text-primary">Sustainability</span>{" "}
                    at Checkout
                  </h2>
                  <p className="text-base md:text-lg text-white/90 mb-6 leading-relaxed">
                    Integrate climate action into your user experience and
                    reporting.
                  </p>
                </div>
                <ul className="text-[#767676] text-base sm:text-lg space-y-2 sm:mt-4">
                  {[
                    "Offer “Green Travel” badges or CO₂ labels on flight listings",
                    "Engage travelers with climate-positive options at point of decision",
                    "Access real-time emissions dashboards for internal sustainability reporting",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <ArrowRight
                        className="text-btn-primary min-w-5"
                        size={18}
                      />
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 bg-transparent rounded-2xl py-0 mt-4 sm:py-2 sm:px-6 flex flex-col gap-5">
                {bookingFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex items-center justify-center border border-white/50 rounded-full p-2 w-10 h-10 shrink-0">
                      {React.cloneElement(feature.icon, {
                        className: "w-5 h-5 text-secondary",
                      })}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white/90 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-white/70">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Business Benefits Section */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
                <Check size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-bold">
                Business Benefits
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 capitalize">
              Why Choose <span className="text-primary">Emission Lab?</span>
            </h2>
            <p className="text-white/90 text-base sm:text-lg mb-5">
              Join a growing network of climate-responsible leaders.
            </p>
            <ul className="space-y-5 mt-3">
              {businessBenefits.map((feature, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex items-center justify-center border border-white/50 rounded-full p-2 w-10 h-10 shadow">
                    {React.cloneElement(feature.icon, {
                      className: "w-5 h-5 text-secondary",
                    })}
                  </span>
                  <span>
                    <span className="font-semibold text-white/90">
                      {feature.title}
                    </span>
                    <br />
                    <span className="text-white/70 text-base">
                      {feature.description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img
              src="https://res.cloudinary.com/dmazsiqdy/image/upload/v1752139077/emisison-lab/24608_inb9mx.jpg"
              alt="Business Benefits"
              className="rounded-full w-full object-cover aspect-square bg-white shadow"
            />
          </div>
        </div>

        {/* Developer & Pricing Section */}
        <div className="mb-16 flex justify-center items-center w-full">
          <div className="max-w-3xl w-full mx-auto">
            <div className="flex items-center gap-2 mb-2 justify-center">
              <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
                <Code size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-bold">
                Ready to Integrate?
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 capitalize text-center">
              We Offer <span className="text-primary">Developers</span>{" "}
              Everything You Need
            </h2>
            {/* Feature list: centered container, left-aligned column */}
            <ul className="text-white/90 text-base sm:text-lg space-y-2 mt-3 sm:mt-4 mb-6 mx-auto max-w-md text-left">
              <li className="flex items-center gap-2">
                <ArrowRight className="text-btn-primary min-w-5" size={18} />
                <span>Developer-friendly API documentation</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="text-btn-primary min-w-5" size={18} />
                <span>Secure authentication with API keys & OAuth</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="text-btn-primary min-w-5" size={18} />
                <span>Ongoing technical support and climate advisory</span>
              </li>
            </ul>
            <p className="text-white/90 text-base sm:text-lg mb-2 text-center">
              Let’s build a greener travel experience — together.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="w-full flex flex-col items-center justify-center mb-2 mt-10">
          <div className="bg-emerald-950 border border-[#e2f0e4] rounded-3xl py-10 px-2 sm:px-6 shadow flex flex-col items-center w-full max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center capitalize">
              Ready to Build with Our API?
            </h3>
            <p className="text-white/70 text-lg text-center mb-6">
              👉 Get started today and bring carbon intelligence to your
              business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
              {ctaButtons.map((btn, idx) => (
                <Link
                  key={btn.label}
                  href={btn.href}
                  className={`inline-flex items-center justify-center gap-3 font-bold py-3 px-4 rounded-full text-base shadow transition focus:ring-4 ${btn.style}`}
                  style={{ letterSpacing: "0.02em", minWidth: "200px" }}
                >
                  {btn.label} {btn.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
