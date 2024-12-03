import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import Classes from "./UserInfo.module.css";
import userIcon from "../../assets/userIcon.png";

const UserInfo = () => {
  const navigate = useNavigate(); // Initialize navigate for redirection

  // Retrieve user data from local storage
  const storedUserData = localStorage.getItem("user_data");
  const user = storedUserData ? JSON.parse(storedUserData) : null;

  const handleRedirectToProfile = () => {
    navigate("/profile"); // Redirect to the profile page
  };

  return (
    <div
      className={Classes.userCont}
      onClick={handleRedirectToProfile}
      role="button" // Add semantic role for accessibility
    >
      <img src={userIcon} className={Classes.icon} alt="User Icon" />
      <div>
        {/* Display user's name and position with fallback values */}
        <div className={Classes.name}>{user?.name || "Guest"}</div>
        <div className={Classes.pos}>{user?.position || "Unassigned"}</div>
      </div>
    </div>
  );
};

export default UserInfo;
