import { Heart, X, FileText, CreditCard, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
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
  const isLoggedIn = !!session?.user?.id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [acceptTerms, setAcceptTerms] = useState(false);

  const {
    createStripeCheckoutSession,
    create_account,
    certification_name,
    setCreateAccount,
    setCertificationName,
  } = useOffsetStore();

  useEffect(() => {
    if (isLoggedIn) {
      setCreateAccount(false);
      setAcceptTerms(true);
    } else {
      setAcceptTerms(false);
    }
  }, [isLoggedIn, setCreateAccount]);

  // total amount
  const pricePerTon = parseFloat(
    quoteData?.price_per_metric_ton_usd ||
      project.price_per_ton ||
      project.donationValue ||
      0
  );
  const totalAmount = emissionValue * pricePerTon;

  const handleStripeCheckout = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      // Checkout session
      const checkoutPayload = {
        amount: totalAmount,
        currency: "usd",
        project_id: project.id,
        user_id: userId,
        quote_id: quoteData.quote_id,
        success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}&quote_id=${quoteData.quote_id}`,
        cancel_url: `${window.location.origin}/cancel`,
        email: session?.user?.email || null,
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

  // Check if proceed button should be disabled
  const isProceedDisabled = () => {
    // Always need certificate name
    if (!certification_name.trim()) return true;

    // If user is logged in, they already accepted terms
    if (isLoggedIn) return false;

    // If creating account, need to accept terms
    if (create_account && !acceptTerms) return true;

    return isSubmitting;
  };

  const handleTermsLinkClick = (e) => {
    e.preventDefault();
    window.open("/terms", "_blank");
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
                              quoteData.price_per_metric_ton_usd
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
                  {/* Create Account Toggle */}
                  {!isLoggedIn && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[#163820] font-semibold">
                          Create an Account
                        </span>
                        <button
                          type="button"
                          onClick={() => setCreateAccount(!create_account)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                            create_account ? "bg-primary" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              create_account ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Terms & Conditions Checkbox - Only show when creating account */}
                      {create_account && (
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                          <label className="flex items-start space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={acceptTerms}
                              onChange={(e) => setAcceptTerms(e.target.checked)}
                              className="mt-1 h-4 w-4 text-primary rounded focus:ring-primary"
                            />
                            <div className="text-sm">
                              <span className="text-[#163820] font-medium">
                                I agree to the{" "}
                                <a
                                  href="#"
                                  onClick={handleTermsLinkClick}
                                  className="text-primary hover:underline font-semibold"
                                >
                                  Terms and Conditions
                                </a>{" "}
                                and{" "}
                                <a
                                  href="#"
                                  onClick={handleTermsLinkClick}
                                  className="text-primary hover:underline font-semibold"
                                >
                                  Privacy Policy
                                </a>
                              </span>
                              <p className="text-[#767676] text-xs mt-1">
                                By creating an account, you agree to our terms
                                of service and privacy policy.
                              </p>
                            </div>
                          </label>
                        </div>
                      )}
                    </div>
                  )}

                  {/* User info if logged in */}
                  {isLoggedIn && (
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 rounded-lg p-3">
                      <p className="text-sm text-muted-foreground">
                        Your payment will be linked to your account.
                      </p>
                    </div>
                  )}

                  {/* Certification Name */}
                  <div>
                    <label
                      htmlFor="certification_name"
                      className="block font-semibold text-[#163820] mb-2"
                    >
                      Certificate Name
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      id="certification_name"
                      type="text"
                      value={certification_name}
                      onChange={(e) => setCertificationName(e.target.value)}
                      placeholder="Enter your certificate name"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    <p className="text-[#767676] text-xs mt-2">
                      This name will appear on your carbon offset certificate
                    </p>
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
              disabled={isProceedDisabled()}
              className={`px-8 py-3 bg-btn-primary hover:bg-btn-primary-hover text-white font-bold rounded-lg transition-colors flex items-center gap-2 shadow-lg ${
                isProceedDisabled()
                  ? "opacity-80 cursor-not-allowed"
                  : "hover:scale-[1.02] transition-transform"
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
