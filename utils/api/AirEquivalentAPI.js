export const fetchCarbonEmissionDetailsInAir = async (emissionData) => {
  try {
    const mapFlightClass = (classType) => {
      switch (classType) {
        case "economy":
          return "Economy";
        case "premium":
          return "Premium";
        case "business":
          return "Business";
        case "first":
          return "First";
        default:
          return "rapid_do_not_include_in_request_key";
      }
    };

    const flightDetails = {
      travel_from: emissionData?.result?.data?.airport_from || "",
      travel_to: emissionData?.result?.data?.airport_to || "",
      distance_km: emissionData?.result?.data?.distance_km || 0,
      round_trip: emissionData?.result?.data?.round_trip === "Y" ? true : false,
      number_of_passengers: parseInt(emissionData?.result?.data?.number_of_passengers) || 1,
      flight_class: mapFlightClass(emissionData?.result?.data?.flight_class?.toLowerCase() || "economy")
    };

    const carbonEmissions = {
      co2e_gm: emissionData?.result?.data?.emissions?.co2e_gm || 0,
      co2e_kg: emissionData?.result?.data?.emissions?.co2e_kg || 0,
      co2e_mt: emissionData?.result?.data?.emissions?.co2e_mt || 0,
      co2e_lb: emissionData?.result?.data?.emissions?.co2e_lb || 0
    };

    const requestBody = {
      flight_details: flightDetails,
      carbon_emissions: carbonEmissions
    };

    console.log('Sending payload:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/carbon/airAPI/carbon-emission-details/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching carbon emission details:', error);
    throw error;
  }
};