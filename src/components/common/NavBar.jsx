import React from "react";
import { NavLink } from "react-router-dom";
import Classes from "./NavBar.module.css"; // Assuming you're using an external CSS file

const NavBar = () => {
  return (
    <div className={Classes.navLinks}>
      <ul>
        <li className={Classes.navLi}>
          <NavLink to="/" className={Classes.navLiA}>
            Home
          </NavLink>
        </li>
        <li className={Classes.navLi}>
          <NavLink to="/login" className={Classes.navLiA}>
            Login
          </NavLink>
        </li>
        <li className={Classes.navLi}>
          <NavLink to="/chatbot" className={Classes.navLiA}>
            Chat Bot
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
