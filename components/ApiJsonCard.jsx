"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy } from "lucide-react";

const apiUrl = "/api/carbon/airAPI/carbon-emission/";

const apiRequest = {
  user_id: "1733e8b2-d517-4a33-96e6-16e1b7...",
  iata_airport_from: "DAC",
  iata_airport_to: "JSR",
  number_of_passengers: 1,
  flight_class: "economy",
  round_trip: "Y",
  aircraft_type: "A 220",
};

const apiResponse = {
  result: {
    timestamp: "",
    transaction_id: "",
    data: {
      airport_from: "",
      airport_to: "",
      iata_airport_from: "",
      iata_airport_to: "",
      distance_km: 0,
      number_of_passengers: "",
      flight_class: "",
      round_trip: "",
      emissions: {
        co2e_gm: 0,
        co2e_kg: 0,
        co2e_mt: 0,
        co2e_lb: 0,
      },
      environmental_impact: {
        totalEmissions: 0,
        treesRequired: 0,
        homeEquivalent: 0,
        carEquivalent: 0,
        airQualityImprovement: 0,
        waterSaved: 0,
        speciesProtected: 0,
      },
      calculation_options: {
        add_rf: "",
        include_wtt: "",
      },
    },
    guidelines: {
      methodology: "",
      impact_metrics: {
        totalEmissions: 0,
        treesRequired: 0,
        homeEquivalent: 0,
        carEquivalent: 0,
        airQualityImprovement: 0,
        waterSaved: 0,
        speciesProtected: 0,
      },
    },
    status: 0,
    success: true,
    disclaimer: "",
  },
};

// Helper to copy JSON
function handleCopy(obj) {
  navigator.clipboard.writeText(JSON.stringify(obj, null, 2));
}

export function ApiJsonCard() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Card className="bg-slate-900 text-white border-none shadow-2xl overflow-hidden w-full max-w-[450px] mx-auto relative">
        <div className="flex items-center gap-2 px-8 pt-8 pb-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
        <div className="p-8 pt-2 space-y-4 font-mono text-sm">
          <div>
            <span className="text-blue-400 font-semibold">POST</span>
            <span className="text-gray-300"> {apiUrl}</span>
          </div>
          {/* Only show request in the card */}
          <pre className="text-gray-300 whitespace-pre-line">
            {JSON.stringify(apiRequest, null, 2)}
          </pre>
        </div>
        <div className="absolute bottom-4 left-0 w-full flex justify-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="rounded-full px-6 py-1.5 text-sm shadow-md"
              >
                See Details
              </Button>
            </DialogTrigger>
            <DialogContent
              className="max-w-2xl w-full p-0 rounded-2xl overflow-hidden"
              style={{ maxHeight: "90vh", background: "#0f172a" }}
            >
              {/* Bubbles */}
              <div className="flex items-center gap-2 px-8 pt-8 pb-2 bg-slate-900">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              {/* Modal content */}
              <div
                className="px-8 pt-1 pb-4 bg-slate-900 overflow-y-auto"
                style={{ maxHeight: "70vh" }}
              >
                <div className="mb-5">
                  <span className="font-mono text-xs text-muted-foreground block">
                    Endpoint:
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {apiUrl}
                  </span>
                </div>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="uppercase text-xs font-semibold text-muted-foreground">
                      Request
                    </span>
                    <button
                      title="Copy Request"
                      onClick={() => handleCopy(apiRequest)}
                      className="p-0.5 rounded hover:bg-muted transition"
                    >
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                  <pre className="font-mono text-xs bg-[#22223b] rounded-md p-3 overflow-x-auto text-white">
                    {JSON.stringify(apiRequest, null, 2)}
                  </pre>
                </div>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="uppercase text-xs font-semibold text-muted-foreground">
                      Response
                    </span>
                    <button
                      title="Copy Response"
                      onClick={() => handleCopy(apiResponse)}
                      className="p-0.5 rounded hover:bg-muted transition"
                    >
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                  <pre className="font-mono text-xs bg-[#22223b] rounded-md p-3 overflow-x-auto text-gray-200">
                    {JSON.stringify(apiResponse, null, 2)}
                  </pre>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </>
  );
}
