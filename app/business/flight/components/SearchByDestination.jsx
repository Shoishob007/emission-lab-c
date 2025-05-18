import { PlaneIcon } from "lucide-react";
import { useState } from "react";

const destinations = [
  {
    from: "Dhaka",
    to: "Cox's Bazar",
    price: "BDT 3,500",
    fromAirport: "Hazrat Shahjalal Int'l Airport",
    toAirport: "Cox's Bazar Airport",
    duration: "55 min",
    frequency: "Daily",
    airline: "Biman Bangladesh",
  },
  {
    from: "Dhaka",
    to: "Jashore",
    price: "BDT 2,500",
    fromAirport: "Hazrat Shahjalal Int'l Airport",
    toAirport: "Jashore Airport",
    duration: "40 min",
    frequency: "Daily",
    airline: "US-Bangla",
  },
  {
    from: "Dhaka",
    to: "Chattogram",
    price: "BDT 3,200",
    fromAirport: "Hazrat Shahjalal Int'l Airport",
    toAirport: "Shah Amanat Int'l Airport",
    duration: "45 min",
    frequency: "Daily",
    airline: "Novo Air",
  },
  {
    from: "Dhaka",
    to: "Sylhet",
    price: "BDT 2,800",
    fromAirport: "Hazrat Shahjalal Int'l Airport",
    toAirport: "Osmany International Airport",
    duration: "45 min",
    frequency: "Daily",
    airline: "Biman Bangladesh",
  },
  {
    from: "Dhaka",
    to: "Barisal",
    price: "BDT 2,600",
    fromAirport: "Hazrat Shahjalal Int'l Airport",
    toAirport: "Barisal Airport",
    duration: "35 min",
    frequency: "Tue, Thu, Sat",
    airline: "US-Bangla",
  },
  {
    from: "Dhaka",
    to: "Saidpur",
    price: "BDT 2,900",
    fromAirport: "Hazrat Shahjalal Int'l Airport",
    toAirport: "Saidpur Airport",
    duration: "50 min",
    frequency: "Daily",
    airline: "Novo Air",
  },
];

export function SearchByDestination({ onSelect }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {destinations.map((destination, index) => (
          <div
            key={index}
            className="flex flex-col bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all cursor-pointer overflow-hidden p-4"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Flight route section */}
            <div className="flex items-center justify-between p-3 border-b border-gray-100">
              <div className="flex flex-col items-start">
                <div className="font-medium text-gray-800">
                  {destination.from}
                </div>
                <div className="text-xs text-gray-500 max-w-32 truncate">
                  {destination.fromAirport}
                </div>
              </div>

              {/* Flight path animation */}
              <div className="relative flex-shrink-0 w-28 flex items-center justify-center">
                <div className="h-px bg-gray-300 w-full absolute"></div>
                <div
                  className={`bg-white p-1 rounded-full z-10 ${
                    hoveredIndex === index ? "transform translate-2" : ""
                  } transition-transform duration-300`}
                >
                  <PlaneIcon
                    size={18}
                    className={`text-blue-500 transform ${
                      hoveredIndex === index ? "text-secondary scale-110" : ""
                    } transition-all duration-300`}
                  />
                </div>
              </div>

              {/* Destination */}
              <div className="flex flex-col items-end">
                <div className="font-medium text-gray-800">
                  {destination.to}
                </div>
                <div className="text-xs text-gray-500 max-w-32 truncate text-right">
                  {destination.toAirport}
                </div>
              </div>
            </div>

            {/* Flight details section */}
            <div className="p-3 flex items-center justify-between">
              <div className="flex flex-col">
                <div className="text-xs text-gray-500">Duration</div>
                <div className="text-sm font-medium">
                  {destination.duration}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="text-xs text-gray-500">Airline</div>
                <div className="text-sm font-medium">{destination.airline}</div>
              </div>

              <div className="flex flex-col text-right">
                <div className="text-xs text-gray-500">From</div>
                <div className="text-base font-bold text-secondary">
                  {destination.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
