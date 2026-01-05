import React from "react";
import { TrendingUp, TrendingDown, MapPin, Info, BarChart3, Users, Globe, Award, Activity, Zap, Flame, Factory } from "lucide-react";
import { DefaultInfoPanel } from "./DefaultPanel";

const InfoPanel = ({ selectedCountry, selectedProject, stats, selectedYear }) => {
  return (
    <div className="lg:col-span-1">
      {/* Selected Country Info */}
      {selectedCountry ? (
        <div className="bg-white dark:bg-gray-800 p-5 border border-gray-200 dark:border-gray-700 h-full overflow-y-auto max-h-[800px]">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Info className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedCountry.name}
              </h3>
              <div className="flex items-center gap-2 text-xs mt-1">
                <span className="text-gray-500 dark:text-gray-400">
                  {selectedCountry.year || selectedYear}
                </span>
                {selectedCountry.code && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {selectedCountry.code}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {/* Main Emission Stats */}
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Factory className="text-blue-600 dark:text-blue-400" size={18} />
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Emission Overview
                </h4>
              </div>
              
              <div className="space-y-3">
                {/* Total Emissions */}
                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Total CO₂ Emissions
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedCountry.emission
                        ? selectedCountry.emission > 1000
                          ? `${(selectedCountry.emission / 1000).toFixed(2)}`
                          : `${selectedCountry.emission.toFixed(0)}`
                        : "N/A"}
                    </p>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {selectedCountry.emission > 1000 ? "B" : "M"} tonnes
                    </p>
                  </div>
                </div>

                {/* Population & Per Capita */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-1 mb-1">
                      <Users className="text-gray-500 dark:text-gray-400" size={14} />
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Population
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {selectedCountry.population || "N/A"}
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-1 mb-1">
                      <Globe className="text-gray-500 dark:text-gray-400" size={14} />
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Per Capita
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {selectedCountry.perCapita
                        ? `${parseFloat(selectedCountry.perCapita).toFixed(2)} t`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rankings Section */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Award className="text-amber-500" size={16} />
                Rankings & Comparisons
              </h4>
              
              {/* Global Rank */}
              {selectedCountry.rankInWorld && (
                <div className="bg-amber-50 dark:bg-amber-900/10 rounded-lg p-3 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="text-amber-600 dark:text-amber-500" size={16} />
                      <div>
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          World Ranking
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Among all countries
                        </p>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                      #{selectedCountry.rankInWorld}
                    </p>
                  </div>
                </div>
              )}

              {/* World Comparison */}
              {selectedCountry.relativeToWorld && (
                <div className={`rounded-lg p-3 border ${
                  selectedCountry.aboveWorldAverage
                    ? "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800"
                    : "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800"
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        vs World Average
                      </p>
                      <div className="flex items-center gap-1">
                        {selectedCountry.aboveWorldAverage ? (
                          <TrendingUp className="text-red-600 dark:text-red-400" size={14} />
                        ) : (
                          <TrendingDown className="text-green-600 dark:text-green-400" size={14} />
                        )}
                        <p className={`text-xs font-semibold ${
                          selectedCountry.aboveWorldAverage 
                            ? 'text-red-700 dark:text-red-400' 
                            : 'text-green-700 dark:text-green-400'
                        }`}>
                          {selectedCountry.aboveWorldAverage ? 'Above' : 'Below'}
                        </p>
                      </div>
                    </div>
                    <p className={`text-2xl font-bold ${
                      selectedCountry.aboveWorldAverage
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-green-600 dark:text-green-400'
                    }`}>
                      {selectedCountry.relativeToWorld}%
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Trend Analysis */}
            {selectedCountry.trend && selectedCountry.trend.status !== "No data" && (
              <div className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="text-blue-600 dark:text-blue-400" size={16} />
                  <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                    Emission Trend
                  </h4>
                </div>
                
                <div className={`p-3 rounded-lg ${
                  selectedCountry.trend.status === "Increasing"
                    ? "bg-red-50 dark:bg-red-900/10"
                    : selectedCountry.trend.status === "Decreasing"
                    ? "bg-green-50 dark:bg-green-900/10"
                    : "bg-yellow-50 dark:bg-yellow-900/10"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {selectedCountry.trend.status === "Increasing" ? (
                        <TrendingUp size={20} className="text-red-600 dark:text-red-500" />
                      ) : selectedCountry.trend.status === "Decreasing" ? (
                        <TrendingDown size={20} className="text-green-600 dark:text-green-500" />
                      ) : (
                        <Activity size={20} className="text-yellow-600 dark:text-yellow-500" />
                      )}
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {selectedCountry.trend.status}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Recent trend
                        </p>
                      </div>
                    </div>
                    {selectedCountry.trend.change !== 0 && (
                      <div className="text-right">
                        <p className={`text-xl font-bold ${
                          selectedCountry.trend.status === "Increasing"
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                        }`}>
                          {selectedCountry.trend.change > 0 ? '+' : ''}{Math.abs(selectedCountry.trend.change).toFixed(1)}%
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Historical Metrics */}
            {/* {(selectedCountry.peakEmission || selectedCountry.historicalChange) && ( */}
              {/* // <div className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-4"> */}
                {/* <div className="flex items-center gap-2 mb-3">
                  <Flame className="text-orange-600 dark:text-orange-400" size={16} />
                  <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                    Historical Performance
                  </h4>
                </div> */}
                
                <div className="grid grid-cols-1 gap-3">
                  {selectedCountry.peakEmission && (
                    <div className="bg-orange-50 dark:bg-orange-900/10 rounded-lg p-3 border border-orange-200 dark:border-orange-800">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="text-orange-600 dark:text-orange-400" size={14} />
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          Peak Year
                        </p>
                      </div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {selectedCountry.peakYear}
                      </p>
                      <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                        {selectedCountry.peakEmission.toFixed(0)} M tonnes
                      </p>
                    </div>
                  )}
                  
                  {/* {selectedCountry.historicalChange && (
                    <div className={`rounded-lg p-3 border ${
                      parseFloat(selectedCountry.historicalChange) > 0
                        ? "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800"
                        : "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800"
                    }`}>
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Since {selectedCountry.data?.[0]?.year || "Start"}
                      </p>
                      <div className="flex items-center gap-2">
                        {parseFloat(selectedCountry.historicalChange) > 0 ? (
                          <TrendingUp className="text-red-600 dark:text-red-400" size={18} />
                        ) : (
                          <TrendingDown className="text-green-600 dark:text-green-400" size={18} />
                        )}
                        <p className={`text-2xl font-bold ${
                          parseFloat(selectedCountry.historicalChange) > 0
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-green-600 dark:text-green-400'
                        }`}>
                          {selectedCountry.historicalChange}%
                        </p>
                      </div>
                    </div>
                  )} */}
                </div>
              {/* </div> */}
            {/* )} */}

            {/* Global Context */}
            {/* {stats && (
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/50 dark:to-slate-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3">
                  GLOBAL CONTEXT
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">World Total</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {stats.totalEmission ? `${(stats.totalEmission / 1000).toFixed(1)}B t` : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Contribution</p>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {selectedCountry.emission && stats.totalEmission
                        ? `${((selectedCountry.emission / stats.totalEmission) * 100).toFixed(2)}%`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            )} */}

            {/* Footer Note */}
            <div className="pt-4 border-t-2 border-dashed border-gray-300 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center italic">
                💡 Click on other countries or project markers to explore more data
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
        <DefaultInfoPanel stats={stats} />
      )}
    </div>
  );
};

export default InfoPanel;