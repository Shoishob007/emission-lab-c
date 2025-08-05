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
  Loader2,
} from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { flightDetailsDummy } from "./dummyFlightData";

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
  carbonData,
  equivalentData,
  loadingEquivalent,
  carbonLoading,
  onFetchEquivalentValues,
}) => {
  const formatCurrency = (amount, currency = "$") => {
    return `${amount.toLocaleString()} ${currency}`;
  };

  const emissionsInKGs = carbonData?.emissions?.co2e_kg ?? 0;
  const emissionsInTons = carbonData?.emissions?.co2e_mt ?? 0;
  const emissionCategory = getEmissionCategory(emissionsInTons);

  const handleDetailsClick = () => {
    setShowEmissionsDetails(!showEmissionsDetails);
    if (!showEmissionsDetails && !equivalentData) {
      onFetchEquivalentValues();
    }
  };

  const getEquivalentValues = () => {
    if (!equivalentData?.environmental_impact) return null;

    const emissionFootprint =
      equivalentData.environmental_impact.emission_footprint;
    const carbonOffset =
      equivalentData.environmental_impact.carbon_offset_solutions;
    const positiveImpact =
      equivalentData.environmental_impact.positive_environmental_impact;

    return {
      homeEquivalent:
        emissionFootprint?.find((item) => item.category === "Home Energy")
          ?.emissions ?? 0,
      carEquivalent:
        emissionFootprint?.find((item) => item.category === "Transportation")
          ?.emissions ?? 0,
      treesRequired:
        carbonOffset?.find((item) => item.category === "Reforestation")
          ?.emissions ?? 0,
      communityProjects:
        carbonOffset?.find((item) => item.category === "Community Projects")
          ?.emissions ?? 0,
      airQualityImprovement:
        positiveImpact?.find((item) => item.category === "Air Quality")
          ?.emissions ?? 0,
      waterSaved:
        positiveImpact?.find((item) => item.category === "Water Saved")
          ?.emissions ?? 0,
      speciesProtected:
        positiveImpact?.find((item) => item.category === "Biodiversity")
          ?.emissions ?? 0,
    };
  };

  const equivalentValues = getEquivalentValues();

  if (carbonLoading) {
    return (
      <div className="w-96">
        <Card className="p-6 sticky top-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-center space-y-4">
              <Loader2 className="animate-spin w-8 h-8 text-blue-600 mx-auto" />
              <p className="text-sm text-gray-600">Loading flight details...</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

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
                <span className="font-medium text-sm">
                  {carbonData?.iata_airport_from || "DUB"}
                </span>
                <Plane className="h-4 w-4 text-blue-500" />
                <span className="font-medium text-sm">
                  {carbonData?.iata_airport_to || "JFK"}
                </span>
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
                  src={flightDetailsDummy.logo}
                  alt={flightDetailsDummy.airline}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{flightDetailsDummy.airline}</p>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                    {flightDetailsDummy.id}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {carbonData?.flight_class || "Economy"}
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
                        {carbonData?.airport_from ||
                          "Dublin International Airport"}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{flightDetailsDummy.departure.time}</span>
                        <span>•</span>
                        <CalendarDays className="h-4 w-4" />
                        <span>{flightDetailsDummy.departure.date}</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {flightDetailsDummy.departure.terminal}
                      </p>
                    </div>
                  </div>
                </div>

                {flightDetailsDummy.stops.count > 0 && (
                  <div className="flex items-start gap-4 mt-4">
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                      <div className="absolute top-4 left-2 h-12 border-l-2 border-dashed border-gray-300"></div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-4">
                        <p className="font-medium">
                          {flightDetailsDummy.stops.airport}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>
                            Layover {flightDetailsDummy.stops.duration}
                          </span>
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
                        {carbonData?.airport_to ||
                          flightDetailsDummy.arrival.airport}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{flightDetailsDummy.arrival.time}</span>
                        <span>•</span>
                        <CalendarDays className="h-4 w-4" />
                        <span>{flightDetailsDummy.arrival.date}</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {flightDetailsDummy.arrival.terminal}
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
                    {flightDetailsDummy.duration}
                  </p>
                </div>
                {carbonData?.distance_km && (
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm">Distance</p>
                    <p className="text-sm font-medium">
                      {carbonData.distance_km.toFixed(0)} km
                    </p>
                  </div>
                )}
              </div>

              {/* CO2 Emissions */}
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`flex items-center gap-1 text-${emissionCategory.color}`}
                  >
                    {emissionCategory.category === "Low" && (
                      <CheckCircle className="h-4 w-4 mr-1" />
                    )}
                    {emissionCategory.category === "Moderate" && (
                      <AlertCircle className="h-4 w-4 mr-1" />
                    )}
                    {emissionCategory.category === "High" && (
                      <Flame className="h-4 w-4 mr-1" />
                    )}
                    <span
                      className={`text-sm font-medium text-${emissionCategory.color}`}
                    >
                      CO2 emissions ({emissionsInKGs.toFixed(2)} KG)
                    </span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-blue-500"
                          onClick={handleDetailsClick}
                          disabled={loadingEquivalent}
                        >
                          {loadingEquivalent ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            "Details"
                          )}
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
                    {loadingEquivalent ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="text-center space-y-2">
                          <Loader2 className="animate-spin w-6 h-6 text-blue-600 mx-auto" />
                          <p className="text-sm text-gray-600">
                            Calculating environmental impact...
                          </p>
                        </div>
                      </div>
                    ) : equivalentData ? (
                      <>
                        <div>
                          <h5 className="text-base font-medium mb-2 flex items-center">
                            <Leaf className="h-4 w-4 mr-1" />
                            Environmental Impact
                          </h5>
                          {/* <p className="text-sm text-gray-700 mb-3">
                      {equivalentData.about?.understanding_carbon_footprint ||
                        `This flight produces ${emissionsInKGs.toFixed(2)} kg of CO₂, which is ${emissionCategory.category.toLowerCase()} compared to the average for this route.`}
                    </p> */}

                          {/* Impact metrics */}
                          <div className="space-y-2">
                            {equivalentValues?.homeEquivalent && (
                              <div className="flex items-center justify-between pb-1">
                                <div className="flex items-center gap-2">
                                  <Home className="h-4 w-4 text-red-500" />
                                  <span className="text-sm text-gray-600">
                                    Home Energy Equiv.
                                  </span>
                                </div>
                                <p className="text-sm font-semibold">
                                  {equivalentValues.homeEquivalent} homes
                                </p>
                              </div>
                            )}

                            {equivalentValues?.carEquivalent && (
                              <div className="flex items-center justify-between border-b border-gray-200 pb-1">
                                <div className="flex items-center gap-2">
                                  <Car className="h-4 w-4 text-red-500" />
                                  <span className="text-sm text-gray-600">
                                    Car Equivalent
                                  </span>
                                </div>
                                <p className="text-sm font-semibold">
                                  {equivalentValues.carEquivalent} cars
                                </p>
                              </div>
                            )}

                            {equivalentValues?.treesRequired && (
                              <div className="flex items-center justify-between border-b border-gray-200 pb-1">
                                <div className="flex items-center gap-2">
                                  <TreePine className="h-4 w-4 text-primary" />
                                  <span className="text-sm text-gray-600">
                                    Trees Needed
                                  </span>
                                </div>
                                <p className="text-sm font-semibold">
                                  {equivalentValues.treesRequired.toLocaleString()}
                                </p>
                              </div>
                            )}

                            {equivalentValues?.waterSaved && (
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Droplet className="h-4 w-4 text-blue-500" />
                                  <span className="text-sm text-gray-600">
                                    Water Impact
                                  </span>
                                </div>
                                <p className="text-sm font-semibold">
                                  {(equivalentValues.waterSaved / 1000).toFixed(
                                    1
                                  )}
                                  k L
                                </p>
                              </div>
                            )}

                            {equivalentValues?.airQualityImprovement && (
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Wind className="h-4 w-4 text-blue-500" />
                                  <span className="text-sm text-gray-600">
                                    Air Quality Improvement
                                  </span>
                                </div>
                                <p className="text-sm font-semibold">
                                  {equivalentValues.airQualityImprovement.toFixed(
                                    1
                                  )}
                                  %
                                </p>
                              </div>
                            )}

                            {equivalentValues?.speciesProtected && (
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Shell className="h-4 w-4 text-blue-500" />
                                  <span className="text-sm text-gray-600">
                                    Species Protected
                                  </span>
                                </div>
                                <p className="text-sm font-semibold">
                                  {equivalentValues.speciesProtected}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Offset options */}
                        <div>
                          <h5 className="text-sm font-medium mb-2 flex items-center">
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
                                {formatCurrency(
                                  Math.ceil(emissionsInTons * 500)
                                )}
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
                                {formatCurrency(
                                  Math.ceil(emissionsInTons * 650)
                                )}
                              </p>
                            </div>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          className={`w-full bg-btn-secondary hover:bg-btn-secondary-hover text-white`}
                        >
                          Offset Your Carbon Emission
                        </Button>
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-sm text-gray-600">
                          Click &quot;Details&quot; to load environmental impact
                          data
                        </p>
                      </div>
                    )}
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
                  <span>
                    {formatCurrency(flightDetailsDummy.price.current)}
                  </span>
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
                      flightDetailsDummy.price.current + 5000 + 1500 - 3400
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
                  {flightDetailsDummy.baggage}
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
