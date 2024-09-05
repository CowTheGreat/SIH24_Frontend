import React from "react";
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";
import Classes from "./ChatbotPage.module.css";
import FileUpload from "./FileUpload";

const ChatBotPage = () => {
  return (
    <div className={Classes.ChatBotPageCont}>
      <LeftPanel />
      <RightPanel />
    </div>
  );
};

export default ChatBotPage;
