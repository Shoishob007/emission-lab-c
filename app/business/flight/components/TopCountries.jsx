import { Card } from "@/components/ui/card";
import ReactCountryFlag from "react-country-flag";

const countries = [
  { name: "India", code: "IN", airport: "Indira Gandhi International Airport (DEL)" },
  { name: "Singapore", code: "SG", airport: "Changi Airport (SIN)" },
  { name: "Thailand", code: "TH", airport: "Suvarnabhumi Airport (BKK)" },
  { name: "Malaysia", code: "MY", airport: "Kuala Lumpur International Airport (KUL)" },
  { name: "Canada", code: "CA", airport: "Toronto Pearson International Airport (YYZ)" },
  { name: "Australia", code: "AU", airport: "Sydney Airport (SYD)" },
  { name: "United Kingdom", code: "GB", airport: "London Heathrow Airport (LHR)" },
  { name: "United Arab Emirates", code: "AE", airport: "Dubai International Airport (DXB)" },
];

export function TopCountries({ onSelect }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {countries.map((country) => (
        <Card 
          key={country.code}
          className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 text-center"
          onClick={() => onSelect(country.airport)}
        >
          <div className="flex justify-center mb-3">
            <ReactCountryFlag
              countryCode={country.code}
              svg
              style={{
                width: '4.5em',
                height: '3em',
                border: '1px solid #000000',
              }}
              title={country.code}
              className="object-cover"
            />
          </div>
          <div className="font-medium text-base">{country.name}</div>
          <div className="text-sm text-gray-500 mt-1">{country.airport.split('(')[1].replace(')', '')}</div>
        </Card>
      ))}
    </div>
  );
}