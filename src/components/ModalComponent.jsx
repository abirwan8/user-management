import React from "react";
import { Modal, Button } from 'react-bootstrap';

const ModalComponent = ({ title, show, onHide, children, buttonLabel, onClick }) => {
  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false} centered>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {children}
    </Modal.Body>
    <Modal.Footer className="d-flex justify-content-center gap-2">
      <Button variant="secondary" className="flex-grow-1" onClick={onClick}>
        Cancel
      </Button>
      <Button variant="warning" className="flex-grow-1 text-white">
        {buttonLabel}
      </Button>
    </Modal.Footer>
  </Modal>
  );
};

export default ModalComponent;
