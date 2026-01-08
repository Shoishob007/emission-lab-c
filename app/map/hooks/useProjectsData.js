import { useState, useEffect, useCallback } from "react";
import useOffsetStore from "@/stores/offsetStore";
import { useCountryData } from "./useCountryData";
import { getCoordsFromLocation } from "../utils/geocode";

export const useProjectsData = () => {
  const [projectsWithCoords, setProjectsWithCoords] = useState([]);
  const [isGeocoding, setIsGeocoding] = useState(false);

  const { projects, loading: projectsLoading } = useOffsetStore();
  const { getCountryData } = useCountryData();

  // extracting country from location string
  const extractCountryName = useCallback((location) => {
    if (!location) return null;
    const parts = location.split(",").map((part) => part.trim());
    let countryName = parts[parts.length - 1];

    const countryMap = {
      USA: "United States",
      US: "United States",
      "U.S.A.": "United States",
      "U.K.": "United Kingdom",
      UK: "United Kingdom",
      "U.A.E.": "United Arab Emirates",
      UAE: "United Arab Emirates",
      TX: "United States",
      PER: "Peru",
      TUR: "Turkey",
      COL: "Colombia",
    };

    if (countryMap[countryName]) {
      return countryMap[countryName];
    }

    return countryName;
  }, []);

  useEffect(() => {
    const processProjects = async () => {
      if (!projects || projects.length === 0 || projectsLoading) return;

      setIsGeocoding(true);

      try {
        const processedProjects = [];

        for (const project of projects) {
          if (!project.location) continue;

          const countryName = extractCountryName(project.location);

          // country-level info
          const countryData = await getCountryData(countryName);

          // Geocode the project location for accurate map positioning
          const coords = await getCoordsFromLocation(project.location);

          if (coords && coords.length === 2) {
            processedProjects.push({
              id: project.id,
              name: project.name,
              description: project.description,
              type: project.project_type,
              standard: project.standard,
              vintage: project.vintage,
              location: project.location,
              offsetAmount: `${project.available_amount || 0} tons available`,
              price: `$${project.price_per_ton || 0} per ton`,
              image: project.image_url,
              validationReport: project.validation_report_url,
              monitoringReport: project.monitoring_report_url,
              infoLink: project.info_link,
              projectIdDisplay: project.project_id_display,
              lat: coords[0],
              lng: coords[1],
              countryCode: countryData?.cca3 || "",
              countryName: countryData?.name || countryName,
              capital: countryData?.capital || "",
              originalData: project,
            });
          } else if (countryData?.capitalCoords) {
            // fallback to country capital if geocoding fails
            processedProjects.push({
              ...project,
              lat: countryData.capitalCoords[0],
              lng: countryData.capitalCoords[1],
              countryCode: countryData.cca3,
              countryName: countryData.name,
              capital: countryData.capital,
            });
          }
        }

        setProjectsWithCoords(processedProjects);
      } catch (error) {
        console.error("Error processing projects:", error);
      } finally {
        setIsGeocoding(false);
      }
    };

    processProjects();
  }, [projects, projectsLoading, extractCountryName, getCountryData]);

  return {
    projectsWithCoords,
    isGeocoding,
    projectsLoading,
    extractCountryName,
  };
};
