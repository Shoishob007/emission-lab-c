/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Loader } from "lucide-react";
import useOffsetStore from "@/stores/offsetStore";
import MapVisualization from "./components/MapVisualization";
import InfoPanel from "./components/InfoPanel";
import Legend from "./components/Legend";
import { useCarbonData } from "./hooks/useCarbonData";
import { useProjectsData } from "./hooks/useProjectsData";
import { useCountryData } from "./hooks/useCountryData";
import { useMapInteractions } from "./hooks/useMapInteractions";

const CarbonEmissionWorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Import hooks for different concerns
  const {
    carbonData,
    stats,
    selectedYear,
    setSelectedYear,
    isLoading,
    error,
    fetchCarbonData,
    availableYears
  } = useCarbonData();
  
  const {
    projectsWithCoords,
    isGeocoding,
    projectsLoading,
    extractCountryName
  } = useProjectsData();
  
  const {
    getCountryData,
    getCountryPopulation,
    getPopulationAsNumber
  } = useCountryData();
  
  const {
    position,
    handleMoveEnd,
    handleResetView
  } = useMapInteractions();

  const { fetchProjects } = useOffsetStore();

  // Function to update selected country data when year changes
  const updateSelectedCountryForYear = useCallback((yearData) => {
    if (!selectedCountry || !selectedCountry.code || !carbonData) return;
    
    const countryCode = selectedCountry.code;
    const countryName = selectedCountry.name;
    
    // Get updated data for the selected country
    const updatedCountryData = carbonData[countryCode];
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
  }, [selectedCountry, carbonData, stats, getCountryPopulation, getPopulationAsNumber]);

  // Combined fetch effect
  useEffect(() => {
    fetchCarbonData();
    fetchProjects();
  }, []);

  // Effect to update selected country when carbonData changes (year changes)
  useEffect(() => {
    if (selectedCountry && carbonData) {
      updateSelectedCountryForYear();
    }
  }, [carbonData, selectedCountry, updateSelectedCountryForYear]);

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

  // Handle year change - DON'T clear selections, just fetch new data
  const handleYearChange = useCallback((year) => {
    setSelectedYear(year);
    fetchCarbonData(year);
  }, [setSelectedYear, fetchCarbonData]);

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
          {/* Map */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-gray-700 space-y-6">
            <MapVisualization
              position={position}
              carbonData={carbonData}
              stats={stats}
              selectedYear={selectedYear}
              availableYears={availableYears}
              projectsWithCoords={projectsWithCoords}
              isGeocoding={isGeocoding}
              projectsLoading={projectsLoading}
              handleMoveEnd={handleMoveEnd}
              handleResetView={handleResetView}
              fetchCarbonData={fetchCarbonData}
              fetchProjects={fetchProjects}
              setSelectedYear={handleYearChange} // Use the new handler
              getCountryPopulation={getCountryPopulation}
              getPopulationAsNumber={getPopulationAsNumber}
              onCountrySelect={handleCountrySelect}
              onProjectSelect={handleProjectSelect}
            />
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

// Helper functions (same as in useMapLogic.js)
const calculatePerCapitaEmission = (emission, populationNum) => {
  if (!emission || !populationNum || populationNum <= 0) return null;
  
  // Convert emission from million tons to tons (since population is in millions)
  const emissionInTons = emission * 1000000;
  const populationInMillions = populationNum;
  
  // Calculate per capita in tons per person
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

  const sortedEmissions = topEmitters.sort(
    (a, b) => b.emission - a.emission
  );

  const rank = sortedEmissions.findIndex((item) => item.code === countryCode);
  return rank !== -1 ? rank + 1 : null;
};

export default CarbonEmissionWorldMap;