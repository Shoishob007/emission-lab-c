import { Code, Zap, Globe, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ApiJsonCard } from "@/components/ApiJsonCard";

const features = [
  {
    icon: <Code className="w-7 h-7 text-secondary" />,
    title: "RESTful API",
    description: "Simple, intuitive endpoints for seamless integration",
  },
  {
    icon: <Zap className="w-7 h-7 text-secondary" />,
    title: "Real-time Data",
    description: "Live carbon calculations and offset tracking",
  },
  {
    icon: <Globe className="w-7 h-7 text-secondary" />,
    title: "Global Coverage",
    description: "Worldwide emission factors and offset projects",
  },
  {
    icon: <Shield className="w-7 h-7 text-secondary" />,
    title: "Enterprise Security",
    description: "Bank-level encryption and data protection",
  },
];

export default function ApiSection() {
  return (
    <section
      id="api"
      className="relative py-20 bg-white flex justify-center items-center overflow-x-hidden"
    >
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-center gap-10">
        {/* API Visual/Code */}
        <div className="w-full lg:w-1/2  min-w-[320px] p-4 flex flex-col items-center justify-center">
          <ApiJsonCard />
        </div>

        {/* Textual content and features */}
        <div className="w-full lg:w-1/2 min-w-[320px] px-4 flex flex-col justify-center items-center lg:items-start">
          <div className="mb-8 w-full max-w-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
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
            <p className="text-base md:text-lg text-[#767676] mb-2 leading-relaxed max-w-xl">
              Integrate carbon measurement and offsetting capabilities directly
              into your business workflows with our robust APIs.
              <br />
              Our comprehensive API suite enables developers to embed
              environmental consciousness directly into their applications,
              making sustainability accessible to millions of users.
            </p>
            <p className="text-base text-[#767676] mb-6 leading-relaxed"></p>
            {/* <div className="bg-[#F7F7F7] rounded-2xl py-7 px-8 flex flex-col gap-5 mb-6">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-sm mr-2">
                    {feature.icon}
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
            </div> */}
            <div className="flex justify-center w-full">
              <Link href="/apiPage" passHref legacyBehavior>
                <button className="px-7 py-3 rounded-lg bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-base flex items-center gap-2 shadow-lg transition w-fit">
                  Explore Our APIs <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
