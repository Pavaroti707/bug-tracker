/* eslint-disable */

import { Alert, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { signin } from "../services/auth-api";
import authHelpers from "../services/auth-helpers";
import { Navigate } from "react-router";

export default function Homepage() {
  const [values, setValues] = useState({
    name: "",
    password: "",
    error: "",
    redirect: "",
  });

  useEffect(() => {
    if (sessionStorage.getItem("token"))
      setValues({ ...values, redirect: true });
  }, []);

  const login = (e) => {
    const user = {
      name: values.name || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        authHelpers.authenticate(data, () => {
          setValues({ ...values, error: "", redirect: true });
        });
      }
    });
  };

  const { redirect } = values;

  if (redirect) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="homepage">
      <h3>Login</h3>

      <div className="form-outline">
        <input
          type="text"
          id="form12"
          className="form-control"
          placeholder="name"
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          style={{ marginBottom: "1rem" }}
        />
      </div>

      <div className="form-outline">
        <input
          type="password"
          id="form12"
          className="form-control"
          placeholder="password"
          style={{ marginBottom: "1rem" }}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        />
      </div>
      {values.error && <Alert variant="danger">{values.error}</Alert>}
      <div className="homepage-buttons">
        <Button variant="dark" onClick={login}>
          Login
        </Button>
      </div>
    </div>
  );
}
