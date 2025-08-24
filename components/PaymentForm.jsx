import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { CreditCard, Lock, Shield, CheckCircle } from "lucide-react";

const PaymentForm = ({
  paymentData,
  onPaymentSuccess,
  onPaymentError,
  onBack,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  // Clear errors when user starts interacting
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const { error: confirmError, paymentIntent } =
        await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/payment-success?confirmation_number=${paymentData.quote_id}&quote_id=${paymentData.quote_id}`,
          },
          redirect: "if_required",
        });

      if (confirmError) {
        console.error("Payment confirmation error:", confirmError);
        setError(confirmError.message || "Payment failed. Please try again.");
        if (onPaymentError) {
          onPaymentError(confirmError);
        }
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("Payment succeeded:", paymentIntent);
        setPaymentStatus("succeeded");
        if (onPaymentSuccess) {
          onPaymentSuccess(paymentIntent);
        }
      } else {
        console.log("Payment status:", paymentIntent?.status);
        setError("Payment was not completed. Please try again.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message || "An unexpected error occurred.");
      if (onPaymentError) {
        onPaymentError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (paymentStatus === "succeeded") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#163820] mb-2">
          Payment Successful!
        </h3>
        <p className="text-[#767676] mb-6">
          Your offset contribution has been processed successfully.
        </p>
      </motion.div>
    );
  }

  console.log("Payment Status :: ", paymentStatus);

  return (
    <div className="space-y-6">
      {/* Payment Header */}
      <div className="pb-3 border-b border-gray-100">
        <div className="flex items-center justify-start gap-2 mb-2">
          <CreditCard className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-bold text-[#163820]">
            Payment Information
          </h3>
        </div>
        <p className="text-[#767676]">
          Complete your carbon offset contribution
        </p>
      </div>

      {/* Payment Summary */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 rounded-xl p-6">
        <h4 className="font-semibold text-[#163820] mb-3">Payment Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[#767676]">CO₂e Offset:</span>
            <span className="font-semibold text-[#163820]">
              {(paymentData.amount / (paymentData.price_per_ton || 1)).toFixed(
                2
              )}{" "}
              tonnes
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#767676]">Price per tonne:</span>
            <span className="font-semibold text-[#163820]">
              ${(paymentData.price_per_ton || 0).toFixed(2)}
            </span>
          </div>
          <div className="border-t border-green-200 pt-2 mt-2">
            <div className="flex justify-between">
              <span className="font-semibold text-[#163820]">
                Total Amount:
              </span>
              <span className="font-bold text-primary text-lg">
                ${paymentData.amount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#163820] mb-3">
            Payment Details
          </label>
          <div className="border border-gray-200 rounded-lg p-4 bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <PaymentElement
              options={{
                layout: "tabs",
                paymentMethodOrder: ["card"],
                fields: {
                  billingDetails: "auto",
                },
                // allowed payment methods
                paymentMethodTypes: ["card"],
                // wallets: {
                //   applePay: 'never',
                //   googlePay: 'never',
                // }
              }}
            />
          </div>
        </div>

        {/* Security Information */}
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-semibold text-[#163820] mb-1">
              Your payment is secure
            </p>
            <p className="text-[#767676]">
              We use industry-standard encryption to protect your payment
              information. Your card details are never stored on our servers.
            </p>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <p className="text-red-600 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              {error}
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-3 border border-gray-200 text-[#767676] font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            Back
          </button>

          <button
            type="submit"
            disabled={!stripe || isLoading}
            className="flex-1 px-6 py-3 bg-btn-primary hover:bg-btn-primary-hover disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin w-4 h-4 text-white"
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Pay ${paymentData.amount.toFixed(2)}
              </>
            )}
          </button>
        </div>
      </form>

      {/* Additional Security Info */}
      <div className="text-center text-xs text-[#767676] pt-4 border-t border-gray-100">
        <p>
          By completing this payment, you agree to our terms of service. Powered
          by <span className="font-semibold">Stripe</span>.
        </p>
      </div>
    </div>
  );
};

export default PaymentForm;