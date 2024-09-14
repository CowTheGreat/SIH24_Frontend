import React from "react";
import Classes from "./RefreshButton.module.css";

function RefreshButton() {
  const refreshPage = () => {
    window.location.reload(); // This will refresh the current page
  };

  return (
    <button className={Classes.refreshButton} onClick={refreshPage}>
      <span className={Classes.buttonText}>New chat</span>
      <span className={Classes.iconWrapper}>+</span>{" "}
    </button>
  );
}

export default RefreshButton;
