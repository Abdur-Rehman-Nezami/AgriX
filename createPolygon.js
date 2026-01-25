import fetch from "node-fetch";

const API_KEY = "efec3419d2876b1c541d32129809f08b";

// Example: small farm polygon
const polygonData = {
  name: "Test Farm",
  geo_json: {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [73.0479, 33.6844],
          [73.0579, 33.6844],
          [73.0579, 33.6944],
          [73.0479, 33.6944],
          [73.0479, 33.6844]
        ]
      ]
    }
  }
};

async function createPolygon() {
  try {
    const res = await fetch(
      `https://api.agromonitoring.com/agro/1.0/polygons?appid=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(polygonData),
      }
    );
    const data = await res.json();
    console.log("✅ Polygon created:", data);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

createPolygon();
