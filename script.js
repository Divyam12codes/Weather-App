// Make sure to replace with your own API key from OpenWeatherMap
const API_KEY = "a97efc810e648ba19fd4083a3a9e573f";

document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector("input[name='searchbar']");
    const actor = document.querySelector(".actor");
    const cards = document.querySelectorAll(".card");
    const forecastDays = document.querySelectorAll(".forecast");

    async function fetchWeather(city) {
        try {
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

            const [weatherRes, forecastRes] = await Promise.all([
                fetch(weatherUrl),
                fetch(forecastUrl)
            ]);

            if (!weatherRes.ok || !forecastRes.ok) throw new Error("City not found");

            const weatherData = await weatherRes.json();
            const forecastData = await forecastRes.json();

            // Main Section
            actor.children[0].textContent = weatherData.name;
            actor.children[1].textContent = `Chance of rain: ${weatherData.clouds.all} %`;
            actor.children[2].textContent = `${weatherData.main.temp} °C`;

            // Main image
            const iconCode = weatherData.weather[0].icon;
            document.querySelector(".main img").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            // Real Feel / Wind / Rain
            document.getElementById("val1").textContent = `${weatherData.main.feels_like} °C`;
            document.getElementById("val2").textContent = `${weatherData.wind.speed} m/s`;
            document.getElementById("val3").textContent = `${weatherData.clouds.all} %`;

            // Hourly Cards (Next 7)
            for (let i = 0; i < 7; i++) {
                const item = forecastData.list[i];
                const time = new Date(item.dt_txt).getHours();
                const temp = item.main.temp;
                const icon = item.weather[0].icon;

                cards[i].children[0].textContent = `${time}:00`;
                cards[i].children[1].src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                cards[i].children[2].textContent = `${temp}°C`;
            }

            // 5-day Forecast
            const daily = forecastData.list.filter((_, i) => i % 8 === 0);
            forecastDays.forEach((el, i) => {
                const dayData = daily[i];
                const date = new Date(dayData.dt_txt);
                const dayName = date.toLocaleString("en-US", { weekday: "short" });
                const high = dayData.main.temp_max;
                const low = dayData.main.temp_min;
                const icon = dayData.weather[0].icon;
                const condition = dayData.weather[0].main;

                el.querySelector(".day").textContent = dayName;
                el.querySelector("img").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                el.querySelector(".condition").textContent = condition;
                el.querySelector(".high").textContent = Math.round(high);
                el.querySelector(".low").textContent = `/${Math.round(low)}`;
            });

        } catch (err) {
            alert("Weather fetch error: " + err.message);
            console.error(err);
        }
    }

    input.addEventListener("keypress", async (e) => {
        if (e.key === "Enter") {
            const city = input.value.trim();
            if (!city) return;
            fetchWeather(city);
        }
    });

    // ✅ Call the function once with "Delhi" on page load
    fetchWeather("Delhi");
});
