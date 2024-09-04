import React from "react";
import Classes from "./RightPanel.module.css";
import ChatbotContainer from "./ChatbotContainer";

const RightPanel = () => {
  return (
    <div className={Classes.rightPanelCont}>
      <div className={Classes.botCont}>
        <ChatbotContainer />
      </div>
    </div>
  );
};

export default RightPanel;
