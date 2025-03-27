import fetch from "node-fetch";
import cors from "cors";
import express from "express";
import cron from "node-cron";
const app = express();
const port = 5100;

app.use(cors());
app.use(express.json());

// ✅ Sample API Route
app.get("/api/getData", (req, res) => {
  res.json({ message: "Hello from Vinayak Construction API!" });
});

// ✅ Cron Job - Calls API Every Minute
cron.schedule("*/1 * * * *", async () => {
  console.log("⏰ Running Cron Job: Fetching Projects...");

  try {
    const response = await fetch("https://vinayakconstructions.netlify.app/api/getProjects");
    const data = await response.json();
    console.log("✅ API Response:", data);
  } catch (error) {
    console.error("❌ Error calling API:", error);
  }
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

