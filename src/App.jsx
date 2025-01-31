import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Mainweather from "./components/Mainweather.jsx";
import axios from "axios";
import TodayHighlights from "./components/TodayHIghlights.jsx";
import FiveDayForecast from "./components/fiveday.jsx";
import { apikey } from "./components/constant.js";


const App = () => {
  const [city, setCity] = useState("London");
  const [weatherData, setWeatherData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);
  // const fetchWeatherData = () => {
  //   const API_KEY = "ee086fcc2ab2d953eb6fce9ae0ec612c";
  //   fetch(
  //     `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setWeatherData(data);
  //       console.log(JSON.stringify(data));
  //     });
  // };
  console.log(`${apikey}`)

  const fetchAirQualityData = (lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apikey}`
      )
      .then((res) => {
        setAirQualityData(res.data.list[0]);
      })
      .catch((error) =>
        console.error("Error fetching the air quality data:", error)
      );
  };
  const fetchWeatherData = (city) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
      )
      .then((response) => {
        setWeatherData(response.data);
        console.log(JSON.stringify(response.data));
        fetchAirQualityData(response.data.coord.lat, response.data.coord.lon);
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apikey}`
          )
          .then((response) => {
            setFiveDayForecast(response.data);
          })
          .catch((error) =>
            console.error("Error fetching the 5-day forecast data:", error)
          );
      })
      .catch((error) =>
        console.error("Error fetching the weather data:", error)
      );
  };

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  const handleCurrentLocation = (lat, lon) => {
    fetchWeatherDataByCoordinates(lat, lon);
  };

  const fetchWeatherDataByCoordinates = (lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`
      )
      .then((response) => {
        setWeatherData(response.data);
        console.log(JSON.stringify(response.data));
        fetchAirQualityData(lat, lon);
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`
          )
          .then((response) => {
            setFiveDayForecast(response.data);
          })
          .catch((error) =>
            console.error("Error fetching the 5-day forecast data:", error)
          );
      })
      .catch((error) =>
        console.error("Error fetching the weather data:", error)
      );
  };

  return (
    <div>
      <Navbar
        handleSearch={handleSearch}
        handleCurrentLocation={handleCurrentLocation}
      />
      {weatherData && airQualityData && (
        <div style={{ display: "flex", padding: "20px", gap: "10px" }}>
          <div style={{ flex: "1", marginRight: "10px" }}>
            <Mainweather weatherData={weatherData} />
            <p
              style={{
                fontWeight: "Bold",
                fontSize: "20px",
                marginTop: "30px",
              }}
            >
              Forecast
            </p>
            {fiveDayForecast && (
              <FiveDayForecast forecastData={fiveDayForecast} />
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "0.5",
              gap: "20px",
            }}
          >
            <TodayHighlights
              weatherData={weatherData}
              airQualityData={airQualityData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
