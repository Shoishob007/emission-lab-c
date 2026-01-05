import { NextResponse } from "next/server";
import Papa from "papaparse";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const yearParam = searchParams.get("year");
    const historical = searchParams.get("historical");
    const selectedYear = yearParam ? parseInt(yearParam, 10) : null;

    const csvUrl =
      "https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.csv";
    const res = await fetch(csvUrl);

    if (!res.ok) {
      throw new Error("Failed to fetch OWID CSV");
    }

    const csvText = await res.text();

    const { data } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    if (historical) {
      const allData = data.filter(row => {
        const year = parseInt(row.year, 10);
        return year >= 1960;
      });
      return NextResponse.json({
        success: true,
        data: allData,
      });
    }

    const resultByCountry = {};
    const latestYearData = {};

    data.forEach((row) => {
      const iso = row.iso_code;
      const year = parseInt(row.year, 10);
      const co2 = parseFloat(row.co2);

      if (!iso || isNaN(co2) || co2 <= 0) return;

      if (selectedYear) {
        if (year === selectedYear) {
          resultByCountry[iso] = {
            iso_code: iso,
            country: row.country,
            year,
            co2,
          };
        }
      } else {
        const existing = latestYearData[iso];
        if (!existing || year > existing.year) {
          latestYearData[iso] = {
            iso_code: iso,
            country: row.country,
            year,
            co2,
          };
        }
      }
    });
    
    const responseData = selectedYear ? Object.values(resultByCountry) : Object.values(latestYearData);

    return NextResponse.json({
      success: true,
      year: selectedYear,
      data: responseData,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, data: [], error: err.message },
      { status: 500 }
    );
  }
}
