import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import SummarizePDF from "./summary-leftPanel/SummarizePDF";
import SummarizeLocalVideo from "./summary-leftPanel/SummarizeLocalVideo";
import SummarizeYouTube from "./summary-leftPanel/SummarizeYouTube";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownButton} onClick={toggleDropdown}>
        SUMMARIZER
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <button
            className={styles.button}
            onClick={() => handleOptionClick("pdf")}
          >
            Summarize PDF
          </button>
          <button
            className={styles.button}
            onClick={() => handleOptionClick("local_video")}
          >
            Summarize Local Video
          </button>
          <button
            className={styles.button}
            onClick={() => handleOptionClick("youtube_video")}
          >
            Summarize YouTube Video
          </button>
        </div>
      )}
      {selectedOption === "pdf" && <SummarizePDF />}
      {selectedOption === "local_video" && <SummarizeLocalVideo />}
      {selectedOption === "youtube_video" && <SummarizeYouTube />}
    </div>
  );
};

export default Dropdown;
