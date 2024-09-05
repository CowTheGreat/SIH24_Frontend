import { useNavigate } from "react-router-dom"; // Import useNavigate
import LoginBot from "../../assets/loginbot.png";
import Classes from "./MultiFactorAuth.module.css";

function MultiFactor() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGoogleAuth = () => {
    navigate("/multifactor/google"); // Navigate to MultiFactorG page
  };

  return (
    <div className={Classes.pageContainer}>
      <h1>CLETOCITE</h1>
      <div className={Classes.mainContainer}>
        <div className={Classes.loginCircle}>Authenticate</div>
        <div className={Classes.leftContainer}>
          <img src={LoginBot} className={Classes.botimg} alt="bot" />
          <h1>WELCOME</h1>
          <p>Intelligent Enterprise Assistant</p>
        </div>
        <div className={Classes.rightContainer}>
          <div className={Classes.authContainer}>
            <h1>Multi-Factor Authentication</h1>
            <div className={Classes.line}></div>
            <div className={Classes.buttonBox}>
              <button className={Classes.authButton}>Authenticate by SMS</button>
              <button className={Classes.authButton} onClick={handleGoogleAuth}>
                Authenticate via Google Authenticator
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiFactor;
