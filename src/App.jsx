import React, { useState } from "react";
import "./style.css";

const App = () => {
  const [city, setCity] = useState(""); 
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);

  const apikey = "2e4b113fa8768e7c9973483fd0e37261";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const checkWeather = async (cityName) => {
    try {
      const response = await fetch(`${apiUrl}${cityName}&appid=${apikey}`);
      if (!response.ok) {
        setError(true);
        setWeatherData(null);
        return;
      }
      const data = await response.json();
      setWeatherData(data);
      setError(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError(true);
    }
  };

  const handleSearch = () => {
    if (city.trim() === "") {
      return;
    }
    checkWeather(city);
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clouds":
        return "/image/clouds.png";
      case "Clear":
        return "/image/clear.png";
      case "Rain":
        return "/image/rain.png";
      case "Drizzle":
        return "/image/drizzle.png";
      case "Mist":
        return "/image/mist.png";
      default:
        return "/image/rain.png";
    }
  };

  return (
    <div className="card">
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          spellCheck="false"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>
          <img src="/image/search.png" alt="Search" />
        </button>
      </div>

      {error && (
        <div className="error">
          <p>Invalid city name</p>
        </div>
      )}

      {weatherData && (
        <div className="weather">
          <img
            src={getWeatherIcon(weatherData.weather[0].main)}
            className="weather-icon"
            alt="Weather"
          />
          <h1 className="temp">{Math.round(weatherData.main.temp)}°C</h1>
          <h2 className="city">{weatherData.name}</h2>
          <div className="details">
            <div className="col">
              <img src="/image/humidity.png" alt="Humidity" />
              <div>
                <p className="humidity">{weatherData.main.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="/image/wind.png" alt="Wind Speed" />
              <div>
                <p className="Wind">{weatherData.wind.speed} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
