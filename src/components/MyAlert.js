import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { BsFillExclamationCircleFill, BsCheckCircleFill } from "react-icons/bs";

function MyAlert() {
  const [show, setShow] = useState(false);
  const [alertType, setAlertType] = useState("");

  const handleClose = () => {
    setShow(false);
    setAlertType("");
  };
  const handleShow = (type) => {
    setShow(true);
    setAlertType(type);
    // กำหนดเวลาให้ Modal หายไปเมื่อเวลาผ่านไป 3 วินาที
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  const showAlert = (type) => {
    handleShow(type);
  };

  const getIcon = () => {
    if (alertType === "error") {
      return <BsFillExclamationCircleFill color="red" size={54} />;
    } else if (alertType === "success") {
      return <BsCheckCircleFill color="green" size={64} />;
    } else {
      return null;
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => showAlert("error")}>
        Show Error
      </Button>
      <Button variant="success" onClick={() => showAlert("success")}>
        Show Success
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <p>This is an {alertType} message.</p>
          {getIcon()}{" "}
          {alertType === "error"
            ? "Error"
            : alertType === "success"
            ? "Success"
            : ""}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MyAlert;
