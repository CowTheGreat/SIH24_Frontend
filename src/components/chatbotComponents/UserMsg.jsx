import React from "react";
import Classes from "./UserMsg.module.css";

const UserMsg = (props) => {
  return <div className={Classes.msg}>{props.message}</div>;
};

export default UserMsg;
