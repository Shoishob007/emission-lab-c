// components/DonationModal.jsx
import { CheckCircle, Heart, Mail, MapPin, Phone, User, X, CreditCard, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useOffsetStore from "@/stores/offsetStore";
import useOffsetPaymentStore from "@/stores/offsetPaymentStore";
import PaymentForm from "@/components/PaymentForm";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const DonationModal = ({
  isOpen,
  onClose,
  project,
  emissionValue,
  quoteData,
  clearEmissionData
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('info');
  const [donationAmount, setDonationAmount] = useState(
    emissionValue ? parseFloat(emissionValue) : 1
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    certificationName: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedQuote, setConfirmedQuote] = useState(null);
  const { confirmOffsetQuote, setOffsetSuccess } = useOffsetStore();
  const { initializeStripe } = useOffsetPaymentStore();

  // total amount
  const pricePerTon = parseFloat(
    quoteData?.price_per_metric_ton_usd ||
      project.price_per_ton ||
      project.donationValue ||
      0
  );
  const totalAmount = donationAmount * pricePerTon;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleProceedToPayment = async () => {
    // validation
    if (!formData.fullName || !formData.email) {
      setErrors({
        fullName: !formData.fullName ? "Full name is required" : "",
        email: !formData.email ? "Email is required" : "",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // First confirm the quote
      const confirmPayload = {
        quote_id: quoteData.quote_id,
        payment_method: "stripe",
        payer_name: formData.fullName,
        payer_email: formData.email,
        certification_name: formData.certificationName || formData.fullName,
        amount: quoteData.total_cost_usd,
      };

      console.log("Confirming quote with payload:", confirmPayload);
      const data = await confirmOffsetQuote(confirmPayload);
      console.log("Quote confirmed successfully:", data);
      
      // if we got payment data
      if (data.payment_required && data.client_secret) {
        // the confirmed quote data with payment info
        setConfirmedQuote(data);
        
        // Initialize Stripe and switch to payment tab
        initializeStripe();
        setActiveTab('payment');
      } else {
        // if no payment required, redirect directly to success
        handleDirectSuccess(data);
      }
    } catch (err) {
      console.error("Error confirming quote:", err);
      setErrors({
        submit: err.message || "Failed to confirm quote. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectSuccess = (data) => {
    // success data in the store
    setOffsetSuccess(data);
    
    // Close modal
    onClose();

    // Redirect to success page
    const queryParams = new URLSearchParams({
      quote_id: quoteData.quote_id,
      certification_name:
        data.carbon_offset_details?.certification_name ||
        data.certification_name ||
        formData.certificationName ||
        formData.fullName,
      project_name: 
        data.carbon_offset_details?.project_name ||
        project.name || "",
      price_per_ton:
        data.pricing?.price_per_metric_ton_usd ||
        quoteData.price_per_metric_ton_usd,
      total_cost: 
        data.carbon_offset_details?.total_cost ||
        data.pricing?.total_cost_usd || 
        quoteData.total_cost_usd,
      tonnes_offset: 
        data.carbon_offset_details?.carbon_emission_metric_tons ||
        (quoteData.total_cost_usd / quoteData.price_per_metric_ton_usd).toFixed(2),
      confirmation_number: data.carbon_offset_purchase_id,
      certificate_number: data.carbon_offset_details?.certificate_number,
    });

    router.push(`/success?${queryParams.toString()}`);
  };

const handlePaymentSuccess = async (paymentIntent) => {
  try {
    console.log("Payment successful:", paymentIntent);
    
    // Combine the confirmed quote data with payment info
    const successData = {
      ...confirmedQuote,
      payment_intent_id: paymentIntent.id,
      payment_status: "completed",
      stripe_payment_intent: paymentIntent
    };

    // Set success data in the store
    setOffsetSuccess(successData);

    // Clear emission data after successful payment
    if (clearEmissionData) {
      clearEmissionData();
    }

    // Close modal
    onClose();

    // Redirect to success page with all the data
    const queryParams = new URLSearchParams({
      quote_id: quoteData.quote_id,
      certification_name:
        successData.carbon_offset_details?.certification_name ||
        successData.certification_name ||
        formData.certificationName ||
        formData.fullName,
      project_name: 
        successData.carbon_offset_details?.project_name ||
        project.name || "",
      price_per_ton:
        successData.pricing?.price_per_metric_ton_usd ||
        quoteData.price_per_metric_ton_usd,
      total_cost: 
        successData.carbon_offset_details?.total_cost ||
        successData.pricing?.total_cost_usd || 
        quoteData.total_cost_usd,
      tonnes_offset: 
        successData.carbon_offset_details?.carbon_emission_metric_tons ||
        (quoteData.total_cost_usd / quoteData.price_per_metric_ton_usd).toFixed(2),
      confirmation_number: successData.carbon_offset_purchase_id,
      certificate_number: successData.carbon_offset_details?.certificate_number,
      payment_intent_id: paymentIntent.id,
      payment_status: "completed"
    });

    router.push(`/success?${queryParams.toString()}`);

  } catch (err) {
    console.error("Error handling payment success:", err);
    setErrors({
      submit: err.message || "Payment successful but failed to redirect. Please contact support.",
    });
  }
};

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    setErrors({
      submit: error.message || "Payment failed. Please try again.",
    });
  };

  // Prepare payment data for the PaymentForm component
  const paymentData = confirmedQuote ? {
    // Use the client_secret from the confirmed quote
    client_secret: confirmedQuote.client_secret,
    payment_intent_id: confirmedQuote.payment_intent_id,
    amount: parseFloat(confirmedQuote.amount || quoteData?.total_cost_usd || totalAmount),
    price_per_ton: pricePerTon,
    description: `Carbon offset for ${project.name}`,
    quote_id: quoteData?.quote_id,
    payer_name: formData.fullName,
    payer_email: formData.email,
    certification_name: formData.certificationName || formData.fullName,
  } : null;

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

          {/* Tabs */}
          <div className="border-b border-gray-100 flex-shrink-0">
            <div className="flex">
              <button
                onClick={() => setActiveTab('info')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'info'
                    ? 'text-primary border-b-2 border-primary bg-primary/5'
                    : 'text-[#767676] hover:text-[#163820] hover:bg-gray-50'
                }`}
              >
                <FileText size={18} />
                Information
              </button>
              <button
                onClick={() => confirmedQuote && setActiveTab('payment')}
                disabled={!confirmedQuote}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'payment'
                    ? 'text-primary border-b-2 border-primary bg-primary/5'
                    : 'text-[#767676] hover:text-[#163820] hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed'
                }`}
              >
                <CreditCard size={18} />
                Payment
              </button>
            </div>
          </div>

          {/* Content - Single scrollable area */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeTab === 'info' && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 space-y-8"
                >
                  {/* Section 1: Impact Summary */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 rounded-xl p-6">
                    <h4 className="font-bold text-xl text-[#163820] mb-3">
                      Your Offset Value
                    </h4>
                    <div className="space-y-2 text-[#767676]">
                      <div className="flex justify-between">
                        <span>CO₂e Offset:</span>
                        <span className="font-semibold text-[#163820]">
                          {donationAmount} tonne{donationAmount !== 1 ? "s" : ""}
                        </span>
                      </div>
                      {quoteData && (
                        <>
                          <div className="flex justify-between">
                            <span>Price per tonne:</span>
                            <span className="font-semibold text-[#163820]">
                              $
                              {parseFloat(quoteData.price_per_metric_ton_usd).toFixed(
                                2
                              )}
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

                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-bold text-[#163820] mb-4">
                      Your Information
                    </h3>
                    <div className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-semibold text-[#163820] mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) =>
                              handleInputChange("fullName", e.target.value)
                            }
                            className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                              errors.fullName ? "border-red-300" : "border-gray-200"
                            }`}
                            placeholder="John Doe"
                          />
                        </div>
                        {errors.fullName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-[#163820] mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                              errors.email ? "border-red-300" : "border-gray-200"
                            }`}
                            placeholder="john@example.com"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>

                      {/* Certificate Name */}
                      <div>
                        <label className="block text-sm font-semibold text-[#163820] mb-2">
                          Certificate Name
                        </label>
                        <div className="relative">
                          <User
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <input
                            type="text"
                            value={formData.certificationName}
                            onChange={(e) =>
                              handleInputChange("certificationName", e.target.value)
                            }
                            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder={formData.fullName || "John Doe"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Error Message */}
                  {errors.submit && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-600 text-sm">{errors.submit}</p>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'payment' && paymentData && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-6"
                >
                  <Elements 
                    stripe={stripePromise}
                    options={{
                      clientSecret: paymentData.client_secret,
                      appearance: {
                        theme: 'stripe',
                        variables: {
                          colorPrimary: '#163820',
                          colorBackground: '#ffffff',
                          colorText: '#163820',
                          colorDanger: '#dc2626',
                          fontFamily: 'system-ui, sans-serif',
                          borderRadius: '8px',
                        },
                      },
                    }}
                  >
                    <PaymentForm
                      paymentData={paymentData}
                      onPaymentSuccess={handlePaymentSuccess}
                      onPaymentError={handlePaymentError}
                      onBack={() => setActiveTab('info')}
                    />
                  </Elements>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer - Only show for info tab */}
          {activeTab === 'info' && (
            <div className="border-t border-gray-100 p-6 flex items-center justify-end flex-shrink-0">
              <button
                onClick={handleProceedToPayment}
                disabled={isSubmitting}
                className="px-8 py-3 bg-btn-primary hover:bg-btn-primary-hover text-white font-bold rounded-lg transition-colors flex items-center gap-2 shadow-lg disabled:opacity-70"
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
                    <Heart size={18} />
                    Proceed to Payment
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DonationModal;