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
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import DonationModal from "../offsetPage/components/DonationModal";
import { useRouter } from "next/navigation";
import useOffsetStore from "@/stores/offsetStore";
import useEmissionsStore from "@/stores/emissionStore";
import { useSession } from "next-auth/react";
import {renderDescription} from "./../offsetPage/components/RenderProjectDetails"


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
    title: "Offset",
    desc: "Support with one-time or recurring payment.",
  },
  {
    icon: <CheckCircle2 className="w-7 h-7 text-secondary" />,
    color: "text-gray-700",
    title: "Get Certified",
    desc: "Receive certificates & track offset history.",
  },
];

function WhyMattersItem({ children }) {
  return (
    <div className="flex items-center gap-2 text-[#767676] text-base sm:text-lg">
      <ArrowRight className="text-btn-primary min-w-5" size={18} />
      <span>{children}</span>
    </div>
  );
}

function ProjectFeatureItem({ children }) {
  return (
    <div className="flex items-center gap-3 text-[#767676] text-base">
      <ArrowRight
        className="text-btn-primary min-w-5 flex-shrink-0"
        size={18}
      />
      <span>{children}</span>
    </div>
  );
}

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

function FeaturedProjectCard({
  project,
  onDonate,
  currentEmission,
  hasValidEmission,
}) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/offset/${project.id}`);
  };

  console.log("Project in the card :: ", project);

  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-100"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={project.image_url || project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          draggable={false}
        />
        {/* Project Type Badge */}
        <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-btn-primary text-white shadow">
          {project?.standard} Certified
        </span>
      </div>
      {/* Content Section */}
      <div className="p-6">
        {/* Project Name */}
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-[#163820] text-xl mb-2 line-clamp-2">
            {project.name}
          </h3>
        </div>
        {/* Project Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-between gap-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm text-[#767676]">
                    {/* <DollarSign size={14} className="text-primary flex-shrink-0" /> */}
                    <p>
                      <span className="text-base sm:text-lg text-primary">
                        ${project.price_per_ton}
                      </span>{" "}
                      per ton CO₂ emission
                    </p>
                  </div>
                  {/* <div className="flex items-center gap-1">
                    <p className="text-[#767676] text-sm">
                      <span className="text-base sm:text-lg text-primary">
                        {project.available_amount}
                      </span>{" "}
                      {project.available_amount > 1 ? "tons" : "ton"} of CO
                      <sub>2</sub>e to offset
                    </p>
                  </div> */}
                </div>
                {/* {hasValidEmission && (
                  <div className="flex justify-center items-center px-2">
                    <p>
                      <span className="text-base sm:text-lg text-primary">
                        ${(project.price_per_ton * currentEmission).toFixed(2)}
                      </span>
                    </p>
                  </div>
                )} */}
              </div>
              <p className="text-[#767676] text-base sm:text-lg leading-relaxed mb-4 line-clamp-3 min-h-[1rem]">
                {renderDescription({project})}
              </p>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-center">
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDonate();
            }}
            className="px-10 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Offset Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, onDonate, currentEmission, hasValidEmission }) {
  console.log("Current Emission in ProjectCard: ", currentEmission);
  const router = useRouter();
  const handleClick = () => {
    router.push(`/offset/${project.id}`);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image_url || project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          draggable={false}
        />
        {/* Project Type Badge */}
        <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-btn-primary text-white shadow">
          {project?.standard} Certified
        </span>
      </div>
      {/* Content Section */}
      <div className="p-5">
        {/* Project Name */}
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-[#163820] text-xl mb-3 line-clamp-2">
            {project.name}
          </h3>
        </div>
        {/* Project Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-between gap-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm text-[#767676]">
                    {/* <DollarSign size={14} className="text-primary flex-shrink-0" /> */}
                    <p>
                      <span className="text-base sm:text-lg text-primary">
                        ${project.price_per_ton}
                      </span>{" "}
                      per ton CO₂ emission
                    </p>
                  </div>

                </div>

              </div>
              <p className="text-[#767676] text-base sm:text-lg leading-relaxed mb-4 line-clamp-3 min-h-[1rem]">
                                  {renderDescription({project})}

              </p>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDonate();
            }}
            className="w-full py-2 px-4 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold text-sm rounded-lg transition-all duration-200"
          >
            Offset Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function OffsetPage() {
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [quoteData, setQuoteData] = useState(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // emission data
  const { currentEmission, isDataValid, clearEmissionData } =
    useEmissionsStore();

  const hasValidEmission = currentEmission && isDataValid();

  const {
    projects,
    defaultProjects,
    loading,
    error,
    fetchProjects,
    createOffsetQuote,
  } = useOffsetStore();

  // console.log("defaultProjects :: ", defaultProjects);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const regularProjects = projects.filter(
    (project) =>
      !defaultProjects.some((defaultProj) => defaultProj.id === project.id)
  );

  const loadMoreProjects = () => {
    setVisibleProjects((prev) => Math.min(prev + 6, regularProjects.length));
  };

  const showLessProjects = () => {
    setVisibleProjects((prev) => Math.max(prev - 6, 3));
  };

  const handleOffset = async (project) => {
    setSelectedProject(project);

    try {
      // if emission data is valid
      if (!isDataValid()) {
        alert("Your emission data has expired. Please calculate again.");
        clearEmissionData();
        return;
      }

      const data = await createOffsetQuote({
        project_id: project.id,
        carbon_emission_metric_tons: currentEmission,
      });
      console.log("data response :: ", data);
      setQuoteData(data);
      setIsDonationModalOpen(true);
    } catch (err) {
      console.error("Error getting offset quote:", err);
      //(toast or error message)
    }
  };

  const closeContributionModal = () => {
    setIsDonationModalOpen(false);
    setSelectedProject(null);
  };

  const displayedRegularProjects = regularProjects.slice(0, visibleProjects);
  const hasMoreProjects = visibleProjects < regularProjects.length;
  const canShowLess = visibleProjects > 3;

  if (loading && !projects.length) {
    return (
      <div className="min-h-[100vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[100vh] flex items-center justify-center">
        <div className="text-red-500">Error loading projects: {error}</div>
      </div>
    );
  }

  return (
    <section className="min-h-[100vh] py-14 px-2 bg-transparent">
      <div className="max-w-6xl mx-auto px-4">
        {/* HEADER */}
        {/* <div className="w-full max-w-5xl mx-auto mb-16">
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
              Helps neutralize unavoidable emissions.
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
        </div> */}
        {/* HOW TO OFFSET - Timeline */}
        {/* <div className="w-full flex flex-col items-center mb-20">
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
        </div> */}
        {/* OUR OFFSET PROJECTS */}
        <div className="mb-16">
          <div className="flex flex-col items-center">
            {/* Header Section */}
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
                  <Globe2 size={22} strokeWidth={2} className="text-primary" />
                </span>
                <span className="uppercase text-primary tracking-widest text-xs font-semibold">
                  Our Projects
                </span>
              </div>
              {/* <h2 className="font-bold text-[#163820] text-2xl sm:text-3xl mb-4 capitalize">
                Verified.{" "}
                <span className="text-[#37c048]">Transparent. Impactful</span>
              </h2> */}
            </div>
            {/* Project Features - Centered */}
            {/* <div className="bg-green-50/50 border border-green-100 rounded-2xl px-2 py-4 sm:p-6 mb-8 sm:mb-12 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProjectFeatureItem>
                  Verified by internationally recognized global climate
                  standards and certifications
                </ProjectFeatureItem>
                <ProjectFeatureItem>
                  Fully traceable with detailed impact certificates and
                  transparent progress reporting
                </ProjectFeatureItem>
                <ProjectFeatureItem>
                  Option to select specific project types that align with your
                  values
                </ProjectFeatureItem>
                <ProjectFeatureItem>
                  Offered in flexible units — you choose exactly how much to
                  offset
                </ProjectFeatureItem>
              </div>
            </div> */}
            {/* Default Projects Section */}
            {defaultProjects.length > 0 && (
              <div className="w-full mb-6">
                <div className="max-w-4xl mx-auto mb-6 text-center">
                  <h3 className="text-2xl font-bold text-[#163820] mb-2 capitalize">
                    Start with our recommended projects
                  </h3>
                  <p className="text-[#767676]">
                    These high-impact projects are carefully selected to
                    maximize your climate contribution
                  </p>
                </div>

                {/* Conditional grid layout for default projects */}
                <div className="w-full mx-auto">
                  {defaultProjects.length === 1 ? (
                    // Single default project - full width
                    <div className="grid grid-cols-1 max-w-4xl mx-auto">
                      {defaultProjects.map((project) => (
                        <FeaturedProjectCard
                          key={project.id}
                          project={project}
                          onDonate={() => handleOffset(project)}
                          currentEmission={currentEmission}
                          hasValidEmission={hasValidEmission}
                        />
                      ))}
                    </div>
                  ) : (
                    // multiple default projects
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl">
                      {defaultProjects.map((project) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          onDonate={() => handleOffset(project)}
                          currentEmission={currentEmission}
                          hasValidEmission={hasValidEmission}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* "explore additional" section if there are regular projects */}
                {displayedRegularProjects.length > 0 && (
                  <div className="max-w-4xl mx-auto mt-10 mb-6 text-center">
                    <h4 className="text-xl text-[#163820] font-medium">
                      Or explore additional projects to find your perfect match
                    </h4>
                    {/* <p className="text-[#767676] text-sm mt-2">
                      Browse our full portfolio of verified carbon offset
                      initiatives
                    </p> */}
                  </div>
                )}
              </div>
            )}

            {/* Regular Project Grid */}
            {displayedRegularProjects.length > 0 && (
              <div className="w-full">
                {defaultProjects.length === 0 && (
                  <div className="max-w-4xl mx-auto mb-6 text-center">
                    <h3 className="text-2xl font-bold text-[#163820] mb-2 capitalize">
                      Our Carbon Offset Projects
                    </h3>
                    <p className="text-[#767676]">
                      Explore our portfolio of verified carbon offset
                      initiatives
                    </p>
                  </div>
                )}

                {/* grid layout for regular projects */}
                <div
                  className={
                    displayedRegularProjects.length === 1
                      ? "grid grid-cols-1 max-w-4xl"
                      : displayedRegularProjects.length === 2
                      ? "grid grid-cols-1 md:grid-cols-2 max-w-7xl gap-4"
                      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl gap-4"
                  }
                >
                  {displayedRegularProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onDonate={() => handleOffset(project)}
                      currentEmission={currentEmission}
                      hasValidEmission={hasValidEmission}
                    />
                  ))}
                </div>
              </div>
            )}
            {/* Load More / See Less */}
            {(hasMoreProjects || canShowLess) && (
              <motion.button
                onClick={hasMoreProjects ? loadMoreProjects : showLessProjects}
                disabled={loading}
                className="mt-12 px-8 py-3 bg-btn-primary hover:bg-btn-primary-hover disabled:bg-btn-primary/50 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Loading...
                  </>
                ) : hasMoreProjects ? (
                  <>
                    Load More Projects
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    See Less Projects
                    <ArrowRight className="w-5 h-5 rotate-180" />
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>
        {/* SMALL STEPS BIG IMPACT */}
        <div className="mb-16 flex flex-col items-center justify-center">
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
      </div>
      {/* Donation Modal */}
      {selectedProject && (
        <DonationModal
          isOpen={isDonationModalOpen}
          onClose={closeContributionModal}
          project={selectedProject}
          emissionValue={currentEmission}
          quoteData={quoteData}
        />
      )}
    </section>
  );
}
