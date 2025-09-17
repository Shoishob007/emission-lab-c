"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Luggage,
  Wheat as Seat,
  Utensils,
  Users,
  Plane,
  Plus,
  Leaf,
  Info,
  ChevronDown,
  ArrowRight,
  ShoppingBag,
  Coffee,
} from "lucide-react";

export function AdditionalServices({
  bookingData,
  onComplete,
  onBack,
  canGoBack,
}) {
  // Determine passenger count and names robustly
  const passengerCount = Array.isArray(bookingData.passengers)
    ? bookingData.passengers.length
    : bookingData.passengers;

  const passengerNames = Array.isArray(bookingData.passengers)
    ? bookingData.passengers.map(
        (p, i) => `${p.firstName || "Passenger"} ${p.lastName || i + 1}`
      )
    : Array.from({ length: passengerCount }, (_, i) => `Passenger ${i + 1}`);

  const [selectedServices, setSelectedServices] = useState({
    extraBaggage: {
      outbound: null,
      inbound: null,
    },
    seatSelection: {
      outbound: null,
      inbound: null,
    },
    specialMeals: null,
    carbonOffset: false,
    priorityBoarding: false,
    loungeAccess: false,
  });

  // Defensive null checks for outbound/inbound
  const outbound = bookingData.outbound || {};
  const inbound = bookingData.inbound || null;

  const searchParams = bookingData.searchParams || {};

  const carbonEmissionPerPerson = outbound.flight?.carbonEmission || 0;
  const inboundEmission =
    inbound && inbound.flight ? inbound.flight.carbonEmission : 0;
  const totalEmission =
    (carbonEmissionPerPerson + inboundEmission) * passengerCount;
  const offsetPricePerPerson = Math.round(
    (carbonEmissionPerPerson + inboundEmission) * 20
  );
  const totalOffsetPrice = offsetPricePerPerson * passengerCount;

  const handleServiceChange = (service, value) => {
    setSelectedServices((prev) => ({
      ...prev,
      [service]: value,
    }));
  };

  const calculateServicesTotal = () => {
    let total = 0;
    if (selectedServices.carbonOffset) total += totalOffsetPrice;
    if (selectedServices.priorityBoarding) total += 25 * passengerCount;
    if (selectedServices.loungeAccess) total += 45 * passengerCount;
    return total;
  };

  const handleContinue = () => {
    onComplete({
      additionalServices: selectedServices,
      servicesTotal: calculateServicesTotal(),
      carbonOffset: {
        enabled: selectedServices.carbonOffset,
        emissionPerPerson: carbonEmissionPerPerson + inboundEmission,
        totalEmission,
        pricePerPerson: offsetPricePerPerson,
        totalPrice: selectedServices.carbonOffset ? totalOffsetPrice : 0,
      },
    });
  };

  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            Additional Services
          </h3>
          <p className="text-gray-600 text-lg">
            Enhance your journey with our premium services and options
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Badge variant="outline" className="font-mono">
              Booking: ZXS124H
            </Badge>
            <Badge variant="secondary">
              {passengerCount} Passenger{passengerCount > 1 ? "s" : ""}
            </Badge>
          </div>
        </div>

        {/* Service Options */}
        <div className="space-y-8 mb-8">
          {/* Extra Baggage */}
          <Card className="">
            <div className="bg-gradient-to-r from-blue-600 to-blue-600 text-white p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Luggage className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Extra Baggage</h4>
                  <div className="text-orange-100 text-sm">
                    Add more luggage to your journey
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-semibold mb-4 text-gray-900">
                    Outbound: {searchParams.origin} → {searchParams.destination}
                  </h5>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <Luggage className="h-8 w-8 text-green-600" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">15 kg</div>
                        <div className="text-sm text-green-600 font-medium">
                          Included with {outbound.class} class
                        </div>
                      </div>
                      <Badge className="bg-green-600 text-white">Free</Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      disabled
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Extra Baggage (+$45)
                    </Button>
                  </div>
                </div>
                {inbound && (
                  <div>
                    <h5 className="font-semibold mb-4 text-gray-900">
                      Return: {searchParams.destination} → {searchParams.origin}
                    </h5>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                        <Luggage className="h-8 w-8 text-green-600" />
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">
                            15 kg
                          </div>
                          <div className="text-sm text-green-600 font-medium">
                            Included with {inbound.class} class
                          </div>
                        </div>
                        <Badge className="bg-green-600 text-white">Free</Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        disabled
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Extra Baggage (+$45)
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Seat Selection */}
          <Card className="">
            <div className="bg-gradient-to-r from-blue-600 to-blue-600 text-white p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Seat className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Seat Selection</h4>
                  <div className="text-blue-100 text-sm">
                    Choose your preferred seats
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-semibold mb-4 text-gray-900">
                    Outbound Flight
                  </h5>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-sm text-blue-700 mb-2">
                        Current allocation: Random assignment
                      </div>
                      <div className="text-xs text-gray-600">
                        Seats will be assigned at check-in
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      disabled
                    >
                      <Seat className="h-4 w-4 mr-2" />
                      Select Seats (Available at check-in)
                    </Button>
                  </div>
                </div>
                {inbound && (
                  <div>
                    <h5 className="font-semibold mb-4 text-gray-900">
                      Return Flight
                    </h5>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-sm text-blue-700 mb-2">
                          Current allocation: Random assignment
                        </div>
                        <div className="text-xs text-gray-600">
                          Seats will be assigned at check-in
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        disabled
                      >
                        <Seat className="h-4 w-4 mr-2" />
                        Select Seats (Available at check-in)
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Premium Services */}
          <Card className="">
            <div className="bg-gradient-to-r from-blue-600 to-blue-600 text-white p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Premium Services</h4>
                  <div className="text-purple-100 text-sm">
                    Upgrade your travel experience
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Priority Boarding */}
                <div className="p-6 border rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-100 rounded-full">
                      <Plane className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-2">
                        Priority Boarding
                      </h5>
                      <p className="text-gray-600 text-sm mb-4">
                        Board the aircraft before regular passengers and secure
                        overhead bin space.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-orange-600">
                          $25 per person
                        </div>
                        <Checkbox
                          checked={selectedServices.priorityBoarding}
                          onCheckedChange={(checked) =>
                            handleServiceChange("priorityBoarding", checked)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lounge Access */}
                <div className="p-6 border rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Coffee className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-2">
                        Airport Lounge Access
                      </h5>
                      <p className="text-gray-600 text-sm mb-4">
                        Relax in comfortable lounges with complimentary food,
                        drinks, and WiFi.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-blue-600">
                          $45 per person
                        </div>
                        <Checkbox
                          checked={selectedServices.loungeAccess}
                          onCheckedChange={(checked) =>
                            handleServiceChange("loungeAccess", checked)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Carbon Offset */}
          <Card className="">
            <div className="bg-gradient-to-r from-blue-600 to-blue-600 text-white p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Leaf className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">
                    Carbon Emissions Offset
                  </h4>
                  <div className="text-green-100 text-sm">
                    Make your flight carbon neutral
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <div className="mb-6">
                    <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                      Offset your flight&apos;s carbon emissions by supporting
                      verified environmental projects. Your contribution helps
                      fund renewable energy, reforestation, and clean technology
                      initiatives.
                    </p>

                    <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-green-600">
                            {totalEmission}
                          </div>
                          <div className="text-xs text-gray-600">
                            MT CO₂e total
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">
                            {passengerCount}
                          </div>
                          <div className="text-xs text-gray-600">
                            passenger{passengerCount > 1 ? "s" : ""}
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">
                            ${offsetPricePerPerson}
                          </div>
                          <div className="text-xs text-gray-600">
                            per person
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">
                            ${totalOffsetPrice}
                          </div>
                          <div className="text-xs text-gray-600">
                            total cost
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-600"
                      >
                        🌱 Verified Projects
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-600"
                      >
                        🏆 Gold Standard
                      </Badge>
                      <Button
                        variant="link"
                        className="text-green-600 p-0 h-auto text-sm"
                      >
                        Learn more about our programs →
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`p-6 rounded-xl transition-all duration-300 ${
                      selectedServices.carbonOffset
                        ? "bg-green-100 border-2 border-green-400"
                        : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold text-gray-900 mb-2">
                          Make this flight carbon neutral
                        </div>
                        <div className="text-sm text-gray-600">
                          Total offset for {passengerCount} passenger
                          {passengerCount > 1 ? "s" : ""}:{" "}
                          <span className="font-semibold">
                            ${totalOffsetPrice}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button
                          variant={
                            selectedServices.carbonOffset
                              ? "default"
                              : "outline"
                          }
                          className={
                            selectedServices.carbonOffset
                              ? "bg-green-600 hover:bg-green-700"
                              : "border-green-300 text-green-600 hover:bg-green-50"
                          }
                          onClick={() =>
                            handleServiceChange(
                              "carbonOffset",
                              !selectedServices.carbonOffset
                            )
                          }
                        >
                          {selectedServices.carbonOffset
                            ? "✓ Added"
                            : `Add for $${totalOffsetPrice}`}
                        </Button>
                        <Checkbox
                          checked={selectedServices.carbonOffset}
                          onCheckedChange={(checked) =>
                            handleServiceChange("carbonOffset", checked)
                          }
                          className="w-6 h-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Services Summary */}
        {calculateServicesTotal() > 0 && (
          <Card className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <h4 className="text-lg font-semibold mb-4 text-gray-900">
              Selected Services
            </h4>
            <div className="space-y-2">
              {selectedServices.carbonOffset && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">
                    Carbon Offset ({passengerCount} passenger
                    {passengerCount > 1 ? "s" : ""})
                  </span>
                  <span className="font-semibold">${totalOffsetPrice}</span>
                </div>
              )}
              {selectedServices.priorityBoarding && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">
                    Priority Boarding ({passengerCount} passenger
                    {passengerCount > 1 ? "s" : ""})
                  </span>
                  <span className="font-semibold">${25 * passengerCount}</span>
                </div>
              )}
              {selectedServices.loungeAccess && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">
                    Lounge Access ({passengerCount} passenger
                    {passengerCount > 1 ? "s" : ""})
                  </span>
                  <span className="font-semibold">${45 * passengerCount}</span>
                </div>
              )}
              <div className="border-t pt-2">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Services Total</span>
                  <span className="text-blue-600">
                    ${calculateServicesTotal()}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}

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
                  $
                  {(
                    (bookingData.totalPrice || 0) + calculateServicesTotal()
                  ).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">
                  Total for all passengers
                  {calculateServicesTotal() > 0 && (
                    <div className="text-xs text-green-600">
                      +${calculateServicesTotal()} additional services included
                    </div>
                  )}
                </div>
              </div>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg font-semibold"
                onClick={handleContinue}
              >
                Continue to Payment
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
