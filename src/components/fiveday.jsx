import React from "react";

const FiveDayForecast = ({ forecastData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
    }).format(date);
  };
// dateString is a string representation of a date.
//It is used to convert raw date formats into a readable "DD Mon" format.
// The function ensures consistent and localized date formatting for display.

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


// {
//   dt: 1738486800, // UNIX timestamp
//   dt_txt: "2025-02-02 09:00:00", // Readable date and time
//   main: {
//     temp: 0.7,
//     feels_like: -1.95,
//     temp_min: 0.7,
//     temp_max: 2.85,
//     pressure: 1022
//   },
//   weather: [{ description: "clear sky" }],
//   wind: { speed: 2.27, deg: 158, gust: 8.55 },
//   clouds: { all: 7 },
//   pop: 0,
//   sys: { pod: 'd' },
//   visibility: 10000
// }
// The most important values for date handling:

// dt: A UNIX timestamp (e.g., 1738486800)
// dt_txt: A human-readable string (e.g., "2025-02-02 09:00:00")
// 2. How the Function Processes the Data
// Inside your FiveDayForecast component, the following process happens:

// (a) Extract Date from dt
// js
// Copy
// Edit
// const date = new Date(forecast.dt * 1000);
// forecast.dt is a UNIX timestamp (seconds since 1970).
// new Date(forecast.dt * 1000) converts it into a JavaScript Date object.
// ✅ Example
// For dt = 1738486800, this converts to:

// js
// Copy
// Edit
// Sun Feb 02 2025 09:00:00 GMT+0000 (Coordinated Universal Time)
// (b) Convert Date to String (dateString)
// js
// Copy
// Edit
// const dateString = date.toLocaleDateString();
// .toLocaleDateString() converts the Date object into a readable format.
// Depending on the system locale, it might look like "2/2/2025" (US format) or "02/02/2025" (UK format).
// ✅ Example Output
// For Sun Feb 02 2025, this might return:

// js
// Copy
// Edit
// "2/2/2025"
// 3. How formatDate(dateString) Works
// Once the dateString (e.g., "2/2/2025") is passed into formatDate, it gets reformatted into a shorter format:

// js
// Copy
// Edit
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return new Intl.DateTimeFormat("en-GB", {
//     day: "2-digit",
//     month: "short",
//   }).format(date);
// };
// ✔️ Breakdown of the Function:

// new Date(dateString): Converts "2/2/2025" back into a Date object.
// Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(date): Formats it as "02 Feb".
// ✅ Final Output Example

// js
// Copy
// Edit
// formatDate("2/2/2025"); // Output: "02 Feb"
// 4. Full Code Flow in FiveDayForecast
// Now, the full process inside FiveDayForecast:

// js
// Copy
// Edit
// const weatherForecast = forecastData.list.map((forecast) => {
//   const date = new Date(forecast.dt * 1000); // Convert UNIX timestamp to Date object
//   return {
//     date: date.toLocaleDateString(), // Generates 'dateString'
//     temperature: forecast.main.temp,
//     weatherDescription: forecast.weather[0].description,
//   };
// });

// Displaying formatted dates in the UI
// weatherForecast.map((item) => {
//   console.log(formatDate(item.date)); // Converts 'dateString' into 'DD Mon' format
// });
// ✅ Final Output Example

// js
// Copy
// Edit
// [
//   { date: "02 Feb", temperature: 0.7, weatherDescription: "clear sky" },
//   { date: "03 Feb", temperature: 2.3, weatherDescription: "few clouds" },
//   { date: "04 Feb", temperature: -1.0, weatherDescription: "snow" },
//   { date: "05 Feb", temperature: 4.5, weatherDescription: "rain" },
//   { date: "06 Feb", temperature: 1.2, weatherDescription: "cloudy" }
// ]
// Summary
// Extracts timestamp (dt) and converts it into a Date object.
// Formats the date using Intl.DateTimeFormat for a clean display.
// Ensures each forecast date appears in a user-friendly format ("DD Mon").
// This ensures that your React component only displays one unique forecast per day, formatted correctly. 🚀
