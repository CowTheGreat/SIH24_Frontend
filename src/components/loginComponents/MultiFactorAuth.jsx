import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useLocation } from "react-router-dom"; // Import useNavigate
import LoginBot from "../../assets/loginbot.png";
import Classes from "./MultiFactorAuth.module.css";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { MdEmail } from "react-icons/md";
import { SiGoogleauthenticator } from "react-icons/si";

function MultiFactor() {
  const location = useLocation(); // Get the passed state (email)
  const email = location.state?.email || ""; // Access email from state
  console.log(email);

  const navigate = useNavigate(); // Initialize useNavigate
  const form = useRef(); // Create a ref for the form
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [userOTP, setUserOTP] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const otp = generateOTP();
    setGeneratedOTP(otp);

    // Ensure otp_value exists before setting its value
    if (e.target.otp_value) {
      e.target.otp_value.value = otp; // Set OTP value in hidden field
      e.target.user_email.value = email;
    } else {
      console.error("otp_value input not found!");
      return;
    }

    emailjs
      .sendForm(
        "service_y10mcfg",
        "template_q1j9j0a",
        form.current,
        "IrN5ZpRpHaUSWf83p"
      )
      .then(
        () => {
          console.log("SUCCESS! OTP sent:", otp);
          // Pass OTP and email as state to the authemail page
          navigate("/multifactor/authemail", { state: { email, otp } }); // Pass both email and OTP
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  // Handle Google Authenticator navigation
  const verify = "yes";

  const handleGoogleAuth = () => {
    if (verify == "yes") {
      navigate("/multifactor/google");
    } // Navigate to Google Auth page
    else if (verify == "no") {
      navigate("/multifactor/steps_google");
    }
  };

  return (
    <div className={Classes.pageContainer}>
      <div className={Classes.mainContainer}>
        <div className={Classes.loginCircle}>Authenticate</div>
        <div className={Classes.leftContainer}>
          <img src={LoginBot} className={Classes.botimg} alt="bot" />
          <h1>WELCOME</h1>
          <p>Intelligent Enterprise Assistant</p>
        </div>
        <div className={Classes.rightContainer}>
          <div className={Classes.authContainer}>
            <div className={Classes.authh1}>
              <h1>Multi-Factor Authentication</h1>
            </div>
            <div className={Classes.line}></div>
            <form ref={form} onSubmit={sendEmail}>
              <input type="hidden" name="otp_value" />
              <input
                type="hidden"
                name="user_email"
                placeholder="Your email"
                required
              />
              <button type="submit" className={Classes.authButton}>
                {" "}
                <MdEmail className={Classes.icon} />
                Authenticate via Email
              </button>
            </form>
            <div className={Classes.buttonBox}>
              {/* <button className={Classes.authButton} onClick={sendEmail}> */}
              {/* Authenticate via Email */}
              {/* </button>  */}
              <button className={Classes.authButton} onClick={handleGoogleAuth}>
                <SiGoogleauthenticator className={Classes.icon} /> Google Auth
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiFactor;
