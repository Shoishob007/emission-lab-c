"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Business = () => {
  const router = useRouter();

  const icons = [
    {
      id: 1,
      name: "Flight",
      icon: "✈️",
      route: "/business/flight",
      top: 50,
      left: 50,
    },
    {
      id: 2,
      name: "Car",
      icon: "🚗",
      route: "/business/car",
      top: 10,
      left: 35,
    },
    {
      id: 3,
      name: "Motorbike",
      icon: "🏍️",
      route: "/business/motorbike",
      top: 10,
      left: 65,
    },
    {
      id: 4,
      name: "Bus",
      icon: "🚌",
      route: "/business/bus",
      top: 50,
      left: 20,
    },
    {
      id: 5,
      name: "Train",
      icon: "🚆",
      route: "/business/train",
      top: 50,
      left: 80,
    },
    {
      id: 6,
      name: "Hotel",
      icon: "🏨",
      route: "/business/hotel",
      top: 90,
      left: 35,
    },
    {
      id: 7,
      name: "Ship",
      icon: "🚢",
      route: "/business/ship",
      top: 90,
      left: 65,
    },
  ];

  // tracking hover
  const [hoveredId, setHoveredId] = useState(null);

  const handleIconClick = (route) => {
    router.push(route);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="relative w-full max-w-3xl h-96 mx-auto my-auto">
        {icons.map((icon) => {
          const isHovered = hoveredId === icon.id;

          return (
            <div
              key={icon.id}
              className={`absolute cursor-pointer transition-all duration-300 ${
                isHovered ? "scale-110 z-10" : "z-0"
              }`}
              style={{
                top: `${icon.top}%`,
                left: `${icon.left}%`,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => handleIconClick(icon.route)}
              onMouseEnter={() => setHoveredId(icon.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-32 h-32 flex items-center justify-center rounded-full mb-2 shadow-md transition-all duration-300 border-2 border-solid border-secondary  ${
                    isHovered
                      ? "shadow-lg bg-secondary/10 scale-105"
                      : "bg-white"
                  }`}
                >
                  <span className="text-5xl">{icon.icon}</span>
                </div>
                <p
                  className={`text-base font-semibold transition-all duration-300 ${
                    isHovered ? "text-secondary" : "text-gray-800"
                  }`}
                >
                  {icon.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Business;
