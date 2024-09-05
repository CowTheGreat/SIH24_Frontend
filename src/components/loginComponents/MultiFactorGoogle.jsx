import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Classes from "../loginComponents/MultiFactorGoogle.module.css";

function MultiFactorGoogle() {
  const [code, setCode] = useState(new Array(6).fill(""));
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    setCode([...code.map((d, idx) => (idx === index ? element.value : d))]);

    // Automatically focus next box
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredCode = code.join("");
    if (enteredCode.length === 6) {
      // Here you can handle the verification process
      alert("Code submitted: " + enteredCode);
      navigate("/home"); // Redirect to home after verification
    } else {
      alert("Please enter a 6-digit code.");
    }
  };

  return (
    <div className={Classes.pageContainer}>
      <h1>Google Authenticator</h1>
      <form onSubmit={handleSubmit} className={Classes.formContainer}>
        <div className={Classes.codeInputContainer}>
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className={Classes.codeInputBox}
              value={digit}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>
        <button type="submit" className={Classes.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default MultiFactorGoogle;
