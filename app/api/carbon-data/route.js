// app/api/carbon-data/route.js
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read the CSV file
    const filePath = path.join(process.cwd(), 'app/map', 'annual-co2-emissions-per-country.csv');
    const csvData = fs.readFileSync(filePath, 'utf8');
    
    return new Response(csvData, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
      },
    });
  } catch (error) {
    console.error('Error reading CSV file:', error);
    return new Response(JSON.stringify({ error: 'Failed to load data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}