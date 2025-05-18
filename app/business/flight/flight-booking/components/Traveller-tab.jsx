import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { User, Info, AlertTriangle } from "lucide-react";
import { wheelchairOptions, mealOptions } from "./dummyFlightData";

const Traveller = ({}) => {
  return (
    <>
      <TabsContent value="traveler">
        <div className="space-y-6">
          <div className="bg-orange-50 border border-orange-100 p-4 rounded-lg">
            <div className="flex gap-2 items-center">
              <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-orange-700">
                In emergency scenarios, Airlines has the authority to cancel or
                reschedule flight any time. Please check travel restrictions,
                visa requirements & health advisories before you travel.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold">Primary Traveller</h3>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-6">
              <div className="flex gap-2 items-center">
                <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700">
                  Provide all the information exactly as they appear in the
                  passport to avoid boarding issues.
                </p>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-6">
              <h4 className="text-md mb-4 text-gray-700 border p-1 font-semibold text-center">
                Personal Information
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="font-medium text-sm">
                    Given Name*
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Enter given name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="font-medium text-sm">
                    Surname*
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Enter surname"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="gender" className="font-medium text-sm">
                    Select Gender*
                  </Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="nationality" className="font-medium text-sm">
                    Select Nationality*
                  </Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bd">Bangladesh</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dob" className="font-medium text-sm">
                    Date of Birth*
                  </Label>
                  <Input type="date" id="dob" className="mt-1" />
                </div>
                <div>
                  <Label
                    htmlFor="frequentFlyer"
                    className="font-medium text-sm"
                  >
                    Frequent Flyer Number
                  </Label>
                  <Input
                    id="frequentFlyer"
                    placeholder="Enter if available"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="font-medium text-sm">
                    Phone Number*
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Enter phone number"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="font-medium text-sm">
                    Email*
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Passport and Visa Information */}
            <div className="mb-6">
              <h4 className="text-md mb-4 text-gray-700 border p-1 font-semibold text-center">
                Passport and Visa Information
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="passport" className="font-medium text-sm">
                    Passport Number*
                  </Label>
                  <Input
                    id="passport"
                    placeholder="Enter passport number"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="passportExpiry"
                    className="font-medium text-sm"
                  >
                    Passport Expiry Date*
                  </Label>
                  <Input type="date" id="passportExpiry" className="mt-1" />
                </div>
              </div>

              <div className="mt-4 px-4 py-3 bg-amber-50 rounded-md border border-amber-100 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <p className="text-sm text-amber-700 font-medium">
                  It is mandatory to upload copy of valid Passport and Visa
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Label
                    htmlFor="passportUpload"
                    className="font-medium text-sm"
                  >
                    Upload Passport*
                  </Label>
                  <div className="mt-1 border-2 border-dashed border-blue-300 rounded-md p-4 text-center">
                    <Button variant="outline" className="w-full text-blue-500">
                      Click To Upload
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="visaUpload" className="font-medium text-sm">
                    Upload Visa*
                  </Label>
                  <div className="mt-1 border-2 border-dashed border-blue-300 rounded-md p-4 text-center">
                    <Button variant="outline" className="w-full text-blue-500">
                      Click To Upload
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div className="mb-6">
              <h4 className="text-md font-semibold mb-4 text-gray-700 border p-1 text-center">
                Additional Options{" "}
                <span className="text-xs font-light text-gray-500 mb-1">
                  (Optional)
                </span>
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mealType" className="font-medium text-sm">
                    Select Meal Type
                  </Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                      {mealOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="wheelchair" className="font-medium text-sm">
                    Request Wheel Chair
                  </Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="No" />
                    </SelectTrigger>
                    <SelectContent>
                      {wheelchairOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center space-x-2 bg-orange-50 p-3 rounded-md">
                <Switch id="save-traveler" />
                <Label htmlFor="save-traveler" className="font-medium">
                  Save this traveler info for future use
                </Label>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <Button variant="outline">Back</Button>
              <Button
                onClick={() => navigateToStep("payment")}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Save & Continue
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </>
  );
};

export default Traveller;
