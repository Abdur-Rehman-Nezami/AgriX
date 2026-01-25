// listPolygons.js
import fetch from "node-fetch";

const API_KEY = "efec3419d2876b1c541d32129809f08b"; // your API key

async function listPolygons() {
  try {
    const url = `https://api.agromonitoring.com/agro/1.0/polygons?appid=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      console.log("⚠️ No polygons found for this API key.");
      return;
    }

    console.log("✅ Polygons associated with your API key:");
    data.forEach((polygon, index) => {
      console.log(`${index + 1}. Name: ${polygon.name}`);
      console.log(`   ID: ${polygon.id}`);
      console.log(`   Area: ${polygon.area}`);
      console.log(`   Center: ${polygon.center}`);
      console.log("-------------------------------");
    });
  } catch (err) {
    console.error("❌ Error fetching polygons:", err);
  }
}

listPolygons();
