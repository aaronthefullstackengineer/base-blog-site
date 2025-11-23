// csvManager.js
import { fetchCSV } from '/JS/JS lib/Global/database-logic/csvParser.js';
import { Database } from '/JS/JS lib/Global/database-logic/databaseEngine.js';

export async function loadMultipleCSVs(urls) {
  const allData = [];

  for (const url of urls) {
    try {
      const data = await fetchCSV(url);
      allData.push(...data); // merge all rows
    } catch (err) {
      console.error(`Error fetching CSV at ${url}:`, err);
    }
  }

  return new Database(allData);
}
