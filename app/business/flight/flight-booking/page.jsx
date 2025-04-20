"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from "lucide-react";
import Traveller from "./components/Traveller-tab";
import Payment from "./components/Payment-tab";
import Review from "./components/Review-tab";
import SidebarBooking from "./components/Sidebar-Booking";

// This would typically come from your API or state management
export default function FlightBooking() {
  const searchParams = useSearchParams();
  const [activeStep, setActiveStep] = useState("traveler");
  const [selectedCoupon, setSelectedCoupon] = useState("FLIGHTINT");
  const [couponCode, setCouponCode] = useState("");
  const [showCouponsList, setShowCouponsList] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("visa");
  const [showEmissionsDetails, setShowEmissionsDetails] = useState(false);

  const navigateToStep = (step) => {
    setActiveStep(step);
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
                className={`h-full bg-blue-500 ${
                  activeStep === "traveler"
                    ? "w-0"
                    : activeStep === "payment"
                    ? "w-2/3"
                    : "w-full"
                }`}
              ></div>
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
          />
        </div>
      </div>
    </div>
  );
}
