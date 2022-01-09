import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { signout } from "../services/auth-api";
import authHelpers from "../services/auth-helpers";
import { getCache } from "../services/cache-api";

export default function Menu() {
  const [user, setUser] = useState({
    _id: "",
    id: "",
    name: "",
    role: "",
  });

  useEffect(() => {
    getCache().then((data) => {
      setUser(data);
    });
  }, []);

  const logout = (e) => {
    signout().then((data) => {
      authHelpers.clearToken(() => window.location.assign("/"));
    });
  };

  return (
    <div className="menu">
      <Button
        variant="warning"
        onClick={() => window.location.assign("/dashboard")}
      >
        Dashboard
      </Button>
      <Button variant="warning" onClick={() => window.location.assign("/bugs")}>
        View Bugs
      </Button>

      {user.role === "admin" ? (
        <Button
          variant="warning"
          onClick={() => window.location.assign("/bug/create")}
        >
          Create Bug
        </Button>
      ) : (
        <></>
      )}

      <Button variant="danger" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
