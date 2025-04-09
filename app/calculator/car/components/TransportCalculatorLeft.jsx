/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { Calculator, Car, Train, Bus, Bike, Users } from "lucide-react";
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
  const [vehicleCategory, setVehicleCategory] = useState("cars"); // Set cars as default
  const [vehicleTypes, setVehicleTypes] = useState([]);

  // Vehicle categories and their corresponding types with default values
  const vehicleCategories = {
    cars: {
      types: ["sedan", "SUV"],
      default: "sedan"
    },
    motorcycle: {
      types: ["motorbike"],
      default: "motorbike"
    },
    train: {
      types: ["Train-National", "Train-Local", "Train-Tram"],
      default: "Train-National"
    },
    bus: {
      types: ["Bus-LocalAverage", "Bus-Coach"],
      default: "Bus-LocalAverage"
    },
  };

  // Display names for vehicle types
  const vehicleTypeLabels = {
    "sedan": "Sedan",
    "SUV": "SUV",
    "motorbike": "Motorbike",
    "Train-National": "National Train",
    "Train-Local": "Local Train",
    "Train-Tram": "Tram",
    "Bus-LocalAverage": "Local Bus",
    "Bus-Coach": "Coach"
  };

  // Updating vehicle types and setting default when category changes
  useEffect(() => {
    if (vehicleCategory) {
      setVehicleTypes(vehicleCategories[vehicleCategory].types);
      
      setTransportDetails(prev => ({ 
        ...prev, 
        transportType: vehicleCategories[vehicleCategory].default,
        fuelType: ["cars", "motorcycle"].includes(vehicleCategory) ? "Petrol" : undefined
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
        fuel_type: transportDetails.fuelType,
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
    <div className="space-y-4 min-w-[400px]">
      {/* Category Selection */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-muted-foreground">
          Vehicle Category
        </label>
        <Select
          value={vehicleCategory}
          onValueChange={setVehicleCategory}
        >
          <SelectTrigger className="w-full focus:ring-0 focus:ring-offset-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cars">
              <div className="flex items-center">
                <Car className="h-4 w-4 mr-2" />
                <span>Cars</span>
              </div>
            </SelectItem>
            <SelectItem value="motorcycle">
              <div className="flex items-center">
                <Bike className="h-4 w-4 mr-2" />
                <span>Motorcycle</span>
              </div>
            </SelectItem>
            <SelectItem value="train">
              <div className="flex items-center">
                <Train className="h-4 w-4 mr-2" />
                <span>Train</span>
              </div>
            </SelectItem>
            <SelectItem value="bus">
              <div className="flex items-center">
                <Bus className="h-4 w-4 mr-2" />
                <span>Bus</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
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

      {/* Fuel Type - Only for cars and motorcycles */}
      {(
        <div className="mt-4">
          <label className="block text-sm font-semibold mb-2 text-muted-foreground">
            Fuel Type
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center px-4 py-2 rounded-md cursor-pointer">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-secondary"
                checked={transportDetails.fuelType === "Petrol"}
                onChange={() =>
                  setTransportDetails((prev) => ({ ...prev, fuelType: "Petrol" }))
                }
              />
              <span className="ml-2 text-sm font-medium">Petrol</span>
            </label>
            <label className="flex items-center px-4 py-2 rounded-md cursor-pointer">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-secondary"
                checked={transportDetails.fuelType === "Diesel"}
                onChange={() =>
                  setTransportDetails((prev) => ({ ...prev, fuelType: "Diesel" }))
                }
              />
              <span className="ml-2 text-sm font-medium">Diesel</span>
            </label>
            <label className="flex items-center px-4 py-2 rounded-md cursor-pointer">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-secondary"
                checked={transportDetails.fuelType === "Unknown"}
                onChange={() =>
                  setTransportDetails((prev) => ({
                    ...prev,
                    fuelType: "Unknown",
                  }))
                }
              />
              <span className="ml-2 text-sm font-medium">Other</span>
            </label>
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
        className={`w-full bg-primary text-primary-foreground py-3 rounded-md flex items-center justify-center text-sm font-medium mt-4 ${
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