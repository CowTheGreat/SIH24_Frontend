import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import Classes from "../loginComponents/LoginPage.module.css";
import { FaUser, FaLock } from "react-icons/fa";
import LoginBot from "../../assets/loginbot.png";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for redirection

  // Function to handle form submission and send data to the FastAPI backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log("Received data from server:", data); // Check the response

      if (response.ok) {
        localStorage.setItem("jwt_token", data.access_token);
        console.log("JWT token stored:", data.access_token);
        navigate("/multifactor", { state: { email } });
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className={Classes.pageContainer}>
        <div className={Classes.mainContainer}>
          <div className={Classes.loginCircle}>Login</div>
          <div className={Classes.leftContainer}>
            <img src={LoginBot} className={Classes.botimg} alt="Login Bot" />
            <h1>WELCOME</h1>
            <p>Intelligent Enterprise Assistant</p>
          </div>
          <div className={Classes.rightContainer}>
            <div className={Classes.loginContainer}>
              <form onSubmit={handleSubmit}>
                <div className={Classes.uplogin}>
                  <h1>Login</h1>
                  <div className={Classes.line}></div>
                </div>
                <div className={Classes.inputbox}>
                  <FaUser className={Classes.icon} />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={Classes.inputbox}>
                  <FaLock className={Classes.icon} />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className={Classes.rememberforgot}>
                  <label>
                    <input type="checkbox" />
                    Remember Me
                  </label>
                  <a href="#">Forgot Password?</a>
                </div>
                <button type="submit">Login Now</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
