export async function fetchEquivalentValues(requestBody, emission_lab_key) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/business/airAPI/business-details-carbon-emission/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Emission-Lab-Key": `${emission_lab_key}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    // return the status code
    if (!response.ok) {
      console.error("Failed to fetch carbon emission details");
      return { errorCode: response.status };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching carbon emission details:", error);
    return { errorCode: 500 };
  }
}
