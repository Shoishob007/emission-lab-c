import { Cloud, Sparkles, ArrowUp } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import EmissionDisplay from "../../components/EmissionDisplay";
import CarbonFootprintCards from "@/components/carbon-footprint-cards";
import Image from "next/image";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import useEmissionsStore from "@/stores/emissionStore";
import { fetchCarbonEmissionDetailsInAir } from "@/utils/api/AirEquivalentAPI";

const FlightCalculatorRight = ({
  calculated,
  activeTab,
  emissionData,
  showDashboard,
  setShowDashboard,
  scrollToDashboard,
  calculating,
  pricePerTon,
  setAiAnalysisData,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStage, setGenerationStage] = useState("");
  const [cachedAiAnalysis, setCachedAiAnalysis] = useState(null);
  const { setEmissionData: setStoreEmissionData } = useEmissionsStore();

  useEffect(() => {
    if (emissionData && calculated) {
      setStoreEmissionData({
        ...emissionData,
        calculationType: "flight",
      });
    }
  }, [emissionData, calculated, setStoreEmissionData]);

  // cached data reset if amission data changes
  useEffect(() => {
    setCachedAiAnalysis(null);
  }, [emissionData]);

  const handleViewDashboard = async () => {
    if (showDashboard) {
      setShowDashboard(false);
      return;
    }

    // using cached data if available
    if (cachedAiAnalysis) {
      setAiAnalysisData(cachedAiAnalysis);
      setShowDashboard(true);
      setTimeout(() => {
        scrollToDashboard();
      }, 100);
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationStage("Analyzing flight emissions...");

    try {
      // progress animation
      const progressInterval = setInterval(() => {
        setGenerationProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      // updating stages during generation
      setTimeout(
        () => setGenerationStage("Calculating environmental impact..."),
        2000
      );
      setTimeout(
        () => setGenerationStage("Preparing detailed insights..."),
        4000
      );

      // Make API call
      const aiAnalysisData = await fetchCarbonEmissionDetailsInAir(
        emissionData
      );

      // Complete progress
      clearInterval(progressInterval);
      setGenerationProgress(100);
      setGenerationStage("Analysis complete!");

      // Cache the data for future use
      setCachedAiAnalysis(aiAnalysisData);

      // Set the AI analysis data in parent component
      setAiAnalysisData(aiAnalysisData);

      setTimeout(() => {
        setIsGenerating(false);
        setShowDashboard(true);
        setTimeout(() => {
          scrollToDashboard();
        }, 100);
      }, 1000);
    } catch (error) {
      console.error("Error generating analysis:", error);
      setGenerationStage("Error generating analysis. Please try again.");
      setGenerationProgress(0);
      setTimeout(() => {
        setIsGenerating(false);
      }, 2000);
    }
  };

  const totalEmission = emissionData?.result?.data?.emissions.co2e_mt || 0;

  return (
    <>
      <div className="rounded-lg p-8 shadow-lg shadow-primary/40">
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
            {/* <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-2 justify-center sm:items-center">
            </div> */}

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
              <CarbonFootprintCards emissionData={emissionData} />

              <div className="mt-4 bg-blue-50 dark:bg-blue-200/20 border border-blue-100 dark:border-blue-300 rounded-xl px-4 py-2 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Your Carbon Offset Amount
                      </h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary dark:text-green-400">
                      ${(totalEmission * parseFloat(pricePerTon)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {isGenerating ? (
                <div className="w-full mt-4">
                  {/* Generation Loading State */}
                  <div className="w-full bg-primary/10 rounded-lg p-4 flex flex-col items-center">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="relative">
                        <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                        <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-ping"></span>
                      </div>
                      <p className="text-sm font-medium">
                        Generating AI-powered carbon impact analysis...
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div
                        className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${generationProgress}%` }}
                      ></div>
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                      {generationStage}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4 mt-4">
                  {/* View / Hide Details */}
                  <button
                    onClick={handleViewDashboard}
                    className="flex-1 bg-primary text-primary-foreground py-3 rounded-md flex items-center justify-center text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {showDashboard
                      ? "Hide Details"
                      : cachedAiAnalysis
                      ? "AI Analysis"
                      : "AI Analysis"}
                  </button>

                  {/* Offset Now */}
                  <Link href={"/offset"} className="flex-1">
                    <button className="w-full bg-primary text-primary-foreground py-3 rounded-md flex items-center justify-center text-sm font-medium hover:bg-primary/90 transition-colors">
                      <ArrowUp className="h-4 w-4 mr-2" />
                      Offset Now
                    </button>
                  </Link>
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