import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import useOffsetStore from "@/stores/offsetStore";

const ContributionModal = ({ isOpen, onClose, project, emissionValue }) => {
  const [contributionType, setContributionType] = useState("subscription");
  const [metricTons, setMetricTons] = useState("");
  const [usdAmount, setUsdAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [acceptTerms, setAcceptTerms] = useState(false);

  const { data: session } = useSession();
  const userId = session?.user?.id;
  const isLoggedIn = !!session?.user?.id;

  const {
    createOffsetQuote,
    createStripeCheckoutSession,
    create_account,
    certification_name,
    setCreateAccount,
    setCertificationName,
  } = useOffsetStore();

  const pricePerTon = useMemo(
    () => parseFloat(project?.price_per_ton || project?.donationValue || 0),
    [project],
  );

  const sanitizeDecimalInput = (value, maxFractionDigits = 2) => {
    const cleaned = value.replace(/[^0-9.]/g, "");
    const [integerPart, ...decimalParts] = cleaned.split(".");

    if (decimalParts.length === 0) return integerPart;

    const decimalPart = decimalParts
      .join("")
      .slice(0, Math.max(0, maxFractionDigits));

    return `${integerPart}.${decimalPart}`;
  };

  const formatDecimal = (value, maxFractionDigits = 2) => {
    const numeric = Number.parseFloat(value);
    if (!Number.isFinite(numeric)) return "";
    return numeric.toFixed(maxFractionDigits).replace(/\.?0+$/, "");
  };

  const handleMetricChange = (value) => {
    const sanitized = sanitizeDecimalInput(value, 2);
    setMetricTons(sanitized);
    setErrors((prev) => ({ ...prev, submit: undefined }));

    const tons = Number.parseFloat(sanitized);
    if (!Number.isFinite(tons) || tons < 0 || pricePerTon <= 0) {
      setUsdAmount("");
      return;
    }

    setUsdAmount(formatDecimal(tons * pricePerTon, 2));
  };

  const handleUsdChange = (value) => {
    const sanitized = sanitizeDecimalInput(value, 2);
    setUsdAmount(sanitized);
    setErrors((prev) => ({ ...prev, submit: undefined }));

    const amount = Number.parseFloat(sanitized);
    if (!Number.isFinite(amount) || amount < 0 || pricePerTon <= 0) {
      setMetricTons("");
      return;
    }

    setMetricTons(formatDecimal(amount / pricePerTon, 2));
  };

  useEffect(() => {
    if (!isOpen || !project) return;

    const initialTons = 1;

    setMetricTons(formatDecimal(initialTons, 2));
    if (pricePerTon > 0) {
      setUsdAmount(formatDecimal(initialTons * pricePerTon, 2));
    } else {
      setUsdAmount("");
    }

    setErrors({});
    setIsSubmitting(false);
    setContributionType("subscription");
  }, [isOpen, project, emissionValue, pricePerTon]);

  useEffect(() => {
    if (isLoggedIn) {
      setCreateAccount(false);
      setAcceptTerms(true);
    } else {
      setAcceptTerms(false);
    }
  }, [isLoggedIn, setCreateAccount]);

  const handleTermsLinkClick = (e) => {
    e.preventDefault();
    window.open("/terms", "_blank");
  };

  const isProceedDisabled = () => {
    if (!certification_name.trim()) return true;

    const tons = Number.parseFloat(metricTons);
    if (!Number.isFinite(tons) || tons <= 0) return true;

    if (create_account && !acceptTerms) return true;

    return isSubmitting;
  };

  const handleStripeCheckout = async () => {
    const tons = Number.parseFloat(metricTons);

    if (!Number.isFinite(tons) || tons <= 0) {
      setErrors({
        submit: "Please enter a valid contribution amount greater than 0.",
      });
      return;
    }

    if (!certification_name.trim()) {
      setErrors({ submit: "Certificate name is required." });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const quoteData = await createOffsetQuote({
        project_id: project.id,
        carbon_emission_metric_tons: tons,
        offset_type: "individual",
        payment_type: "one_time",
      });

      const checkoutPayload = {
        amount: parseFloat(quoteData?.total_cost_usd || usdAmount || 0),
        currency: "usd",
        project_id: project.id,
        user_id: userId,
        quote_id: quoteData.quote_id,
        success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}&quote_id=${quoteData.quote_id}`,
        cancel_url: `${window.location.origin}/cancel`,
        email: session?.user?.email || null,
      };

      const checkoutData = await createStripeCheckoutSession(checkoutPayload);

      if (checkoutData.url) {
        window.location.href = checkoutData.url;
      } else {
        throw new Error("No session URL returned from server");
      }
    } catch (err) {
      console.error("Error creating individual contribution checkout:", err);
      setErrors({
        submit: err.message || "Failed to initiate payment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !project) return null;

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
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative p-5 bg-gradient-to-br from-primary/10 via-white to-primary/20 border-b border-primary/15 flex-shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-primary font-semibold">
                  Contribution
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-[#163820] mt-2">
                  {project.name}
                </h2>
                <p className="text-xs text-[#767676] mt-2 max-w-lg">
                  Choose your impact by entering either a dollar amount or the
                  number of tons you want to offset. We will keep both fields in
                  sync for you.
                </p>
                {/* <span className="inline-flex items-center mt-3 px-3 py-1 rounded-full bg-white/80 border border-primary/20 text-[0.7rem] font-semibold text-primary">
                  {project.name}
                </span> */}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[radial-gradient(circle_at_top,_#f6fff8,_#ffffff_55%)]">
            <div>
              <p className="text-xs font-semibold text-[#163820] mb-2">
                Contribution type
              </p>
              <div className="bg-white rounded-xl p-1 border border-primary/20 shadow-sm">
                <button
                  type="button"
                  onClick={() => setContributionType("subscription")}
                  className={`w-1/2 py-2 text-sm font-bold transition-colors rounded-lg ${
                    contributionType === "subscription"
                      ? "bg-btn-primary text-white"
                      : "text-[#163820] hover:bg-primary/10"
                  }`}
                >
                  Subscription
                </button>
                <button
                  type="button"
                  onClick={() => setContributionType("one-time")}
                  className={`w-1/2 py-2 text-sm font-bold transition-colors rounded-lg ${
                    contributionType === "one-time"
                      ? "bg-btn-primary text-white"
                      : "text-[#163820] hover:bg-primary/10"
                  }`}
                >
                  One-time
                </button>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-center text-[#163820]">
              Enter an amount to give
            </h3>
            <p className="text-center text-xs text-[#767676]">
              You can enter up to 2 decimal places for both amount and CO₂e.
            </p>
            {/* <p className="text-center text-xs text-[#767676]">
              Offsets are calculated using verified pricing. Update either field
              to see the equivalent impact instantly.
            </p> */}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#163820] mb-2">
                  Price
                </label>
                <div className="flex items-center justify-between border border-primary/20 rounded-xl px-4 py-3 bg-white shadow-sm">
                  <div className="flex items-center gap-2 text-xl font-semibold text-[#163820] w-full">
                    <span className="text-lg text-primary">$</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={usdAmount}
                      onChange={(e) => handleUsdChange(e.target.value)}
                      className="w-full bg-transparent outline-none"
                      placeholder="0"
                    />
                  </div>
                  <span className="text-lg font-bold text-[#163820]">USD</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#163820] mb-2">
                  Estimated CO₂e Offset (MT)
                </label>
                <div className="flex items-center justify-between border border-primary/20 rounded-xl px-4 py-3 bg-white shadow-sm">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={metricTons}
                    onChange={(e) => handleMetricChange(e.target.value)}
                    className="w-full bg-transparent outline-none text-xl font-semibold text-[#163820]"
                    placeholder="0"
                  />
                  <span className="text-lg font-bold text-[#163820]">CO₂e</span>
                </div>
                {/* <p className="text-center text-xs text-[#163820] font-semibold mt-2">
                  {contributionType === "subscription"
                    ? `Estimated impact: about ${formatDecimal(metricTons || 0, 2)} tons of CO₂e offset every month.`
                    : `Estimated impact: about ${formatDecimal(metricTons || 0, 2)} tons of CO₂e offset with this one-time contribution.`}
                </p> */}
              </div>
            </div>

            {/* <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-xs text-[#163820]">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span>Price per metric ton</span>
                <span className="font-bold">${formatDecimal(pricePerTon, 2)}</span>
              </div>
              <p className="text-[0.7rem] text-[#767676] mt-2">
                Your contribution supports certified projects with measurable
                climate impact.
              </p>
            </div> */}

            {!isLoggedIn && (
              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#163820] font-semibold text-sm">
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
                      </div>
                    </label>
                  </div>
                )}
              </div>
            )}

            {isLoggedIn && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 rounded-lg p-3 mt-4">
                <p className="text-sm text-muted-foreground">
                  Your payment will be linked to your account.
                </p>
              </div>
            )}

            <div className="mt-4">
              <label
                htmlFor="certification_name"
                className="block text-xs font-semibold text-[#163820] mb-2"
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

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 p-5 flex items-center justify-end flex-shrink-0">
            <button
              type="button"
              onClick={handleStripeCheckout}
              disabled={isProceedDisabled()}
              className={`px-8 py-3 bg-btn-primary hover:bg-btn-primary-hover text-white text-sm font-bold rounded-xl transition-colors shadow-lg ${
                isProceedDisabled() ? "opacity-80 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "PROCESSING..." : "MAKE AN IMPACT"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContributionModal;
