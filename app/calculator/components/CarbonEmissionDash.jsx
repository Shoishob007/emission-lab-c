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

const CarbonImpactDashboard = ({ emissionData, aiAnalysisData, setShowDashboard }) => {
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

  // Use AI analysis data if available, otherwise fallback to static calculations
  const totalEmissions = aiAnalysisData?.carbon_emissions?.co2e_mt || 
    emissionData?.result?.data?.emissions?.co2e_mt || 
    emissionData?.result?.data?.co2e_mt || 0;

  // Fallback calculations for when AI data is not available
  const fallbackData = {
    totalEmissions: totalEmissions,
    treesRequired: Math.ceil(totalEmissions * 20),
    homeEquivalent: Math.ceil(totalEmissions / 8.6),
    carEquivalent: Math.ceil(totalEmissions / 4.6),
    airQualityImprovement: Math.ceil(totalEmissions * 0.16),
    waterSaved: Math.ceil(totalEmissions * 8000),
    speciesProtected: Math.ceil(totalEmissions * 0.37),
  };

  // Extract data from AI analysis or use fallback
  const getEmissionFootprintData = () => {
    if (aiAnalysisData?.environmental_impact?.emission_footprint) {
      return aiAnalysisData.environmental_impact.emission_footprint;
    }
    return [
      {
        category: "Home Energy",
        emissions: fallbackData.homeEquivalent,
        description: `Your footprint equals to emission of ${fallbackData.homeEquivalent} average home throughout a year. Residential emissions primarily come from electricity (60%), heating (25%), and appliances (15%).`
      },
      {
        category: "Transportation",
        emissions: fallbackData.carEquivalent,
        description: `Your total emissions match ${fallbackData.carEquivalent} vehicles driving the average annual mileage. Transportation emissions account for nearly 30% of greenhouse gases.`
      }
    ];
  };

  const getCarbonOffsetData = () => {
    if (aiAnalysisData?.environmental_impact?.carbon_offset_solutions) {
      return aiAnalysisData.environmental_impact.carbon_offset_solutions;
    }
    return [
      {
        category: "Reforestation",
        emissions: fallbackData.treesRequired,
        description: `Planting ${fallbackData.treesRequired.toLocaleString()} native trees will fully offset your emissions over their 40-year lifespan. These projects restore biodiversity while creating natural carbon sinks.`
      },
      {
        category: "Community Projects",
        emissions: Math.ceil(totalEmissions * 2),
        description: `Your offset can provide clean energy solutions for ${Math.ceil(totalEmissions * 2)} people in developing regions. Projects include efficient cookstoves and solar lanterns.`
      }
    ];
  };

  const getEnvironmentalImpactData = () => {
    if (aiAnalysisData?.environmental_impact?.positive_environmental_impact) {
      return aiAnalysisData.environmental_impact.positive_environmental_impact;
    }
    return [
      {
        category: "Air Quality",
        emissions: fallbackData.airQualityImprovement,
        description: `Offset projects may reduce particulate pollution by ${fallbackData.airQualityImprovement}% in local areas, preventing respiratory illnesses.`
      },
      {
        category: "Water Saved",
        emissions: fallbackData.waterSaved,
        description: `Conserves ${Math.round(fallbackData.waterSaved / 1000)} thousand liters by avoiding water-intensive energy production.`
      },
      {
        category: "Biodiversity",
        emissions: fallbackData.speciesProtected,
        description: `Protects habitat for ${fallbackData.speciesProtected} plant and animal species, with restoration projects increasing biodiversity by 35% on average.`
      }
    ];
  };

  const emissionFootprintData = getEmissionFootprintData();
  const carbonOffsetData = getCarbonOffsetData();
  const environmentalImpactData = getEnvironmentalImpactData();

  return (
    <div className="p-6 font-sans">
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
                  {totalEmissions?.toFixed(2)}
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
                {aiAnalysisData?.about?.understanding_carbon_footprint || 
                `Your current carbon footprint is ${totalEmissions.toFixed(2)} metric tons of CO₂. This amount of carbon dioxide contributes significantly to climate change and has a negative impact on the environment, including global warming, extreme weather events, and loss of biodiversity.`}
              </p>
              <h3 className="text-xl font-semibold mb-3 text-gray-600 flex items-center">
                <Globe className="w-6 h-6 mr-2 text-primary" />
                Mitigating Through Carbon Offsetting
              </h3>
              <p className="text-gray-600">
                {aiAnalysisData?.about?.mitigating_through_carbon_offsetting ||
                `Carbon offsetting means balancing your emissions by funding projects that reduce or remove an equivalent amount of greenhouse gases. These initiatives can range from reforestation and renewable energy to methane capture and sustainable energy solution for communal use.`}
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
          {emissionFootprintData.map((item, index) => (
            <div key={index} className="group bg-white rounded-xl shadow-md overflow-hidden transition-all transform w-full">
              <div className="h-20 bg-gradient-to-r from-red-500 to-red-600 relative overflow-hidden">
                <div className="absolute inset-0 flex justify-center items-center opacity-20">
                  {[...Array(8)].map((_, i) => {
                    const Icon = item.category === "Home Energy" ? Home : Car;
                    return (
                      <Icon
                        key={i}
                        className="absolute"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          transform: `scale(${0.5 + Math.random()})`,
                          opacity: 0.3 + Math.random() * 0.7,
                        }}
                      />
                    );
                  })}
                </div>
                <div className="h-20 bg-gradient-to-r from-red-500 to-red-600 relative overflow-hidden flex justify-center items-center">
                  <h3 className="font-semibold text-white flex items-center">
                    {item.category === "Home Energy" ? <Home className="w-8 h-8 mr-4" /> : <Car className="w-8 h-8 mr-4" />}
                    {item.category}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-gray-800">
                    {Math.round(item.emissions).toLocaleString()}
                  </span>
                  <span className="ml-2 text-gray-600">
                    {item.category === "Home Energy" ? "homes" : "cars"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Offset Section */}
        <h2 className="text-2xl font-bold mb-4 text-gray-600 flex items-center justify-center">
          <Trees className="w-10 h-10 mr-2 text-primary" />
          Carbon Offset Solutions
        </h2>
        <p className="text-gray-600 mb-6 max-w-3xl mx-auto text-center">
          Verified projects that effectively neutralize your carbon footprint.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 max-w-5xl mx-auto">
          {carbonOffsetData.map((item, index) => (
            <div key={index} className="group bg-white rounded-xl shadow-md overflow-hidden transition-all transform w-full">
              <div className="h-20 bg-gradient-to-r from-green-500 to-green-600 relative overflow-hidden">
                <div className="absolute inset-0 flex justify-center items-center opacity-20">
                  {[...Array(12)].map((_, i) => {
                    const Icon = item.category === "Reforestation" ? TreePine : Users;
                    return (
                      <Icon
                        key={i}
                        className="absolute"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          transform: `scale(${0.5 + Math.random() * 0.5})`,
                          opacity: 0.3 + Math.random() * 0.7,
                        }}
                      />
                    );
                  })}
                </div>
                <div className="h-20 bg-gradient-to-r from-green-500 to-green-600 relative overflow-hidden flex justify-center items-center">
                  <h3 className="font-semibold text-white flex items-center">
                    {item.category === "Reforestation" ? <TreePine className="w-8 h-8 mr-4" /> : <Users className="w-8 h-8 mr-4" />}
                    {item.category}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-gray-800">
                    {Math.round(item.emissions).toLocaleString()}
                  </span>
                  <span className="ml-2 text-gray-600">
                    {item.category === "Reforestation" ? "trees" : "people"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
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
          {environmentalImpactData.map((item, index) => {
            const getIcon = (category) => {
              switch(category) {
                case "Air Quality": return Wind;
                case "Water Saved": return Droplet;
                case "Biodiversity": return Shell;
                default: return Leaf;
              }
            };
            
            const getUnit = (category) => {
              switch(category) {
                case "Air Quality": return "%";
                case "Water Saved": return "liters";
                case "Biodiversity": return "species";
                default: return "";
              }
            };

            const Icon = getIcon(item.category);
            
            return (
              <div key={index} className="group bg-white rounded-xl shadow-md overflow-hidden transition-all transform w-full">
                <div className="h-20 bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden">
                  <div className="absolute inset-0 flex justify-center items-center opacity-20">
                    {[...Array(8)].map((_, i) => (
                      <Icon
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
                      <Icon className="w-8 h-8 mr-4" />
                      {item.category}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold text-gray-800">
                      {item.category === "Air Quality" ? 
                        `${Math.round(item.emissions)}` : 
                        Math.round(item.emissions).toLocaleString()}
                    </span>
                    <span className="ml-2 text-gray-600">
                      {getUnit(item.category)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
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
              <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center cursor-not-allowed">
                <ArrowUp className="h-5 w-5 mr-2" />
                Offset Now
              </button>
              <button
                onClick={() => setShowDashboard((prev) => !prev)}
                className="bg-black/30 text-white px-6 py-3 border border-gray-100 rounded-lg font-semibold hover:bg-black/50 transition-colors flex items-center justify-center cursor-not-allowed"
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