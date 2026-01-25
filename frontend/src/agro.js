import fetch from "node-fetch";

// Your AgroMonitoring API key
const API_KEY = "efec3419d2876b1c541d32129809f08b";

// 1️⃣ Create a polygon (your farm area)
async function createPolygon() {
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

  const res = await fetch(
    `https://api.agromonitoring.com/agro/1.0/polygons?appid=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(polygonData),
    }
  );
  const data = await res.json();
  console.log("Polygon Created:", data);
  return data.id; // store polygon_id
}

// 2️⃣ Get NDVI imagery for the polygon
async function getNDVI(polygonId) {
  const start = Math.floor(Date.now() / 1000) - 10 * 24 * 60 * 60; // last 10 days
  const end = Math.floor(Date.now() / 1000);

  const url = `https://api.agromonitoring.com/agro/1.0/image/search?start=${start}&end=${end}&polyid=${polygonId}&appid=${API_KEY}`;
  const res = await fetch(url);
  const images = await res.json();

  console.log("Available NDVI Images:", images);
}

(async () => {
  const polygonId = await createPolygon();
  await getNDVI(polygonId);
})();
