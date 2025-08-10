/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from "lucide-react";
import Traveller from "./components/Traveller-tab";
import Payment from "./components/Payment-tab";
import Review from "./components/Review-tab";
import SidebarBooking from "./components/Sidebar-Booking";
import { useSession } from "next-auth/react";
import { fetchEquivalentValues } from "@/utils/api/AiEquivalentAPI";

export default function FlightBooking() {
  const { data: session } = useSession();
  const emission_lab_key = session?.user?.profile?.emission_lab_key;
  console.log("Emission lab key :: ", emission_lab_key);

  const searchParams = useSearchParams();
  const [activeStep, setActiveStep] = useState("traveler");
  const [selectedCoupon, setSelectedCoupon] = useState("FLIGHTINT");
  const [couponCode, setCouponCode] = useState("");
  const [showCouponsList, setShowCouponsList] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("visa");
  const [showEmissionsDetails, setShowEmissionsDetails] = useState(false);

  const [carbonData, setCarbonData] = useState(null);
  const [equivalentData, setEquivalentData] = useState(null);
  const [loadingEquivalent, setLoadingEquivalent] = useState(false);
  const [carbonLoading, setCarbonLoading] = useState(true);

  const flightParams = {
    user_id: "1adfdf",
    iata_airport_from: "DUB",
    iata_airport_to: "JFK",
    number_of_passengers: 1,
    flight_class: "Economy",
    round_trip: "Y",
    aircraft_type: "B777",
  };

  useEffect(() => {
    async function loadCarbonEmissions() {
      try {
        setCarbonLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/carbon/airAPI/carbon-emission/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(flightParams),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch carbon emissions");
        }

        const data = await response.json();
        console.log("Carbon emission response:", data);

        if (data.result && data.result.success) {
          setCarbonData(data.result.data);
        }
      } catch (error) {
        console.error("Error fetching carbon emissions:", error);
      } finally {
        setCarbonLoading(false);
      }
    }

    loadCarbonEmissions();
  }, []);

  const handleFetchEquivalentValues = async () => {
    if (!carbonData || loadingEquivalent) return;

    try {
      setLoadingEquivalent(true);

      const requestBody = {
        flight_details: {
          travel_from: carbonData.airport_from,
          travel_to: carbonData.airport_to,
          distance_km: carbonData.distance_km,
          round_trip: carbonData.round_trip === "Y",
          number_of_passengers: parseInt(carbonData.number_of_passengers),
          flight_class: carbonData.flight_class,
        },
        carbon_emissions: {
          co2e_gm: carbonData.emissions.co2e_gm,
          co2e_kg: carbonData.emissions.co2e_kg,
          co2e_mt: carbonData.emissions.co2e_mt,
          co2e_lb: carbonData.emissions.co2e_lb,
        },
      };

      console.log("Fetching equivalent values with:", requestBody);

      const equivalentResponse = await fetchEquivalentValues(
        requestBody,
        emission_lab_key
      );

      if (equivalentResponse) {
        console.log("Equivalent values response:", equivalentResponse);
        setEquivalentData(equivalentResponse);
      }
    } catch (error) {
      console.error("Error fetching equivalent values:", error);
    } finally {
      setLoadingEquivalent(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full ${
                  activeStep === "traveler" ||
                  activeStep === "payment" ||
                  activeStep === "review"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                } flex items-center justify-center`}
              >
                <CheckCircle className="h-5 w-5" />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">Booking Details</p>
                <p className="text-xs text-gray-500">25:10 remaining</p>
              </div>
            </div>
            <div className="h-1 flex-1 mx-4 bg-gray-200 ">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{
                  width:
                    activeStep === "traveler"
                      ? "0%"
                      : activeStep === "payment"
                      ? "120%"
                      : "w-full",
                }}
              />
            </div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full ${
                  activeStep === "payment" || activeStep === "review"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                } flex items-center justify-center`}
              >
                {activeStep === "payment" || activeStep === "review" ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  "2"
                )}
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">Payment</p>
              </div>
            </div>
            <div className="h-1 flex-1 mx-4 bg-gray-200">
              <div
                className={`h-full bg-blue-500 ${
                  activeStep === "review" ? "w-full" : "w-0"
                }`}
              ></div>
            </div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full ${
                  activeStep === "review"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                } flex items-center justify-center`}
              >
                {activeStep === "review" ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  "3"
                )}
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">Review & Proceed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <Card className="p-6 mb-6">
              <Tabs value={activeStep} onValueChange={setActiveStep}>
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger
                    value="traveler"
                    className="data-[state=active]:bg-secondary data-[state=active]:text-white"
                  >
                    Traveller Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="payment"
                    className="data-[state=active]:bg-secondary data-[state=active]:text-white"
                  >
                    Payment Options
                  </TabsTrigger>
                  <TabsTrigger
                    value="review"
                    className="data-[state=active]:bg-secondary data-[state=active]:text-white"
                  >
                    Review & Proceed
                  </TabsTrigger>
                </TabsList>

                <Traveller value="traveler" />
                <Payment
                  value="payment"
                  selectedCoupon={selectedCoupon}
                  selectedPayment={selectedPayment}
                  showCouponsList={showCouponsList}
                  setSelectedPayment={setSelectedPayment}
                  setSelectedCoupon={setSelectedCoupon}
                  couponCode={couponCode}
                  setCouponCode={setCouponCode}
                  setShowCouponsList={setShowCouponsList}
                />

                <Review value="review" />
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <SidebarBooking
            showEmissionsDetails={showEmissionsDetails}
            setShowEmissionsDetails={setShowEmissionsDetails}
            selectedCoupon={selectedCoupon}
            carbonData={carbonData}
            equivalentData={equivalentData}
            loadingEquivalent={loadingEquivalent}
            carbonLoading={carbonLoading}
            onFetchEquivalentValues={handleFetchEquivalentValues}
          />
        </div>
      </div>
    </div>
  );
}
