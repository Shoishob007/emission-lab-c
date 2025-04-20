/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Filter,
  Plane,
  CalendarDays,
  Luggage,
  BadgePercent,
  ChevronDown,
  Star,
  AlertCircle,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { timeFilterOptions, mockFlights } from "./components/dummyFlightData";
import EmiratesLogo from "@/public/airline-logos/Emirates.svg";
import QatarLogo from "@/public/airline-logos/Qatar_Airways.svg";
import TurkishLogo from "@/public/airline-logos/Turkish_Airlines.svg";
import LufthansaLogo from "@/public/airline-logos/Lufthansa.svg";
import BritishLogo from "@/public/airline-logos/British-Air.svg";
import AmericanLogo from "@/public/airline-logos/American_Airlines.svg";
import BangladeshBimanLogo from "@/public/airline-logos/Biman_Bangladesh_Airlines.svg";
import DeltaLogo from "@/public/airline-logos/Delta_Airlines.svg";
import Image from "next/image";

export default function FlightSearchResults() {
  const searchParams = useSearchParams();
  const [sortOption, setSortOption] = useState("cheapest");
  const [priceRange, setPriceRange] = useState([60000, 125000]);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);
  const [durationFilter, setDurationFilter] = useState(720);
  const [filteredFlights, setFilteredFlights] = useState(mockFlights);

  const airlineLogos = {
    Emirates: EmiratesLogo,
    "Qatar Airways": QatarLogo,
    "Turkish Airlines": TurkishLogo,
    Lufthansa: LufthansaLogo,
    "British Airways": BritishLogo,
    "Biman Bangladesh Airlines": BangladeshBimanLogo,
    "American Airlines": AmericanLogo,
    "Delta Airlines": DeltaLogo,
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

  const airlines = [...new Set(mockFlights.map((flight) => flight.airline))];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-2">
        <div className="mb-6 bg-secondary text-white rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Plane className="h-5 w-5" />
              <div>
                <h2 className="text-lg font-bold">JFK - DUB</h2>
                <p className="text-sm">7 May - 8 May • 1 Adult • Economy</p>
              </div>
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
            <TabsList className="grid grid-cols-3 w-full max-w-md">
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
          <div className="w-80 flex-shrink-0">
            <Card className="p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Filter className="h-5 w-5" />
              </div>

              <div className="space-y-6">
                {/* Price Range Filter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Price Range</h4>
                    <span className="text-sm text-gray-500">
                      {formatCurrency(priceRange[0])} -{" "}
                      {formatCurrency(priceRange[1])}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[60000, 125000]}
                    max={125000}
                    min={60000}
                    step={1000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-4"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{formatCurrency(60000)}</span>
                    <span>{formatCurrency(125000)}</span>
                  </div>
                </div>

                <Separator />

                {/* Stops Filter */}
                <div>
                  <h4 className="font-medium mb-3">Stops</h4>
                  <div className="space-y-2">
                    {["Non Stop", "1 Stop", "2+ Stops"].map((stop) => (
                      <div
                        key={stop}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={stop}
                            checked={selectedStops.includes(stop)}
                            onCheckedChange={() => handleStopChange(stop)}
                          />
                          <Label htmlFor={stop}>{stop}</Label>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {
                            mockFlights.filter((flight) => {
                              if (stop === "Non Stop")
                                return flight.stops.count === 0;
                              if (stop === "1 Stop")
                                return flight.stops.count === 1;
                              return flight.stops.count >= 2;
                            }).length
                          }
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Airlines Filter */}
                <div>
                  <h4 className="font-medium mb-3">Airlines</h4>
                  <ScrollArea className="h-40">
                    <div className="space-y-2">
                      {airlines.map((airline) => (
                        <div
                          key={airline}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={airline}
                              checked={selectedAirlines.includes(airline)}
                              onCheckedChange={() =>
                                handleAirlineChange(airline)
                              }
                            />
                            <Label htmlFor={airline}>{airline}</Label>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {
                              mockFlights.filter(
                                (flight) => flight.airline === airline
                              ).length
                            }
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <Separator />

                {/* Duration Filter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Duration</h4>
                    <span className="text-sm text-gray-500">
                      Max {formatDuration(durationFilter)}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[720]}
                    max={720}
                    min={420}
                    step={10}
                    value={[durationFilter]}
                    onValueChange={(value) => setDurationFilter(value[0])}
                    className="my-4"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>7hr</span>
                    <span>12hr</span>
                  </div>
                </div>

                <Separator />

                {/* Times Filter with Tabs */}
                <div>
                  <h4 className="font-medium mb-3">Times</h4>
                  <Tabs defaultValue="departure" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger
                        value="departure"
                        className="data-[state=active]:bg-blue-100 data-[state=active]:text-secondary"
                      >
                        Departure
                      </TabsTrigger>
                      <TabsTrigger
                        value="arrival"
                        className="data-[state=active]:bg-blue-100 data-[state=active]:text-secondary"
                      >
                        Arrival
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="departure" className="mt-0">
                      <div className="space-y-2">
                        {timeFilterOptions
                          .filter((o) => o.type === "departure")
                          .map((option) => (
                            <div
                              key={option.id}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center space-x-2">
                                <Checkbox id={option.id} />
                                <Label htmlFor={option.id}>
                                  {option.label}
                                </Label>
                              </div>
                              <span className="text-xs text-gray-500">
                                {option.time}
                              </span>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="arrival" className="mt-0">
                      <div className="space-y-2">
                        {timeFilterOptions
                          .filter((o) => o.type === "arrival")
                          .map((option) => (
                            <div
                              key={option.id}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center space-x-2">
                                <Checkbox id={option.id} />
                                <Label htmlFor={option.id}>
                                  {option.label}
                                </Label>
                              </div>
                              <span className="text-xs text-gray-500">
                                {option.time}
                              </span>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <Separator />

                {/* Additional Filters */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="refundable" className="font-medium">
                      Refundable Tickets
                    </Label>
                    <Switch id="refundable" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="direct-flights" className="font-medium">
                      Direct Flights Only
                    </Label>
                    <Switch id="direct-flights" />
                  </div>
                </div>

                <Separator />

                <Button
                  className="w-full bg-secondary hover:bg-blue-700"
                  onClick={applyFilters}
                >
                  Apply Filters
                </Button>
              </div>
            </Card>
          </div>

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
                  <Card
                    key={index}
                    className="p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Airline Info */}
                      <div className="flex flex-row md:flex-col items-center justify-between mb-4 md:mb-0">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-20 h-20 flex items-center justify-center p-1">
                            {airlineLogos[flight.airline] ? (
                              <Image
                                src={airlineLogos[flight.airline]}
                                alt={flight.airline}
                                width={70}
                                height={70}
                                className="object-contain"
                                objectFit="fill"
                              />
                            ) : (
                              <Plane className="h-4 w-4 text-secondary" />
                            )}
                          </div>
                          <p className="text-xs text-gray-400">{flight.id}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded text-blue-700 text-xs mt-2">
                          <Star className="h-3 w-3 text-secondary fill-current" />
                          <span>{flight.score}</span>
                        </div>
                      </div>

                      {/* Flight Details */}
                      <div className="flex-1 flex-col md:flex-row flex gap-4 items-start justify-between md:ml-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-6">
                            {/* Departure */}
                            <div className="min-w-24">
                              <p className="text-lg font-bold">
                                {flight.departure.time}
                              </p>
                              <p className="text-sm text-gray-600 truncate">
                                {flight.departure.airport.split(" (")[0]}
                              </p>
                              <p className="text-xs text-gray-400">
                                {flight.departure.date}
                              </p>
                            </div>

                            {/* Flight Path */}
                            <div className="flex-1 flex flex-col items-center px-2">
                              <div className="flex items-center justify-between w-full">
                                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  {flight.duration}
                                </span>
                                <span className="text-xs font-medium text-gray-500">
                                  {flight.route}
                                </span>
                              </div>
                              <div className="relative w-full h-[2px] bg-gray-300 my-2">
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-secondary"></div>
                                {flight.stops.count > 0 && (
                                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                  </div>
                                )}
                                <div className="absolute -right-1 top-1/2 transform -translate-y-1/2">
                                  <Plane className="h-4 w-4 text-secondary" />
                                </div>
                              </div>
                              <div className="text-xs text-center text-gray-500 mt-1">
                                {flight.stops.count === 0 ? (
                                  "Non-stop"
                                ) : (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <span className="flex items-center gap-1">
                                          {flight.stops.count} stop
                                          <ChevronDown className="h-3 w-3" />
                                        </span>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>{flight.stops.airport}</p>
                                        <p>Layover: {flight.stops.duration}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </div>
                            </div>

                            {/* Arrival */}
                            <div className="min-w-24">
                              <div className="flex items-center gap-1">
                                <p className="text-lg font-bold">
                                  {flight.arrival.time}
                                </p>
                              </div>
                              <p className="text-sm text-gray-600 truncate">
                                {flight.arrival.airport.split(" (")[0]}
                              </p>
                              <p className="text-xs text-gray-400">
                                {flight.arrival.date}
                              </p>
                            </div>
                          </div>

                          {/* Flight Details Badges */}
                          <div className="flex flex-wrap gap-2 mt-6 justify-center">
                            <Badge
                              variant="secondary"
                              className="text-xs flex items-center gap-1"
                            >
                              <Luggage className="h-3 w-3" />
                              {flight.baggage}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className="text-xs flex items-center gap-1"
                            >
                              <CalendarDays className="h-3 w-3" />
                              {flight.cabinClass}
                            </Badge>
                            {flight.refundable && (
                              <Badge
                                variant="secondary"
                                className="text-xs text-white bg-primary hover:bg-primary/80"
                              >
                                Refundable
                              </Badge>
                            )}
                            {flight.seats <= 10 && (
                              <Badge
                                variant="secondary"
                                className="text-xs text-white bg-red-400 hover:bg-red-400/80"
                              >
                                Only {flight.seats} seats left
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Price and Booking */}
                        <div className="mt-4 md:mt-0 flex flex-row md:flex-col justify-between items-center md:items-end">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-secondary">
                              {formatCurrency(
                                flight.price.current,
                                flight.price.currency
                              )}
                            </p>
                            {flight.price.original > flight.price.current && (
                              <p className="text-sm line-through text-gray-400">
                                {formatCurrency(
                                  flight.price.original,
                                  flight.price.currency
                                )}
                              </p>
                            )}

                            {flight.promo && (
                              <div className="flex items-center gap-1 mt-1">
                                <BadgePercent className="h-3 w-3 text-green-600" />
                                <span className="text-xs text-green-600 font-medium">
                                  {flight.promo}
                                </span>
                              </div>
                            )}
                          </div>
                          <Button
                            size="sm"
                            className="bg-secondary hover:bg-blue-600 mt-2 px-6"
                            onClick={() => {
                              // a demo search ID and sequence
                              const searchId = "DEMO" + Math.random().toString(36).substr(2, 9);
                              const sequence = Math.floor(Math.random() * 1000);
                              window.location.href = `/business/flight/flight-booking?searchId=${searchId}&sequence=${sequence}`;
                            }}
                          >
                            View Deal
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Details Section */}
                    {/* <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-between">
                        <Button
                          variant="link"
                          className="text-secondary p-0 h-auto text-sm"
                        >
                          Flight details
                        </Button>
                        <div className="flex items-center gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <CircleDollarSign className="h-4 w-4 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Price breakdown</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Clock className="h-4 w-4 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Travel time details</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div> */}
                  </Card>
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
