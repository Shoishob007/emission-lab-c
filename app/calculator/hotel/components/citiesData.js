// Comprehensive city data for commonly used countries
export const citiesData = {
    'IN': [
      'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
      'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat',
      'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
      'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara',
      'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad',
      'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar', 'Varanasi'
    ],
    'BD': [
      'Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet',
      'Comilla', 'Gazipur', 'Barisal', 'Rangpur', 'Mymensingh',
      'Narayanganj', 'Cox\'s Bazar', 'Jessore', 'Bogra', 'Dinajpur',
      'Tangail', 'Jamalpur', 'Pabna', 'Nawabganj', 'Kushtia'
    ],
    'US': [
      'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
      'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
      'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'San Francisco',
      'Charlotte', 'Indianapolis', 'Seattle', 'Denver', 'Boston'
    ],
    'GB': [
      'London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool',
      'Bristol', 'Edinburgh', 'Leeds', 'Sheffield', 'Newcastle',
      'Nottingham', 'Cardiff', 'Belfast', 'Leicester', 'Aberdeen',
      'Cambridge', 'Oxford', 'Plymouth', 'Southampton', 'Portsmouth'
    ],
    'CA': [
      'Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton',
      'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Halifax',
      'Victoria', 'London', 'Kitchener', 'St. Catharines', 'Regina',
      'Saskatoon', 'Kelowna', 'Kingston', 'Windsor', 'Sherbrooke'
    ]
  };
  
  export const getCitiesForCountry = (countryCode) => {
    return citiesData[countryCode] || [];
  };