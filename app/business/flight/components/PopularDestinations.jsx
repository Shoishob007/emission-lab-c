import { Card } from "@/components/ui/card";
import Image from "next/image";

const destinations = {
  domestic: [
    {
      name: "Cox's Bazar",
      image:
        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      airport: "Cox's Bazar Airport (CXB)",
    },
    {
      name: "Chittagong",
      image:
        "https://images.unsplash.com/photo-1576413326475-ea6c788332fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      airport: "Shah Amanat International Airport (CGP)",
    },
    {
      name: "Sylhet",
      image:
        "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      airport: "Osmani International Airport (ZYL)",
    },
    {
      name: "Dhaka",
      image:
        "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      airport: "Hazrat Shahjalal International Airport (DAC)",
    },
  ],
  international: [
    {
      name: "Dubai",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      airport: "Dubai International Airport (DXB)",
    },
    {
      name: "Singapore",
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      airport: "Changi Airport (SIN)",
    },
    {
      name: "Kuala Lumpur",
      image:
        "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      airport: "Kuala Lumpur International Airport (KUL)",
    },
    {
      name: "Bangkok",
      image:
        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      airport: "Suvarnabhumi Airport (BKK)",
    },
  ],
};

export function PopularDestinations({ type, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
      {destinations[type].map((destination) => (
        <Card
          key={destination.name}
          className="group cursor-pointer overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          onClick={() => onSelect(destination.airport)}
        >
          <div className="relative h-56">
            <Image
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
              layout="fill"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white text-xl font-bold mb-1">
                {destination.name}
              </h3>
              <p className="text-white/80 text-sm">{destination.airport}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
