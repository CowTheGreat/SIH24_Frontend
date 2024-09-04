import React from "react";
import Classes from "./BotMsg.module.css";
import botIcon from "../../assets/botIcon.png";

const BotMsg = (props) => {
  return (
    <div className={Classes.botMsgCont}>
      <img src={botIcon} alt="" className={Classes.botIcon} />
      <div className={Classes.botMsg}>{props.message}</div>
    </div>
  );
};

export default BotMsg;
