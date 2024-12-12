import React from "react";
import Classes from "./RefreshButton.module.css";
import plus_icon from "../../assets/plus_icon.png";

function RefreshButton() {
  const refreshPage = () => {
    window.location.reload(); // This will refresh the current page
  };

  return (
    // <button className={Classes.refreshButton} onClick={refreshPage}>
    //   <span className={Classes.buttonText}>New chat</span>
    //   <span className={Classes.iconWrapper}>+</span>{" "}
    // </button>
    <div className={Classes.newChat} onClick={refreshPage}>
      <img src={plus_icon} alt="Plus Icon" />
      <p>New Chat</p>
    </div>
  );
}

export default RefreshButton;
