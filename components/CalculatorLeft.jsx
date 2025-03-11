import React, { useState } from "react";
import { ComboBox } from "./ui/combobox";
import { Calculator, Users } from "lucide-react";

const CalculatorLeft = ({setCalculated}) => {
  const [flightDetails, setFlightDetails] = useState({
    from: "",
    to: "",
    tripType: "oneWay",
    class: "economy",
    aircraft: "",
    passengers: 1,
  });

  const dummyApiResponse = {
    result: {
      data: [
        {
          airport_name: "Hazrat Shahjalal International Airport",
          iata_code: "DAC",
        },
        {
          airport_name: "Dachuan Airport",
          iata_code: "DAX",
        },
        {
          airport_name: "Fundación Airport",
          iata_code: "FDA",
        },
        {
          airport_name: "Adirondack Regional Airport",
          iata_code: "SLK",
        },
        {
          airport_name: "Los Angeles International Airport",
          iata_code: "LAX",
        },
        {
          airport_name: "New York JFK Airport",
          iata_code: "JFK",
        },
        {
          airport_name: "San Francisco International Airport",
          iata_code: "SFO",
        },
        {
          airport_name: "Chicago O'Hare International Airport",
          iata_code: "ORD",
        },
        {
          airport_name: "Dubai International Airport",
          iata_code: "DXB",
        },
        {
          airport_name: "London Heathrow Airport",
          iata_code: "LHR",
        },
        {
          airport_name: "Tokyo Haneda Airport",
          iata_code: "HND",
        },
      ],
      status: 200,
      success: true,
    },
    timestamp: "2025-03-04T08:42:44.613217",
  };

  // Format data for ComboBox
  const fromAirports = dummyApiResponse.result.data.map((airport) => ({
    value: airport.iata_code,
    label: `${airport.airport_name} (${airport.iata_code})`,
  }));

  const toAirports = fromAirports;

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
      emptyText="No airport found."
      onSelect={(value) =>
        setFlightDetails((prev) => ({ ...prev, from: value }))
      }
    />

        {/* Flying To Combo Box */}
        <ComboBox
      options={toAirports}
      value={flightDetails.to}
      label="Flying To"
      placeholder="Select airport..."
      searchPlaceholder="Search airport..."
      emptyText="No airport found."
      onSelect={(value) =>
        setFlightDetails((prev) => ({ ...prev, to: value }))
      }
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
              onChange={() =>
                setFlightDetails({ ...flightDetails, tripType: "oneWay" })
              }
            />
            <span className="ml-2 text-sm font-medium">One Way</span>
          </label>
          <label className="flex items-center px-4 py-2 rounded-md cursor-pointer">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-secondary"
              checked={flightDetails.tripType === "roundTrip"}
              onChange={() =>
                setFlightDetails({
                  ...flightDetails,
                  tripType: "roundTrip",
                })
              }
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
        <div className="flex flex-wrap gap-3">
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
                onChange={() =>
                  setFlightDetails({
                    ...flightDetails,
                    class: classType.id,
                  })
                }
              />
              <span className="ml-2 text-sm font-medium">
                {classType.label}
              </span>
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
          onSelect={(value) =>
            setFlightDetails((prev) => ({ ...prev, aircraft: value }))
          }
        />

        {/* Passengers Input */}
        <div>
          <label className="block text-sm font-medium mb-2 text-muted-foreground">
            Total Passengers
          </label>
          <div className="flex items-center w-full rounded-md border border-input bg-background px-3 py-3 text-sm">
            <Users className="h-4 w-4 mr-4" />
            <input
              type="number"
              className="w-full bg-transparent focus:outline-none"
              value={flightDetails.passengers}
              onChange={(e) =>
                setFlightDetails({
                  ...flightDetails,
                  passengers: parseInt(e.target.value) || 1,
                })
              }
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
