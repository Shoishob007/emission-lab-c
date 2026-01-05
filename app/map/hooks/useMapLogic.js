/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { fixedNameToISO, countryNameToCode } from "../../data";

export const useMapLogic = (carbonData, stats, onCountrySelect, getCountryPopulation, getPopulationAsNumber) => {
    const combinedMapping = { ...countryNameToCode, ...fixedNameToISO };

    const extractCountryCode = useCallback((geo) => {
        const props = geo.properties || {};
        let isoA3 = props.iso_a3 || props.ISO_A3 || props.isoA3;
        const name =
            props.name || props.NAME || props.ADMIN || props.name_long || "";

        if (isoA3 === "-99" || !isoA3 || isoA3.length !== 3) {
            isoA3 = combinedMapping[name] || null;
        }

        return {
            code: isoA3,
            name: name,
        };
    }, [combinedMapping]);

    const getEmissionForCountry = useCallback((countryCode) => {
        if (!carbonData || !carbonData[countryCode]) return null;
        return carbonData[countryCode].latestEmission;
    }, [carbonData]);

    const getColorForEmission = useCallback((emission) => {
        if (emission == null) return "#e5e7eb";

        const percentile = (emission / stats.maxEmission) * 100;

        if (percentile < 0.1) return "#fef3c7";
        if (percentile < 1) return "#fbbf24";
        if (percentile < 10) return "#f59e0b";
        if (percentile < 30) return "#dc2626";
        return "#991b1b";
    }, [stats.maxEmission]);

    const calculatePerCapitaEmission = useCallback((emission, populationNum) => {
        if (!emission || !populationNum || populationNum <= 0) return null;

        // Convert emission from million tons to tons (since population is in millions)
        const emissionInTons = emission * 1000000;
        const populationInMillions = populationNum;

        // Calculate per capita in tons per person
        const perCapita = emissionInTons / (populationInMillions * 1000000);
        return perCapita.toFixed(2);
    }, []);

    const handleRegionClick = useCallback((geo) => {
        const { code, name } = extractCountryCode(geo);

        if (code && carbonData && carbonData[code]) {
            const countryData = carbonData[code];
            const emission = countryData.latestEmission;
            const emissionData = countryData.data;

            // Get population from dummy data
            const population = getCountryPopulation(code);
            const populationNum = getPopulationAsNumber(code);

            // Calculate per capita if population data exists
            const perCapita = calculatePerCapitaEmission(emission, populationNum);

            // Calculate historical metrics
            const historicalMetrics = calculateHistoricalMetrics(emissionData);

            // Calculate relative to world average
            const worldAverage = stats.totalEmissions / stats.countryCount;
            const relativeToWorld =
                worldAverage > 0 ? ((emission / worldAverage) * 100).toFixed(0) : null;

            // Calculate percentile
            const percentile =
                stats.maxEmission > 0
                    ? ((emission / stats.maxEmission) * 100).toFixed(1)
                    : null;

            const aboveWorldAverage = worldAverage > 0 && emission > worldAverage;

            const selectedCountryData = {
                code: code,
                name: name,
                emission: emission,
                year: countryData.latestYear,
                population: population,
                data: countryData.data,
                perCapita: perCapita,
                trend: getTrendForCountry(countryData),
                peakEmission: historicalMetrics.peakEmission,
                peakYear: historicalMetrics.peakYear,
                historicalChange: historicalMetrics.historicalChange,
                relativeToWorld: relativeToWorld,
                percentile: percentile,
                aboveWorldAverage: aboveWorldAverage,
                recentGrowthRate: historicalMetrics.recentGrowthRate,
                emissionAcceleration: historicalMetrics.emissionAcceleration,
                rankInWorld: getCountryRank(code, stats.topEmitters),
                vsTopEmitter:
                    stats.topEmitters.length > 0
                        ? ((emission / stats.topEmitters[0].emission) * 100).toFixed(1)
                        : null,
            };

            onCountrySelect(selectedCountryData);
        }
    }, [carbonData, stats, extractCountryCode, getCountryPopulation, getPopulationAsNumber, calculatePerCapitaEmission, onCountrySelect]);

    return {
        combinedMapping,
        extractCountryCode,
        getEmissionForCountry,
        getColorForEmission,
        handleRegionClick,
        calculatePerCapitaEmission,
    };
};

// Helper functions remain the same...
const getTrendForCountry = (countryData) => {
    if (!countryData || countryData.data.length < 2)
        return { status: "No data", change: 0 };

    const recentYears = countryData.data.slice(-10);
    if (recentYears.length < 2)
        return { status: "Insufficient data", change: 0 };

    const first = recentYears[0].emission;
    const last = recentYears[recentYears.length - 1].emission;
    const change = ((last - first) / first) * 100;

    if (Math.abs(change) < 5) return { status: "Stable", change };
    return change > 0
        ? { status: "Increasing", change }
        : { status: "Decreasing", change: Math.abs(change) };
};

const calculateHistoricalMetrics = (data) => {
    if (!data || data.length === 0)
        return {
            peakEmission: null,
            peakYear: null,
            historicalChange: null,
            recentGrowthRate: null,
            emissionAcceleration: null,
        };

    const sortedData = [...data].sort((a, b) => a.year - b.year);

    let peakEmission = sortedData[0].emission;
    let peakYear = sortedData[0].year;
    sortedData.forEach((item) => {
        if (item.emission > peakEmission) {
            peakEmission = item.emission;
            peakYear = item.year;
        }
    });

    const firstEmission = sortedData[0].emission;
    const latestEmission = sortedData[sortedData.length - 1].emission;
    const historicalChange =
        firstEmission > 0
            ? (((latestEmission - firstEmission) / firstEmission) * 100).toFixed(1)
            : null;

    let recentGrowthRate = null;
    if (sortedData.length >= 5) {
        const last5 = sortedData.slice(-5);
        const first5 = last5[0].emission;
        const last5Latest = last5[last5.length - 1].emission;
        if (first5 > 0) {
            recentGrowthRate = (((last5Latest - first5) / first5) * 100).toFixed(1);
        }
    }

    let emissionAcceleration = null;
    if (sortedData.length >= 10) {
        const firstHalf = sortedData.slice(0, 5);
        const secondHalf = sortedData.slice(-5);

        const firstHalfGrowth =
            firstHalf[firstHalf.length - 1].emission / firstHalf[0].emission;
        const secondHalfGrowth =
            secondHalf[secondHalf.length - 1].emission / secondHalf[0].emission;

        emissionAcceleration = (
            ((secondHalfGrowth - firstHalfGrowth) / firstHalfGrowth) *
            100
        ).toFixed(1);
    }

    return {
        peakEmission,
        peakYear,
        historicalChange,
        recentGrowthRate,
        emissionAcceleration,
    };
};

const getCountryRank = (countryCode, topEmitters) => {
    if (!topEmitters || topEmitters.length === 0) return null;

    const sortedEmissions = topEmitters.sort(
        (a, b) => b.emission - a.emission
    );

    const rank = sortedEmissions.findIndex((item) => item.code === countryCode);
    return rank !== -1 ? rank + 1 : null;
};