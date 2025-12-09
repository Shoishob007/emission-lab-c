"use client";
import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { MapPin, Leaf, TrendingUp, Info, Globe, Loader, AlertCircle } from "lucide-react";

// World map GeoJSON URL
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Country population data
const countryPopulation = {
  'AFG': '40.1M', 'ALB': '2.8M', 'DZA': '45.4M', 'AND': '0.08M', 'AGO': '36.7M',
  'AIA': '0.02M', 'ARG': '45.8M', 'ARM': '2.9M', 'ABW': '0.11M', 'AUS': '26.0M',
  'AUT': '9.1M', 'AZE': '10.3M', 'BHS': '0.4M', 'BHR': '1.5M', 'BGD': '169.4M',
  'BRB': '0.3M', 'BLR': '9.3M', 'BEL': '11.7M', 'BLZ': '0.4M', 'BEN': '13.0M',
  'BMU': '0.06M', 'BTN': '0.8M', 'BOL': '12.1M', 'BIH': '3.3M', 'BWA': '2.6M',
  'BRA': '214.3M', 'VGB': '0.03M', 'BRN': '0.4M', 'BGR': '6.5M', 'BFA': '22.5M',
  'BDI': '12.9M', 'KHM': '17.1M', 'CMR': '27.9M', 'CAN': '38.9M', 'CPV': '0.6M',
  'CYM': '0.07M', 'CAF': '5.5M', 'TCD': '17.4M', 'CHL': '19.6M', 'CHN': '1,411.8M',
  'COL': '51.9M', 'COM': '0.9M', 'COD': '95.9M', 'COG': '5.8M', 'CRI': '5.2M',
  'CIV': '27.5M', 'HRV': '4.0M', 'CUB': '11.3M', 'CYP': '1.2M', 'CZE': '10.7M',
  'DNK': '5.9M', 'DJI': '1.0M', 'DMA': '0.07M', 'DOM': '11.1M', 'ECU': '18.0M',
  'EGY': '109.3M', 'SLV': '6.3M', 'GNQ': '1.5M', 'ERI': '3.6M', 'EST': '1.3M',
  'SWZ': '1.2M', 'ETH': '123.4M', 'FJI': '0.9M', 'FIN': '5.6M', 'FRA': '65.6M',
  'DEU': '84.3M', 'GHA': '32.8M', 'GRC': '10.4M', 'GRL': '0.06M', 'GRD': '0.1M',
  'GTM': '17.6M', 'GIN': '13.9M', 'GNB': '2.1M', 'GUY': '0.8M', 'HTI': '11.5M',
  'HND': '10.4M', 'HUN': '9.6M', 'ISL': '0.4M', 'IND': '1,417.2M', 'IDN': '277.5M',
  'IRN': '88.6M', 'IRQ': '44.5M', 'IRL': '5.1M', 'ISR': '9.4M', 'ITA': '59.0M',
  'JAM': '3.0M', 'JPN': '125.1M', 'JOR': '11.3M', 'KAZ': '19.6M', 'KEN': '55.1M',
  'KIR': '0.1M', 'PRK': '26.0M', 'KOR': '51.8M', 'KWT': '4.4M', 'KGZ': '6.8M',
  'LAO': '7.5M', 'LVA': '1.8M', 'LBN': '5.6M', 'LSO': '2.3M', 'LBR': '5.4M',
  'LBY': '7.0M', 'LIE': '0.04M', 'LTU': '2.7M', 'LUX': '0.6M', 'MDG': '29.6M',
  'MWI': '20.4M', 'MYS': '33.6M', 'MDV': '0.5M', 'MLI': '22.6M', 'MLT': '0.5M',
  'MHL': '0.06M', 'MRT': '4.9M', 'MUS': '1.3M', 'MEX': '131.6M', 'FSM': '0.1M',
  'MDA': '2.6M', 'MCO': '0.04M', 'MNG': '3.4M', 'MNE': '0.6M', 'MAR': '37.8M',
  'MOZ': '33.1M', 'MMR': '54.8M', 'NAM': '2.6M', 'NRU': '0.01M', 'NPL': '30.5M',
  'NLD': '17.7M', 'NZL': '5.1M', 'NIC': '6.9M', 'NER': '26.2M', 'NGA': '218.5M',
  'MKD': '2.1M', 'NOR': '5.5M', 'OMN': '4.6M', 'PAK': '235.8M', 'PLW': '0.02M',
  'PSE': '5.3M', 'PAN': '4.4M', 'PNG': '9.9M', 'PRY': '7.3M', 'PER': '34.0M',
  'PHL': '115.6M', 'POL': '37.7M', 'PRT': '10.3M', 'PRI': '3.2M', 'QAT': '2.9M',
  'ROU': '19.0M', 'RUS': '144.4M', 'RWA': '13.8M', 'KNA': '0.05M', 'LCA': '0.2M',
  'VCT': '0.1M', 'WSM': '0.2M', 'SMR': '0.03M', 'STP': '0.2M', 'SAU': '36.4M',
  'SEN': '17.5M', 'SRB': '6.7M', 'SYC': '0.1M', 'SLE': '8.6M', 'SGP': '5.9M',
  'SVK': '5.5M', 'SVN': '2.1M', 'SLB': '0.7M', 'SOM': '17.6M', 'ZAF': '60.4M',
  'SSD': '11.4M', 'ESP': '47.6M', 'LKA': '22.2M', 'SDN': '46.9M', 'SUR': '0.6M',
  'SWE': '10.5M', 'CHE': '8.8M', 'SYR': '22.1M', 'TWN': '23.9M', 'TJK': '10.0M',
  'TZA': '63.6M', 'THA': '70.0M', 'TLS': '1.3M', 'TGO': '8.8M', 'TON': '0.1M',
  'TTO': '1.5M', 'TUN': '12.3M', 'TUR': '85.3M', 'TKM': '6.3M', 'TCA': '0.05M',
  'TUV': '0.01M', 'UGA': '48.4M', 'UKR': '43.2M', 'ARE': '10.1M', 'GBR': '68.5M',
  'USA': '331.9M', 'VIR': '0.1M', 'URY': '3.5M', 'UZB': '35.2M', 'VUT': '0.3M',
  'VEN': '28.2M', 'VNM': '98.6M', 'ESH': '0.6M', 'YEM': '31.0M', 'ZMB': '19.5M',
  'ZWE': '15.2M'
};

