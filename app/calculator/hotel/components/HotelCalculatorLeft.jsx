/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { ComboBox } from "../../../../components/ui/calculator-combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, Moon, Star, Bed } from "lucide-react";
import countryList from "react-select-country-list";
import { Country, State, City } from "country-state-city";

const HotelCalculatorLeft = ({
  setCalculated,
  hotelDetails,
  setHotelDetails,
  setEmissionData,
}) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState({ country: false, city: false });
  const [error, setError] = useState({ country: null, city: null, general: null });
  const [calculating, setCalculating] = useState(false);

  // countries list on component mount
  useEffect(() => {
    const countriesData = countryList().getData();
    const formattedCountries = countriesData.map((country) => ({
      value: country.value,
      label: `${country.label} (${country.value})`,
    }));
    setCountries(formattedCountries);
    setFilteredCountries(formattedCountries);
  }, []);

  // cities when country changes
  useEffect(() => {
    if (hotelDetails.country_code) {
      loadCitiesForCountry(hotelDetails.country_code);
    }
  }, [hotelDetails.country_code]);

  // cities for a specific country
  const loadCitiesForCountry = useCallback((countryCode) => {
    setLoading((prev) => ({ ...prev, city: true }));
    setError((prev) => ({ ...prev, city: null }));

    try {
      const citiesList = City.getCitiesOfCountry(countryCode);

      if (citiesList && citiesList.length > 0) {
        const formattedCities = citiesList.map((city) => ({
          value: city.name,
          label: city.name,
        }));

        setCities(formattedCities);
        setFilteredCities(formattedCities);
      } else {
        setCities([]);
        setFilteredCities([]);
        setError((prev) => ({
          ...prev,
          city: `No cities found for country code: ${countryCode}. Please type the city name manually.`,
        }));
      }
    } catch (error) {
      console.error("Error loading cities:", error);
      setError((prev) => ({
        ...prev,
        city: error.message || "Failed to load cities",
      }));
      setCities([]);
      setFilteredCities([]);
    } finally {
      setLoading((prev) => ({ ...prev, city: false }));
    }
  }, []);

  // Filtering countries based on search
  const filterCountries = useCallback(
    debounce((keyword) => {
      setLoading((prev) => ({ ...prev, country: true }));

      try {
        if (!keyword || keyword.trim() === "") {
          setFilteredCountries(countries);
        } else {
          const filtered = countries.filter((country) =>
            country.label.toLowerCase().includes(keyword.toLowerCase())
          );
          setFilteredCountries(filtered);
        }
      } catch (error) {
        console.error("Error filtering countries:", error);
        setError((prev) => ({ ...prev, country: error.message }));
      } finally {
        setLoading((prev) => ({ ...prev, country: false }));
      }
    }, 300),
    [countries]
  );

  // Filtering cities based on search
  const filterCities = useCallback(
    debounce((keyword) => {
      setLoading((prev) => ({ ...prev, city: true }));

      try {
        if (!keyword || keyword.trim() === "") {
          setFilteredCities(cities);
        } else {
          const filtered = cities.filter((city) =>
            city.label.toLowerCase().includes(keyword.toLowerCase())
          );
          setFilteredCities(filtered);
        }
      } catch (error) {
        console.error("Error filtering cities:", error);
        setError((prev) => ({ ...prev, city: error.message }));
      } finally {
        setLoading((prev) => ({ ...prev, city: false }));
      }
    }, 300),
    [cities]
  );

  const handleCalculate = async () => {
    try {
      setCalculating(true);

      const requestData = {
        country_code: hotelDetails.country_code,
        city_name: hotelDetails.city_name,
        hotel_rating: hotelDetails.hotel_rating,
        number_of_nights: hotelDetails.number_of_nights,
        number_of_rooms: hotelDetails.number_of_rooms,
        cluster_name: hotelDetails.cluster_name || null,
      };

      console.log("requestData :: ", requestData);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/hotelAPI/hotel-stay-carbon-estimate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data response :::: ", data);
      setEmissionData(data);
      setCalculated(true);
    } catch (error) {
      console.error("Error calculating emissions:", error);
      setError(prev => ({ ...prev, general: error.message }));
    } finally {
      setCalculating(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 min-w-[450px]">
        <ComboBox
          options={filteredCountries}
          value={hotelDetails.country_code}
          label="Country"
          placeholder="Select country..."
          searchPlaceholder="Search country..."
          emptyText={
            loading.country
              ? "Loading countries..."
              : error.country
              ? `Error: ${error.country}`
              : "No country found."
          }
          onSelect={(value) => {
            setHotelDetails((prev) => ({
              ...prev,
              country_code: value,
              city_name: "",
            }));
          }}
          onSearch={filterCountries}
        />

        <ComboBox
          options={filteredCities}
          value={hotelDetails.city_name}
          label="City"
          placeholder="Select city..."
          searchPlaceholder="Search city..."
          emptyText={
            loading.city
              ? "Loading cities..."
              : error.city
              ? `${error.city}`
              : !hotelDetails.country_code
              ? "Please select a country first"
              : "No city found."
          }
          onSelect={(value) =>
            setHotelDetails((prev) => ({ ...prev, city_name: value }))
          }
          onSearch={filterCities}
          disabled={!hotelDetails.country_code}
          allowCustomValue={true}
          onCustomValueChange={(value) =>
            setHotelDetails((prev) => ({ ...prev, city_name: value }))
          }
        />
      </div>

      {/* Hotel Rating */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-muted-foreground">
          Hotel Rating
        </label>
        <Select
          value={hotelDetails.hotel_rating}
          onValueChange={(value) =>
            setHotelDetails((prev) => ({ ...prev, hotel_rating: value }))
          }
        >
          <SelectTrigger className="w-full focus:ring-0 focus:ring-offset-0">
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select hotel rating..." />
            </div>
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((rating) => (
              <SelectItem key={rating} value={rating.toString()}>
                {rating} Star{rating !== 1 ? "s" : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Number of Nights and Rooms */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-muted-foreground">
            Number of Nights
          </label>
          <div className="flex items-center w-full rounded-md border border-input h-10 bg-background px-4 py-2 text-sm">
            <Moon className="h-4 w-4 mr-4" />
            <input
              type="number"
              className="bg-transparent w-full focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={hotelDetails.number_of_nights}
              min="1"
              onChange={(e) =>
                setHotelDetails((prev) => ({
                  ...prev,
                  number_of_nights: Math.max(1, Number(e.target.value)),
                }))
              }
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-muted-foreground">
            Number of Rooms
          </label>
          <div className="flex items-center w-full rounded-md border border-input h-10 bg-background px-4 py-2 text-sm">
            <Bed className="h-4 w-4 mr-4" />
            <input
              type="number"
              className="bg-transparent w-full focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={hotelDetails.number_of_rooms}
              min="1"
              onChange={(e) =>
                setHotelDetails((prev) => ({
                  ...prev,
                  number_of_rooms: Math.max(1, Number(e.target.value)),
                }))
              }
            />
          </div>
        </div>
      </div>

      {/* Error message */}
      {error.general && <div className="text-sm text-red-500">{error.general}</div>}

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="w-full bg-primary text-primary-foreground py-3 rounded-md flex items-center justify-center text-sm font-medium mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {calculating ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Calculating...
          </span>
        ) : (
          <>
            <Calculator className="h-4 w-4 mr-2" />
            Calculate
          </>
        )}
      </button>
    </>
  );
};

export default HotelCalculatorLeft;