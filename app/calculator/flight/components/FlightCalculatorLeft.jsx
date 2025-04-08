/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from "react";
import { debounce } from "lodash";
import { ComboBox } from "../../../../components/ui/calculator-combobox";
import { Calculator, Users } from "lucide-react";
import qs from "qs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FlightCalculatorLeft = ({
  setCalculated,
  flightDetails,
  setFlightDetails,
  setEmissionData,
}) => {
  const [fromAirports, setFromAirports] = useState([]);
  const [toAirports, setToAirports] = useState([]);
  const [loading, setLoading] = useState({ from: false, to: false });
  const [error, setError] = useState({ from: null, to: null });
  const [calculating, setCalculating] = useState(false);

  const fetchAirports = async (keyword = "", fieldType = "from") => {
    setLoading((prev) => ({ ...prev, [fieldType]: true }));
    setError((prev) => ({ ...prev, [fieldType]: null }));
    try {
      const query = qs.stringify({ keyword });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/airAPI/airport-list-by-keyword?${query}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Data :: ", data);
      const formattedData = data.result.map((airport) => ({
        value: airport.iataCode,
        label: `${airport.locationName} (${airport.iataCode})`,
      }));
      if (fieldType === "from") {
        setFromAirports(formattedData);
      } else {
        setToAirports(formattedData);
      }
    } catch (error) {
      setError((prev) => ({ ...prev, [fieldType]: error.message }));
      console.log("error :: ", error);
    } finally {
      setLoading((prev) => ({ ...prev, [fieldType]: false }));
    }
  };

  const debouncedFromAirports = useCallback(
    debounce((keyword) => {
      fetchAirports(keyword, "from");
    }, 300),
    []
  );

  const debouncedToAirports = useCallback(
    debounce((keyword) => {
      fetchAirports(keyword, "to");
    }, 300),
    []
  );

  const aircraftTypes = [
    { id: 9, value: "B777", label: "B777 - Boeing 777 (Long-haul)" },
    { id: 10, value: "A380", label: "A380 - Airbus A380 (Super Jumbo)" },
    { id: 11, value: "B787", label: "B787 - Boeing 787 Dreamliner" },
    { id: 12, value: "A320", label: "A320 - Airbus A320 (Short-haul)" },
    { id: 13, value: "B737", label: "B737 - Boeing 737" },
    { id: 14, value: "A350", label: "A350 - Airbus A350" },
    { id: 15, value: "E190", label: "E190 - Embraer 190" },
    { id: 16, value: "A220", label: "A220 - Airbus A220" },
    { id: 17, value: "CRJ9", label: "CRJ9 - Bombardier CRJ900" },
    { id: 18, value: "ERJ175", label: "ERJ175 - Embraer ERJ 175" },
    { id: 19, value: "ATR72", label: "ATR72 - ATR 72" },
  ];

  const handleCalculate = async () => {
    try {
      setCalculating(true);

      const requestData = {
        user_id: "1adfdf",
        iata_airport_from: flightDetails.from,
        iata_airport_to: flightDetails.to,
        number_of_passengers: flightDetails.passengers,
        flight_class: mapFlightClass(flightDetails.class),
        round_trip: flightDetails.tripType === "roundTrip" ? "Y" : "N",
        aircraft_type: flightDetails.aircraft,
      };

      console.log("requestData :: ", requestData);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/airAPI/carbon-emission`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data response :::: ", data);
      setEmissionData(data);
      setCalculated(true);
    } catch (error) {
      console.error("Error calculating emissions:", error);
      setError(error.message);
    } finally {
      setCalculating(false);
    }
  };

  const mapFlightClass = (classType) => {
    switch (classType) {
      case "economy":
        return "Economy";
      case "premium":
        return "Premium";
      case "business":
        return "Business";
      case "first":
        return "First";
      default:
        return "rapid_do_not_include_in_request_key";
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {/* Flying From Combo Box */}
        <ComboBox
          options={fromAirports}
          value={flightDetails.from}
          label="Flying From"
          placeholder="Select airport..."
          searchPlaceholder="Search airport..."
          emptyText={
            loading
              ? "Loading..."
              : error
              ? "Error loading airports"
              : "No airport found."
          }
          onSelect={(value) =>
            setFlightDetails((prev) => ({ ...prev, from: value }))
          }
          onSearch={(keyword) => debouncedFromAirports(keyword)}
        />

        {/* Flying To Combo Box */}
        <ComboBox
          options={toAirports}
          value={flightDetails.to}
          label="Flying To"
          placeholder="Select airport..."
          searchPlaceholder="Search airport..."
          emptyText={
            loading
              ? "Loading..."
              : error
              ? "Error loading airports"
              : "No airport found."
          }
          onSelect={(value) =>
            setFlightDetails((prev) => ({ ...prev, to: value }))
          }
          onSearch={(keyword) => debouncedToAirports(keyword)}
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
                setFlightDetails({ ...flightDetails, tripType: "roundTrip" })
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
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {[
            { id: "economy", label: "Economy" },
            { id: "premium", label: "Premium" },
            { id: "business", label: "Business" },
            { id: "first", label: "First Class" },
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
                  setFlightDetails((prev) => ({ ...prev, class: classType.id }))
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
        {/* Aircraft Type */}
        <div>
          <label className="block text-sm font-medium mb-2 text-muted-foreground">
            Aircraft Type
          </label>
          <Select
            value={flightDetails.aircraft}
            onValueChange={(value) =>
              setFlightDetails((prev) => ({ ...prev, aircraft: value }))
            }
          >
            <SelectTrigger className="w-full focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Select aircraft..." />
            </SelectTrigger>
            <SelectContent>
              {aircraftTypes.map((aircraft) => (
                <SelectItem key={aircraft.id} value={aircraft.value}>
                  {aircraft.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
              className="mx-4 w-12 text-center bg-transparent"
              value={flightDetails.passengers}
              onChange={(e) =>
                setFlightDetails((prev) => ({
                  ...prev,
                  passengers: Math.max(1, Number(e.target.value)),
                }))
              }
            />
          </div>
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="w-full bg-primary text-primary-foreground py-3 rounded-md flex items-center justify-center text-sm font-medium mt-6"
      >
        {calculating ? (
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
    </>
  );
};

export default FlightCalculatorLeft;
