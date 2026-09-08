import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log(
  "NEWS API KEY DURUMU:",
  process.env.NEWS_API_KEY ? "VAR" : "YOK"
);

app.get("/api/news", async (req, res) => {
  try {
    const category = req.query.category || "general";
    const country = req.query.country || "us";

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("NEWS API HATASI:", data);
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("HABER HATASI:", error);

    res.status(500).json({
      error: "Haberler alınamadı",
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`News backend çalışıyor: ${PORT}`);
});