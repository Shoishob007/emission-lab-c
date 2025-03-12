import React, { useState, useEffect } from "react";
import { ComboBox } from "../../../components/ui/combobox";
import { Calculator, Users } from "lucide-react";
import qs from "qs";

const CalculatorLeft = ({ setCalculated, flightDetails, setFlightDetails }) => {
  const [fromAirports, setFromAirports] = useState([]);
  const [toAirports, setToAirports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAirports = async (keyword = "") => {
    setLoading(true);
    setError(null);
    try {
      const query = qs.stringify({ keyword });
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/airAPI/airport-list-by-keyword?${query}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const formattedData = data.result.data.map((airport) => ({
        value: airport.iata_code,
        label: `${airport.airport_name} (${airport.iata_code})`,
      }));
      setFromAirports(formattedData);
      setToAirports(formattedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAirports();
  }, []);

  const aircraftTypes = [
    { id: 9, value: "B777", label: "B777 - Long-haul" },
    { id: 10, value: "A380", label: "A380 - Super Jumbo" },
    { id: 11, value: "B787", label: "B787 - Dreamliner" },
    { id: 12, value: "A320", label: "A320 - Short-haul" },
  ];

  const handleCalculate = () => {
    setCalculated(true);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        {/* Flying From Combo Box */}
        <ComboBox
          options={fromAirports}
          value={flightDetails.from}
          label="Flying From"
          placeholder="Select airport..."
          searchPlaceholder="Search airport..."
          emptyText={loading ? "Loading..." : error ? "Error loading airports" : "No airport found."}
          onSelect={(value) => setFlightDetails((prev) => ({ ...prev, from: value }))}
          onSearch={(keyword) => fetchAirports(keyword)}
        />

        {/* Flying To Combo Box */}
        <ComboBox
          options={toAirports}
          value={flightDetails.to}
          label="Flying To"
          placeholder="Select airport..."
          searchPlaceholder="Search airport..."
          emptyText={loading ? "Loading..." : error ? "Error loading airports" : "No airport found."}
          onSelect={(value) => setFlightDetails((prev) => ({ ...prev, to: value }))}
          onSearch={(keyword) => fetchAirports(keyword)}
        />
      </div>

      {/* Trip Details */}
      <div>
        <label className="block text-sm font-medium mb-2 text-muted-foreground">
          Trip Details
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center px-4 py-2 rounded-md cursor-pointer">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-secondary"
              checked={flightDetails.tripType === "oneWay"}
              onChange={() => setFlightDetails({ ...flightDetails, tripType: "oneWay" })}
            />
            <span className="ml-2 text-sm font-medium">One Way</span>
          </label>
          <label className="flex items-center px-4 py-2 rounded-md cursor-pointer">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-secondary"
              checked={flightDetails.tripType === "roundTrip"}
              onChange={() => setFlightDetails({ ...flightDetails, tripType: "roundTrip" })}
            />
            <span className="ml-2 text-sm font-medium">Round Trip</span>
          </label>
        </div>
      </div>

      {/* Class Details */}
      <div>
        <label className="block text-sm font-medium mb-2 text-muted-foreground">
          Class Details
        </label>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {[
            { id: "business", label: "Business" },
            { id: "economy", label: "Economy" },
            { id: "firstClass", label: "First Class" },
          ].map((classType) => (
            <label
              key={classType.id}
              className="flex items-center px-4 py-2 rounded-md cursor-pointer"
            >
              <input
                type="radio"
                className="form-radio h-4 w-4 text-secondary"
                checked={flightDetails.class === classType.id}
                onChange={() => setFlightDetails({ ...flightDetails, class: classType.id })}
              />
              <span className="ml-2 text-sm font-medium">{classType.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Aircraft Type and Passengers */}
      <div className="grid md:grid-cols-2 gap-4">
        <ComboBox
          options={aircraftTypes}
          value={flightDetails.aircraft}
          label="Aircraft Type"
          placeholder="Select aircraft..."
          searchPlaceholder="Search aircraft..."
          emptyText="No aircraft found."
          onSelect={(value) => setFlightDetails((prev) => ({ ...prev, aircraft: value }))}
        />

        {/* Passengers Input */}
        <div>
          <label className="block text-sm font-medium mb-2 text-muted-foreground">
            Total Passengers
          </label>
          <div className="flex items-center w-full rounded-md border border-input bg-background px-4 py-2 text-sm">
            <Users className="h-4 w-4 mr-4" />
            <input
              type="number"
              className="w-full bg-transparent focus:outline-none"
              value={flightDetails.passengers}
              onChange={(e) => setFlightDetails({ ...flightDetails, passengers: parseInt(e.target.value) || 1 })}
              min="1"
            />
          </div>
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="w-full bg-primary text-primary-foreground py-3 rounded-md flex items-center justify-center text-sm font-medium mt-6"
      >
        <Calculator className="h-4 w-4 mr-2" />
        Calculate
      </button>
    </>
  );
};

export default CalculatorLeft;