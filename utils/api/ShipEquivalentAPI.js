export const fetchCarbonEmissionDetailsInShip = async (emissionData) => {
  console.log("Emission Data :: ", emissionData);

  try {
    // Prepare freight details
    const freightDetails = {
      type: emissionData?.result?.data?.type || "estimate-freight",
      distance_value: emissionData?.result?.data?.distance_value || 0,
      transport_mode: emissionData?.result?.data?.transport_mode || "DeepSea",
      freight_weight: emissionData?.result?.data?.freight_weight || 0
    };

    // Prepare carbon emissions
    const carbonEmissions = {
      co2e_gm: emissionData?.result?.data?.co2e_gm || 0,
      co2e_kg: emissionData?.result?.data?.co2e_kg || 0,
      co2e_mt: emissionData?.result?.data?.co2e_mt || 0,
      co2e_lb: emissionData?.result?.data?.co2e_lb || 0
    };

    // Final request body
    const requestBody = {
      freight_details: freightDetails,
      carbon_emissions: carbonEmissions
    };

    console.log('Sending payload:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/carbon/freightAPI/carbon-emission-details/`,
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
    console.log("Result Data :: ", data)
    return data;

  } catch (error) {
    console.error('Error fetching carbon emission details:', error);
    throw error;
  }
};
