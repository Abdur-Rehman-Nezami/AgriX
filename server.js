import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "efec3419d2876b1c541d32129809f08b";

// Endpoint to get NDVI data
app.get("/api/ndvi", async (req, res) => {
  try {
    const polygonId = req.query.polygonId;
    const start = Math.floor(Date.now() / 1000) - 10 * 24 * 60 * 60;
    const end = Math.floor(Date.now() / 1000);

    const url = `https://api.agromonitoring.com/agro/1.0/image/search?start=${start}&end=${end}&polyid=${polygonId}&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
