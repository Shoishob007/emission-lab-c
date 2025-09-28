import { Cloud } from "lucide-react";
import { MovingBorder } from "../../../components/moving-border";

const EmissionDisplay = ({ totalEmission }) => {
  return (
    <div className="flex justify-center p-4">
      <div className="relative flex items-center justify-center bg-green-100 rounded-full">
        <div className="absolute inset-0 rounded-full bg-green-300 blur-xl" />

        <div className="absolute inset-0 rounded-full border-8 border-white/50" />

        <MovingBorder
          Label={
            <div className="flex items-center justify-center relative px-2 py-2">
              <Cloud className="h-6 w-6 text-green-700 mr-2" />
              <span className="text-lg font-bold text-green-700 ">
                {totalEmission.toFixed(2)} Metric Ton(s)
              </span>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default EmissionDisplay;
