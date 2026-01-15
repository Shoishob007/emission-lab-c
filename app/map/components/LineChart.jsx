"use client";
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomLineChart = ({ data }) => {
  const [hiddenLines, setHiddenLines] = useState({});

  if (!data) return null;

  // More distinctive colors with better contrast
  const colors = {
    "Asia (excluding India and China)": "#FF6B6B", // Bright Red
    "Europe (excluding EU)": "#4ECDC4", // Turquoise
    "European Union": "#FFD166", // Bright Yellow
    "Oceania": "#06D6A0", // Bright Green
    "North America": "#118AB2", // Strong Blue
    "South America": "#073B4C", // Dark Blue
    "India": "#EF476F", // Pink
    "China": "#FF9A1F", // Orange
  };

  const formatTooltip = (value) => {
    return `${value.toFixed(2)} million tons`;
  };

  const handleLegendClick = (dataKey) => {
    setHiddenLines(prev => ({
      ...prev,
      [dataKey]: !prev[dataKey]
    }));
  };

  // Custom legend for mobile
  const CustomLegend = () => {
    return (
      <div className="mt-4 px-2">
        {/* Desktop: Horizontal layout */}
        <div className="hidden md:flex flex-wrap justify-center gap-3">
          {Object.keys(colors).map(region => (
            <button
              key={region}
              onClick={() => handleLegendClick(region)}
              className={`flex items-center gap-2 px-2 py-1 rounded transition-all ${
                hiddenLines[region] ? 'opacity-40' : 'opacity-100'
              }`}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[region] }}
              />
              <span className="text-xs text-gray-700 dark:text-gray-300">
                {region}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile */}
        <div className="flex flex-wrap justify-center gap-2 md:hidden">
          {Object.keys(colors).map(region => (
            <button
              key={region}
              onClick={() => handleLegendClick(region)}
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded border transition-all ${
                hiddenLines[region] 
                  ? 'opacity-40 border-gray-200' 
                  : 'opacity-100 border-gray-300 shadow-sm'
              }`}
            >
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: colors[region] }}
              />
              <span className="text-[10px] text-gray-700 dark:text-gray-300 truncate">
                {region}
              </span>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
          Click on legend items to show/hide lines
        </p>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Wrapper div with responsive height */}
      <div className="h-[400px] md:h-[550px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: -15,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              fontSize={10}
              tick={{ fontSize: 10 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              fontSize={10}
              tick={{ fontSize: 10 }}
              width={45}
              tickFormatter={(value) => {
                if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                return value;
              }}
            />
            <Tooltip 
              formatter={formatTooltip}
              contentStyle={{
                fontSize: '11px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '8px'
              }}
            />
            {/* Hide default legend */}
            <Legend content={() => null} />
            {Object.keys(colors).map(region => (
              <Line 
                key={region} 
                type="monotone" 
                dataKey={region} 
                stroke={colors[region]} 
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ 
                  r: 5, 
                  strokeWidth: 2,
                  stroke: '#FFFFFF'
                }}
                hide={hiddenLines[region]}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Custom Legend */}
      <CustomLegend />
    </div>
  );
};

export default CustomLineChart;