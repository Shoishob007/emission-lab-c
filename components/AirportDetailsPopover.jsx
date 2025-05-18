import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, Phone, Link } from "lucide-react";

const AirportDetailsPopover = ({ label, iataCode, airportDetails, fetchAirportDetails, isOpen, setOpen }) => (
  <div className="flex items-center gap-1 text-sm text-muted-foreground">
    <p>{label}:</p>
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="link"
          className="p-0 text-sm text-muted-foreground hover:text-primary"
          onClick={fetchAirportDetails}
        >
          {airportDetails ? `${airportDetails.name} (${iataCode})` : `${iataCode}`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        {airportDetails && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold">{airportDetails.name}</h3>
                <p className="text-sm text-muted-foreground">{airportDetails.location}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm">
                  {airportDetails.city}, {airportDetails.country}
                </p>
                <p className="text-sm text-muted-foreground">
                  {airportDetails.latitude}, {airportDetails.longitude}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-primary" />
              <p className="text-sm">{airportDetails.phone}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Link className="h-5 w-5 text-primary" />
              <a
                href={airportDetails.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Visit Website
              </a>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  </div>
);

export default AirportDetailsPopover;