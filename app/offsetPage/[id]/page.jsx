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
import DonationModal from "../components/DonationModal.jsx";
import useOffsetStore from "@/stores/offsetStore";
import useEmissionsStore from "@/stores/emissionStore";
import { useSession } from "next-auth/react";

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

  // Check if emission data is valid and available
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
      console.log("Offset data after creating in details page :: ", data);
      setQuoteData(data);
      setIsDonationModalOpen(true);
    } catch (err) {
      console.error("Error getting offset quote:", err);
      // Handle error (show toast or error message)
    }
  };

  // Loading and error states from your store
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
            href="/offsetPage"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  // If no valid emission data, show message to calculate first
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
          href="/offsetPage"
          className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm hover:bg-white text-[#163820] font-semibold rounded-lg transition-all shadow-lg"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-4 py-2 bg-btn-primary text-white text-sm font-semibold rounded-full shadow-lg">
                {project.projectType || project.gold_standard_confirmation}
              </span>
              {project.verified && (
                <span className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full shadow-lg flex items-center gap-2">
                  <BadgeCheck size={16} />
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 justify-between">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                {project.name}
              </h1>
              {/* Display current emission info */}
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <p className="text-white/90 text-sm mb-1">
                  Your {calculationType} footprint:
                </p>
                <p className="text-white font-bold text-xl">
                  {getFormattedEmission()} tonnes CO₂e
                </p>
              </div>
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
                  {project.description}
                </p>
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
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <BadgeCheck className="text-green-600" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#163820]">
                      {project.certificationStandard ||
                        project.gold_standard_confirmation}
                    </h3>
                    <p className="text-[#767676]">
                      Internationally recognized certification
                    </p>
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
                  <div className="text-[#767676] text-lg">per tonne CO₂e</div>
                </div>

                {/* current emission amount to offset */}
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-[#767676] mb-1">
                      Offsetting your {calculationType} emissions:
                    </p>
                    <p className="text-2xl font-bold text-red-600">
                      {getFormattedEmission()} tonnes CO₂e
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

                <button
                  onClick={handleOffset}
                  className="w-full py-2 px-4 bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg shadow-btn-primary/20 hover:shadow-xl hover:shadow-btn-primary/30 flex items-center justify-center gap-3"
                >
                  <CheckCircle size={24} />
                  Offset {getFormattedEmission()} tonnes
                </button>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-bold text-[#163820] mb-4">
                    Quick Impact Calculator
                  </h3>
                  <div className="space-y-3 text-sm text-[#767676]">
                    <div className="flex justify-between">
                      <span>1 tonne CO₂e offset:</span>
                      <span className="font-semibold text-[#163820]">
                        {formatCurrency(
                          project.price_per_ton || project.donationValue
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>5 tonnes CO₂e offset:</span>
                      <span className="font-semibold text-[#163820]">
                        {formatCurrency(
                          (project.price_per_ton || project.donationValue) * 5
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>10 tonnes CO₂e offset:</span>
                      <span className="font-semibold text-[#163820]">
                        {formatCurrency(
                          (project.price_per_ton || project.donationValue) * 10
                        )}
                      </span>
                    </div>
                  </div>
                </div>
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