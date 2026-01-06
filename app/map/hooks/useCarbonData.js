/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from "react";

const regions = {
  "Asia (excluding India and China)": ["AFG", "ARM", "AZE", "BHR", "BGD", "BTN", "BRN", "KHM", "CYP", "GEO", "IDN", "IRN", "IRQ", "ISR", "JPN", "JOR", "KAZ", "KWT", "KGZ", "LAO", "LBN", "MYS", "MDV", "MNG", "MMR", "NPL", "PRK", "OMN", "PAK", "PSE", "PHL", "QAT", "SAU", "SGP", "KOR", "LKA", "SYR", "TWN", "TJK", "THA", "TLS", "TUR", "TKM", "ARE", "UZB", "VNM", "YEM"],
  "Europe (excluding EU)": ["ALB", "AND", "BLR", "BIH", "FRO", "GIB", "ISL", "IMN", "XKX", "LIE", "MDA", "MCO", "MNE", "MKD", "NOR", "RUS", "SMR", "SRB", "SJM", "CHE", "UKR", "GBR"],
  "European Union": ["AUT", "BEL", "BGR", "HRV", "CYP", "CZE", "DNK", "EST", "FIN", "FRA", "DEU", "GRC", "HUN", "IRL", "ITA", "LVA", "LTU", "LUX", "MLT", "NLD", "POL", "PRT", "ROU", "SVK", "SVN", "ESP", "SWE"],
  "Oceania": ["ASM", "AUS", "FJI", "PYF", "GUM", "KIR", "MHL", "FSM", "NRU", "NCL", "NZL", "NIU", "MNP", "PLW", "PNG", "WSM", "SLB", "TKL", "TON", "TUV", "VUT", "WLF"],
  "North America": ["USA", "CAN", "MEX"],
  "South America": ["ARG", "BOL", "BRA", "CHL", "COL", "ECU", "GUY", "PRY", "PER", "SUR", "URY", "VEN"],
  "India": ["IND"],
  "China": ["CHN"]
};


const getRegion = (isoCode) => {
  for (const region in regions) {
    if (regions[region].includes(isoCode)) {
      return region;
    }
  }
  return null;
};

export const useCarbonData = () => {
  const [carbonData, setCarbonData] = useState(null);
  const [stats, setStats] = useState({
    totalEmissions: 0,
    countryCount: 0,
    maxEmission: 0,
    latestYear: 0,
    topEmitters: [],
  });
  const [regionalData, setRegionalData] = useState(null);
  const [selectedYear, setSelectedYear] = useState("latest");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const availableYears = [
    "latest",
    ...Array.from({ length: 2024 - 1960 + 1 }, (_, i) => 2024 - i),
  ];

  const fetchCarbonData = useCallback(async (year = "latest") => {
    try {
      setIsLoading(true);
      setError(null);

      const query = year && year !== "latest" ? `?year=${year}` : "";
      const res = await fetch(`/api/carbon-data/api${query}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed fetching data");

      const json = await res.json();
      processCarbonData(json.data || []);
    } catch (error) {
      setError("Failed to load CO₂ emissions data");
      setIsLoading(false);
    }
  }, []);

  const fetchHistoricalData = useCallback(async () => {
    try {
      const res = await fetch(`/api/carbon-data/api?historical=true`);
      if (!res.ok) throw new Error("Failed fetching historical data");
      const json = await res.json();
      processHistoricalData(json.data || []);
    } catch (error) {
      console.error("Failed to load historical CO₂ emissions data for line chart", error);
    }
  }, []);


  const processHistoricalData = useCallback((apiData) => {
    const yearlyData = {};

    apiData.forEach(item => {
      const year = parseInt(item.year, 10);
      const iso = item.iso_code;
      const co2 = parseFloat(item.co2);
      const region = getRegion(iso);

      if (isNaN(year) || !iso || isNaN(co2) || co2 < 0) return;

      if (!yearlyData[year]) {
        yearlyData[year] = {
          year,
          "Asia (excluding India and China)": 0,
          "Europe (excluding EU)": 0,
          "European Union": 0,
          "Oceania": 0,
          "North America": 0,
          "South America": 0,
          "India": 0,
          "China": 0,
        };
      }
      if (region) {
        yearlyData[year][region] += co2;
      }
    });

    setRegionalData(Object.values(yearlyData));
  }, []);

  const processCarbonData = useCallback((apiData) => {
    try {
      const processedData = {};
      let globalTotal = 0;
      let max = 0;
      let countriesProcessed = 0;
      let latestYear = 0;
      const topEmitters = [];

      apiData.forEach((item) => {
        const iso = item.iso_code;
        const name = item.country;
        const year = parseInt(item.year, 10);
        const emission = parseFloat(item.co2);

        if (!iso || emission == null || isNaN(emission) || emission < 0) return;

        // Process all numeric fields from the API
        const processedItem = {
          name,
          latestEmission: emission,
          latestYear: year,
          rawData: { // Store ALL the data from API
            // Basic info
            country: item.country,
            year: item.year,
            iso_code: item.iso_code,
            co2: item.co2,

            // Population and GDP
            population: item.population,
            gdp: item.gdp,

            // Per capita metrics
            co2_per_capita: item.co2_per_capita,
            co2_per_gdp: item.co2_per_gdp,
            energy_per_capita: item.energy_per_capita,

            // Growth metrics
            co2_growth_abs: item.co2_growth_abs,
            co2_growth_prct: item.co2_growth_prct,

            // Cumulative data
            cumulative_co2: item.cumulative_co2,
            cumulative_cement_co2: item.cumulative_cement_co2,
            cumulative_coal_co2: item.cumulative_coal_co2,
            cumulative_gas_co2: item.cumulative_gas_co2,
            cumulative_oil_co2: item.cumulative_oil_co2,
            cumulative_flaring_co2: item.cumulative_flaring_co2,

            // Global shares
            share_global_co2: item.share_global_co2,

            // Energy data
            primary_energy_consumption: item.primary_energy_consumption,

            // Emission sources
            coal_co2: item.coal_co2,
            oil_co2: item.oil_co2,
            gas_co2: item.gas_co2,
            cement_co2: item.cement_co2,
            flaring_co2: item.flaring_co2,

            // Greenhouse gases
            methane: item.methane,
            nitrous_oxide: item.nitrous_oxide,
            total_ghg: item.total_ghg,
            total_ghg_excluding_lucf: item.total_ghg_excluding_lucf,

            // Other metrics (if needed)
            co2_including_luc: item.co2_including_luc,
            land_use_change_co2: item.land_use_change_co2,
          },
          data: [
            {
              year: year,
              emission: emission,
              emissionInMillionTons: emission,
            },
          ],
        };

        processedData[iso] = processedItem;

        globalTotal += emission;
        if (emission > max) max = emission;
        if (year > latestYear) latestYear = year;

        topEmitters.push({
          code: iso,
          name,
          emission,
          year,
        });

        countriesProcessed++;
      });

      const sortedTopEmitters = topEmitters
        .sort((a, b) => b.emission - a.emission)
        .slice(0, 10);

      setCarbonData(processedData);
      setStats({
        totalEmissions: globalTotal,
        countryCount: countriesProcessed,
        maxEmission: max,
        latestYear,
        topEmitters: sortedTopEmitters,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error processing climate data:", error);
      setError("Error processing climate data. Some features may be limited.");
      setIsLoading(false);
    }
  }, []);

  return {
    carbonData,
    stats,
    regionalData,
    selectedYear,
    setSelectedYear,
    isLoading,
    error,
    fetchCarbonData,
    fetchHistoricalData,
    availableYears,
  };
};
