/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { Calculator, Car, Train, Bus, Bike, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TransportCalculatorLeft = ({
  setCalculated,
  transportDetails,
  setTransportDetails,
  setEmissionData,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [distanceUnit, setDistanceUnit] = useState("km");
  const [vehicleCategory, setVehicleCategory] = useState("cars");
  const [vehicleTypes, setVehicleTypes] = useState([]);

  // Vehicle categories with icons
  const vehicleCategories = [
    { value: "cars", icon: Car, label: "Cars" },
    { value: "motorcycle", icon: Bike, label: "Motorcycle" },
    { value: "bus", icon: Bus, label: "Bus" },
    { value: "train", icon: Train, label: "Train" },
  ];

  // Vehicle types configuration
  const vehicleTypeConfig = {
    cars: {
      types: ["sedan", "SUV"],
      default: "sedan",
    },
    motorcycle: {
      types: ["motorbike"],
      default: "motorbike",
    },
    bus: {
      types: ["Bus-LocalAverage", "Bus-Coach"],
      default: "Bus-LocalAverage",
    },
    train: {
      types: ["Train-National", "Train-Local"],
      default: "Train-National",
    },
  };

  // Displaying vehicle types
  const vehicleTypeLabels = {
    sedan: "Sedan",
    SUV: "SUV",
    motorbike: "Motorbike",
    "Bus-LocalAverage": "Local Bus",
    "Bus-Coach": "Coach",
    "Train-National": "National Train",
    "Train-Local": "Local Train",
  };

  // Animation variants
  const buttonVariants = {
    initial: {
      gap: 0,
      paddingLeft: ".5rem",
      paddingRight: ".5rem",
    },
    animate: (isSelected) => ({
      gap: ".5rem",
      paddingLeft: ".5rem",
      paddingRight: ".5rem",
    }),
  };

  const spanVariants = {
    initial: { width: 0, opacity: 0 },
    animate: { width: "auto", opacity: 1 },
    exit: { width: 0, opacity: 0 },
  };

  const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.5 };

  // Updating vehicle types and setting default when category changes
  useEffect(() => {
    if (vehicleCategory) {
      setVehicleTypes(vehicleTypeConfig[vehicleCategory].types);

      let defaultFuelType;
      if (vehicleCategory === "motorcycle") {
        defaultFuelType = "Petrol";
      } else if (vehicleCategory === "bus") {
        defaultFuelType = "Diesel";
      } else if (vehicleCategory === "cars") {
        defaultFuelType = "Petrol";
      }

      setTransportDetails((prev) => ({
        ...prev,
        transportType: vehicleTypeConfig[vehicleCategory].default,
        fuelType: defaultFuelType,
      }));
    } else {
      setVehicleTypes([]);
    }
  }, [vehicleCategory]);

  const handleCalculate = async () => {
    try {
      setLoading(true);
      setError(null);

      const requestData = {
        vehicle_type: transportDetails.transportType,
        fuel_type:
          vehicleCategory === "train" ? "Diesel" : transportDetails.fuelType,
        distance_value: transportDetails.distance,
        distance_unit: distanceUnit,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/transportAPI/carbon-emission-by-vehicle-type`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();
      setEmissionData(result);
      setCalculated(true);
    } catch (error) {
      console.error("Error calculating emissions:", error);
      setError(error.message || "Failed to calculate emissions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 min-w-[450px]">
      {/* Category Selection */}
      <div>
        {/* <label className="block text-sm font-semibold mb-2 text-muted-foreground">
          Vehicle Category
        </label> */}
        <div className="flex items-center justify-evenly gap-2 rounded-2xl p-1">
          {vehicleCategories.map((category) => {
            const Icon = category.icon;
            const isSelected = vehicleCategory === category.value;

            return (
              <motion.button
                key={category.value}
                variants={buttonVariants}
                initial={false}
                animate="animate"
                custom={isSelected}
                onClick={() => setVehicleCategory(category.value)}
                transition={transition}
                className={cn(
                  "relative flex items-center rounded-xl px-2 py-2 text-sm transition-all duration-300",
                  isSelected
                    ? "text-primary scale-125 font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon size={20} />
                <AnimatePresence initial={false}>
                  {isSelected && (
                    <motion.span
                      variants={spanVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={transition}
                      className="overflow-hidden"
                    >
                      {category.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Vehicle Type Selection */}
      {vehicleCategory && (
        <div>
          <label className="block text-sm font-semibold mb-2 text-muted-foreground">
            Vehicle Type
          </label>
          <Select
            value={transportDetails.transportType}
            onValueChange={(value) =>
              setTransportDetails((prev) => ({ ...prev, transportType: value }))
            }
          >
            <SelectTrigger className="w-full focus:ring-0 focus:ring-offset-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {vehicleTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {vehicleTypeLabels[type]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {(vehicleCategory === "cars" ||
        vehicleCategory === "motorcycle" ||
        vehicleCategory === "bus") && (
        <div className="mt-4">
          <label className="block text-sm font-semibold mb-2 text-muted-foreground">
            Fuel Type
          </label>
          <div className="flex space-x-4">
            {(vehicleCategory === "cars" ||
              vehicleCategory === "motorcycle") && (
              <label className="flex items-center px-4 py-2 rounded-md cursor-pointer">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-secondary"
                  checked={transportDetails.fuelType === "Petrol"}
                  onChange={() =>
                    setTransportDetails((prev) => ({
                      ...prev,
                      fuelType: "Petrol",
                    }))
                  }
                />
                <span className="ml-2 text-sm font-medium">Petrol</span>
              </label>
            )}

            {/* Diesel - Only for cars and buses */}
            {(vehicleCategory === "cars" || vehicleCategory === "bus") && (
              <label className="flex items-center px-4 py-2 rounded-md cursor-pointer">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-secondary"
                  checked={transportDetails.fuelType === "Diesel"}
                  onChange={() =>
                    setTransportDetails((prev) => ({
                      ...prev,
                      fuelType: "Diesel",
                    }))
                  }
                />
                <span className="ml-2 text-sm font-medium">Diesel</span>
              </label>
            )}
          </div>
        </div>
      )}

      {/* Distance Input */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-muted-foreground">
          Distance
        </label>
        <div className="flex justify-between items-center rounded-md border border-input h-10 bg-background px-3 py-2 text-sm">
          <div className="flex items-center w-full">
            <Car className="h-5 w-5 text-muted-foreground mr-3" />
            <input
              type="number"
              name="distance"
              value={transportDetails.distance}
              onChange={(e) =>
                setTransportDetails((prev) => ({
                  ...prev,
                  distance: Math.max(0, Number(e.target.value)),
                }))
              }
              placeholder="Enter distance"
              className="bg-transparent focus:outline-none w-full placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center ml-2">
            <div className="h-5 w-px bg-border mx-2"></div>
            <Select value={distanceUnit} onValueChange={setDistanceUnit}>
              <SelectTrigger className="h-auto p-0 border-0 shadow-none focus:ring-0 gap-1 ">
                <SelectValue placeholder="km" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="km">km</SelectItem>
                <SelectItem value="mi">miles</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Passengers Input */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-muted-foreground">
          Total Passengers
        </label>
        <div className="flex justify-between items-center rounded-md border border-input h-10 bg-background px-3 py-2 text-sm">
          <div className="flex items-center w-full">
            <Users className="h-5 w-5 text-muted-foreground mr-3" />
            <input
              type="number"
              name="passengers"
              value={transportDetails.passengers}
              onChange={(e) =>
                setTransportDetails((prev) => ({
                  ...prev,
                  passengers: Math.max(1, Number(e.target.value)),
                }))
              }
              className="bg-transparent w-full focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && <div className="text-sm text-red-500">{error}</div>}

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        disabled={loading}
        className={`w-full bg-primary text-primary-foreground py-3 rounded-md flex items-center justify-center text-sm font-medium !mt-6 ${
          loading ? "opacity-70 cursor-not-allowed" : "hover:bg-primary/90"
        }`}
      >
        {loading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Calculating...
          </span>
        ) : (
          <>
            <Calculator className="h-4 w-4 mr-2" />
            Calculate
          </>
        )}
      </button>
    </div>
  );
};

export default TransportCalculatorLeft;

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}
