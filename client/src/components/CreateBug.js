/* eslint-disable */

import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import { listUser } from "../services/auth-api";
import { create } from "../services/bug-api";
import { getCache } from "../services/cache-api";
import Menu from "./Menu";

export default function CreateBug() {
  const [users, setUsers] = useState([]);
  const [values, setValues] = useState({
    completed: false,
    details: "",
    name: "",
    priority: "",
    steps: "",
    version: "",
    assigned: "",
    error: "",
    redirect: false,
  });
  const [creator, setCreator] = useState({
    _id: "",
    id: "",
    name: "",
    role: "",
  });

  useEffect(() => {
    listUser().then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });

    getCache().then((data) => {
      setCreator(data);
    });
  }, []);

  const createHandle = (e) => {
    let id = "";
    let counter = 0;

    users.map((v, i) => {
      if (v.name === values.assigned) {
        id = v._id;
        counter++;
      }
    });

    if (counter === 0) {
      return setValues({
        ...values,
        error: "You have to chose assigne  from dropdown menu!!!",
      });
    }

    if (
      values.priority !== "high" &&
      values.priority !== "medium" &&
      values.priority !== "low"
    ) {
      return setValues({
        ...values,
        error: "You have to chose priority  from dropdown menu!!!",
      });
    }

    const newBug = {
      assigned: id || undefined,
      creator: creator._id || undefined,
      details: values.details || undefined,
      name: values.name || undefined,
      priority: values.priority || undefined,
      steps: values.steps || undefined,
      version: values.version || undefined,
    };

    create(newBug).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", redirect: true });
      }
    });
  };

  const { redirect } = values;

  if (redirect) {
    return window.location.assign("/bugs");
  }

  return (
    <div>
      <Menu />

      <div className="create">
        <h2 className="create-title">Create A Bug</h2>

        <div className="create-form">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Details:
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) =>
                setValues({ ...values, details: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Steps:
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setValues({ ...values, steps: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Priority:
            </label>
            <input
              type="search"
              list="prio"
              className="form-control"
              onChange={(e) =>
                setValues({ ...values, priority: e.target.value })
              }
            />

            <datalist id="prio">
              <option value="high" />
              <option value="medium" />
              <option value="low" />
            </datalist>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Version:
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) =>
                setValues({ ...values, version: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Assigned:
            </label>
            <input
              type="search"
              list="users"
              className="form-control"
              onChange={(e) =>
                setValues({ ...values, assigned: e.target.value })
              }
            />

            <datalist id="users">
              {users.map((value, index) => {
                return <option key={index} value={value.name} />;
              })}
            </datalist>
          </div>

          {values.error !== "" && (
            <Alert variant="danger">{values.error}</Alert>
          )}

          <div className="mb-3">
            <Button variant="outline-secondary" onClick={createHandle}>
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
