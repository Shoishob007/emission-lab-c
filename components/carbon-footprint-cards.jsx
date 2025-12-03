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
          <span className="text-lg font-bold text-primary">{item.value}</span>
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
    if (currentUnit === "years") {
      if (value >= 1) {
        if (value >= 2) {
          const wholeYears = Math.floor(value);
          const remainingMonths = Math.round((value - wholeYears) * 12);
          if (remainingMonths > 0) {
            return `${wholeYears} year${wholeYears !== 1 ? "s" : ""}, ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
          } else {
            return `${wholeYears} year${wholeYears !== 1 ? "s" : ""}`;
          }
        } else {
          return `${value.toFixed(1)} year`;
        }
      } else if (value >= 1 / 12) {
        const months = value * 12;
        if (months >= 2) {
          const wholeMonths = Math.floor(months);
          const remainingDays = Math.round((months - wholeMonths) * 30);
          if (remainingDays > 7) {
            return `${wholeMonths} month${wholeMonths !== 1 ? "s" : ""}, ${remainingDays} day${remainingDays !== 1 ? "s" : ""}`;
          } else {
            return `${wholeMonths} month${wholeMonths !== 1 ? "s" : ""}`;
          }
        } else if (months >= 1) {
          return "1 month";
        } else {
          const days = Math.round(months * 30);
          if (days >= 14) {
            const weeks = Math.round(days / 7);
            return `${weeks} week${weeks !== 1 ? "s" : ""}`;
          } else {
            return `${days} day${days !== 1 ? "s" : ""}`;
          }
        }
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
        if (years >= 2) {
          const wholeYears = Math.floor(years);
          const remainingMonths = Math.round((years - wholeYears) * 12);
          if (remainingMonths > 0) {
            return `${wholeYears} year${wholeYears !== 1 ? "s" : ""}, ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
          } else {
            return `${wholeYears} year${wholeYears !== 1 ? "s" : ""}`;
          }
        } else {
          return `${years.toFixed(1)} year${years >= 2 ? "s" : ""}`;
        }
      } else if (value >= 2) {
        const wholeMonths = Math.floor(value);
        const remainingDays = Math.round((value - wholeMonths) * 30);
        if (remainingDays > 7) {
          return `${wholeMonths} month${wholeMonths !== 1 ? "s" : ""}, ${remainingDays} day${remainingDays !== 1 ? "s" : ""}`;
        } else {
          return `${wholeMonths} month${wholeMonths !== 1 ? "s" : ""}`;
        }
      } else if (value >= 1) {
        const weeks = Math.round(value * 4.33);
        if (weeks >= 4) {
          return "1 month";
        } else {
          return `${weeks} week${weeks !== 1 ? "s" : ""}`;
        }
      } else {
        const days = Math.round(value * 30);
        if (days >= 14) {
          const weeks = Math.round(days / 7);
          return `${weeks} week${weeks !== 1 ? "s" : ""}`;
        } else {
          return `${days} day${days !== 1 ? "s" : ""}`;
        }
      }
    }

    return `${value}`;
  }

  // ✅ Corrected: handles ALL possible emission formats
  const co2e_kg =
    emissionData?.typeResult?.result?.data?.co2e_kg ??
    emissionData?.modelResult?.result?.data?.co2e_kg ??
    emissionData?.result?.data?.co2e_kg ??
    emissionData?.result?.data?.emissions?.co2e_kg ??
    0;

  const co2e_gm =
    emissionData?.typeResult?.result?.data?.co2e_gm ??
    emissionData?.modelResult?.result?.data?.co2e_gm ??
    emissionData?.result?.data?.co2e_gm ??
    emissionData?.result?.data?.emissions?.co2e_gm ??
    0;

  // numeric equivalents
  const rawHomeEnergyMonths =
    (co2e_kg / (HOME_ENERGY_T_CO2_PER_HOME_YEAR * 1000)) * 12;
  const rawCarKm = Math.round(co2e_gm / CAR_G_CO2_PER_KM);

  const carbonData = {
    treesRequired: Math.ceil(co2e_kg / TREE_KG_CO2_PER_YEAR),
    homeEquivalent: formatDynamicDuration(rawHomeEnergyMonths, "months"),
    carEquivalent: `${rawCarKm.toLocaleString()} km`,
  };

  const footprintData = [
    {
      description: <>of energy use of an average home</>,
      value: carbonData.homeEquivalent,
      icon: <IcBaselineHomeWork className="size-10" />,
    },
    {
      description: <>typical run for a gasoline car</>,
      value: carbonData.carEquivalent,
      icon: <IxCarFilled className="size-10" />,
    },
    {
      description: (
        <>
          trees required to offset this amount of CO<sub>2</sub>
        </>
      ),
      value: carbonData.treesRequired,
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
