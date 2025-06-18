/* eslint-disable @next/next/no-img-element */
import { Leaf } from "lucide-react";

const steps = [
  {
    title: "Assessment & Planning",
    description:
      "We analyze environmental challenges, conduct research, and develop tailored solutions.",
    image: "/landing-page/assesment.jpg",
  },
  {
    title: "Implementation",
    description:
      "Our team executes the plan with sustainable practices and cutting-edge technology.",
    image: "/landing-page/implement.jpg",
  },
  {
    title: "Monitoring",
    description:
      "Continuous tracking of environmental impact and progress metrics.",
    image: "/landing-page/monitor.jpg",
  },
  {
    title: "Optimization",
    description:
      "Refining strategies based on data to maximize environmental benefits.",
    image: "/landing-page/optimize.jpg",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
              <Leaf size={22} strokeWidth={2} className="text-green-500" />
            </span>
            <span className="uppercase text-green-600 tracking-widest text-xs font-semibold">
              How it works
            </span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-14 gap-12">
            <div className="flex-1">
              <h2 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight">
                How our programs and actions{" "}
                <span className="text-primary"> work together</span>
              </h2>
            </div>
            <div className="flex-1 text-[#767676] text-lg max-w-xl">
              Our four-step process ensures comprehensive environmental
              solutions through assessment, implementation, monitoring, and
              optimization.
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="group flex flex-col items-center">
              <div className="rounded-2xl overflow-hidden shadow-md w-full aspect-[1.45/1] min-w-[220px] max-w-[332px] bg-gray-100">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  draggable={false}
                />
              </div>

              <div className="relative w-full flex justify-center my-4">
                <span
                  className={`
                  text-5xl font-extrabold
                  transition-all duration-300
                  text-transparent
                  group-hover:text-[#163820]/20
                  select-none
                  relative
                `}
                  style={{
                    fontFamily: '"Montserrat", Arial, Helvetica, sans-serif',
                    WebkitTextStroke: "2px #1638202f",
                  }}
                >
                  {(index + 1).toString().padStart(2, "0")}
                  <span
                    className={`
                    absolute inset-0 text-[#404040]/20
                    transition-opacity duration-300
                    opacity-0 group-hover:opacity-60
                    pointer-events-none
                  `}
                  >
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                </span>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#163820] mb-2">
                  {step.title}
                </h3>
                <p className="text-[#767676]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
