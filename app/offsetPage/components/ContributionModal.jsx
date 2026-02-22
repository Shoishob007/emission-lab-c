import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const ContributionModal = ({ isOpen, onClose, project, emissionValue }) => {
  const [contributionType, setContributionType] = useState("subscription");
  const [metricTons, setMetricTons] = useState("");
  const [usdAmount, setUsdAmount] = useState("");

  const pricePerTon = useMemo(
    () => parseFloat(project?.price_per_ton || project?.donationValue || 0),
    [project],
  );

  const sanitizeInput = (value) => value.replace(/[^0-9.]/g, "");

  const formatDecimal = (value, maxFractionDigits = 2) => {
    const numeric = Number.parseFloat(value);
    if (!Number.isFinite(numeric)) return "";
    return numeric.toFixed(maxFractionDigits).replace(/\.?0+$/, "");
  };

  const handleMetricChange = (value) => {
    const sanitized = sanitizeInput(value);
    setMetricTons(sanitized);

    const tons = Number.parseFloat(sanitized);
    if (!Number.isFinite(tons) || tons < 0 || pricePerTon <= 0) {
      setUsdAmount("");
      return;
    }

    setUsdAmount(formatDecimal(tons * pricePerTon, 2));
  };

  const handleUsdChange = (value) => {
    const sanitized = sanitizeInput(value);
    setUsdAmount(sanitized);

    const amount = Number.parseFloat(sanitized);
    if (!Number.isFinite(amount) || amount < 0 || pricePerTon <= 0) {
      setMetricTons("");
      return;
    }

    setMetricTons(formatDecimal(amount / pricePerTon, 4));
  };

  useEffect(() => {
    if (!isOpen || !project) return;

    const initialTons = 1;

    setMetricTons(formatDecimal(initialTons, 4));
    if (pricePerTon > 0) {
      setUsdAmount(formatDecimal(initialTons * pricePerTon, 2));
    } else {
      setUsdAmount("");
    }
  }, [isOpen, project, emissionValue, pricePerTon]);

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
          className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative p-5 bg-gradient-to-br from-primary/10 via-white to-primary/20 border-b border-primary/15">
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

          <div className="p-5 space-y-5 bg-[radial-gradient(circle_at_top,_#f6fff8,_#ffffff_55%)]">
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
                  Offsets
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
                <p className="text-center text-xs text-[#163820] font-semibold mt-2">
                  tons {contributionType === "subscription" ? "monthly" : "once"}.
                </p>
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

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 bg-btn-primary hover:bg-btn-primary-hover text-white text-sm font-bold rounded-xl transition-colors shadow-lg"
            >
              MAKE AN IMPACT
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContributionModal;
