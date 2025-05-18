import React from "react";
import { Filter } from "lucide-react";
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
import { timeFilterOptions, mockFlights } from "./dummyFlightData";

const FlightFilters = ({
  applyFilters,
  handleAirlineChange,
  handleStopChange,
  formatCurrency,
  formatDuration,
  priceRange,
  setPriceRange,
  selectedAirlines,
  selectedStops,
  durationFilter,
  setDurationFilter,
}) => {
  const airlines = [...new Set(mockFlights.map((flight) => flight.airline))];

  return (
    <>
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
                  <div key={stop} className="flex items-center justify-between">
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
                          onCheckedChange={() => handleAirlineChange(airline)}
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
                            <Label htmlFor={option.id}>{option.label}</Label>
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
                            <Label htmlFor={option.id}>{option.label}</Label>
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
    </>
  );
};

export default FlightFilters;
