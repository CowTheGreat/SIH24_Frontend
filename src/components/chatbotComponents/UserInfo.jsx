// import Classes from "./UserInfo.module.css";
// import userIcon from "../../assets/userIcon.png";

// const UserInfo = () => {
//   return (
//     <div className={Classes.userCont}>
//       <img src={userIcon} className={Classes.icon} />
//       <div>
//         <div className={Classes.name}>Aravindhan</div>
//         <div className={Classes.pos}>Intern</div>
//       </div>
//     </div>
//   );
// };

// export default UserInfo;

import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import Classes from "./UserInfo.module.css";
import userIcon from "../../assets/userIcon.png";

const UserInfo = () => {
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleRedirectToProfile = () => {
    navigate("/profile"); // Redirect to the profile page
  };

  return (
    <div className={Classes.userCont} onClick={handleRedirectToProfile}>
      <img src={userIcon} className={Classes.icon} alt="User Icon" />
      <div>
        <div className={Classes.name}>Aravindhan</div>
        <div className={Classes.pos}>Intern</div>
      </div>
    </div>
  );
};

export default UserInfo;

