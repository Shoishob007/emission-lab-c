import { Info, Leaf, MapPin, TrendingUp } from "lucide-react";
import React from "react";

const InfoPanel = ({ selectedCountry, selectedProject }) => {
  return (
    <div className="lg:col-span-1">
      {/* Selected Country Info */}
      {selectedCountry ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 border-l-4 border-orange-500 h-full">
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedCountry.name}
            </h3>
            <Info className="text-orange-500" size={28} />
          </div>
          <div className="space-y-6">
            <div className="bg-orange-50 dark:bg-gray-900 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Annual CO₂ Emissions
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {selectedCountry.emission.toLocaleString()} MtCO₂e
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-900 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Population
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {selectedCountry.population}
              </p>
            </div>
            <div className="bg-green-50 dark:bg-gray-900 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Per Capita Emission
              </p>
              <p className="text-2xl font-bold text-green-600">
                {(
                  selectedCountry.emission /
                  parseFloat(selectedCountry.population.replace(/[^\d.]/g, ""))
                ).toFixed(2)}{" "}
                tCO₂e/person
              </p>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Click on other countries or project markers to view different
                data
              </p>
            </div>
          </div>
        </div>
      ) : selectedProject ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 border-l-4 border-green-500 h-full">
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedProject.name}
            </h3>
            <MapPin className="text-green-500" size={28} />
          </div>
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-gray-900 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Project Location
                </p>
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedProject.country}
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-gray-900 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Project Type
              </p>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {selectedProject.type}
              </p>
            </div>

            <div className="bg-emerald-50 dark:bg-gray-900 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Annual Carbon Offset
              </p>
              <p className="text-2xl font-bold text-emerald-600">
                {selectedProject.offsetAmount}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Project Description
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {selectedProject.description}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Click on other countries or project markers to view different
                data
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-lg shadow-2xl p-6 text-white h-full flex flex-col justify-center">
          <div className="">
            <div className="mb-6 text-center">
              <h3 className="text-3xl font-bold mb-4">Map Guide</h3>
              <p className="text-blue-100 mb-8">
                Select a country or project to view details
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="bg-white/20 p-3 rounded-full">
                  <TrendingUp size={24} />
                </div>
                <div className="items-start">
                  <h4 className="font-bold text-lg mb-1">Explore Countries</h4>
                  <p className="text-sm opacity-90">
                    Click on any colored country to view carbon emission
                    statistics
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-white/20 p-3 rounded-full">
                  <Leaf size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Discover Projects</h4>
                  <p className="text-sm opacity-90">
                    Click on green markers to learn about carbon offset projects
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-white/20 p-3 rounded-full">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Hover for Info</h4>
                  <p className="text-sm opacity-90">
                    Hover over countries or project markers for quick
                    information
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-sm opacity-80">
                  <span className="font-bold">Tip:</span> Use mouse wheel to
                  zoom and drag to pan around the map
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPanel;
