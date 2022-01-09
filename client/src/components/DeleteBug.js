import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  Button,
} from "react-bootstrap";
import { remove } from "../services/bug-api";

export default function DeleteBug({ bugId, close }) {
  const [redirect, setRedirect] = useState(false);

  const deleteHandle = (e) => {
    remove({ bugId: bugId }).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setRedirect(true);
      }
    });
  };

  if (redirect) {
    return window.location.assign("/bugs");
  }

  return (
    <div>
      <Modal show={true}>
        <ModalTitle>
          <p className="edit-title">Delete a Bug</p>
        </ModalTitle>

        <ModalBody>
          <div className="delete-main">
            <p className="delete-p">Are You Sure?</p>
          </div>
        </ModalBody>

        <ModalFooter>
          <div className="delete-buttons">
            <Button
              variant="outline-success"
              style={{ marginRight: "2rem" }}
              onClick={deleteHandle}
            >
              Yes
            </Button>
            <Button variant="outline-danger" onClick={() => close()}>
              No
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}
