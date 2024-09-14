import React from "react";
import { NavLink } from "react-router-dom";
import LogoImage from "../../assets/logo.png";
import styles from "./HeaderLan.module.css";

const HeaderLan = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          src={LogoImage}
          alt="CLETOTRON Logo"
          className={styles.logoImage}
        />
      </div>
      <nav className={styles.nav}>
        <a href="#home" className={styles.navItem}>
          Home
        </a>
        <a href="#about-us" className={styles.navItem}>
          About Us
        </a>
        <a href="#features" className={styles.navItem}>
          Features
        </a>
        <a href="#hr-policies" className={styles.navItem}>
          HR Policies
        </a>
        <a href="#it-support" className={styles.navItem}>
          IT Support
        </a>
        <a href="#contact-us" className={styles.navItem}>
          Contact Us
        </a>
        <NavLink to="/login" className={styles.loginButton}>
          Go to chatbot
        </NavLink>
      </nav>
    </header>
  );
};

export default HeaderLan;
