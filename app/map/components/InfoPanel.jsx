import React from "react";
import {
  TrendingUp,
  TrendingDown,
  MapPin,
  Info,
  Users,
  Globe,
  Award,
  Activity,
  Zap,
  Flame,
  Factory,
  Leaf,
  Fuel,
  Building2,
  GitBranch,
  DollarSign,
  Battery,
  Wind,
  Cloud,
  Thermometer,
  PieChart,
} from "lucide-react";
import { DefaultInfoPanel } from "./DefaultPanel";

const InfoPanel = ({
  selectedCountry,
  selectedProject,
  selectedYear,
}) => {
  return (
    <div className="lg:col-span-1">
      {/* Selected Country Info */}
      {selectedCountry ? (
        <div className="bg-white dark:bg-gray-800 p-5 border-l border-gray-200 dark:border-gray-700 h-full overflow-y-auto max-h-[800px]">
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
                <Factory
                  className="text-blue-600 dark:text-blue-400"
                  size={18}
                />
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
                        ? selectedCountry.emission.toLocaleString("en-US", {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                          })
                        : "N/A"}
                    </p>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      million tonnes
                    </p>
                  </div>
                </div>

                {/* Population & Per Capita */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-1 mb-1">
                      <Users
                        className="text-gray-500 dark:text-gray-400"
                        size={14}
                      />
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
                      <Globe
                        className="text-gray-500 dark:text-gray-400"
                        size={14}
                      />
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Per Capita
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {selectedCountry.perCapita
                        ? `${parseFloat(selectedCountry.perCapita).toFixed(
                            2
                          )} t`
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {/* GDP & Energy Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  {selectedCountry.gdp && (
                    <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3">
                      <div className="flex items-center gap-1 mb-1">
                        <DollarSign
                          className="text-gray-500 dark:text-gray-400"
                          size={14}
                        />
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          GDP
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {selectedCountry.gdp}
                      </p>
                    </div>
                  )}

                  {selectedCountry.energyPerCapita && (
                    <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3">
                      <div className="flex items-center gap-1 mb-1">
                        <Battery
                          className="text-gray-500 dark:text-gray-400"
                          size={14}
                        />
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Energy/Capita
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {selectedCountry.energyPerCapita.toLocaleString(
                          "en-US",
                          {
                            maximumFractionDigits: 0,
                          }
                        )}{" "}
                        kWh
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Emission Growth Section */}
            {(selectedCountry.growthPrct !== null ||
              selectedCountry.growthAbs !== null) && (
              <div className="bg-purple-50 dark:bg-purple-900/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Activity
                    className="text-purple-600 dark:text-purple-400"
                    size={16}
                  />
                  <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                    Emission Growth
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {selectedCountry.growthPrct !== null && (
                    <div
                      className={`rounded-lg p-3 ${
                        selectedCountry.growthPrct > 0
                          ? "bg-red-50 dark:bg-red-900/10"
                          : "bg-green-50 dark:bg-green-900/10"
                      }`}
                    >
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Growth Rate
                      </p>
                      <div className="flex items-center gap-1">
                        {selectedCountry.growthPrct > 0 ? (
                          <TrendingUp
                            className="text-red-600 dark:text-red-400"
                            size={16}
                          />
                        ) : (
                          <TrendingDown
                            className="text-green-600 dark:text-green-400"
                            size={16}
                          />
                        )}
                        <p
                          className={`text-lg font-bold ${
                            selectedCountry.growthPrct > 0
                              ? "text-red-600 dark:text-red-400"
                              : "text-green-600 dark:text-green-400"
                          }`}
                        >
                          {selectedCountry.growthPrct > 0 ? "+" : ""}
                          {selectedCountry.growthPrct.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedCountry.growthAbs !== null && (
                    <div
                      className={`rounded-lg p-3 ${
                        selectedCountry.growthAbs > 0
                          ? "bg-red-50 dark:bg-red-900/10"
                          : "bg-green-50 dark:bg-green-900/10"
                      }`}
                    >
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Absolute Change
                      </p>
                      <div className="flex items-center gap-1">
                        {selectedCountry.growthAbs > 0 ? (
                          <TrendingUp
                            className="text-red-600 dark:text-red-400"
                            size={16}
                          />
                        ) : (
                          <TrendingDown
                            className="text-green-600 dark:text-green-400"
                            size={16}
                          />
                        )}
                        <p
                          className={`text-lg font-bold ${
                            selectedCountry.growthAbs > 0
                              ? "text-red-600 dark:text-red-400"
                              : "text-green-600 dark:text-green-400"
                          }`}
                        >
                          {selectedCountry.growthAbs > 0 ? "+" : ""}
                          {selectedCountry.growthAbs.toFixed(1)} Mt
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Emission Sources Breakdown */}
            {(selectedCountry.coalCo2 ||
              selectedCountry.oilCo2 ||
              selectedCountry.gasCo2) && (
              <div className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <PieChart
                    className="text-gray-600 dark:text-gray-400"
                    size={16}
                  />
                  <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                    Emission Sources Breakdown
                  </h4>
                </div>

                <div className="space-y-2">
                  {selectedCountry.coalCo2 && (
                    <div className="flex items-center justify-between bg-white dark:bg-gray-800/50 rounded-lg p-2">
                      <div className="flex items-center gap-2">
                        <Flame
                          className="text-orange-600 dark:text-orange-400"
                          size={14}
                        />
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          Coal
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold text-gray-900 dark:text-white block">
                          {selectedCountry.coalCo2.toFixed(1)} Mt
                        </span>
                        {selectedCountry.coalShare && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            ({selectedCountry.coalShare}%)
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedCountry.oilCo2 && (
                    <div className="flex items-center justify-between bg-white dark:bg-gray-800/50 rounded-lg p-2">
                      <div className="flex items-center gap-2">
                        <Fuel
                          className="text-blue-600 dark:text-blue-400"
                          size={14}
                        />
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          Oil
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold text-gray-900 dark:text-white block">
                          {selectedCountry.oilCo2.toFixed(1)} Mt
                        </span>
                        {selectedCountry.oilShare && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            ({selectedCountry.oilShare}%)
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedCountry.gasCo2 && (
                    <div className="flex items-center justify-between bg-white dark:bg-gray-800/50 rounded-lg p-2">
                      <div className="flex items-center gap-2">
                        <Wind
                          className="text-green-600 dark:text-green-400"
                          size={14}
                        />
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          Gas
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold text-gray-900 dark:text-white block">
                          {selectedCountry.gasCo2.toFixed(1)} Mt
                        </span>
                        {selectedCountry.gasShare && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            ({selectedCountry.gasShare}%)
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedCountry.cementCo2 && (
                    <div className="flex items-center justify-between bg-white dark:bg-gray-800/50 rounded-lg p-2">
                      <div className="flex items-center gap-2">
                        <Building2
                          className="text-gray-600 dark:text-gray-400"
                          size={14}
                        />
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          Cement
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-gray-900 dark:text-white">
                        {selectedCountry.cementCo2.toFixed(1)} Mt
                      </span>
                    </div>
                  )}

                  {selectedCountry.flaringCo2 && (
                    <div className="flex items-center justify-between bg-white dark:bg-gray-800/50 rounded-lg p-2">
                      <div className="flex items-center gap-2">
                        <Zap
                          className="text-yellow-600 dark:text-yellow-400"
                          size={14}
                        />
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          Flaring
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-gray-900 dark:text-white">
                        {selectedCountry.flaringCo2.toFixed(1)} Mt
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Greenhouse Gas Metrics */}
            {(selectedCountry.methane ||
              selectedCountry.nitrousOxide ||
              selectedCountry.totalGHG) && (
              <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Cloud
                    className="text-green-600 dark:text-green-400"
                    size={16}
                  />
                  <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                    Greenhouse Gases
                  </h4>
                </div>

                <div className="space-y-2">
                  {selectedCountry.methane && (
                    <div className="flex items-center justify-between bg-white dark:bg-gray-800/50 rounded-lg p-2">
                      <div className="flex items-center gap-2">
                        <Thermometer
                          className="text-red-600 dark:text-red-400"
                          size={14}
                        />
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          Methane (CH₄)
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-gray-900 dark:text-white">
                        {selectedCountry.methane.toFixed(1)} Mt
                      </span>
                    </div>
                  )}

                  {selectedCountry.nitrousOxide && (
                    <div className="flex items-center justify-between bg-white dark:bg-gray-800/50 rounded-lg p-2">
                      <div className="flex items-center gap-2">
                        <Thermometer
                          className="text-blue-600 dark:text-blue-400"
                          size={14}
                        />
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          Nitrous Oxide (N₂O)
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-gray-900 dark:text-white">
                        {selectedCountry.nitrousOxide.toFixed(1)} Mt
                      </span>
                    </div>
                  )}

                  {selectedCountry.totalGHG && (
                    <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 mt-2">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Total Greenhouse Gases
                      </p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        {selectedCountry.totalGHG.toLocaleString("en-US", {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        })}{" "}
                        Mt CO₂e
                      </p>
                      {selectedCountry.totalGHGExcludingLUC && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Excluding land use:{" "}
                          {selectedCountry.totalGHGExcludingLUC.toFixed(1)} Mt
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Global Impact & Rankings */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Award className="text-amber-500" size={16} />
                Global Impact & Rankings
              </h4>

              {/* Global Share */}
              {selectedCountry.shareGlobalCo2 && (
                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        Share of Global Emissions
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Contribution to world total
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {selectedCountry.shareGlobalCo2.toFixed(3)}%
                    </p>
                  </div>
                </div>
              )}

              {/* Global Rank */}
              {selectedCountry.rankInWorld && (
                <div className="bg-amber-50 dark:bg-amber-900/10 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        World Ranking
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Among all countries
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                      #{selectedCountry.rankInWorld}
                    </p>
                  </div>
                </div>
              )}

              {/* World Comparison */}
              {selectedCountry.relativeToWorld && (
                <div
                  className={`rounded-lg p-3 ${
                    selectedCountry.aboveWorldAverage
                      ? "bg-red-50 dark:bg-red-900/10"
                      : "bg-green-50 dark:bg-green-900/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        vs World Average
                      </p>
                      <div className="flex items-center gap-1">
                        {selectedCountry.aboveWorldAverage ? (
                          <TrendingUp
                            className="text-red-600 dark:text-red-400"
                            size={14}
                          />
                        ) : (
                          <TrendingDown
                            className="text-green-600 dark:text-green-400"
                            size={14}
                          />
                        )}
                        <p
                          className={`text-xs font-semibold ${
                            selectedCountry.aboveWorldAverage
                              ? "text-red-700 dark:text-red-400"
                              : "text-green-700 dark:text-green-400"
                          }`}
                        >
                          {selectedCountry.aboveWorldAverage
                            ? "Above"
                            : "Below"}{" "}
                          Average
                        </p>
                      </div>
                    </div>
                    <p
                      className={`text-2xl font-bold ${
                        selectedCountry.aboveWorldAverage
                          ? "text-red-600 dark:text-red-400"
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      {selectedCountry.relativeToWorld}%
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Cumulative Emissions */}
            {selectedCountry.cumulativeCo2 && (
              <div className="bg-orange-50 dark:bg-orange-900/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap
                    className="text-orange-600 dark:text-orange-400"
                    size={14}
                  />
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Cumulative Historical Emissions
                  </p>
                </div>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {selectedCountry.cumulativeCo2 > 1000
                    ? `${(selectedCountry.cumulativeCo2 / 1000).toFixed(2)}B`
                    : `${selectedCountry.cumulativeCo2.toLocaleString("en-US", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      })}M`}{" "}
                  tonnes
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Total emissions since records began
                </p>
              </div>
            )}

            {/* Footer Note */}
            <div className="pt-4 border-t-2 border-dashed border-gray-300 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center italic">
                💡 Click on other countries or project markers to explore more
                data
              </p>
            </div>
          </div>
        </div>
      ) : selectedProject ? (
        <div className="bg-white dark:bg-gray-800 p-4 border-l border-gray-200 dark:border-gray-700 h-full">
          {/* Project Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <MapPin
                className="text-green-600 dark:text-green-400"
                size={20}
              />
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
                <div className="p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Project Type
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {selectedProject.type || selectedProject.project_type}
                  </p>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Location
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {selectedProject.location.split(",")[0]}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Standard
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {selectedProject.standard}
                  </p>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Vintage
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {selectedProject.vintage}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Available Credits
                  </p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {selectedProject.available_amount?.toLocaleString() ||
                      selectedProject.offsetAmount?.replace(
                        " tons available",
                        ""
                      )}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    tons CO₂
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Price per Ton
                  </p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    $
                    {selectedProject.price_per_ton ||
                      selectedProject.price
                        ?.replace("$", "")
                        .replace(" per ton", "")}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    USD
                  </p>
                </div>
              </div>

              {selectedProject.allocated_amount && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Capacity Utilization
                    </p>
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
                    Total allocated:{" "}
                    {selectedProject.allocated_amount?.toLocaleString()} tons
                  </p>
                </div>
              )}
            </div>

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
