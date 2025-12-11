import { AlertCircle, Leaf, TrendingUp } from "lucide-react";

const Legend = ({ error }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 mb-8 border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-orange-500" size={20} />
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            Annual CO₂ Emissions (MtCO₂e):
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-8 h-4 bg-[#fef3c7] border border-gray-300 rounded"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Very Low
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-8 h-4 bg-[#fbbf24] border border-gray-300 rounded"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Low
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-8 h-4 bg-[#f59e0b] border border-gray-300 rounded"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Medium
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-8 h-4 bg-[#dc2626] border border-gray-300 rounded"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              High
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-8 h-4 bg-[#991b1b] border border-gray-300 rounded"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Very High
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-8 h-4 bg-[#e5e7eb] border border-gray-300 rounded"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              No Data
            </span>
          </div>
        </div>
      </div>
      {error && (
        <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-2">
            <AlertCircle
              className="text-yellow-600 dark:text-yellow-400"
              size={16}
            />
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              {error}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Legend;
