/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Loader, MapIcon, TrendingUp, ChartBarIncreasing } from "lucide-react";
import useOffsetStore from "@/stores/offsetStore";
import MapVisualization from "./components/MapVisualization";
import LineChart from "./components/LineChart";
import InfoPanel from "./components/InfoPanel";
import Legend from "./components/Legend";
import { useCarbonData } from "./hooks/useCarbonData";
import { useProjectsData } from "./hooks/useProjectsData";
import { useCountryData } from "./hooks/useCountryData";
import { useMapInteractions } from "./hooks/useMapInteractions";
import normalizeCarbonData from "./utils/normalizedCarbonData";
import TopEmittersBarChart from "./components/TopEmitterBarChart";

const CarbonEmissionWorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState("map"); // New state for active tab

  // Import hooks for different concerns
  const {
    carbonData,
    stats,
    selectedYear,
    setSelectedYear,
    isLoading,
    error,
    fetchCarbonData,
    availableYears,
  } = useCarbonData();

  const {
    projectsWithCoords,
    isGeocoding,
    projectsLoading,
    extractCountryName,
  } = useProjectsData();

  const { getCountryData, getCountryPopulation, getPopulationAsNumber } =
    useCountryData();

  const { position, handleMoveEnd, handleResetView } = useMapInteractions();

  const { fetchProjects } = useOffsetStore();

  // Normalize once (memoized)
  const normalizedCarbonData = useMemo(
    () => normalizeCarbonData(carbonData),
    [carbonData]
  );

  // Log any topEmitters codes missing from normalized data (debug)
  useEffect(() => {
    if (stats?.topEmitters && Object.keys(normalizedCarbonData).length) {
      const missing = stats.topEmitters.filter(
        (c) => !normalizedCarbonData[c.code]
      );
      if (missing.length) {
        // eslint-disable-next-line no-console
        console.warn(
          "Missing carbonData for topEmitters codes:",
          missing.map((m) => m.code)
        );
      }
    }
  }, [stats, normalizedCarbonData]);

  // Combined fetch effect
  useEffect(() => {
    fetchCarbonData();
    fetchProjects();
  }, []);

  // Function to update selected country data when year changes
  const updateSelectedCountryForYear = useCallback(
    (yearData) => {
      if (!selectedCountry || !selectedCountry.code || !normalizedCarbonData)
        return;

      const countryCode = selectedCountry.code;
      const countryName = selectedCountry.name;

      // Get updated data for the selected country
      const updatedCountryData = normalizedCarbonData[countryCode];
      if (!updatedCountryData) return;

      const emission = updatedCountryData.latestEmission;
      const emissionData = updatedCountryData.data;

      // Get population from dummy data
      const population = getCountryPopulation(countryCode);
      const populationNum = getPopulationAsNumber(countryCode);

      // Calculate per capita if population data exists
      const perCapita = calculatePerCapitaEmission(emission, populationNum);

      // Calculate historical metrics
      const historicalMetrics = calculateHistoricalMetrics(emissionData);

      // Calculate relative to world average
      const worldAverage = stats.totalEmissions / stats.countryCount;
      const relativeToWorld =
        worldAverage > 0 ? ((emission / worldAverage) * 100).toFixed(0) : null;

      // Calculate percentile
      const percentile =
        stats.maxEmission > 0
          ? ((emission / stats.maxEmission) * 100).toFixed(1)
          : null;

      const aboveWorldAverage = worldAverage > 0 && emission > worldAverage;

      // Update the selected country with new year's data
      setSelectedCountry({
        code: countryCode,
        name: countryName,
        emission: emission,
        year: updatedCountryData.latestYear,
        population: population,
        data: emissionData,
        perCapita: perCapita,
        trend: getTrendForCountry(updatedCountryData),
        peakEmission: historicalMetrics.peakEmission,
        peakYear: historicalMetrics.peakYear,
        historicalChange: historicalMetrics.historicalChange,
        relativeToWorld: relativeToWorld,
        percentile: percentile,
        aboveWorldAverage: aboveWorldAverage,
        recentGrowthRate: historicalMetrics.recentGrowthRate,
        emissionAcceleration: historicalMetrics.emissionAcceleration,
        rankInWorld: getCountryRank(countryCode, stats.topEmitters),
        vsTopEmitter:
          stats.topEmitters.length > 0
            ? ((emission / stats.topEmitters[0].emission) * 100).toFixed(1)
            : null,
      });
    },
    [
      selectedCountry,
      normalizedCarbonData,
      stats,
      getCountryPopulation,
      getPopulationAsNumber,
    ]
  );

  // Effect to update selected country when carbonData changes (year changes)
  useEffect(() => {
    if (selectedCountry && normalizedCarbonData) {
      updateSelectedCountryForYear();
    }
  }, [normalizedCarbonData, selectedCountry, updateSelectedCountryForYear]);

  // Handle country selection
  const handleCountrySelect = useCallback((countryData) => {
    if (countryData) {
      setSelectedCountry(countryData);
      setSelectedProject(null);
    }
  }, []);

  // Handle project selection
  const handleProjectSelect = useCallback((project) => {
    setSelectedProject(project);
    setSelectedCountry(null);
  }, []);

  // Handle year change - update selected country for new year
  const handleYearChange = useCallback(
    (year) => {
      setSelectedYear(year);
      fetchCarbonData(year);
    },
    [setSelectedYear, fetchCarbonData]
  );

  // Handle refresh data - clear selections and reset to default
  const handleRefreshData = useCallback(() => {
    // Clear selections to show default panel
    setSelectedCountry(null);
    setSelectedProject(null);

    // Reset year to "latest"
    setSelectedYear("latest");

    // Fetch fresh data
    fetchCarbonData("latest");
    fetchProjects();
  }, [setSelectedYear, fetchCarbonData, fetchProjects]);

  // Handle reset view - only reset map position
  const handleResetViewOnly = useCallback(() => {
    handleResetView();
  }, [handleResetView]);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen p-4 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading emission data...</p>
          <p className="text-sm text-gray-500 mt-2">
            Fetching carbon emissions data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <Legend error={error} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column (Map/Chart Area) */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-gray-700 space-y-6">
            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleTabChange("map")}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors ${
                  activeTab === "map"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                }`}
              >
                <MapIcon size={18} />
                Map View
              </button>
              <button
                onClick={() => handleTabChange("line")}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors ${
                  activeTab === "line"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                }`}
              >
                <ChartBarIncreasing size={18} />
                Bar Chart
              </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {/* Year Selector and Controls Row */}
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">
                  {activeTab === "map"
                    ? "Emissions Map"
                    : `Top 7 Emitters (${selectedYear === "latest" ? "Latest Data" : selectedYear})
`}
                </h3>
                <div className="flex gap-2 items-center">
                  {/* Year Selector */}
                  <select
                    value={selectedYear}
                    onChange={(e) => {
                      const year = e.target.value;
                      handleYearChange(year);
                    }}
                    className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm rounded-lg px-3 py-2"
                  >
                    {(availableYears || []).map((year) => (
                      <option key={year} value={year}>
                        {year === "latest" ? "Latest" : year}
                      </option>
                    ))}
                  </select>

                  {activeTab === "map" && (
                    <button
                      onClick={handleResetViewOnly}
                      className="bg-btn-secondary hover:bg-btn-secondary-hover text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Reset View
                    </button>
                  )}

                  <button
                    onClick={handleRefreshData}
                    className="bg-btn-secondary hover:bg-btn-secondary-hover text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Refresh Data
                  </button>
                </div>
              </div>

              {/* Map or Chart Content */}
              {activeTab === "map" ? (
                <MapVisualization
                  position={position}
                  carbonData={normalizedCarbonData}
                  stats={stats}
                  selectedYear={selectedYear}
                  availableYears={availableYears}
                  projectsWithCoords={projectsWithCoords}
                  isGeocoding={isGeocoding}
                  projectsLoading={projectsLoading}
                  handleMoveEnd={handleMoveEnd}
                  handleResetView={handleResetViewOnly}
                  fetchCarbonData={handleYearChange}
                  fetchProjects={handleRefreshData}
                  setSelectedYear={handleYearChange}
                  getCountryPopulation={getCountryPopulation}
                  getPopulationAsNumber={getPopulationAsNumber}
                  onCountrySelect={handleCountrySelect}
                  onProjectSelect={handleProjectSelect}
                />
              ) : (
                <TopEmittersBarChart
    carbonData={normalizedCarbonData}
    stats={stats}
    selectedYear={selectedYear}
  />
              )}
            </div>
          </div>

          {/* Info Panel */}
          <InfoPanel
            selectedCountry={selectedCountry}
            selectedProject={selectedProject}
            stats={stats}
          />
        </div>
      </div>
    </div>
  );
};

