/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { Loader } from "lucide-react";
import {
  geoUrl,
  fixedNameToISO,
  countryNameToCode,
  countryPopulation,
} from "./data";
import InfoPanel from "./components/InfoPanel";
import Legend from "./components/Legend";
import useOffsetStore from "@/stores/offsetStore";

// Cache for country data
const countryDataCache = {};

const CarbonEmissionWorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [carbonData, setCarbonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalEmissions: 0,
    countryCount: 0,
    maxEmission: 0,
    latestYear: 0,
    topEmitters: [],
  });
  const [selectedYear, setSelectedYear] = useState("latest");
  const [projectsWithCoords, setProjectsWithCoords] = useState([]);
  const [isGeocoding, setIsGeocoding] = useState(false);

  const {
    projects,
    loading: projectsLoading,
    fetchProjects,
  } = useOffsetStore();

  useEffect(() => {
    fetchCarbonData();
    fetchProjects();
  }, []);

  const getCountryData = useCallback(async (countryName) => {
    if (!countryName) return null;

    if (countryDataCache[countryName]) {
      return countryDataCache[countryName];
    }

    try {
      const response = await fetch(
        `/api/country-info?name=${encodeURIComponent(countryName)}`
      );

      if (!response.ok) {
        console.warn(`Country data not found for: ${countryName}`);
        return null;
      }

      const data = await response.json();
      countryDataCache[countryName] = data;
      return data;
    } catch (error) {
      console.error(`Error fetching country data for ${countryName}:`, error);
      return null;
    }
  }, []);

  // Function to extract country name from location string
  const extractCountryName = useCallback((location) => {
    if (!location) return null;

    // Extract the last part (usually the country)
    const parts = location.split(",").map((part) => part.trim());
    let countryName = parts[parts.length - 1];

    // Handle common abbreviations
    const countryMap = {
      USA: "United States",
      US: "United States",
      "U.S.A.": "United States",
      "U.K.": "United Kingdom",
      UK: "United Kingdom",
      "U.A.E.": "United Arab Emirates",
      UAE: "United Arab Emirates",
      TX: "United States",
      PER: "Peru",
      TUR: "Turkey",
      COL: "Colombia",
    };

    if (countryMap[countryName]) {
      return countryMap[countryName];
    }

    return countryName;
  }, []);

  useEffect(() => {
    const processProjects = async () => {
      if (!projects || projects.length === 0 || projectsLoading) return;

      setIsGeocoding(true);

      try {
        const processedProjects = [];

        for (const project of projects) {
          if (!project.location) continue;

          const countryName = extractCountryName(project.location);
          if (!countryName) continue;

          const countryData = await getCountryData(countryName);

          if (countryData) {
            const coords = countryData.capitalCoords;

            if (coords && coords.length === 2) {
              processedProjects.push({
                id: project.id,
                name: project.name,
                description: project.description,
                type: project.project_type,
                standard: project.standard,
                vintage: project.vintage,
                location: project.location,
                offsetAmount: `${project.available_amount || 0} tons available`,
                price: `$${project.price_per_ton || 0} per ton`,
                image: project.image_url,
                validationReport: project.validation_report_url,
                monitoringReport: project.monitoring_report_url,
                infoLink: project.info_link,
                projectIdDisplay: project.project_id_display,
                lat: coords[0],
                lng: coords[1],
                countryCode: countryData.cca3,
                countryName: countryData.name,
                capital: countryData.capital,
                originalData: project,
              });
            }
          }
        }

        setProjectsWithCoords(processedProjects);
      } catch (error) {
        console.error("Error processing projects:", error);
        setError("Failed to geocode project locations");
      } finally {
        setIsGeocoding(false);
      }
    };

    processProjects();
  }, [projects, projectsLoading, extractCountryName, getCountryData]);

  // Get country population from imported dummy data
  const getCountryPopulation = useCallback((countryCode) => {
    // Directly return from imported countryPopulation object
    return countryPopulation[countryCode] || "N/A";
  }, []);

  // Get population as number for calculations
  const getPopulationAsNumber = useCallback((countryCode) => {
    const populationStr = countryPopulation[countryCode];
    if (!populationStr || populationStr === "N/A") return null;

    // Convert "40.1M" to 40.1 (in millions)
    const match = populationStr.match(/([\d,.]+)M/);
    if (match) {
      return parseFloat(match[1].replace(/,/g, ""));
    }
    return null;
  }, []);

  const fetchCarbonData = async (year = selectedYear) => {
    try {
      setIsLoading(true);
      setError(null);

      const query = year && year !== "latest" ? `?year=${year}` : "";

      const res = await fetch(`/api/carbon-data/api${query}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed fetching data");

      const json = await res.json();
      processCarbonData(json.data || []);

      // Clear selections when year changes to show default panel
      setSelectedCountry(null);
      setSelectedProject(null);
    } catch (error) {
      setError("Failed to load CO₂ emissions data");
      setIsLoading(false);
    }
  };

  const availableYears = [
    "latest",
    ...Array.from({ length: 2024 - 1960 + 1 }, (_, i) => 2024 - i),
  ];

  const processCarbonData = (apiData) => {
    try {
      const processedData = {};
      let globalTotal = 0;
      let max = 0;
      let countriesProcessed = 0;
      let latestYear = 0;
      const topEmitters = [];

      apiData.forEach((item) => {
        const iso = item.iso_code;
        const name = item.country;
        const year = item.year;
        const emission = Number(item.co2);

        if (!iso || emission == null || isNaN(emission) || emission < 0) return;

        processedData[iso] = {
          name,
          latestEmission: emission,
          latestYear: year,
          data: [
            {
              year,
              emission,
              emissionInMillionTons: emission,
            },
          ],
        };

        globalTotal += emission;

        if (emission > max) max = emission;
        if (year > latestYear) latestYear = year;

        topEmitters.push({
          code: iso,
          name,
          emission,
          year,
        });

        countriesProcessed++;
      });

      const sortedTopEmitters = topEmitters
        .sort((a, b) => b.emission - a.emission)
        .slice(0, 10);

      setCarbonData(processedData);

      setStats({
        totalEmissions: globalTotal,
        countryCount: countriesProcessed,
        maxEmission: max,
        latestYear,
        topEmitters: sortedTopEmitters,
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Error processing climate data:", error);
      setError("Error processing climate data. Some features may be limited.");
      setIsLoading(false);
    }
  };

  const combinedMapping = { ...countryNameToCode, ...fixedNameToISO };

  // Extract country code from geo object
  const extractCountryCode = (geo) => {
    const props = geo.properties || {};
    let isoA3 = props.iso_a3 || props.ISO_A3 || props.isoA3;
    const name =
      props.name || props.NAME || props.ADMIN || props.name_long || "";

    // If GeoJSON has "-99" or empty → replace using fixed mapping
    if (isoA3 === "-99" || !isoA3 || isoA3.length !== 3) {
      isoA3 = combinedMapping[name] || null;
    }

    return {
      code: isoA3,
      name: name,
    };
  };

  // Get emission for a country
  const getEmissionForCountry = (countryCode) => {
    if (!carbonData || !carbonData[countryCode]) return null;
    return carbonData[countryCode].latestEmission;
  };

  // Get color for emission value
  const getColorForEmission = (emission) => {
    if (emission == null) return "#e5e7eb";

    const percentile = (emission / stats.maxEmission) * 100;

    if (percentile < 0.1) return "#fef3c7";
    if (percentile < 1) return "#fbbf24";
    if (percentile < 10) return "#f59e0b";
    if (percentile < 30) return "#dc2626";
    return "#991b1b";
  };

  // Handle country click
  const handleRegionClick = (geo) => {
    const { code, name } = extractCountryCode(geo);

    if (code && carbonData && carbonData[code]) {
      const countryData = carbonData[code];
      const emission = countryData.latestEmission;
      const emissionData = countryData.data;

      // Get population from dummy data
      const population = getCountryPopulation(code);
      const populationNum = getPopulationAsNumber(code);

      // Calculate per capita if population data exists
      let perCapita = null;
      if (populationNum && populationNum > 0) {
        perCapita = countryData.latestEmission / populationNum;
      }

      // Calculate historical metrics from existing data
      const historicalMetrics = calculateHistoricalMetrics(emissionData);

      // Calculate relative to world average
      const worldAverage = stats.totalEmissions / stats.countryCount;
      const relativeToWorld =
        worldAverage > 0 ? ((emission / worldAverage) * 100).toFixed(0) : null;

      // Calculate percentile (how this country ranks)
      const percentile =
        stats.maxEmission > 0
          ? ((emission / stats.maxEmission) * 100).toFixed(1)
          : null;

      // Calculate if emission is above/below average
      const aboveWorldAverage = worldAverage > 0 && emission > worldAverage;

      setSelectedCountry({
        code: code,
        name: name,
        emission: emission,
        year: countryData.latestYear,
        population: population,
        data: countryData.data,
        perCapita: perCapita,
        trend: getTrendForCountry(countryData),

        // NEW: Additional calculated metrics
        // 1. Historical performance
        peakEmission: historicalMetrics.peakEmission,
        peakYear: historicalMetrics.peakYear,
        historicalChange: historicalMetrics.historicalChange,

        // 2. Relative metrics
        relativeToWorld: relativeToWorld,
        percentile: percentile,
        aboveWorldAverage: aboveWorldAverage,

        // 3. Recent performance
        recentGrowthRate: historicalMetrics.recentGrowthRate,
        emissionAcceleration: historicalMetrics.emissionAcceleration,

        // 4. Ranking info
        rankInWorld: getCountryRank(code),

        // 5. Comparison with top emitters
        vsTopEmitter:
          stats.topEmitters.length > 0
            ? ((emission / stats.topEmitters[0].emission) * 100).toFixed(1)
            : null,
      });
      setSelectedProject(null);
    }
  };

  // Handle project click
  const handleProjectClick = (project) => {
    setSelectedProject({
      ...project,
      // Ensure project has the right structure for InfoPanel
      country: project.countryName || project.location,
      offsetAmount: project.offsetAmount,
      type: project.type,
      description: project.description,
    });
    setSelectedCountry(null);
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

  // Handle move end for zoom/pan
  const handleMoveEnd = (pos) => {
    setPosition(pos);
  };

  // Reset view
  const handleResetView = () => {
    setPosition({ coordinates: [0, 0], zoom: 1 });
    setSelectedCountry(null);
    setSelectedProject(null);
  };

  // Helper function to calculate historical metrics
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

    // Find peak emissions
    let peakEmission = sortedData[0].emission;
    let peakYear = sortedData[0].year;
    sortedData.forEach((item) => {
      if (item.emission > peakEmission) {
        peakEmission = item.emission;
        peakYear = item.year;
      }
    });

    // Calculate historical change (first to last)
    const firstEmission = sortedData[0].emission;
    const latestEmission = sortedData[sortedData.length - 1].emission;
    const historicalChange =
      firstEmission > 0
        ? (((latestEmission - firstEmission) / firstEmission) * 100).toFixed(1)
        : null;

    // Calculate recent growth rate
    let recentGrowthRate = null;
    if (sortedData.length >= 5) {
      const last5 = sortedData.slice(-5);
      const first5 = last5[0].emission;
      const last5Latest = last5[last5.length - 1].emission;
      if (first5 > 0) {
        recentGrowthRate = (((last5Latest - first5) / first5) * 100).toFixed(1);
      }
    }

    // Calculate emission acceleration
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

  // Helper function to get country rank
  const getCountryRank = (countryCode) => {
    if (!stats.topEmitters || stats.topEmitters.length === 0) return null;

    const sortedEmissions = stats.topEmitters.sort(
      (a, b) => b.emission - a.emission
    );

    const rank = sortedEmissions.findIndex((item) => item.code === countryCode);
    return rank !== -1 ? rank + 1 : null;
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen p-4 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">
            Loading climate data from Climate Watch API...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Fetching real-time carbon emissions data
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
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Emissions Map</h3>
              <div className="flex gap-2 items-center">
                {/* Year Selector */}
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    const year = e.target.value;
                    setSelectedYear(year);
                    fetchCarbonData(year);
                  }}
                  className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm rounded-lg px-3 py-2"
                >
                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {year === "latest" ? "Latest" : year}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleResetView}
                  className="bg-btn-secondary hover:bg-btn-secondary-hover text-white px-4 py-2 rounded-lg text-sm"
                >
                  Reset View
                </button>

                <button
                  onClick={() => {
                    fetchCarbonData();
                    fetchProjects();
                  }}
                  className="bg-btn-secondary hover:bg-btn-secondary-hover text-white px-4 py-2 rounded-lg text-sm"
                >
                  Refresh Data
                </button>
              </div>
            </div>

            <div className="h-[520px] rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 relative">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: position.zoom * 100,
                  center: [0, 20],
                }}
              >
                <ZoomableGroup
                  center={position.coordinates}
                  zoom={position.zoom}
                  onMoveEnd={handleMoveEnd}
                >
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const { code, name } = extractCountryCode(geo);
                        const emission = getEmissionForCountry(code);
                        const fillColor = getColorForEmission(emission);
                        const population = getCountryPopulation(code);

                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={fillColor}
                            stroke="#FFF"
                            strokeWidth={0.5}
                            style={{
                              default: {
                                outline: "none",
                                cursor:
                                  emission !== null ? "pointer" : "default",
                              },
                              hover: {
                                fill: emission !== null ? "#3B82F6" : fillColor,
                                outline: "none",
                                cursor:
                                  emission !== null ? "pointer" : "default",
                              },
                              pressed: {
                                fill: emission !== null ? "#2563EB" : fillColor,
                                outline: "none",
                              },
                            }}
                            onClick={() =>
                              emission !== null && handleRegionClick(geo)
                            }
                            onMouseEnter={() => {
                              const tooltip =
                                document.getElementById("country-tooltip");
                              if (tooltip) {
                                tooltip.style.display = "block";
                                if (emission !== null) {
                                  tooltip.innerHTML = `
                                    <div class="p-2">
                                      <strong class="text-sm">${name}</strong><br/>
                                      <span class="text-xs">CO₂: ${
                                        emission !== null
                                          ? emission.toLocaleString("en-US", {
                                              maximumFractionDigits: 1,
                                            })
                                          : "No data"
                                      } MtCO₂e</span>
                                      <br/><span class="text-xs">Population: ${population}</span>
                                    </div>
                                  `;
                                } else {
                                  tooltip.innerHTML = `
                                    <div class="p-2">
                                      <strong class="text-sm">${
                                        name || "Unknown Country"
                                      }</strong><br/>
                                      <span class="text-xs">No emission data available</span>
                                    </div>
                                  `;
                                }
                              }
                            }}
                            onMouseLeave={() => {
                              const tooltip =
                                document.getElementById("country-tooltip");
                              if (tooltip) {
                                tooltip.style.display = "none";
                              }
                            }}
                            onMouseMove={(event) => {
                              const tooltip =
                                document.getElementById("country-tooltip");
                              if (tooltip) {
                                tooltip.style.left = `${event.clientX + 10}px`;
                                tooltip.style.top = `${event.clientY + 10}px`;
                              }
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>

                  {/* Project Markers - USING REAL PROJECTS */}
                  {projectsWithCoords.map((project) => (
                    <Marker
                      key={project.id}
                      coordinates={[project.lng, project.lat]}
                      onClick={() => handleProjectClick(project)}
                    >
                      <g>
                        <circle
                          r={6}
                          fill="#10B981"
                          stroke="#FFF"
                          strokeWidth={2}
                          style={{ cursor: "pointer" }}
                          onMouseEnter={(event) => {
                            const tooltip =
                              document.getElementById("project-tooltip");
                            if (tooltip) {
                              tooltip.style.display = "block";
                              tooltip.innerHTML = `
                                <div class="p-2">
                                  <strong class="text-sm">${project.name}</strong><br/>
                                  <span class="text-xs"><em>${project.type}</em></span><br/>
                                  <span class="text-xs">${project.offsetAmount}</span><br/>
                                  <span class="text-xs">${project.location}</span>
                                </div>
                              `;
                            }
                          }}
                          onMouseLeave={() => {
                            const tooltip =
                              document.getElementById("project-tooltip");
                            if (tooltip) {
                              tooltip.style.display = "none";
                            }
                          }}
                          onMouseMove={(event) => {
                            const tooltip =
                              document.getElementById("project-tooltip");
                            if (tooltip) {
                              tooltip.style.left = `${event.clientX + 10}px`;
                              tooltip.style.top = `${event.clientY + 10}px`;
                            }
                          }}
                        />
                        {position.zoom > 2 && project.countryCode && (
                          <text
                            textAnchor="middle"
                            y={15}
                            style={{
                              fontFamily: "system-ui",
                              fill: "#10B981",
                              fontSize: "10px",
                              fontWeight: "bold",
                              pointerEvents: "none",
                            }}
                          >
                            {project.countryCode}
                          </text>
                        )}
                      </g>
                    </Marker>
                  ))}
                </ZoomableGroup>
              </ComposableMap>

              {/* Tooltips */}
              <div
                id="country-tooltip"
                className="fixed hidden bg-black/90 text-white text-xs rounded-md pointer-events-none z-50 max-w-xs shadow-lg"
                style={{ display: "none" }}
              />
              <div
                id="project-tooltip"
                className="fixed hidden bg-green-600/95 text-white text-xs rounded-md pointer-events-none z-50 max-w-xs shadow-lg"
                style={{ display: "none" }}
              />

              {/* Zoom Instructions */}
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs p-2 rounded backdrop-blur-sm">
                Scroll to zoom • Drag to pan
                {projectsWithCoords.length > 0 && (
                  <span className="block mt-1">
                    {projectsWithCoords.length} projects loaded
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <InfoPanel
            selectedCountry={selectedCountry}
            selectedProject={selectedProject}
            stats={stats}
          />
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>
            Hover over countries for quick info, click for detailed statistics.
            {projectsWithCoords.length === 0 &&
              !projectsLoading &&
              !isGeocoding && (
                <span className="text-yellow-500 ml-2">
                  (No projects with location data found)
                </span>
              )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarbonEmissionWorldMap;
