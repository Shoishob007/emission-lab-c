import { Cloud, MapPin, Globe, Phone, Link, CircleHelp } from "lucide-react";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EmissionDisplay from "./EmissionDisplay";

const CalculatorRight = ({
  calculated,
  activeTab,
  emissionData,
  showDashboard,
  setShowDashboard,
}) => {
  const [fromPopoverOpen, setFromPopoverOpen] = useState(false);
  const [toPopoverOpen, setToPopoverOpen] = useState(false);
  const [fromAirportDetails, setFromAirportDetails] = useState(null);
  const [toAirportDetails, setToAirportDetails] = useState(null);

  console.log("emissionData :: ", emissionData)

  const fetchAirportDetails = async (iataCode) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/airAPI/airport-details`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: iataCode }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error("Error fetching airport details:", error);
      return null;
    }
  };

  const handlePopoverOpen = async (iataCode, setDetails) => {
    const details = await fetchAirportDetails(iataCode);
    setDetails(details);
  };

  const totalEmission = emissionData?.result?.data?.emissions.co2e_mt || 0;
  const oneWayEmission =
  emissionData?.result?.data?.round_trip === "Y" ? totalEmission / 2 : totalEmission;
  const emissionPerPerson = totalEmission / emissionData?.result?.data?.number_of_passengers;

  return (
    <>
      <div className="bg-card rounded-lg p-8 shadow-lg">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Your Carbon Footprint
        </h2>

        {!calculated || activeTab !== "flight" ? (
          <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
            <Cloud className="h-16 w-16 mb-4" />
            <p className="text-sm">
              {activeTab === "flight"
                ? "Enter flight details to calculate emissions"
                : "This calculator is coming soon"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <EmissionDisplay totalEmission={totalEmission} />

            {/* Flight Details */}
            <div className="flex flex-col space-y-4 !mt-0 sm:space-y-0 sm:space-x-4 justify-center sm:items-center">
              <div className="flex flex-col gap-2 sm:items-center">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <p>From:</p>
                  <Popover
                    open={fromPopoverOpen}
                    onOpenChange={setFromPopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="link"
                        className="p-0 h-2 text-sm text-muted-foreground hover:text-primary"
                        onClick={() =>
                          handlePopoverOpen(
                            emissionData?.result?.data?.iata_airport_from,
                            setFromAirportDetails
                          )
                        }
                      >
                        {emissionData?.result?.data?.airport_from}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4">
                      {fromAirportDetails && (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            <div>
                              <h3 className="font-semibold">
                                {fromAirportDetails.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {fromAirportDetails.location}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Globe className="h-5 w-5 text-primary" />
                            <div>
                              <p className="text-sm">
                                {fromAirportDetails.city},{" "}
                                {fromAirportDetails.country}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {fromAirportDetails.latitude},{" "}
                                {fromAirportDetails.longitude}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-5 w-5 text-primary" />
                            <p className="text-sm">
                              {fromAirportDetails.phone}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Link className="h-5 w-5 text-primary" />
                            <a
                              href={fromAirportDetails?.website || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              Visit Website
                            </a>
                          </div>
                        </div>
                      )}
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <p>To:</p>
                  <Popover open={toPopoverOpen} onOpenChange={setToPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="link"
                        className="p-0 h-2 text-sm text-muted-foreground hover:text-primary"
                        onClick={() =>
                          handlePopoverOpen(
                            emissionData?.result?.data?.iata_airport_to,
                            setToAirportDetails
                          )
                        }
                      >
                        {emissionData?.result?.data?.airport_to}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4">
                      {toAirportDetails && (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            <div>
                              <h3 className="font-semibold">
                                {toAirportDetails.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {toAirportDetails.location}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Globe className="h-5 w-5 text-primary" />
                            <div>
                              <p className="text-sm">
                                {toAirportDetails.city},{" "}
                                {toAirportDetails.country}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {toAirportDetails.latitude},{" "}
                                {toAirportDetails.longitude}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-5 w-5 text-primary" />
                            <p className="text-sm">{toAirportDetails.phone}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Link className="h-5 w-5 text-primary" />
                            <a
                              href={toAirportDetails.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              Visit Website
                            </a>
                          </div>
                        </div>
                      )}
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-4 !mt-2 !ml-0 space-y-4 sm:space-y-0">
                <p className="text-sm text-muted-foreground">
                  Distance Traveled:{" "}
                  {emissionData?.result?.data?.distance_km || 0} km
                </p>
                <p className="text-sm text-muted-foreground">
                  Flight Class: {emissionData?.result?.data?.flight_class}
                </p>
              </div>
            </div>

            {/* Emission Details */}
            <div className="space-y-3 !mt-6 sm:mt-0">
              {/* Trip Emission */}
              <div className="flex justify-between items-center px-2 py-2 bg-muted/30 rounded-md">
                <span className="text-xs sm:text-sm font-medium">
                  Total Emission (Trip-wise)
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="font-semibold text-xs sm:text-sm cursor-pointer">
                        {oneWayEmission.toFixed(3)} MT ×{" "}
                        {emissionData?.result?.data?.round_trip === "Y" ? 2 : 1} ={" "}
                        {totalEmission.toFixed(2)} MT
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        One-Way Flight Emission: {oneWayEmission.toFixed(3)} MT
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Passenger Emission */}
              <div className="flex justify-between items-center px-2 py-2 bg-muted/30 rounded-md">
                <span className="text-xs sm:text-sm font-medium">
                  Total Emission (Passenger-wise)
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="font-semibold text-xs sm:text-sm cursor-pointer">
                        {emissionPerPerson.toFixed(3)} MT ×{" "}
                        { emissionData?.result?.data?.number_of_passengers} = {totalEmission.toFixed(2)}{" "}
                        MT
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Emission Per Person: {emissionPerPerson.toFixed(3)} MT
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Call to Action */}
            <div className="pt-4 border-t border-border">
              <div className="flex justify-between items-center px-2 py-2 bg-muted/30 rounded-md">
                <span className="text-xs sm:text-sm font-medium">
                  Total Emission (Net)
                </span>
                <span className="font-semibold text-xs sm:text-sm cursor-pointer">
                  {totalEmission.toFixed(2)} MT
                </span>
              </div>

              <button
                onClick={() => setShowDashboard((prev) => !prev)}
                className="w-full bg-primary text-primary-foreground py-3 rounded-md flex items-center justify-center text-sm font-medium mt-6"
              >
                <CircleHelp className="h-4 w-4 mr-2" />
                {showDashboard ? "Hide Details" : "View Details"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CalculatorRight;