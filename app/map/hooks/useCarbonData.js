/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from "react";

export const useCarbonData = () => {
  const [carbonData, setCarbonData] = useState(null);
  const [stats, setStats] = useState({
    totalEmissions: 0,
    countryCount: 0,
    maxEmission: 0,
    latestYear: 0,
    topEmitters: [],
  });
  const [selectedYear, setSelectedYear] = useState("latest");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const availableYears = [
    "latest",
    ...Array.from({ length: 2024 - 1960 + 1 }, (_, i) => 2024 - i),
  ];

  const fetchCarbonData = useCallback(async (year = selectedYear) => {
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
      
      // Return the year to indicate data was fetched
      return year;
    } catch (error) {
      setError("Failed to load CO₂ emissions data");
      setIsLoading(false);
      throw error;
    }
  }, [selectedYear]);

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
        const year = item.year;
        const emission = Number(item.co2);

        if (!iso || emission == null || isNaN(emission) || emission < 0) return;

        processedData[iso] = {
          name,
          latestEmission: emission,
          latestYear: year,
          data: [
            {
              year,
              emission,
              emissionInMillionTons: emission,
            },
          ],
        };

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
    selectedYear,
    setSelectedYear,
    isLoading,
    error,
    fetchCarbonData,
    availableYears,
  };
};