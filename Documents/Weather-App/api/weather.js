export default async function handler(req, res) {
  try {
    const city = req.query.city || "Delhi";
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
      console.error("❌ Missing WEATHER_API_KEY environment variable");
      return res.status(500).json({ error: "Missing API key" });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log("🌍 Fetching:", url);

    const response = await fetch(url);
    if (!response.ok) {
      const text = await response.text();
      console.error("❌ API fetch failed:", text);
      return res.status(500).json({ error: "Weather API request failed" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("🔥 Server error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
