import React, { useState, useEffect } from "react";
import { Card, Badge, Image, Modal, Button, Row, Col, Form } from "react-bootstrap";
import ButtonComponent from "./ButtonComponent";
import ModalComponent from "./ModalComponent";
import FormComponent from "./FormComponent";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import ava from "../images/ava-5.jpg";

const UserCard = () => {
  // Modal state
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // Fetching Data
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Image Preview
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // const handleCloseEdit = () => setShowEdit(false);
  // const handleShowEdit = () => setShowEdit(true);
  const handleShowEdit = (user) => {
    setSelectedUser(user);
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setSelectedUser(null);
    setShowEdit(false);
  };

  const handleShowDelete = (user) => {
    setSelectedUser(user);
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setSelectedUser(null);
    setShowDelete(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Row className="mb-4">
        {users.map((user) => (
          <Col xs={12} md={6} lg={3} className="mb-4">
            <Card className="border-0 shadow-lg text-center card-user">
              <Card.Body key={user.id}>
                <Image src={ava} roundedCircle className="w-50 h-50 border-purple p-1 object-fit-cover" alt="avatar" />
                <Card.Title className="fw-bold mt-2">{user.name}</Card.Title>
                <div className="d-flex justify-content-center gap-2 mb-2">
                  <Badge bg="secondary">{user.address.city}</Badge>
                  <Badge bg="secondary">{user.website}</Badge>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis nihil adipisci sunt dolore tenetur delectus?</p>
                <div className="d-flex justify-content-center gap-2">
                  <ButtonComponent onClick={() => handleShowEdit(user)} icon={FaEdit} label={"Edit User"} backgroundColor="bg-warning" />
                  <ButtonComponent onClick={() => handleShowDelete(user)} icon={FaTrashAlt} label={"Delete User"} backgroundColor="bg-danger" />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal Edit */}
      <ModalComponent title={"Edit Data"} show={showEdit} onHide={handleCloseEdit} buttonLabel={"Edit"} onClick={handleCloseEdit}>
        <FormComponent>
          <div className="d-flex flex-column align-items-center mb-2">
            <Form.Control type="file" id="fileInput" accept="image/*" onChange={handleFileChange} className="d-none mb-2 h-25" />

            {previewURL && <Image src={previewURL || "https://via.placeholder.com/600/92c952"} roundedCircle className="w-25 h-25 object-fit-cover" alt="avatar" />}

            <label htmlFor="fileInput" className="text-purple fw-medium d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
              <FaEdit />
              Change Image
            </label>
          </div>
        </FormComponent>
      </ModalComponent>

      {/* Modal Delete */}
      <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static" keyboard={false} centered>
        <Modal.Body className="my-4">
          <Row>
            <GoAlertFill className="fs-1 text-danger" />
            <span className="text-center fs-5 mb-4 mt-2">
              Are you sure you want to delete <b>{selectedUser && `${selectedUser.name}?`}</b>
            </span>
          </Row>
          <div className="d-flex justify-content-center gap-2">
            <Button variant="secondary" className="flex-grow-1" onClick={handleCloseDelete}>
              Cancel
            </Button>
            <Button variant="danger" className="flex-grow-1">
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserCard;