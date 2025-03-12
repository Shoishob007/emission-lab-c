import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const EmissionDetails = ({ oneWayEmission, totalEmission, emissionPerPerson, flightDetails }) => (
  <div className="space-y-3 !mt-6 sm:mt-0">
    <TooltipProvider>
      <div className="flex justify-between items-center px-2 py-2 bg-muted/30 rounded-md">
        <span className="text-sm font-medium">Total Emission (Trip-wise)</span>
        <Tooltip>
          <TooltipTrigger>
            <span className="font-semibold text-sm cursor-pointer">
              {oneWayEmission.toFixed(3)} MT × {flightDetails.tripType === "oneWay" ? 1 : 2} = {totalEmission.toFixed(3)} MT
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>One-Way Flight Emission: {oneWayEmission.toFixed(3)} MT</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex justify-between items-center px-2 py-2 bg-muted/30 rounded-md">
        <span className="text-sm font-medium">Total Emission (Passenger-wise)</span>
        <Tooltip>
          <TooltipTrigger>
            <span className="font-semibold text-sm cursor-pointer">
              {emissionPerPerson.toFixed(3)} MT × {flightDetails.passengers} = {totalEmission.toFixed(3)} MT
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Emission Per Person: {emissionPerPerson.toFixed(3)} MT</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  </div>
);

export default EmissionDetails;