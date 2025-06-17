import { Code, Zap, Globe, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";

const features = [
  {
    icon: <Code className="w-7 h-7 text-primary" />,
    title: "RESTful API",
    description: "Simple, intuitive endpoints for seamless integration",
  },
  {
    icon: <Zap className="w-7 h-7 text-secondary" />,
    title: "Real-time Data",
    description: "Live carbon calculations and offset tracking",
  },
  {
    icon: <Globe className="w-7 h-7 text-primary" />,
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
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-10">
        {/* API Visual/Code */}
        <div className="w-full lg:w-1/2 max-w-[600px] min-w-[320px] p-4 flex flex-col items-center justify-center">
          <Card className="bg-slate-900 text-white border-none shadow-2xl overflow-hidden w-full max-w-[450px] mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-sm text-gray-400">
                  api.ecosphere.com
                </span>
              </div>
              <div className="space-y-4 text-sm font-mono">
                <div>
                  <span className="text-blue-400">POST</span>
                  <span className="text-gray-300"> /api/calculate</span>
                </div>
                <div className="text-gray-300 whitespace-pre-line">
                  {`{
  "transport": {
    "distance": 1200,
    "mode": "car"
  },
  "energy": {
    "consumption": 450,
    "source": "grid"
  }
}`}
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="text-green-400">Response:</div>
                  <div className="text-gray-300 whitespace-pre-line">
                    {`{
  "carbonFootprint": 2.1,
  "unit": "tons_co2",
  "breakdown": {
    "transport": 1.2,
    "energy": 0.9
  }
}`}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Textual content and features */}
        <div className="w-full lg:w-1/2 min-w-[320px] px-4 flex flex-col justify-center items-center lg:items-start">
          <div className="mb-8 w-full max-w-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
                <Code size={22} strokeWidth={2} className="text-green-500" />
              </span>
              <span className="uppercase text-green-600 tracking-widest text-xs font-semibold">
                API Integration
              </span>
            </div>
            <h2
              className="font-bold text-[#163820] text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4"
              style={{
                fontFamily: '"Montserrat", Arial, Helvetica, sans-serif',
                letterSpacing: 0,
                lineHeight: 1.18,
              }}
            >
              Powerful <span className="text-primary">API</span> Integration
            </h2>
            <p className="text-lg text-[#767676] mb-8 leading-relaxed">
              Integrate carbon measurement and offsetting capabilities directly
              into your business workflows with our robust APIs.
              <br />
              Our comprehensive API suite enables developers to embed
              environmental consciousness directly into their applications,
              making sustainability accessible to millions of users.
            </p>
            <p className="text-base text-[#767676] mb-6 leading-relaxed"></p>
            <div className="bg-[#F7F7F7] rounded-2xl py-7 px-8 flex flex-col gap-5 mb-6">
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
            </div>
            <div className="flex justify-end w-full">
              <Link href="/api" passHref legacyBehavior>
                <button
                  className="px-7 py-3 rounded-lg bg-[#FFA726] hover:bg-[#ff9800] text-white font-bold text-base flex items-center gap-2 shadow-lg transition w-fit"
                  style={{
                    fontFamily: "'Montserrat', Arial, Helvetica, sans-serif"
                  }}
                >
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
