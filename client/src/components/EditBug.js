/* eslint-disable */ 

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  Button,
  Alert,
} from "react-bootstrap";
import { listUser } from "../services/auth-api";
import { read, update } from "../services/bug-api";

export default function EditBug({ bugId, close }) {
  const [bug, setBug] = useState({});
  const [creator, setCreator] = useState({});
  const [assigned, setAssigned] = useState({});
  const [users, setUsers] = useState([]);
  const [values, setValues] = useState({
    completed: false,
    details: "",
    id: 0,
    name: "",
    priority: "",
    steps: "",
    time: "",
    version: "",
    assigned: "",
    creator: "",
    error: "",
    redirect: false,
  });

  useEffect(() => {
    listUser().then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });

    read({ bugId }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setAssigned(data.assigned);
        setCreator(data.creator);
        setBug({
          completed: data.completed,
          details: data.details,
          id: data.id,
          name: data.name,
          priority: data.priority,
          steps: data.steps,
          time: data.time,
          version: data.version,
        });
      }
    });
  }, [bugId]);

  const editHandle = (e) => {
    let id = "";

    users.map((v, i) => {
      if (v.name === values.assigned) {
        id = v._id;
      }
    });

    const updatedBug = {
      assigned: id || assigned._id,
      completed: bug.completed,
      creator: creator._id,
      details: values.details || bug.details,
      id: bug.id,
      name: values.name || bug.name,
      priority: values.priority || bug.priority,
      steps: values.steps || bug.steps,
      time: bug.time,
      version: values.version || bug.version,
    };

    update({ bugId: bugId }, updatedBug).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", redirect: true });
      }
    });
  };

  const { redirect } = values;

  if (redirect) {
    window.location.assign("/bugs");
  }

  return (
    <div>
      <Modal show={true}>
        <ModalTitle>
          <p className="edit-title">Edit a Bug</p>
        </ModalTitle>

        <ModalBody>
          <div className="modal-form">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                defaultValue={bug.name}
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
                id="exampleInputEmail1"
                defaultValue={bug.details}
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
                id="exampleInputEmail1"
                defaultValue={bug.steps}
                onChange={(e) =>
                  setValues({ ...values, steps: e.target.value })
                }
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
                id="exampleInputEmail1"
                defaultValue={bug.priority}
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
                id="exampleInputEmail1"
                defaultValue={bug.version}
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
                id="exampleInputEmail1"
                defaultValue={assigned.name}
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
          </div>

          {values.error !== "" && (
            <Alert variant="danger">{values.error}</Alert>
          )}
        </ModalBody>
        <ModalFooter>
          <div className="edit-buttons">
            <Button
              variant="outline-success"
              onClick={editHandle}
              style={{ marginRight: "2rem" }}
            >
              Edit
            </Button>
            <Button variant="outline-danger" onClick={() => close()}>
              Back
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}
