import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  Plane,
  CalendarDays,
  BadgePercent,
  Leaf,
  HelpCircle,
  Home,
  Car,
  TreePine,
  Users,
  Droplet,
  Shell,
  Wind,
  CheckCircle,
  Flame,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { flightDetails } from "./dummyFlightData";

const getEmissionsInMetricTons = (emissionsValue) => {
  if (!emissionsValue) return 0;
  const numericValue = parseFloat(emissionsValue.replace(/[^0-9.]/g, ""));
  return numericValue / 1000;
};

const getEmissionCategory = (emissionsInTons) => {
  if (!emissionsInTons) return { category: "unknown", color: "gray" };

  if (emissionsInTons < 0.1) return { category: "Low", color: "green-500" };
  if (emissionsInTons >= 0.1 && emissionsInTons < 0.2)
    return { category: "Moderate", color: "yellow-500" };
  return { category: "High", color: "red-500" };
};

const SidebarBooking = ({
  showEmissionsDetails,
  setShowEmissionsDetails,
  selectedCoupon,
}) => {
  const formatCurrency = (amount, currency = "BDT") => {
    return `${amount.toLocaleString()} ${currency}`;
  };

  const emissionsInTons = getEmissionsInMetricTons(
    flightDetails.emissionsValue
  );
  const emissionCategory = getEmissionCategory(emissionsInTons);

  // Calculate carbon data metrics
  const carbonData = {
    totalEmissions: emissionsInTons,
    treesRequired: Math.ceil(emissionsInTons * 20),
    homeEquivalent: Math.ceil(emissionsInTons / 8.6),
    carEquivalent: Math.ceil(emissionsInTons / 4.6),
    airQualityImprovement: Math.ceil(emissionsInTons * 0.16),
    waterSaved: Math.ceil(emissionsInTons * 8000),
    speciesProtected: Math.ceil(emissionsInTons * 0.37),
  };

  return (
    <>
      <div className="w-96">
        <Card className="p-6 sticky top-4">
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <h3 className="font-semibold">Flight Summary</h3>
            </div>

            {/* Flight Route Summary */}
            <div className="flex items-center justify-between gap-2 bg-blue-50 p-2 rounded-md">
              <div className="flex items-center gap-4">
                <span className="font-medium text-sm">DAC</span>
                <Plane className="h-4 w-4 text-blue-500" />
                <span className="font-medium text-sm">DXB</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-500 h-6 px-2"
              >
                Details
              </Button>
            </div>

            {/* Airline Info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-md">
                <Image
                  src={flightDetails.logo}
                  alt={flightDetails.airline}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{flightDetails.airline}</p>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                    {flightDetails.id}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {flightDetails.cabinClass}
                </p>
              </div>
            </div>

            <Separator />

            {/* Flight Details */}
            <div>
              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <div className="absolute top-4 left-2 h-24 border-l-2 border-dashed border-gray-300"></div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-4">
                      <p className="font-medium">
                        {flightDetails.departure.airport}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{flightDetails.departure.time}</span>
                        <span>•</span>
                        <CalendarDays className="h-4 w-4" />
                        <span>{flightDetails.departure.date}</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {flightDetails.departure.terminal}
                      </p>
                    </div>
                  </div>
                </div>

                {flightDetails.stops.count > 0 && (
                  <div className="flex items-start gap-4 mt-4">
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                      <div className="absolute top-4 left-2 h-12 border-l-2 border-dashed border-gray-300"></div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-4">
                        <p className="font-medium">
                          {flightDetails.stops.airport}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>Layover {flightDetails.stops.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4 mt-4">
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1">
                    <div>
                      <p className="font-medium">
                        {flightDetails.arrival.airport}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{flightDetails.arrival.time}</span>
                        <span>•</span>
                        <CalendarDays className="h-4 w-4" />
                        <span>{flightDetails.arrival.date}</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {flightDetails.arrival.terminal}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* duration */}
              <div className="mt-4 bg-gray-50 p-3 rounded-md">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Total duration</p>
                  <p className="text-sm font-medium">
                    {flightDetails.duration}
                  </p>
                </div>
              </div>

              {/* CO2 Emissions */}
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`flex items-center gap-1 text-${emissionCategory.color}`}
                  >
                    {emissionCategory.category === "Low" && (
                      <CheckCircle className="h-4 w-4 mr-1" />
                    )}{" "}
                    {emissionCategory.category === "Moderate" && (
                      <AlertCircle className="h-4 w-4 mr-1" />
                    )}
                    {emissionCategory.category === "High" && (
                      <Flame className="h-4 w-4 mr-1" />
                    )}
                    <span
                      className={`text-sm font-medium text-${emissionCategory.color}`}
                    >
                      {emissionCategory.category} CO2 emissions (
                      {emissionsInTons.toFixed(2)} MT)
                    </span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-blue-500"
                          onClick={() =>
                            setShowEmissionsDetails(!showEmissionsDetails)
                          }
                        >
                          Details
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          See environmental impact details
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {showEmissionsDetails && (
                  <div
                    className={`mt-2 bg-${emissionCategory.color}/10 p-4 rounded-md space-y-4`}
                  >
                    <div>
                      <h5
                        className={`text-sm font-medium mb-2 flex items-center`}
                      >
                        <Leaf className="h-4 w-4 mr-1" />
                        Environmental Impact
                      </h5>
                      <p className="text-sm text-gray-700 mb-3">
                        This flight produces {flightDetails.emissionsValue} of
                        CO<sub>2</sub>, which is{" "}
                        {emissionCategory.category.toLowerCase()} compared to
                        the average for this route.
                      </p>

                      {/* impact metrics*/}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between pb-1">
                          <div className="flex items-center gap-2">
                            <Home className="h-4 w-4 text-red-500" />
                            <span className="text-sm text-gray-600">
                              Home Energy Equiv.
                            </span>
                          </div>
                          <p className="text-sm font-semibold">
                            {carbonData.homeEquivalent} homes
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-200 pb-1">
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4 text-red-500" />
                            <span className="text-sm text-gray-600">
                              Car Equivalent
                            </span>
                          </div>
                          <p className="text-sm font-semibold">
                            {carbonData.carEquivalent} cars
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-200 pb-1">
                          <div className="flex items-center gap-2">
                            <TreePine className="h-4 w-4 text-primary" />
                            <span className="text-sm text-gray-600">
                              Trees Needed
                            </span>
                          </div>
                          <p className={`text-sm font-semibold`}>
                            {carbonData.treesRequired}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Droplet className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-gray-600">
                              Water Impact
                            </span>
                          </div>
                          <p className="text-sm font-semibold">
                            {(carbonData.waterSaved / 1000).toFixed(1)}k L
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Wind className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-gray-600">
                              Air Quality Improvement
                            </span>
                          </div>
                          <p className="text-sm font-semibold">
                            {carbonData.airQualityImprovement.toFixed(1)}%
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Shell className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-gray-600">
                              Species Protected
                            </span>
                          </div>
                          <p className="text-sm font-semibold">
                            {carbonData.speciesProtected}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* offset options*/}
                    <div>
                      <h5
                        className={`text-sm font-medium mb-2 flex items-center`}
                      >
                        <Users className="h-4 w-4 mr-1" />
                        Offset Options
                      </h5>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between px-2 py-1 rounded hover:bg-white/60 transition-colors">
                          <div className="flex items-center gap-2">
                            <TreePine className="h-4 w-4 text-primary" />
                            <span className="text-sm">
                              Reforestation Project
                            </span>
                          </div>
                          <p className="text-sm font-medium">
                            {formatCurrency(Math.ceil(emissionsInTons * 500))}
                          </p>
                        </div>

                        <div className="flex items-center justify-between px-2 py-1 rounded hover:bg-white/60 transition-colors">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">
                              Community Clean Energy
                            </span>
                          </div>
                          <p className="text-sm font-medium">
                            {formatCurrency(Math.ceil(emissionsInTons * 650))}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className={`w-full bg-${emissionCategory.color} hover:bg-${emissionCategory.color}/90 text-white`}
                    >
                      Offset Your Carbon Emission
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Fare */}
            <div>
              <h4 className="font-medium mb-2">Price Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <span>Base Fare</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">
                            Basic ticket price without taxes and fees
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                  <span>{formatCurrency(flightDetails.price.current)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxes & Fees</span>
                  <span>{formatCurrency(5000)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Convenience Fee</span>
                  <span>{formatCurrency(1500)}</span>
                </div>
                {selectedCoupon && (
                  <div className="flex justify-between text-sm text-primary">
                    <span className="flex items-center gap-1">
                      <BadgePercent className="h-4 w-4" />
                      Discount Applied
                    </span>
                    <span>-{formatCurrency(3400)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-lg">
                    {formatCurrency(
                      flightDetails.price.current + 5000 + 1500 - 3400
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Baggage */}
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">Baggage Allowance</span>
                <span className="text-sm text-gray-500">
                  {flightDetails.baggage}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default SidebarBooking;
