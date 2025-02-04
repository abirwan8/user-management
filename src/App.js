import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState } from "react";
import HeaderComponent from "./components/HeaderComponent";
import UserCard from "./components/UserCard";
import ButtonComponent from "./components/ButtonComponent";
import ModalComponent from "./components/ModalComponent";
import FormComponent from "./components/FormComponent";
import FooterComponent from "./components/FooterComponent";
import { Form, Image, Alert } from "react-bootstrap";
import { FaPlus, FaCheck } from "react-icons/fa";

const App = () => {
  // Modal state
  const [showAdd, setShowAdd] = useState(false);
  // Alert
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  // Image
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

  // Handler Save
  const handleSave = () => {
    handleCloseAdd();
    showAlert("User data successfully added!", "success");
  };

  return (
    <>
      <div className="m-4">
        {/* Header Component */}
        <HeaderComponent>
          <ButtonComponent onClick={handleShowAdd} icon={FaPlus} label={"Add User"} className="bg-light text-dark" />
        </HeaderComponent>

        {/* Alert */}
        {alert.show && (
          <Alert variant={alert.type} className="position-fixed top-0 end-0 m-4" style={{ zIndex: 10 }}>
            <FaCheck className="me-2" />
            {alert.message}
          </Alert>
        )}

        {/* User Component */}
        <UserCard />

        {/* Modal Add Data */}
        <ModalComponent title={"Add Data"} show={showAdd} onHide={handleCloseAdd} buttonLabel={"Save"} onClickSubmit={handleSave} onClickCancel={handleCloseAdd} className={"bg-purple border-purple"}>
          <FormComponent>
            <div className="d-flex flex-column align-items-center mb-2">
              <Form.Control type="file" id="fileInput" accept="image/*" onChange={handleFileChange} className="d-none mb-2 h-25" />

              {previewURL && <Image src={previewURL || "https://via.placeholder.com/600/92c952"} roundedCircle className="object-fit-cover ratio ratio-1x1 avatar hover-effect" alt="avatar" />}

              <label htmlFor="fileInput" className="text-purple fw-medium d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
                <FaPlus />
                Add Image
              </label>
            </div>
          </FormComponent>
        </ModalComponent>
      </div>

      {/* Footer Component */}
      <FooterComponent />
    </>
  );
};

export default App;
