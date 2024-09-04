import React from "react";
import Classes from "./LeftPanel.module.css";
import UserInfo from "./userInfo";

const LeftPanel = () => {
  return (
    <div className={Classes.leftPanelCont}>
      <div className={Classes.logo}>CLETOCITE</div>
      <UserInfo />
    </div>
  );
};

export default LeftPanel;
