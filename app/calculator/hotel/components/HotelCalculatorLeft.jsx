/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { ComboBox } from "../../../../components/ui/calculator-combobox";
import { Calculator, Moon, Bed } from "lucide-react";
import { countries } from "countries-list";
// import { City } from "country-state-city";
// import cityData from './allowed-countries-cities.json';

const HotelCalculatorLeft = ({
  setCalculated,
  hotelDetails,
  setHotelDetails,
  setEmissionData,
  setCalculating,
  calculating,
}) => {
  const [countryOptions, setCountryOptions] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState({ country: false, city: false });
  const [error, setError] = useState({
    country: null,
    city: null,
    general: null,
  });
  const ALLOWED_COUNTRIES = [
    "AR",
    "AT",
    "AU",
    "BE",
    "BR",
    "CA",
    "CH",
    "CL",
    "CN",
    "CO",
    "CR",
    "CZ",
    "DE",
    "DO",
    "EG",
    "ES",
    "FI",
    "FJ",
    "FR",
    "GB",
    "GR",
    "HK",
    "HU",
    "ID",
    "IE",
    "IN",
    "IT",
    "JO",
    "JP",
    "KR",
    "KZ",
    "MA",
    "MO",
    "MV",
    "MX",
    "MY",
    "NL",
    "NZ",
    "OM",
    "PA",
    "PE",
    "PH",
    "PL",
    "PR",
    "PT",
    "QA",
    "RO",
    "RU",
    "SA",
    "SG",
    "AE",
    "TH",
    "TW",
    "US",
    "UY",
    "VN",
    "ZA",
  ];

  // countries list on mount
  useEffect(() => {
    const formattedCountries = Object.entries(countries)
      .filter(([code]) => ALLOWED_COUNTRIES.includes(code))
      .map(([code, country]) => ({
        value: code,
        label: `${country.name} (${code})`,
      }));

    setCountryOptions(formattedCountries);
    setFilteredCountries(formattedCountries);
  }, []);

  // cities when country changes
  useEffect(() => {
    if (hotelDetails.country_code) {
      loadCitiesForCountry(hotelDetails.country_code);
    }
  }, [hotelDetails.country_code]);

  // cities for a specific country
  const loadCitiesForCountry = useCallback(async (countryCode) => {
    setLoading((prev) => ({ ...prev, city: true }));
    setError((prev) => ({ ...prev, city: null }));

    try {
      const response = await fetch(
        `https://secure.geonames.org/searchJSON?country=${countryCode}&featureClass=P&maxRows=1000&username=shoishob554`
      );

      if (!response.ok) throw new Error("Failed to fetch cities");

      const data = await response.json();
      const citiesList = data.geonames.map((city) => city.name);

      setCities(citiesList.map((city) => ({ value: city, label: city })));
      setFilteredCities(
        citiesList.map((city) => ({ value: city, label: city }))
      );

      if (citiesList.length === 0) {
        setError({ city: "No cities found. Type manually." });
      }
    } catch (error) {
      setError({ city: "Error loading cities. Type manually." });
    } finally {
      setLoading((prev) => ({ ...prev, city: false }));
    }
  }, []);

  // filtering countries based on search
  const filterCountries = useCallback(
    debounce((keyword) => {
      setLoading((prev) => ({ ...prev, country: true }));

      try {
        if (!keyword || keyword.trim() === "") {
          setFilteredCountries(countryOptions);
        } else {
          const filtered = countryOptions.filter((country) =>
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
    [countryOptions]
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
        `${process.env.NEXT_PUBLIC_API}/api/carbon/hotelAPI/hotel-stay-carbon-estimate/`,
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
      setError((prev) => ({ ...prev, general: error.message }));
    } finally {
      setCalculating(false);
    }
  };

  const isFormValid =
    hotelDetails.country_code &&
    hotelDetails.city_name &&
    hotelDetails.number_of_nights > 0 &&
    hotelDetails.number_of_rooms > 0;

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
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {[1, 2, 3, 4, 5].map((rating) => (
            <label key={rating} className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary cursor-pointer rounded-full border checked:border-primary checked:after:content-[''] checked:after:block checked:after:w-2 checked:after:h-2 checked:after:rounded-full checked:after:bg-primary checked:after:m-1"
                checked={hotelDetails.hotel_rating === rating.toString()}
                onChange={() =>
                  setHotelDetails((prev) => ({
                    ...prev,
                    hotel_rating: rating.toString(),
                  }))
                }
                value={rating.toString()}
              />
              <span className="px-4 py-2 flex items-center text-sm font-medium">
                {rating} Star{rating !== 1 ? "s" : ""}
              </span>
            </label>
          ))}
        </div>
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
              onChange={(e) => {
                const value = e.target.value;
                // Allow empty string or numbers ≥ 1
                if (value === "" || Number(value) >= 1) {
                  setHotelDetails((prev) => ({
                    ...prev,
                    number_of_nights: value === "" ? "" : Number(value),
                  }));
                }
                // Ignore 0 or negative numbers
              }}
              onBlur={(e) => {
                if (e.target.value === "" || Number(e.target.value) < 1) {
                  setHotelDetails((prev) => ({
                    ...prev,
                    number_of_nights: 1,
                  }));
                }
              }}
            />
          </div>
        </div>

        {/* Number of Rooms (Updated) */}
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
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || Number(value) >= 1) {
                  setHotelDetails((prev) => ({
                    ...prev,
                    number_of_rooms: value === "" ? "" : Number(value),
                  }));
                }
                // Ignore 0 or negative numbers
              }}
              onBlur={(e) => {
                if (e.target.value === "" || Number(e.target.value) < 1) {
                  setHotelDetails((prev) => ({
                    ...prev,
                    number_of_rooms: 1,
                  }));
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Error message */}
      {error.general && (
        <div className="text-sm text-red-500">{error.general}</div>
      )}

      {/* Calculating */}
      <button
        onClick={handleCalculate}
        disabled={!isFormValid || calculating}
        className={`w-full bg-primary text-primary-foreground py-3 rounded-md flex items-center justify-center text-sm font-medium mt-6 ${
          !isFormValid || calculating ? "opacity-80 cursor-not-allowed" : ""
        }`}
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