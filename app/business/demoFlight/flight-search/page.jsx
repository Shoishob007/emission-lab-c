"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plane,
  Clock,
  Users,
  Wifi,
  Coffee,
  MapPin,
  ChevronRight,
  Info,
  Calendar,
  ArrowRight,
  ArrowLeftRight,
} from "lucide-react";
import { FlightClassModal } from "../components/FlightClassModal";
import { BookingFlow } from "../components/BookingFlow";

// Enhanced dummy flight data with more variety
const generateFlights = (origin, destination, date, isReturn = false) => {
  const baseFlights = [
    {
      id: isReturn ? "FL001-R" : "FL001",
      airline: "Emirates Airways",
      flightNumber: "EM401",
      departure: {
        time: isReturn ? "08:15" : "06:15",
        airport: isReturn ? destination : origin,
        terminal: "Terminal 2",
      },
      arrival: {
        time: isReturn ? "13:45" : "11:45",
        airport: isReturn ? origin : destination,
        terminal: "Terminal 1",
      },
      duration: "5h 30min",
      stops: 0,
      aircraft: "Boeing 737-800",
      carbonEmission: 0.245,
      prices: {
        economy: { budget: 189, classic: 245, plus: 289 },
        business: { budget: 456, classic: 512, plus: 598 },
      },
      amenities: ["Wifi", "Meals", "Entertainment"],
      date: date,
    },
    {
      id: isReturn ? "FL002-R" : "FL002",
      airline: "Emirates Airways",
      flightNumber: "EM403",
      departure: {
        time: isReturn ? "16:30" : "14:30",
        airport: isReturn ? destination : origin,
        terminal: "Terminal 2",
      },
      arrival: {
        time: isReturn ? "22:15" : "20:15",
        airport: isReturn ? origin : destination,
        terminal: "Terminal 1",
      },
      duration: "5h 45min",
      stops: 0,
      aircraft: "Airbus A320",
      carbonEmission: 0.267,
      prices: {
        economy: { budget: 212, classic: 268, plus: 315 },
        business: { budget: 487, classic: 543, plus: 629 },
      },
      amenities: ["Wifi", "Meals", "Entertainment", "Extra Legroom"],
      date: date,
    },
    {
      id: isReturn ? "FL003-R" : "FL003",
      airline: "Emirates Airways",
      flightNumber: "EM405",
      departure: {
        time: isReturn ? "20:20" : "18:20",
        airport: isReturn ? destination : origin,
        terminal: "Terminal 2",
      },
      arrival: {
        time: isReturn ? "02:30" : "00:30",
        airport: isReturn ? origin : destination,
        terminal: "Terminal 1",
      },
      duration: "6h 10min",
      stops: 1,
      aircraft: "Boeing 787",
      carbonEmission: 0.298,
      prices: {
        economy: { budget: 167, classic: 223, plus: 269 },
        business: { budget: 412, classic: 468, plus: 554 },
      },
      amenities: ["Meals", "Entertainment"],
      date: date,
    },
  ];

  return baseFlights;
};

