"use client";
import React from "react";
import { motion } from "framer-motion";
import { Home, Car, TreePine } from "lucide-react";

const CarbonFootprintCard = ({ item, index }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md group hover:shadow-lg transition-shadow duration-300"
  >
    <div
      className="absolute inset-0 bg-black/5 dark:bg-black/20 z-10"
      style={{ backgroundColor: `${item.color}20` }}
    ></div>

    <div className="p-2 relative z-20 items-center text-center">
      {/* Icon and Number */}
      <div className="mb-2 flex items-center justify-center w-full">
        <div className="text-xl font-semibold items-center flex justify-center" style={{ color: item.color }}>
          {item.value}
        </div>
        <div
          className="flex items-center justify-center rounded-lg"
          style={{ padding: "5px" }}
        >
          {item.icon}
        </div>
      </div>

      {/* Short Description */}
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {item.shortDescription}
      </p>
    </div>
  </motion.div>
);

export default function CarbonFootprintCards({ totalEmission }) {
  const carbonData = {
    treesRequired: Math.ceil(totalEmission * 20),
    homeEquivalent: Math.ceil(totalEmission / 8.6),
    carEquivalent: Math.ceil(totalEmission / 4.6),
  };

  const carbonFootprintData = [
    {
      shortDescription: `${carbonData.treesRequired} trees produce equivalent amount of CO₂`,
      value: carbonData.treesRequired,
      color: "#06D6A0",
      icon: <TreePine className="w-5 h-5" style={{ color: "#06D6A0" }} />,
    },
    {
      shortDescription: `Annual energy consumption of ${carbonData.homeEquivalent} homes`,
      value: carbonData.homeEquivalent,
      color: "#2196F3",
      icon: <Home className="w-5 h-5" style={{ color: "#2196F3" }} />,
    },
    {
      shortDescription: `Annual emissions from ${carbonData.carEquivalent} cars`,
      value: carbonData.carEquivalent,
      color: "#EF476F",
      icon: <Car className="w-5 h-5" style={{ color: "#EF476F" }} />,
    },
  ];

  return (
    <section className="my-6">
      <div className="grid grid-cols-3 gap-4">
        {carbonFootprintData.map((item, index) => (
          <CarbonFootprintCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
