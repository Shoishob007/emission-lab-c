import ReactCountryFlag from "react-country-flag";
import { Globe, Award, TrendingUp } from "lucide-react";

export const DefaultInfoPanel = ({ stats }) => {
  // Use dynamic data from stats or fallback to empty array
  const emissionData = stats?.topEmitters?.slice(0, 5).map(emitter => ({
    country: emitter.name,
    emissions: emitter.emission / 1000, // Convert to billions
    percentage: ((emitter.emission / stats.totalEmissions) * 100).toFixed(2)
  })) || [];

  const colors = ["#EF4444", "#F59E0B", "#2563EB", "#8B5CF6", "#10B981"];

  // Calculate max emission for bar chart scaling
  const maxEmission = emissionData.length > 0 
    ? Math.max(...emissionData.map(d => d.emissions)) 
    : 15;
  const chartMax = Math.ceil(maxEmission * 1.2);

  if (!stats || !stats.topEmitters || stats.topEmitters.length === 0) {
    return (
      <div className="bg-[#0A2D23] shadow-2xl p-4 text-white h-full overflow-y-auto flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">No emission data available</p>
          <p className="text-xs text-gray-500 mt-2">Select a country to view details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A2D23] shadow-2xl p-4 text-white h-full overflow-y-auto">
      <div className="space-y-4">
        {/* 3D Pie Chart */}
        {/* <div className="bg-[#0F3A2E] rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-4 text-center">
            Top 5 CO₂ emissions (by country)
          </h4>
          <svg viewBox="0 0 240 200" className="w-full h-48">
            <defs>
              {colors.map((color, idx) => (
                <linearGradient
                  key={`grad-${idx}`}
                  id={`gradient-${idx}`}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: color, stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: color, stopOpacity: 0.6 }}
                  />
                </linearGradient>
              ))}
            </defs>

            {emissionData.map((item, index) => {
              const startAngle = emissionData
                .slice(0, index)
                .reduce((sum, e) => sum + parseFloat(e.percentage) * 3.6, 0);
              const angle = parseFloat(item.percentage) * 3.6;

              const startRad = (startAngle - 90) * (Math.PI / 180);
              const endRad = (startAngle + angle - 90) * (Math.PI / 180);

              const x1 = 120 + 80 * Math.cos(startRad);
              const y1 = 95 + 80 * Math.sin(startRad);
              const x2 = 120 + 80 * Math.cos(endRad);
              const y2 = 95 + 80 * Math.sin(endRad);

              const largeArc = angle > 180 ? 1 : 0;

              const midAngle = startAngle + angle / 2;
              const midRad = (midAngle - 90) * (Math.PI / 180);
              const labelX = 120 + 55 * Math.cos(midRad);
              const labelY = 95 + 55 * Math.sin(midRad);

              return (
                <g key={item.country}>
                  <path
                    d={`M 120 95 L ${x1} ${y1} L ${x1} ${y1 + 15} L 120 110 Z`}
                    fill={colors[index]}
                    opacity="0.4"
                  />
                  <path
                    d={`M 120 95 L ${x2} ${y2} L ${x2} ${y2 + 15} L 120 110 Z`}
                    fill={colors[index]}
                    opacity="0.4"
                  />
                  <path
                    d={`M ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} L ${x2} ${
                      y2 + 15
                    } A 80 80 0 ${largeArc} 0 ${x1} ${y1 + 15} Z`}
                    fill={colors[index]}
                    opacity="0.5"
                  />

                  <path
                    d={`M 120 95 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={`url(#gradient-${index})`}
                    stroke="#0A2D23"
                    strokeWidth="2"
                  />

                  <text
                    x={labelX}
                    y={labelY}
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {item.percentage}%
                  </text>
                </g>
              );
            })}

            <circle cx="120" cy="95" r="35" fill="#0A2D23" />
          </svg>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {emissionData.map((item, index) => (
              <div key={item.country} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: colors[index] }}
                />
                <span className="text-xs text-gray-300 truncate">
                  {item.country}
                </span>
              </div>
            ))}
          </div>
        </div> */}

        {/* Global Emission Share – Compact Infographic */}
<div className="bg-[#0F3A2E] rounded-lg p-3 flex flex-col">
          <h4 className="text-sm font-semibold mb-4 text-center">
    Global CO₂ Emission Share
  </h4>

  <div className="flex-1 space-y-3">
    {emissionData.map((item, index) => (
      <div
        key={item.country}
        className="flex items-center gap-2 bg-[#0A2D23] rounded-md px-2 py-2 border border-[#145A46]"
      >
        {/* Flag */}
        <ReactCountryFlag
          svg
          style={{ width: "1.5em", height: "1.2em" }}
          countryCode={
            item.country === "United States"
              ? "US"
              : item.country === "China"
              ? "CN"
              : item.country === "India"
              ? "IN"
              : item.country === "Russia"
              ? "RU"
              : item.country === "Japan"
              ? "JP"
              : "UN"
          }
        />

        {/* Country name */}
        <span className="text-sm text-gray-200 truncate w-20">
          {item.country}
        </span>

        {/* Progress bar */}
        <div className="flex-1 h-1.5 bg-[#123F32] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${item.percentage}%`,
              backgroundColor: colors[index],
            }}
          />
        </div>

        {/* Percentage */}
        <span className="text-sm font-semibold text-white text-right">
          {item.percentage}%
        </span>
      </div>
    ))}
      <div className="mt-1 text-[10px] text-gray-400 text-center">
    Share of global emissions (Top 5)
  </div>
  </div>

  {/* Footer */}

