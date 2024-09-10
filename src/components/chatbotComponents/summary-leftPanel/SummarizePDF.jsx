import React, { useState } from "react";
import styles from "./Summarizer.module.css";

const SummarizePDF = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [message, setMessage] = useState(""); // Ensure message state is properly declared

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile) {
      alert("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdfFile);
    formData.append("message", message); // Ensure message is included

    try {
      const response = await fetch("http://127.0.0.1:5000/upload-pdf", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      console.log(data.message); // Logging the response message
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Enter your message"
        value={message}
        onChange={handleMessageChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SummarizePDF;
