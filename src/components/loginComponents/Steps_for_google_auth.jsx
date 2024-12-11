import axios from "axios"; // For making HTTP requests
import React, { useState } from "react";
import PinInput from "react-pin-input";
import LoginBot from "../../assets/loginbot.png";
import styles from "./MultiFactorGoogle.module.css";
import Classes from "./MultiFactorAuth.module.css";
import { MdEmail } from "react-icons/md";

const MultiFactorGoogle = () => {
  const [pin, setPin] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://sih24-node-backend.onrender.com/verify",
        // "http://localhost:3000/verify",
        {
          token: pin,
        }
      );
      if (response.data.verified) {
        setResultMessage("Code verified successfully!");
        // Redirect to another page after successful verification
      } else {
        setResultMessage("Invalid code! Please try again.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setResultMessage("An error occurred during verification.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.authBox}>
        <div className={styles.leftSide}>
          <div className={styles.authContent}>
            <img src={LoginBot} alt="Auth Bot" className={styles.authBot} />
            <h1>You have not enabled Google 2FA!!</h1>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.stepForm}>
            <h1 className={styles.steps}> Steps To Enable 2FA</h1>
            <div className={styles.stepspoints}>
              <li>Login via Email authentication</li>
              <li>Go to profile page</li>
              <li>Enable 2Fa</li>
            </div>
            <button type="submit" className={Classes.authButton}>
              {" "}
              <MdEmail className={Classes.icon} />
              Authenticate via Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiFactorGoogle;
