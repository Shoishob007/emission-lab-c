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
} from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { flightDetails } from "./dummyFlightData";

const SidebarBooking = ({
  showEmissionsDetails,
  setShowEmissionsDetails,
  selectedCoupon,
}) => {
  const formatCurrency = (amount, currency = "BDT") => {
    return `${amount.toLocaleString()} ${currency}`;
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
                {/* Departure */}
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

                {/* Transit */}
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

                {/* Arrival */}
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

              {/* Journey Duration */}
              <div className="mt-4 bg-gray-50 p-3 rounded-md">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Total duration</p>
                  <p className="text-sm font-medium">
                    {flightDetails.duration}
                  </p>
                </div>
              </div>

              {/* CO2 Emissions */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1 text-green-600">
                  <Leaf className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {flightDetails.emissions}
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
                        CO2 Emissions: {flightDetails.emissionsValue}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {showEmissionsDetails && (
                <div className="mt-2 bg-green-50 p-3 rounded-md">
                  <h5 className="text-sm font-medium text-green-700 mb-1">
                    CO2 Emissions Details
                  </h5>
                  <p className="text-xs text-green-600">
                    This flight produces {flightDetails.emissionsValue} of CO2
                    per passenger, which is lower than the average for this
                    route.
                  </p>
                </div>
              )}
            </div>

            <Separator />

            {/* Fare Details */}
            <div>
              <h4 className="font-medium mb-2">Price Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <span>Base Fare</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-3 w-3 text-gray-400" />
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
                  <div className="flex justify-between text-sm text-green-600">
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

            {/* Baggage Info */}
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
