import React, { useState, useEffect } from "react";
import { list } from "../services/bug-api";
import Menu from "./Menu";

export default function Bugs() {
  const [bugs, setBugs] = useState([]);

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

  return (
    <div className="bugs">
      <Menu />

      <div className="bugs-main">
        {bugs.map((value, index) => {
          return (
            <div key={index}>
              {value.priority === "high" && (
                <div
                  className="single-high"
                  onClick={() => window.location.assign(`/bug/${value.id}`)}
                >
                  <p className="single-high-title">
                    Bug {value.id} {value.name}
                  </p>
                  <p className="single-high-v">High {value.version}</p>
                </div>
              )}

              {value.priority === "medium" && (
                <div
                  className="single-medium"
                  onClick={() => window.location.assign(`/bug/${value.id}`)}
                >
                  <p className="single-medium-title">
                    Bug {value.id} {value.name}
                  </p>
                  <p className="single-medium-v">Medium {value.version}</p>
                </div>
              )}

              {value.priority === "low" && (
                <div
                  className="single-low"
                  onClick={() => window.location.assign(`/bug/${value.id}`)}
                >
                  <p className="single-low-title">
                    Bug {value.id} {value.name}{" "}
                  </p>
                  <p className="single-low-v">Low {value.version}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
