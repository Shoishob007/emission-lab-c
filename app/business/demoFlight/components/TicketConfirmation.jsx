"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plane, Clock, Users, Utensils, Luggage, Wheat as Seat, Edit, ArrowRight, Calendar } from "lucide-react";

export function TicketConfirmation({ bookingData, onComplete, onBack, canGoBack }) {
  const [fareLockEnabled, setFareLockEnabled] = useState(false);
  const { outbound, inbound, passengers, searchParams, tripType } = bookingData;

  const fareLockPrice = 23.50;
  const outboundPrice = outbound.price * passengers;
  const inboundPrice = inbound ? inbound.price * passengers : 0;
  const totalFlightPrice = outboundPrice + inboundPrice;
  const totalPrice = totalFlightPrice + (fareLockEnabled ? fareLockPrice : 0);

  const handleConfirm = () => {
    onComplete({
      fareLock: fareLockEnabled,
      fareLockPrice: fareLockEnabled ? fareLockPrice : 0,
      totalFlightPrice,
      totalPrice
    });
  };

  const renderFlightDetails = (flightData, label, route, date, isReturn = false) => (
    <Card className="overflow-hidden transition-all duration-300">
      <div className="bg-gradient-to-r from-blue-600 to-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              <Plane className={`h-5 w-5 ${isReturn ? 'rotate-180' : ''}`} />
            </div>
            <div>
              <div className="font-semibold">{label} Flight</div>
              <div className="text-blue-100 text-sm">{route}</div>
            </div>
          </div>
          <Badge className="bg-white text-blue-600 font-medium">
            {flightData.flight.airline}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          {/* Departure */}
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{flightData.flight.departure.time}</div>
            <div className="text-sm text-gray-600 mt-1 font-medium">{flightData.flight.departure.airport}</div>
            <div className="text-xs text-gray-500">{flightData.flight.departure.terminal}</div>
          </div>

          {/* Flight Path */}
          <div className="flex-1 flex items-center justify-center mx-8">
            <div className="flex items-center w-full">
              <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-200 to-blue-400"></div>
              <div className="text-center px-4">
                <div className="text-sm text-gray-600 mb-2 font-medium">{flightData.flight.duration}</div>
                <div className="flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div className="w-8 mx-2 h-0.5 bg-blue-500"></div>
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                {flightData.flight.stops > 0 && (
                  <div className="text-xs text-orange-600 font-medium mt-1">
                    {flightData.flight.stops} stop
                  </div>
                )}
              </div>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-400 to-blue-200"></div>
            </div>
          </div>

          {/* Arrival */}
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{flightData.flight.arrival.time}</div>
            <div className="text-sm text-gray-600 mt-1 font-medium">{flightData.flight.arrival.airport}</div>
            <div className="text-xs text-gray-500">{flightData.flight.arrival.terminal}</div>
          </div>
        </div>

        {/* Flight Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <Badge variant="outline" className="font-medium">
              {flightData.flight.flightNumber}
            </Badge>
            <span>{flightData.flight.aircraft}</span>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="hover:bg-blue-50">
            <Edit className="h-4 w-4 mr-1" />
            Edit Flight
          </Button>
        </div>

        {/* Class Details */}
        <Card className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-600 text-white font-medium">
                  {flightData.class.toUpperCase()} • {flightData.subClass}
                </Badge>
                <span className="text-2xl font-bold text-blue-600">${flightData.price}</span>
                <span className="text-sm text-gray-500">per person</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Utensils className="h-4 w-4 text-green-600" />
                  <span>Meals</span>
                </div>
                <div className="flex items-center gap-1">
                  <Luggage className="h-4 w-4 text-green-600" />
                  <span>Baggage</span>
                </div>
                <div className="flex items-center gap-1">
                  <Seat className="h-4 w-4 text-green-600" />
                  <span>Seat Selection</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Card>
  );

  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">Confirm Selected Tickets</h3>
          <p className="text-gray-600 text-lg">
            Review your flight selection and confirm to proceed with booking
          </p>
        </div>

        {/* Flight Cards */}
        <div className="space-y-6 mb-8">
          {/* Outbound Flight */}
          {renderFlightDetails(
            outbound, 
            "Outbound", 
            `${searchParams.origin} → ${searchParams.destination}`,
            searchParams.departDate
          )}

          {/* Return Flight */}
          {inbound && renderFlightDetails(
            inbound, 
            "Return", 
            `${searchParams.destination} → ${searchParams.origin}`,
            searchParams.returnDate,
            true
          )}
        </div>

        {/* Fare Lock Service */}
        <Card className="p-8 mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-start gap-6">
            <div className="p-3 bg-blue-600 rounded-full">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h4 className="text-xl font-bold text-gray-900">Fare Lock Service</h4>
                <Badge className="bg-green-100 text-green-700 font-medium">Recommended</Badge>
              </div>
              <p className="text-gray-700 mb-4 text-lg">
                Lock in your current price for 24 hours. No need to worry about price increases or tickets selling out.
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    +${fareLockPrice}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    * This fee is non-refundable and will not be deducted from the total amount due.
                  </div>
                  <Button variant="link" className="text-blue-600 p-0 h-auto">
                    Terms and conditions →
                  </Button>
                </div>
                <Switch 
                  checked={fareLockEnabled}
                  onCheckedChange={setFareLockEnabled}
                  className="scale-125"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Price Summary */}
        <Card className="p-6 mb-8 bg-white">
          <h4 className="text-xl font-bold mb-4">Price Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Outbound Flight ({passengers} passenger{passengers > 1 ? 's' : ''})</span>
              <span className="font-semibold">${outboundPrice}</span>
            </div>
            {inbound && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Return Flight ({passengers} passenger{passengers > 1 ? 's' : ''})</span>
                <span className="font-semibold">${inboundPrice}</span>
              </div>
            )}
            {fareLockEnabled && (
              <div className="flex justify-between items-center text-blue-600">
                <span>Fare Lock Service</span>
                <span className="font-semibold">+${fareLockPrice}</span>
              </div>
            )}
            <div className="border-t pt-3">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total Amount</span>
                <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Bottom Action Bar */}
        <div className="sticky bottom-0 bg-white border-t p-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Adults: {passengers}</span>
              </div>
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Flight Details
              </Button>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  ${totalPrice.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">For all passengers</div>
              </div>
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg font-semibold"
                onClick={handleConfirm}
              >
                Confirm Selection
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}