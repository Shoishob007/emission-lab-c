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
  ArrowDown,
} from "lucide-react";

// --- OBJECTIVES DATA ---
const objectives = [
  {
    icon: <Target />,
    title: "Empower Climate Action",
    description:
      "Enable everyone to understand, reduce, and offset their carbon footprint through actionable insights and easy-to-use tools.",
  },
  {
    icon: <Globe />,
    title: "Advance Sustainability",
    description:
      "Promote science-based, regenerative practices to build a sustainable future for our planet and its people.",
  },
  {
    icon: <Lightbulb />,
    title: "Drive Innovation",
    description:
      "Harness the power of AI and technology to craft climate solutions that deliver measurable impact.",
  },
  {
    icon: <BarChart3 />,
    title: "Deliver Transparent Data",
    description:
      "Ensure all carbon calculations and recommendations are open, clear, and accessible to everyone.",
  },
  {
    icon: <Users />,
    title: "Foster Community",
    description:
      "Grow meaningful partnerships and collaborations to amplify positive change and accelerate impact.",
  },
  {
    icon: <Leaf />,
    title: "Accelerate Earth Renewal",
    description:
      "Support projects and initiatives that restore natural ecosystems and regenerate the environment.",
  },
  {
    icon: <Shield />,
    title: "Champion Responsibility",
    description:
      "Advocate for ethical data practices and environmental stewardship in everything we do.",
  },
  {
    icon: <HeartHandshake />,
    title: "Promote Collaboration",
    description:
      "Unite businesses, governments, and communities to solve climate challenges hand-in-hand.",
  },
  {
    icon: <ArrowDown />,
    title: "Continual Progress",
    description:
      "Constantly measure, learn, and improve our approach for maximum climate impact.",
  },
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

function ParallaxImage() {
  // Simple and smooth parallax using scrollY and motion.div
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setScrollY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax effect: move slower than scroll, clamp for mobile
  const offset = typeof window !== "undefined" && window.innerWidth < 640 ? 0 : scrollY * 0.18;
  // Parallax image src: replace with yours as needed
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        marginBottom: "2.5rem",
        marginTop: "1.5rem",
        zIndex: 12,
        position: "relative",
      }}
    >
      <motion.img
        src="/CTA_bg_1.jpg"
        alt="Decorative leaf"
        style={{
          width: 320,
          maxWidth: "90vw",
          height: "auto",
          transform: `translateY(${offset}px)`,
          filter: "drop-shadow(0px 8px 40px rgba(151, 211, 75, 0.14))",
          opacity: 0.98,
        }}
      />
    </motion.div>
  );
}

export default function KeyObjectivesSection() {
  // Framer-motion animation for list
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) controls.start("show");
  }, [isInView, controls]);

  return (
    <section
      id="objectives"
      className="relative py-20 bg-white flex flex-col justify-center items-center overflow-x-hidden"
      style={{
        minHeight: "680px",
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

      {/* Parallax image on top with significant gap */}
      <ParallaxImage />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
              <Target size={22} strokeWidth={2} className="text-primary" />
            </span>
            <span className="uppercase text-primary tracking-widest text-xs font-semibold">
              Our Objectives
            </span>
          </div>
          <h2 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight capitalize text-center">
            Key <span className="text-primary">Objectives</span>
          </h2>
        </div>

        {/* OBJECTIVES LIST (ANIMATED, FLAT STYLE) */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex-1 bg-[#F7F7F7] rounded-2xl py-1 sm:py-3 px-2 sm:px-6 flex flex-col gap-5"
        >
          {objectives.map((objective, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex items-start gap-4"
            >
              <div className="flex items-center justify-center bg-white rounded-full p-2 w-10 h-10 shrink-0 shadow-sm">
                {React.cloneElement(objective.icon, {
                  className: "w-5 h-5 text-secondary",
                })}
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#163820] mb-1">
                  {objective.title}
                </h3>
                <p className="text-sm text-[#767676]">
                  {objective.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}