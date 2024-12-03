import React from "react";
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";
import Classes from "./ChatBotPage.module.css";

const ChatBotPage = () => {
  return (
    <div className={Classes.ChatBotPageCont}>
      <LeftPanel />
      <RightPanel />
    </div>
  );
};

export default ChatBotPage;
