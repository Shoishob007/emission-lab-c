"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FoundationTrees,
  IxCarFilled,
  IcBaselineHomeWork,
} from "@/public/icons/Iconify-icons";

const CarbonFootprintCard = ({ item, index, isOffset = false, isVertical = false }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={`relative rounded-xl overflow-hidden group transition-shadow duration-300 ${
      isVertical ? "h-full" : "mb-2"
    }`}
  >
    <div
      className={`p-1 flex ${
        isVertical ? "flex-col h-full" : "items-center"
      } relative z-20`}
    >
      <div
        className={`flex-shrink-0 ${isOffset ? "mx-auto" : ""}`}
        style={{
          color: isOffset ? "#22c55e" : "#22c55e",
        }}
      >
        {item.icon}
      </div>
      
      <div className={`${isVertical ? "mt-3 text-center" : "ml-3"}`}>
        <div className={`flex items-center gap-1 ${isOffset ? "justify-center" : ""}`}>
          <span className="text-xl font-bold text-primary">{item.value}</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">{item.unit}</span>
        </div>
        <p className="text-[13px] text-gray-600 dark:text-gray-300">
          {item.description}
        </p>
      </div>
    </div>
  </motion.div>
);

export default function CarbonFootprintCards({ totalEmission }) {
  const carbonData = {
    treesRequired: Math.ceil(totalEmission * 20),
    homeEquivalent: Math.ceil(totalEmission / 8.6),
    carEquivalent: Math.ceil(totalEmission / 4.6),
  };

  const pluralize = (count, singular, plural) => 
    count === 1 ? singular : plural;

  const footprintData = [
    {
      description: (<>emit equivalent amount of CO<sub>2</sub> throughout a year.</>),
      value: carbonData.homeEquivalent,
      unit: pluralize(carbonData.homeEquivalent, "home", "homes"),
      icon: <IcBaselineHomeWork className="size-10" />,
    },
    {
      description:(<>annual emission is equivalent to your carbon footprint.</>),
      value: carbonData.carEquivalent,
      unit: pluralize(carbonData.carEquivalent, "car", "cars"),
      icon: <IxCarFilled className="size-10" />,
    },
    {
      description: (<>required to offset this amount of CO<sub>2</sub>.</>),
      value: carbonData.treesRequired,
      unit: pluralize(carbonData.treesRequired, "tree", "trees"),
      icon: <FoundationTrees className="size-10" />,
      isOffset: true,
    },
  ];

  return (
    <section className="mt-10">
      <div className="grid grid-cols-3 gap-0 relative items-stretch shadow-md rounded-xl">
        <div className="absolute -top-6 left-0 flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span className="text-xs font-medium text-gray-500">
            Emissions equivalent
          </span>
        </div>

        <div className="absolute -top-6 right-0 flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-xs font-medium text-gray-500">
            Offset scope
          </span>
        </div>

        <div className="col-span-2 grid grid-cols-1 gap-0 bg-red-50 dark:bg-red-900/20 px-2 rounded-l-xl">
          {footprintData.slice(0, 2).map((item, index) => (
            <CarbonFootprintCard
              key={index}
              item={item}
              index={index}
              isOffset={item.isOffset}
            />
          ))}
        </div>

        <div className="col-span-1 bg-green-50 dark:bg-green-900/20 px-2 rounded-r-xl">
          <CarbonFootprintCard
            item={footprintData[2]}
            index={2}
            isOffset={footprintData[2].isOffset}
            isVertical={true}
          />
        </div>
      </div>
    </section>
  );
}