/* eslint-disable */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { read, update } from "../services/bug-api";
import Menu from "./Menu";
import {
  Button,
  Modal,
  ModalBody,
  ModalTitle,
  ModalFooter,
} from "react-bootstrap";
import EditBug from "./EditBug";
import DeleteBug from "./DeleteBug";

export default function SingleBug() {
  const { bugId } = useParams();
  const [bug, setBug] = useState({
    completed: false,
    details: "",
    id: 0,
    name: "",
    priority: "",
    steps: "",
    time: "",
    version: "",
  });
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [time, setTime] = useState("");
  const [creator, setCreator] = useState({});
  const [assigned, setAssigned] = useState({});
  const [modal, setModal] = useState(true);

  useEffect(() => {
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

  const markComplete = (e) => {
    let newData = {
      assigned: assigned._id,
      completed: true,
      creator: creator._id,
      details: bug.details,
      id: bug.id,
      name: bug.name,
      priority: bug.priority,
      steps: bug.steps,
      time: bug.time,
      version: bug.version,
    };

    update({ bugId: bugId }, newData).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
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
  };

  const openEdit = (e) => {
    setEditModal(true);
    setDeleteModal(false);
    setModal(false);
  };

  const openDelete = (e) => {
    setEditModal(false);
    setDeleteModal(true);
    setModal(false);
  };

  const close = (e) => {
    setEditModal(false);
    setDeleteModal(false);
    setModal(true);
  };

  return (
    <div className="single">
      <Menu />

      <Modal show={modal}>
        <ModalTitle>
          <div className="single-title" style={{ width: "150%", gap: "1rem" }}>
            <Button variant="outline-danger" onClick={openDelete}>
              Delete
            </Button>

            <h2 className="single-title-h2">{bug.name}</h2>

            <Button
              variant="outline-primary"
              onClick={() => window.location.assign("/bugs")}
            >
              Close
            </Button>
          </div>
        </ModalTitle>

        <ModalBody style={{ width: "150%" }}>
          <div className="single-body">
            <div className="single-det">
              <p className="single-details">Details :</p>
              <input
                className="single-input"
                type="text"
                disabled={true}
                defaultValue={bug.details}
              />
            </div>

            <div className="single-steps">
              <p className="single-steps-p">Steps :</p>
              <input
                className="single-input"
                type="text"
                disabled={true}
                defaultValue={bug.steps}
              />
            </div>

            <div className="single-prio">
              <p className="single-prio-p">Priority :</p>
              <input
                className="single-input"
                type="text"
                disabled={true}
                defaultValue={bug.priority}
              />
            </div>

            <div className="single-creator">
              <p className="single-creator-p">Creator :</p>
              <input
                className="single-input"
                type="text"
                disabled={true}
                defaultValue={creator.name}
              />
            </div>

            <div className="single-version">
              <p className="single-version-p">Application Version :</p>
              <input
                className="single-input"
                type="text"
                disabled={true}
                defaultValue={bug.version}
              />
            </div>

            <div className="single-time">
              <p className="single-time-p">Time Created :</p>
              <input
                className="single-input"
                type="text"
                disabled={true}
                defaultValue={bug.time}
              />
            </div>

            <div className="single-time">
              <p className="single-time-p">
                Completed : {bug.completed ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </ModalBody>

        <ModalFooter style={{ width: "150%" }}>
          <div className="single-button">
            <Button
              variant="secondary"
              onClick={openEdit}
              style={{ marginRight: "2rem" }}
            >
              Edit
            </Button>
            <Button variant="success" onClick={markComplete}>
              Mark Complete
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      {editModal && <EditBug bugId={bugId} close={close} />}
      {deleteModal && <DeleteBug bugId={bugId} close={close} />}
    </div>
  );
}
