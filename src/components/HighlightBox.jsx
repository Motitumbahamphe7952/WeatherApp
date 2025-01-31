import React from "react";


// Define the props type for the HighlightBox component


const HighlightBox = ({ title, value, Icon }) => {
  return (
    <div
      style={{
        backgroundColor: "#1351af",
        color: "white",
        padding: "1rem",
        borderRadius: "0.5rem",
        width: "200px",
        height: "120px",
      }}
    >
      <div>
        <div style={{ fontSize: "25px" }}>{title}</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Icon style={{ fontSize: "40px" }} />
          <p style={{ fontSize: "30px" }}>{value}</p>
        </div>
      </div>
    </div>
  );
};

export default HighlightBox;