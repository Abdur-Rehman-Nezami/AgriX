// fetchNDVI.js
import fetch from "node-fetch";

const API_KEY = "efec3419d2876b1c541d32129809f08b"; // your API key
const POLYGON_ID = "PASTE_VALID_POLYGON_ID_HERE"; // replace with polygon ID from listPolygons.js

async function fetchNDVI() {
  try {
    const start = Math.floor(Date.now() / 1000 - 86400 * 30); // last 30 days
    const end = Math.floor(Date.now() / 1000);

    const url = `https://api.agromonitoring.com/agro/1.0/image/search?start=${start}&end=${end}&polyid=${POLYGON_ID}&appid=${API_KEY}`;

    console.log("🔍 Fetching NDVI data for polygon:", POLYGON_ID);
    console.log("URL:", url);

    const res = await fetch(url);
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      console.log("⚠️ No NDVI data available for this polygon yet.");
      return;
    }

    console.log("\n🛰️ NDVI & Truecolor images:");
    data.forEach((item, index) => {
      console.log(`\nDay ${index + 1} (timestamp: ${item.dt}):`);
      console.log(`NDVI: ${item.data.ndvi}`);
      console.log(`Truecolor: ${item.data.truecolor}`);
    });
  } catch (err) {
    console.error("❌ Error fetching NDVI data:", err);
  }
}

fetchNDVI();
