import { NextResponse } from "next/server";
import Papa from "papaparse";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const yearParam = searchParams.get("year");
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

    const resultByCountry = {};

    data.forEach((row) => {
      const iso = row.iso_code;
      const year = parseInt(row.year, 10);
      const co2 = parseFloat(row.co2);

      if (!iso || isNaN(co2) || co2 <= 0) return;

      // 👉 If year selected, only include that year
      if (selectedYear && year !== selectedYear) return;

      // 👉 If no year selected, keep latest
      const existing = resultByCountry[iso];
      if (
        !existing ||
        (!selectedYear && year > existing.year)
      ) {
        resultByCountry[iso] = {
          iso_code: iso,
          country: row.country,
          year,
          co2,
        };
      }
    });

    return NextResponse.json({
      success: true,
      year: selectedYear,
      data: Object.values(resultByCountry),
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, data: [], error: err.message },
      { status: 500 }
    );
  }
}
