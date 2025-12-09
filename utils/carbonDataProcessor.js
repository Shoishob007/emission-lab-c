
export const processCarbonData = (csvData) => {
  const processedData = {
    byCountryCode: {},
    byCountryName: {},
    latestYearData: {},
    countries: new Set()
  };
  
  // Skip the header row and process each line
  const lines = csvData.split('\n').slice(1);
  
  lines.forEach(line => {
    if (!line.trim()) return;
    
    const [entity, code, year, emission] = line.split(',');
    
    // Skip non-country entries and entities without codes
    if (!code || code.length !== 3 || entity.includes('(GCP)') || 
        entity === 'Asia' || entity === 'Africa' || entity === 'Antarctica') {
      return;
    }
    
    const yearNum = parseInt(year);
    const emissionNum = parseFloat(emission);
    
    // Store in latestYearData
    if (!processedData.latestYearData[code] || 
        yearNum > processedData.latestYearData[code].year) {
      processedData.latestYearData[code] = {
        code,
        name: entity,
        year: yearNum,
        emission: emissionNum,
        emissionInMillionTons: emissionNum / 1000000 // Convert to million tons
      };
    }
    
    // Store in byCountryCode
    if (!processedData.byCountryCode[code]) {
      processedData.byCountryCode[code] = [];
    }
    processedData.byCountryCode[code].push({
      year: yearNum,
      emission: emissionNum,
      emissionInMillionTons: emissionNum / 1000000
    });
    
    // Store in byCountryName
    processedData.byCountryName[entity] = {
      code,
      name: entity,
      latestYear: yearNum,
      latestEmission: emissionNum
    };
    
    processedData.countries.add(code);
  });
  
  // Sort each country's data by year
  Object.keys(processedData.byCountryCode).forEach(code => {
    processedData.byCountryCode[code].sort((a, b) => a.year - b.year);
  });
  
  return processedData;
};

export const getTopEmittingCountries = (latestYearData, count = 30) => {
  return Object.values(latestYearData)
    .sort((a, b) => b.emission - a.emission)
    .slice(0, count);
};