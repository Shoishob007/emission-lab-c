"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { MapPin, Leaf, TrendingUp, Info } from "lucide-react";

// World map GeoJSON URL
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const CarbonEmissionWorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const carbonEmissionData = {
    US: 5000,
    CN: 10000,
    IN: 2500,
    RU: 1700,
    JP: 1200,
    DE: 800,
    KR: 700,
    IR: 650,
    CA: 600,
    SA: 550,
    BR: 500,
    MX: 450,
    ID: 600,
    AU: 400,
    GB: 380,
    IT: 350,
    FR: 330,
    PL: 320,
    ZA: 450,
    TH: 280,
    TR: 400,
    UA: 200,
    ES: 280,
    EG: 250,
    AR: 200,
    PK: 220,
    VN: 250,
    MY: 230,
    NG: 150,
    BD: 100,
  };

  // country name to code mappings
  const countryNameToCode = {
    "United States": "US",
    China: "CN",
    India: "IN",
    "Russian Federation": "RU",
    Russia: "RU",
    Japan: "JP",
    Germany: "DE",
    "South Korea": "KR",
    "Korea, Republic of": "KR",
    Iran: "IR",
    "Iran, Islamic Republic of": "IR",
    Canada: "CA",
    "Saudi Arabia": "SA",
    Brazil: "BR",
    Mexico: "MX",
    Indonesia: "ID",
    Australia: "AU",
    "United Kingdom": "GB",
    Italy: "IT",
    France: "FR",
    Poland: "PL",
    "South Africa": "ZA",
    Thailand: "TH",
    Turkey: "TR",
    Ukraine: "UA",
    Spain: "ES",
    Egypt: "EG",
    Argentina: "AR",
    Pakistan: "PK",
    Vietnam: "VN",
    Malaysia: "MY",
    Nigeria: "NG",
    Bangladesh: "BD",
    Iceland: "IS",
    Kenya: "KE",
  };

  // offset project locations
  const offsetProjects = [
    {
      id: 1,
      name: "Amazon Rainforest Conservation",
      country: "Brazil",
      countryCode: "BR",
      lat: -3.4653,
      lng: -62.2159,
      type: "Forest Conservation",
      offsetAmount: "50,000 tons CO₂/year",
      description: "Protecting 10,000 hectares of pristine rainforest",
    },
    {
      id: 2,
      name: "Solar Farm Initiative",
      country: "India",
      countryCode: "IN",
      lat: 20.5937,
      lng: 78.9629,
      type: "Renewable Energy",
      offsetAmount: "30,000 tons CO₂/year",
      description: "Large-scale solar energy generation project",
    },
    {
      id: 3,
      name: "Wind Power Project",
      country: "Germany",
      countryCode: "DE",
      lat: 51.1657,
      lng: 10.4515,
      type: "Renewable Energy",
      offsetAmount: "25,000 tons CO₂/year",
      description: "Offshore wind turbine installation",
    },
    {
      id: 4,
      name: "Reforestation Program",
      country: "Kenya",
      countryCode: "KE",
      lat: -0.0236,
      lng: 37.9062,
      type: "Reforestation",
      offsetAmount: "15,000 tons CO₂/year",
      description: "Planting 1 million trees across degraded lands",
    },
    {
      id: 5,
      name: "Mangrove Restoration",
      country: "Indonesia",
      countryCode: "ID",
      lat: -0.7893,
      lng: 113.9213,
      type: "Coastal Restoration",
      offsetAmount: "20,000 tons CO₂/year",
      description: "Restoring coastal mangrove ecosystems",
    },
    {
      id: 6,
      name: "Geothermal Energy",
      country: "Iceland",
      countryCode: "IS",
      lat: 64.9631,
      lng: -19.0208,
      type: "Renewable Energy",
      offsetAmount: "18,000 tons CO₂/year",
      description: "Harnessing volcanic geothermal power",
    },
    {
      id: 7,
      name: "Clean Cookstove Distribution",
      country: "Nigeria",
      countryCode: "NG",
      lat: 9.082,
      lng: 8.6753,
      type: "Community Project",
      offsetAmount: "12,000 tons CO₂/year",
      description: "Distributing efficient cookstoves to rural communities",
    },
    {
      id: 8,
      name: "Hydroelectric Plant",
      country: "Canada",
      countryCode: "CA",
      lat: 56.1304,
      lng: -106.3468,
      type: "Renewable Energy",
      offsetAmount: "40,000 tons CO₂/year",
      description: "Clean hydroelectric power generation",
    },
  ];

  // Country details
  const countryDetails = {
    US: { name: "United States", population: "331M" },
    CN: { name: "China", population: "1.4B" },
    IN: { name: "India", population: "1.4B" },
    RU: { name: "Russia", population: "144M" },
    JP: { name: "Japan", population: "126M" },
    DE: { name: "Germany", population: "83M" },
    BR: { name: "Brazil", population: "213M" },
    GB: { name: "United Kingdom", population: "67M" },
    FR: { name: "France", population: "67M" },
    IT: { name: "Italy", population: "60M" },
    CA: { name: "Canada", population: "38M" },
    AU: { name: "Australia", population: "26M" },
    KR: { name: "South Korea", population: "52M" },
    ES: { name: "Spain", population: "47M" },
    MX: { name: "Mexico", population: "128M" },
    ID: { name: "Indonesia", population: "274M" },
    SA: { name: "Saudi Arabia", population: "35M" },
    TR: { name: "Turkey", population: "84M" },
    AR: { name: "Argentina", population: "45M" },
    PL: { name: "Poland", population: "38M" },
    ZA: { name: "South Africa", population: "60M" },
    TH: { name: "Thailand", population: "70M" },
    EG: { name: "Egypt", population: "102M" },
    IR: { name: "Iran", population: "84M" },
    VN: { name: "Vietnam", population: "98M" },
    MY: { name: "Malaysia", population: "32M" },
    PK: { name: "Pakistan", population: "221M" },
    NG: { name: "Nigeria", population: "206M" },
    BD: { name: "Bangladesh", population: "165M" },
    UA: { name: "Ukraine", population: "44M" },
    KE: { name: "Kenya", population: "54M" },
    IS: { name: "Iceland", population: "0.4M" },
  };

  const extractCountryCode = (geo) => {
    const props = geo.properties || {};

    const possibleCodes = [
      props.iso_a2,
      props.iso_a3,
      props.isoA2,
      props.isoA3,
      props.ISO_A2,
      props.ISO_A3,
      props.postal,
    ].filter(Boolean);

    const countryName = props.name || props.NAME || "";

    const codeFromName = countryNameToCode[countryName];

    return {
      code: possibleCodes[0] || codeFromName || null,
      name: countryName,
    };
  };

  const getEmissionForGeo = (geo) => {
    const { code } = extractCountryCode(geo);

    if (code && carbonEmissionData[code]) {
      return carbonEmissionData[code];
    }

    if (code) {
      const normalizedCode = code.toUpperCase();
      if (carbonEmissionData[normalizedCode]) {
        return carbonEmissionData[normalizedCode];
      }
    }

    return null;
  };

  const getCountryDetailsByGeo = (geo) => {
    const { code, name } = extractCountryCode(geo);

    if (code && countryDetails[code]) {
      return countryDetails[code];
    }

    if (code) {
      const normalizedCode = code.toUpperCase();
      if (countryDetails[normalizedCode]) {
        return countryDetails[normalizedCode];
      }
    }

    if (name) {
      return {
        name: name,
        population: "N/A",
      };
    }

    return null;
  };

  const getColorForEmission = (emission) => {
    if (emission === null || emission === undefined) {
      return "#e5e7eb";
    }

    if (emission < 1000) return "#fef3c7";
    if (emission < 2000) return "#fbbf24";
    if (emission < 3500) return "#f59e0b";
    if (emission < 6000) return "#dc2626";
    return "#991b1b";
  };

  const handleMoveEnd = (pos) => {
    setPosition(pos);
  };

  const handleRegionClick = (geo) => {
    const emission = getEmissionForGeo(geo);
    const country = getCountryDetailsByGeo(geo);

    if (country && emission !== null) {
      const { code } = extractCountryCode(geo);
      setSelectedCountry({
        code: code || "N/A",
        name: country.name,
        emission,
        population: country.population,
      });
      setSelectedProject(null);
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setSelectedCountry(null);
  };

  const handleResetView = () => {
    setPosition({ coordinates: [0, 0], zoom: 1 });
    setSelectedCountry(null);
    setSelectedProject(null);
  };

  if (!isClient) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Global Carbon Emission Map
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Visualizing worldwide carbon emissions and offset projects
          </p>
        </div>

        {/* Legend */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-orange-500" size={20} />
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                Carbon Emissions (million tons):
              </span>
              <div className="flex items-center gap-1 ml-2">
                <div className="w-6 h-4 bg-yellow-100 border border-gray-300 rounded"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {"<1,000"}
                </span>
                <div className="w-6 h-4 bg-yellow-400 border border-gray-300 rounded ml-2"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  1,000-2,000
                </span>
                <div className="w-6 h-4 bg-orange-500 border border-gray-300 rounded ml-2"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  2,000-3,500
                </span>
                <div className="w-6 h-4 bg-red-600 border border-gray-300 rounded ml-2"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  3,500-6,000
                </span>
                <div className="w-6 h-4 bg-red-900 border border-gray-300 rounded ml-2"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                  {">6,000"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <Leaf className="inline mr-1" size={16} />
                Offset Projects
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Map */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Interactive World Map
              </h3>
              <button
                onClick={handleResetView}
                className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all text-sm font-medium"
              >
                Reset View
              </button>
            </div>

            <div className="h-[600px] rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
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
                        const emission = getEmissionForGeo(geo);
                        const fillColor = getColorForEmission(emission);
                        const country = getCountryDetailsByGeo(geo);
                        const { name } = extractCountryCode(geo);

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
                                if (emission !== null && country) {
                                  tooltip.innerHTML = `
                                    <strong>${country.name}</strong><br/>
                                    CO₂: ${emission.toLocaleString()} million tons<br/>
                                    ${
                                      country.population !== "N/A"
                                        ? `Population: ${country.population}`
                                        : ""
                                    }
                                  `;
                                } else {
                                  tooltip.innerHTML = `
                                    <strong>${
                                      name || "Unknown Country"
                                    }</strong><br/>
                                    No emission data available
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
                                <strong>${project.name}</strong><br/>
                                <em>${project.type}</em><br/>
                                ${project.offsetAmount}
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
            </div>

            {/* Tooltips */}
            <div
              id="country-tooltip"
              className="fixed hidden bg-black/90 text-white text-xs p-2 rounded-md pointer-events-none z-50 max-w-xs"
              style={{ display: "none" }}
            />
            <div
              id="project-tooltip"
              className="fixed hidden bg-green-600/95 text-white text-xs p-2 rounded-md pointer-events-none z-50 max-w-xs"
              style={{ display: "none" }}
            />
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-1">
            {/* Selected Country Info */}
            {selectedCountry ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 border-l-4 border-orange-500 h-full">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedCountry.name}
                  </h3>
                  <Info className="text-orange-500" size={28} />
                </div>
                <div className="space-y-6">
                  <div className="bg-orange-50 dark:bg-gray-900 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Annual CO₂ Emissions
                    </p>
                    <p className="text-3xl font-bold text-orange-600">
                      {selectedCountry.emission.toLocaleString()} million tons
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-gray-900 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Population
                    </p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {selectedCountry.population}
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-gray-900 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Per Capita Emission
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {(
                        selectedCountry.emission /
                        parseFloat(
                          selectedCountry.population.replace(/[^\d.]/g, "")
                        )
                      ).toFixed(2)}{" "}
                      tons/person
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Click on other countries or project markers to view
                      different data
                    </p>
                  </div>
                </div>
              </div>
            ) : selectedProject ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 border-l-4 border-green-500 h-full">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedProject.name}
                  </h3>
                  <MapPin className="text-green-500" size={28} />
                </div>
                <div className="space-y-6">
                  <div className="bg-green-50 dark:bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Project Location
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedProject.country}
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-gray-900 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Project Type
                    </p>
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {selectedProject.type}
                    </p>
                  </div>

                  <div className="bg-emerald-50 dark:bg-gray-900 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Annual Carbon Offset
                    </p>
                    <p className="text-3xl font-bold text-emerald-600">
                      {selectedProject.offsetAmount}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Project Description
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Click on other countries or project markers to view
                      different data
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-lg shadow-2xl p-6 text-white h-full flex flex-col justify-center">
                <div className="text-center">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold mb-4">
                      Interactive Map Guide
                    </h3>
                    <p className="text-blue-100 mb-8">
                      Select a country or project to view details
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-white/20 p-3 rounded-full">
                        <TrendingUp size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">
                          Explore Countries
                        </h4>
                        <p className="text-sm opacity-90">
                          Click on any colored country to view carbon emission
                          statistics
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-white/20 p-3 rounded-full">
                        <Leaf size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">
                          Discover Projects
                        </h4>
                        <p className="text-sm opacity-90">
                          Click on green markers to learn about carbon offset
                          projects
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-white/20 p-3 rounded-full">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">
                          Hover for Info
                        </h4>
                        <p className="text-sm opacity-90">
                          Hover over countries or project markers for quick
                          information
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/20">
                      <p className="text-sm opacity-80">
                        <span className="font-bold">Tip:</span> Use mouse wheel
                        to zoom and drag to pan around the map
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Countries with Data
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {Object.keys(carbonEmissionData).length}
                </p>
              </div>
              <TrendingUp className="text-blue-500" size={40} />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Active Offset Projects
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {offsetProjects.length}
                </p>
              </div>
              <Leaf className="text-green-500" size={40} />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Global Emissions
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {(
                    Object.values(carbonEmissionData).reduce(
                      (a, b) => a + b,
                      0
                    ) / 1000
                  ).toFixed(1)}
                  B tons
                </p>
              </div>
              <Info className="text-orange-500" size={40} />
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>
            Data is for demonstration purposes. Hover over countries and click
            for detailed information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarbonEmissionWorldMap;