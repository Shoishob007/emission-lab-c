/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from "react";
import { debounce } from "lodash";
import { ComboBox } from "../../../../components/ui/calculator-combobox";
import { Calculator, Users, Moon, Star, Bed } from "lucide-react";
import qs from "qs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HotelCalculatorLeft = ({
  setCalculated,
  hotelDetails,
  setHotelDetails,
  setEmissionData,
}) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState({ country: false, city: false });
  const [error, setError] = useState({ country: null, city: null });
  const [calculating, setCalculating] = useState(false);

  const fetchCountries = async (keyword = "") => {
    setLoading((prev) => ({ ...prev, country: true }));
    setError((prev) => ({ ...prev, country: null }));
    try {
      const query = qs.stringify({ keyword });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/countries`
      );
      console.log("Response country : ", response)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const formattedData = data.result.map((country) => ({
        value: country.iso2Code,
        label: `${country.name} (${country.iso2Code})`,
      }));
      setCountries(formattedData);
    } catch (error) {
      setError((prev) => ({ ...prev, country: error.message }));
      console.log("error :: ", error);
    } finally {
      setLoading((prev) => ({ ...prev, country: false }));
    }
  };

  const fetchCities = async (countryCode, keyword = "") => {
    if (!countryCode) return;
    
    setLoading((prev) => ({ ...prev, city: true }));
    setError((prev) => ({ ...prev, city: null }));
    try {
      const query = qs.stringify({ country_code: countryCode, keyword });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/cities`
      );
      console.log("Response city : ", response)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const formattedData = data.result.map((city) => ({
        value: city.name,
        label: city.name,
      }));
      setCities(formattedData);
    } catch (error) {
      setError((prev) => ({ ...prev, city: error.message }));
      console.log("error :: ", error);
    } finally {
      setLoading((prev) => ({ ...prev, city: false }));
    }
  };

  const debouncedCountries = useCallback(
    debounce((keyword) => {
      fetchCountries(keyword);
    }, 300),
    []
  );

  const debouncedCities = useCallback(
    debounce((keyword) => {
      fetchCities(hotelDetails.country_code, keyword);
    }, 300),
    [hotelDetails.country_code]
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
      };

      console.log("requestData :: ", requestData);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/hotelAPI/carbon-emission`,
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
      setError(error.message);
    } finally {
      setCalculating(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 min-w-[400px]">
        {/* Country Combo Box */}
        <ComboBox
          options={countries}
          value={hotelDetails.country_code}
          label="Country"
          placeholder="Select country..."
          searchPlaceholder="Search country..."
          emptyText={
            loading.country
              ? "Loading..."
              : error.country
              ? "Error loading countries"
              : "No country found."
          }
          onSelect={(value) => {
            setHotelDetails((prev) => ({ ...prev, country_code: value }));
            setCities([]); // Clear cities when country changes
          }}
          onSearch={(keyword) => debouncedCountries(keyword)}
        />

        {/* City Combo Box */}
        <ComboBox
          options={cities}
          value={hotelDetails.city_name}
          label="City"
          placeholder="Select city..."
          searchPlaceholder="Search city..."
          emptyText={
            loading.city
              ? "Loading..."
              : error.city
              ? "Error loading cities"
              : !hotelDetails.country_code
              ? "Please select a country first"
              : "No city found."
          }
          onSelect={(value) =>
            setHotelDetails((prev) => ({ ...prev, city_name: value }))
          }
          onSearch={(keyword) => debouncedCities(keyword)}
          disabled={!hotelDetails.country_code}
        />
      </div>

      {/* Hotel Rating */}
      <div>
        <label className="block text-sm font-medium mb-2 text-muted-foreground">
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
                {rating} Star{rating !== 1 ? 's' : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Number of Nights and Rooms */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Number of Nights */}
        <div>
          <label className="block text-sm font-medium mb-2 text-muted-foreground">
            Number of Nights
          </label>
          <div className="flex items-center w-full rounded-md border border-input h-10 bg-background px-4 py-2 text-sm">
            <Moon className="h-4 w-4 mr-4" />
            <input
              type="number"
              className="mx-4 w-12 text-center bg-transparent"
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

        {/* Number of Rooms */}
        <div>
          <label className="block text-sm font-medium mb-2 text-muted-foreground">
            Number of Rooms
          </label>
          <div className="flex items-center w-full rounded-md border border-input h-10 bg-background px-4 py-2 text-sm">
            <Bed className="h-4 w-4 mr-4" />
            <input
              type="number"
              className="mx-4 w-12 text-center bg-transparent"
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