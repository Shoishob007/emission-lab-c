export const fetchCarbonEmissionDetailsInHotel = async (emissionData) => {
  try {
    const ALLOWED_COUNTRIES = [
      "AR", "AT", "AU", "BE", "BR", "CA", "CH", "CL", "CN", "CO",
      "CR", "CZ", "DE", "DO", "EG", "ES", "FI", "FJ", "FR", "GB",
      "GR", "HK", "HU", "ID", "IE", "IN", "IT", "JO", "JP", "KR",
      "KZ", "MA", "MO", "MV", "MX", "MY", "NL", "NZ", "OM", "PA",
      "PE", "PH", "PL", "PR", "PT", "QA", "RO", "RU", "SA", "SG",
      "AE", "TH", "TW", "US", "UY", "VN", "ZA",
    ];

    // Get country code and validate
    const countryCode = getCountryCode(emissionData?.result?.data?.country);
    const isValidCountry = ALLOWED_COUNTRIES.includes(countryCode);

    const hotelDetails = {
      country_code: isValidCountry ? countryCode : "",
      city_name: emissionData?.result?.data?.city_name || "",
      hotel_rating: emissionData?.result?.data?.hotel_rating || null,
      number_of_nights: emissionData?.result?.data?.number_of_nights || "",
      number_of_rooms: emissionData?.result?.data?.number_of_rooms || "",
      cluster_name: null
    };

    const carbonEmissions = {
      co2e_gm: emissionData?.result?.data?.co2e_gm || 0,
      co2e_kg: emissionData?.result?.data?.co2e_kg || 0,
      co2e_mt: emissionData?.result?.data?.co2e_mt || 0,
      co2e_lb: emissionData?.result?.data?.co2e_lb || 0
    };

    const requestBody = {
      hotel_details: hotelDetails,
      carbon_emissions: carbonEmissions
    };

    console.log('Sending payload:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/carbon/hotelAPI/carbon-emission-details/`, {
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

// Helper function to convert country name to country code
const getCountryCode = (countryName) => {
  if (!countryName) return "";
  
  const countryMap = {
    'argentina': 'AR',
    'austria': 'AT',
    'australia': 'AU',
    'belgium': 'BE',
    'brazil': 'BR',
    'canada': 'CA',
    'switzerland': 'CH',
    'chile': 'CL',
    'china': 'CN',
    'colombia': 'CO',
    'costa rica': 'CR',
    'czech republic': 'CZ',
    'czechia': 'CZ',
    'germany': 'DE',
    'dominican republic': 'DO',
    'egypt': 'EG',
    'spain': 'ES',
    'finland': 'FI',
    'fiji': 'FJ',
    'france': 'FR',
    'united kingdom': 'GB',
    'great britain': 'GB',
    'uk': 'GB',
    'greece': 'GR',
    'hong kong': 'HK',
    'hungary': 'HU',
    'indonesia': 'ID',
    'ireland': 'IE',
    'india': 'IN',
    'italy': 'IT',
    'jordan': 'JO',
    'japan': 'JP',
    'south korea': 'KR',
    'korea': 'KR',
    'kazakhstan': 'KZ',
    'morocco': 'MA',
    'macao': 'MO',
    'maldives': 'MV',
    'mexico': 'MX',
    'malaysia': 'MY',
    'netherlands': 'NL',
    'new zealand': 'NZ',
    'oman': 'OM',
    'panama': 'PA',
    'peru': 'PE',
    'philippines': 'PH',
    'poland': 'PL',
    'puerto rico': 'PR',
    'portugal': 'PT',
    'qatar': 'QA',
    'romania': 'RO',
    'russia': 'RU',
    'russian federation': 'RU',
    'saudi arabia': 'SA',
    'singapore': 'SG',
    'united arab emirates': 'AE',
    'uae': 'AE',
    'thailand': 'TH',
    'taiwan': 'TW',
    'united states': 'US',
    'usa': 'US',
    'america': 'US',
    'uruguay': 'UY',
    'vietnam': 'VN',
    'south africa': 'ZA'
  };
  
  const normalizedCountryName = countryName.toLowerCase().trim();
  return countryMap[normalizedCountryName] || "";
};