import { CheckCircle, Heart, Mail, MapPin, Phone, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import useOffsetStore from "@/stores/offsetStore";

const DonationModal = ({ isOpen, onClose, project, emissionValue, quoteData }) => {
  const [donationAmount, setDonationAmount] = useState(
    emissionValue ? parseFloat(emissionValue) : 1
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    isAnonymous: false,
    marketingEmails: false,
    taxReceipt: true,
    certificationName: "", 
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { confirmOffsetQuote } = useOffsetStore();

  // total amount
  const pricePerTon = parseFloat(quoteData?.price_per_metric_ton_usd || project.price_per_ton || project.donationValue || 0);
  const totalAmount = donationAmount * pricePerTon;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.fullName || !formData.email) {
      setErrors({
        fullName: !formData.fullName ? "Full name is required" : "",
        email: !formData.email ? "Email is required" : "",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // payload
      const confirmPayload = {
        quote_id: quoteData.quote_id,
        payment_method: "stripe",
        payer_name: formData.fullName,
        payer_email: formData.email,
        certification_name: formData.certificationName || formData.fullName,
        amount: quoteData.total_cost_usd,
      };

      const data = await confirmOffsetQuote(confirmPayload);
      console.log("Offset confirmed:", data);
      
      // successful confirmation (redirect to payment)
      onClose();
    } catch (err) {
      console.error('Error confirming offset:', err);
      // toast or error message
      setErrors({
        submit: err.message || "Failed to confirm offset. Please try again.",
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
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-gray-100 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#163820] flex items-center gap-3">
                {/* <Heart className="text-primary" size={28} /> */}
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
          <div className="p-6 max-h-[70vh] overflow-y-auto space-y-8">
            {/* Section 1: Impact Summary */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 rounded-xl p-6">
              <h4 className="font-bold text-xl text-[#163820] mb-3 flex items-center gap-2">
                {/* <CheckCircle className="text-green-600" size={20} /> */}
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
                        ${parseFloat(quoteData.price_per_metric_ton_usd).toFixed(2)}
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

            {/* Section 2: Personal Information */}
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
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="John Doe"
                    />
                  </div>
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
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="john@example.com"
                    />
                  </div>
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

                {/* Phone */}
                {/* <div>
                  <label className="block text-sm font-semibold text-[#163820] mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div> */}

                {/* Address */}
                {/* <div>
                  <label className="block text-sm font-semibold text-[#163820] mb-2">
                    Address *
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-4 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="123 Main Street"
                    />
                  </div>
                </div> */}

                {/* City, State, ZIP */}
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  <input
                    type="text"
                    placeholder="State/Province"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div> */}

                {/* Country */}
                {/* <select
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                  <option value="BD">Bangladesh</option>
                  <option value="IN">India</option>
                  <option value="other">Other</option>
                </select> */}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 p-6 flex items-center justify-end">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-2 bg-btn-primary hover:bg-btn-primary-hover text-white font-bold rounded-lg transition-colors flex items-center gap-2 shadow-lg disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DonationModal;