import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState } from "react";
import UserCard from "./components/UserCard";
import ButtonComponent from "./components/ButtonComponent";
import ModalComponent from "./components/ModalComponent";
import FormComponent from "./components/FormComponent";
import { Form, Image } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

const App = () => {
  const [showAdd, setShowAdd] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

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
  return (
    <div className="m-4">
      <div className="d-flex justify-content-between align-items-center mb-4 bg-purple py-3 px-4 rounded-2">
        <h1 className="text-light fs-4">Welcome to our page!</h1>
        <ButtonComponent onClick={handleShowAdd} icon={FaPlus} label={"Add User"} backgroundColor="bg-light text-dark" />
      </div>

      <UserCard />

      {/* Modal Add Data */}
      <ModalComponent title={"Add Data"} show={showAdd} onHide={handleCloseAdd} buttonLabel={"Save"} onClick={handleCloseAdd}>
        <FormComponent>
          <div className="d-flex flex-column align-items-center mb-2">
            <Form.Control type="file" id="fileInput" accept="image/*" onChange={handleFileChange} className="d-none mb-2 h-25" />

            {previewURL && <Image src={previewURL || "https://via.placeholder.com/600/92c952"} roundedCircle className="w-25 h-25 object-fit-cover" alt="avatar" />}

            <label htmlFor="fileInput" className="text-purple fw-medium d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
              <FaPlus />
              Add Image
            </label>
          </div>
        </FormComponent>
      </ModalComponent>
    </div>
  );
};

export default App;
