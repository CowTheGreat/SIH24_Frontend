import Classes from "../loginComponents/LoginPage.module.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";


function LoginPage(){
    return (
        <>
  <div className={Classes.pageContainer}>
   <h1>CLETOCITE</h1>
   <div className={Classes.mainContainer}>
  
     <div className={Classes.leftContainer}>
        <div className={Classes.loginCircle}>
          Login

        </div>
     </div>
     <div className={Classes.rightContainer}>
      <div className={Classes.loginContainer}>
            <form action="">
            <h1>Login</h1>
            <div className={Classes.line}></div>
                <div className={Classes.inputbox}>
                <FaUser className={Classes.icon}/><input type="text" placeholder='Email' required></input>
                </div>
                <div className={Classes.inputbox}>
                <FaLock className={Classes.icon}/><input type="password" placeholder='Password' required></input>
                </div>
                <div className={Classes.rememberforgot}>
                  <label><input type="checkbox"></input>Remember Me</label>
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