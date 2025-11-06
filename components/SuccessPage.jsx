"use client";
import { Award, DollarSign, BadgeCheck, FileText, Info } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useOffsetStore from "@/stores/offsetStore";
import useEmissionsStore from "@/stores/emissionStore";

const OffsetSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loadingData, setLoadingData] = useState(true);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState(null);

  const {
    confirmOffsetQuote,
    create_account,
    certificate_name,
    resetUserInputs,
    getUserInputs,
  } = useOffsetStore();
  const { clearEmissionData } = useEmissionsStore();

  const hasConfirmedRef = useRef(false);

  useEffect(() => {
    const confirmQuoteAfterPayment = async () => {
      if (hasConfirmedRef.current) {
        return;
      }
      hasConfirmedRef.current = true;

      try {
        const sessionId = searchParams.get("session_id");
        const quoteId = searchParams.get("quote_id");

        if (!sessionId || !quoteId) {
          throw new Error("Missing required parameters");
        }

        const userInputs = getUserInputs();

        const confirmPayload = {
          quote_id: quoteId,
          payment_method: "stripe_checkout",
          stripe_session_id: sessionId,
          create_account: userInputs.create_account,
          certificate_name: userInputs.certificate_name,
        };

        console.log("Payload to confirm :: ", confirmPayload);

        const data = await confirmOffsetQuote(confirmPayload);

        // clearing emission data after confirmation
        if (clearEmissionData) {
          clearEmissionData();
        }

        setSuccessData({
          // certificate_name: data.offset_details?.certificate_name || "N/A",
          project_name: data.offset_details?.project_name || "N/A",
          confirmation_number:
            data.offset_details?.confirmation_number ||
            data.carbon_offset_purchase_id,
          certificate_number: data.offset_details?.certificate_number,
          carbon_expiration_date: data.offset_details?.carbon_expiration_date,
          gold_standard_confirmation:
            data.offset_details?.gold_standard_confirmation,
          pricing: {
            price_per_metric_ton_usd: parseFloat(
              data.offset_details?.pricing?.price_per_metric_ton_usd || 0
            ),
            total_cost_usd: parseFloat(
              data.offset_details?.pricing?.total_cost_usd || 0
            ),
          },
          tonnes_offset: (
            (data.offset_details?.pricing?.total_cost_usd || 0) /
            (data.offset_details?.pricing?.price_per_metric_ton_usd || 1)
          ).toFixed(2),
        });
      } catch (err) {
        console.error("Error confirming quote:", err);
        setError(
          err.message ||
            "Failed to confirm your offset. Please contact support."
        );
      } finally {
        setLoadingData(false);
      }
    };

    confirmQuoteAfterPayment();
  }, [
    searchParams,
    confirmOffsetQuote,
    clearEmissionData,
    create_account,
    certificate_name,
    resetUserInputs,
    getUserInputs,
  ]);

  const handleBackToHome = () => {
    router.push("/");
  };

  const goToCertificate = (action = "preview") => {
    if (!successData?.certificate_number) {
      setError("Certificate number not available yet.");
      return;
    }

    // router.push(
    //   `/certificate/${successData.certificate_number}?action=${action}`
    // );
    const url = `/certificate/${successData.certificate_number}?action=${action}`;
    window.open(url, "_blank");
  };

  // Loader
  const SkeletonText = ({ className = "" }) => (
    <div className={`bg-gray-200 animate-pulse rounded h-4 ${className}`}></div>
  );

  const SkeletonCard = () => (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-2">
        <div className="bg-gray-200 animate-pulse rounded-full h-6 w-6"></div>
        <SkeletonText className="w-32 h-6" />
      </div>
      <div className="space-y-3">
        <SkeletonText className="w-3/4" />
        <SkeletonText className="w-1/2" />
        <SkeletonText className="w-2/3" />
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h2 className="text-xl font-bold text-red-800 mb-2">Error</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={handleBackToHome}
              className="px-6 py-3 bg-btn-secondary hover:bg-btn-secondary-hover text-white rounded-lg transition-colors font-semibold"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
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

          <div className="p-4 sm:p-8 space-y-6">
            {loadingData ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : successData ? (
              <>
                {/* Certification Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6"
                >
                  <h3 className="font-bold text-xl text-[#163820] flex items-center gap-2">
                    <Award className="text-primary" size={24} />
                    Your Carbon Offset Certificate
                  </h3>

                  {/* Disclaimer */}
                  <p className="mt-2 text-sm text-blue-500 italic mb-4 ">
                    Disclaimer: Currently we are issuing only test certificates,
                    not the official ones.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-4">
                      <div>
                        <span className="text-gray-600">
                          Certification Name:
                        </span>
                        <p className="font-semibold text-[#163820]">
                          {successData.certificate_name}
                        </p>
                      </div>

                      <div>
                        <span className="text-gray-600">Project:</span>
                        <p className="font-semibold text-[#163820]">
                          {successData.project_name}
                        </p>
                      </div>

                      {/* <div>
                        <span className="text-gray-600">Certified By:</span>
                        <p className="font-semibold text-primary flex items-center gap-1">
                          <BadgeCheck size={16} />
                          {successData?.gold_standard_confirmation}
                        </p>
                      </div> */}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="text-gray-600">Purchase ID #:</span>
                        <p className="font-semibold text-[#163820]">
                          {successData.confirmation_number}
                        </p>
                      </div>

                      <div>
                        <span className="text-gray-600">Certificate #:</span>
                        <p className="font-semibold text-[#163820]">
                          {successData.certificate_number}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Link-styled buttons for Preview and Download */}
                  <div className="mt-4 flex items-center gap-4">
                    <button
                      onClick={() => goToCertificate("preview")}
                      className="text-secondary hover:underline font-semibold text-sm"
                    >
                      Preview Certificate
                    </button>

                    <span className="text-gray-400">|</span>

                    <button
                      onClick={() => goToCertificate("download")}
                      className="text-secondary hover:underline font-semibold text-sm"
                    >
                      Download Certificate
                    </button>
                  </div>
                </motion.div>

                {/* Pricing Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6"
                >
                  <h3 className="font-bold text-xl text-[#163820] mb-4 flex items-center gap-2">
                    <DollarSign className="text-primary" size={24} />
                    Payment Summary
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Price per Metric Ton:
                      </span>
                      <span className="font-semibold text-[#163820]">
                        $
                        {successData.pricing.price_per_metric_ton_usd.toFixed(
                          2
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Total Offset Amount:
                      </span>
                      <span className="font-semibold text-[#163820]">
                        {successData.tonnes_offset} metric tons
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-lg border-t border-emerald-200 pt-3">
                      <span className="font-bold text-[#163820]">
                        Total Amount Paid:
                      </span>
                      <span className="font-bold text-primary text-2xl">
                        ${successData.pricing.total_cost_usd.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Additional Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-6"
                >
                  {/* <h3 className="font-bold text-xl text-[#163820] mb-4 flex items-center gap-2">
                    <Info className="text-primary" size={24} />
                    Disclaimer
                  </h3> */}
                  <p className="text-gray-600">
                    Your carbon offset certificate has been generated
                    successfully. You will receive an email confirmation with
                    your certificate attached. Thank you for contributing to a
                    sustainable future!
                  </p>
                </motion.div>
              </>
            ) : null}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center"
            >
              <button
                onClick={handleBackToHome}
                className="px-6 py-3 bg-btn-secondary hover:bg-btn-secondary-hover text-white rounded-lg transition-colors font-semibold"
              >
                Back to Home
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OffsetSuccessPage;
