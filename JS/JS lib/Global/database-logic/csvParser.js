// csvParser.js
export function parseCSV(csvString, delimiter = ',') {
  const lines = csvString.trim().split('\n');
  const headers = lines[0].split(delimiter).map(h => h.trim());
  const data = lines.slice(1).map(line => {
    const values = line.split(delimiter).map(v => v.trim());
    return headers.reduce((obj, header, idx) => {
      obj[header] = values[idx] || '';
      return obj;
    }, {});
  });
  return data;
}

export async function fetchCSV(url, delimiter = ',') {
  const response = await fetch(url);
  const text = await response.text();
  return parseCSV(text, delimiter);
}
