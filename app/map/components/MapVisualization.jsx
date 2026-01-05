import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { geoUrl } from "../data";
import { useMapLogic } from "../hooks/useMapLogic";

const MapVisualization = ({
  position,
  carbonData,
  stats,
  selectedYear,
  availableYears,
  projectsWithCoords,
  isGeocoding,
  projectsLoading,
  handleMoveEnd,
  handleResetView,
  fetchCarbonData,
  fetchProjects,
  setSelectedYear,
  getCountryPopulation,
  getPopulationAsNumber, // Add this prop
  onCountrySelect,
  onProjectSelect,
}) => {
  const {
    combinedMapping,
    extractCountryCode,
    getEmissionForCountry,
    getColorForEmission,
    handleRegionClick,
  } = useMapLogic(
    carbonData,
    stats,
    onCountrySelect,
    getCountryPopulation,
    getPopulationAsNumber // Pass it here
  );

  return (
    <>
      <div className="flex justify-between items-center">
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
                          cursor: emission !== null ? "pointer" : "default",
                        },
                        hover: {
                          fill: fillColor,
                          stroke: "#000",
                          strokeWidth: 1.5,
                          outline: "none",
                          cursor: emission !== null ? "pointer" : "default",
                        },
                        pressed: {
                          fill: fillColor,
                          stroke: "#000",
                          strokeWidth: 2,
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

            {/* Project Markers */}
            {projectsWithCoords.map((project) => (
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
        </div>
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
    </>
  );
};

export default MapVisualization;
