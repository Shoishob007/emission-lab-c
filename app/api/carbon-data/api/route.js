import { NextResponse } from "next/server";
import Papa from "papaparse";

export async function GET() {
  try {
    const csvUrl =
      "https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.csv";
    const res = await fetch(csvUrl);

    if (!res.ok) {
      throw new Error("Failed to fetch OWID CSV");
    }

    const csvText = await res.text();

    // parse CSV
    const { data } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    // group by ISO code => pick latest year per country
    const latestByCountry = {};

    data.forEach((row) => {
      const iso = row.iso_code;
      const year = parseInt(row.year, 10);
      const co2 = parseFloat(row.co2);

      if (!iso || isNaN(co2) || co2 <= 0) return;

      const existing = latestByCountry[iso];
      if (!existing || year > existing.year) {
        latestByCountry[iso] = {
          iso_code: iso,
          country: row.country,
          year,
          co2,
        };
      }
    });

    // convert to array
    const result = Object.values(latestByCountry);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { success: false, data: [], error: err.message },
      { status: 500 }
    );
  }
}
