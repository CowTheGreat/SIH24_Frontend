import React, { useEffect, useRef, useState } from "react";
import Classes from "./BotMsg.module.css";
import botIcon from "../../assets/botIcon.png";

const BotMsg = (props) => {
  const msgRef = useRef(null); // Reference to the bot message div
  const [heightFactor, setHeightFactor] = useState(1); // State to track the height grow factor

  useEffect(() => {
    const messageLength = props.message.length;
    const originalHeight = 79; // Fixed original height

    if (messageLength > 30) {
      const extraCharacters = messageLength - 30;
      const growFactor = 1 + 0.1 * Math.ceil(extraCharacters / 30); // Increase height by 10% for every 100 characters over the limit
      setHeightFactor(growFactor); // Update height factor
    } else {
      setHeightFactor(1); // Reset to original height if less than 100 characters
    }

    // Adjust the height dynamically using ref
    if (msgRef.current) {
      msgRef.current.style.height = `${originalHeight * heightFactor}px`;
    }
  }, [props.message, heightFactor]); // Runs whenever the message or height factor changes

  return (
    <div className={Classes.botMsgCont}>
      <img src={botIcon} alt="" className={Classes.botIcon} />
      <div className={Classes.botMsg} ref={msgRef}>
        {props.message}
      </div>
    </div>
  );
};

export default BotMsg;
