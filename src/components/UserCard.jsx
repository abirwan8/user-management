import React, { useState, useEffect } from "react";
import { Card, Image, Modal, Button, Row, Col, Form, Alert } from "react-bootstrap";
import ButtonComponent from "./ButtonComponent";
import ModalComponent from "./ModalComponent";
import FormComponent from "./FormComponent";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaCheck } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";

// Image
import ava_1 from "../images/ava-1.jpg";
import ava_2 from "../images/ava-2.jpg";
import ava_3 from "../images/ava-3.jpg";
import ava_4 from "../images/ava-4.jpg";
import ava_5 from "../images/ava-5.jpg";

const AVATAR_IMAGES = [ava_1, ava_2, ava_3, ava_4, ava_5];

const UserCard = () => {
  // Modal state
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // Alert
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  // Image Preview
  const [previewURL, setPreviewURL] = useState("https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg");

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

  // Fetching Data
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data.slice(0, 8));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="d-flex justify-content-center">Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Modal Handler
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const handleShowDelete = (user) => {
    setSelectedUser(user);
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setSelectedUser(null);
    setShowDelete(false);
  };

  // Handler Edit
  const handleEdit = () => {
    handleCloseEdit();
    showAlert("User data successfully changed!", "warning");
  };

  // Handler Delete
  const handleDelete = () => {
    handleCloseDelete();
    showAlert("User data successfully deleted!", "danger");
  };

  return (
    <>
      {/* Alert */}
      {alert.show && (
        <Alert variant={alert.type} className="position-fixed top-0 end-0 m-4" style={{ zIndex: 10 }}>
          <FaCheck className="me-2" />
          {alert.message}
        </Alert>
      )}

      {/* User Card */}
      <Row className="mb-4">
        {users.map((user) => (
          <Col xs={12} md={6} lg={3} className="mb-4">
            <Card className="border-0 shadow-lg text-center card-user">
              <Card.Body key={user.id}>
                <Image
                  src={AVATAR_IMAGES[user.id % AVATAR_IMAGES.length]}
                  roundedCircle
                  className="border-purple p-1 object-fit-cover avatar hover-effect"
                  alt="avatar"
                />
                <Card.Title className="fw-bold mt-2">{user.name}</Card.Title>
                <div className="d-flex justify-content-center gap-2 mb-2">
                  <small className="bg-purple-30 py-1 px-2 rounded-2">{user.address.city}</small>
                  <small className="bg-purple-30 py-1 px-2 rounded-2"><a href="#" className="text-dark text-decoration-none">{user.website}</a></small>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis nihil adipisci sunt dolore tenetur delectus?</p>
                <div className="d-flex justify-content-center gap-2">
                  <ButtonComponent onClick={() => handleShowEdit(user)} icon={FaEdit} label={"Edit User"} className="bg-warning" />
                  <ButtonComponent onClick={() => handleShowDelete(user)} icon={FaTrashAlt} label={"Delete User"} className="bg-danger" />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal Edit */}
      <ModalComponent title={"Edit Data"} show={showEdit} onHide={handleCloseEdit} buttonLabel={"Edit"} onClickSubmit={handleEdit} onClickCancel={handleCloseEdit} className={"bg-warning border-warning"}>
        <FormComponent>
          <div className="d-flex flex-column align-items-center mb-4">
            <Form.Control type="file" id="fileInput" accept="image/*" onChange={handleFileChange} className="d-none mb-2 h-25" />

            {previewURL && (
              <Image
                src={previewURL}
                roundedCircle
                className="object-fit-cover ratio ratio-1x1 avatar hover-effect"
                alt="avatar"
              />
            )}
            <label htmlFor="fileInput" className="text-purple fw-medium d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
              <FaEdit />
              Change Image
            </label>
          </div>
        </FormComponent>
      </ModalComponent>

      {/* Modal Delete */}
      <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static" keyboard={false} centered>
        <Modal.Body className="my-4 mx-4">
          <Row>
            <GoAlertFill className="text-danger" style={{ fontSize: "64px" }} />
            <span className="text-center mb-4 mt-2">
              Are you sure you want to delete <b>{selectedUser && `${selectedUser.name}?`}</b>
            </span>
          </Row>
          <div className="d-flex justify-content-center gap-2">
            <Button variant="outline-secondary" className="flex-grow-1" onClick={handleCloseDelete}>
              Cancel
            </Button>
            <Button variant="danger" className="flex-grow-1" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserCard;