// Country name to code mappings
const countryNameToCode = {
  "Afghanistan": "AFG", "Albania": "ALB", "Algeria": "DZA", "Andorra": "AND",
  "Angola": "AGO", "Anguilla": "AIA", "Antarctica": "ATA", "Antigua and Barbuda": "ATG",
  "Argentina": "ARG", "Armenia": "ARM", "Aruba": "ABW", "Australia": "AUS",
  "Austria": "AUT", "Azerbaijan": "AZE", "Bahamas": "BHS", "Bahrain": "BHR",
  "Bangladesh": "BGD", "Barbados": "BRB", "Belarus": "BLR", "Belgium": "BEL",
  "Belize": "BLZ", "Benin": "BEN", "Bermuda": "BMU", "Bhutan": "BTN",
  "Bolivia": "BOL", "Bonaire Sint Eustatius and Saba": "BES", "Bosnia and Herzegovina": "BIH",
  "Botswana": "BWA", "Brazil": "BRA", "British Virgin Islands": "VGB",
  "Brunei": "BRN", "Bulgaria": "BGR", "Burkina Faso": "BFA", "Burundi": "BDI",
  "Cambodia": "KHM", "Cameroon": "CMR", "Canada": "CAN", "Chile": "CHL",
  "China": "CHN", "Colombia": "COL", "Congo": "COG", "Costa Rica": "CRI",
  "Croatia": "HRV", "Cuba": "CUB", "Cyprus": "CYP", "Czechia": "CZE",
  "Denmark": "DNK", "Djibouti": "DJI", "Dominica": "DMA", "Dominican Republic": "DOM",
  "Ecuador": "ECU", "Egypt": "EGY", "El Salvador": "SLV", "Eritrea": "ERI",
  "Estonia": "EST", "Eswatini": "SWZ", "Ethiopia": "ETH", "Fiji": "FJI",
  "Finland": "FIN", "France": "FRA", "Gabon": "GAB", "Gambia": "GMB",
  "Georgia": "GEO", "Germany": "DEU", "Ghana": "GHA", "Greece": "GRC",
  "Greenland": "GRL", "Grenada": "GRD", "Guatemala": "GTM", "Guinea": "GIN",
  "Guinea-Bissau": "GNB", "Guyana": "GUY", "Haiti": "HTI", "Honduras": "HND",
  "Hungary": "HUN", "Iceland": "ISL", "India": "IND", "Indonesia": "IDN",
  "Iran": "IRN", "Iraq": "IRQ", "Ireland": "IRL", "Israel": "ISR",
  "Italy": "ITA", "Jamaica": "JAM", "Japan": "JPN", "Jordan": "JOR",
  "Kazakhstan": "KAZ", "Kenya": "KEN", "Kiribati": "KIR", "North Korea": "PRK",
  "South Korea": "KOR", "Kuwait": "KWT", "Kyrgyzstan": "KGZ", "Laos": "LAO",
  "Latvia": "LVA", "Lebanon": "LBN", "Lesotho": "LSO", "Liberia": "LBR",
  "Libya": "LBY", "Liechtenstein": "LIE", "Lithuania": "LTU", "Luxembourg": "LUX",
  "Madagascar": "MDG", "Malawi": "MWI", "Malaysia": "MYS", "Maldives": "MDV",
  "Mali": "MLI", "Malta": "MLT", "Marshall Islands": "MHL", "Mauritania": "MRT",
  "Mauritius": "MUS", "Mexico": "MEX", "Micronesia": "FSM", "Moldova": "MDA",
  "Monaco": "MCO", "Mongolia": "MNG", "Montenegro": "MNE", "Morocco": "MAR",
  "Mozambique": "MOZ", "Myanmar": "MMR", "Namibia": "NAM", "Nauru": "NRU",
  "Nepal": "NPL", "Netherlands": "NLD", "New Zealand": "NZL", "Nicaragua": "NIC",
  "Niger": "NER", "Nigeria": "NGA", "North Macedonia": "MKD", "Norway": "NOR",
  "Oman": "OMN", "Pakistan": "PAK", "Palau": "PLW", "Palestine": "PSE",
  "Panama": "PAN", "Papua New Guinea": "PNG", "Paraguay": "PRY", "Peru": "PER",
  "Philippines": "PHL", "Poland": "POL", "Portugal": "PRT", "Puerto Rico": "PRI",
  "Qatar": "QAT", "Romania": "ROU", "Russia": "RUS", "Rwanda": "RWA",
  "Saint Kitts and Nevis": "KNA", "Saint Lucia": "LCA", "Saint Vincent and the Grenadines": "VCT",
  "Samoa": "WSM", "San Marino": "SMR", "Sao Tome and Principe": "STP",
  "Saudi Arabia": "SAU", "Senegal": "SEN", "Serbia": "SRB", "Seychelles": "SYC",
  "Sierra Leone": "SLE", "Singapore": "SGP", "Slovakia": "SVK", "Slovenia": "SVN",
  "Solomon Islands": "SLB", "Somalia": "SOM", "South Africa": "ZAF", "South Sudan": "SSD",
  "Spain": "ESP", "Sri Lanka": "LKA", "Sudan": "SDN", "Suriname": "SUR",
  "Sweden": "SWE", "Switzerland": "CHE", "Syria": "SYR", "Taiwan": "TWN",
  "Tajikistan": "TJK", "Tanzania": "TZA", "Thailand": "THA", "Timor-Leste": "TLS",
  "Togo": "TGO", "Tonga": "TON", "Trinidad and Tobago": "TTO", "Tunisia": "TUN",
  "Turkey": "TUR", "Turkmenistan": "TKM", "Turks and Caicos Islands": "TCA",
  "Tuvalu": "TUV", "Uganda": "UGA", "Ukraine": "UKR", "United Arab Emirates": "ARE",
  "United Kingdom": "GBR", "United States": "USA", "Uruguay": "URY",
  "Uzbekistan": "UZB", "Vanuatu": "VUT", "Venezuela": "VEN", "Vietnam": "VNM",
  "Western Sahara": "ESH", "Yemen": "YEM", "Zambia": "ZMB", "Zimbabwe": "ZWE"
};

