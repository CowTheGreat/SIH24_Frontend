import React, { useState } from "react";
import styles from "./Summarizer.module.css";

const SummarizeLocalVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [query, setQuery] = useState("");
  const [responseMessage, setResponseMessage] = useState(""); // For feedback

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async () => {
    if (!videoFile) {
      alert("Please select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("query", query);

    try {
      const response = await fetch("http://127.0.0.1:5000/summarize-video", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      setResponseMessage(data.message); // Update response message
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setResponseMessage("There was an error processing your request."); // Error feedback
    }
  };

  return (
    <div className={styles.summarizer}>
      <h2>Summarize Local Video</h2>
      <input type="file" accept="video/mp4" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Enter your query"
        value={query}
        onChange={handleQueryChange}
      />
      <button onClick={handleSubmit}>Summarize</button>
      {responseMessage && <p>{responseMessage}</p>}{" "}
    </div>
  );
};

export default SummarizeLocalVideo;
