import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import FileIcon from "../../assets/fileicon.png";

const FileUpload = () => {
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [file, setFile] = useState(null); // Selected file state
  const [uploadStatus, setUploadStatus] = useState(""); // Upload status

  // Handle file input change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle form submission (file upload)
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setUploadStatus("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus("File uploaded successfully");
    } catch (error) {
      setUploadStatus("File upload failed");
    }
  };

  return (
    <div>
      {/* File button that triggers modal */}
      <button className="file-button" onClick={() => setShowModal(true)}>
        <img src={FileIcon} alt="Upload" className="file-image" />
      </button>

      {/* Overlay modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img src={FileIcon} alt="Upload" className="modal-icon" />
            <h2>Upload File</h2>
            <form onSubmit={handleSubmit}>
              <input type="file" onChange={handleFileChange} />
              <button type="submit">Upload</button>
            </form>
            <p>{uploadStatus}</p> {/* Display upload status inside modal */}
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
