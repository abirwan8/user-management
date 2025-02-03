import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState } from "react";
import UserCard from "./components/UserCard";
import ButtonComponent from "./components/ButtonComponent";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

const App = () => {
  const [showAdd, setShowAdd] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  return (
    <div className="m-4">
      <div className="d-flex justify-content-between align-items-center mb-4 bg-purple py-3 px-4 rounded-2">
        <h1 className="text-light fs-4">Welcome to our page!</h1>
        <ButtonComponent onClick={handleShowAdd} icon={FaPlus} label={"Add User"} backgroundColor="bg-light text-dark" />
      </div>

      <UserCard />

      {/* Modal Add Data User */}
      <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Data User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control type="text" placeholder="Your Full Name" className="mb-2" />
            <Row>
              <Col xs={12} md={6}>   
                <Form.Control type="text" placeholder="Address" className="mb-2" />
              </Col>

              <Col xs={12} md={6}>   
                <Form.Control type="text" placeholder="Website" className="mb-2" />
              </Col>
            </Row>
            <Form.Control as="textarea" rows={3} placeholder="Description" />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="border-0" onClick={handleCloseAdd}>
            Cancel
          </Button>
          <Button className="bg-purple border-0 text-white">Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;
