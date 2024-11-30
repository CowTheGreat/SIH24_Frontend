import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoImage from "../../assets/logo.png";
import styles from "./HeaderLan.module.css";

const HeaderLan = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          src={LogoImage}
          alt="CLETOTRON Logo"
          className={styles.logoImage}
        />
      </div>
      {/* Burger Menu Icon */}
      <div className={styles.burger} onClick={toggleMenu}>
        <div className={`${styles.line} ${menuOpen ? styles.line1 : ""}`} />
        <div className={`${styles.line} ${menuOpen ? styles.line2 : ""}`} />
        <div className={`${styles.line} ${menuOpen ? styles.line3 : ""}`} />
      </div>
      {/* Navigation Menu */}
      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={closeMenu}>
          &times;
        </button>
        <a href="#home" className={styles.navItem} onClick={closeMenu}>
          Home
        </a>
        <a href="#about-us" className={styles.navItem} onClick={closeMenu}>
          About Us
        </a>
        <a href="#features" className={styles.navItem} onClick={closeMenu}>
          Features
        </a>
        <a href="#hr-policies" className={styles.navItem} onClick={closeMenu}>
          HR Policies
        </a>
        <a href="#it-support" className={styles.navItem} onClick={closeMenu}>
          IT Support
        </a>
        <a href="#contact-us" className={styles.navItem} onClick={closeMenu}>
          Contact Us
        </a>
        <NavLink to="/login" className={styles.loginButton} onClick={closeMenu}>
          Go to chatbot
        </NavLink>
      </nav>
    </header>
  );
};

export default HeaderLan;
