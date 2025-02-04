import React from "react";
import { Modal, Button } from 'react-bootstrap';

const ModalComponent = ({ title, show, onHide, children, buttonLabel, onClickSubmit, onClickCancel, className }) => {
  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false} centered>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {children}
    </Modal.Body>
    <Modal.Footer className="d-flex justify-content-center gap-2">
      <Button variant="outline-secondary" className="flex-grow-1 border" onClick={onClickCancel}>
        Cancel
      </Button>
      <Button className={`flex-grow-1 text-white border-1 ${className}`} onClick={onClickSubmit}>
        {buttonLabel}
      </Button>
    </Modal.Footer>
  </Modal>
  );
};

export default ModalComponent;
