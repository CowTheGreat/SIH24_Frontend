import Classes from "../common/NavBar.module.css";
import { NavLink } from "react-router-dom";

function MainHeader() {
  return (
    <>
      <nav className={Classes.navbar}>
        <div className={Classes.container}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/chatbot">Chat Bot</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default MainHeader;
