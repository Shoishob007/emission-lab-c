export const fetchCarbonEmissionDetailsInTransport = async (emissionData, userId) => {
  // console.log("Emission Data :: ", emissionData);

  try {
    const typeData = emissionData?.typeResult?.result?.data || {};
    const modelData = emissionData?.modelResult?.result?.data || {};

    const vehicleData = modelData;

    // transport details
    const transportDetails = {
      user_id: userId,
      vehicle_make: vehicleData.vehicle_make,
      vehicle_model: vehicleData.vehicle_model,
      distance_value: String(typeData.distance_value || modelData.distance_value || 0),
      distance_unit: typeData.distance_unit || modelData.distance_unit || "km"
    };

    const carbonEmissions = {
      co2e_gm: Number(typeData.co2e_gm || modelData.co2e_gm || 0),
      co2e_kg: Number(typeData.co2e_kg || modelData.co2e_kg || 0),
      co2e_mt: Number(typeData.co2e_mt || modelData.co2e_mt || 0),
      co2e_lb: Number(typeData.co2e_lb || modelData.co2e_lb || 0)
    };

    const requestBody = {
      transport_details: transportDetails,
      carbon_emissions: carbonEmissions
    };

    console.log('Sending payload:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/carbon/transportAPI/carbon-emission-details/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log("Result Data :: ", data);
    return data;

  } catch (error) {
    console.error('Error fetching carbon emission details:', error);
    throw error;
  }
};