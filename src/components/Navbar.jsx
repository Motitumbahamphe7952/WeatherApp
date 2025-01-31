import React, { useState } from "react";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import { Button, TextField } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";

const Navbar = ({ handleSearch, handleCurrentLocation }) => {
  const [SearchCity, setSearchCity] = useState("");

  const handleSearchClick = () => {
    if (SearchCity.trim()) {
      handleSearch(SearchCity);
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        // backgroundColor: "#0F1214",
        alignItems: "center",
        margin: "10px",
        padding: "10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <FilterDramaIcon style={{ fontSize: "30px" }} />
        <p
          style={{
            color: "#0073E6",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          WeatherCast
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <TextField
          style={{
            backgroundColor: "white",
            borderRadius: "2rem",
            width: "30rem",
          }}
          variant="outlined"
          placeholder="Search City"
          size="small"
          value={SearchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleSearchClick}
          style={{ border: "6px", backgroundColor: "#0073E6" }}
        >
          Search
        </Button>
      </div>

      <Button
        variant="contained"
        onClick={() => {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            handleCurrentLocation(lat, lon);
          });
        }}
        style={{
          fontSize: "16px",
          backgroundColor: "#0073E6",
          height: "35px",
          width: "250px",
          color: "white",
          gap: "2px",
          padding: "0 10px",
          borderRadius: "6px",
          alignItems: "Center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <LocationOnIcon /> Current Location
      </Button>
    </nav>
  );
};

export default Navbar;
