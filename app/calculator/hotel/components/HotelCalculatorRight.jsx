import { Sparkles, Building2, ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import EmissionDisplay from "../../components/EmissionDisplay";
import CarbonFootprintCards from "@/components/carbon-footprint-cards";
import Image from "next/image";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import useEmissionsStore from "@/stores/emissionStore";
import { fetchCarbonEmissionDetailsInHotel } from "@/utils/api/HotelEquivalentAPI";

const HotelCalculatorRight = ({
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
  console.log("emissionData :: ", emissionData);
  const [generationStage, setGenerationStage] = useState("");
  const { setEmissionData: setStoreEmissionData } = useEmissionsStore();

  // when emission data changes
  useEffect(() => {
    if (emissionData && calculated) {
      const storeData = {
        ...emissionData,
        result: {
          ...emissionData.result,
          data: {
            ...emissionData.result.data,
            emissions: {
              co2e_mt: emissionData.result.data.co2e_mt,
            },
          },
        },
        calculationType: "hotel",
      };
      setStoreEmissionData(storeData);
    }
  }, [emissionData, calculated, setStoreEmissionData]);

  // console.log("emission Data in HotelCalculatorRight: ", emissionData)

  // handle dashboard
  const handleViewDashboard = async () => {
    if (showDashboard) {
      setShowDashboard(false);
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationStage("Analyzing flight emissions...");

    try {
      // Start progress animation
      const progressInterval = setInterval(() => {
        setGenerationProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      // Update stages during generation
      // setTimeout(() => setGenerationStage("Calculating environmental impact..."), 2000);
      // setTimeout(() => setGenerationStage("Preparing detailed insights..."), 4000);

      // Make API call
      const aiAnalysisData = await fetchCarbonEmissionDetailsInHotel(
        emissionData
      );

      // Complete progress
      clearInterval(progressInterval);
      setGenerationProgress(100);
      setGenerationStage("Analysis complete!");

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

  // console.log("Hello :: ", emissionData?.result?.data);

  const totalEmission = emissionData?.result?.data?.co2e_mt || 0;

  return (
    <>
      <div className="rounded-lg p-8 shadow-lg shadow-primary/40">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Your Carbon Footprint
        </h2>

        {!calculated || activeTab !== "hotel" ? (
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
            <h3 className="text-xl font-semibold text-foreground mb-2">
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

            <div className="relative h-20 w-full overflow-hidden mb-8">
              <div className="absolute inset-0">
                <div className="hotel-track">
                  <Image
                    src="/hotel.png"
                    alt="Hotel Building"
                    width={100}
                    height={64}
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>

            {/* Hotel stay details */}
            <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4 mb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">Stay Duration: </span>
                {emissionData?.result?.data?.number_of_nights || 0} nights
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">Accommodation Size: </span>
                {emissionData?.result?.data?.number_of_rooms || 0} rooms
              </p>
            </div>

            {/* Call to Action */}
            <div className="border-t border-border flex flex-col">
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
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      ${(totalEmission * parseFloat(pricePerTon)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {isGenerating ? (
                <div className="w-full mt-6">
                  {/* AI Loading State */}
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
                      {generationStage}
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
                    {showDashboard ? "Hide Details" : "View AI Analysis"}
                  </button>

                  {/* Offset Now */}
                  {!showDashboard && (
                    <Link href={"/offset"} className="w-1/2">
                      <button
                        disabled
                        className="w-full bg-primary text-primary-foreground py-3 rounded-md flex items-center justify-center text-sm font-medium hover:bg-primary/90 transition-colors cursor-not-allowed"
                      >
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
        @keyframes move {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .hotel-track {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: calc(100% + 64px);
          animation: move 12s linear infinite;
        }

        .hotel-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
};

export default HotelCalculatorRight;
