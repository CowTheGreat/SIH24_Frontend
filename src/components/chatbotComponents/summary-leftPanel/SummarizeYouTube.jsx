import React, { useState } from "react";
import styles from "./Summarizer.module.css";

const SummarizeYouTube = () => {
  const [youtubeURL, setYoutubeURL] = useState("");
  const [query, setQuery] = useState("");

  const handleURLChange = (e) => {
    setYoutubeURL(e.target.value);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      url: youtubeURL,
      query: query,
    };

    await fetch("http://127.0.0.1:5000/summarize-youtube", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <div className={styles.summarizer}>
      <h2>Summarize YouTube Video</h2>
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={youtubeURL}
        onChange={handleURLChange}
      />
      <input
        type="text"
        placeholder="Enter your query"
        value={query}
        onChange={handleQueryChange}
      />
      <button onClick={handleSubmit}>Summarize</button>
    </div>
  );
};

export default SummarizeYouTube;
