"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Download,
  Mail,
  Calendar,
  Plane,
  Users,
  Clock,
  MapPin,
  Leaf,
  QrCode,
  Share2,
} from "lucide-react";

export default function BookingComplete() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(true);
  const [bookingData, setBookingData] = useState(null);
  const [bookingRef] = useState(`EML-${Date.now().toString().slice(-6)}`);

  useEffect(() => {
    document.title = "Booking Confirmed - Emission Lab";

    // Load booking data from sessionStorage
    const storedBooking = sessionStorage.getItem("lastBooking");
    if (storedBooking) {
      setBookingData(JSON.parse(storedBooking));
    }

    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading booking details...
      </div>
    );
  }

  // Extract data from bookingData
  const {
    outbound,
    inbound,
    passengers,
    searchParams,
    carbonOffset,
    totalPrice,
  } = bookingData;
  const passengerCount = Array.isArray(passengers)
    ? passengers.length
    : passengers || 1;

  // Next steps information
  const nextSteps = [
    {
      step: 1,
      title: "Check-in Online",
      description: "Available 24 hours before departure",
      icon: Calendar,
      color: "blue",
    },
    {
      step: 2,
      title: "Arrive at Airport",
      description: "2 hours before international flights",
      icon: Clock,
      color: "orange",
    },
    {
      step: 3,
      title: "Carbon Offset Applied",
      description: "Offset Certificate will be set to passengers email",
      icon: Leaf,
      color: "green",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  backgroundColor: [
                    "#3B82F6",
                    "#10B981",
                    "#F59E0B",
                    "#EF4444",
                    "#8B5CF6",
                  ][Math.floor(Math.random() * 5)],
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                <CheckCircle className="h-16 w-16 text-white" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              🎉 Booking Confirmed!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your flight has been successfully booked. Get ready for an amazing
              journey!
            </p>

            <div className="flex items-center justify-center gap-4 mt-6">
              <Badge className="bg-green-100 text-green-700 px-4 py-2 text-base font-medium">
                Booking Reference: {bookingRef}
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 px-4 py-2 text-base font-medium">
                Confirmation sent to email
              </Badge>
            </div>
          </div>

          {/* Booking Details Card */}
          <Card className="shadow-2xl mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Flight Details</h2>
                  <div className="flex items-center gap-4 text-blue-100">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {passengerCount} Passenger{passengerCount > 1 ? "s" : ""}
                    </span>
                    <span className="flex items-center gap-1">
                      <Plane className="h-4 w-4" />
                      {outbound.class.charAt(0).toUpperCase() +
                        outbound.class.slice(1)}{" "}
                      Class
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">${totalPrice || 0}</div>
                  <div className="text-blue-100">Total Paid</div>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Outbound Flight */}
              <div className="flex items-center justify-between mb-8 p-6 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {outbound.flight.departure.time}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {searchParams?.origin || outbound.flight.departure.airport}
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center mx-8">
                  <div className="flex items-center w-full">
                    <div className="flex-1 h-1 bg-gradient-to-r from-blue-200 to-blue-400"></div>
                    <div className="p-3 bg-blue-100 rounded-full mx-4">
                      <Plane className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1 h-1 bg-gradient-to-r from-blue-400 to-blue-200"></div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {outbound.flight.arrival.time}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {searchParams?.destination ||
                      outbound.flight.arrival.airport}
                  </div>
                </div>
              </div>

              {/* Inbound Flight (if exists) */}
              {inbound && inbound.flight && (
                <div className="flex items-center justify-between mb-8 p-6 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">
                      {inbound.flight.departure.time}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {searchParams?.destination ||
                        inbound.flight.departure.airport}
                    </div>
                  </div>

                  <div className="flex-1 flex items-center justify-center mx-8">
                    <div className="flex items-center w-full">
                      <div className="flex-1 h-1 bg-gradient-to-r from-blue-200 to-blue-400"></div>
                      <div className="p-3 bg-blue-100 rounded-full mx-4">
                        <Plane className="h-6 w-6 text-blue-600 rotate-180" />
                      </div>
                      <div className="flex-1 h-1 bg-gradient-to-r from-blue-400 to-blue-200"></div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">
                      {inbound.flight.arrival.time}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {searchParams?.origin || inbound.flight.arrival.airport}
                    </div>
                  </div>
                </div>
              )}

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="font-semibold text-gray-900">Airline</div>
                  <div className="text-blue-600 font-medium">
                    {outbound.flight.airline}
                  </div>
                  <div className="text-sm text-gray-600">
                    {outbound.flight.flightNumber}
                  </div>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="font-semibold text-gray-900">Class</div>
                  <div className="text-purple-600 font-medium">
                    {outbound.class.charAt(0).toUpperCase() +
                      outbound.class.slice(1)}
                  </div>
                  <div className="text-sm text-gray-600">Premium service</div>
                </div>

                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="font-semibold text-gray-900">Duration</div>
                  <div className="text-orange-600 font-medium">
                    {outbound.flight.duration}
                  </div>
                  <div className="text-sm text-gray-600">
                    {outbound.flight.stops === 0
                      ? "Direct flight"
                      : `${outbound.flight.stops} stops`}
                  </div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="font-semibold text-gray-900">
                    Carbon Offset
                  </div>
                  <div className="text-green-600 font-medium flex items-center justify-center gap-1">
                    <Leaf className="h-4 w-4" />
                    {carbonOffset?.enabled ? "Included" : "Not Applied"}
                  </div>
                  {carbonOffset?.enabled && (
                    <div className="text-sm text-gray-600">
                      {carbonOffset.totalEmission} MT CO₂e
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <Button
              size="lg"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Download className="h-5 w-5" />
              Download E-Ticket
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex items-center justify-center gap-2"
            >
              <Mail className="h-5 w-5" />
              Email Ticket
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex items-center justify-center gap-2"
            >
              <QrCode className="h-5 w-5" />
              Mobile Boarding Pass
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex items-center justify-center gap-2"
            >
              <Share2 className="h-5 w-5" />
              Share Trip
            </Button>
          </div>

          {/* Next Steps */}
          <Card className="shadow-xl mb-8">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
              <h3 className="text-xl font-bold">What&apos;s Next?</h3>
              <p className="text-gray-300">
                Here&apos;s what you need to do before your trip
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {nextSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg bg-gray-50"
                    >
                      <div
                        className={`w-12 h-12 bg-${step.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        <div
                          className={`w-6 h-6 bg-${step.color}-600 rounded-full flex items-center justify-center text-white text-xs font-bold`}
                        >
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className={`h-5 w-5 text-${step.color}-600`} />
                          <div className="font-semibold text-gray-900">
                            {step.title}
                          </div>
                        </div>
                        <div className="text-gray-600">{step.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Travel Tips */}
          <Card className="shadow-xl mb-8">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Travel Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-blue-600">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">Before Departure</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 ml-6">
                    <li>• Check passport validity (6+ months)</li>
                    <li>• Review visa requirements</li>
                    <li>• Purchase travel insurance</li>
                    <li>• Pack according to airline rules</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-green-600">
                    <Leaf className="h-4 w-4" />
                    <span className="font-medium">Eco-Friendly Travel</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 ml-6">
                    <li>• Your carbon offset is automatically applied</li>
                    <li>• Use public transport at destination</li>
                    <li>• Choose eco-friendly accommodations</li>
                    <li>• Support local sustainable businesses</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Final Actions */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => router.push("/business/demoFlight")}
                className="bg-blue-600 hover:bg-blue-700 px-8"
              >
                Book Another Flight
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/")}
                className="px-8"
              >
                Back to Home
              </Button>
            </div>

            <p className="text-sm text-gray-600">
              Questions? Contact our 24/7 support at{" "}
              <span className="font-medium text-blue-600">
                support@emissionlab.com
              </span>{" "}
              or{" "}
              <span className="font-medium text-blue-600">+1-800-FLIGHTS</span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          background: #3b82f6;
          animation: confetti-fall 3s linear infinite;
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
