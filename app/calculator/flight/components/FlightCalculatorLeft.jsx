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
      console.log("Data :: ", data)
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

  // Dummy data for airports
  // const dummyAirportData = {
  //   result: {
  //     data: [
  //       { airport_name: "Hazrat Shahjalal International Airport", iata_code: "DAC" },
  //       { airport_name: "Dachuan Airport", iata_code: "DAX" },
  //       { airport_name: "Fundación Airport", iata_code: "FDA" },
  //       { airport_name: "Adirondack Regional Airport", iata_code: "SLK" },
  //     ],
  //     status: 200,
  //     success: true,
  //   },
  //   timestamp: "2025-03-04T08:42:44.613217",
  // };

  // const fetchAirports = async (keyword = "", fieldType = "from") => {
  //   setLoading((prev) => ({ ...prev, [fieldType]: true }));
  //   setError((prev) => ({ ...prev, [fieldType]: null }));

  //   setTimeout(() => {
  //     try {
  //       const data = dummyAirportData;
  //       const formattedData = data.result.data.map((airport) => ({
  //         value: airport.iata_code,
  //         label: `${airport.airport_name} (${airport.iata_code})`,
  //       }));

  //       if (fieldType === "from") {
  //         setFromAirports(formattedData);
  //       } else {
  //         setToAirports(formattedData);
  //       }
  //     } catch (error) {
  //       setError((prev) => ({ ...prev, [fieldType]: error.message }));
  //       console.log("error :: ", error);
  //     } finally {
  //       setLoading((prev) => ({ ...prev, [fieldType]: false }));
  //     }
  //   }, 300);
  // };


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
      setLoading(true);

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

      // // Reseting
      // setFlightDetails({
      //   from: "",
      //   to: "",
      //   tripType: "oneWay",
      //   class: "economy",
      //   aircraft: "",
      //   passengers: 1,
      // });
    } catch (error) {
      console.error("Error calculating emissions:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleCalculate = async () => {
  //   try {
  //     setLoading(true);

  //     const requestData = {
  //       user_id: "1adfdf",
  //       iata_airport_from: flightDetails.from,
  //       iata_airport_to: flightDetails.to,
  //       number_of_passengers: flightDetails.passengers,
  //       flight_class: mapFlightClass(flightDetails.class),
  //       round_trip: flightDetails.tripType === "roundTrip" ? "Y" : "N",
  //       aircraft_type: flightDetails.aircraft,
  //     };

  //     console.log("requestData :: ", requestData);

  //     // Commented out the actual API call
  //     // /*
  //     // const response = await fetch(
  //     //   `${process.env.NEXT_PUBLIC_API}/airAPI/carbon-emission`,
  //     //   {
  //     //     method: "POST",
  //     //     headers: {
  //     //       "Content-Type": "application/json",
  //     //     },
  //     //     body: JSON.stringify(requestData),
  //     //   }
  //     // );

  //     // if (!response.ok) {
  //     //   throw new Error(`HTTP error! status: ${response.status}`);
  //     // }

  //     // const data = await response.json();
  //     // console.log("Data response :::: ", data);
  //     // setEmissionData(data);
  //     // setCalculated(true);
  //     // */

  //     // Use dummy emission data instead
  //     const dummyEmissionData = {
  //       result: {
  //         data: {
  //           emissions: {
  //             co2e_mt: 52.345, // Example emission value in metric tons
  //           },
  //           distance_km: 8000, // Example distance in kilometers
  //           flight_class: "Average", // Example flight class
  //           round_trip: "Y", // Example trip type
  //           number_of_passengers: flightDetails.passengers, // Passengers from state
  //         },
  //       },
  //     };

  //     setEmissionData(dummyEmissionData);
  //     setCalculated(true);

  //   } catch (error) {
  //     console.error("Error calculating emissions:", error);
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const mapFlightClass = (classType) => {
    switch (classType) {
      case "economy":
        return "economy";
      case "business":
        return "business";
      case "first":
        return "first";
      default:
        return "economy";
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
            { id: "business", label: "Business" },
            { id: "economy", label: "Economy" },
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
                  setFlightDetails({ ...flightDetails, class: classType.id })
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
        <Calculator className="h-4 w-4 mr-2" />
        Calculate
      </button>
    </>
  );
};

export default FlightCalculatorLeft;
