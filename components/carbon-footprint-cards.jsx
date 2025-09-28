"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FoundationTrees,
  IxCarFilled,
  IcBaselineHomeWork,
} from "@/public/icons/Iconify-icons";

const HOME_ENERGY_T_CO2_PER_HOME_YEAR = 7.45;
const CAR_G_CO2_PER_KM = 251.0;
const TREE_KG_CO2_PER_YEAR = 60.0;

const CarbonFootprintCard = ({
  item,
  index,
  isOffset = false,
  isVertical = false,
}) => (
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
        <div
          className={`flex items-center gap-1 ${
            isOffset ? "justify-center" : ""
          }`}
        >
          <span className="text-xl font-bold text-primary">{item.value}</span>
          {/* <span className="text-sm text-gray-600 dark:text-gray-300">{item.unit}</span> */}
        </div>
        <p className="text-[13px] text-gray-600 dark:text-gray-300">
          {item.description}
        </p>
      </div>
    </div>
  </motion.div>
);

export default function CarbonFootprintCards({ emissionData }) {
  console.log("Total emission data  :: ", emissionData);

  function formatDynamicDuration(value, currentUnit) {
    // e.g. value = 0.02, currentUnit = "years"

    if (currentUnit === "years") {
      if (value >= 1) {
        return `${value.toFixed(1)} year${value >= 2 ? "s" : ""}`;
      } else if (value >= 1 / 12) {
        const months = value * 12;
        return `${months.toFixed(1)} month${months >= 2 ? "s" : ""}`;
      } else if (value >= 1 / 365) {
        const days = value * 365;
        return `${days.toFixed(0)} day${days !== 1 ? "s" : ""}`;
      } else {
        const hours = value * 365 * 24;
        return `${hours.toFixed(0)} hour${hours !== 1 ? "s" : ""}`;
      }
    }

    if (currentUnit === "months") {
      if (value >= 12) {
        const years = value / 12;
        return `${years.toFixed(1)} year${years >= 2 ? "s" : ""}`;
      } else if (value >= 1) {
        return `${value.toFixed(1)} month${value >= 2 ? "s" : ""}`;
      } else if (value >= 1 / 30) {
        const days = value * 30;
        return `${days.toFixed(0)} day${days !== 1 ? "s" : ""}`;
      } else {
        const hours = value * 30 * 24;
        return `${hours.toFixed(0)} hour${hours !== 1 ? "s" : ""}`;
      }
    }

    return `${value}`;
  }

  const co2e_kg =
    emissionData?.result?.data?.co2e_kg ??
    emissionData?.result?.data?.emissions?.co2e_kg ??
    emissionData?.modelResult?.result?.data?.co2e_kg ??
    0;

  const co2e_gm =
    emissionData?.result?.data?.co2e_gm ??
    emissionData?.result?.data?.emissions?.co2e_gm ??
    emissionData?.modelResult?.result?.data?.co2e_gm ??
    0;

  // numeric equivalents
  const rawHomeEnergyMonths =
    (co2e_kg / (HOME_ENERGY_T_CO2_PER_HOME_YEAR * 1000)) * 12;
  const rawCarKm = Math.ceil(co2e_gm / CAR_G_CO2_PER_KM);

  const carbonData = {
    treesRequired: Math.ceil(co2e_kg / TREE_KG_CO2_PER_YEAR),
    homeEquivalent: formatDynamicDuration(rawHomeEnergyMonths, "months"),
    carEquivalent: `${rawCarKm.toLocaleString()} km`,
  };

  const pluralize = (count, singular, plural) =>
    count === 1 ? singular : plural;

  const footprintData = [
    {
      description: <>of energy use of an average home</>,
      value: carbonData.homeEquivalent,
      unit: pluralize(carbonData.homeEquivalent, "month", "months"),
      icon: <IcBaselineHomeWork className="size-10" />,
    },
    {
      description: <>typical run for a gasoline car</>,
      value: carbonData.carEquivalent,
      unit: pluralize(carbonData.carEquivalent, "kilometer", "kilometers"),
      icon: <IxCarFilled className="size-10" />,
    },
    {
      description: (
        <>
          trees required to offset this amount of CO<sub>2</sub>.
        </>
      ),
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
