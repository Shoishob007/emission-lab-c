import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomLineChart = ({ data }) => {
  if (!data) return null;

  const colors = {
    "Asia (excluding India and China)": "#8884d8",
    "Europe (excluding EU)": "#82ca9d",
    "European Union": "#ffc658",
    "Oceania": "#ff7300",
    "North America": "#0088FE",
    "South America": "#00C49F",
    "India": "#FFBB28",
    "China": "#FF8042",
  };

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
        {/* <Legend /> */}
        {Object.keys(colors).map(region => (
          <Line key={region} type="monotone" dataKey={region} stroke={colors[region]} activeDot={{ r: 8 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
