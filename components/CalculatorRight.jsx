import { Cloud, MapPin, Globe, Phone, Link } from 'lucide-react';
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

const CalculatorRight = ({ calculated, activeTab }) => {
  const [fromPopoverOpen, setFromPopoverOpen] = useState(false);
  const [toPopoverOpen, setToPopoverOpen] = useState(false);
  const [fromAirportDetails, setFromAirportDetails] = useState(null);
  const [toAirportDetails, setToAirportDetails] = useState(null);

  // Dummy API response
  const fetchAirportDetails = async (iataCode, setDetails) => {
    const dummyResponse = {
      result: {
        city: iataCode === "JFK" ? "New York" : "Dubai",
        country: iataCode === "JFK" ? "United States" : "United Arab Emirates",
        country_iso: iataCode === "JFK" ? "US" : "AE",
        county: iataCode === "JFK" ? "New York County" : "Dubai Emirate",
        iata: iataCode,
        icao: iataCode === "JFK" ? "KJFK" : "OMDB",
        id: iataCode === "JFK" ? 1 : 2,
        latitude: iataCode === "JFK" ? 40.6413 : 25.2532,
        location: iataCode === "JFK" ? "New York, USA" : "Dubai, UAE",
        longitude: iataCode === "JFK" ? -73.7781 : 55.3657,
        name: iataCode === "JFK" ? "John F. Kennedy International Airport" : "Dubai International Airport",
        phone: iataCode === "JFK" ? "+1 718-244-4444" : "+971 4 216 2525",
        postal_code: iataCode === "JFK" ? "11430" : "Dubai",
        state: iataCode === "JFK" ? "New York" : "Dubai",
        street: "",
        street_number: "",
        uct: iataCode === "JFK" ? -5 : 4,
        website: iataCode === "JFK" ? "https://www.jfkairport.com" : "https://www.dubaiairports.ae",
      },
      timestamp: "2025-03-04T08:42:48.376677",
    };

    setDetails(dummyResponse.result);
  };

  return (
    <>
      <div className="bg-card rounded-lg p-8 shadow-lg">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Your Carbon Footprint
        </h2>

        {!calculated || activeTab !== "flight" ? (
          <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
            <Cloud className="h-16 w-16 mb-4" />
            <p className="text-sm">
              {activeTab === "flight"
                ? "Enter flight details to calculate emissions"
                : "This calculator is coming soon"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary mt-2">
                    0.95 MT
                  </span>
                </div>
                <Cloud className="h-32 w-32 text-primary/40" />
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              From:{' '}
              <Popover open={fromPopoverOpen} onOpenChange={setFromPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="link"
                    className="p-0 text-sm text-muted-foreground hover:text-primary"
                    onClick={() => fetchAirportDetails("JFK", setFromAirportDetails)}
                  >
                    New York JFK (JFK)
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4">
                  {fromAirportDetails && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-semibold">
                            {fromAirportDetails.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {fromAirportDetails.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm">
                            {fromAirportDetails.city}, {fromAirportDetails.country}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {fromAirportDetails.latitude}, {fromAirportDetails.longitude}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-5 w-5 text-primary" />
                        <p className="text-sm">{fromAirportDetails.phone}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link className="h-5 w-5 text-primary" />
                        <a
                          href={fromAirportDetails.website}
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
              , To:{' '}
              <Popover open={toPopoverOpen} onOpenChange={setToPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="link"
                    className="p-0 text-sm text-muted-foreground hover:text-primary"
                    onClick={() => fetchAirportDetails("DXB", setToAirportDetails)}
                  >
                    Dubai International (DXB)
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4">
                  {toAirportDetails && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-semibold">
                            {toAirportDetails.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {toAirportDetails.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm">
                            {toAirportDetails.city}, {toAirportDetails.country}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {toAirportDetails.latitude}, {toAirportDetails.longitude}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-5 w-5 text-primary" />
                        <p className="text-sm">{toAirportDetails.phone}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link className="h-5 w-5 text-primary" />
                        <a
                          href={toAirportDetails.website}
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
              , 8439 km, Economy Class
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-4 py-2 bg-muted/30 rounded-md">
                <span className="text-sm font-medium">Single Flight Emission</span>
                <span className="font-semibold text-sm">0.95 MT</span>
              </div>
              <div className="flex justify-between items-center px-4 py-2 bg-muted/30 rounded-md">
                <span className="text-sm font-medium">Total CO2 Emission</span>
                <span className="font-semibold text-sm">0.95 MT</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-center text-sm text-muted-foreground mb-4">
                Take action for a greener future —
                <br />
                click here to have more on carbon emission optimization
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CalculatorRight;