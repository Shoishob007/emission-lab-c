import {
  Info,
  Leaf,
  MapPin,
  TrendingUp,
  DollarSign,
  Calendar,
  Award,
  FileText,
  Globe,
  Shield,
  Users,
} from "lucide-react";
import React from "react";
import { DefaultInfoPanel } from "./DefaultPanel";

const InfoPanel = ({ selectedCountry, selectedProject, stats }) => {
  return (
    <div className="lg:col-span-1">
      {/* Selected Country Info */}
      {selectedCountry ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-5 border-l-4 border-orange-500 h-full">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                {selectedCountry.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Latest data: {selectedCountry.year}
              </p>
            </div>
            <Info className="text-orange-500 flex-shrink-0" size={24} />
          </div>

          <div className="space-y-4">
            {/* Compact Emission Stats */}
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-orange-50 dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  CO₂ Emissions
                </p>
                <p
                  className="text-lg font-bold text-orange-600 truncate"
                  title={selectedCountry.emission?.toLocaleString()}
                >
                  {selectedCountry.emission
                    ? selectedCountry.emission > 1000
                      ? `${(selectedCountry.emission / 1000).toFixed(1)}B`
                      : `${selectedCountry.emission.toFixed(0)}M`
                    : "N/A"}{" "}
                  t
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Population
                </p>
                <p className="text-lg font-bold text-blue-600 truncate">
                  {selectedCountry.population}
                </p>
              </div>

              <div className="bg-green-50 dark:bg-gray-900 p-3 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Per Capita
                </p>
                <p className="text-lg font-bold text-green-600 truncate">
                  {selectedCountry.perCapita
                    ? selectedCountry.perCapita.toFixed(1)
                    : "N/A"}{" "}
                  t
                </p>
              </div>

              {/* World Comparison */}
              {selectedCountry.relativeToWorld && (
                <div className="bg-indigo-50 dark:bg-gray-900 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    vs World Average
                  </p>
                  <p className="text-sm font-bold text-indigo-600">
                    {selectedCountry.relativeToWorld}%
                    <span className="text-xs ml-2">
                      ({selectedCountry.aboveWorldAverage ? "Above" : "Below"}{" "}
                      avg)
                    </span>
                  </p>
                </div>
              )}

              {/* Global Rank */}
              {selectedCountry.rankInWorld && (
                <div className="bg-amber-50 dark:bg-gray-900 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Global Rank
                  </p>
                  <p className="text-lg font-bold text-amber-600">
                    #{selectedCountry.rankInWorld}
                  </p>
                </div>
              )}
            </div>

            {/* Trend Info */}
            {selectedCountry.trend &&
              selectedCountry.trend.status !== "No data" && (
                <div
                  className={`p-3 rounded-lg ${
                    selectedCountry.trend.status === "Increasing"
                      ? "bg-red-50 dark:bg-red-900/20"
                      : selectedCountry.trend.status === "Decreasing"
                      ? "bg-green-50 dark:bg-green-900/20"
                      : "bg-yellow-50 dark:bg-yellow-900/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp
                      size={16}
                      className={
                        selectedCountry.trend.status === "Increasing"
                          ? "text-red-600"
                          : selectedCountry.trend.status === "Decreasing"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }
                    />
                    <p className="text-sm font-medium">
                      Trend: {selectedCountry.trend.status}
                      {selectedCountry.trend.change !== 0 &&
                        ` (${Math.abs(selectedCountry.trend.change).toFixed(
                          1
                        )}%)`}
                    </p>
                  </div>
                </div>
              )}

            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Click on other countries or project markers to view different
                data
              </p>
            </div>
          </div>
        </div>
      ) : selectedProject ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-5 border-l-4 border-green-500 h-full">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h3
                className="text-xl font-bold text-gray-900 dark:text-white truncate"
                title={selectedProject.name}
              >
                {selectedProject.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 truncate">
                {selectedProject.projectIdDisplay || selectedProject.standard}
              </p>
            </div>
            <MapPin className="text-green-500 flex-shrink-0" size={24} />
          </div>

          <div className="space-y-3">
            {/* Type & Location in one row */}
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-green-50 dark:bg-gray-900 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Leaf className="text-green-600" size={14} />
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                    Type
                  </p>
                </div>
                <p
                  className="text-sm font-semibold text-gray-900 dark:text-white truncate"
                  title={selectedProject.type || selectedProject.project_type}
                >
                  {selectedProject.type || selectedProject.project_type}
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-gray-900 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="text-blue-600" size={14} />
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                    Location
                  </p>
                </div>
                <p
                  className="text-sm font-semibold text-gray-900 dark:text-white truncate"
                  title={selectedProject.location}
                >
                  {selectedProject.location.split(",")[0]}
                </p>
              </div>
            </div>

            {/* Carbon & Price in one row */}
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-amber-50 dark:bg-gray-900 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="text-amber-600" size={14} />
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                    Standard
                  </p>
                </div>
                <p
                  className="text-sm font-semibold text-amber-600 truncate"
                  title={selectedProject.standard}
                >
                  {selectedProject.standard}
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-gray-900 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="text-purple-600" size={14} />
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                    Price/Ton
                  </p>
                </div>
                <p className="text-lg font-bold text-purple-600">
                  $
                  {selectedProject.price_per_ton ||
                    selectedProject.price
                      ?.replace("$", "")
                      .replace(" per ton", "")}
                </p>
                <p className="text-xs text-gray-500">USD</p>
              </div>
            </div>

            {/* Standard & Vintage in one row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-emerald-50 dark:bg-gray-900 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="text-emerald-600" size={14} />
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                    Available
                  </p>
                </div>
                <p className="text-lg font-bold text-emerald-600 truncate">
                  {selectedProject.available_amount?.toLocaleString() ||
                    selectedProject.offsetAmount?.replace(
                      " tons available",
                      ""
                    )}
                </p>
                <p className="text-xs text-gray-500">tons CO₂</p>
              </div>

              <div className="bg-cyan-50 dark:bg-gray-900 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="text-cyan-600" size={14} />
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                    Year
                  </p>
                </div>
                <p className="text-sm font-semibold text-cyan-600">
                  {selectedProject.vintage}
                </p>
              </div>
            </div>

            {/* Capacity Progress Bar */}
            {selectedProject.allocated_amount && (
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Users className="text-indigo-600" size={14} />
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      Capacity
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-green-600">
                    {selectedProject.available_amount &&
                      Math.round(
                        (selectedProject.available_amount /
                          selectedProject.allocated_amount) *
                          100
                      )}
                    % available
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          selectedProject.available_amount
                            ? (selectedProject.available_amount /
                                selectedProject.allocated_amount) *
                                100
                            : 0
                        )}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {selectedProject.allocated_amount?.toLocaleString()} tons
                  </span>
                </div>
              </div>
            )}

            {/* Project Links */}
            {(selectedProject.infoLink || selectedProject.validationReport) && (
              <div className="grid grid-cols-2 gap-2">
                {selectedProject.infoLink && (
                  <a
                    href={selectedProject.infoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-xs text-blue-600 hover:text-blue-700 font-medium bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    <Globe size={12} />
                    Website
                  </a>
                )}
                {selectedProject.validationReport && (
                  <a
                    href={selectedProject.validationReport}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-xs text-gray-600 hover:text-gray-700 font-medium bg-gray-50 dark:bg-gray-900 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FileText size={12} />
                    Report
                  </a>
                )}
              </div>
            )}

            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Click on other countries or project markers to view different
                data
              </p>
            </div>
          </div>
        </div>
      ) : (
        <DefaultInfoPanel />
      )}
    </div>
  );
};

export default InfoPanel;
