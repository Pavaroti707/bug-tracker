import React from "react";
import header from "../assets/header.jpeg";

export default function Header() {
  return (
    <div className="header">
      <img
        src={header}
        alt="header"
        style={{ width: "200px", height: "150px" }}
      />
      <h1>Bug Tracker</h1>
    </div>
  );
}
