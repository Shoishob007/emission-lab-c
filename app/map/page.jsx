/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Loader, Map, TrendingUp, BarChart2 } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState("map"); // "map", "bar", "line"

  const {
    carbonData,
    stats,
    regionalData,
    selectedYear,
    setSelectedYear,
    isLoading,
    error,
    fetchCarbonData,
    fetchHistoricalData,
    availableYears,
  } = useCarbonData();

  const {
    projectsWithCoords,
    isGeocoding,
    projectsLoading,
  } = useProjectsData();

  const { getCountryPopulation, getPopulationAsNumber } =
    useCountryData();

  const { position, handleMoveEnd, handleResetView } = useMapInteractions();

  const { fetchProjects } = useOffsetStore();

  const normalizedCarbonData = useMemo(
    () => normalizeCarbonData(carbonData),
    [carbonData]
  );

  useEffect(() => {
    fetchCarbonData(selectedYear);
    if(selectedYear === 'latest'){
      fetchProjects();
    }
    // Clear selected country when year changes to force re-selection with new data
    setSelectedCountry(null);
  }, [selectedYear]);

  useEffect(() => {
    // Fetch historical data once for the line chart
    fetchHistoricalData();
  }, []);

  const handleCountrySelect = useCallback((countryData) => {
    if (countryData) {
      setSelectedCountry(countryData);
      setSelectedProject(null);
    }
  }, []);

  const handleProjectSelect = useCallback((project) => {
    setSelectedProject(project);
    setSelectedCountry(null);
  }, []);

  const handleYearChange = useCallback(
    (year) => {
      setSelectedYear(year);
    },
    [setSelectedYear]
  );

  const handleRefreshData = useCallback(() => {
    setSelectedCountry(null);
    setSelectedProject(null);
    setSelectedYear("latest");
    fetchCarbonData("latest");
    fetchProjects();
  }, [fetchCarbonData, fetchProjects]);

  const handleResetViewOnly = useCallback(() => {
    handleResetView();
  }, [handleResetView]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (isLoading && !regionalData) {
    return (
      <div className="w-full min-h-screen p-4 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading emission data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <Legend error={error} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 mb-8">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-2xl p-6 border border-gray-100 dark:border-gray-700 space-y-6">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleTabChange("map")}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors ${
                  activeTab === "map"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                }`}
              >
                <Map size={18} />
                Map View
              </button>
              <button
                onClick={() => handleTabChange("bar")}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors ${
                  activeTab === "bar"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                }`}
              >
                <BarChart2 size={18} />
                Bar Chart
              </button>
              {(
                 <button
                  onClick={() => handleTabChange("line")}
                  className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors ${
                    activeTab === "line"
                      ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                  }`}
                >
                  <TrendingUp size={18} />
                  Line Chart
                </button>
              )}
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">
                  {activeTab === "map"
                    ? "Emissions Map"
                    : activeTab === 'bar'
                    ? `Top 10 Emitters (${selectedYear === "latest" ? "Latest Data" : selectedYear})`
                    : 'Historical Emissions by Region'}
                </h3>
                <div className="flex gap-2 items-center">
                  {activeTab !== 'line' && (
                    <select
                      value={selectedYear}
                      onChange={(e) => handleYearChange(e.target.value)}
                      className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm rounded-lg px-3 py-2"
                    >
                      {availableYears.map((year) => (
                        <option key={year} value={year}>
                          {year === "latest" ? "Latest" : year}
                        </option>
                      ))}
                    </select>
                  )}

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

              {isLoading && activeTab !== 'line' ? (
                 <div className="w-full h-96 flex items-center justify-center">
                    <div className="text-center">
                      <Loader className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                      <p className="text-gray-600">Loading emission data...</p>
                    </div>
                  </div>
              ) : activeTab === "map" ? (
                <MapVisualization
                  position={position}
                  carbonData={normalizedCarbonData}
                  stats={stats}
                  projectsWithCoords={projectsWithCoords}
                  isGeocoding={isGeocoding}
                  projectsLoading={projectsLoading}
                  handleMoveEnd={handleMoveEnd}
                  onCountrySelect={handleCountrySelect}
                  onProjectSelect={handleProjectSelect}
                  getCountryPopulation={getCountryPopulation}
                  getPopulationAsNumber={getPopulationAsNumber}
                />
              ) : activeTab === 'bar' ? (
                <TopEmittersBarChart
                  carbonData={normalizedCarbonData}
                  stats={stats}
                  selectedYear={selectedYear}
                />
              ) : regionalData ? (
                <LineChart data={regionalData} />
              ) : (
                <div className="w-full h-96 flex items-center justify-center">
                  <div className="text-center">
                    <Loader className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">Loading historical data...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <InfoPanel
            selectedCountry={selectedCountry}
            selectedProject={selectedProject}
            stats={stats}
            selectedYear={selectedYear}
          />
        </div>
      </div>
    </div>
  );
};

export default CarbonEmissionWorldMap;