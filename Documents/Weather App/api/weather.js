export default async function handler(req, res) {
  const city = req.query.city;
  const apiKey = process.env.WEATHER_API_KEY; // stored safely on Vercel

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    const [weatherRes, forecastRes] = await Promise.all([
      fetch(weatherUrl),
      fetch(forecastUrl),
    ]);

    if (!weatherRes.ok || !forecastRes.ok) {
      throw new Error("City not found");
    }

    const weatherData = await weatherRes.json();
    const forecastData = await forecastRes.json();

    return res.status(200).json({ weatherData, forecastData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
