"use client";

import { useState } from "react";
import { Calculator, Car, Users, ChevronDown } from "lucide-react";
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

      console.log("Sending request data:", requestData);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/transportAPI/carbon-emission-by-vehicle-type`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();
      console.log("Result from the api call :::: ", result)

      // Update the emission data state
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
    <>
      <div className="grid grid-cols-1 gap-4 min-w-[350px]">
        {/* Car Type Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-2 text-muted-foreground">
            Car Type
          </label>
          <Select
            value={transportDetails.transportType}
            onValueChange={(value) =>
              setTransportDetails((prev) => ({ ...prev, transportType: value }))
            }
          >
            <SelectTrigger className="w-full focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Select a vehicle type..." />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="sedan">Sedan</SelectItem>
              <SelectItem value="SUV">SUV</SelectItem>
              <SelectItem value="motorbike">Motorbike</SelectItem>
              <SelectItem value="Train-National">National Train</SelectItem>
              <SelectItem value="Train-Local">Local Train</SelectItem>
              <SelectItem value="Train-Tram">Train-Tram</SelectItem>
              <SelectItem value="Bus-LocalAverage">Local Bus</SelectItem>
              <SelectItem value="Bus-Coach">Coach</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Fuel Type Radio Buttons */}
      <div>
        <label className="block text-sm font-medium mb-2 text-muted-foreground">
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
            <span className="ml-2 text-sm font-medium">Unknown</span>
          </label>
        </div>
      </div>

      {/* Distance and Passengers Inputs */}
      <div className="grid md:grid-cols-1 gap-4">
        {/* Enhanced Distance Input with Unit Selector */}
        <div>
          <label className="block text-sm font-medium mb-2 text-muted-foreground">
            Distance
          </label>
          <div className="flex justify-between items-center w-full rounded-md border border-input h-10 bg-background px-3 py-2 text-sm">
            <Car className="h-4 w-4 text-muted-foreground" />
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
              className="bg-transparent focus:outline-none"
            />
            <div className="flex items-center ml-2">
              <div className="h-5 w-px bg-border mx-2"></div>
              <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                <SelectTrigger className="h-auto p-0 border-0 shadow-none focus:ring-0 focus:ring-transparent gap-1">
                  <SelectValue placeholder="km" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="km">km</SelectItem>
                  <SelectItem value="mi">miles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* {distanceUnit === "mi" && (
            <p className="text-xs text-muted-foreground mt-1">
              ≈ {(transportDetails.distance * 1.60934).toFixed(2)} km
            </p>
          )} */}
        </div>

        {/* Passengers Input */}
        <div>
          <label className="block text-sm font-medium mb-2 text-muted-foreground">
            Total Passengers
          </label>
          <div className="flex items-center w-full rounded-md border border-input h-10 bg-background px-4 py-2 text-sm">
            <Users className="h-4 w-4 mr-4" />
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
              className="mx-4 w-12 text-center bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Error message display */}
      {error && (
        <div className="mt-4 text-sm text-red-500">
          {error}
        </div>
      )}

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        disabled={loading}
        className={`w-full bg-primary text-primary-foreground py-3 rounded-md flex items-center justify-center text-sm font-medium mt-6 ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
    </>
  );
};

export default TransportCalculatorLeft;