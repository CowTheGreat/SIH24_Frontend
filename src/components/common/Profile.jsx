import React, { useState } from "react";
import axios from "axios";
import PinInput from "react-pin-input"; // For the input of 6-digit codes
import Classes from "./Profile.module.css";
import userIcon from "../../assets/userIcon.png";
import qrImage from "../../assets/qr.png";
import { useNavigate } from "react-router-dom";

const UserInfo1 = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [showQrCodePopup, setShowQrCodePopup] = useState(false); // For QR code popup
  const [showAppPasswordPopup, setShowAppPasswordPopup] = useState(false); // For App Password popup
  const [qrCode, setQrCode] = useState(""); // For storing QR code image
  const [pin, setPin] = useState(""); // TOTP pin input
  const [resultMessage, setResultMessage] = useState(""); // To display verification result
  const [appPassword, setAppPassword] = useState(""); // App password input field
  const [is2faEnabled, setIs2faEnabled] = useState(false); // Check if 2FA is enabled
  const [isEmailRetrievalEnabled, setIsEmailRetrievalEnabled] = useState(false); // Toggle state for email retrieval
  const navigate = useNavigate();

  const togglePopup = () => {
    setIsPopupVisible(isPopupVisible);
    navigate("/chatbot");
  };

  const handleEnable2FA = async () => {
    setQrCode(qrImage); // Set the imported image as QR code
    setShowQrCodePopup(true); // Show the QR code popup
    setIs2faEnabled(true);
  };

  const handleCloseQrPopup = () => {
    setShowQrCodePopup(false); // Close QR code popup
    setResultMessage(""); // Reset verification message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verify the 6-digit code
      const verifyResponse = await axios.post("http://localhost:3000/verify", {
        token: pin,
      });
  
      if (verifyResponse.data.verified) {
        setResultMessage("Code verified successfully!");
        console.log("true");
        // Update g_2fa status to 1 in the database
        try {
          const updateResponse = await axios.post("http://localhost:8080/update-2fa-status", {
            email: "gowsrini2004@gmail.com", // Replace with dynamic email if needed
            g_2fa_status:true,
          });
  
          if (updateResponse.status === 200) {
            console.log("2FA status updated successfully.");
            setIs2faEnabled(true); // Update UI toggle state
          } else {
            console.error("Failed to update 2FA status. Please try again.");
          }
        } catch (updateError) {
          console.error("Error updating 2FA status:", updateError);
        }
      } else {
        setResultMessage("Invalid code! Please try again.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setResultMessage("An error occurred during verification.");
    }
  };

  const toggleEmailRetrieval = () => {
    setIsEmailRetrievalEnabled(!isEmailRetrievalEnabled);
    if (!isEmailRetrievalEnabled) {
      setShowAppPasswordPopup(true); // Show app password input popup
    } else {
      console.log("Email retrieval disabled");
    }
  };

  const handleAppPasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (appPassword) {
      try {
        // Send the app password to the backend to update em_retrieval_status
        const response = await axios.post("http://localhost:8080/update-email-retrieval-status", {
          email: "gowsrini2004@gmail.com", 
          em_retrieval_status: true, // Set em_retrieval_status to 1
          app_password:appPassword,
          // Send the app password for validation (if necessary)
        });
  
        if (response.status === 200) {
          console.log("Email retrieval status updated successfully.");
          setShowAppPasswordPopup(false); // Close the app password popup
          setIsEmailRetrievalEnabled(true); // Enable email retrieval toggle
        } else {
          console.error("Failed to update email retrieval status.");
        }
      } catch (error) {
        console.error("Error updating email retrieval status:", error);
      }
    } else {
      // If no password is entered, keep the em_retrieval_status as 0
      console.log("No app password entered. Status remains 0.");
      setShowAppPasswordPopup(false); // Close the app password popup
      setIsEmailRetrievalEnabled(false); // Disable email retrieval toggle
    }
  };
  

  return (
    <div>
      <div className={Classes.popupOverlay}>
        <div className={Classes.popCont}>
          <div className={Classes.popupContent}>
            <h2>User Profile</h2>
            <div className={Classes.line}></div>
            <div className={Classes.infoCont}>
              <div className={Classes.infoItem}>
                <h3>E-Mail Address</h3>
                <p>gowsrini2004@gmail.com</p>
              </div>
            </div>
            <div className={Classes.actionContWrapper}>
            <div className={Classes.actionCont}>
              <div className={Classes.actionInfo}>
                <h3>Enable Google Auth</h3>
                <p>
                  To enable 2 Factor Authentication using Google Authenticator
                  App, please click the enable 2FA button
                </p>
              <label className={Classes.toggleSwitch}>
                <input type="checkbox" checked={is2faEnabled}
                disabled={is2faEnabled}
                onChange={()=> {
                  if(!is2faEnabled){
                    handleEnable2FA();
                  }
                  else{
                    setIs2faEnabled(false);
                  }
                }}></input>
                <span className={Classes.slider}></span>
              </label>
           </div>
            </div>
            <div className={Classes.actionCont}>
              <div className={Classes.actionInfo}>
                <h3>Email Retrieval</h3>
                <p>
                  To retrieve your emails and store them in the database, toggle
                  the switch below.
                </p>
                <label className={Classes.toggleSwitch}>
                  <input
                    type="checkbox"
                    checked={isEmailRetrievalEnabled}
                    disabled={isEmailRetrievalEnabled}
                    onChange={toggleEmailRetrieval}
                  />
                  <span className={Classes.slider}></span>
                </label>
              </div>
            </div>
            <div className={Classes.actionCont}>
              <div className={Classes.actionInfo}>
                <h3>Change Password</h3>
                <p>
                  To reset your password, please click the reset password button
                </p>
              </div>
              <button className={Classes.actionBtn2}>Reset Password</button>
            </div>
            <span className={Classes.closeBtn} onClick={togglePopup}>
              &times;
            </span>
          </div>
          </div>
          <button className={Classes.offBtn}>Sign Out</button>
        </div>
      </div>

      {showQrCodePopup && (
        <div className={Classes.qrPopupOverlay}>
          <div className={Classes.qrPopupContent}>
            <h3>Scan the QR Code with Google Authenticator</h3>
            <img
              src={qrCode}
              alt="Google Authenticator QR Code"
              className={Classes.qrCodeImage}
            />
            <form onSubmit={handleSubmit}>
              <label htmlFor="authCode">
                Enter the 6-digit authentication code generated by your app:
              </label>
              <PinInput
                length={6}
                focus
                type="numeric"
                inputMode="number"
                onChange={(value) => setPin(value)}
                className={Classes.pinInput}
                inputStyle={{
                  borderColor: "#ff9d52",
                  borderRadius: "8px",
                  backgroundColor: "#1e1e1e",
                  color: "#fff",
                }}
                inputFocusStyle={{ borderColor: "#ff632d" }}
              />
              <button type="submit" className={Classes.submitButton}>
                Verify Code
              </button>
            </form>
            {resultMessage && (
              <p className={Classes.resultMessage}>{resultMessage}</p>
            )}
            <button
              onClick={handleCloseQrPopup}
              className={Classes.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showAppPasswordPopup && (
        <div className={Classes.qrPopupOverlay}>
          <div className={Classes.qrPopupContent}>
            <h3>Enter your App Password</h3>
            <form onSubmit={handleAppPasswordSubmit}>
              <label htmlFor="appPassword"></label>
              <input
                type="password"
                id="appPassword"
                value={appPassword}
                onChange={(e) => setAppPassword(e.target.value)}
                className={Classes.inputField}
              />
              <button type="submit" className={Classes.submitButton}>
                Submit
              </button>
            </form>
            <button
              onClick={() => setShowAppPasswordPopup(false)}
              className={Classes.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo1;
