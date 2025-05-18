"use client";
import React, { useRef } from "react";
import { useEffect, useMemo, useState } from "react";
import { Plane, Car, Ship, ShipIcon, Hotel, HotelIcon } from "lucide-react";
import FlightCalculatorLeft from "./flight/components/FlightCalculatorLeft";
import FlightCalculatorRight from "./flight/components/FlightCalculatorRight";
import CarCalculatorLeft from "./car/components/TransportCalculatorLeft";
import TransportCalculatorRight from "./car/components/TransportCalculatorRight";
import HotelCalculatorLeft from "./hotel/components/HotelCalculatorLeft";
import HotelCalculatorRight from "./hotel/components/HotelCalculatorRight";
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
  const [hotelDetails, setHotelDetails] = useState({
    country_code: "",
    city_name: "",
    hotel_rating: "",
    number_of_nights: 1,
    number_of_rooms: 1,
    cluster_name: null,
  });
  const [emissionData, setEmissionData] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const tabs = useMemo(
    () => [
      { title: "Flight", icon: Plane, value: "flight" },
      { title: "Transport", icon: Car, value: "transport" },
      { title: "Hotel", icon: Hotel, value: "hotel" },
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
      case "hotel":
        return (
          <HotelCalculatorLeft
            setCalculated={setCalculated}
            hotelDetails={hotelDetails}
            setHotelDetails={setHotelDetails}
            setEmissionData={setEmissionData}
          />
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
            transportDetails={transportDetails}
          />
        );
      case "hotel":
        return (
          <HotelCalculatorRight
            calculated={calculated}
            activeTab={activeTab}
            emissionData={emissionData}
            showDashboard={showDashboard}
            setShowDashboard={setShowDashboard}
            scrollToDashboard={scrollToDashboard}
          />
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
            activeTabIndex={tabs.findIndex((tab) => tab.value === activeTab)}
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
              {activeTab === "hotel" && "Put Your Hotel Details"}
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
