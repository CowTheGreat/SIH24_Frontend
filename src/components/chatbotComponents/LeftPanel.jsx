import React from "react";
import Classes from "./LeftPanel.module.css";
import UserInfo from "./userInfo";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";

const LeftPanel = () => {
  const profilepage = () => {
    navigate("/profile");
  };

  return (
    <>
      <div className={Classes.leftPanelCont}>
        <div className={Classes.logo}>CLETOCITE</div>
        <div className={Classes.userinfo} onClick={profilepage}>
          <UserInfo />
        </div>
      </div>
    </>
  );
};

export default LeftPanel;
