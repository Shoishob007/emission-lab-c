import { useCallback } from "react";
import { countryPopulation } from "../data";

// Cache for country data
const countryDataCache = {};

export const useCountryData = () => {
    const getCountryData = useCallback(async (countryName) => {
        if (!countryName) return null;

        if (countryDataCache[countryName]) {
            return countryDataCache[countryName];
        }

        try {
            const response = await fetch(
                `/api/country-info?name=${encodeURIComponent(countryName)}`
            );

            if (!response.ok) {
                console.warn(`Country data not found for: ${countryName}`);
                return null;
            }

            const data = await response.json();
            countryDataCache[countryName] = data;
            return data;
        } catch (error) {
            console.error(`Error fetching country data for ${countryName}:`, error);
            return null;
        }
    }, []);

    const getCountryPopulation = useCallback((countryCode) => {
        return countryPopulation[countryCode] || "N/A";
    }, []);

    const getPopulationAsNumber = useCallback((countryCode) => {
        const populationStr = countryPopulation[countryCode];
        if (!populationStr || populationStr === "N/A") return null;

        const match = populationStr.match(/([\d,.]+)M/);
        if (match) {
            return parseFloat(match[1].replace(/,/g, ""));
        }
        return null;
    }, []);

    return {
        getCountryData,
        getCountryPopulation,
        getPopulationAsNumber,
    };
};