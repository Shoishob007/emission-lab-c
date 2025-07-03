import { Cloud, Sparkles, Car, ArrowUp } from "lucide-react";
import React, { useState } from "react";
import EmissionDisplay from "../../components/EmissionDisplay";
import CarbonFootprintCards from "@/components/carbon-footprint-cards";
import Image from "next/image";

const TransportCalculatorRight = ({
  calculated,
  activeTab,
  emissionData,
  showDashboard,
  setShowDashboard,
  scrollToDashboard,
  transportDetails,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const getVehicleImage = () => {
    const transportType = transportDetails?.transportType || "";

    if (transportType.startsWith("sedan") || transportType === "SUV") {
      return "/car.png";
    } else if (transportType === "motorbike") {
      return "/bike-pollution.png";
    } else if (transportType.startsWith("Train")) {
      return "/train.png";
    } else if (transportType.startsWith("Bus")) {
      return "/bus.png";
    }

    return "/car.png";
  };

  const handleViewDashboard = () => {
    if (showDashboard) {
      setShowDashboard(false);
      return;
    }

    // AI generation process
    setIsGenerating(true);
    setGenerationProgress(0);

    const totalTime = 4000;
    const intervalTime = 100;
    const steps = totalTime / intervalTime;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
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

  const totalEmission = emissionData?.result?.data?.co2e_mt || 0;

  return (
    <>
      <div className="bg-card rounded-lg p-8 shadow-lg">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Your Carbon Footprint
        </h2>

        {!calculated || activeTab !== "transport" ? (
          <div className="h-[400px] flex flex-col items-center justify-center text-muted-foreground">
            <Cloud className="h-16 w-16 mb-4" />
            <p className="text-sm">
              {activeTab === "transport"
                ? "Enter transport details to calculate emissions"
                : "Enter details to calculate emissions"}
            </p>
          </div>
        ) : (
          <div className="">
            <EmissionDisplay totalEmission={totalEmission} />

            <div className="relative h-20 w-full overflow-hidden mb-8">
              <div className="absolute inset-0">
                <div className="vehicle-track">
                  <Image
                    src={getVehicleImage()}
                    alt="Moving Vehicle"
                    width={100}
                    height={64}
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>

            {/* Transport Details */}
            <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4 mb-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">Vehicle Type: </span>
                {transportDetails?.transportType || "N/A"}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">Distance: </span>
                {emissionData?.result?.data?.distance_value || 0}{" "}
                {emissionData?.result?.data?.distance_unit || "km"}
              </p>
            </div>

            {/* Call to Action */}
            <div className="border-t border-border">
              <CarbonFootprintCards totalEmission={totalEmission} />

              {isGenerating ? (
                <div className="w-full mt-6">
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

                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div
                        className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${generationProgress}%` }}
                      ></div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      {generationProgress < 30 &&
                        "Analyzing transport emissions..."}
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
                <div>
                  <button
                    onClick={handleViewDashboard}
                    className={`w-full bg-primary text-primary-foreground py-3 rounded-md flex items-center justify-center text-sm font-medium hover:bg-primary/90 transition-colors ${
                      showDashboard ? "mt-10" : "mt-6"
                    }`}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {showDashboard ? "Hide Details" : "View Details"}
                  </button>

                  <button
                    className={`w-full bg-primary text-primary-foreground py-3 rounded-md flex items-center justify-center text-sm font-medium mt-4 hover:bg-primary/90 transition-colors cursor-not-allowed ${
                      showDashboard ? "hidden" : ""
                    }`}
                  >
                    <ArrowUp className="h-4 w-4 mr-2" />
                    Offset Now
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes drive {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .vehicle-track {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: calc(100% + 64px);
          animation: drive 8s linear infinite;
        }

        .vehicle-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
};

export default TransportCalculatorRight;
