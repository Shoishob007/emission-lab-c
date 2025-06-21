import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Review = ({}) => {
  return (
    <>
      <TabsContent value="review">
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
            <div className="flex gap-2">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">
                Please review all details carefully before completing your
                booking. All information should match your travel documents.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Review Booking Details
            </h3>

            <div className="space-y-6">
              {/* Traveller Summary */}
              <div className="bg-white border rounded-md p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Traveller Information</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateToStep("traveler")}
                  >
                    Edit
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">John Doe</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium">Male</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">17 Oct 2013</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nationality</p>
                    <p className="font-medium">Bangladesh</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Passport Number</p>
                    <p className="font-medium">AB1234567</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Passport Expiry</p>
                    <p className="font-medium">18 Oct 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">+880 1712345678</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">john.doe@example.com</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">Additional Requests</p>
                  <div className="flex gap-4 mt-1">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">Meal:</span>
                      <span className="text-sm">None</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">Wheelchair:</span>
                      <span className="text-sm">No</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-white border rounded-md p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Payment Information</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateToStep("payment")}
                  >
                    Edit
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Image
                        src="/payment/visa.png"
                        alt="Visa"
                        width={40}
                        height={25}
                      />
                      <p className="font-medium">Visa</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Applied Coupon</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                        FLIGHTINT
                      </span>
                      <span className="text-sm font-medium text-primary">
                        10% OFF
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => navigateToStep("payment")}
                >
                  Back
                </Button>
                <Button className="bg-blue-500 hover:bg-blue-600">
                  Complete Booking
                </Button>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </>
  );
};

export default Review;
