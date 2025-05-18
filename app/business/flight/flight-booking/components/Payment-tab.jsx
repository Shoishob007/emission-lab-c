import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { CreditCard, CheckCircle, X } from "lucide-react";
import { availableCoupons, paymentMethods } from "./dummyFlightData";
import Image from "next/image";

const Payment = ({
  selectedCoupon,
  selectedPayment,
  showCouponsList,
  setSelectedPayment,
  setSelectedCoupon,
  couponCode,
  setCouponCode,
  setShowCouponsList,
  navigateToStep,
}) => {
  return (
    <>
      <TabsContent value="payment">
        <div className="space-y-6">
          <div>
            <div className="flex items-center mb-4">
              <CreditCard className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold">Choose Payment Option</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div
                className={`p-4 border rounded-md cursor-pointer ${
                  selectedPayment === "card" ? "border-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => setSelectedPayment("card")}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    {selectedPayment === "card" ? (
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    ) : null}
                  </div>
                  <span className="font-medium">Pay by card</span>
                </div>
                <p className="ml-8 text-xs text-gray-500">Credit/Debit Card</p>
              </div>
              <div
                className={`p-4 border rounded-md cursor-pointer ${
                  selectedPayment === "mobile"
                    ? "border-blue-500 bg-blue-50"
                    : ""
                }`}
                onClick={() => setSelectedPayment("mobile")}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    {selectedPayment === "mobile" ? (
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    ) : null}
                  </div>
                  <span className="font-medium">I want to redeem cash</span>
                </div>
                <p className="ml-8 text-xs text-gray-500">
                  Mobile banking, cards, etc
                </p>
              </div>
            </div>

            {/* Coupon Section */}
            <div className="mb-6">
              <div
                className={`p-4 border rounded-md ${
                  selectedCoupon ? "border-green-500 bg-green-50" : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Coupon Discount Applied</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-green-600"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" /> Applied
                  </Button>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                    {selectedCoupon}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-red-500 p-0"
                    onClick={() => setSelectedCoupon("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="coupon" className="font-medium text-sm">
                  Apply Coupon Code
                </Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="coupon"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (couponCode) {
                        setSelectedCoupon(couponCode);
                        setCouponCode("");
                      } else {
                        setShowCouponsList(!showCouponsList);
                      }
                    }}
                  >
                    {couponCode ? "Apply" : "Coupons"}
                  </Button>
                </div>
              </div>

              {showCouponsList && (
                <div className="mt-4 border rounded-md p-4">
                  <h5 className="font-medium mb-3">Available Coupons</h5>
                  <div className="space-y-3">
                    {availableCoupons.map((coupon) => (
                      <div
                        key={coupon.code}
                        className={`p-3 border rounded-md cursor-pointer hover:border-blue-200 ${
                          !coupon.eligible ? "opacity-60" : ""
                        }`}
                        onClick={() => {
                          if (coupon.eligible) {
                            setSelectedCoupon(coupon.code);
                            setShowCouponsList(false);
                          }
                        }}
                      >
                        <div className="flex justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">
                                {coupon.code}
                              </span>
                              <span className="text-xs text-green-600 font-medium">
                                {coupon.discount}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {coupon.description}
                            </p>
                          </div>
                          {!coupon.eligible && (
                            <span className="text-xs text-gray-500">
                              Not eligible
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Payment Methods */}
            <div>
              <p className="text-sm mb-2">
                Coupon{" "}
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                  FLIGHTINT
                </span>{" "}
                is applicable only for these payment methods:
              </p>
              <div className="grid grid-cols-6 gap-3">
                {paymentMethods.slice(0, 18).map((method) => (
                  <div
                    key={method.id}
                    className={`aspect-square border rounded-md flex items-center justify-center cursor-pointer transition ${
                      selectedPayment === method.id
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <Image
                      src={method.image}
                      alt={method.name}
                      width={80}
                      height={50}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Coupon is applied currently. Please be informed that selecting a
                different method will cancel this coupon.
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => navigateToStep("traveler")}
            >
              Back to Traveller Details
            </Button>
            <Button
              onClick={() => navigateToStep("review")}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Proceed to Review
            </Button>
          </div>
        </div>
      </TabsContent>
    </>
  );
};

export default Payment;
