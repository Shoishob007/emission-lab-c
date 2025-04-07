"use client";
import React, { useRef } from "react";
import { useEffect, useMemo, useState } from "react";
import { Plane, Car, Ship, ShipIcon } from "lucide-react";
import FlightCalculatorLeft from "./flight/components/FlightCalculatorLeft";
import FlightCalculatorRight from "./flight/components/FlightCalculatorRight";
import CarCalculatorLeft from "./car/components/TransportCalculatorLeft";
import TransportCalculatorRight from "./car/components/TransportCalculatorRight";
import CarbonImpactDashboard from "./components/CarbonEmissionDash";
import { motion, AnimatePresence } from "framer-motion";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

export default function Calculator() {
  const dashboardRef = useRef(null);
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
  const [transportDetails, setTransportDetails] = useState({
    transportType: "",
    fuelType: "Petrol",
    distance: "",
    passengers: 1,
  });
  const [shipDetails, setShipDetails] = useState({
    shipType: "",
    distance: "",
    cargo: "",
    passengers: 1,
  });
  const [emissionData, setEmissionData] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const tabs = useMemo(
    () => [
      { title: "Flight", icon: Plane, value: "flight" },
      { title: "Transport", icon: Car, value: "transport" },
      { title: "Ship", icon: Ship, value: "ship" },
    ],
    []
  );

  useEffect(() => {
    setActiveTab(tabs[0]?.value);
  }, [tabs]);

  const handleTabChange = (index) => {
    const selectedTab = tabs[index]?.value;
    if (selectedTab) {
      setActiveTab(selectedTab);
      setCalculated(false);
      setEmissionData(null);
    }
  };

  const scrollToDashboard = () => {
    if (dashboardRef.current) {
      dashboardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderCalculatorContent = () => {
    switch (activeTab) {
      case "flight":
        return (
          <FlightCalculatorLeft
            setCalculated={setCalculated}
            flightDetails={flightDetails}
            setFlightDetails={setFlightDetails}
            setEmissionData={setEmissionData}
          />
        );

      case "transport":
        return (
          <CarCalculatorLeft
            setCalculated={setCalculated}
            transportDetails={transportDetails}
            setTransportDetails={setTransportDetails}
            setEmissionData={setEmissionData}
          />
        );
      case "ship":
        return (
          <div className="h-[400px] flex flex-col items-center justify-center text-muted-foreground">
            <ShipIcon className="h-16 w-16 mb-4" />
            <p className="text-sm">Ship emissions calculator coming soon</p>
          </div>
        );

      default:
        return null;
    }
  };

  const renderRightPanel = () => {
    switch (activeTab) {
      case "flight":
        return (
          <FlightCalculatorRight
            calculated={calculated}
            activeTab={activeTab}
            emissionData={emissionData}
            showDashboard={showDashboard}
            setShowDashboard={setShowDashboard}
            scrollToDashboard={scrollToDashboard}
          />
        );
      case "transport":
        return (
          <TransportCalculatorRight
            calculated={calculated}
            activeTab={activeTab}
            emissionData={emissionData}
            showDashboard={showDashboard}
            setShowDashboard={setShowDashboard}
            scrollToDashboard={scrollToDashboard}
          />
        );
      // case "ship":
      //   return (
      //     <ShipCalculatorRight
      //       calculated={calculated}
      //       activeTab={activeTab}
      //       emissionData={emissionData}
      //       showDashboard={showDashboard}
      //       setShowDashboard={setShowDashboard}
      //       scrollToDashboard={scrollToDashboard}
      //     />
      //   );
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
            activeTabIndex={tabs.findIndex(tab => tab.value === activeTab)}
            onChange={handleTabChange}
            activeColor="text-primary"
            className="border-primary-200 dark:border-primary-800 text-center justify-center w-fit mx-auto"
            alwaysKeepActive={true}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Left Panel - Input Form */}
          <div className="bg-card rounded-lg p-8 shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-center">
              {activeTab === "flight" && "Put Your Flight Details"}
              {activeTab === "transport" && "Put Your Journey Details"}
              {activeTab === "ship" && "Put Your Ship Details"}
            </h2>

            <div className="space-y-6">{renderCalculatorContent()}</div>
          </div>

          {renderRightPanel()}
        </div>
      </div>
      <AnimatePresence>
        {showDashboard && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            ref={dashboardRef}
          >
            <CarbonImpactDashboard
              emissionData={emissionData}
              calculatorType={activeTab}
              setShowDashboard={setShowDashboard}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}