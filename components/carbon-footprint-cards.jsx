"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FoundationTrees,
  IxCarFilled,
  IcBaselineHomeWork,
} from "@/public/icons/Iconify-icons";

const CarbonFootprintCard = ({ item, index, isOffset = false }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={`relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden group transition-shadow duration-300 `}
  >
    <div className="p-2 relative z-20 items-center text-center">
      <div className="mb-2 flex items-center justify-center w-full">
        <div
          className="flex items-center justify-center rounded-lg p-1"
          style={{
            color: "#22c55e",
          }}
        >
          {item.icon}
        </div>
      </div>
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

  const pluralize = (count, singular, plural) => 
    count === 1 ? singular : plural;

  const footprintData = [
    {
      shortDescription: (
        <>
          Energy equivalent to power{" "}
          <span className="font-bold text-primary">
            {carbonData.homeEquivalent} {pluralize(carbonData.homeEquivalent, "home", "homes")}
          </span>{" "}
          annually
        </>
      ),
      value: carbonData.homeEquivalent,
      icon: <IcBaselineHomeWork className="size-20" />,
    },
    {
      shortDescription: (
        <>
          CO<sub>2</sub> comparable to{" "}
          <span className="font-bold text-primary">
            {carbonData.carEquivalent} {pluralize(carbonData.carEquivalent, "car", "cars")}
          </span>{" "}
          annual emissions
        </>
      ),
      value: carbonData.carEquivalent,
      icon: <IxCarFilled className="size-20" />,
    },
    {
      shortDescription: (
        <>
          <span className="font-bold text-green-500">
            {carbonData.treesRequired} {pluralize(carbonData.treesRequired, "tree", "trees")}
          </span>{" "}
          required for your emission neutrality
        </>
      ),
      value: carbonData.treesRequired,
      icon: <FoundationTrees className="size-20" />,
      isOffset: true,
    },
  ];

  return (
    <section className="mt-8 mb-4">
      <div className="grid grid-cols-3 relative">
        <div className="absolute -top-6 left-0 flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span className="text-[12px] font-medium text-gray-500">
            Emissions equivalent
          </span>
        </div>

        <div className="absolute -top-6 right-0 flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-[12px] font-medium text-gray-500">
            Offset potential
          </span>
        </div>

        <div className="col-span-2 grid grid-cols-2">
          {footprintData.slice(0, 2).map((item, index) => (
            <CarbonFootprintCard
              key={index}
              item={item}
              index={index}
              isOffset={item.isOffset}
            />
          ))}
        </div>

        {/* Vertical divider */}
        <div
          className="absolute left-2/3 -ml-1 h-full"
          style={{
            borderLeft: "2px solid rgba(92, 99, 113, 0.3)",
            top: "0",
          }}
        ></div>

        <div className="col-span-1">
          <CarbonFootprintCard
            item={footprintData[2]}
            index={2}
            isOffset={footprintData[2].isOffset}
          />
        </div>
      </div>
    </section>
  );
}
