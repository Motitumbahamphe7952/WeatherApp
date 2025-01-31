import React from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CloudIcon from "@mui/icons-material/Cloud";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
const Mainweather = ({ weatherData }) => {
  const temperatureCelcius = weatherData?.main?.temp || "N/A";
  const weatherDescription = weatherData?.weather[0]?.description || "N/A";
  const cityName = weatherData?.name || "city not available";
  const countryname = weatherData?.sys?.country || "country not available";
  const timestamp = weatherData?.dt || null;

  const currentData = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
      })
    : "Date is not available";

  const renderTemperatureIcon = () => {
    if (temperatureCelcius > 23) {
      return (
        <WbSunnyIcon
          style={{ marginLeft: "10px", fontSize: "3rem", color: "yellow" }}
        />
      );
    } else if (temperatureCelcius < 10) {
      return (
        <AcUnitIcon
          style={{ marginLeft: "10px", fontSize: "3rem", color: "White" }}
        />
      );
    } else {
      return (
        <CloudIcon
          style={{ marginLeft: "10px", fontSize: "3rem", color: "white" }}
        />
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#0073E6",
        color: "white",
        padding: "30px",
        borderRadius: "0.5rem",
        width: "330px",
        height: "155px",
      }}
    >
      <div style={{ fontSize: "25px" }}>Now</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "40px",
          fontWeight: "bold",
          gap: "10px",
        }}
      >
        {temperatureCelcius}&#176;<sup>C</sup>{renderTemperatureIcon()}
      </div>
      <div style={{ fontSize: "15px", marginTop: "8px", fontWeight: "50" }}>
        {weatherDescription}
      </div>
      <div style={{marginTop:'1rem'}}>
        <div style={{ display: "flex", gap: "10px",alignItems:'center' }}>
          <CalendarMonthIcon />
          {currentData}
        </div>
        <div style={{ display: "flex", gap: "10px",alignItems:'center' ,marginTop:'0.5rem'}}>
            <LocationOnTwoToneIcon />
            {cityName},{countryname}
        </div>
      </div>
    </div>
  );
};

export default Mainweather;
