"use client";
import React, { useState, useEffect } from "react";
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
  countryPopulation,
  fixedNameToISO,
  countryNameToCode,
  offsetProjects,
} from "./data";
import InfoPanel from "./components/InfoPanel";
import Legend from "./components/Legend";

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

  // Fetch Climate Watch API data on component mount
  useEffect(() => {
    fetchCarbonData();
  }, []);

  const fetchCarbonData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/carbon-data/api", {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed fetching data");

      const json = await res.json();

      console.log("json data :: ", json);

      processCarbonData(json.data || []);
    } catch (error) {
      console.error("Carbon Fetch Error:", error);
      setError("Failed to load CO₂ emissions data");
      setIsLoading(false);
    }
  };

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

      // Calculate per capita if population data exists
      let perCapita = null;
      if (countryPopulation[code]) {
        const popNum = parseFloat(
          countryPopulation[code].replace(/[^\d.]/g, "")
        );
        if (popNum > 0) {
          perCapita = countryData.latestEmission / popNum;
        }
      }

      setSelectedCountry({
        code: code,
        name: name,
        emission: emission,
        year: countryData.latestYear,
        population: countryPopulation[code] || "N/A",
        data: countryData.data,
        perCapita: perCapita,
        trend: getTrendForCountry(countryData),
      });
      setSelectedProject(null);
    }
  };

  // Handle project click
  const handleProjectClick = (project) => {
    setSelectedProject(project);
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

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 p-4 flex items-center justify-center">
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
    <div className="w-full min-h-screen p-4 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <Legend error={error} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Map */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Interactive Emissions Map
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={handleResetView}
                  className="bg-btn-secondary hover:bg-btn-secondary-hover text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all text-sm font-medium"
                >
                  Reset View
                </button>
                <button
                  onClick={fetchCarbonData}
                  className="bg-btn-secondary hover:bg-btn-secondary-hover text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all text-sm font-medium"
                >
                  Refresh Data
                </button>
              </div>
            </div>

            <div className="h-[500px] rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 relative">
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
                                      ${
                                        countryPopulation[code]
                                          ? `<br/><span class="text-xs">Population: ${countryPopulation[code]}</span>`
                                          : ""
                                      }
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

                  {/* Project Markers */}
                  {offsetProjects.map((project) => (
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
                                  <span class="text-xs">${project.offsetAmount}</span>
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
                        {position.zoom > 2 && (
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
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <InfoPanel
            selectedCountry={selectedCountry}
            selectedProject={selectedProject}
          />
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>
            Data sourced from OWID CSV. Hover over countries for quick info,
            click for detailed statistics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarbonEmissionWorldMap;
