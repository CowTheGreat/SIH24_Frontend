import React from "react";
import RobotImage from "../../assets/robot-board.gif";
import styles from "./HeroLan.module.css";

const HeroLan = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Welcome to the Intelligent Enterprise Assistant
        </h1>
        <p className={styles.heroSubtitle}>
          Empowering employees with AI-driven solutions
        </p>
        <button className={styles.ctaButton}>Learn more</button>
      </div>
      <div className={styles.heroImage}>
        <img src={RobotImage} alt="Robot" />
      </div>
    </section>
  );
};

export default HeroLan;
