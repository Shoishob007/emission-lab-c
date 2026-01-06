"use client";
import React, { useRef, useEffect, useMemo, useState } from "react";
import { Plane, Car, Hotel, Ship } from "lucide-react";
import FlightCalculatorLeft from "./flight/components/FlightCalculatorLeft";
import FlightCalculatorRight from "./flight/components/FlightCalculatorRight";
import TransportCalculatorLeft from "./car/components/TransportCalculatorLeft";
import TransportCalculatorRight from "./car/components/TransportCalculatorRight";
import HotelCalculatorLeft from "./hotel/components/HotelCalculatorLeft";
import HotelCalculatorRight from "./hotel/components/HotelCalculatorRight";
import ShipCalculatorLeft from "./ship/components/ShipCalculatorLeft";
import ShipCalculatorRight from "./ship/components/ShipCalculatorRight";
import CarbonImpactDashboard from "./components/CarbonEmissionDash";
import { motion, AnimatePresence } from "framer-motion";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import useOffsetStore from "@/stores/offsetStore";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Calculator() {
  const dashboardRef = useRef(null);
  const searchParams = useSearchParams();
  const refreshToken = searchParams.get("refresh");
  const [activeTab, setActiveTab] = useState("flight");
  const [calculated, setCalculated] = useState(false);
  const [flightDetails, setFlightDetails] = useState({
    from: "",
    to: "",
    tripType: "oneWay",
    class: "economy",
    aircraft: "not_sure",
    passengers: 1,
    emission_lab_test: true,
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
  const [freightDetails, setFreightDetails] = useState({
    freight_weight: 0,
    distance_value: 0,
    cluster_name: null,
  });
  const [emissionData, setEmissionData] = useState(null);
  const [aiAnalysisData, setAiAnalysisData] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const { defaultProjects, fetchProjects } = useOffsetStore();

  const tabs = useMemo(
    () => [
      { title: "Flight", icon: Plane, value: "flight" },
      { title: "Transport", icon: Car, value: "transport" },
      { title: "Hotel", icon: Hotel, value: "hotel" },
      { title: "Ship", icon: Ship, value: "DeepSea" },
    ],
    []
  );

  useEffect(() => {
    setActiveTab(tabs[0]?.value);
  }, [tabs]);

  useEffect(() => {
    if (!refreshToken) return;

    const verifyWithRefresh = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/users/refresh/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refresh: refreshToken,
            }),
          }
        );

        if (!res.ok) throw new Error("Invalid refresh token");

        const data = await res.json();

        await signIn("credentials", {
          email: data.user?.email,
          password: "dummy-password-for-refresh",
          redirect: false,
          callbackUrl: window.location.pathname,
        });

        const url = new URL(window.location.href);
        url.searchParams.delete("refresh");
        window.history.replaceState({}, "", url.toString());
      } catch (err) {
        console.error("Auto login failed", err);
      }
    };

    verifyWithRefresh();
  }, [refreshToken]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleTabChange = (index) => {
    const selectedTab = tabs[index]?.value;
    if (selectedTab) {
      setActiveTab(selectedTab);
      setCalculated(false);
      setEmissionData(null);
      setAiAnalysisData(null);
      setShowDashboard(false);
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
            setCalculating={setCalculating}
            calculating={calculating}
          />
        );
      case "transport":
        return (
          <TransportCalculatorLeft
            setCalculated={setCalculated}
            transportDetails={transportDetails}
            setTransportDetails={setTransportDetails}
            setEmissionData={setEmissionData}
            setLoading={setCalculating}
            loading={calculating}
          />
        );
      case "hotel":
        return (
          <HotelCalculatorLeft
            setCalculated={setCalculated}
            hotelDetails={hotelDetails}
            setHotelDetails={setHotelDetails}
            setEmissionData={setEmissionData}
            setCalculating={setCalculating}
            calculating={calculating}
          />
        );
      case "DeepSea":
        return (
          <ShipCalculatorLeft
            setCalculated={setCalculated}
            freightDetails={freightDetails}
            setFreightDetails={setFreightDetails}
            setEmissionData={setEmissionData}
            setLoading={setCalculating}
            loading={calculating}
          />
        );
      default:
        return null;
    }
  };

  const pricePerTon = defaultProjects[0]?.price_per_ton || "0.00";

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
            setCalculating={setCalculating}
            calculating={calculating}
            pricePerTon={pricePerTon}
            setAiAnalysisData={setAiAnalysisData}
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
            loading={calculating}
            pricePerTon={pricePerTon}
            setAiAnalysisData={setAiAnalysisData}
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
            calculating={calculating}
            pricePerTon={pricePerTon}
            setAiAnalysisData={setAiAnalysisData}
          />
        );
      case "DeepSea":
        return (
          <ShipCalculatorRight
            calculated={calculated}
            activeTab={activeTab}
            emissionData={emissionData}
            showDashboard={showDashboard}
            setShowDashboard={setShowDashboard}
            scrollToDashboard={scrollToDashboard}
            calculating={calculating}
            pricePerTon={pricePerTon}
            setAiAnalysisData={setAiAnalysisData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section
      className="relative py-10 flex justify-center items-center overflow-x-hidden"
      style={{
        minHeight: "650px",
        backgroundImage: "url('/bg_1.jpg')",
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      {/* overlay */}
      <div
        className="absolute inset-0"
        style={{
          pointerEvents: "none",
          background:
            "linear-gradient(to top right, rgba(255,255,255,0.85) 0%, rgba(255,255,255,1) 70%, rgba(255,255,255,0.85) 80%)",
        }}
      />
      {/* content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="py-2 sm:py-8">
          {/* Tabs */}
          <div className="mb-2 sm:mb-8">
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
            <div className="rounded-lg p-8 shadow-lg shadow-primary/40">
              <h2 className="text-xl font-semibold mb-6 text-center">
                {activeTab === "flight" && "Put Your Flight Details"}
                {activeTab === "transport" && "Put Your Journey Details"}
                {activeTab === "hotel" && "Put Your Hotel Details"}
                {activeTab === "DeepSea" && "Put Your Journey Details"}
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
                aiAnalysisData={aiAnalysisData}
                calculatorType={activeTab}
                setShowDashboard={setShowDashboard}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
