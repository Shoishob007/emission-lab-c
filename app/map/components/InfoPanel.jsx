import React from "react";
import { TrendingUp, MapPin, Info, BarChart3, Users, Globe, Award } from "lucide-react";
import { DefaultInfoPanel } from "./DefaultPanel";

const InfoPanel = ({ selectedCountry, selectedProject, stats }) => {
  return (
    <div className="lg:col-span-1">
      {/* Selected Country Info */}
      {selectedCountry ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700 h-full">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Info className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {selectedCountry.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                CO₂ Emissions Data • {selectedCountry.year}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Main Emission Stats */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="text-blue-600 dark:text-blue-400" size={16} />
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Total Emissions
                  </p>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {selectedCountry.emission
                    ? selectedCountry.emission > 1000
                      ? `${(selectedCountry.emission / 1000).toFixed(1)}B`
                      : `${selectedCountry.emission.toFixed(0)}M`
                    : "N/A"}{" "}
                  t
                </p>
              </div>
              
              <div className="space-y-3">
                {/* Population */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="text-gray-500 dark:text-gray-400" size={14} />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Population</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {selectedCountry.population}
                  </p>
                </div>
                
                {/* Per Capita */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="text-gray-500 dark:text-gray-400" size={14} />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Per Capita</p>
                  </div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    {selectedCountry.perCapita
                      ? `${parseFloat(selectedCountry.perCapita).toFixed(1)} t`
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Ranking and Trends */}
            <div className="space-y-4">
              {/* Global Rank */}
              {selectedCountry.rankInWorld && (
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Award className="text-amber-600 dark:text-amber-500" size={16} />
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Global Rank
                    </p>
                  </div>
                  <div className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                    <p className="text-sm font-bold text-amber-700 dark:text-amber-400">
                      #{selectedCountry.rankInWorld}
                    </p>
                  </div>
                </div>
              )}

              {/* World Comparison */}
              {selectedCountry.relativeToWorld && (
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      vs World Average
                    </p>
                    <p className={`text-xs ${
                      selectedCountry.aboveWorldAverage 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-green-600 dark:text-green-400'
                    }`}>
                      {selectedCountry.aboveWorldAverage ? 'Above' : 'Below'} average
                    </p>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {selectedCountry.relativeToWorld}%
                  </p>
                </div>
              )}

              {/* Trend */}
              {selectedCountry.trend && selectedCountry.trend.status !== "No data" && (
                <div className={`p-3 rounded-lg ${
                  selectedCountry.trend.status === "Increasing"
                    ? "bg-red-50 dark:bg-red-900/10"
                    : selectedCountry.trend.status === "Decreasing"
                    ? "bg-green-50 dark:bg-green-900/10"
                    : "bg-yellow-50 dark:bg-yellow-900/10"
                }`}>
                  <div className="flex items-center gap-3">
                    <TrendingUp
                      size={18}
                      className={
                        selectedCountry.trend.status === "Increasing"
                          ? "text-red-600 dark:text-red-500"
                          : selectedCountry.trend.status === "Decreasing"
                          ? "text-green-600 dark:text-green-500"
                          : "text-yellow-600 dark:text-yellow-500"
                      }
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Trend: {selectedCountry.trend.status}
                      </p>
                      {selectedCountry.trend.change !== 0 && (
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {Math.abs(selectedCountry.trend.change).toFixed(1)}% change
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Historical Metrics */}
            {(selectedCountry.peakEmission || selectedCountry.historicalChange) && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Historical Performance
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {selectedCountry.peakEmission && (
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-900/30 rounded">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Peak Emission</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedCountry.peakYear}: {selectedCountry.peakEmission.toFixed(0)}M t
                      </p>
                    </div>
                  )}
                  {selectedCountry.historicalChange && (
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-900/30 rounded">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Since {selectedCountry.data?.[0]?.year || "Start"}</p>
                      <p className={`text-sm font-medium ${
                        parseFloat(selectedCountry.historicalChange) > 0
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-green-600 dark:text-green-400'
                      }`}>
                        {selectedCountry.historicalChange}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Click on other countries or project markers to view different data
              </p>
            </div>
          </div>
        </div>
      ) : selectedProject ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700 h-full">
          {/* Project Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <MapPin className="text-green-600 dark:text-green-400" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {selectedProject.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {selectedProject.projectIdDisplay || selectedProject.standard}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Project Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {/* Project Type */}
                <div className="p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Project Type</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {selectedProject.type || selectedProject.project_type}
                  </p>
                </div>

                {/* Location */}
                <div className="p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Location</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {selectedProject.location.split(",")[0]}
                  </p>
                </div>
              </div>

              {/* Standard & Vintage */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Standard</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {selectedProject.standard}
                  </p>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Vintage</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {selectedProject.vintage}
                  </p>
                </div>
              </div>
            </div>

            {/* Emissions & Pricing */}
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Available Credits</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {selectedProject.available_amount?.toLocaleString() ||
                      selectedProject.offsetAmount?.replace(" tons available", "")}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">tons CO₂</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Price per Ton</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    ${selectedProject.price_per_ton ||
                      selectedProject.price?.replace("$", "").replace(" per ton", "")}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">USD</p>
                </div>
              </div>

              {/* Capacity Bar */}
              {selectedProject.allocated_amount && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Capacity Utilization</p>
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">
                      {selectedProject.available_amount &&
                        Math.round(
                          (selectedProject.available_amount /
                            selectedProject.allocated_amount) *
                            100
                        )}
                      % available
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
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
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Total allocated: {selectedProject.allocated_amount?.toLocaleString()} tons
                  </p>
                </div>
              )}
            </div>

            {/* Links */}
            {(selectedProject.infoLink || selectedProject.validationReport) && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Project Resources
                </p>
                <div className="flex gap-2">
                  {selectedProject.infoLink && (
                    <a
                      href={selectedProject.infoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 text-sm font-medium text-blue-600 dark:text-blue-400 
                               hover:text-blue-700 dark:hover:text-blue-300 border border-blue-200 
                               dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 
                               transition-colors"
                    >
                      Website
                    </a>
                  )}
                  {selectedProject.validationReport && (
                    <a
                      href={selectedProject.validationReport}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                               hover:text-gray-900 dark:hover:text-white border border-gray-200 
                               dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 
                               transition-colors"
                    >
                      Report
                    </a>
                  )}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Click on other countries or project markers to view different data
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