// Offset project locations
const offsetProjects = [
  {
    id: 1,
    name: "Amazon Rainforest Conservation",
    country: "Brazil",
    countryCode: "BRA",
    lat: -3.4653,
    lng: -62.2159,
    type: "Forest Conservation",
    offsetAmount: "50,000 tons CO₂/year",
    description: "Protecting 10,000 hectares of pristine rainforest from deforestation and illegal logging activities.",
  },
  {
    id: 2,
    name: "Solar Farm Initiative",
    country: "India",
    countryCode: "IND",
    lat: 20.5937,
    lng: 78.9629,
    type: "Renewable Energy",
    offsetAmount: "30,000 tons CO₂/year",
    description: "Large-scale solar energy generation project replacing coal-fired power plants in rural areas.",
  },
  {
    id: 3,
    name: "Wind Power Project",
    country: "Germany",
    countryCode: "DEU",
    lat: 51.1657,
    lng: 10.4515,
    type: "Renewable Energy",
    offsetAmount: "25,000 tons CO₂/year",
    description: "Offshore wind turbine installation providing clean energy to 50,000 households.",
  },
  {
    id: 4,
    name: "Reforestation Program",
    country: "Kenya",
    countryCode: "KEN",
    lat: -0.0236,
    lng: 37.9062,
    type: "Reforestation",
    offsetAmount: "15,000 tons CO₂/year",
    description: "Planting 1 million trees across degraded lands to restore ecosystems and sequester carbon.",
  },
  {
    id: 5,
    name: "Mangrove Restoration",
    country: "Indonesia",
    countryCode: "IDN",
    lat: -0.7893,
    lng: 113.9213,
    type: "Coastal Restoration",
    offsetAmount: "20,000 tons CO₂/year",
    description: "Restoring coastal mangrove ecosystems that provide carbon sequestration and coastal protection.",
  },
  {
    id: 6,
    name: "Geothermal Energy",
    country: "Iceland",
    countryCode: "ISL",
    lat: 64.9631,
    lng: -19.0208,
    type: "Renewable Energy",
    offsetAmount: "18,000 tons CO₂/year",
    description: "Harnessing volcanic geothermal power for clean electricity and heating systems.",
  },
  {
    id: 7,
    name: "Clean Cookstove Distribution",
    country: "Nigeria",
    countryCode: "NGA",
    lat: 9.082,
    lng: 8.6753,
    type: "Community Project",
    offsetAmount: "12,000 tons CO₂/year",
    description: "Distributing efficient cookstoves to rural communities to reduce wood consumption and indoor air pollution.",
  },
  {
    id: 8,
    name: "Hydroelectric Plant",
    country: "Canada",
    countryCode: "CAN",
    lat: 56.1304,
    lng: -106.3468,
    type: "Renewable Energy",
    offsetAmount: "40,000 tons CO₂/year",
    description: "Clean hydroelectric power generation replacing fossil fuel-based electricity production.",
  },
];

const CarbonEmissionWorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [carbonData, setCarbonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalEmissions: 0,
    countryCount: 0,
    maxEmission: 0,
    latestYear: 0,
    topEmitters: []
  });

  // Fetch CSV data on component mount
  useEffect(() => {
    fetchCarbonData();
  }, []);

  const fetchCarbonData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Try multiple methods to load the CSV
      let csvText;
      
      try {
        // Method 1: Direct fetch from public folder
        const response = await fetch('/annual-co2-emissions-per-country.csv');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        
        csvText = await response.text();
      } catch (fetchError) {
        console.log('Direct fetch failed, trying fallback...');
        
        // Method 2: Try to load from local path
        try {
          // This is a fallback for development
          const response = await fetch('/api/carbon-data');
          if (!response.ok) throw new Error('API route failed');
          csvText = await response.text();
        } catch (apiError) {
          // Method 3: Use sample data as last resort
          console.log('Using sample data as fallback');
          csvText = getSampleCSVData();
        }
      }
      
      processCSVData(csvText);
      
    } catch (err) {
      console.error('Error fetching carbon data:', err);
      setError('Failed to load carbon emission data. Using sample data instead.');
      // Use sample data as fallback
      const sampleData = getSampleCSVData();
      processCSVData(sampleData);
    }
  };

  const getSampleCSVData = () => {
    // Return a small sample of the CSV data as fallback
    return `Entity,Code,Year,Annual CO₂ emissions
Afghanistan,AFG,2020,11118626
Albania,ALB,2020,4865033
Algeria,DZA,2020,171138530
Argentina,ARG,2020,164612720
Australia,AUS,2020,398546900
Brazil,BRA,2020,447999400
Canada,CAN,2020,130520904
China,CHN,2020,10800000000
France,FRA,2020,280000000
Germany,DEU,2020,675000000
India,IND,2020,2441000000
Indonesia,IDN,2020,590000000
Italy,ITA,2020,300000000
Japan,JPN,2020,1050000000
Mexico,MEX,2020,400000000
Nigeria,NGA,2020,120000000
Russia,RUS,2020,1670000000
Saudi Arabia,SAU,2020,600000000
South Africa,ZAF,2020,450000000
South Korea,KOR,2020,600000000
Turkey,TUR,2020,400000000
United Kingdom,GBR,2020,350000000
United States,USA,2020,4800000000`;
  };

  const processCSVData = (csvText) => {
    try {
      const lines = csvText.split('\n');
      const processedData = {};
      let globalTotal = 0;
      let max = 0;
      let countriesProcessed = 0;
      let latestYear = 0;
      const topEmitters = [];

      // Process each line (skip header)
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Parse CSV line (handling potential commas in values)
        const parts = [];
        let currentPart = '';
        let inQuotes = false;
        
        for (let j = 0; j < line.length; j++) {
          const char = line[j];
          
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            parts.push(currentPart);
            currentPart = '';
          } else {
            currentPart += char;
          }
        }
        parts.push(currentPart);

        if (parts.length < 4) continue;

        const entity = parts[0].trim();
        let code = parts[1].trim();
        const year = parseInt(parts[2]);
        const emissionStr = parts[3];
        
        // Skip continents and aggregated regions
        if (!code || code === '' || 
            entity.includes('(GCP)') || 
            entity === 'Asia' || 
            entity === 'Africa' || 
            entity === 'Antarctica' ||
            entity.includes('Asia (excl.')) {
          continue;
        }

        // Try to get code from name mapping if missing
        if (code === '' && countryNameToCode[entity]) {
          code = countryNameToCode[entity];
        }

        if (!code || code.length !== 3) continue;

        const emission = parseFloat(emissionStr);
        
        if (isNaN(emission) || emission === 0) continue;

        // Store data by country code
        if (!processedData[code]) {
          processedData[code] = {
            name: entity,
            data: [],
            latestYear: 0,
            latestEmission: 0
          };
        }

        // Add data point
        processedData[code].data.push({
          year: year,
          emission: emission,
          emissionInMillionTons: emission / 1000000
        });

        // Update latest year if this is newer
        if (year > processedData[code].latestYear) {
          processedData[code].latestYear = year;
          processedData[code].latestEmission = emission;
          
          // Update global stats
          const emissionInMillionTons = emission / 1000000;
          globalTotal += emissionInMillionTons;
          
          if (emissionInMillionTons > max) {
            max = emissionInMillionTons;
          }
          
          if (year > latestYear) {
            latestYear = year;
          }
          
          // Add to top emitters list
          topEmitters.push({
            code,
            name: entity,
            emission: emissionInMillionTons,
            year
          });
          
          countriesProcessed++;
        }
      }

      // Sort each country's data by year
      Object.keys(processedData).forEach(code => {
        processedData[code].data.sort((a, b) => a.year - b.year);
      });

      // Sort top emitters and take top 10
      const sortedTopEmitters = topEmitters
        .sort((a, b) => b.emission - a.emission)
        .slice(0, 10);

      setCarbonData(processedData);
      setStats({
        totalEmissions: globalTotal,
        countryCount: countriesProcessed,
        maxEmission: max,
        latestYear: latestYear,
        topEmitters: sortedTopEmitters
      });
      setIsLoading(false);
      
    } catch (error) {
      console.error("Error processing CSV data:", error);
      setError('Error processing data. Some features may be limited.');
      setIsLoading(false);
    }
  };

  // Extract country code from geo object
