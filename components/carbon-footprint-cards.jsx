"use client";
import React from "react";
import { motion } from "framer-motion";
import { Home, Car, TreePine } from "lucide-react";
import {
  FoundationTrees,
  IxCarFilled,
  IcBaselineHomeWork,
} from "@/public/icons/Iconify-icons";

const CarbonFootprintCard = ({ item, index }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden group transition-shadow duration-300"
  >
    <div
      className="absolute inset-0 z-10"
      style={{ backgroundColor: `${item.color}20` }}
    ></div>

    <div className="p-2 relative z-20 items-center text-center">
      {/* Icon and Number */}
      <div className="mb-2 flex items-center justify-center w-full">
        {/* <div className="text-xl font-semibold items-center flex justify-center" style={{ color: item.color }}>
          {item.value}
        </div> */}
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
      shortDescription: (
        <>
          <span className="font-bold text-primary">
            {carbonData.treesRequired} trees
          </span>{" "}
          absorb equivalent amount of CO₂
        </>
      ),
      value: carbonData.treesRequired,
      color: "#fffff",
      icon: (
        <FoundationTrees className="size-20" style={{ color: "#06c623" }} />
      ),
    },
    {
      shortDescription: (
        <>
          Annual energy consumption of{" "}
          <span className="font-bold text-primary">
            {" "}{carbonData.homeEquivalent} homes
          </span>
        </>
      ),
      value: carbonData.homeEquivalent,
      color: "#fffff",
      icon: (
        <IcBaselineHomeWork className="size-20" style={{ color: "#06c623" }} />
      ),
    },
    {
      shortDescription: (
        <>
          {" "}
          Annual emissions from{" "}
          <span className="font-bold text-primary">
            {carbonData.carEquivalent} cars
          </span>
        </>
      ),
      value: carbonData.carEquivalent,
      color: "#fffff",
      icon: <IxCarFilled className="size-20" style={{ color: "#06c623" }} />,
    },
  ];

  return (
    <section className="mt-2 mb-4">
      <div className="grid grid-cols-3 gap-4">
        {carbonFootprintData.map((item, index) => (
          <CarbonFootprintCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
