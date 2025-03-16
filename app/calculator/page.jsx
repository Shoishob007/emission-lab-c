"use client";

import { useState } from "react";
import { Plane, Car, HomeIcon, Bus, Train, Ship } from "lucide-react";
import CalculatorLeft from "./components/CalculatorLeft";
import CalculatorRight from "./components/CalculatorRight";
import CarbonImpactDashboard from "./components/CarbonEmissionDash";
import { motion, AnimatePresence } from "framer-motion";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

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

  const tabs = [
    { title: "Flight", icon: Plane, value: "flight" },
    { title: "Car", icon: Car, value: "car" },
    { title: "Bus", icon: Bus, value: "bus" },
    { title: "Train", icon: Train, value: "train" },
    { title: "Ship", icon: Ship, value: "ship" },
    // { title: "Bus", icon: Bus, value: "bus" },
  ];

  const handleTabChange = (index) => {
    console.log("Switching to index:", index);
    const selectedTab = tabs[index]?.value;
    if (selectedTab) {
      setActiveTab(selectedTab);
      setCalculated(false);
      setEmissionData(null);
    }
  };

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
            <HomeIcon className="h-16 w-16 mb-4" />
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
        <div className="mb-8">
        <ExpandableTabs
            tabs={tabs}
            onChange={handleTabChange}
            activeColor="text-primary"
            className="border-primary-200 dark:border-primary-800 text-center justify-center w-fit mx-auto"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Left Panel - Input Form */}
          <div className="bg-card rounded-lg p-8 shadow-lg">
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
            <CarbonImpactDashboard
              emissionData={emissionData}
              setShowDashboard={setShowDashboard}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}