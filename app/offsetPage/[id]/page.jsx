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
import { useState } from "react";
import DonationModal from "../components/DonationModal.jsx";
import { useSearchParams } from "next/navigation";
import useOffsetStore from "@/stores/offsetStore";

export default function ProjectDetailsPage({ params }) {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [quoteData, setQuoteData] = useState(null);
  const projectId = parseInt(params.id);
  const { projects, loading, error, createOffsetQuote } =
    useOffsetStore();
  const project = projects.find((p) => p.id === projectId);

  const searchParams = useSearchParams();
  const emissionValue = searchParams.get("emission");

const handleOffset = async () => {
    try {
      const data = await createOffsetQuote({
        project_id: projectId,
        carbon_emission_metric_tons: parseFloat(emissionValue),
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
          href={{
            pathname: "/offsetPage",
            query: { emission: emissionValue },
          }}
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {project.name}
            </h1>
            {/* <div className="flex flex-wrap items-center gap-6 text-white/90 text-lg">
              <div className="flex items-center gap-2">
                <MapPin size={20} />
                <span>{project.region || "Various locations"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building size={20} />
                <span>{project.source || "Unknown"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={20} />
                <span>
                  Published {project.publishDate ? formatDate(project.publishDate) : "Unknown"}
                </span>
              </div>
            </div> */}
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
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {formatCurrency(
                      project.price_per_ton || project.donationValue
                    )}
                  </div>
                  <div className="text-[#767676] text-lg">per tonne CO₂e</div>
                </div>

                <button
                  onClick={handleOffset}
                  className="w-full py-4 px-6 bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg shadow-btn-primary/20 hover:shadow-xl hover:shadow-btn-primary/30 flex items-center justify-center gap-3"
                >
                  <Heart size={24} />
                  Offset Now
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
        emissionValue={emissionValue}
        quoteData={quoteData}
      />
    </div>
  );
}