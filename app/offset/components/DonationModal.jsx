import { Heart, X, FileText, CreditCard, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useOffsetStore from "@/stores/offsetStore";
import { useSession } from "next-auth/react";

const DonationModal = ({
  isOpen,
  onClose,
  project,
  emissionValue,
  quoteData,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [activeTab, setActiveTab] = useState("info");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const {
    createStripeCheckoutSession,
    create_account,
    certification_name,
    setCreateAccount,
    setCertificationName,
    getUserInputs,
  } = useOffsetStore();

  const certificateNamePattern = /^[A-Za-z0-9 ]+$/;

  const handleCertificateNameChange = (value) => {
    const sanitized = value.replace(/[^A-Za-z0-9 ]/g, "");
    setCertificationName(sanitized);
    setErrors((prev) => ({
      ...prev,
      submit: undefined,
      certificate:
        sanitized !== value
          ? "Certificate name can only contain letters, numbers, and spaces."
          : undefined,
    }));
  };

  // total amount
  const pricePerTon = parseFloat(
    quoteData?.price_per_metric_ton_usd ||
      project.price_per_ton ||
      project.donationValue ||
      0,
  );
  const totalAmount = emissionValue * pricePerTon;

  const handleStripeCheckout = async () => {
    const normalizedName = certification_name.trim();

    if (!normalizedName) {
      setErrors({ submit: "Certificate name is required." });
      return;
    }

    if (!certificateNamePattern.test(normalizedName)) {
      setErrors({
        submit:
          "Certificate name can only contain letters, numbers, and spaces.",
      });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Stripe Checkout session
      const checkoutPayload = {
        amount: totalAmount,
        currency: "usd",
        project_id: project.id,
        user_id: userId,
        quote_id: quoteData.quote_id,
        success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}&quote_id=${quoteData.quote_id}`,
        cancel_url: `${window.location.origin}/cancel`,
      };

      console.log("Creating Stripe checkout with payload:", checkoutPayload);
      const data = await createStripeCheckoutSession(checkoutPayload);
      console.log("Stripe checkout session created:", data);

      // redirecting to Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No session URL returned from server");
      }
    } catch (err) {
      console.error("Error creating Stripe checkout:", err);
      setErrors({
        submit: err.message || "Failed to initiate payment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-gray-100 p-6 flex items-center justify-between flex-shrink-0">
            <div>
              <h2 className="text-2xl font-bold text-[#163820]">
                You are offsetting on
              </h2>
              <p className="text-[#767676] mt-1">{project.name}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} className="text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key="info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Impact Summary */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 rounded-xl p-6">
                  <h4 className="font-bold text-xl text-[#163820] mb-3">
                    Your Offset Value
                  </h4>
                  <div className="space-y-2 text-[#767676]">
                    <div className="flex justify-between">
                      <span>CO₂e Offset:</span>
                      <span className="font-semibold text-[#163820]">
                        {emissionValue} metric ton
                        {emissionValue !== 1 ? "s" : ""}
                      </span>
                    </div>
                    {quoteData && (
                      <>
                        <div className="flex justify-between">
                          <span>Price per metric ton:</span>
                          <span className="font-semibold text-[#163820]">
                            $
                            {parseFloat(
                              quoteData.price_per_metric_ton_usd,
                            ).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Amount:</span>
                          <span className="font-semibold text-primary text-lg">
                            ${parseFloat(quoteData.total_cost_usd).toFixed(2)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <h3 className="text-xl font-bold text-[#163820] mb-4">
                    Payment Information
                  </h3>
                  <p className="text-[#767676]">
                    You will be redirected to Stripe Checkout to complete your
                    payment securely. After successful payment, you&apos;ll be
                    redirected back to see your offset certificate.
                  </p>
                </div>

                {/* Account & Certification Inputs */}
                <div className="space-y-6 mt-8">
                  <div className="flex items-center justify-between">
                    <span className="text-[#163820] font-semibold">
                      Create an Account
                    </span>
                    <button
                      type="button"
                      onClick={() => setCreateAccount(!create_account)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        create_account ? "bg-green-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          create_account ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Certification Name */}
                  <div>
                    <label
                      htmlFor="certification_name"
                      className="block text-sm font-semibold text-[#163820] mb-2"
                    >
                      Certification Name
                    </label>
                    <input
                      id="certification_name"
                      type="text"
                      value={certification_name}
                      onChange={(e) =>
                        handleCertificateNameChange(e.target.value)
                      }
                      placeholder="Enter your certificate name"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    {errors.certificate && (
                      <p className="text-red-600 text-xs mt-2">
                        {errors.certificate}
                      </p>
                    )}
                  </div>
                </div>

                {/* Error Message */}
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 text-sm">{errors.submit}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 p-6 flex items-center justify-end flex-shrink-0">
            <button
              onClick={handleStripeCheckout}
              disabled={
                isSubmitting ||
                !certification_name.trim() ||
                !certificateNamePattern.test(certification_name.trim())
              }
              className={`px-8 py-3 bg-btn-primary hover:bg-btn-primary-hover text-white font-bold rounded-lg transition-colors flex items-center gap-2 shadow-lg ${
                isSubmitting ||
                !certification_name.trim() ||
                !certificateNamePattern.test(certification_name.trim())
                  ? "opacity-80 cursor-not-allowed"
                  : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  Proceed to Payment
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DonationModal;