</div>


        {/* 3D Bar Chart */}
        <div className="bg-[#0F3A2E] rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-4 text-center">
            Top 5 CO₂ emissions (billion tons)
          </h4>

          <div className="relative h-48">
            <svg viewBox="0 0 400 220" className="w-full h-full">
              {/* Y-axis labels and grid lines */}
              <line
                x1="40"
                y1="20"
                x2="40"
                y2="180"
                stroke="#4B5563"
                strokeWidth="2"
              />
              <line
                x1="40"
                y1="180"
                x2="380"
                y2="180"
                stroke="#4B5563"
                strokeWidth="2"
              />

              {/* Grid lines - dynamic based on max value */}
              {Array.from({ length: 6 }, (_, i) => {
                const val = (chartMax / 5) * i;
                const y = 180 - (val / chartMax) * 160;
                return (
                  <g key={val}>
                    <line
                      x1="40"
                      y1={y}
                      x2="380"
                      y2={y}
                      stroke="#374151"
                      strokeWidth="1"
                      strokeDasharray="4"
                    />
                    <text
                      x="30"
                      y={y + 5}
                      fill="#9CA3AF"
                      fontSize="10"
                      textAnchor="end"
                    >
                      {val.toFixed(1)}
                    </text>
                  </g>
                );
              })}

              {/* 3D Bars */}
              {emissionData.map((item, index) => {
                const barWidth = 50;
                const spacing = 60;
                const x = 60 + index * spacing;
                const maxHeight = 160;
                const barHeight = (item.emissions / chartMax) * maxHeight;
                const y = 180 - barHeight;

                return (
                  <g key={item.country}>
                    {/* 3D side (right face) */}
                    <path
                      d={`M ${x + barWidth} ${y} L ${x + barWidth + 8} ${
                        y - 8
                      } L ${x + barWidth + 8} ${172} L ${
                        x + barWidth
                      } ${180} Z`}
                      fill={colors[index]}
                      opacity="0.5"
                    />

                    {/* 3D top */}
                    <path
                      d={`M ${x} ${y} L ${x + 8} ${y - 8} L ${
                        x + barWidth + 8
                      } ${y - 8} L ${x + barWidth} ${y} Z`}
                      fill={colors[index]}
                      opacity="0.8"
                    />

                    {/* Front face with gradient */}
                    <defs>
                      <linearGradient
                        id={`barGrad-${index}`}
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: colors[index], stopOpacity: 1 }}
                        />
                        <stop
                          offset="100%"
                          style={{ stopColor: colors[index], stopOpacity: 0.7 }}
                        />
                      </linearGradient>
                    </defs>
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      fill={`url(#barGrad-${index})`}
                      stroke="#0A2D23"
                      strokeWidth="1"
                    />

                    {/* Value label on top */}
                    <text
                      x={x + barWidth / 2}
                      y={y - 15}
                      fill="white"
                      fontSize="11"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {item.emissions.toFixed(2)}
                    </text>

                    {/* Country label */}
                    <text
                      x={x + barWidth / 2}
                      y="195"
                      fill="#9CA3AF"
                      fontSize="9"
                      textAnchor="middle"
                    >
                      {item.country === "United States"
                        ? "United"
                        : item.country.length > 8
                        ? item.country.substring(0, 7) + "."
                        : item.country}
                    </text>
                    {item.country === "United States" && (
                      <text
                        x={x + barWidth / 2}
                        y="205"
                        fill="#9CA3AF"
                        fontSize="9"
                        textAnchor="middle"
                      >
                        States
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="bg-[#0F3A2E] rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-3 text-center">
            Global Statistics ({stats.latestYear})
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Total Emissions</span>
              <span className="text-sm font-bold text-white">
                {(stats.totalEmissions / 1000).toFixed(2)} billion tons
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Countries Tracked</span>
              <span className="text-sm font-bold text-white">
                {stats.countryCount}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Highest Emitter</span>
              <span className="text-sm font-bold text-white">
                {stats.topEmitters[0].name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};