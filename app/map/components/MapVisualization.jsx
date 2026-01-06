/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { geoUrl } from "../../data";
import { useMapLogic } from "../hooks/useMapLogic";

const MapVisualization = ({
  position,
  carbonData,
  stats,
  projectsWithCoords,
  isGeocoding,
  projectsLoading,
  handleMoveEnd,
  onCountrySelect,
  onProjectSelect
}) => {
  const {
    extractCountryCode,
    getEmissionForCountry,
    getColorForEmission,
    handleRegionClick
  } = useMapLogic(
    carbonData, 
    stats, 
    onCountrySelect
  );

  // State for active filter
  const [activeFilter, setActiveFilter] = useState(null);

  // population for tooltip
  const formatPopulation = (rawData) => {
    if (!rawData || !rawData.population) return "N/A";
    const pop = parseFloat(rawData.population);
    if (pop >= 1000000) {
      return `${(pop / 1000000).toFixed(2)}M`;
    }
    return `${pop.toFixed(0)}`;
  };

  // emission levels based on share_global_co2 percentage
  const emissionLevels = [
    { 
      id: 'low', 
      label: 'Low', 
      color: '#fef3c7',
      minShare: 0.0001,
      maxShare: 0.03,
    },
    { 
      id: 'moderate', 
      label: 'Moderate', 
      color: '#fbbf24',
      minShare: 0.0300001,
      maxShare: 0.3,
    },
    { 
      id: 'high', 
      label: 'High', 
      color: '#f59e0b',
      minShare: 0.300001,
      maxShare: 3,
    },
    { 
      id: 'very-high', 
      label: 'Very High', 
      color: '#dc2626',
      minShare: 3.00001,
      maxShare: 10,
    },
    { 
      id: 'extreme', 
      label: 'Extreme', 
      color: '#7f1d1d',
      minShare: 10,
      maxShare: 100,
    },
    { 
      id: 'no-data', 
      label: 'No data', 
      color: '#e5e7eb',
      borderColor: '#000000',
    }
  ];

  //  global share for each country
  const globalShares = useMemo(() => {
    if (!carbonData) return {};

    const shares = {};
    Object.entries(carbonData).forEach(([code, country]) => {
      const rawData = country.rawData || {};
      const shareStr = rawData.share_global_co2;
      
      if (shareStr && shareStr !== '') {
        const share = parseFloat(shareStr);
        if (!isNaN(share)) {
          shares[code] = share;
        }
      }
    });

    return shares;
  }, [carbonData]);

  // Filter countries based on active filter using global share
  const filteredCountries = useMemo(() => {
    if (!activeFilter || !carbonData) {
      return null; // No filter applied
    }

    const level = emissionLevels.find(l => l.id === activeFilter);
    if (!level) return null;

    const filtered = {};
    
    Object.entries(carbonData).forEach(([code, country]) => {
      const share = globalShares[code];
      
      if (level.id === 'no-data') {
        // Show countries with no data or invalid share
        if (share == null || isNaN(share)) {
          filtered[code] = country;
        }
      } else {
        // Show countries within the share range
        if (share != null && !isNaN(share)) {
          if (share >= level.minShare && share < level.maxShare) {
            filtered[code] = country;
          } else if (level.id === 'extreme' && share >= level.minShare) {
            // Extreme includes 10% and above
            filtered[code] = country;
          }
        }
      }
    });

    return filtered;
  }, [activeFilter, carbonData, globalShares, emissionLevels]);

  // Get emission level for a country based on global share
  const getEmissionLevel = (share) => {
    if (share == null || isNaN(share)) return 'no-data';
    
    for (const level of emissionLevels) {
      if (level.id === 'no-data') continue;
      
      if (level.id === 'extreme') {
        if (share >= level.minShare) return level.id;
      } else if (share >= level.minShare && share < level.maxShare) {
        return level.id;
      }
    }
    
    return 'no-data';
  };

  // Handle legend item click
  const handleLegendClick = (levelId) => {
    if (activeFilter === levelId) {
      setActiveFilter(null); // Deselect if already active
    } else {
      setActiveFilter(levelId); // Select new filter
    }
  };

  // Get countries to display
  const countriesToDisplay = filteredCountries || carbonData;

  // Get color for country with filter consideration
  const getCountryColor = (code, emission, share) => {
    if (emission == null || isNaN(emission)) {
      // For no data countries
      const level = emissionLevels.find(l => l.id === 'no-data');
      if (activeFilter === 'no-data') {
        return level.color;
      }
      return level.color; // Always show no-data countries with their color
    }

    const levelId = getEmissionLevel(share);
    const level = emissionLevels.find(l => l.id === levelId);
    
    if (activeFilter) {
      if (levelId === activeFilter) {
        return level?.color || "#e5e7eb";
      } else if (activeFilter === 'no-data') {
        // If filtering for no-data, show other countries grayed out
        return "#d1d5db";
      } else {
        return "#d1d5db"; // Gray out non-matching countries
      }
    }
    
    return getColorForEmission(emission);
  };

  // Get border style for country
  const getCountryBorderStyle = (code, share) => {
    if (activeFilter === 'no-data') {
      const shareValue = globalShares[code];
      if (shareValue == null || isNaN(shareValue)) {
        const level = emissionLevels.find(l => l.id === 'no-data');
        return {
          stroke: level.borderColor,
          strokeWidth: 2,
        };
      }
    }
    
    return {
      stroke: "#FFF",
      strokeWidth: 0.5,
    };
  };

  // Format emission for display
  const formatEmission = (emission) => {
    if (emission == null || isNaN(emission)) return "No data";
    return emission.toLocaleString("en-US", {
      maximumFractionDigits: 1,
    });
  };

  // Format share for display
  const formatShare = (share) => {
    if (share == null || isNaN(share)) return "N/A";
    return share.toFixed(3);
  };

  return (
    <>
      {/* Map Container */}
      <div className="h-[450px] rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 relative">
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
                  const countryData = countriesToDisplay?.[code];
                  const emission = countryData?.latestEmission;
                  const share = globalShares[code];
                  const fillColor = getCountryColor(code, emission, share);
                  const borderStyle = getCountryBorderStyle(code, share);
                  const population = countryData?.rawData ? formatPopulation(countryData.rawData) : "N/A";
                  const formattedEmission = formatEmission(emission);
                  const formattedShare = formatShare(share);
                  
                  const isDisabled = activeFilter && countryData && (
                    (emission == null || isNaN(emission) || share == null || isNaN(share)) 
                      ? activeFilter !== 'no-data'
                      : getEmissionLevel(share) !== activeFilter
                  );

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fillColor}
                      {...borderStyle}
                      style={{
                        default: {
                          outline: "none",
                          cursor: emission !== null && !isDisabled ? "pointer" : "default",
                          opacity: isDisabled ? 0.3 : 1,
                        },
                        hover: {
                          fill: fillColor,
                          stroke: isDisabled ? "#999" : borderStyle.stroke,
                          strokeWidth: isDisabled ? 0.5 : borderStyle.strokeWidth,
                          outline: "none",
                          cursor: emission !== null && !isDisabled ? "pointer" : "default",
                          opacity: isDisabled ? 0.3 : 1,
                        },
                        pressed: {
                          fill: fillColor,
                          stroke: isDisabled ? "#999" : borderStyle.stroke,
                          strokeWidth: isDisabled ? 0.5 : borderStyle.strokeWidth,
                          outline: "none",
                          opacity: isDisabled ? 0.3 : 1,
                        },
                      }}
                      onClick={() => !isDisabled && emission !== null && handleRegionClick(geo)}
                      onMouseEnter={() => {
                        const tooltip = document.getElementById("country-tooltip");
                        if (tooltip) {
                          tooltip.style.display = "block";
                          if (emission !== null && !isDisabled) {
                            const level = emissionLevels.find(l => l.id === getEmissionLevel(share));
                            tooltip.innerHTML = `
                              <div class="p-2">
                                <strong class="text-sm">${name}</strong><br/>
                                <span class="text-xs">CO₂: ${formattedEmission} MtCO₂e</span>
                                ${share != null ? `<br/><span class="text-xs">Global Share: ${formattedShare}%</span>` : ''}
                                <br/><span class="text-xs">Population: ${population}</span>
                                ${level ? `<br/><span class="text-xs">Level: ${level.label}</span>` : ''}
                              </div>
                            `;
                          } else if (isDisabled) {
                            tooltip.innerHTML = `
                              <div class="p-2">
                                <strong class="text-sm text-gray-500">${name}</strong><br/>
                                <span class="text-xs text-gray-500">Not in current filter</span>
                                <br/><span class="text-xs text-gray-400">Click on legend to change filter</span>
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
                        const tooltip = document.getElementById("country-tooltip");
                        if (tooltip) {
                          tooltip.style.display = "none";
                        }
                      }}
                      onMouseMove={(event) => {
                        const tooltip = document.getElementById("country-tooltip");
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

            {/* Project Markers - Only show if not filtered out */}
            {!activeFilter && projectsWithCoords.map((project) => (
              <Marker
                key={project.id}
                coordinates={[project.lng, project.lat]}
                onClick={() => onProjectSelect(project)}
              >
                <g>
                  <circle
                    r={6}
                    fill="#10B981"
                    stroke="#FFF"
                    strokeWidth={2}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={(event) => {
                      const tooltip = document.getElementById("project-tooltip");
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
                      const tooltip = document.getElementById("project-tooltip");
                      if (tooltip) {
                        tooltip.style.display = "none";
                      }
                    }}
                    onMouseMove={(event) => {
                      const tooltip = document.getElementById("project-tooltip");
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
        </div>

        {/* Active Filter Indicator */}
        {activeFilter && (
          <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: emissionLevels.find(l => l.id === activeFilter)?.color }}
              />
              <div>
                <span className="text-xs font-medium">
                  Showing: {emissionLevels.find(l => l.id === activeFilter)?.label}
                </span>
              </div>
              <button
                onClick={() => setActiveFilter(null)}
                className="ml-2 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕ Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Legend Section */}
      <div className="mt-4 mb-4">
        <div className="mb-3">
          <div className="flex flex-wrap justify-center gap-2">
            {emissionLevels.map(level => (
              <button
                key={level.id}
                onClick={() => handleLegendClick(level.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                  activeFilter === level.id
                    ? 'ring-2 ring-offset-2 ring-gray-500 shadow-lg scale-105'
                    : 'hover:shadow-md hover:scale-102'
                }`}
                style={{
                  backgroundColor: activeFilter === level.id ? level.color + '40' : 'transparent',
                  border: `1px solid ${level.id === 'no-data' ? level.borderColor : level.color}60`,
                }}
                title={level.description}
              >
                <div 
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ 
                    backgroundColor: level.color,
                    borderColor: level.id === 'no-data' ? level.borderColor : 'inherit'
                  }}
                />
                <span className="text-xs font-medium whitespace-nowrap">
                  {level.label}
                </span>
                {/* {activeFilter === level.id && (
                  <span className="text-xs text-blue-600 font-bold">✓</span>
                )} */}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="text-center text-gray-600 dark:text-gray-400 text-sm mt-4">        
        {/* Data Source Information */}
        <div className="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
          <p>
            <span className="font-medium">Carbon Emissions Data Source:</span>{" "}
            <a 
              href="https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.csv" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Our World in Data (OWID) CO₂ Dataset
            </a>
          </p>
          <p className="mt-1">
            This dataset provides comprehensive CO₂ and greenhouse gas emissions data, covering population, GDP, energy consumption, 
            and emissions by fuel type for all countries.
          </p>
        </div>
      </div>
    </>
  );
};

export default MapVisualization;