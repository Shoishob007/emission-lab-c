export async function fetchEquivalentValues() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/carbon/airAPI/carbon-emission-details/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flight_details: {
            travel_from: "Dublin Airport (DUB)",
            travel_to: "John F Kennedy International Airport (JFK)",
            distance_km: 5102.78,
            round_trip: true,
            number_of_passengers: 1,
            flight_class: "Average",
          },
          carbon_emissions: {
            co2e_gm: 3250619,
            co2e_kg: 3250.62,
            co2e_mt: 3.25,
            co2e_lb: 7166.32,
          },
        }),
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch carbon emission details");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching carbon emission details:", error);
    return null;
  }
}
