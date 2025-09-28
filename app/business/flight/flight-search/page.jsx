/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Plane, AlertCircle, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockFlights } from "./components/dummyFlightData";
import FlightFilters from "./components/flight-filters";
import FlightAirlineDetails from "./components/flight-airline-details";

export default function FlightSearchResults() {
  const searchParams = useSearchParams();
  const [sortOption, setSortOption] = useState("cheapest");
  const [priceRange, setPriceRange] = useState([60000, 125000]);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);
  const [durationFilter, setDurationFilter] = useState(720);
  const [filteredFlights, setFilteredFlights] = useState(mockFlights);

  const tripType = searchParams.get("tripType") || "roundTrip";

  const getValidValue = (val, fallback) =>
    val !== null && val.trim() !== "" ? val : fallback;

  const origin = getValidValue(searchParams.get("origin"), "Not specified");
  const destination = getValidValue(
    searchParams.get("destination"),
    "Not specified"
  );
  const departDate = getValidValue(searchParams.get("depart"), "Not selected");
  console.log("departDate :: ", departDate);
  const returnDate =
    tripType === "roundTrip"
      ? getValidValue(searchParams.get("return"), "Not selected")
      : "";

  const adultCount = parseInt(searchParams.get("adult") || "1", 10);
  const flightClass = getValidValue(searchParams.get("class"), "Economy");

  const formatDisplayDate = (dateString) => {
    if (!dateString || dateString === "Not selected") return dateString;

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid date";

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return date.toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  // filtering flights
  const applyFilters = () => {
    let filtered = [...mockFlights];

    // filtering by airlines
    if (selectedAirlines.length > 0) {
      filtered = filtered.filter((flight) =>
        selectedAirlines.includes(flight.airline)
      );
    }

    // filtering by stops
    if (selectedStops.length > 0) {
      filtered = filtered.filter((flight) => {
        if (selectedStops.includes("Non Stop") && flight.stops.count === 0)
          return true;
        if (selectedStops.includes("1 Stop") && flight.stops.count === 1)
          return true;
        if (selectedStops.includes("2+ Stops") && flight.stops.count >= 2)
          return true;
        return false;
      });
    }

    // filtering by price range
    filtered = filtered.filter(
      (flight) =>
        flight.price.current >= priceRange[0] &&
        flight.price.current <= priceRange[1]
    );

    // filtering by duration
    filtered = filtered.filter((flight) => {
      const durationStr = flight.duration;
      const hours = parseInt(durationStr.split("hr")[0]);
      const minutes = parseInt(
        durationStr.split("hr")[1].replace("min", "").trim()
      );
      const totalMinutes = hours * 60 + minutes;
      return totalMinutes <= durationFilter;
    });

    // sorting by selected option
    switch (sortOption) {
      case "cheapest":
        filtered.sort((a, b) => a.price.current - b.price.current);
        break;
      case "best":
        filtered.sort((a, b) => b.score - a.score);
        break;
      case "quickest":
        filtered.sort((a, b) => {
          const getDurationMinutes = (dur) => {
            const hours = parseInt(dur.split("hr")[0]);
            const minutes = parseInt(
              dur.split("hr")[1].replace("min", "").trim()
            );
            return hours * 60 + minutes;
          };
          return (
            getDurationMinutes(a.duration) - getDurationMinutes(b.duration)
          );
        });
        break;
      default:
        filtered.sort((a, b) => a.price.current - b.price.current);
    }

    setFilteredFlights(filtered);
  };

  const handleAirlineChange = (airline) => {
    setSelectedAirlines((prev) =>
      prev.includes(airline)
        ? prev.filter((a) => a !== airline)
        : [...prev, airline]
    );
  };

  const handleStopChange = (stop) => {
    setSelectedStops((prev) =>
      prev.includes(stop) ? prev.filter((s) => s !== stop) : [...prev, stop]
    );
  };

  const formatCurrency = (amount, currency = "Tk") => {
    return `${currency} ${amount.toLocaleString()}`;
  };

  // time formatter
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}hr ${mins}min`;
  };

  useEffect(() => {
    applyFilters();
  }, [selectedAirlines, selectedStops, priceRange, durationFilter, sortOption]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-2">
        <div className="mb-6 bg-secondary text-white rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">
                {origin} → {destination}
                {tripType === "roundTrip" && ` → ${origin}`}
              </h2>
              <p className="text-sm">
                {formatDisplayDate(departDate)}
                {tripType === "roundTrip" &&
                  returnDate &&
                  ` — ${formatDisplayDate(returnDate)}`}
                {` • ${adultCount} ${adultCount > 1 ? "Adults" : "Adult"}`}
                {` • ${flightClass}`}
              </p>
            </div>
            <Button
              variant="outline"
              className="border-white bg-secondary text-white hover:text-white hover:bg-blue-600"
            >
              Change Search
            </Button>
          </div>
        </div>

        {/* Sorting Tabs */}
        <div className="mb-6">
          <Tabs
            defaultValue="cheapest"
            onValueChange={setSortOption}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 w-full max-w-md bg-white">
              <TabsTrigger
                value="cheapest"
                className="data-[state=active]:bg-secondary data-[state=active]:text-white"
              >
                Cheapest
                <span className="ml-2 text-xs data-[state=active]:bg-secondary data-[state=active]:text-white">
                  {formatCurrency(
                    Math.min(...mockFlights.map((f) => f.price.current))
                  )}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="best"
                className="data-[state=active]:bg-secondary data-[state=active]:text-white"
              >
                Best
                <span className="ml-2 text-sm data-[state=active]:bg-secondary data-[state=active]:text-white">
                  Value
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="quickest"
                className="data-[state=active]:bg-secondary data-[state=active]:text-white"
              >
                Quickest
                <span className="ml-2 text-xs data-[state=active]:bg-secondary data-[state=active]:text-white">
                  {
                    mockFlights.sort((a, b) => {
                      const getMinutes = (dur) => {
                        const hours = parseInt(dur.split("hr")[0]);
                        const minutes = parseInt(
                          dur.split("hr")[1].replace("min", "").trim()
                        );
                        return hours * 60 + minutes;
                      };
                      return getMinutes(a.duration) - getMinutes(b.duration);
                    })[0].duration
                  }
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex gap-6">
          {/* Filters Section */}
          <FlightFilters
            applyFilters={applyFilters}
            handleAirlineChange={handleAirlineChange}
            handleStopChange={handleStopChange}
            formatCurrency={formatCurrency}
            formatDuration={formatDuration}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedAirlines={selectedAirlines}
            selectedStops={selectedStops}
            durationFilter={durationFilter}
            setDurationFilter={setDurationFilter}
          />

          {/* Flight Results */}
          <div className="flex-1">
            <div className="space-y-4">
              {filteredFlights.length === 0 ? (
                <Card className="p-8 text-center">
                  <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No flights match your filters
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your filters to see more results
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedAirlines([]);
                      setSelectedStops([]);
                      setPriceRange([60000, 125000]);
                      setDurationFilter(720);
                    }}
                  >
                    Reset Filters
                  </Button>
                </Card>
              ) : (
                filteredFlights.map((flight, index) => (
                  <FlightAirlineDetails
                    key={index}
                    flight={flight}
                    formatCurrency={formatCurrency}
                  />
                ))
              )}

              {/* Pagination */}
              {filteredFlights.length > 0 && (
                <div className="flex justify-center mt-6">
                  <Button variant="outline" className="mx-1">
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    className="mx-1 bg-secondary text-white"
                  >
                    1
                  </Button>
                  <Button variant="outline" className="mx-1">
                    2
                  </Button>
                  <Button variant="outline" className="mx-1">
                    3
                  </Button>
                  <Button variant="outline" className="mx-1">
                    Next
                  </Button>
                </div>
              )}

              {/* Track Prices */}
              <Card className="p-4 border-blue-200 bg-blue-50 mt-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Bell className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Track prices</h4>
                      <p className="text-sm text-gray-600">
                        Get notified when prices change for this route
                      </p>
                    </div>
                  </div>
                  <Button className="bg-white text-secondary border border-blue-200 hover:bg-blue-50">
                    Get alerts
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
