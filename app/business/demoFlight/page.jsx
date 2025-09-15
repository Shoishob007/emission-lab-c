"use client";
import { useState } from "react";
import { Calendar, Globe, MapPin, Plane, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { PopularDestinations } from "../flight/components/PopularDestinations";
import { SearchByDestination } from "../flight/components/SearchByDestination";
import { TopCountries } from "../flight/components/TopCountries";

function DemoFlight() {
  const router = useRouter();
  const [tripType, setTripType] = useState("roundTrip");
  const [passengers, setPassengers] = useState(1);
  const [destination, setDestination] = useState("");
  const [origin, setOrigin] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleDestinationSelect = (dest) => {
    setDestination(dest);
  };

  const handleSearch = () => {
    const params = new URLSearchParams({
      tripType,
      origin: origin || "",
      destination: destination || "",
      depart: departDate || "",
      return: tripType === "roundTrip" ? returnDate : "",
      adult: passengers.toString(),
      class: "Economy",
    });

    router.push(`/business/demoFlight/flight-search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20">
          <div className="container mx-auto px-4 pt-32">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Where to Fly?
            </h1>
            <p className="text-2xl text-white/90">
              Find Great Flight Deals To Anywhere In The World!
            </p>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div className="container mx-auto px-4 -mt-32 mb-16 relative z-10 max-w-5xl">
        <Card className="p-10 shadow-lg bg-white backdrop-blur-sm">
          <RadioGroup
            defaultValue={tripType}
            onValueChange={setTripType}
            className="flex gap-6 mb-8"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="roundTrip" id="roundTrip" />
              <Label htmlFor="roundTrip" className="text-lg">
                Round Trip
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="oneWay" id="oneWay" />
              <Label htmlFor="oneWay" className="text-lg">
                One Way
              </Label>
            </div>
          </RadioGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-base mb-2">Flying From</Label>
              <div className="relative">
                <Input
                  placeholder="Departure City"
                  className="pl-10 h-12 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
                <MapPin className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div>
              <Label className="text-base mb-2">Flying To</Label>
              <div className="relative">
                <Input
                  placeholder="Arrival City"
                  className="pl-10 h-12 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
                <Plane className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div>
              <Label className="text-base mb-2">Departure Date</Label>
              <div className="relative">
                <Input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  className="pl-10 h-12 focus-visible:ring-0 focus-visible:ring-offset-0"
                />

                <Calendar className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div>
              <Label className="text-base mb-2">Return Date</Label>
              <div className="relative">
                <Input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="pl-10 h-12 focus-visible:ring-0 focus-visible:ring-offset-0"
                  disabled={tripType === "oneWay"}
                />

                <Calendar className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-6 items-end">
            <div className="w-48">
              <Label className="text-base mb-2">Total Passengers</Label>
              <div className="relative">
                <Input
                  type="number"
                  min={1}
                  value={passengers}
                  onChange={(e) => setPassengers(parseInt(e.target.value))}
                  className="pl-10 h-12 focus-visible:ring-0 focus-visible:ring-offset-0 w-full focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <Users className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <Button
              size="lg"
              className="bg-btn-primary hover:bg-btn-primary-hover h-12 px-8 text-base"
              onClick={handleSearch}
            >
              Search Flights
            </Button>
          </div>
        </Card>
      </div>

      {/* Popular Destinations */}
      <div className="container mx-auto px-10 mb-16">
        <Tabs defaultValue="domestic">
          <div className="flex flex-col gap-4 items-center justify-between">
            <h2 className="text-3xl font-bold">
              Popular Flight Destinations from BD
            </h2>
            <p className="text-sm text-center max-w-3xl">
              Expand your travel horizons with new facets! Diversify your
              journey to explore local destinations or global marvels around
              Asia, Europe, America, Canada or anywhere
            </p>

            <TabsList className="p-1 bg-gray-100">
              <TabsTrigger
                value="domestic"
                className="px-6 data-[state=active]:bg-secondary bg-white data-[state=active]:text-white rounded-r-none"
              >
                Domestic
              </TabsTrigger>
              <TabsTrigger
                value="international"
                className="px-6 data-[state=active]:bg-secondary bg-white data-[state=active]:text-white rounded-l-none"
              >
                International
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="domestic">
            <PopularDestinations
              type="domestic"
              onSelect={handleDestinationSelect}
            />
          </TabsContent>
          <TabsContent value="international">
            <PopularDestinations
              type="international"
              onSelect={handleDestinationSelect}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Search by Destination */}
      <div className="container mx-auto px-10 mb-16">
        <h2 className="text-3xl font-bold mb-4 items-center text-center">
          Search Cheapest Flight By Destination
        </h2>
        <p className="text-sm text-center mb-4 max-w-3xl mx-auto">
          Effortlessly find cheap flight and air tickets to various destinations
          on Emission Lab. Explore routes, book online air tickets, and plan
          your next travel adventure.
        </p>
        <SearchByDestination onSelect={handleDestinationSelect} />
      </div>

      {/* Flights to Top Countries */}
      <div className="container mx-auto px-4 mb-16 max-w-6xl items-center text-center">
        <h2 className="text-3xl font-bold mb-4">Flights to Top Countries</h2>
        <p className="text-sm text-center mb-4 max-w-3xl mx-auto">
          Effortlessly find cheap flight and air tickets to various destinations
          on Emission Lab. Explore routes, book online air tickets, and plan
          your next travel adventure.
        </p>
        <TopCountries onSelect={handleDestinationSelect} />
      </div>
    </div>
  );
}

export default DemoFlight;
