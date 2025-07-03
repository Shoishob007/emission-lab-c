/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Code,
  Zap,
  ArrowRight,
  FolderSync,
  FileJson,
  FileJson2,
  Check,
} from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { FloatingLoginModal } from "@/components/FloatingLogin";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  const { data: session } = useSession();
  const [showLoginModal, setShowLoginModal] = useState(false);
    const postmanRef = useRef(null);


  const router = useRouter();

  const handleClick = (e) => {
    if (!session?.user) {
      e.preventDefault();
      setShowLoginModal(true);
    } else {
            postmanRef.current?.click();

    }
  };

  return (
    <section className="min-h-[100vh] py-14 px-2 font-['Montserrat','Arial','Helvetica',sans-serif'] bg-transparent">
      <div className="max-w-6xl mx-auto px-4">
        {/* 1. HEADER SECTION */}
        <div className="grid md:grid-cols-[320px_1fr] gap-8 md:gap-16 mb-16 items-center">
          <div className="relative">
            <img
              src="https://res.cloudinary.com/dmazsiqdy/image/upload/v1751544262/emisison-lab/hero-carousel/2148233377_pvxjm0.jpg"
              alt="API Integration"
              className="rounded-full w-full object-cover aspect-square bg-white shadow"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
                <Code size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-bold">
                API Integration
              </span>
            </div>
            <h1 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight mb-2 capitalize">
              Powerful <span className="text-primary">Carbon API</span> for
              Developers
            </h1>
            <p className="text-[#767676] text-base sm:text-lg max-w-7xl mt-3 mb-4">
              Integrate carbon measurement and offsetting capabilities directly
              into your applications with our robust API suite. Designed for
              developers who want to build sustainability into their products.
            </p>
            <p className="text-[#767676] text-base sm:text-lg mb-4 max-w-2xl">
              Our comprehensive API enables you to embed environmental
              consciousness directly into your applications, making
              sustainability accessible to millions of users.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
                <span className="font-semibold text-primary text-base">
                  <Check size={22} strokeWidth={2} />
                </span>
              </span>
              <span className="text-[#163820] text-base font-semibold">
                RESTful API with JSON responses
              </span>
            </div>
          </div>
        </div>

        {/* 2. BUILT FOR SECTION */}
        <div className="grid md:grid-cols-[1fr_320px] gap-8 md:gap-16 mb-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
                <FileJson size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-bold">
                Industry Solutions
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#163820] mb-2 capitalize">
              Built for <span className="text-primary">your business</span>
            </h2>
            <p className="text-[#767676] text-base sm:text-lg max-w-7xl mt-3 mb-4">
              Our API is designed to meet the specific needs of various
              industries, helping you integrate carbon intelligence seamlessly
              into your existing workflows.
            </p>
            <ul className="text-[#767676] text-base sm:text-lg space-y-2 mt-3">
              {builtFor.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <ArrowRight className="text-[#FFA726] min-w-5" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img
              src="https://res.cloudinary.com/dmazsiqdy/image/upload/v1751539585/emisison-lab/api-2_eqna3r.jpg"
              alt="API Integration"
              className="rounded-full w-full object-cover aspect-square bg-white shadow"
            />
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div className="mb-16">
          <div className="w-full max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-stretch md:gap-12 gap-8">
              {/* Main text/content - fixed width */}
              <div className="md:w-[320px] flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
                    <Code size={22} strokeWidth={2} className="text-primary" />
                  </span>
                  <span className="uppercase text-primary tracking-widest text-xs font-semibold">
                    API Features
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#163820] mb-2 capitalize">
                  Powerful <span className="text-primary">capabilities</span>{" "}
                  for your applications
                </h2>
                <p className="text-base md:text-lg text-[#767676] mb-6 leading-relaxed">
                  Our API suite offers comprehensive carbon intelligence tools
                  designed for seamless integration. Each feature helps you
                  build sustainability directly into your products and
                  workflows.
                </p>
              </div>

              {/* Features - expanded area with original list style */}
              <div className="flex-1 bg-[#F7F7F7] rounded-2xl py-0 sm:py-2 sm:px-6 flex flex-col gap-5">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex items-center justify-center bg-white rounded-full p-2 w-10 h-10 shrink-0">
                      {React.cloneElement(feature.icon, {
                        className: "w-5 h-5 text-secondary",
                      })}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#163820] mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-[#767676]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. DEVELOPER FRIENDLY SECTION  */}
        <div className="grid grid-cols-1 gap-8 md:gap-16 md:grid-cols-[1fr_320px] items-center">
          {/* Text content */}
          <div className="order-2 md:order-none">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
                <Code size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-bold">
                Developer Experience
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#163820] mb-2 capitalize">
              Designed for <span className="text-primary">developers</span>
            </h2>
            <p className="text-[#767676] text-base sm:text-lg max-w-7xl mt-3 mb-4">
              We&apos;ve built our API with developers in mind, offering tools
              and features that make integration straightforward and efficient.
            </p>
            <ul className="text-[#767676] text-base sm:text-lg space-y-2 mt-3">
              {devFriendly.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <ArrowRight className="text-[#FFA726] min-w-5" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="order-1 md:order-none">
            <img
              src="https://res.cloudinary.com/dmazsiqdy/image/upload/v1751539587/emisison-lab/api-3_e1mx32.jpg"
              alt="Developer Friendly"
              className="rounded-full w-full object-cover aspect-square bg-white shadow"
            />
          </div>
        </div>

        {/* 5. CTA SECTION */}
        {/* <div className="w-full mt-20 mb-10 flex justify-center">
          <img
            src="https://res.cloudinary.com/dmazsiqdy/image/upload/v1751540266/emisison-lab/flow_davk1v.png"
            alt="Website Sitemap"
            className="w-full max-w-4xl rounded-xl shadow-md border border-gray-200"
          />
        </div> */}

        <div className="w-full flex flex-col items-center justify-center mb-2 mt-20">
          <div className="bg-primary/20 border border-[#e2f0e4] rounded-3xl py-10 px-2 sm:px-6 shadow flex flex-col items-center w-full max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#163820] mb-2 text-center capitalize">
              Ready to Build with Our API?
            </h3>
            <p className="text-[#767676] text-lg text-center mb-6">
              👉 Get started today and bring carbon intelligence to your
              application.
            </p>
            <a
          href="https://documenter.getpostman.com/view/22788049/2sB2xBEVzP"
          target="_blank"
          rel="noopener noreferrer"
          ref={postmanRef}
          style={{ display: "none" }}
        />
        <button
          className="inline-flex items-center gap-3 bg-[#FFA726] hover:bg-[#ffb84d] transition text-white font-bold py-3 px-4 sm:px-8 rounded-full text-lg shadow-lg shadow-[#FFA72633] focus:ring-4 focus:ring-[#FFA72644] animate-bounce"
          style={{ letterSpacing: "0.02em" }}
          onClick={handleClick}
          type="button"
        >
          Postman Documentation <ArrowRight className="w-5 h-5" />
        </button>
          <FloatingLoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
          </div>
        </div>
      </div>
    </section>
  );
}
