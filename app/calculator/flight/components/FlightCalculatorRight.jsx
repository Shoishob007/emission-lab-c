import { Cloud, Sparkles, ArrowUp } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import EmissionDisplay from "../../components/EmissionDisplay";
import CarbonFootprintCards from "@/components/carbon-footprint-cards";
import Image from "next/image";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import useEmissionsStore from "@/stores/emissionStore";

const FlightCalculatorRight = ({
  calculated,
  activeTab,
  emissionData,
  showDashboard,
  setShowDashboard,
  scrollToDashboard,
  calculating,
  pricePerTon,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  // console.log("pricePerTon :: ", pricePerTon);
  const { setEmissionData: setStoreEmissionData } = useEmissionsStore();

  // store when emission data changes
  useEffect(() => {
    if (emissionData && calculated) {
      setStoreEmissionData({
        ...emissionData,
        calculationType: "flight",
      });
    }
  }, [emissionData, calculated, setStoreEmissionData]);

  const handleViewDashboard = () => {
    if (showDashboard) {
      setShowDashboard(false);
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    // AI generation process
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
  // console.log("Hello :: ", emissionData?.result?.data);

  return (
    <>
      <div className="bg-card rounded-lg p-8 shadow-lg shadow-primary/40">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Your Carbon Footprint
        </h2>

        {!calculated || activeTab !== "flight" ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-6">
            {/* Animation container */}
            <div className="p-6 rounded-full bg-gradient-to-br from-primary/10 to-primary/10 shadow-inner mb-6">
              <div className="w-32 h-32 sm:w-40 sm:h-40">
                <DotLottieReact
                  key={calculating ? "calc-anim" : "idle-anim"}
                  src="https://lottie.host/e838794e-eee6-4e3b-996a-2e5e92bbcaa1/4xwYEpmPqj.lottie"
                  loop={calculating}
                  autoplay={calculating}
                />
              </div>
            </div>

            {/* Headline */}
            <h3 className="text-xl font-semibold text-foreground/70 mb-2">
              {calculating
                ? "Calculating Your Emissions..."
                : "Ready to Begin?"}
            </h3>

            {/* Subtext */}
            <p className="text-sm text-muted-foreground max-w-sm mb-4">
              {calculating
                ? "We're analyzing your flight data to estimate CO₂ emissions."
                : "Enter your flight details and we'll estimate your carbon footprint instantly."}
            </p>

            {/* Professional Information */}
            <div className="bg-primary/10 dark:bg-gray-950/20 border border-gray-200/50 dark:border-gray-800/30 rounded-lg p-4 mb-4 max-w-md">
              <div className="flex items-start space-x-3">
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground/70 dark:text-gray-100 mb-1">
                    Understanding Your Carbon Impact
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-300 leading-relaxed">
                    Once calculated, view detailed emission breakdowns and
                    discover equivalent environmental comparisons. Take
                    immediate climate action through our verified carbon offset
                    programs.
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-16 border-t border-muted mb-3" />
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
                  <span className="font-semibold">Total Passengers:</span>{" "}
                  {emissionData?.result?.data?.number_of_passengers}
                </p>
              </div>
            </div>

            <div className="border-t border-border">
              <CarbonFootprintCards totalEmission={totalEmission} />

              <div className="mt-4 bg-blue-50 dark:bg-blue-200/20 border border-blue-100 dark:border-blue-300 rounded-xl px-4 py-2 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Carbon Offset Value
                      </h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      ${(totalEmission * parseFloat(pricePerTon)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {isGenerating ? (
                <div className="w-full mt-4">
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
                <div className="flex gap-4 mt-4">
                  {/* View / Hide Details */}
                  <button
                    onClick={handleViewDashboard}
                    className={`${
                      showDashboard ? "w-full" : "w-1/2"
                    } bg-primary text-primary-foreground py-3 rounded-md flex items-center justify-center text-sm font-medium hover:bg-primary/90 transition-colors`}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {showDashboard ? "Hide Details" : "View Details"}
                  </button>

                  {/* Offset Now */}
                  {!showDashboard && (
                    <Link href={"/offsetPage"} className="w-1/2">
                      <button className="w-full bg-primary text-primary-foreground py-3 rounded-md flex items-center justify-center text-sm font-medium hover:bg-primary/90 transition-colors">
                        <ArrowUp className="h-4 w-4 mr-2" />
                        Offset Now
                      </button>
                    </Link>
                  )}
                </div>
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
