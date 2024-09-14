import React from "react";
import Classes from "./UserMsg.module.css";

const UserMsg = (props) => {
  return (
    <div className={Classes.userMsgCont}>
      <div className={Classes.userMsg}>{props.message}</div>
    </div>
  );
};

export default UserMsg;
