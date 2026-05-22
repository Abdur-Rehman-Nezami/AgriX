// testAgro.js
import fetch from "node-fetch";

const API_KEY = "efec3419d2876b1c541d32129809f08b"; // your agromonitoring.com key

// 🔹 Replace this polygon ID with one from your AgroMonitoring dashboard
const POLYGON_ID = "6909d3e3c2d63ec00138d353";

// 🛰️ Function to get NDVI (satellite vegetation index) data
async function getNDVI() {
  const start = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60; // last 30 days
  const end = Math.floor(Date.now() / 1000);

  const url = `https://api.agromonitoring.com/agro/1.0/image/search?start=${start}&end=${end}&polyid=${POLYGON_ID}&appid=${API_KEY}`;

  console.log("🔍 Fetching NDVI data from:");
  console.log(url);

  const response = await fetch(url);
  const data = await response.json();

  console.log("\n🛰️ Received NDVI Data:");
  console.log(JSON.stringify(data, null, 2));
}

getNDVI().catch((err) => console.error("❌ Error:", err));
