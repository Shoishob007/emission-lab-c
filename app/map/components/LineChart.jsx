import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomLineChart = ({ data }) => {
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

  // Alternative color scheme (even more distinct):
  // const colors = {
  //   "Asia (excluding India and China)": "#E63946", // Red
  //   "Europe (excluding EU)": "#457B9D", // Blue
  //   "European Union": "#F4A261", // Orange
  //   "Oceania": "#2A9D8F", // Teal
  //   "North America": "#9D4EDD", // Purple
  //   "South America": "#588157", // Green
  //   "India": "#FF6D00", // Bright Orange
  //   "China": "#003566", // Navy Blue
  // };

  // Dark mode friendly alternative:
  // const colors = {
  //   "Asia (excluding India and China)": "#FF6B6B", // Red
  //   "Europe (excluding EU)": "#4ECDC4", // Turquoise
  //   "European Union": "#FFD166", // Yellow
  //   "Oceania": "#06D6A0", // Green
  //   "North America": "#118AB2", // Blue
  //   "South America": "#7B68EE", // Medium Slate Blue
  //   "India": "#FF69B4", // Hot Pink
  //   "China": "#FFA500", // Orange
  // };

  const formatTooltip = (value) => {
    return `${value.toFixed(2)} million tons`;
  };

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" fontSize={12} />
        <YAxis fontSize={12} />
        <Tooltip formatter={formatTooltip} />
        <Legend />
        {Object.keys(colors).map(region => (
          <Line 
            key={region} 
            type="monotone" 
            dataKey={region} 
            stroke={colors[region]} 
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ 
              r: 6, 
              strokeWidth: 2,
              stroke: '#FFFFFF'
            }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;