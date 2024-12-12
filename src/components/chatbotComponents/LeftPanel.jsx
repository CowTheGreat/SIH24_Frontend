import React from "react";
import Classes from "./LeftPanel.module.css";
import UserInfo from "./UserInfo";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";
import RefreshButton from "./RefreshButton";

const LeftPanel = () => {
  const navigate = useNavigate(); // Hook for redirection

  const profilepage = () => {
    navigate("/profile");
  };

  return (
    <>
      <div className={Classes.leftPanelCont}>
        <div className={Classes.userinfo} onClick={profilepage}>
          <UserInfo />
        </div>
        {/* <div className={Classes.refreshContainer}>
          <RefreshButton className={Classes.refresh} />
        </div> */}
      </div>
    </>
  );
};

export default LeftPanel;
