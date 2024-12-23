import React from "react";
import Classes from "./Botload.module.css";
import botIcon from "../../assets/botIcon.png";
import Markdown from "./Markdown";

const BotMsg = (props) => {
  return (
    <div className={Classes.botMsgCont}>
      <img src={botIcon} alt="Bot Icon" className={Classes.botIcon} />
      <div className={Classes.botMsg}>{props.message}</div>
    </div>
  );
};

export default BotMsg;
