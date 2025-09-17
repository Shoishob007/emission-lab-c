"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  User,
  Mail,
  Users,
  ArrowRight,
  UserCheck,
  Globe,
  Plane,
} from "lucide-react";

export function PassengerDetails({
  bookingData,
  onComplete,
  onBack,
  canGoBack,
}) {
  // default dates
  const defaultDOB = "1998-01-01";
  const oneYearLater = new Date();
  oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
  const expiryDate = oneYearLater.toISOString().split("T")[0];
  const { outbound, inbound, passengers, searchParams, tripType } = bookingData;

  // default passengers
  const [passengerList, setPassengerList] = useState(
    Array.from({ length: bookingData.passengers }, (_, index) => ({
      id: index + 1,
      type: "Adult",
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: defaultDOB,
      documentType: "passport",
      documentNumber: "A00000000",
      issuingCountry: "BD",
      documentExpiry: expiryDate,
      mobility: false,
    }))
  );

  // default contact info
  const [contactInfo, setContactInfo] = useState({
    phone: "+8801234567890",
    email: "",
    whatsapp: false,
  });

  const [errors, setErrors] = useState({});

  const handlePassengerChange = (index, field, value) => {
    setPassengerList((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );

    if (errors[`passenger${index}_${field}`]) {
      setErrors((prev) => ({ ...prev, [`passenger${index}_${field}`]: null }));
    }
  };

  const handleContactChange = (field, value) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
    if (errors[`contact_${field}`]) {
      setErrors((prev) => ({ ...prev, [`contact_${field}`]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    passengerList.forEach((passenger, index) => {
      const requiredFields = [
        "firstName",
        "lastName",
        "gender",
        "dateOfBirth",
        "documentNumber",
        "issuingCountry",
        "documentExpiry",
      ];
      requiredFields.forEach((field) => {
        if (!passenger[field]) {
          newErrors[`passenger${index}_${field}`] = "This field is required";
        }
      });
    });

    if (!contactInfo.email) {
      newErrors.contact_email = "Email is required";
    }
    if (contactInfo.phone.length < 4) {
      newErrors.contact_phone = "Valid phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      onComplete({
        passengers: passengerList,
        contactInfo,
      });
    }
  };

  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            Passenger Information
          </h3>
          <p className="text-gray-600 text-lg">
            Please provide accurate information as it appears on your travel
            documents
          </p>
        </div>

        {/* Passenger Forms */}
        <div className="space-y-6 mb-8">
          {passengerList.map((passenger, index) => (
            <Card key={passenger.id} className="overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-blue-600 to-blue-600 text-white p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-lg">
                      Passenger {index + 1}
                    </span>
                    <div className="text-blue-100 text-sm">
                      {passenger.type}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Personal Information */}
                <div className="mb-8">
                  <h5 className="text-lg font-semibold mb-4 text-gray-900">
                    Personal Information
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        First Name *
                      </Label>
                      <Input
                        value={passenger.firstName}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "firstName",
                            e.target.value
                          )
                        }
                        className={`mt-1 ${
                          errors[`passenger${index}_firstName`]
                            ? "border-red-500"
                            : ""
                        }`}
                        placeholder="Enter first name"
                      />
                      {errors[`passenger${index}_firstName`] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[`passenger${index}_firstName`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Last Name *
                      </Label>
                      <Input
                        value={passenger.lastName}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "lastName",
                            e.target.value
                          )
                        }
                        className={`mt-1 ${
                          errors[`passenger${index}_lastName`]
                            ? "border-red-500"
                            : ""
                        }`}
                        placeholder="Enter last name"
                      />
                      {errors[`passenger${index}_lastName`] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[`passenger${index}_lastName`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Gender *
                      </Label>
                      <Select
                        value={passenger.gender}
                        onValueChange={(value) =>
                          handlePassengerChange(index, "gender", value)
                        }
                      >
                        <SelectTrigger
                          className={`mt-1 ${
                            errors[`passenger${index}_gender`]
                              ? "border-red-500"
                              : ""
                          }`}
                        >
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="M">Male</SelectItem>
                          <SelectItem value="F">Female</SelectItem>
                          <SelectItem value="O">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors[`passenger${index}_gender`] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[`passenger${index}_gender`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Date of Birth *
                      </Label>
                      <Input
                        type="date"
                        value={passenger.dateOfBirth}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "dateOfBirth",
                            e.target.value
                          )
                        }
                        className={`mt-1 ${
                          errors[`passenger${index}_dateOfBirth`]
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {errors[`passenger${index}_dateOfBirth`] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[`passenger${index}_dateOfBirth`]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Document Details */}
                <div className="border-t pt-6 mb-6">
                  <h5 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    Travel Document
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Document Type *
                      </Label>
                      <Select
                        value={passenger.documentType}
                        onValueChange={(value) =>
                          handlePassengerChange(index, "documentType", value)
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="passport">Passport</SelectItem>
                          <SelectItem value="id">National ID</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Document Number *
                      </Label>
                      <Input
                        value={passenger.documentNumber}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "documentNumber",
                            e.target.value.toUpperCase()
                          )
                        }
                        className={`mt-1 ${
                          errors[`passenger${index}_documentNumber`]
                            ? "border-red-500"
                            : ""
                        }`}
                        placeholder="Enter document number"
                      />
                      {errors[`passenger${index}_documentNumber`] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[`passenger${index}_documentNumber`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Issuing Country *
                      </Label>
                      <Select
                        value={passenger.issuingCountry}
                        onValueChange={(value) =>
                          handlePassengerChange(index, "issuingCountry", value)
                        }
                      >
                        <SelectTrigger
                          className={`mt-1 ${
                            errors[`passenger${index}_issuingCountry`]
                              ? "border-red-500"
                              : ""
                          }`}
                        >
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BD">Bangladesh</SelectItem>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="UK">United Kingdom</SelectItem>
                          <SelectItem value="CA">Canada</SelectItem>
                          <SelectItem value="AU">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors[`passenger${index}_issuingCountry`] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[`passenger${index}_issuingCountry`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Document Expiry *
                      </Label>
                      <Input
                        type="date"
                        value={passenger.documentExpiry}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "documentExpiry",
                            e.target.value
                          )
                        }
                        className={`mt-1 ${
                          errors[`passenger${index}_documentExpiry`]
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {errors[`passenger${index}_documentExpiry`] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[`passenger${index}_documentExpiry`]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Special Assistance */}
                <div className="border-t pt-6">
                  <h5 className="text-lg font-semibold mb-4 text-gray-900">
                    Special Assistance
                  </h5>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={`mobility-${index}`}
                      checked={passenger.mobility}
                      onCheckedChange={(checked) =>
                        handlePassengerChange(
                          index,
                          "mobility",
                          Boolean(checked)
                        )
                      }
                    />
                    <Label
                      htmlFor={`mobility-${index}`}
                      className="text-sm text-gray-700"
                    >
                      Passenger requires mobility assistance
                    </Label>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Contact Information */}
        <Card className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-600 text-white p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Mail className="h-5 w-5" />
              </div>
              <span className="font-semibold text-lg">Contact Information</span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Phone Number *
                </Label>
                <div className="flex mt-1">
                  <Select
                    value={contactInfo.phone.substring(0, 4)}
                    onValueChange={(val) =>
                      handleContactChange(
                        "phone",
                        val + contactInfo.phone.substring(4)
                      )
                    }
                  >
                    <SelectTrigger className="w-28 rounded-r-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+880">+880</SelectItem>
                      <SelectItem value="+94">+94</SelectItem>
                      <SelectItem value="+1">+1</SelectItem>
                      <SelectItem value="+44">+44</SelectItem>
                      <SelectItem value="+91">+91</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Phone Number"
                    className={`rounded-l-none border-l-0 ${
                      errors.contact_phone ? "border-red-500" : ""
                    }`}
                    value={contactInfo.phone.substring(4)}
                    onChange={(e) =>
                      handleContactChange(
                        "phone",
                        contactInfo.phone.substring(0, 4) + e.target.value
                      )
                    }
                  />
                </div>
                {errors.contact_phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.contact_phone}
                  </p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Email Address *
                </Label>
                <Input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => handleContactChange("email", e.target.value)}
                  className={`mt-1 ${
                    errors.contact_email ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your email"
                />
                {errors.contact_email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.contact_email}
                  </p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Booking Contact
                </Label>
                <Select defaultValue="passenger1">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {passengerList.map((p, i) => (
                      <SelectItem key={i} value={`passenger${i + 1}`}>
                        Passenger {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="text-blue-600 mt-1">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div className="text-sm text-blue-700">
                  <strong>Important:</strong> Please ensure all passenger
                  information matches exactly with your travel documents. Any
                  discrepancies may result in denied boarding.
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Bottom Action Bar */}
        <div className="sticky bottom-0 bg-white border-t p-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              {/* Outbound Flight Info */}
              <div className="flex items-center gap-2">
                <Plane className="h-4 w-4 text-blue-600" />
                <span className="font-medium">
                  Outbound: {searchParams.origin} → {searchParams.destination}
                </span>
                <span>
                  {outbound.flight.departure.time} -{" "}
                  {outbound.flight.arrival.time}
                </span>
                <span className="text-gray-500">
                  {outbound.flight.flightNumber}
                </span>
              </div>

              {/* Inbound Flight Info */}
              {inbound && (
                <div className="flex items-center gap-2">
                  <Plane className="h-4 w-4 text-blue-600 rotate-180" />
                  <span className="font-medium">
                    Return: {searchParams.destination} → {searchParams.origin}
                  </span>
                  <span>
                    {inbound.flight.departure.time} -{" "}
                    {inbound.flight.arrival.time}
                  </span>
                  <span className="text-gray-500">
                    {inbound.flight.flightNumber}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  ${(bookingData.totalPrice || 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">For all passengers</div>
              </div>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg font-semibold"
                onClick={handleContinue}
              >
                Continue to Services
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
