import React from "react";
import AboutUsLan from "./AboutUsLan";
import ContactLan from "./ContactLan"; // Importing ContactLan
import FeatureLan from "./FeatureLan";
import HeaderLan from "./HeaderLan";
import HeroLan from "./HeroLan";
import styles from "./Home.module.css";
import HrPolicyLan from "./HrPolicyLan"; // Importing HrPolicyLan
import ItSupportLan from "./ItSupportLan";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <HeaderLan />
      <HeroLan />

      {/* Glowing divider between sections */}
      <div className={styles.glowingDivider}></div>

      <AboutUsLan />

      <div className={styles.glowingDivider}></div>

      <FeatureLan />

      <div className={styles.glowingDivider}></div>

      {/* <HrPolicyLan /> */}

      {/* <div className={styles.glowingDivider}></div> */}

      <ItSupportLan />

      <div className={styles.glowingDivider}></div>

      {/* Adding ContactLan component */}
      {/* <ContactLan /> */}
    </div>
  );
};

export default Home;
