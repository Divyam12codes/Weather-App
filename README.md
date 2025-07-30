🌦️ Weather App
A simple and responsive Weather App that allows users to:

Search for real-time weather data of any city

View temperature, real feel, humidity, wind speed, and rain/cloud %

See hourly forecast and a 5-day weather forecast

Get Delhi weather by default on page load

🚀 Features:

Fetches real-time weather and 5-day forecast using the OpenWeatherMap API 

Displays:

City name

Temperature & weather icon

Real feel temperature

Wind speed & rain/cloud %

7-hour forecast with icons

5-day forecast with high/low temperatures

Option to search manually by entering the city name

Responsive design using HTML, CSS, and JavaScript

📁 Project Structure:

weather-app/
├── index.html
├── script.js
├── styles.css        
└── README.md

🧪 How to Use:
Clone or download this repository

Replace API_KEY in script.js with your own OpenWeatherMap API key:

js
Copy
Edit
const API_KEY = "your_api_key_here";
Open index.html in any browser.

📝 This project runs entirely on the client side — no backend or server setup needed.

🛠️ Tech Stack:

HTML5

CSS3

Vanilla JavaScript

OpenWeatherMap API

📌 Known Issues:

The sun icon may appear dark in "clear" weather due to OpenWeatherMap's default icons.

Forecast data is in 3-hour intervals — only selected time slots are shown.

✅ Future Improvements:

Add geolocation support to fetch weather for the user's current location

Dark/light mode toggle

City autocomplete suggestions

Theming and icon enhancements
