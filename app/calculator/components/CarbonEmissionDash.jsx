import React from "react";
import {
  Zap,
  Home,
  TreePine,
  Cloud,
  Leaf,
  ArrowUp,
  Sparkles,
  Globe,
  Droplet,
  DoorClosed,
  Car,
  Clock,
} from "lucide-react";

const CarbonImpactDashboard = ({ emissionData, setShowDashboard }) => {
  const totalEmissions = emissionData?.result?.data?.emissions.co2e_mt|| emissionData?.result?.data?.co2e_mt || "N/A";

  const carbonData = {
    totalEmissions: totalEmissions,
    treesRequired: Math.round(totalEmissions * 20),
    homeEquivalent: Math.round(totalEmissions / 8.6),
    carEquivalent: Math.round(totalEmissions / 4.6),
    airQualityImprovement: Math.round(totalEmissions * 0.16),
    waterSaved: Math.round(totalEmissions * 8000),
    speciesProtected: Math.round(totalEmissions * 0.37),
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Fun and Professional Title */}
        <div className="relative text-center mb-8">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-800 inline-block animate-float">
            Your Flight&apos;s Carbon Footprint
          </h1>
          <Sparkles className="absolute -top-4 -right-8 text-yellow-400 animate-spin-slow" />
          <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Understanding your environmental impact is the first step toward
            meaningful climate action.{" "}
            <span className="text-primary font-semibold">
              Let&apos;s make a difference!
            </span>
          </p>
        </div>

        {/* Main Impact Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 sm:mb-16 transition-all hover:shadow-xl group">
          <div className="flex flex-col md:flex-row">
            <div className="bg-[url('/flight_emission_card_2.jpg')] bg-cover bg-center text-white rounded-l-xl shadow-lg overflow-hidden p-8 md:w-1/2 flex flex-col justify-center items-center relative">
              <div className="backdrop-blur-sm bg-black/30 p-6 rounded-xl">
                <h2 className="text-5xl font-bold mb-2 animate-bounce text-center">
                  {carbonData?.totalEmissions?.toFixed(2)}
                </h2>
                <p className="text-2xl font-light">
                  Metric Tons CO<sub>2</sub>
                </p>
                <div className="mt-4 text-center">
                  <p className="text-sm opacity-90">
                    Your flight&apos;s carbon footprint
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 md:w-1/2">
              <h3 className="text-xl font-semibold mb-3 text-gray-700 flex items-center">
                <Globe className="w-6 h-6 mr-2 text-primary" />
                Understanding Your Carbon Footprint Offset
              </h3>
              <p className="text-gray-600 mb-4">
                Carbon offsetting means balancing your emissions by funding
                projects that reduce or remove an equivalent amount of
                greenhouse gases. These initiatives can range from reforestation
                and renewable energy to methane capture and sustainable
                agriculture.
              </p>
              <div className="space-y-4">
                <div className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 shrink-0">
                    {/* <Zap className="h-6 w-6 text-primary" /> */}
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Equivalent to</p>
                    <p className="font-semibold">
                      Preventing {carbonData.carEquivalent} car(s) from emitting
                      CO₂ for a year
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      That&apos;s like taking{" "}
                      <span className="font-bold">
                        {carbonData.carEquivalent} car(s) off the road
                      </span>{" "}
                      for a year!
                    </p>
                  </div>
                </div>
                <div className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <Home className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Saves as much CO₂ as
                    </p>
                    <p className="font-semibold">
                      {carbonData.homeEquivalent} home(s) emit in a year
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Enough to power{" "}
                      <span className="font-bold">
                        {carbonData.homeEquivalent} home(s)
                      </span>{" "}
                      with clean energy!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Offset Impact Cards */}
        <h2 className="text-2xl font-bold mb-4 text-gray-700 flex items-center justify-center">
          <Leaf className="w-6 h-6 mr-2 text-primary" />
          Your Positive Impact Through Offsetting
        </h2>
        <p className="text-gray-600 mb-6 max-w-3xl mx-auto text-center">
          When you offset your carbon footprint, you contribute to environmental
          projects that create tangible benefits.{" "}
          <span className="text-primary font-semibold">
            Here&apos;s how your contribution makes a difference:
          </span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 sm:mb-16">
          {/* Trees Card */}
          <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all transform ">
            <div className="h-20 bg-gradient-to-r from-green-400 to-emerald-600 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                {[...Array(12)].map((_, i) => (
                  <TreePine
                    key={i}
                    className="absolute"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      transform: `scale(${0.5 + Math.random() * 0.5})`,
                      opacity: 0.3 + Math.random() * 0.7,
                    }}
                  />
                ))}
              </div>
              <div className="h-20 bg-gradient-to-r from-green-400 to-emerald-600 relative overflow-hidden flex justify-center items-center">
                <h3 className="font-semibold text-white flex items-center">
                  <TreePine className="h-5 w-5 mr-2" />
                  Reforestation Impact
                </h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold text-gray-800">
                  {carbonData.treesRequired.toLocaleString()}
                </span>
                <span className="ml-2 text-gray-600">trees</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                These trees will absorb CO₂ throughout their lifetime, helping
                to restore ecosystems and biodiversity while creating natural
                carbon sinks.
              </p>
            </div>
          </div>

          {/* Air Quality Card */}
          <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all transform ">
            <div className="h-20 bg-gradient-to-r from-blue-400 to-blue-600 relative overflow-hidden">
              <div className="absolute inset-0 flex justify-center items-center opacity-20">
                {[...Array(8)].map((_, i) => (
                  <Cloud
                    key={i}
                    className="absolute"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      transform: `scale(${0.5 + Math.random()})`,
                      opacity: 0.3 + Math.random() * 0.7,
                    }}
                  />
                ))}
              </div>
              <div className="h-20 bg-gradient-to-r from-blue-400 to-blue-600 relative overflow-hidden flex justify-center items-center">
                <h3 className="font-semibold text-white flex items-center">
                  <Cloud className="h-5 w-5 mr-2" />
                  Air Quality Improvement
                </h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold text-gray-800">
                  {carbonData.airQualityImprovement}%
                </span>
                <span className="ml-2 text-gray-600">improvement</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Carbon offset projects reduce pollutants that cause respiratory
                diseases and improve overall air quality in local communities.
              </p>
            </div>
          </div>

          {/* Wildlife Card */}
          <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all transform ">
            <div className="h-20 bg-gradient-to-r from-amber-400 to-amber-600 relative overflow-hidden">
              <div className="absolute inset-0 flex justify-center items-center opacity-20">
                {[...Array(12)].map((_, i) => (
                  <Leaf
                    key={i}
                    className="absolute"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 360}deg) scale(${
                        0.5 + Math.random() * 0.5
                      })`,
                      opacity: 0.3 + Math.random() * 0.7,
                    }}
                  />
                ))}
              </div>
              <div className="h-20 bg-gradient-to-r from-amber-400 to-amber-600 relative overflow-hidden flex justify-center items-center">
                <h3 className="font-semibold text-white flex items-center">
                  <Leaf className="h-5 w-5 mr-2" />
                  Biodiversity Protected
                </h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold text-gray-800">
                  {carbonData.speciesProtected}
                </span>
                <span className="ml-2 text-gray-600">species</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                By preserving natural habitats through carbon projects, we
                protect ecosystems that are home to endangered species and
                maintain biodiversity.
              </p>
            </div>
          </div>

          {/* Water Saved Card */}
          <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all transform ">
            <div className="h-20 bg-gradient-to-r from-cyan-400 to-cyan-600 relative overflow-hidden">
              <div className="absolute inset-0 flex justify-center items-center opacity-20">
                {[...Array(12)].map((_, i) => (
                  <Droplet
                    key={i}
                    className="absolute"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      transform: `scale(${0.5 + Math.random() * 0.5})`,
                      opacity: 0.3 + Math.random() * 0.7,
                    }}
                  />
                ))}
              </div>
              <div className="h-20 bg-gradient-to-r from-cyan-400 to-cyan-600 relative overflow-hidden flex justify-center items-center">
                <h3 className="font-semibold text-white flex items-center">
                  <Droplet className="h-5 w-5 mr-2" />
                  Water Saved
                </h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold text-gray-800">
                  {carbonData.waterSaved.toLocaleString()}
                </span>
                <span className="ml-2 text-gray-600">liters</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Carbon offset projects help save water by promoting sustainable
                practices and reducing water-intensive activities.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-[url('/CTA_bg_1.jpg')] bg-cover bg-center text-white rounded-xl shadow-lg overflow-hidden backdrop-blur-md p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Make a Lasting Difference Today
            </h2>
            <p className="mb-6 opacity-90">
              Carbon offsetting does more than neutralize your emissions—it
              helps drive the global transition to a low-carbon future. Your
              contribution supports innovative projects that wouldn&apos;t exist
              without carbon finance, creating jobs, protecting ecosystems, and
              improving lives worldwide.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center">
                <ArrowUp className="h-5 w-5 mr-2" />
                Offset Now
              </button>
              <button
                onClick={() => setShowDashboard((prev) => !prev)}
                className="bg-black/30 text-white px-6 py-3 border border-gray-100 rounded-lg font-semibold hover:bg-black/50 transition-colors flex items-center justify-center"
              >
                <Clock className="h-5 w-5 mr-2" />
                Remind Later
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Your offset contribution is verified by third-party standards
            including Gold Standard and Verified Carbon Standard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarbonImpactDashboard;
