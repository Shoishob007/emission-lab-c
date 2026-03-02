/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Loader, Map, TrendingUp, BarChart2 } from "lucide-react";
import useOffsetStore from "@/stores/offsetStore";
import MapVisualization from "./components/MapVisualization";
import LineChart from "./components/LineChart";
import InfoPanel from "./components/InfoPanel";
import { useCarbonData } from "./hooks/useCarbonData";
import { useProjectsData } from "./hooks/useProjectsData";
import { useMapInteractions } from "./hooks/useMapInteractions";
import normalizeCarbonData from "./utils/normalizedCarbonData";
import TopEmittersBarChart from "./components/TopEmitterBarChart";

const CarbonEmissionWorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState("map");
  const [isInitialized, setIsInitialized] = useState(false);

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

  const { projectsWithCoords, isGeocoding, projectsLoading } =
    useProjectsData();

  const { position, handleMoveEnd, handleResetView } = useMapInteractions();

  const { fetchProjects } = useOffsetStore();

  const normalizedCarbonData = useMemo(
    () => normalizeCarbonData(carbonData),
    [carbonData],
  );

  useEffect(() => {
    if (!isInitialized && availableYears.length > 0) {
      const defaultYear = "2024";
      setSelectedYear(defaultYear);
      setIsInitialized(true);
    }
  }, [availableYears, isInitialized, setSelectedYear]);

  useEffect(() => {
    if (isInitialized) {
      fetchCarbonData(selectedYear);
      if (selectedYear === "latest" || selectedYear === "2024") {
        fetchProjects();
      }
      setSelectedCountry(null);
    }
  }, [selectedYear, isInitialized]);

  useEffect(() => {
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
    [setSelectedYear],
  );

  const handleRefreshData = useCallback(() => {
    setSelectedCountry(null);
    setSelectedProject(null);
    const defaultYear = "2024";
    setSelectedYear(defaultYear);
    fetchCarbonData(defaultYear);
    fetchProjects();
  }, [fetchCarbonData, fetchProjects, setSelectedYear]);

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
    <section
      id="carbon-map"
      className="relative py-8 md:py-20 bg-white overflow-x-hidden flex justify-center items-center"
      style={{
        backgroundImage: "url('/city1.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "650px",
      }}
    >
      {/* BG overlay - same as about section */}
      <div
        className="absolute inset-0"
        style={{
          pointerEvents: "none",
          background:
            "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.8) 100%)",
        }}
      />

      {/* Content container */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-2 sm:px-0 bg-white">
        <div className="text-center mb-16">
          <h2 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight capitalize">
            Global Carbon <span className="text-primary">Footprint</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Where the world emits and where it acts{" "}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 px-4 border border-gray-100 dark:border-gray-700 space-y-6 rounded-l-lg">
            <div className="flex justify-center sm:justify-start border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleTabChange("map")}
                className={`flex items-center gap-2 px-2 sm:px-4 py-2 sm:py-3 font-medium text-sm transition-colors ${
                  activeTab === "map"
                    ? "text-secondary dark:text-secondary border-b-2 border-secondary dark:border-secondary"
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
                    ? "text-secondary dark:text-secondary border-b-2 border-secondary dark:border-secondary"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                }`}
              >
                <BarChart2 size={18} />
                Bar Chart
              </button>
              <button
                onClick={() => handleTabChange("line")}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors ${
                  activeTab === "line"
                    ? "text-secondary dark:text-secondary border-b-2 border-secondary dark:border-secondary"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                }`}
              >
                <TrendingUp size={18} />
                Line Chart
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h3 className="text-lg sm:text-xl font-bold">
                  {activeTab === "map"
                    ? "Global CO₂ Emissions Map"
                    : activeTab === "bar"
                      ? `Top 10 Emitters (${selectedYear})`
                      : "Historical Emissions by Region"}
                </h3>
                <div className="flex flex-wrap gap-2 items-center w-fit sm:w-auto">
                  {activeTab !== "line" && (
                    <select
                      value={selectedYear}
                      onChange={(e) => handleYearChange(e.target.value)}
                      className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-xs sm:text-sm rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 flex-1 sm:flex-none min-w-[100px]"
                    >
                      {availableYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  )}

                  {activeTab === "map" && (
                    <button
                      onClick={handleResetViewOnly}
                      className="bg-btn-secondary hover:bg-btn-secondary-hover text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap"
                    >
                      Reset View
                    </button>
                  )}

                  <button
                    onClick={handleRefreshData}
                    className="bg-btn-secondary hover:bg-btn-secondary-hover text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap"
                  >
                    Refresh Data
                  </button>
                </div>
              </div>

              {isLoading && activeTab !== "line" ? (
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
                />
              ) : activeTab === "bar" ? (
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
    </section>
  );
};

export default CarbonEmissionWorldMap;
