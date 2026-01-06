/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { Calculator, Scale, Ruler } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import portsData from "sea-ports";
import { ShipCombobox } from "@/components/ui/portlist-combobox.tsx";

function haversineDistance(coord1, coord2) {
  const R = 6371; // Earth radius in km
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lon - coord1.lon);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(coord1.lat)) *
      Math.cos(toRad(coord2.lat)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in km
}

const ShipCalculatorLeft = ({
  setCalculated,
  freightDetails,
  setFreightDetails,
  setEmissionData,
  setLoading,
  loading,
}) => {
  const { data: session } = useSession();
  const [error, setError] = useState(null);

  console.log("port data :: ", portsData);

  // Convert portsData to ComboBox list
  const portsList = Object.values(portsData.JSON)
    .filter((port) => port.coordinates && port.coordinates.length === 2)
    .map((port) => ({
      value: port.unlocs?.[0] || port.code || port.name, // UNLOCODE preferred
      label: port.name,
      lat: port.coordinates[1], // latitude is second element
      lon: port.coordinates[0], // longitude is first element
    }));

  console.log("Port List : ", portsList);

  // Auto-calculate distance using haversineDistance when ports change
  useEffect(() => {
    const fromPort = portsList.find(
      (p) => p.value === freightDetails.port_of_loading
    );
    const toPort = portsList.find(
      (p) => p.value === freightDetails.destination_port
    );

    if (fromPort && toPort) {
      const dist = haversineDistance(fromPort, toPort);
      setFreightDetails((prev) => ({
        ...prev,
        distance_value: parseFloat(dist.toFixed(2)),
      }));
    }
  }, [freightDetails.port_of_loading, freightDetails.destination_port]);

  const handleCalculate = async () => {
    try {
      setLoading(true);
      setError(null);

      const userId =
        session?.user?.id?.toString() ??
        `guest-${Math.floor(100000 + Math.random() * 900000)}`;

      const requestData = {
        user_id: userId,
        transport_mode: "DeepSea",
        freight_weight: freightDetails.freight_weight,
        distance_value: freightDetails.distance_value,
        cluster_name: freightDetails.cluster_name || null,
      };

      console.log("Request Body :: ", requestData);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/carbon/freightAPI/carbon-emission/`,
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
      console.log("Result :: ", result);
      setEmissionData(result);
      setCalculated(true);
    } catch (error) {
      setError(error.message || "Failed to calculate emissions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Transport Mode */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-muted-foreground">
          Transport Mode
        </label>
        <Select value="DeepSea" disabled>
          <SelectTrigger className="w-full focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Select mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DeepSea">Deep Sea</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Shipment Type */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-muted-foreground">
          Shipment Type
        </label>
        <Select defaultValue="container">
          <SelectTrigger className="w-full focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="container">Container</SelectItem>
            <SelectItem value="bulk">Bulk</SelectItem>
            <SelectItem value="general">General Cargo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Port Selection */}
      {/* <div className="grid md:grid-cols-2 gap-4">
        <div>
          <ShipCombobox
            label="Port of Loading"
            placeholder="Select port"
            searchPlaceholder="Search port..."
            emptyText="No port found"
            options={portsList}
            value={freightDetails.port_of_loading || ""}
            onSelect={(val) =>
              setFreightDetails((prev) => ({
                ...prev,
                port_of_loading: val,
              }))
            }
          />
        </div>
        <div>
          <ShipCombobox
            label="Destination Port"
            placeholder="Select port"
            searchPlaceholder="Search port..."
            emptyText="No port found"
            options={portsList}
            value={freightDetails.destination_port || ""}
            onSelect={(val) =>
              setFreightDetails((prev) => ({
                ...prev,
                destination_port: val,
              }))
            }
          />
        </div>
      </div> */}

      {/* Freight Weight */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-muted-foreground">
          Freight Weight (kg)
        </label>
        <div className="flex justify-between items-center rounded-md border border-input h-10 bg-background px-3 py-2 text-sm">
          <div className="flex items-center w-full">
            <Scale className="h-5 w-5 text-muted-foreground mr-3" />
            <input
              type="number"
              name="freight_weight"
              value={freightDetails.freight_weight || ""}
              onChange={(e) =>
                setFreightDetails((prev) => ({
                  ...prev,
                  freight_weight: Math.max(0, Number(e.target.value)),
                }))
              }
              placeholder="Enter freight weight"
              className="bg-transparent focus:outline-none w-full placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      {/* Distance */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-muted-foreground">
          Distance (km)
        </label>
        <div className="flex justify-between items-center rounded-md border border-input h-10 bg-background px-3 py-2 text-sm">
          <div className="flex items-center w-full">
            <Ruler className="h-5 w-5 text-muted-foreground mr-3" />
            <input
              type="number"
              name="distance"
              value={freightDetails.distance_value || ""}
              onChange={(e) =>
                setFreightDetails((prev) => ({
                  ...prev,
                  distance_value: Math.max(0, Number(e.target.value)),
                }))
              }
              placeholder="Enter distance"
              className="bg-transparent focus:outline-none w-full placeholder:text-muted-foreground"
              disabled={
                freightDetails.port_of_loading &&
                freightDetails.destination_port
              }
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {error && <div className="text-sm text-red-500">{error}</div>}

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        disabled={
          !freightDetails.freight_weight ||
          !freightDetails.distance_value ||
          loading
        }
        className={`w-full bg-primary text-primary-foreground py-3 rounded-md flex items-center justify-center text-sm font-medium !mt-6 ${
          !freightDetails.freight_weight ||
          !freightDetails.distance_value ||
          loading
            ? "opacity-80 cursor-not-allowed"
            : "hover:bg-primary/90"
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

export default ShipCalculatorLeft;
