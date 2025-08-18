export const offsetProjects = [
  {
    id: 1,
    name: "Amazon Rainforest Conservation",
    region: "Brazil, South America",
    source: "Green Earth Foundation",
    description: "Protecting 50,000 hectares of pristine Amazon rainforest through community-based conservation initiatives. This project prevents deforestation while supporting indigenous communities.",
    donationValue: 25, // USD per tonne CO2e
    projectType: "Forest Conservation",
    stats: {
      totalDonations: 2847,
      totalAmount: 485000,
      co2Offset: 19400
    },
    outcome: "Each $25 donation offsets 1 tonne CO2e and protects 0.5 hectares of rainforest for one year.",
    publishDate: "2024-03-15",
    image: "/landing-page/reforestration-project.jpg",
    currency: "USD",
    verified: true,
    certificationStandard: "VCS (Verified Carbon Standard)",
    impactMetrics: {
      treesProtected: 125000,
      biodiversityScore: 9.2,
      communityJobs: 450
    },
    default: false
  },
  {
    id: 2,
    name: "Solar Power for Rural Schools",
    region: "Kenya, East Africa",
    source: "Sustainable Energy Alliance",
    description: "Installing solar panel systems in 25 rural schools across Kenya, providing clean energy access to over 3,000 students while reducing reliance on fossil fuels.",
    donationValue: 18,
    projectType: "Renewable Energy",
    stats: {
      totalDonations: 1523,
      totalAmount: 327000,
      co2Offset: 18167
    },
    outcome: "Each $18 donation offsets 1 tonne CO2e and powers classroom lighting for 50 students for one month.",
    publishDate: "2024-02-28",
    image: "/landing-page/renewable-energy-project.jpg",
    currency: "USD",
    verified: true,
    certificationStandard: "Gold Standard",
    impactMetrics: {
      schoolsEnergized: 25,
      studentsImpacted: 3200,
      energyGenerated: 450000 // kWh annually
    },
    default: false

  },
  {
    id: 3,
    name: "Ocean Plastic Recovery Initiative",
    region: "Southeast Asia",
    source: "Blue Ocean Collective",
    description: "Removing plastic waste from ocean systems while converting it into sustainable building materials. This project combines environmental cleanup with community economic development.",
    donationValue: 32,
    projectType: "Ocean Conservation",
    stats: {
      totalDonations: 892,
      totalAmount: 156800,
      co2Offset: 4900
    },
    outcome: "Each $32 donation offsets 1 tonne CO2e and removes 50kg of ocean plastic waste.",
    publishDate: "2024-01-20",
    image: "/landing-page/climate-awarness.jpg",
    currency: "USD",
    verified: true,
    certificationStandard: "Plan Vivo",
    impactMetrics: {
      plasticRemoved: 245000, // kg
      marineSpeciesProtected: 1200,
      recyclingJobs: 180
    },
    default: false

  },
  {
    id: 4,
    name: "Wind Farm Development",
    region: "Patagonia, Argentina",
    source: "Wind Power Innovations",
    description: "Constructing a 100MW wind farm that will provide clean energy to 45,000 homes while displacing coal-fired power generation in the region.",
    donationValue: 22,
    projectType: "Renewable Energy",
    stats: {
      totalDonations: 2156,
      totalAmount: 398500,
      co2Offset: 18113
    },
    outcome: "Each $22 donation offsets 1 tonne CO2e and powers 2 homes with clean wind energy for one month.",
    publishDate: "2024-04-05",
    image: "/landing-page/renewable-energy-project.jpg",
    currency: "USD",
    verified: true,
    certificationStandard: "VCS (Verified Carbon Standard)",
    impactMetrics: {
      energyCapacity: 100, // MW
      homesSupplied: 45000,
      coalDisplaced: 85000 // tonnes annually
    },
    default: false

  },
  {
    id: 5,
    name: "Mangrove Restoration Project",
    region: "Sundarbans, Bangladesh",
    source: "Coastal Restoration Trust",
    description: "Restoring 2,000 hectares of mangrove forests to protect coastal communities from flooding while creating carbon sinks and marine habitats.",
    donationValue: 28,
    projectType: "Ecosystem Restoration",
    stats: {
      totalDonations: 1334,
      totalAmount: 267500,
      co2Offset: 9554
    },
    outcome: "Each $28 donation offsets 1 tonne CO2e and restores 0.3 hectares of critical mangrove habitat.",
    publishDate: "2024-03-22",
    image: "/landing-page/reforestration-project.jpg",
    currency: "USD",
    verified: true,
    certificationStandard: "Gold Standard",
    impactMetrics: {
      mangroveArea: 2000, // hectares
      coastlineProtected: 85, // km
      fishermenSupported: 620
    },
    default: true

  },
  {
    id: 6,
    name: "Waste-to-Energy Biogas Plant",
    region: "Gujarat, India",
    source: "Clean Energy Solutions",
    description: "Converting agricultural waste into clean biogas energy, providing sustainable power to rural communities while reducing methane emissions from organic waste.",
    donationValue: 20,
    projectType: "Waste Management",
    stats: {
      totalDonations: 1876,
      totalAmount: 342000,
      co2Offset: 17100
    },
    outcome: "Each $20 donation offsets 1 tonne CO2e and converts 100kg of agricultural waste into clean energy.",
    publishDate: "2024-02-12",
    image: "/landing-page/climate-awarness.jpg",
    currency: "USD",
    verified: true,
    certificationStandard: "CDM (Clean Development Mechanism)",
    impactMetrics: {
      wasteProcessed: 50000, // tonnes annually
      villagesSupplied: 12,
      farmersParticipating: 850
    },
    default: false

  },
  {
    id: 7,
    name: "Urban Reforestation Initiative",
    region: "São Paulo, Brazil",
    source: "City Green Alliance",
    description: "Planting native trees in urban areas to improve air quality, reduce urban heat island effect, and create green corridors for biodiversity.",
    donationValue: 15,
    projectType: "Urban Forestry",
    stats: {
      totalDonations: 2943,
      totalAmount: 198500,
      co2Offset: 13233
    },
    outcome: "Each $15 donation offsets 1 tonne CO2e and plants 3 native trees in urban green spaces.",
    publishDate: "2024-04-18",
    image: "/landing-page/climate-awarness.jpg",
    currency: "USD",
    verified: true,
    certificationStandard: "Plan Vivo",
    impactMetrics: {
      treesPlanted: 39729,
      airQualityImprovement: 15, // percentage
      greenSpaceCreated: 125 // hectares
    },
    default: false

  },
  {
    id: 8,
    name: "Clean Cookstove Distribution",
    region: "Rural Ethiopia",
    source: "Sustainable Living Foundation",
    description: "Distributing efficient cookstoves to rural households, reducing indoor air pollution and deforestation while improving health outcomes for families.",
    donationValue: 12,
    projectType: "Community Development",
    stats: {
      totalDonations: 3456,
      totalAmount: 245600,
      co2Offset: 20467
    },
    outcome: "Each $12 donation offsets 1 tonne CO2e and provides a clean cookstove to one family for 5 years.",
    publishDate: "2024-01-30",
    image: "/landing-page/renewable-energy-project.jpg",
    currency: "USD",
    verified: true,
    certificationStandard: "Gold Standard",
    impactMetrics: {
      familiesBenefited: 3456,
      healthImprovements: 95, // percentage
      fuelwoodSaved: 12500 // tonnes annually
    },
    default: false

  },
  {
    id: 9,
    name: "Geothermal Energy Development",
    region: "Iceland",
    source: "Nordic Green Energy",
    description: "Expanding geothermal energy infrastructure to provide clean, renewable heating and electricity while demonstrating scalable clean energy solutions.",
    donationValue: 35,
    projectType: "Renewable Energy",
    stats: {
      totalDonations: 678,
      totalAmount: 298500,
      co2Offset: 8529
    },
    outcome: "Each $35 donation offsets 1 tonne CO2e and provides renewable heating for one home for 3 months.",
    publishDate: "2024-03-08",
    image: "/landing-page/climate-awarness.jpg",
    currency: "USD",
    verified: true,
    certificationStandard: "VCS (Verified Carbon Standard)",
    impactMetrics: {
      energyCapacity: 50, // MW
      householdsServed: 8500,
      fossilFuelDisplaced: 45000 // tonnes annually
    },
    default: false

  }
];

export const projectTypes = [
  "Forest Conservation",
  "Renewable Energy",
  "Ocean Conservation",
  "Ecosystem Restoration",
  "Waste Management",
  "Urban Forestry",
  "Community Development"
];

export const certificationStandards = [
  "VCS (Verified Carbon Standard)",
  "Gold Standard",
  "Plan Vivo",
  "CDM (Clean Development Mechanism)"
];