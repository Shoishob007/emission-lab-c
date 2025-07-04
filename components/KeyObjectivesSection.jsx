"use client";
import React from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Target,
  Globe,
  Lightbulb,
  BarChart3,
  Users,
  Leaf,
  Shield,
  HeartHandshake,
} from "lucide-react";

const objectives = [
  {
    icon: <Target />,
    title: "Empower Climate Action",
    description:
      "Help individuals and organizations understand, reduce, and offset their carbon footprint with actionable insights.",
  },
  {
    icon: <Globe />,
    title: "Advance Sustainability",
    description:
      "Promote science-based, sustainable practices for a regenerative future for our planet.",
  },
  {
    icon: <Lightbulb />,
    title: "Drive Innovation",
    description:
      "Leverage AI and technology to create intelligent climate solutions that make a measurable difference.",
  },
  {
    icon: <BarChart3 />,
    title: "Deliver Transparent Data",
    description:
      "Provide clear, accurate, and accessible carbon calculations for everyone.",
  },
  {
    icon: <Users />,
    title: "Foster Community",
    description:
      "Build partnerships and collaborations to amplify climate impact and accelerate change.",
  },
  {
    icon: <Leaf />,
    title: "Accelerate Earth Renewal",
    description:
      "Support projects and actions that restore natural ecosystems and regenerate our environment.",
  },
  {
    icon: <Shield />,
    title: "Champion Responsibility",
    description:
      "Advocate for ethical, responsible data practices and environmental stewardship.",
  },
  {
    icon: <HeartHandshake />,
    title: "Promote Collaboration",
    description:
      "Unite businesses, governments, and communities to solve climate challenges together.",
  },
];

// Animation variants for staggered appearance
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function KeyObjectivesSection() {
  // In-view animation for the objectives
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) controls.start("show");
  }, [isInView, controls]);

  return (
    <section
      id="objectives"
      ref={ref}
      className="relative py-16 bg-white flex flex-col justify-center items-center overflow-x-hidden"
      style={{
        minHeight: "600px",
        backgroundImage: "url('/city1-rotated.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          pointerEvents: "none",
          background:
            "linear-gradient(to top right, rgba(255,255,255,0.88) 0%, rgba(255,255,255,1) 60%, rgba(255,255,255,1) 100%)",
        }}
      />
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        {/* Header - Increased text sizes */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-3">
              <Target size={22} strokeWidth={2} className="text-primary" />
            </span>
            <span className="uppercase text-primary tracking-widest text-xs font-semibold">
              Objectives
            </span>
          </div>
          <h2 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight capitalize text-center">
            Our Key <span className="text-primary">Objectives</span>
          </h2>
        </div>
        
        {/* Animated Objectives List - Increased text sizes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex-1 bg-[#F7F7F7] rounded-2xl py-8 sm:py-10 px-4 sm:px-8 flex flex-col gap-6"
        >
          {objectives.map((obj, i) => (
            <motion.div
              key={obj.title}
              variants={itemVariants}
              className="flex items-start gap-5"
            >
              <div className="flex items-center justify-center bg-white rounded-full p-3 w-12 h-12 shrink-0 shadow-sm">
                {React.cloneElement(obj.icon, {
                  className: "w-6 h-6 text-secondary",
                })}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#163820] mb-2">
                  {obj.title}
                </h3>
                <p className="text-base text-[#767676]">
                  {obj.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}