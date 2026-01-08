import ReactCountryFlag from "react-country-flag";
import { iso3ToIso2 } from "../utils/iso3_To_iso2";

export const DefaultInfoPanel = ({ stats }) => {
  // using dynamic data from stats or fallback to empty array
  // console.log(stats.topEmitters)
  const emissionData =
    stats?.topEmitters?.slice(0, 5).map((emitter) => ({
      country: emitter.name,
      code: emitter.code,
      emissions: emitter.emission / 1000,
      percentage: emitter.share_global_co2.toFixed(2),
    })) || [];

  const colors = ["#EF4444", "#F59E0B", "#2563EB", "#8B5CF6", "#10B981"];

  // Calculate max emission for bar chart scaling
  const maxEmission =
    emissionData.length > 0
      ? Math.max(...emissionData.map((d) => d.emissions))
      : 15;
  const chartMax = Math.ceil(maxEmission * 1.2);

  if (!stats || !stats.topEmitters || stats.topEmitters.length === 0) {
    return (
      <div className="p-4 h-full overflow-y-auto flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700">No emission data available</p>
          <p className="text-xs text-gray-700 mt-2">
            Select a country to view details
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 text-white h-full overflow-y-auto bg-white">
      <div className="space-y-4">
        {/* Global Emission Share – Compact Infographic */}
        <div className=" rounded-lg p-3 flex flex-col">
          <h4 className="text-sm font-semibold mb-4 text-center text-gray-700">
            Global CO₂ Emission Share
          </h4>

          <div className="flex-1 space-y-3">
            {emissionData.map((item, index) => (
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
                    className="h-full rounded-full"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: colors[index],
                    }}
                  />
                </div>

                {/* Percentage */}
                <span className="text-sm font-semibold text-gray-700 text-right">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>

          {/* Footer */}
        </div>

        {/* 3D Bar Chart */}
        <div className="rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-4 text-center text-gray-700">
            Top 5 CO₂ emissions (billion tons)
          </h4>

          <div className="relative">
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
        <div className="rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-3 text-center text-gray-700">
            Global Statistics ({stats.latestYear})
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-700">Total Emissions</span>
              <span className="text-sm font-bold text-gray-700">
                {(stats.totalEmissions / 1000).toFixed(2)} billion tons
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-700">Countries Tracked</span>
              <span className="text-sm font-bold text-gray-700">
                {stats.countryCount}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-700">Highest Emitter</span>
              <span className="text-sm font-bold text-gray-700">
                {stats.topEmitters[0].name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
