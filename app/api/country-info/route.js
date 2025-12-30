export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const countryName = searchParams.get('name');
  
  if (!countryName) {
    return Response.json({ error: 'Country name is required' }, { status: 400 });
  }
  
  try {
    // Fetch country data from REST Countries API
    const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`);
    
    if (!response.ok) {
      return Response.json({ error: 'Country not found' }, { status: 404 });
    }
    
    const data = await response.json();
    const country = data[0];
    
    const result = {
      name: country.name.common,
      officialName: country.name.official,
      cca3: country.cca3,
      capital: country.capital?.[0] || 'N/A',
      capitalCoords: country.capitalInfo?.latlng || country.latlng,
      population: country.population,
      area: country.area,
      region: country.region,
      subregion: country.subregion,
      currencies: Object.values(country.currencies || {}).map(c => c.name).join(', '),
      languages: Object.values(country.languages || {}).join(', '),
      flag: country.flags.png,
      maps: country.maps
    };
    
    return Response.json(result);
    
  } catch (error) {
    console.error('Error fetching country data:', error);
    return Response.json({ error: 'Failed to fetch country data' }, { status: 500 });
  }
}