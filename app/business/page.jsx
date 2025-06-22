"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const businessScopes = [
  {
    id: 1,
    name: "Flight",
    route: "/business/flight",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    desc: "Book and manage air travel for your business with efficient carbon tracking and route optimization.",
  },
  {
    id: 2,
    name: "Car",
    route: "/business/car",
    image: "/business/car.jpg",
    desc: "Seamlessly handle business car rentals, ride-sharing, and eco-friendly vehicle reporting.",
  },
  {
    id: 3,
    name: "Motorbike",
    route: "/business/motorbike",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    desc: "Manage motorbike logistics, expenses, and sustainable travel options for quick city commutes.",
  },
  {
    id: 4,
    name: "Bus",
    route: "/business/bus",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    desc: "Coordinate group transport, staff bus bookings, and sustainable public travel for teams.",
  },
  {
    id: 5,
    name: "Train",
    route: "/business/train",
    image: "/business/train.jpg",
    desc: "Optimize business rail journeys, ticketing, and carbon reporting for long-distance commutes.",
  },
  {
    id: 6,
    name: "Hotel",
    route: "/business/hotel",
    image: "/business/hotel.jpg",
    desc: "Book hotels, track business stays, and find accommodations aligned with your sustainability goals.",
  },
  {
    id: 7,
    name: "Ship",
    route: "/business/ship",
    image: "/business/ship.jpg",
    desc: "Handle international business shipping, cruises, and marine logistics with ease.",
  },
];

const Business = () => {
  const router = useRouter();

  return (
    <section className="bg-[#0A2D23] min-h-screen py-12 px-4 flex flex-col items-center justify-start">
      <div className="max-w-3xl text-center mb-12">
        <h2
          className="text-4xl md:text-5xl font-extrabold text-white mb-4"
          style={{
            fontFamily: '"Montserrat", Arial, Helvetica, sans-serif',
            letterSpacing: "-0.01em",
          }}
        >
          Choose your <span className="text-primary">business scope</span>
        </h2>
        <p className="text-green-100 text-lg max-w-2xl mx-auto">
          Select a business travel or service category. Click a card to manage,
          book, or analyze each scope in detail.
        </p>
      </div>
      <div className="w-full max-w-6xl grid gap-8 md:grid-cols-4 sm:grid-cols-2 grid-cols-1">
        {businessScopes.map((scope) => (
          <div
            key={scope.id}
            className="group relative rounded-2xl overflow-hidden shadow-lg bg-[#0A2D23] cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
            onClick={() => router.push(scope.route)}
            tabIndex={0}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && router.push(scope.route)
            }
            role="button"
            aria-label={`Go to ${scope.name}`}
          >
            <div className="relative w-full h-64">
              <Image
                src={scope.image}
                alt={scope.name}
                fill
                className="object-cover object-center transition-all duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={scope.id <= 3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 w-full p-6 pb-7 z-10 flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                {scope.name}
              </h3>
              <p className="text-green-100 text-base font-medium mb-5 line-clamp-2 drop-shadow">
                {scope.desc}
              </p>
              <button
                tabIndex={-1}
                className="flex items-center gap-1 text-white/90 font-semibold group-hover:text-btn-primary transition-colors mt-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(scope.route);
                }}
                aria-label={`Explore ${scope.name}`}
                type="button"
              >
                Have a look
                <span className="ml-1">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Business;
