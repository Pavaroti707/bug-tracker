/* eslint-disable */ 

import React, { useState, useEffect } from "react";
import { list } from "../services/bug-api";
import Menu from "./Menu";

export default function Dashboard() {
  const [bugs, setBugs] = useState([]);
  const [high, setHigh] = useState([]);
  const [medium, setMedium] = useState([]);
  const [low, setLow] = useState([]);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) return window.location.assign("/");

    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBugs(data);
      }
    });
  }, []);

  useEffect(() => {
    let tempHigh = [];
    let tempMedium = [];
    let tempLow = [];

    bugs.map((value, index) => {
      if (value.priority === "high") {
        tempHigh.push(value);
      } else if (value.priority === "medium") {
        tempMedium.push(value);
      } else if (value.priority === "low") {
        tempLow.push(value);
      }
    });

    setHigh(tempHigh);
    setMedium(tempMedium);
    setLow(tempLow);
  }, [bugs]);

  return (
    <div className="dashboard">
      <Menu />

      <div className="dashboard-right">
        <div className="dashboard-high">
          <p className="dashboard-high-p">Total High: {high.length}</p>
        </div>

        <div className="dashboard-medium">
          <p className="dashboard-medium-p">Total Medium: {medium.length}</p>
        </div>

        <div className="dashboard-low">
          <p className="dashboard-low-p">Total Low: {low.length}</p>
        </div>
      </div>
    </div>
  );
}
