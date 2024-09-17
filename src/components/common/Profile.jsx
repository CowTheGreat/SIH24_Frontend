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
  const [qrCode, setQrCode] = useState(""); // For storing QR code image
  const [pin, setPin] = useState(""); // TOTP pin input
  const [resultMessage, setResultMessage] = useState(""); // To display verification result
  const [is2faEnabled,setIs2faEnabled]=useState(false);// check if 2fa is enabled
  const navigate=useNavigate();

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
      const response = await axios.post("http://localhost:3000/verify", {
        token: pin,
      });
      if (response.data.verified) {
        setResultMessage("Code verified successfully!");
      } else {
        setResultMessage("Invalid code! Please try again.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setResultMessage("An error occurred during verification.");
    }
  };

  return (
    <div>
      {/* <div className={Classes.userCont} onClick={togglePopup}> 
        <img src={userIcon} className={Classes.icon} alt="User Icon" />
        <div>
          <div className={Classes.name}>Aravindhan</div>
          <div className={Classes.pos}>Intern</div>
        </div>
      </div> */}

      {/* User Information Popup */}
      
        <div className={Classes.popupOverlay}>
          <div className={Classes.popCont}>
            <div className={Classes.popupContent}>
              <h2>User Profile</h2>
              <div className={Classes.infoline}>
                <p>User Information</p>
                <div className={Classes.line}></div>
              </div>
              <div className={Classes.infoCont}>
                <div className={Classes.infoItem}>
                  <h3>E-Mail Address</h3>
                  <p>gowsrini2004@gmail.com</p>
                </div>
              </div>
              <div className={Classes.actionCont}>
                <div className={Classes.actionInfo}>
                  <h3>Enable Google Auth</h3>
                  <p>
                    To enable 2 Factor Authentication using Google
                    Authenticator App, please click the enable 2FA button
                  </p>
                </div>
                <button
                  className={Classes.actionBtn}
                  onClick={handleEnable2FA}
                  disabled={is2faEnabled}
                >
                  {is2faEnabled ? "2FA Enabled" : "Enable 2FA"}
                </button>
              </div>
              <div className={Classes.actionCont}>
                <div className={Classes.actionInfo1}>
                  <h3>Enable Google Auth</h3>
                  <p>
                    To enable 2 Factor Authentication using Google
                    Authenticator App, please click the enable 2FA button
                  </p>
                </div>
                <button className={Classes.actionBtn1}>Retrieve Email</button>
              </div>
              <div className={Classes.actionCont}>
                <div className={Classes.actionInfo2}>
                  <h3>Change Password</h3>
                  <p>To reset your password, please click the reset password button</p>
                 
                </div>
                <button className={Classes.actionBtn2}>Reset Password</button>
              </div>
              <span className={Classes.closeBtn} onClick={togglePopup}>
                &times;
              </span>
            </div>
            <button className={Classes.offBtn}>Sign Out</button>
          </div>
        </div>
    

      {/* QR Code Popup with TOTP Form */}
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
            {/* Display verification result */}
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
    </div>
  );
};

export default UserInfo1;