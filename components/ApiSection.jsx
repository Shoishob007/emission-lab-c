import {
  Code,
  Zap,
  ArrowRight,
  FolderSync,
  FileJson,
  FileJson2,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { ApiJsonCard } from "@/components/ApiJsonCard";

const features = [
  {
    icon: <Zap strokeWidth={2} />,
    title: "Real-Time Emission Calculation",
    description:
      "Pull travel, logistics, utility, or manufacturing data — and instantly calculate carbon impact.",
  },
  {
    icon: <Code strokeWidth={2} />,
    title: "Flexible Integration",
    description: "Connect with CRMs, travel systems and more.",
  },
  {
    icon: <FolderSync strokeWidth={2} />,
    title: "Auto-Track & Sync",
    description:
      "Set up scheduled data syncs for recurring activities like shipping, commuting, or business flights.",
  },
  {
    icon: <FileJson strokeWidth={2} />,
    title: "Emission Reporting APIs",
    description:
      "Generate reports for internal ESG goals, customer disclosures, or investor compliance.",
  },
  {
    icon: <FileJson2 strokeWidth={2} />,
    title: "Offset Matching API",
    description:
      "Programmatically match emissions with certified offset projects — and offer real-time sustainability to your users.",
  },
];

const builtFor = [
  "Airlines & OTAs – show emissions in booking flow, offer offset options at checkout",
  "Enterprise Application – plug into finance, HR, Compliance systems for company-wide carbon reports",
  "Travel & Logistics Platforms – automate trip-level and package-level carbon insights",
];

const devFriendly = [
  "OAuth & token-based authentication",
  "Rich API documentation with use-case examples",
  "Sandbox & test environment",
  "Webhooks, versioning & error handling",
  "Developer support available",
];

export default function ApiSection() {
  return (
    <section
      id="api"
      className="relative py-20 bg-white flex justify-center items-center overflow-x-hidden"
    >
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 flex flex-col gap-12">
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 px-4">
          <div className="w-full lg:w-1/2 max-w-[600px] min-w-[320px] flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
                <Code size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-semibold">
                API Integration
              </span>
            </div>
            <h2 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight mb-1">
              Powerful <span className="text-primary">API</span> Integration
            </h2>
            <p className="font-semibold text-[#767676] text-base sm:text-lg leading-tight mb-4">
              Seamless Carbon Intelligence for Every System
            </p>
            <p className="text-lg text-[#767676] leading-relaxed">
              Integrate carbon measurement and offsetting capabilities directly
              into your business workflows with our robust APIs.
              <br />
              Our comprehensive API suite enables developers to embed
              environmental consciousness directly into their applications,
              making sustainability accessible to millions of users.
            </p>
          </div>
          {/* Right: API Visual/Code */}
          <div className="w-full lg:w-1/2 max-w-[600px] min-w-[320px] p-4 flex flex-col items-center justify-center">
            <ApiJsonCard />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
          {/* Left: Features */}
          <div className="w-full lg:w-1/2 max-w-[600px] flex flex-col gap-4 bg-[#F7F7F7] rounded-2xl p-4 sm:p-6">
            {/* <div className="text-lg font-semibold text-[#163820] mb-2">
              API Features
            </div> */}
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-sm mr-2 p-1.5 shrink-0">
                  {React.cloneElement(feature.icon, {
                    className: "w-full h-full text-secondary",
                  })}
                </span>
                <div>
                  <div className="text-base font-semibold text-[#163820] mb-1">
                    {feature.title}
                  </div>
                  <div className="text-sm text-[#767676]">
                    {feature.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Right */}
          <div className="w-full lg:w-1/2 max-w-[600px] flex flex-col gap-8 p-4 sm:p-6">
            {/* Built For */}
            <div>
              <div className="font-semibold text-[#163820] text-base mb-2">
                Built For:
              </div>
              <ul className="flex flex-col gap-2 mb-4">
                {builtFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-btn-primary mt-1 flex-shrink-0" />
                    <span className="text-[#767676] text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Developer-Friendly */}
            <div>
              <div className="font-semibold text-[#163820] text-base mb-2">
                Developer-Friendly
              </div>
              <ul className="flex flex-col gap-2">
                {devFriendly.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-btn-primary mt-1 flex-shrink-0" />
                    <span className="text-[#767676] text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-start w-full">
              <Link href="/api" passHref legacyBehavior>
                <button className="px-7 py-3 rounded-lg bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-base flex items-center gap-2 shadow-lg transition mx-auto sm:mx-0 sm:w-fit">
                  View Documentation <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
