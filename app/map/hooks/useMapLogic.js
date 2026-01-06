/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { fixedNameToISO, countryNameToCode } from "../../data";

export const useMapLogic = (carbonData, stats, onCountrySelect) => {
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

    const formatPopulation = useCallback((populationStr) => {
        if (!populationStr || populationStr === "N/A") return "N/A";

        const population = parseFloat(populationStr);
        if (isNaN(population)) return "N/A";

        if (population >= 1000) {
            return `${(population / 1000).toFixed(2)}B`;
        } else {
            return `${population.toFixed(2)}M`;
        }
    }, []);

    const calculatePerCapitaEmission = useCallback((emission, populationNum) => {
        if (!emission || !populationNum || populationNum <= 0) return null;

        // Convert emission from million tons to tons
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
            const rawData = countryData.rawData || {};

            // Helper function to parse string to number
            const parseNumber = (value) => {
                if (!value || value === '') return null;
                const num = parseFloat(value);
                return isNaN(num) ? null : num;
            };

            const emission = countryData.latestEmission;
            const emissionData = countryData.data;

            // Parse all numeric values
            const population = parseNumber(rawData.population);
            const formattedPopulation = population ?
                `${(population / 1000000).toFixed(2)}M` : "N/A";

            const perCapita = parseNumber(rawData.co2_per_capita) ||
                calculatePerCapitaEmission(emission, population ? population / 1000000 : null);

            const gdp = rawData.gdp ?
                `$${(parseNumber(rawData.gdp) / 1000000000).toFixed(2)}B` : null;
            const co2PerGdp = parseNumber(rawData.co2_per_gdp);

            const growthAbs = parseNumber(rawData.co2_growth_abs);
            const growthPrct = parseNumber(rawData.co2_growth_prct);

            const cumulativeCo2 = parseNumber(rawData.cumulative_co2);
            const shareGlobalCo2 = parseNumber(rawData.share_global_co2);
            const energyPerCapita = parseNumber(rawData.energy_per_capita);
            const primaryEnergyConsumption = parseNumber(rawData.primary_energy_consumption);

            const coalCo2 = parseNumber(rawData.coal_co2);
            const oilCo2 = parseNumber(rawData.oil_co2);
            const gasCo2 = parseNumber(rawData.gas_co2);
            const cementCo2 = parseNumber(rawData.cement_co2);
            const flaringCo2 = parseNumber(rawData.flaring_co2);

            const methane = parseNumber(rawData.methane);
            const nitrousOxide = parseNumber(rawData.nitrous_oxide);
            const totalGHG = parseNumber(rawData.total_ghg);
            const totalGHGExcludingLUC = parseNumber(rawData.total_ghg_excluding_lucf);

            const historicalMetrics = calculateHistoricalMetrics(emissionData);

            const worldAverage = stats.totalEmissions / stats.countryCount;
            const relativeToWorld = worldAverage > 0 ?
                ((emission / worldAverage) * 100).toFixed(0) : null;

            const percentile = stats.maxEmission > 0 ?
                ((emission / stats.maxEmission) * 100).toFixed(1) : null;

            const aboveWorldAverage = worldAverage > 0 && emission > worldAverage;

            const totalEmissionSources = (coalCo2 || 0) + (oilCo2 || 0) +
                (gasCo2 || 0) + (cementCo2 || 0) + (flaringCo2 || 0);

            const selectedCountryData = {
                code: code,
                name: name,
                emission: emission,
                year: countryData.latestYear,
                population: formattedPopulation,
                populationNum: population ? population / 1000000 : null,
                data: countryData.data,
                perCapita: perCapita,
                gdp: gdp,
                co2PerGdp: co2PerGdp,
                growthAbs: growthAbs,
                growthPrct: growthPrct,
                cumulativeCo2: cumulativeCo2,
                shareGlobalCo2: shareGlobalCo2,
                energyPerCapita: energyPerCapita,
                primaryEnergyConsumption: primaryEnergyConsumption,
                coalCo2: coalCo2,
                oilCo2: oilCo2,
                gasCo2: gasCo2,
                cementCo2: cementCo2,
                flaringCo2: flaringCo2,
                methane: methane,
                nitrousOxide: nitrousOxide,
                totalGHG: totalGHG,
                totalGHGExcludingLUC: totalGHGExcludingLUC,
                coalShare: totalEmissionSources > 0 && coalCo2 ?
                    ((coalCo2 / totalEmissionSources) * 100).toFixed(0) : null,
                oilShare: totalEmissionSources > 0 && oilCo2 ?
                    ((oilCo2 / totalEmissionSources) * 100).toFixed(0) : null,
                gasShare: totalEmissionSources > 0 && gasCo2 ?
                    ((gasCo2 / totalEmissionSources) * 100).toFixed(0) : null,
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
                vsTopEmitter: stats.topEmitters.length > 0 ?
                    ((emission / stats.topEmitters[0].emission) * 100).toFixed(1) : null,
            };

            onCountrySelect(selectedCountryData);
        }
    }, [carbonData, stats, extractCountryCode, calculatePerCapitaEmission, onCountrySelect]);

    return {
        combinedMapping,
        extractCountryCode,
        getEmissionForCountry,
        getColorForEmission,
        handleRegionClick,
        calculatePerCapitaEmission,
    };
};

// Helper functions
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