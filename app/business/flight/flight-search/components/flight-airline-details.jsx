import React from "react";
import {
  Plane,
  CalendarDays,
  Luggage,
  BadgePercent,
  ChevronDown,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EmiratesLogo from "@/public/airline-logos/Emirates.svg";
import QatarLogo from "@/public/airline-logos/Qatar_Airways.svg";
import TurkishLogo from "@/public/airline-logos/Turkish_Airlines.svg";
import LufthansaLogo from "@/public/airline-logos/Lufthansa.svg";
import BritishLogo from "@/public/airline-logos/British-Air.svg";
import AmericanLogo from "@/public/airline-logos/American_Airlines.svg";
import BangladeshBimanLogo from "@/public/airline-logos/Biman_Bangladesh_Airlines.svg";
import DeltaLogo from "@/public/airline-logos/Delta_Airlines.svg";
import Image from "next/image";

const FlightAirlineDetails = ({ flight, formatCurrency }) => {
  const airlineLogos = {
    Emirates: EmiratesLogo,
    "Qatar Airways": QatarLogo,
    "Turkish Airlines": TurkishLogo,
    Lufthansa: LufthansaLogo,
    "British Airways": BritishLogo,
    "Biman Bangladesh Airlines": BangladeshBimanLogo,
    "American Airlines": AmericanLogo,
    "Delta Airlines": DeltaLogo,
  };
  return (
    <div className="flex flex-col md:flex-row">
      {/* Airline Info */}
      <div className="flex flex-row md:flex-col items-center justify-between mb-4 md:mb-0">
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 flex items-center justify-center p-1">
            {airlineLogos[flight.airline] ? (
              <Image
                src={airlineLogos[flight.airline]}
                alt={flight.airline}
                width={70}
                height={70}
                objectFit="fill"
              />
            ) : (
              <Plane className="h-4 w-4 text-secondary" />
            )}
          </div>
          <p className="text-xs text-gray-400">{flight.id}</p>
        </div>
        <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded text-blue-700 text-xs mt-2">
          <Star className="h-3 w-3 text-secondary fill-current" />
          <span>{flight.score}</span>
        </div>
      </div>

      {/* Flight Details */}
      <div className="flex-1 flex-col md:flex-row flex gap-4 items-start justify-between md:ml-4">
        <div className="flex-1">
          <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-6">
            {/* Departure */}
            <div className="min-w-24">
              <p className="text-lg font-bold">{flight.departure.time}</p>
              <p className="text-sm text-gray-600 truncate">
                {flight.departure.airport.split(" (")[0]}
              </p>
              <p className="text-xs text-gray-400">{flight.departure.date}</p>
            </div>

            {/* Flight Path */}
            <div className="flex-1 flex flex-col items-center px-2">
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {flight.duration}
                </span>
                <span className="text-xs font-medium text-gray-500">
                  {flight.route}
                </span>
              </div>
              <div className="relative w-full h-[2px] bg-gray-300 my-2">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-secondary"></div>
                {flight.stops.count > 0 && (
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  </div>
                )}
                <div className="absolute -right-1 top-1/2 transform -translate-y-1/2">
                  <Plane className="h-4 w-4 text-secondary" />
                </div>
              </div>
              <div className="text-xs text-center text-gray-500 mt-1">
                {flight.stops.count === 0 ? (
                  "Non-stop"
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="flex items-center gap-1">
                          {flight.stops.count} stop
                          <ChevronDown className="h-3 w-3" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{flight.stops.airport}</p>
                        <p>Layover: {flight.stops.duration}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>

            {/* Arrival */}
            <div className="min-w-24">
              <div className="flex items-center gap-1">
                <p className="text-lg font-bold">{flight.arrival.time}</p>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {flight.arrival.airport.split(" (")[0]}
              </p>
              <p className="text-xs text-gray-400">{flight.arrival.date}</p>
            </div>
          </div>

          {/* Flight Details Badges */}
          <div className="flex flex-wrap gap-2 mt-6 justify-center">
            <Badge
              variant="secondary"
              className="text-xs flex items-center gap-1"
            >
              <Luggage className="h-3 w-3" />
              {flight.baggage}
            </Badge>
            <Badge
              variant="secondary"
              className="text-xs flex items-center gap-1"
            >
              <CalendarDays className="h-3 w-3" />
              {flight.cabinClass}
            </Badge>
            {flight.refundable && (
              <Badge
                variant="secondary"
                className="text-xs text-white bg-primary hover:bg-primary/80"
              >
                Refundable
              </Badge>
            )}
            {flight.seats <= 10 && (
              <Badge
                variant="secondary"
                className="text-xs text-white bg-red-400 hover:bg-red-400/80"
              >
                Only {flight.seats} seats left
              </Badge>
            )}
          </div>
        </div>

        {/* Price and Booking */}
        <div className="mt-4 md:mt-0 flex flex-row md:flex-col justify-between items-center md:items-end">
          <div className="text-right">
            <p className="text-xl font-bold text-secondary">
              {formatCurrency(flight.price.current, flight.price.currency)}
            </p>
            {flight.price.original > flight.price.current && (
              <p className="text-sm line-through text-gray-400">
                {formatCurrency(flight.price.original, flight.price.currency)}
              </p>
            )}

            {flight.promo && (
              <div className="flex items-center gap-1 mt-1">
                <BadgePercent className="h-3 w-3 text-primary" />
                <span className="text-xs text-primary font-medium">
                  {flight.promo}
                </span>
              </div>
            )}
          </div>
          <Button
            size="sm"
            className="bg-secondary hover:bg-blue-600 mt-2 px-6"
            onClick={() => {
              // demo search ID and sequence
              const searchId = "DEMO" + Math.random().toString(36).substr(2, 9);
              const sequence = Math.floor(Math.random() * 1000);
              window.location.href = `/business/flight/flight-booking?searchId=${searchId}&sequence=${sequence}`;
            }}
          >
            View Deal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlightAirlineDetails;