export default function FlightSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showClassModal, setShowClassModal] = useState(false);
  const [showBookingFlow, setShowBookingFlow] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [hoveredEmission, setHoveredEmission] = useState(null);
  const [currentStep, setCurrentStep] = useState("outbound");
  const [selectedFlights, setSelectedFlights] = useState({
    outbound: null,
    inbound: null,
  });

  // Get search parameters
  const tripType = searchParams.get("tripType") || "roundTrip";
  const origin = searchParams.get("origin") || "Dubai";
  const destination = searchParams.get("destination") || "Istanbul";
  const departDate = searchParams.get("depart");
  const returnDate = searchParams.get("return");
  const passengers = parseInt(searchParams.get("adult")) || 1;

  const outboundFlights = generateFlights(
    origin,
    destination,
    departDate,
    false
  );
  const inboundFlights =
    tripType === "roundTrip"
      ? generateFlights(origin, destination, returnDate, true)
      : [];

  const handleFlightSelect = (flight, flightClass, subClass) => {
    const flightSelection = {
      flight,
      class: flightClass,
      subClass,
      price: flight.prices[flightClass][subClass],
    };

    if (currentStep === "outbound") {
      const newSelectedFlights = {
        ...selectedFlights,
        outbound: flightSelection,
      };
      setSelectedFlights(newSelectedFlights);

      if (tripType === "roundTrip") {
        setCurrentStep("inbound");
        setShowClassModal(false);
      } else {
        // Single trip, proceed to booking
        const bookingInfo = {
          outbound: flightSelection,
          inbound: null,
          tripType,
          passengers,
          searchParams: { origin, destination, departDate, returnDate },
        };
        setBookingData(bookingInfo);
        setShowClassModal(false);
        setShowBookingFlow(true);
      }
    } else {
      // Inbound flight selected
      const newSelectedFlights = {
        ...selectedFlights,
        inbound: flightSelection,
      };
      setSelectedFlights(newSelectedFlights);

      // Both flights selected, proceed to booking
      const bookingInfo = {
        outbound: selectedFlights.outbound,
        inbound: flightSelection,
        tripType,
        passengers,
        searchParams: { origin, destination, departDate, returnDate },
      };
      setBookingData(bookingInfo);
      setShowClassModal(false);
      setShowBookingFlow(true);
    }
  };

  const handleClassSelection = (flight) => {
    setSelectedFlight(flight);
    setShowClassModal(true);
  };

  const getCurrentFlights = () => {
    return currentStep === "outbound" ? outboundFlights : inboundFlights;
  };

  const getCurrentRoute = () => {
    return currentStep === "outbound"
      ? `${origin} → ${destination}`
      : `${destination} → ${origin}`;
  };

  const getCurrentDate = () => {
    return currentStep === "outbound" ? departDate : returnDate;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  {currentStep === "outbound" ? (
                    <>
                      {origin} <ArrowRight className="h-6 w-6 text-blue-600" />{" "}
                      {destination}
                    </>
                  ) : (
                    <>
                      {destination}{" "}
                      <ArrowRight className="h-6 w-6 text-blue-600" /> {origin}
                    </>
                  )}
                </h1>
                <div className="flex items-center gap-4 mt-2 text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {getCurrentDate()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {passengers} passenger{passengers > 1 ? "s" : ""}
                  </span>
                  <span className="flex items-center gap-1">
                    <ArrowLeftRight className="h-4 w-4" />
                    {tripType === "roundTrip" ? "Round trip" : "One way"}
                  </span>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={() => router.back()}>
              Modify Search
            </Button>
          </div>
        </div>
      </div>

      {/* Flight Selection Progress */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-4 mb-8">
          <Card
            className={`flex-1 p-6 transition-all duration-300 ${
              currentStep === "outbound"
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                : selectedFlights.outbound
                ? "bg-green-50 border-green-200"
                : "bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${
                  currentStep === "outbound"
                    ? "bg-white/20"
                    : selectedFlights.outbound
                    ? "bg-green-100"
                    : "bg-gray-200"
                }`}
              >
                <Plane
                  className={`h-5 w-5 ${
                    currentStep === "outbound"
                      ? "text-white"
                      : selectedFlights.outbound
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                />
              </div>
              <div>
                <div className="font-semibold">
                  {currentStep === "outbound"
                    ? "Choose outbound flight"
                    : "Outbound flight selected"}
                </div>
                <div className="text-sm opacity-90">
                  {origin} → {destination}
                </div>
                {selectedFlights.outbound && (
                  <div className="text-sm opacity-90 mt-1">
                    {selectedFlights.outbound.flight.flightNumber} • $
                    {selectedFlights.outbound.price}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {tripType === "roundTrip" && (
            <Card
              className={`flex-1 p-6 transition-all duration-300 ${
                currentStep === "inbound"
                  ? "bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-lg"
                  : selectedFlights.inbound
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    currentStep === "inbound"
                      ? "bg-white/20"
                      : selectedFlights.inbound
                      ? "bg-green-100"
                      : "bg-gray-200"
                  }`}
                >
                  <Plane
                    className={`h-5 w-5 rotate-180 ${
                      currentStep === "inbound"
                        ? "text-white"
                        : selectedFlights.inbound
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  />
                </div>
                <div>
                  <div className="font-semibold">
                    {currentStep === "inbound"
                      ? "Choose return flight"
                      : selectedFlights.inbound
                      ? "Return flight selected"
                      : "Return flight"}
                  </div>
                  <div className="text-sm opacity-90">
                    {destination} → {origin}
                  </div>
                  {selectedFlights.inbound && (
                    <div className="text-sm opacity-90 mt-1">
                      {selectedFlights.inbound.flight.flightNumber} • $
                      {selectedFlights.inbound.price}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Date Selection */}
        <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2">
          {[-2, -1, 0, 1, 2].map((offset) => {
            const date = new Date(getCurrentDate() || new Date());
            date.setDate(date.getDate() + offset);
            const isSelected = offset === 0;

            return (
              <Button
                key={offset}
                variant={isSelected ? "default" : "outline"}
                className={`min-w-[200px] flex-col h-auto py-4 transition-all duration-300 ${
                  isSelected
                    ? "bg-blue-600 hover:bg-blue-700 shadow-lg"
                    : "hover:shadow-md"
                }`}
              >
                <div className="text-base font-medium">
                  {date.toLocaleDateString("en", { weekday: "short" })}
                </div>
                <div className="text-sm opacity-90">
                  {date.toLocaleDateString("en", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="text-lg font-bold mt-1">
                  ${getCurrentFlights()[0]?.prices.economy.budget || 189}
                </div>
              </Button>
            );
          })}
        </div>

        {/* Flight Results */}
        <div className="space-y-6">
          {getCurrentFlights().map((flight) => (
            <Card
              key={flight.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div className="p-8">
                <div className="flex items-center justify-between">
                  {/* Flight Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-8 mb-6">
                      {/* Departure */}
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">
                          {flight.departure.time}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          {flight.departure.airport}
                        </div>
                        {/* <div className="text-xs text-gray-500">{flight.departure.terminal}</div> */}
                      </div>

                      {/* Flight Path */}
                      <div className="flex-1 flex items-center justify-center relative">
                        <div className="flex items-center gap-2 w-full">
                          <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-200 to-blue-400"></div>
                          <div className="text-center px-6">
                            <div className="p-4 bg-blue-100 rounded-full mb-1">
                              <Plane className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="text-sm font-medium text-gray-700">
                              {flight.duration}
                            </div>
                            {flight.stops > 0 && (
                              <div className="text-xs text-orange-600 font-medium mt-1">
                                {flight.stops} stop
                              </div>
                            )}
                          </div>
                          <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-400 to-blue-200"></div>
                        </div>
                      </div>

                      {/* Arrival */}
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">
                          {flight.arrival.time}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          {flight.arrival.airport}
                        </div>
                        {/* <div className="text-xs text-gray-500">{flight.arrival.terminal}</div> */}
                      </div>
                    </div>

                    {/* Flight Details */}
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">
                        {flight.airline}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded-md font-medium">
                        {flight.flightNumber}
                      </span>
                      <span>{flight.aircraft}</span>
                      <div
                        className="flex items-center gap-2 cursor-pointer relative px-2 py-1 bg-green-50 rounded-md"
                        onMouseEnter={() => setHoveredEmission(flight.id)}
                        onMouseLeave={() => setHoveredEmission(null)}
                      >
                        <span className="text-green-600 font-semibold">
                          {flight.carbonEmission} MT CO₂e
                        </span>
                        <Info className="h-3 w-3 text-green-600" />

                        {hoveredEmission === flight.id && (
                          <div className="absolute bottom-full left-0 mb-2 p-4 bg-gray-900 text-white text-xs rounded-lg shadow-xl w-72 z-10">
                            <div className="font-medium mb-2">
                              Carbon Emission Details
                            </div>
                            <div>
                              This flight will emit approximately{" "}
                              {flight.carbonEmission} MT of CO₂ per passenger.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex gap-4 ml-8">
                    <Card className="p-6 text-center min-w-[140px] hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-200">
                      <div className="text-xs text-gray-600 font-semibold mb-2">
                        ECONOMY
                      </div>
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        ${flight.prices.economy.budget}
                      </div>
                      <div className="text-xs text-gray-500 mb-4">
                        Starting price
                      </div>
                      <Button
                        size="sm"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleClassSelection(flight)}
                      >
                        Select
                      </Button>
                    </Card>

                    <Card className="p-6 text-center min-w-[140px] hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-purple-200">
                      <div className="text-xs text-gray-600 font-semibold mb-2">
                        BUSINESS
                      </div>
                      <div className="text-2xl font-bold text-purple-600 mb-2">
                        ${flight.prices.business.budget}
                      </div>
                      <div className="text-xs text-gray-500 mb-4">
                        Starting price
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
                        onClick={() => handleClassSelection(flight)}
                      >
                        Select
                      </Button>
                    </Card>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showClassModal && selectedFlight && (
        <FlightClassModal
          isOpen={showClassModal}
          onClose={() => setShowClassModal(false)}
          flight={selectedFlight}
          onSelect={handleFlightSelect}
          route={getCurrentRoute()}
          date={getCurrentDate()}
          step={currentStep}
        />
      )}

      {showBookingFlow && bookingData && (
        <BookingFlow
          isOpen={showBookingFlow}
          onClose={() => setShowBookingFlow(false)}
          bookingData={bookingData}
          onComplete={(completedBooking) => {
            sessionStorage.setItem(
              "lastBooking",
              JSON.stringify(completedBooking)
            );
            router.push("/business/demoFlight/booking-complete");
          }}
        />
      )}
    </div>
  );
}
