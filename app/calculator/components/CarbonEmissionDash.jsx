import React from "react";
import {
  Home,
  TreePine,
  Cloud,
  Leaf,
  ArrowUp,
  Sparkles,
  Globe,
  Droplet,
  Car,
  Clock,
  Users,
  Footprints,
  Trees,
  Shell,
  Wind,
  CircleHelp,
  Info,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

const CarbonImpactDashboard = ({ emissionData, setShowDashboard }) => {
  const resources = [
    {
      name: "Rapid API Services",
      url: "https://rapidapi.com/hub",
    },
    {
      name: "EPA Greenhouse Gas Equivalencies Calculator",
      url: "https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator",
    },
    {
      name: "USDA Forest Service Carbon Sequestration Rates",
      url: "https://www.fs.usda.gov/ccrc/tools/carbon-calculator",
    },
    {
      name: "World Health Organization Air Quality Guidelines",
      url: "https://www.who.int/publications/i/item/9789240034228",
    },
    {
      name: "United Nations Environment Programme Biodiversity Reports",
      url: "https://www.unep.org/resources",
    },
    {
      name: "International Energy Agency Water-Energy Nexus Data",
      url: "https://www.iea.org/topics/water-energy-nexus",
    },
    {
      name: "Verified Carbon Standard Methodology Documents",
      url: "https://verra.org/methodologies/",
    },
    {
      name: "Clean Development Mechanism Project Reports",
      url: "https://cdm.unfccc.int/",
    },
    {
      name: "IPCC Emission Factor Database",
      url: "https://www.ipcc-nggip.iges.or.jp/EFDB/main.php",
    },
  ];
  const totalEmissions =
    emissionData?.result?.data?.emissions?.co2e_mt ||
    emissionData?.result?.data?.co2e_mt ||
    "N/A";

  const carbonData = {
    totalEmissions: totalEmissions,
    treesRequired: Math.ceil(totalEmissions * 20),
    homeEquivalent: Math.ceil(totalEmissions / 8.6),
    carEquivalent: Math.ceil(totalEmissions / 4.6),
    airQualityImprovement: Math.ceil(totalEmissions * 0.16),
    waterSaved: Math.ceil(totalEmissions * 8000),
    speciesProtected: Math.ceil(totalEmissions * 0.37),
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="relative text-center mb-8">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-800 inline-block animate-float">
            All About Your Carbon Footprint
          </h1>
          <TooltipProvider>
            <Popover>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <button className="absolute -top-4 -right-8 text-gray-800 hover:text-primary transition-colors">
                      <Info className="h-6 w-6" />
                    </button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to view the resources</p>
                </TooltipContent>
              </Tooltip>

              <PopoverContent className="w-80 sm:w-96 p-4" align="end">
                <h3 className="font-bold text-base mb-3 text-primary">
                  Carbon Footprint Resources
                </h3>
                <ul className="space-y-1">
                  {resources.map((resource, index) => (
                    <li key={index}>
                      <Link
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-700 hover:text-primary hover:underline transition-colors"
                      >
                        {resource.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          </TooltipProvider>
          <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Understanding your environmental impact is the first step toward
            meaningful climate action.{" "}
            <span className="text-primary font-semibold">
              Let&apos;s make a difference!
            </span>
          </p>
        </div>

        {/* Main impact Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 sm:mb-16 transition-all group">
          <div className="flex flex-col md:flex-row">
            <div className="bg-[url('/co2-emission-bg.png')] bg-cover bg-center text-white rounded-l-xl shadow-lg overflow-hidden p-8 md:w-1/2 flex flex-col justify-center items-center relative">
              <div className="backdrop-blur-sm bg-black/40 p-6 rounded-xl">
                <h2 className="text-5xl font-bold mb-2 animate-bounce text-center">
                  {carbonData?.totalEmissions?.toFixed(2)}
                </h2>
                <p className="text-2xl font-light">
                  Metric Tons CO<sub>2</sub>
                </p>
                <div className="mt-4 text-center">
                  <p className="text-sm opacity-90">
                    Your total carbon footprint
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 md:w-1/2">
              <h3 className="text-xl font-semibold mb-3 text-gray-600 flex items-center">
                <Globe className="w-6 h-6 mr-2 text-primary" />
                Understanding Your Carbon Footprint
              </h3>
              <p className="text-gray-600 mb-4">
                Your current carbon footprint is{" "}
                <span className="font-bold text-lg">
                  {carbonData.totalEmissions.toFixed(2)} metric tons of CO₂.{" "}
                </span>
                This amount of carbon dioxide contributes significantly to
                climate change and has a negative impact on the environment,
                including global warming, extreme weather events, and loss of
                biodiversity.
              </p>
              <h3 className="text-xl font-semibold mb-3 text-gray-600 flex items-center">
                <Globe className="w-6 h-6 mr-2 text-primary" />
                Mitigating Through Carbon Offsetting
              </h3>
              <p className="text-gray-600">
                Carbon offsetting means balancing your emissions by funding
                projects that reduce or remove an equivalent amount of
                greenhouse gases. These initiatives can range from reforestation
                and renewable energy to methane capture and sustainable energy
                solution for communal use. By offsetting your carbon footprint,
                you contribute to environmental projects that create tangible
                benefits. In the cards below, it explains how your contribution
                makes a difference!
              </p>
            </div>
          </div>
        </div>

        {/* Emissions Section */}
        <h2 className="text-2xl font-bold mb-4 text-gray-600 flex items-center justify-center">
          <Footprints className="w-10 h-10 mr-2 text-red-500" />
          Your Emissions Footprint
        </h2>
        <p className="text-gray-600 mb-6 max-w-3xl mx-auto text-center">
          These are some of the numeric values compared equivalenly to your
          footprint.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 max-w-5xl mx-auto">
          {/* Home Energy Card */}
          <div className="group bg-white rounded-xl shadow-md overflow-hidden transition-all transform w-full">
            <div className="h-20 bg-gradient-to-r from-red-500 to-red-600 relative overflow-hidden">
              <div className="absolute inset-0 flex justify-center items-center opacity-20">
                {[...Array(8)].map((_, i) => (
                  <Home
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
              <div className="h-20 bg-gradient-to-r from-red-500 to-red-600 relative overflow-hidden flex justify-center items-center">
                <h3 className="font-semibold text-white flex items-center">
                  <Home className="w-8 h-8 mr-4" />
                  Home Energy
                </h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold text-gray-800">
                  {carbonData.homeEquivalent}
                </span>
                <span className="ml-2 text-gray-600">homes</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Your footprint equals to emission of {carbonData.homeEquivalent}{" "}
                average home throughout a year. Residential emissions primarily
                come from electricity (60%), heating (25%), and appliances
                (15%). This includes all the lights, devices, and climate
                control systems running in your living space.
              </p>
            </div>
          </div>

          {/* Car Emissions Card */}
          <div className="group bg-white rounded-xl shadow-md overflow-hidden transition-all transform w-full">
            <div className="h-20 bg-gradient-to-r from-red-500 to-red-600 relative overflow-hidden">
              <div className="absolute inset-0 flex justify-center items-center opacity-20">
                {[...Array(8)].map((_, i) => (
                  <Car
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
              <div className="h-20 bg-gradient-to-r from-red-500 to-red-600 relative overflow-hidden flex justify-center items-center">
                <h3 className="font-semibold text-white flex items-center">
                  <Car className="w-8 h-8 mr-4" />
                  Transportation
                </h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold text-gray-800">
                  {carbonData.carEquivalent}
                </span>
                <span className="ml-2 text-gray-600">cars</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Your total emissions match {carbonData.carEquivalent} vehicles
                driving the average annual mileage. Transportation emissions
                account for nearly 30% of greenhouse gases, with passenger
                vehicles being the largest contributor in this category.
              </p>
            </div>
          </div>
        </div>

        {/* Offset Section */}
        <h2 className="text-2xl font-bold mb-4 text-gray-600 flex items-center justify-center">
          <Trees className="w-10 h-10 mr-2 text-green-500" />
          Carbon Offset Solutions
        </h2>
        <p className="text-gray-600 mb-6 max-w-3xl mx-auto text-center">
          Verified projects that effectively neutralize your carbon footprint.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 max-w-5xl mx-auto">
          {/* Trees Card */}
          <div className="group bg-white rounded-xl shadow-md overflow-hidden transition-all transform w-full">
            <div className="h-20 bg-gradient-to-r from-green-500 to-green-600 relative overflow-hidden">
              <div className="absolute inset-0 flex justify-center items-center opacity-20">
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
              <div className="h-20 bg-gradient-to-r from-green-500 to-green-600 relative overflow-hidden flex justify-center items-center">
                <h3 className="font-semibold text-white flex items-center">
                  <TreePine className="w-8 h-8 mr-4" />
                  Reforestation
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
                Planting {carbonData.treesRequired.toLocaleString()} native
                trees will fully offset your emissions over their 40-year
                lifespan. These projects restore biodiversity while creating
                natural carbon sinks. Each tree absorbs about 48 pounds of CO₂
                annually while improving soil and air quality.
              </p>
            </div>
          </div>

          {/* Community Projects Card */}
          <div className="group bg-white rounded-xl shadow-md overflow-hidden transition-all transform w-full">
            <div className="h-20 bg-gradient-to-r from-green-500 to-green-600 relative overflow-hidden">
              <div className="absolute inset-0 flex justify-center items-center opacity-20">
                {[...Array(12)].map((_, i) => (
                  <Users
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
              <div className="h-20 bg-gradient-to-r from-green-500 to-green-600 relative overflow-hidden flex justify-center items-center">
                <h3 className="font-semibold text-white flex items-center">
                  <Users className="w-8 h-8 mr-4" />
                  Community Projects
                </h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold text-gray-800">
                  {Math.ceil(carbonData.totalEmissions * 2).toLocaleString()}
                </span>
                <span className="ml-2 text-gray-600">people</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Your offset can provide clean energy solutions for{" "}
                {Math.ceil(carbonData.totalEmissions * 2)} people in developing
                regions. Projects include efficient cookstoves (reducing wood
                use by 60%), solar lanterns replacing kerosene, and water
                purification systems - improving lives while cutting emissions.
              </p>
            </div>
          </div>
        </div>

        {/* Environmental Impact Section */}
        <h2 className="text-2xl font-bold mb-4 text-gray-600 flex items-center justify-center">
          <Leaf className="w-10 h-10 mr-2 text-blue-500" />
          Positive Environmental Impact
        </h2>
        <p className="text-gray-600 mb-6 max-w-3xl mx-auto text-center">
          Additional ecological benefits from offsetting your emissions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
          {/* Air Quality Card */}
          <div className="group bg-white rounded-xl shadow-md overflow-hidden transition-all transform w-full">
            <div className="h-20 bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden">
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
              <div className="h-20 bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden flex justify-center items-center">
                <h3 className="font-semibold text-white flex items-center">
                  <Wind className="w-8 h-8 mr-4" />
                  Air Quality
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
                Offset projects may reduce particulate pollution by{" "}
                {carbonData.airQualityImprovement}% in local areas, preventing
                respiratory illnesses. Cleaner air leads to fewer asthma cases
                and cardiovascular diseases, with health benefits valued at
                approximately $200 per ton of CO₂ reduced.
              </p>
            </div>
          </div>

          {/* Water Saved Card */}
          <div className="group bg-white rounded-xl shadow-md overflow-hidden transition-all transform w-full">
            <div className="h-20 bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden">
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
              <div className="h-20 bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden flex justify-center items-center">
                <h3 className="font-semibold text-white flex items-center">
                  <Droplet className="w-8 h-8 mr-4" />
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
                Conserves {Math.round(carbonData.waterSaved / 1000)} thousand
                liters by avoiding water-intensive energy production. Fossil
                fuel power plants use 3-5 liters of water per kWh produced,
                while offset projects typically use renewable energy with
                minimal water requirements.
              </p>
            </div>
          </div>

          {/* Biodiversity Card */}
          <div className="group bg-white rounded-xl shadow-md overflow-hidden transition-all transform w-full">
            <div className="h-20 bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden">
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
              <div className="h-20 bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden flex justify-center items-center">
                <h3 className="font-semibold text-white flex items-center">
                  <Shell className="w-8 h-8 mr-4" />
                  Biodiversity
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
                Protects habitat for {carbonData.speciesProtected} plant and
                animal species, with restoration projects increasing
                biodiversity by 35% on average. Healthy ecosystems are more
                resilient to climate change and provide critical services like
                pollination and water filtration.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-[url('/CTA_bg_1.jpg')] bg-cover bg-center text-white rounded-xl shadow-lg overflow-hidden backdrop-blur-md p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Make a Difference Today</h2>
            <p className="mb-6 opacity-90">
              Carbon offsetting does more than neutralize your emissions—it
              helps drive the global transition to a low-carbon future. Your
              contribution supports innovative projects that wouldn&apos;t exist
              without carbon finance, creating jobs, protecting ecosystems, and
              improving lives worldwide.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center">
                <ArrowUp className="h-5 w-5 mr-2" />
                Offset Now
              </button>
              <button
                onClick={() => setShowDashboard((prev) => !prev)}
                className="bg-black/30 text-white px-6 py-3 border border-gray-100 rounded-lg font-semibold hover:bg-black/50 transition-colors flex items-center justify-center"
              >
                <Clock className="h-5 w-5 mr-2" />
                Remind Me Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonImpactDashboard;
