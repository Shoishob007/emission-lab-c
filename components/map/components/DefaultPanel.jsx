/* eslint-disable react-hooks/exhaustive-deps */
import ReactCountryFlag from "react-country-flag";
import { iso3ToIso2 } from "../utils/iso3_To_iso2";
import { useState, useEffect } from "react";

export const DefaultInfoPanel = () => {
  const [animatedPercentages, setAnimatedPercentages] = useState([
    0, 0, 0, 0, 0,
  ]);

  // Static data for carbon capture
  const carbonCaptureData = [
    { country: "United States", code: "USA", percentage: 40 },
    { country: "Brazil", code: "BRA", percentage: 19.3 },
    { country: "Canada", code: "CAN", percentage: 7.3 },
    { country: "Australia", code: "AUS", percentage: 7.3 },
    { country: "China", code: "CHN", percentage: 6.4 },
  ];

  // Static data for renewable energy
  const renewableEnergyData = [
    { country: "Denmark", code: "DNK", wind: 58, solar: 11, total: 69 },
    { country: "Djibouti", code: "DJI", wind: 67, solar: 0, total: 67 },
    { country: "Lithuania", code: "LTU", wind: 45, solar: 18, total: 63 },
    { country: "Netherlands", code: "NLD", wind: 27, solar: 18, total: 45 },
    { country: "Germany", code: "DEU", wind: 28, solar: 15, total: 43 },
    { country: "Portugal", code: "PRT", wind: 29, solar: 14, total: 43 },
    { country: "Spain", code: "ESP", wind: 22, solar: 20, total: 42 },
    { country: "Ireland", code: "IRL", wind: 37, solar: 4, total: 41 },
    { country: "Greece", code: "GRC", wind: 21, solar: 18, total: 39 },
    { country: "Mauritania", code: "MRT", wind: 26, solar: 11, total: 37 },
  ];

  const captureColor = "#2EB82E";
  const windColor = "#2563EB";
  const solarColor = "#C6D8C6";

  useEffect(() => {
    const duration = 1000;
    const steps = 40;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedPercentages(
        carbonCaptureData.map((item) => item.percentage * progress)
      );

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedPercentages(
          carbonCaptureData.map((item) => item.percentage)
        );
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 text-white h-full overflow-y-auto bg-white">
      <div className="space-y-4">
        {/* Carbon Capture Share – Compact Infographic */}
        <div className="rounded-lg p-3 flex flex-col">
          <h4 className="text-sm font-semibold mb-4 text-center text-gray-700">
            Countries that are actively removing <br /> CO₂ from the atmosphere
          </h4>

          <div className="flex-1 space-y-3">
            {carbonCaptureData.map((item, index) => (
              <div
                key={item.country}
                className="flex items-center gap-2 rounded-md px-2 py-2 border border-[#145A46]"
              >
                {/* Flag */}
                <ReactCountryFlag
                  svg
                  style={{ width: "1.5em", height: "1.2em" }}
                  countryCode={iso3ToIso2(item.code)}
                />

                {/* Country name */}
                <span className="text-sm text-gray-700 truncate w-20">
                  {item.country}
                </span>

                {/* Progress bar */}
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${animatedPercentages[index]}%`,
                      backgroundColor: captureColor,
                    }}
                  />
                </div>

                {/* Percentage */}
                <span className="text-sm font-semibold text-gray-700 text-right">
                  {animatedPercentages[index].toFixed(1)}%
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-center text-gray-600 mt-3">
            % of Carbon capture share
          </p>
        </div>

        {/* Renewable Energy Bar Chart */}
        <div className="rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-4 text-center text-gray-700">
            Countries powering Electricity by <br /> Wind & Solar energy
          </h4>

          <div className="relative">
            <svg viewBox="0 0 420 390" className="w-full h-full">
              {(() => {
                const baseline = 280;
                const chartTop = 20;
                const chartHeight = 265;
                return null;
              })()}

              {/* Axes */}
              <line
                x1="40"
                y1="20"
                x2="40"
                y2="280"
                stroke="#4B5563"
                strokeWidth="2"
              />
              <line
                x1="40"
                y1="280"
                x2="400"
                y2="280"
                stroke="#4B5563"
                strokeWidth="2"
              />

              {/* Grid + Y labels */}
              {[0, 10, 20, 30, 40, 50, 60, 70, 80].map((val) => {
                const baseline = 280;
                const chartHeight = 265;
                const y = baseline - (val / 80) * chartHeight;

                return (
                  <g key={val}>
                    <line
                      x1="40"
                      y1={y}
                      x2="400"
                      y2={y}
                      stroke="#E5E7EB"
                      strokeWidth="1"
                    />
                    <text
                      x="30"
                      y={y + 4}
                      fill="#374151"
                      fontSize="12"
                      textAnchor="end"
                    >
                      {val}%
                    </text>
                  </g>
                );
              })}

              {/* Bars */}
              {renewableEnergyData.map((item, index) => {
                const barWidth = 28;
                const spacing = 36;
                const x = 55 + index * spacing;

                const baseline = 280;
                const chartHeight = 265;

                const windHeight = (item.wind / 80) * chartHeight;
                const solarHeight = (item.solar / 80) * chartHeight;

                const windY = baseline - windHeight;
                const solarY = windY - solarHeight;

                return (
                  <g key={item.country}>
                    {/* Wind bar */}
                    <rect
                      x={x}
                      y={windY}
                      width={barWidth}
                      height={windHeight}
                      fill={windColor}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onMouseEnter={(e) => {
                        const tooltip =
                          document.getElementById("country-tooltip");
                        if (!tooltip) return;
                        const rect = e.target.getBoundingClientRect();
                        tooltip.innerHTML = `
                  <div class="p-2">
                    <div class="font-semibold mb-1">${item.country}</div>
                    <div class="flex items-center mb-1">
                      <div class="w-3 h-3 rounded-sm mr-2" style="background:${windColor}"></div>
                      <span>Wind: ${item.wind}%</span>
                    </div>
                    <div class="flex items-center mb-1">
                      <div class="w-3 h-3 rounded-sm mr-2" style="background:${solarColor}"></div>
                      <span>Solar: ${item.solar}%</span>
                    </div>
                    <div class="pt-1 border-t border-gray-700 mt-1">
                      Total: <span class="font-semibold">${item.total}%</span>
                    </div>
                  </div>
                `;
                        tooltip.style.left = `${rect.left + rect.width / 2}px`;
                        tooltip.style.top = `${
                          rect.top - tooltip.offsetHeight - 10
                        }px`;
                        tooltip.style.transform = "translateX(-50%)";
                        tooltip.style.display = "block";
                      }}
                      onMouseLeave={() => {
                        const tooltip =
                          document.getElementById("country-tooltip");
                        if (tooltip) tooltip.style.display = "none";
                      }}
                    >
                      <animate
                        attributeName="height"
                        from="0"
                        to={windHeight}
                        dur="0.8s"
                        fill="freeze"
                      />
                      <animate
                        attributeName="y"
                        from={baseline}
                        to={windY}
                        dur="0.8s"
                        fill="freeze"
                      />
                    </rect>

                    {/* Solar bar */}
                    {item.solar > 0 && (
                      <rect
                        x={x}
                        y={solarY}
                        width={barWidth}
                        height={solarHeight}
                        fill={solarColor}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseEnter={(e) => {
                          const tooltip =
                            document.getElementById("country-tooltip");
                          if (!tooltip) return;
                          const rect = e.target.getBoundingClientRect();
                          tooltip.innerHTML = `
                    <div class="p-2">
                      <div class="font-semibold mb-1">${item.country}</div>
                      <div class="flex items-center mb-1">
                        <div class="w-3 h-3 rounded-sm mr-2" style="background:${windColor}"></div>
                        <span>Wind: ${item.wind}%</span>
                      </div>
                      <div class="flex items-center mb-1">
                        <div class="w-3 h-3 rounded-sm mr-2" style="background:${solarColor}"></div>
                        <span>Solar: ${item.solar}%</span>
                      </div>
                      <div class="pt-1 border-t border-gray-700 mt-1">
                        Total: <span class="font-semibold">${item.total}%</span>
                      </div>
                    </div>
                  `;
                          tooltip.style.left = `${
                            rect.left + rect.width / 2
                          }px`;
                          tooltip.style.top = `${
                            rect.top - tooltip.offsetHeight - 10
                          }px`;
                          tooltip.style.transform = "translateX(-50%)";
                          tooltip.style.display = "block";
                        }}
                        onMouseLeave={() => {
                          const tooltip =
                            document.getElementById("country-tooltip");
                          if (tooltip) tooltip.style.display = "none";
                        }}
                      >
                        <animate
                          attributeName="height"
                          from="0"
                          to={solarHeight}
                          dur="0.6s"
                          begin="0.8s"
                          fill="freeze"
                        />
                        <animate
                          attributeName="y"
                          from={windY}
                          to={solarY}
                          dur="0.6s"
                          begin="0.8s"
                          fill="freeze"
                        />
                      </rect>
                    )}

                    {/* Country label */}
                    <text
                      x={x + barWidth / 2}
                      y="305"
                      fill="#374151"
                      fontSize="10"
                      textAnchor="middle"
                      transform={`rotate(45, ${x + barWidth / 2}, 305)`}
                    >
                      {item.country}
                    </text>
                  </g>
                );
              })}

              {/* Legend */}
              <g transform="translate(140, 330)">
                <rect
                  x="0"
                  y="0"
                  width="16"
                  height="16"
                  fill={windColor}
                  rx="2"
                />
                <text
                  x="20"
                  y="13"
                  fill="#374151"
                  fontSize="12"
                  fontWeight="500"
                >
                  Wind (%)
                </text>

                <rect
                  x="90"
                  y="0"
                  width="16"
                  height="16"
                  fill={solarColor}
                  rx="2"
                />
                <text
                  x="110"
                  y="13"
                  fill="#374151"
                  fontSize="12"
                  fontWeight="500"
                >
                  Solar (%)
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