const extractCountryCode = (geo) => {
    const props = geo.properties || {};
    let isoA3 = props.iso_a3 || props.ISO_A3 || props.isoA3;
    const isoA2 = props.iso_a2 || props.ISO_A2 || props.isoA2;
    const name = props.name || props.NAME || props.name_long || "";
    
    // Handle special cases and normalization
    if (isoA3 === '-99' || !isoA3) {
      // Try to get code from name mapping
      isoA3 = countryNameToCode[name];
    }
    
    return {
      code: isoA3,
      code2: isoA2,
      name: name
    };
  };

  // Get emission for a country
  const getEmissionForCountry = (countryCode) => {
    if (!carbonData || !carbonData[countryCode]) return null;
    return carbonData[countryCode].latestEmission / 1000000;
  };

  // Get color for emission value
  const getColorForEmission = (emission) => {
    if (emission === null || emission === undefined || emission === 0) {
      return "#e5e7eb"; // Light gray for no data
    }
    
    // Calculate percentile based on max emission
    const percentile = (emission / stats.maxEmission) * 100;
    
    if (percentile < 0.1) return "#fef3c7"; // Very low
    if (percentile < 1) return "#fbbf24";   // Low
    if (percentile < 10) return "#f59e0b";  // Medium
    if (percentile < 30) return "#dc2626";  // High
    return "#991b1b";                       // Very high
  };

  // Handle country click
  const handleRegionClick = (geo) => {
    const { code, name } = extractCountryCode(geo);
    
    if (code && carbonData && carbonData[code]) {
      const countryData = carbonData[code];
      const emission = countryData.latestEmission / 1000000;
      
      // Calculate per capita if population data exists
      let perCapita = null;
      if (countryPopulation[code]) {
        const popNum = parseFloat(countryPopulation[code].replace(/[^\d.]/g, ""));
        if (popNum > 0) {
          perCapita = (countryData.latestEmission / popNum) / 1000;
        }
      }
      
      setSelectedCountry({
        code: code,
        name: name,
        emission: emission,
        year: countryData.latestYear,
        population: countryPopulation[code] || "N/A",
        data: countryData.data,
        perCapita: perCapita,
        trend: getTrendForCountry(countryData)
      });
      setSelectedProject(null);
    }
  };

  // Handle project click
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setSelectedCountry(null);
  };

  // Get trend for country
  const getTrendForCountry = (countryData) => {
    if (!countryData || countryData.data.length < 2) return { status: "No data", change: 0 };
    
    // Get last 10 years of data
    const recentYears = countryData.data.slice(-10);
    if (recentYears.length < 2) return { status: "Insufficient data", change: 0 };
    
    const first = recentYears[0].emission;
    const last = recentYears[recentYears.length - 1].emission;
    const change = ((last - first) / first) * 100;
    
    if (Math.abs(change) < 5) return { status: "Stable", change };
    return change > 0 
      ? { status: "Increasing", change }
      : { status: "Decreasing", change: Math.abs(change) };
  };

  // Handle move end for zoom/pan
  const handleMoveEnd = (pos) => {
    setPosition(pos);
  };

  // Reset view
  const handleResetView = () => {
    setPosition({ coordinates: [0, 0], zoom: 1 });
    setSelectedCountry(null);
    setSelectedProject(null);
  };

  // Get progress color based on trend
  const getTrendColor = (trend) => {
    if (trend.status === "Increasing") return "text-red-600";
    if (trend.status === "Decreasing") return "text-green-600";
    return "text-yellow-600";
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 p-4 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading carbon emission data...</p>
          <p className="text-sm text-gray-500 mt-2">Processing global emissions dataset</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-4 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-green-500 to-blue-500 p-3 rounded-2xl shadow-lg">
              <Globe className="text-white" size={48} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                Global Carbon Emissions Map
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Interactive visualization of CO₂ emissions data worldwide
              </p>
            </div>
          </div>
        
        </div>

        {/* Legend */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-orange-500" size={20} />
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                Annual CO₂ Emissions (million tons):
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-8 h-4 bg-[#fef3c7] border border-gray-300 rounded"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Very Low</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-8 h-4 bg-[#fbbf24] border border-gray-300 rounded"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Low</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-8 h-4 bg-[#f59e0b] border border-gray-300 rounded"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Medium</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-8 h-4 bg-[#dc2626] border border-gray-300 rounded"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">High</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-8 h-4 bg-[#991b1b] border border-gray-300 rounded"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Very High</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-8 h-4 bg-[#e5e7eb] border border-gray-300 rounded"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">No Data</span>
              </div>
            </div>
          </div>
          {error && (
            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-yellow-600 dark:text-yellow-400" size={16} />
                <p className="text-sm text-yellow-700 dark:text-yellow-300">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Map */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Interactive Emissions Map
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={handleResetView}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all text-sm font-medium"
                >
                  Reset View
                </button>
                <button
                  onClick={fetchCarbonData}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all text-sm font-medium"
                >
                  Refresh Data
                </button>
              </div>
            </div>

            <div className="h-[500px] rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 relative">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: position.zoom * 100,
                  center: [0, 20],
                }}
              >
                <ZoomableGroup
                  center={position.coordinates}
                  zoom={position.zoom}
                  onMoveEnd={handleMoveEnd}
                >
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const { code, name } = extractCountryCode(geo);
                        const emission = getEmissionForCountry(code);
                        const fillColor = getColorForEmission(emission);
                        
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={fillColor}
                            stroke="#FFF"
                            strokeWidth={0.5}
                            style={{
                              default: {
                                outline: "none",
                                cursor: emission !== null ? "pointer" : "default",
                              },
                              hover: {
                                fill: emission !== null ? "#3B82F6" : fillColor,
                                outline: "none",
                                cursor: emission !== null ? "pointer" : "default",
                              },
                              pressed: {
                                fill: emission !== null ? "#2563EB" : fillColor,
                                outline: "none",
                              },
                            }}
                            onClick={() => emission !== null && handleRegionClick(geo)}
                            onMouseEnter={() => {
                              const tooltip = document.getElementById("country-tooltip");
                              if (tooltip) {
                                tooltip.style.display = "block";
                                if (emission !== null) {
                                  tooltip.innerHTML = `
                                    <div class="p-2">
                                      <strong class="text-sm">${name}</strong><br/>
                                      <span class="text-xs">CO₂: ${emission !== null ? emission.toLocaleString('en-US', { maximumFractionDigits: 1 }) : 'No data'}M tons</span>
                                      ${countryPopulation[code] ? `<br/><span class="text-xs">Population: ${countryPopulation[code]}</span>` : ''}
                                    </div>
                                  `;
                                } else {
                                  tooltip.innerHTML = `
                                    <div class="p-2">
                                      <strong class="text-sm">${name || "Unknown Country"}</strong><br/>
                                      <span class="text-xs">No emission data available</span>
                                    </div>
                                  `;
                                }
                              }
                            }}
                            onMouseLeave={() => {
                              const tooltip = document.getElementById("country-tooltip");
                              if (tooltip) {
                                tooltip.style.display = "none";
                              }
                            }}
                            onMouseMove={(event) => {
                              const tooltip = document.getElementById("country-tooltip");
                              if (tooltip) {
                                tooltip.style.left = `${event.clientX + 10}px`;
                                tooltip.style.top = `${event.clientY + 10}px`;
                              }
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>

                  {/* Project Markers */}
                  {offsetProjects.map((project) => (
                    <Marker
                      key={project.id}
                      coordinates={[project.lng, project.lat]}
                      onClick={() => handleProjectClick(project)}
                    >
                      <g>
                        <circle
                          r={6}
                          fill="#10B981"
                          stroke="#FFF"
                          strokeWidth={2}
                          style={{ cursor: "pointer" }}
                          onMouseEnter={(event) => {
                            const tooltip = document.getElementById("project-tooltip");
                            if (tooltip) {
                              tooltip.style.display = "block";
                              tooltip.innerHTML = `
                                <div class="p-2">
                                  <strong class="text-sm">${project.name}</strong><br/>
                                  <span class="text-xs"><em>${project.type}</em></span><br/>
                                  <span class="text-xs">${project.offsetAmount}</span>
                                </div>
                              `;
                            }
                          }}
                          onMouseLeave={() => {
                            const tooltip = document.getElementById("project-tooltip");
                            if (tooltip) {
                              tooltip.style.display = "none";
                            }
                          }}
                          onMouseMove={(event) => {
                            const tooltip = document.getElementById("project-tooltip");
                            if (tooltip) {
                              tooltip.style.left = `${event.clientX + 10}px`;
                              tooltip.style.top = `${event.clientY + 10}px`;
                            }
                          }}
                        />
                        {position.zoom > 2 && (
                          <text
                            textAnchor="middle"
                            y={15}
                            style={{
                              fontFamily: "system-ui",
                              fill: "#10B981",
                              fontSize: "10px",
                              fontWeight: "bold",
                              pointerEvents: "none",
                            }}
                          >
                            {project.countryCode}
                          </text>
                        )}
                      </g>
                    </Marker>
                  ))}
                </ZoomableGroup>
              </ComposableMap>
              
              {/* Tooltips */}
              <div
                id="country-tooltip"
                className="fixed hidden bg-black/90 text-white text-xs rounded-md pointer-events-none z-50 max-w-xs shadow-lg"
                style={{ display: "none" }}
              />
              <div
                id="project-tooltip"
                className="fixed hidden bg-green-600/95 text-white text-xs rounded-md pointer-events-none z-50 max-w-xs shadow-lg"
                style={{ display: "none" }}
              />
              
              {/* Zoom Instructions */}
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs p-2 rounded backdrop-blur-sm">
                Scroll to zoom • Drag to pan
              </div>
            </div>
          </div>

          {/* Info Panel */}
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
                      {selectedCountry.emission.toLocaleString()} million tons
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
                        parseFloat(
                          selectedCountry.population.replace(/[^\d.]/g, "")
                        )
                      ).toFixed(2)}{" "}
                      tons/person
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Click on other countries or project markers to view
                      different data
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
                      Click on other countries or project markers to view
                      different data
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-lg shadow-2xl p-6 text-white h-full flex flex-col justify-center">
                <div className="">
                  <div className="mb-6 text-center">
                    <h3 className="text-3xl font-bold mb-4">
                     Map Guide
                    </h3>
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
                        <h4 className="font-bold text-lg mb-1">
                          Explore Countries
                        </h4>
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
                        <h4 className="font-bold text-lg mb-1">
                          Discover Projects
                        </h4>
                        <p className="text-sm opacity-90">
                          Click on green markers to learn about carbon offset
                          projects
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-white/20 p-3 rounded-full">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">
                          Hover for Info
                        </h4>
                        <p className="text-sm opacity-90">
                          Hover over countries or project markers for quick
                          information
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/20">
                      <p className="text-sm opacity-80">
                        <span className="font-bold">Tip:</span> Use mouse wheel
                        to zoom and drag to pan around the map
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>
            Data visualization showing global CO₂ emissions and carbon offset initiatives. 
            Hover over countries for quick info, click for detailed statistics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarbonEmissionWorldMap;