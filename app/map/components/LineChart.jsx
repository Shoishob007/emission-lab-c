"use client";
import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChart = ({ carbonData, stats }) => {
  console.log("LineChart props:", { 
    hasCarbonData: !!carbonData, 
    hasStats: !!stats,
    topEmitters: stats?.topEmitters?.length || 0,
    sampleCountryData: carbonData && Object.keys(carbonData).length > 0 ? carbonData[Object.keys(carbonData)[0]] : null
  });

  if (!carbonData || !stats?.topEmitters?.length) {
    return (
      <div className="h-[520px] flex items-center justify-center text-gray-500">
        <div>
          <p>No chart data available</p>
          <p className="text-sm mt-2">
            carbonData: {carbonData ? "exists" : "null"} | 
            topEmitters: {stats?.topEmitters?.length || 0}
          </p>
        </div>
      </div>
    );
  }

  // Get top 7 countries
  const topCountries = stats.topEmitters.slice(0, 7);
  
  // Create years array from 1960 to 2024
  const years = [];
  for (let year = 1960; year <= 2024; year++) {
    years.push(year);
  }

  // Prepare chart data
  const chartData = years.map(year => {
    const row = { year };
    topCountries.forEach(country => {
      const countryData = carbonData[country.code];
      if (countryData?.data) {
        const yearData = countryData.data.find(d => d.year === year);
        row[country.code] = yearData ? Number(yearData.emission) : null;
      } else {
        row[country.code] = null;
      }
    });
    return row;
  });

  console.log("Chart data sample:", chartData.slice(0, 5));
  console.log("Top countries:", topCountries);

  // Colors for lines
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#a4de6c", "#d0ed57", "#83a6ed"];

  return (
    <div className="h-[520px] bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold mb-2">Top 7 Emitters (1960-2024)</h3>
      
      <div className="h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart 
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis 
              dataKey="year" 
              domain={[1960, 2024]}
              type="number"
              allowDecimals={false}
              tickCount={10}
              tickFormatter={(value) => value.toString()}
            />
            <YAxis 
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip 
              formatter={(value, name) => [
                value ? `${value.toLocaleString()} MtCO₂e` : "No data",
                name
              ]}
            />
            <Legend />
            {topCountries.map((country, index) => (
              <Line
                key={country.code}
                type="monotone"
                dataKey={country.code}
                name={`${country.name} (${country.code})`}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 2 }}
                connectNulls
                isAnimationActive={false}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
      
      <p className="text-sm text-gray-600 mt-2">
        Showing emissions from 1960 to 2024. Hover over lines to see values.
      </p>
    </div>
  );
};

export default LineChart;