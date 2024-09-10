import React from "react";
import Classes from "./LeftPanel.module.css";
import UserInfo from "./userInfo";
import Dropdown from "./Dropdown";

const LeftPanel = () => {
  return (
    <div className={Classes.leftPanelCont}>
      <div className={Classes.logo}>CLETOCITE</div>
      <UserInfo />
      <Dropdown />
    </div>
  );
};

export default LeftPanel;
