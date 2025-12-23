/* eslint-disable @next/next/no-img-element */
"use client";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  BadgeCheck,
  Globe2,
  Heart,
  CheckCircle,
  Building,
  Award,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import DonationModal from "../../offsetPage/components/DonationModal.jsx";
import useOffsetStore from "@/stores/offsetStore";
import useEmissionsStore from "@/stores/emissionStore";
import { useSession } from "next-auth/react";
import { renderDescription } from "../../offsetPage/components/RenderProjectDetails.jsx";

export default function ProjectDetailsPage({ params }) {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [quoteData, setQuoteData] = useState(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const projectId = parseInt(params.id);
  const { projects, loading, error, createOffsetQuote } = useOffsetStore();
  const {
    currentEmission,
    getFormattedEmission,
    isDataValid,
    calculationType,
  } = useEmissionsStore();

  const project = projects.find((p) => p.id === projectId);

  // if emission data is valid and available
  const hasValidEmissionData = currentEmission && isDataValid();

  const handleOffset = async () => {
    if (!hasValidEmissionData) {
      console.error("No valid emission data available");
      return;
    }

    try {
      const data = await createOffsetQuote({
        project_id: projectId,
        carbon_emission_metric_tons: parseFloat(currentEmission),
      });
      // console.log("Offset data after creating in details page :: ", data);
      setQuoteData(data);
      setIsDonationModalOpen(true);
    } catch (err) {
      console.error("Error getting offset quote:", err);
    }
  };

  // loading and error states
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#163820] mb-4">
            {error ? error : "Project Not Found"}
          </h1>
          <Link
            href="/offset"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  // If no valid emission data
  if (!hasValidEmissionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#163820] mb-4">
            No Emission Data Available
          </h1>
          <p className="text-[#767676] mb-6">
            Please calculate your carbon footprint first before offsetting.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
          >
            Calculate Emissions
          </Link>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: project.currency || "USD",
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header Section */}
      <div className="relative h-[60vh] overflow-hidden max-w-6xl mx-auto">
        <img
          src={project.image_url || project.image}
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-b-sm" />

        {/* Back Button */}
        <Link
          href="/offset"
          className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm hover:bg-white text-[#163820] font-semibold rounded-lg transition-all shadow-lg"
        >
          <ArrowLeft size={20} />
          Back to Offset Projects
        </Link>

        {/* Project Header */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-4 py-2 bg-btn-primary text-white text-sm font-semibold rounded-full shadow-lg">
                {project.project_type || ""}
              </span>
              {project.is_active && (
                <span className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full shadow-lg flex items-center gap-2">
                  <BadgeCheck size={16} />
                  Active
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 justify-between">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                {project.name}
              </h1>
              {/* Display current emission info */}
              {hasValidEmissionData && (
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                  <p className="text-white/90 text-sm mb-1">
                    Your {calculationType} footprint:
                  </p>
                  <p className="text-white font-bold text-xl">
                    {getFormattedEmission()} MT of CO₂e
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Overview */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#163820] mb-6 flex items-center gap-3">
                <Globe2 className="text-primary" size={32} />
                Project Overview
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-[#767676] leading-relaxed text-lg mb-6">
                  {renderDescription({project})}
                </p>
              </div>

              {/* Project Key Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="text-primary flex-shrink-0" size={24} />
                    <h3 className="text-lg font-bold text-[#163820]">
                      Location
                    </h3>
                  </div>
                  <p className="text-[#767676] text-base">{project.location}</p>
                </div>

                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar
                      className="text-primary flex-shrink-0"
                      size={24}
                    />
                    <h3 className="text-lg font-bold text-[#163820]">
                      Vintage Year
                    </h3>
                  </div>
                  <p className="text-[#767676] text-base">{project.vintage}</p>
                </div>

                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Building
                      className="text-primary flex-shrink-0"
                      size={24}
                    />
                    <h3 className="text-lg font-bold text-[#163820]">
                      Project ID
                    </h3>
                  </div>
                  <p className="text-[#767676] text-base break-all">
                    {project.identification_number}
                  </p>
                </div>

                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="text-primary flex-shrink-0" size={24} />
                    <h3 className="text-lg font-bold text-[#163820]">
                      Registry
                    </h3>
                  </div>
                  <p className="text-[#767676] text-base">{project.standard}</p>
                </div>
              </div>
            </section>

            {/* Verification & Standards */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#163820] mb-6 flex items-center gap-3">
                <Award className="text-primary" size={32} />
                Verification & Standards
              </h2>
              <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <BadgeCheck className="text-primary" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#163820]">
                      {project.standard || "Verified and"} Certified
                    </h3>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-[#767676]">
                    <CheckCircle
                      className="text-green-500 flex-shrink-0"
                      size={20}
                    />
                    <span>Third-party verified</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#767676]">
                    <CheckCircle
                      className="text-green-500 flex-shrink-0"
                      size={20}
                    />
                    <span>Regular monitoring</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#767676]">
                    <CheckCircle
                      className="text-green-500 flex-shrink-0"
                      size={20}
                    />
                    <span>Transparent reporting</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#767676]">
                    <CheckCircle
                      className="text-green-500 flex-shrink-0"
                      size={20}
                    />
                    <span>Impact certification</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.info_link && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <a
                        href={project.info_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
                      >
                        <Globe2 size={20} />
                        View Official Project Information
                        <ArrowLeft size={16} className="rotate-180" />
                      </a>
                    </div>
                  )}
                  {project.validation_report && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <a
                        href={project.validation_report}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
                      >
                        <Globe2 size={20} />
                        View Validation Report
                        <ArrowLeft size={16} className="rotate-180" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Donation Card */}
              <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg mb-6">
                <div className="text-center mb-4">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                    {formatCurrency(
                      project.price_per_ton || project.donationValue
                    )}
                  </div>
                  <div className="text-[#767676] text-lg">
                    per metric ton CO₂e
                  </div>
                </div>

                {/* current emission amount to offset */}
                {hasValidEmissionData ? (
                  <div className="mb-4 p-4 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-[#767676] mb-1">
                        Offsetting your {calculationType} emissions:
                      </p>
                      <p className="text-2xl font-bold text-orange-400">
                        {getFormattedEmission()} MT of CO₂e
                      </p>
                      <p className="text-lg font-semibold text-[#163820] mt-2">
                        Total:{" "}
                        {formatCurrency(
                          (project.price_per_ton || project.donationValue) *
                            currentEmission
                        )}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 p-4 rounded-lg bg-gray-50 text-center border border-gray-100 shadow-sm">
                    <p className="text-lg font-semibold text-[#163820] mb-2">
                      Ready to Take Climate Action?
                    </p>
                    <p className="text-sm text-[#767676] leading-relaxed">
                      To support this project, you first need to understand your
                      carbon footprint. <br />
                      <span className="italic text-primary font-medium">
                        &quot;You can&apos;t offset what you don&apos;t
                        measure.&quot;
                      </span>
                      <br />
                      Calculate your emissions to discover how much CO₂e you
                      should offset.
                    </p>
                  </div>
                )}

                {hasValidEmissionData ? (
                  <button
                    onClick={handleOffset}
                    className="w-full py-2 px-4 bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg shadow-btn-primary/20 hover:shadow-xl hover:shadow-btn-primary/30 flex items-center justify-center gap-3"
                  >
                    <CheckCircle size={24} />
                    Offset
                  </button>
                ) : (
                  <Link
                    href="/calculator"
                    className="w-full block py-2 px-4 bg-btn-secondary hover:bg-btn-secondary-hover text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg shadow-btn-secondary/20 hover:shadow-xl hover:shadow-btn-secondary/30 text-center"
                  >
                    Calculate Your Footprint
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        project={project}
        emissionValue={currentEmission}
        quoteData={quoteData}
      />
    </div>
  );
}
