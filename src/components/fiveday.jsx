import React from "react";

const FiveDayForecast = ({ forecastData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  console.log(forecastData);

  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const fiveDaysFromNow = new Date(
    tomorrow.getTime() + 4 * 24 * 60 * 60 * 1000
  );

  // Create a map to store only one forecast per unique day
  const uniqueForecast = new Map();

  forecastData.list.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000);

    // Format date to "YYYY-MM-DD" to compare days
    const dateKey = date.toISOString().split("T")[0];

    if (date >= tomorrow && date <= fiveDaysFromNow) {
      // Store the first occurrence of each day
      if (!uniqueForecast.has(dateKey)) {
        uniqueForecast.set(dateKey, {
          date: date.toLocaleDateString(),
          temperature: forecast.main.temp,
          weatherDescription: forecast.weather[0].description,
        });
      }
    }
  });

  // Convert Map values to an array
  const weatherForecast = Array.from(uniqueForecast.values());

  return (
    <div
      style={{
        backgroundColor: "#0073E6",
        color: "white",
        borderRadius: "0.5rem",
        width: "360px",
        paddingLeft: "15px",
        paddingRight: "15px",
        paddingTop: "15px",
        paddingBottom: "5px",
      }}
    >
      {weatherForecast.map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: "25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              {Math.round(item.temperature)}°c
            </div>
          </div>
          <div>
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              {formatDate(item.date)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "15px" }}>{item.weatherDescription}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FiveDayForecast;
