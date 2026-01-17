// TopEmittersBarChart.jsx
"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TopEmittersBarChart = ({ carbonData, stats, selectedYear }) => {
  console.log("BarChart props:", { 
    hasCarbonData: !!carbonData, 
    topEmittersCount: stats?.topEmitters?.length || 0,
    selectedYear
  });

  if (!carbonData || !stats?.topEmitters?.length) {
    return (
      <div className="h-[400px] sm:h-[520px] flex items-center justify-center text-gray-500">
        <div className="text-center px-4">
          <p>No chart data available</p>
          <p className="text-sm mt-2">
            Try selecting a different year or refreshing the data
          </p>
        </div>
      </div>
    );
  }

  // Get top 7 countries for the SELECTED YEAR
  const topCountries = stats.topEmitters.slice(0, 7);
  
  // Prepare bar chart data - show emissions for selected year
  const chartData = topCountries.map(country => {
    const countryData = carbonData[country.code];
    return {
      code: country.code,
      name: country.name,
      emission: countryData?.latestEmission || 0,
      year: country.year || selectedYear,
    };
  });

  console.log("Chart data:", chartData);

  return (
    <div className="h-[400px] sm:h-[620px] w-full bg-white dark:bg-gray-800 rounded-xl sm:p-4 dark:border-gray-700">
      <div className="h-[350px] sm:h-[550px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ 
              top: 10, 
              right: 10, 
              left: -10, 
              bottom: 5 
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="code" 
              textAnchor="middle"
              height={40}
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 11 }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              tickFormatter={(value) => {
                if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                return value.toLocaleString();
              }}
              width={45}
            />
            <Tooltip 
              formatter={(value) => [`${value.toLocaleString()} MtCO₂e`, "Emissions"]}
              labelFormatter={(label) => {
                const country = chartData.find(d => d.code === label);
                return country ? `${country.name}` : label;
              }}
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                borderColor: '#374151',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              labelStyle={{ color: '#FFFFFF' }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '11px' }}
              iconSize={10}
            />
            <Bar 
              dataKey="emission" 
              name="CO₂ Emissions" 
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center px-2">
        <p>
          Showing top 7 emitting countries for {selectedYear === "latest" ? "latest available data" : `year ${selectedYear}`}.
        </p>
      </div>
    </div>
  );
};

export default TopEmittersBarChart;