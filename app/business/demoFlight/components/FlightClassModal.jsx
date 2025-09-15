"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Check, Utensils, Luggage, Wheat as Seat, Ban, RefreshCw, Star } from "lucide-react";

const classFeatures = {
  economy: {
    budget: {
      name: "Budget",
      popular: false,
      features: [
        { icon: Utensils, text: "Economy meals included", included: true },
        { icon: Luggage, text: "Hand luggage 1x10 kg", included: true },
        { icon: Seat, text: "Economy seat", included: true },
        { icon: Ban, text: "No baggage", included: false },
        { icon: Ban, text: "Refund unavailable", included: false },
        { icon: Ban, text: "Changes unavailable", included: false },
      ]
    },
    classic: {
      name: "Classic",
      popular: true,
      features: [
        { icon: Utensils, text: "Economy meals included", included: true },
        { icon: Luggage, text: "Hand luggage 1x10 kg", included: true },
        { icon: Seat, text: "Economy seat", included: true },
        { icon: Luggage, text: "Baggage 1x23 kg", included: true },
        { icon: RefreshCw, text: "Refund available before departure penalty 75 €", included: true, details: "Refund after departure unavailable" },
        { icon: RefreshCw, text: "Changes available before departure penalty 60 €", included: true, details: "Changes after departure unavailable" },
      ]
    },
    plus: {
      name: "Plus",
      popular: false,
      features: [
        { icon: Utensils, text: "Economy meals included", included: true },
        { icon: Luggage, text: "Hand luggage 1x10 kg", included: true },
        { icon: Seat, text: "Economy seat", included: true },
        { icon: Luggage, text: "Baggage 1x32 kg", included: true },
        { icon: RefreshCw, text: "Refund available before departure penalty 35 €", included: true, details: "Refund after departure available penalty 75 €" },
        { icon: RefreshCw, text: "Changes available before departure", included: true, details: "Changes available after departure penalty 50 €" },
      ]
    }
  },
  business: {
    budget: {
      name: "Budget",
      popular: false,
      features: [
        { icon: Utensils, text: "Business meals included", included: true },
        { icon: Luggage, text: "Hand luggage 2x15 kg", included: true },
        { icon: Seat, text: "Business seat", included: true },
        { icon: Luggage, text: "Baggage 1x32 kg", included: true },
        { icon: RefreshCw, text: "Refund available penalty 50 €", included: true },
        { icon: RefreshCw, text: "Changes available penalty 25 €", included: true },
      ]
    },
    classic: {
      name: "Classic",
      popular: true,
      features: [
        { icon: Utensils, text: "Business meals included", included: true },
        { icon: Luggage, text: "Hand luggage 2x15 kg", included: true },
        { icon: Seat, text: "Business seat", included: true },
        { icon: Luggage, text: "Baggage 2x32 kg", included: true },
        { icon: RefreshCw, text: "Refund available penalty 25 €", included: true },
        { icon: RefreshCw, text: "Changes available penalty 15 €", included: true },
      ]
    },
    plus: {
      name: "Plus",
      popular: false,
      features: [
        { icon: Utensils, text: "Business meals included", included: true },
        { icon: Luggage, text: "Hand luggage 2x15 kg", included: true },
        { icon: Seat, text: "Business seat with extra space", included: true },
        { icon: Luggage, text: "Baggage 2x32 kg", included: true },
        { icon: RefreshCw, text: "Refund available", included: true },
        { icon: RefreshCw, text: "Changes available", included: true },
      ]
    }
  }
};

export function FlightClassModal({ isOpen, onClose, flight, onSelect, route, date, step }) {
  const [selectedClass, setSelectedClass] = useState("economy");

  const renderFeatures = (features) => {
    return features.map((feature, index) => (
      <div key={index} className="flex items-start gap-3 mb-4">
        <div className={`mt-1 ${feature.included ? 'text-green-600' : 'text-gray-400'}`}>
          <feature.icon className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className={`text-sm font-medium ${feature.included ? 'text-gray-900' : 'text-gray-400'}`}>
            {feature.text}
          </div>
          {feature.details && (
            <div className="text-xs text-gray-500 mt-1">
              {feature.details}
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-start justify-between pb-6 border-b">
          <div className="flex-1">
            <DialogTitle className="text-2xl font-bold mb-2">
              Choose a tariff for the {step} flight
            </DialogTitle>
            <div className="flex items-center gap-4 text-gray-600">
              <span className="font-medium">{route}</span>
              <span>•</span>
              <span>{date}</span>
              <span>•</span>
              <Badge variant="outline" className="font-medium">
                {flight.airline} {flight.flightNumber}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>

        {/* Class Selection Tabs */}
        <div className="flex gap-2 mb-8 bg-gray-50 p-2 rounded-xl">
          <Button
            variant={selectedClass === "economy" ? "default" : "ghost"}
            className={`flex-1 py-3 text-base font-semibold rounded-lg transition-all duration-300 ${
              selectedClass === "economy" ? "bg-blue-600 text-white shadow-lg" : "hover:bg-white"
            }`}
            onClick={() => setSelectedClass("economy")}
          >
            Economy Class
          </Button>
          <Button
            variant={selectedClass === "business" ? "default" : "ghost"}
            className={`flex-1 py-3 text-base font-semibold rounded-lg transition-all duration-300 ${
              selectedClass === "business" ? "bg-purple-600 text-white shadow-lg" : "hover:bg-white"
            }`}
            onClick={() => setSelectedClass("business")}
          >
            Business Class
          </Button>
        </div>

        {/* Fare Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(classFeatures[selectedClass]).map(([subClass, details]) => (
            <Card key={subClass} className={`relative transition-all duration-300 hover:shadow-xl ${
              details.popular ? 'ring-2 ring-blue-500 scale-105' : ''
            }`}>
              {details.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1 flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <div className="p-6">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{details.name}</h3>
                  <div className="text-4xl font-bold mb-2 text-gray-900">
                    ${flight.prices[selectedClass][subClass]}
                    <sup className="text-base text-gray-500">.76</sup>
                  </div>
                  <p className="text-sm text-gray-600">per passenger</p>
                </div>

                <Button 
                  className={`w-full mb-8 py-3 text-base font-semibold transition-all duration-300 ${
                    details.popular 
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-lg' 
                      : 'bg-gray-800 hover:bg-gray-900'
                  }`}
                  onClick={() => onSelect(flight, selectedClass, subClass)}
                >
                  Select {details.name}
                </Button>

                <div className="space-y-3">
                  {renderFeatures(details.features)}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Check className="h-4 w-4 text-green-600" />
            <span>Free cancellation within 24 hours of booking</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
            <Check className="h-4 w-4 text-green-600" />
            <span>Price includes all taxes and fees</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}