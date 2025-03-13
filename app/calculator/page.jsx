"use client";

import { useState } from "react";
import { Plane, Car, HomeIcon, Building } from "lucide-react";
import CalculatorLeft from "./components/CalculatorLeft";
import CalculatorRight from "./components/CalculatorRight";
import CarbonImpactDashboard from "./components/CarbonEmissionDash";
import { motion, AnimatePresence } from "framer-motion";

export default function Calculator() {
  const [activeTab, setActiveTab] = useState("flight");
  const [calculated, setCalculated] = useState(false);
  const [flightDetails, setFlightDetails] = useState({
    from: "",
    to: "",
    tripType: "oneWay",
    class: "economy",
    aircraft: "",
    passengers: 1,
  });
  const [emissionData, setEmissionData] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const renderCalculatorContent = () => {
    switch (activeTab) {
      case "flight":
        return (
          <>
            <CalculatorLeft
              setCalculated={setCalculated}
              flightDetails={flightDetails}
              setFlightDetails={setFlightDetails}
              setEmissionData={setEmissionData}
            />
          </>
        );

      case "transport":
        return (
          <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
            <Car className="h-16 w-16 mb-4" />
            <p className="text-sm">
              Transport emissions calculator coming soon
            </p>
          </div>
        );

      case "home":
        return (
          <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
            <Building className="h-16 w-16 mb-4" />
            <p className="text-sm">Home emissions calculator coming soon</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
        {/* Tabs */}
        <div className="flex justify-between mb-8 bg-muted rounded-lg p-1 w-full max-w-md mx-auto">
          <button
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm ${
              activeTab === "flight"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("flight")}
          >
            <Plane className="h-4 w-4 mr-2" />
            Flight
          </button>
          <button
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm ${
              activeTab === "transport"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("transport")}
          >
            <Car className="h-4 w-4 mr-2" />
            Transport
          </button>
          <button
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm ${
              activeTab === "home"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("home")}
          >
            <HomeIcon className="h-4 w-4 mr-2" />
            Household
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-0 max-w-5xl mx-auto">
          {/* Left Panel - Input Form */}
          <div className="bg-card rounded-lg sm:rounded-none sm:rounded-l-lg p-8 shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-center">
              {activeTab === "flight" && "Put Your Flight Details"}
              {activeTab === "transport" && "Transport Emissions"}
              {activeTab === "home" && "Home Emissions"}
            </h2>

            <div className="space-y-6">{renderCalculatorContent()}</div>
          </div>

          {/* Right Panel */}
          <CalculatorRight
            calculated={calculated}
            activeTab={activeTab}
            flightDetails={flightDetails}
            emissionData={emissionData}
            showDashboard={showDashboard}
            setShowDashboard={setShowDashboard}
          />
        </div>
      </div>
      <AnimatePresence>
        {showDashboard && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <CarbonImpactDashboard emissionData={emissionData} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