// Helper functions (same as before)
const calculatePerCapitaEmission = (emission, populationNum) => {
  if (!emission || !populationNum || populationNum <= 0) return null;

  const emissionInTons = emission * 1000000;
  const populationInMillions = populationNum;

  const perCapita = emissionInTons / (populationInMillions * 1000000);
  return perCapita.toFixed(2);
};

const getTrendForCountry = (countryData) => {
  if (!countryData || countryData.data.length < 2)
    return { status: "No data", change: 0 };

  const recentYears = countryData.data.slice(-10);
  if (recentYears.length < 2)
    return { status: "Insufficient data", change: 0 };

  const first = recentYears[0].emission;
  const last = recentYears[recentYears.length - 1].emission;
  const change = ((last - first) / first) * 100;

  if (Math.abs(change) < 5) return { status: "Stable", change };
  return change > 0
    ? { status: "Increasing", change }
    : { status: "Decreasing", change: Math.abs(change) };
};

const calculateHistoricalMetrics = (data) => {
  if (!data || data.length === 0)
    return {
      peakEmission: null,
      peakYear: null,
      historicalChange: null,
      recentGrowthRate: null,
      emissionAcceleration: null,
    };

  const sortedData = [...data].sort((a, b) => a.year - b.year);

  let peakEmission = sortedData[0].emission;
  let peakYear = sortedData[0].year;
  sortedData.forEach((item) => {
    if (item.emission > peakEmission) {
      peakEmission = item.emission;
      peakYear = item.year;
    }
  });

  const firstEmission = sortedData[0].emission;
  const latestEmission = sortedData[sortedData.length - 1].emission;
  const historicalChange =
    firstEmission > 0
      ? (((latestEmission - firstEmission) / firstEmission) * 100).toFixed(1)
      : null;

  let recentGrowthRate = null;
  if (sortedData.length >= 5) {
    const last5 = sortedData.slice(-5);
    const first5 = last5[0].emission;
    const last5Latest = last5[last5.length - 1].emission;
    if (first5 > 0) {
      recentGrowthRate = (((last5Latest - first5) / first5) * 100).toFixed(1);
    }
  }

  let emissionAcceleration = null;
  if (sortedData.length >= 10) {
    const firstHalf = sortedData.slice(0, 5);
    const secondHalf = sortedData.slice(-5);

    const firstHalfGrowth =
      firstHalf[firstHalf.length - 1].emission / firstHalf[0].emission;
    const secondHalfGrowth =
      secondHalf[secondHalf.length - 1].emission / secondHalf[0].emission;

    emissionAcceleration = (
      ((secondHalfGrowth - firstHalfGrowth) / firstHalfGrowth) *
      100
    ).toFixed(1);
  }

  return {
    peakEmission,
    peakYear,
    historicalChange,
    recentGrowthRate,
    emissionAcceleration,
  };
};

const getCountryRank = (countryCode, topEmitters) => {
  if (!topEmitters || topEmitters.length === 0) return null;

  const sortedEmissions = [...topEmitters].sort((a, b) => b.emission - a.emission);

  const rank = sortedEmissions.findIndex((item) => item.code === countryCode);
  return rank !== -1 ? rank + 1 : null;
};

export default CarbonEmissionWorldMap;