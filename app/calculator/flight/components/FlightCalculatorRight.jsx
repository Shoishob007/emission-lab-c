import { Cloud, MapPin, Globe, Phone, Link, Sparkles } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import EmissionDisplay from "../../components/EmissionDisplay";
import CarbonFootprintCards from "@/components/carbon-footprint-cards";
import Image from "next/image";

const FlightCalculatorRight = ({
  calculated,
  activeTab,
  emissionData,
  showDashboard,
  setShowDashboard,
  scrollToDashboard,
}) => {
  const [fromPopoverOpen, setFromPopoverOpen] = useState(false);
  const [toPopoverOpen, setToPopoverOpen] = useState(false);
  const [fromAirportDetails, setFromAirportDetails] = useState(null);
  const [toAirportDetails, setToAirportDetails] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  // Function to handle dashboard view with loading state
  const handleViewDashboard = () => {
    if (showDashboard) {
      // If dashboard is already shown, just hide it
      setShowDashboard(false);
      return;
    }

    // Start the generation process
    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulating AI generation process
    const totalTime = 4000;
    const intervalTime = 100;
    const steps = totalTime / intervalTime;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      // progress percentage
      const progress = Math.min((currentStep / steps) * 100, 100);
      setGenerationProgress(progress);

      if (currentStep >= steps) {
        clearInterval(progressInterval);
        setIsGenerating(false);
        setShowDashboard(true);
        setTimeout(() => {
          scrollToDashboard();
        }, 100);
      }
    }, intervalTime);
  };

  const totalEmission = emissionData?.result?.data?.emissions.co2e_mt || 0;
  const emissionPerPerson =
    totalEmission / emissionData?.result?.data?.number_of_passengers;

  return (
    <>
      <div className="bg-card rounded-lg p-8 shadow-lg">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Your Carbon Footprint
        </h2>

        {!calculated || activeTab !== "flight" ? (
          <div className="h-[400px] flex flex-col items-center justify-center text-muted-foreground">
            <Cloud className="h-16 w-16 mb-4" />
            <p className="text-sm">
              {activeTab === "flight"
                ? "Enter flight details to calculate emissions"
                : "Enter details to calculate emissions"}
            </p>
          </div>
        ) : (
          <div className="">
            <EmissionDisplay totalEmission={totalEmission} />

            {/* Flight Details */}
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-2 justify-center sm:items-center">
              {/* <div className="flex flex-col gap-2 sm:items-center">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <p className="font-semibold">From:</p>
                  <Popover
                    open={fromPopoverOpen}
                    onOpenChange={setFromPopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="link"
                        className="p-0 h-2 text-sm text-muted-foreground hover:text-primary"
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
                  <p className="font-semibold">To:</p>
                  <Popover open={toPopoverOpen} onOpenChange={setToPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="link"
                        className="p-0 h-2 text-sm text-muted-foreground hover:text-primary"
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
              </div> */}
            </div>

            {/* Emission Details */}
            <div className="mt-6 sm:mt-0">
              {/* Trip Emission */}
              {/* <div className="flex justify-between items-center px-2 py-2 rounded-md">
                <span className="text-sm font-medium">
                  CO<sub>2</sub> emission in one-way flight
                </span>
                <span className="font-semibold text-sm">
                  {oneWayEmission.toFixed(3)} MT
                </span>
              </div> */}
              <div className="relative h-20 w-full overflow-hidden mb-8">
                <div className="absolute inset-0">
                  <div className="plane-track">
                    <Image
                      src="/airplane.png"
                      alt="Flying Plane"
                      width={100}
                      height={64}
                      objectFit="contain"
                    />
                  </div>
                </div>
              </div>

              {/* Flight Details */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center items-center mb-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">Distance Traveled: </span>
                {emissionData?.result?.data?.distance_km || 0} km
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">Flight Class:</span>{" "}
                {emissionData?.result?.data?.flight_class}
              </p>
            </div>

              {/* Passenger Emission */}
              {/* <div className="flex justify-between items-center px-2 py-2 rounded-md border-t border-border">
                <span className="text-sm font-medium">
                  CO<sub>2</sub> emission per person
                </span>
                <span className="font-semibold text-sm">
                  {emissionPerPerson.toFixed(3)} MT
                </span>
              </div> */}
            </div>

            <div className="border-t border-border">

              <CarbonFootprintCards totalEmission={totalEmission} />

              {isGenerating ? (
                <div className="w-full mt-6">
                  {/* AI Generation Loading State */}
                  <div className="w-full bg-primary/10 rounded-lg p-4 flex flex-col items-center">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="relative">
                        <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                        <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-ping"></span>
                      </div>
                      <p className="text-sm font-medium">
                        Generating carbon impact analysis...
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div
                        className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${generationProgress}%` }}
                      ></div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      {generationProgress < 30 &&
                        "Analyzing flight emissions..."}
                      {generationProgress >= 30 &&
                        generationProgress < 60 &&
                        "Calculating environmental impact..."}
                      {generationProgress >= 60 &&
                        generationProgress < 90 &&
                        "Preparing detailed insights..."}
                      {generationProgress >= 90 && "Almost ready..."}
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleViewDashboard}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-md flex items-center justify-center text-sm font-medium mt-6 hover:bg-primary/90 transition-colors"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {showDashboard ? "Hide Details" : "View Details"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes fly {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .plane-track {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: calc(100% + 64px);
          animation: fly 8s linear infinite;
        }

        .plane-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
};

export default FlightCalculatorRight;
