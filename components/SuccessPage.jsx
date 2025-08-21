"use client";
import {
  Award,
  DollarSign,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const OffsetSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loadingData, setLoadingData] = useState(true);

  // Get all data from URL parameters
  const getSuccessDataFromParams = () => {
    return {
      certification_name: searchParams.get("certification_name") || "N/A",
      project_name: searchParams.get("project_name") || "N/A",
      pricing: {
        price_per_metric_ton_usd: parseFloat(
          searchParams.get("price_per_ton") || "0"
        ),
        total_cost_usd: parseFloat(searchParams.get("total_cost") || "0"),
      },
      tonnes_offset: parseFloat(searchParams.get("tonnes_offset") || "0"),
    };
  };

  const successData = getSuccessDataFromParams();

  useEffect(() => {
    // loading to false after a short delay
    const timer = setTimeout(() => {
      setLoadingData(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleBackToHome = () => {
    router.push("/");
  };

  const handleBackToProjects = () => {
    router.push("/offsetPage");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4 mx-auto"></div>
          <p className="text-gray-600">Loading your offset details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-white/20"
        >
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white relative overflow-hidden">
            <h1 className="text-3xl font-bold mb-2">Offset Successful!</h1>
            <p className="text-green-100 text-lg">
              Thank you for making a positive environmental impact
            </p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Confirmation Details */}
            <motion.div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
              <h3 className="font-bold text-xl text-[#163820] mb-4 flex items-center gap-2">
                <Award className="text-green-600" size={24} />
                Your Carbon Offset
              </h3>

              <div className="grid grid-cols-1 gap-4 text-sm">
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600">Certification Name:</span>
                    <p className="font-semibold text-[#163820]">
                      {successData.certification_name}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600">Project:</span>
                    <p className="font-semibold text-[#163820]">
                      {successData.project_name}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pricing Summary */}
            <motion.div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6">
              <h3 className="font-bold text-xl text-[#163820] mb-4 flex items-center gap-2">
                <DollarSign className="text-emerald-600" size={24} />
                Payment Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price per Metric Ton:</span>
                  <span className="font-semibold text-[#163820]">
                    ${successData.pricing.price_per_metric_ton_usd.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tonnes Offset:</span>
                  <span className="font-semibold text-[#163820]">
                    {successData.tonnes_offset} tonnes
                  </span>
                </div>

                <div className="flex justify-between items-center text-lg border-t border-emerald-200 pt-3">
                  <span className="font-bold text-[#163820]">
                    Total Amount Paid:
                  </span>
                  <span className="font-bold text-green-600 text-2xl">
                    ${successData.pricing.total_cost_usd.toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <button
                onClick={handleBackToProjects}
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-semibold"
              >
                Back to Projects
              </button> */}
              <button
                onClick={handleBackToHome}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors font-semibold"
              >
                Back to Home
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OffsetSuccessPage;
