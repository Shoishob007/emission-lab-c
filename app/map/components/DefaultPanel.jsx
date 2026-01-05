export const DefaultInfoPanel = () => {
  const emissionData = [
    { country: "China", emissions: 12.67, percentage: 33.98 },
    { country: "United States", emissions: 4.85, percentage: 12.0 },
    { country: "India", emissions: 2.69, percentage: 7.57 },
    { country: "Russia", emissions: 1.91, percentage: 5.3 },
    { country: "Japan", emissions: 1.08, percentage: 2.42 },
  ];

  const colors = ["#2563EB", "#F59E0B", "#EF4444", "#8B5CF6", "#10B981"];

  return (
    <div className="bg-[#0A2D23] shadow-2xl p-4 text-white h-full overflow-y-auto">
      <div className="space-y-4">
        {/* 3D Pie Chart */}
        <div className="bg-[#0F3A2E] rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-4 text-center">
            Top 5 CO₂ emissions (by country)
          </h4>
          <svg viewBox="0 0 240 200" className="w-full h-48">
            <defs>
              {/* Gradients for 3D effect */}
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

            {/* 3D pie slices with depth */}
            {emissionData.map((item, index) => {
              const startAngle = emissionData
                .slice(0, index)
                .reduce((sum, e) => sum + e.percentage * 3.6, 0);
              const angle = item.percentage * 3.6;

              const startRad = (startAngle - 90) * (Math.PI / 180);
              const endRad = (startAngle + angle - 90) * (Math.PI / 180);

              const x1 = 120 + 80 * Math.cos(startRad);
              const y1 = 95 + 80 * Math.sin(startRad);
              const x2 = 120 + 80 * Math.cos(endRad);
              const y2 = 95 + 80 * Math.sin(endRad);

              const largeArc = angle > 180 ? 1 : 0;

              // Calculate label position
              const midAngle = startAngle + angle / 2;
              const midRad = (midAngle - 90) * (Math.PI / 180);
              const labelX = 120 + 55 * Math.cos(midRad);
              const labelY = 95 + 55 * Math.sin(midRad);

              return (
                <g key={item.country}>
                  {/* 3D depth side */}
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

                  {/* Top surface */}
                  <path
                    d={`M 120 95 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={`url(#gradient-${index})`}
                    stroke="#0A2D23"
                    strokeWidth="2"
                  />

                  {/* Percentage label */}
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

            {/* Center hole for donut effect with 3D */}
            {/* <ellipse cx="120" cy="110" rx="35" ry="8" fill="#000000" opacity="0.3" /> */}
            <circle cx="120" cy="95" r="35" fill="#0A2D23" />
          </svg>

          {/* Legend */}
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
        </div>

        {/* 3D Bar Chart */}
        <div className="bg-[#0F3A2E] rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-4 text-center">
            Top 5 CO₂ emissions (b tons)
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

              {/* Grid lines */}
              {[0, 2.5, 5, 7.5, 10, 12.5, 15].map((val, idx) => {
                const y = 180 - (val / 15) * 160;
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
                      {val.toFixed(2)}
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
                const barHeight = (item.emissions / 15) * maxHeight;
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
      </div>

      <div className="mt-4 pt-4 border-t border-gray-600">
        <p className="text-xs text-gray-400 text-center">
          Hover over countries for quick info, click for detailed statistics.
        </p>
      </div>
    </div>
  );
};