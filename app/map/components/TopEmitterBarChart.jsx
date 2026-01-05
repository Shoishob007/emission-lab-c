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
      <div className="h-[520px] flex items-center justify-center text-gray-500">
        <div className="text-center">
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

  // Colors for bars
  const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4"];

  return (
    <div className="h-[520px] w-full bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700">

      <div className="h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="code" 
              textAnchor="end"
              height={60}
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              tickFormatter={(value) => value.toLocaleString()}
              fontSize={12}

            //   label={{ 
            //     value: 'Emissions', 
            //     angle: -90, 
            //     position: 'insideLeft',
            //     offset: 0,
            //     fill: '#9CA3AF'
            //   }}
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
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#FFFFFF' }}
            />
            <Legend />
            <Bar 
              dataKey="emission" 
              name="CO₂ Emissions" 
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
        <p>
          Showing top 7 emitting countries for {selectedYear === "latest" ? "latest available data" : `year ${selectedYear}`}.
        </p>
      </div>
    </div>
  );
};

export default TopEmittersBarChart;