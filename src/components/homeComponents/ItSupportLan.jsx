import React from "react";
import styles from "./ItSupportLan.module.css";

const itSupportSteps = [
  {
    title: "Internal IT Help Desk",
    description:
      "Access the internal IT help desk through the company portal, email, or phone for IT-related issues.",
  },
  {
    title: "IT Support Portal",
    description:
      "Check the IT Support Portal for a knowledge base where common questions and solutions are available.",
  },
  {
    title: "Direct Contact with IT Department",
    description:
      "If unresolved, you can contact the IT department directly via information provided in your company intranet or handbook.",
  },
];

const ItSupportLan = () => {
  return (
    <section className={`${styles.itSupportSection} ${styles.fadeIn}`}>
      <h2 className={styles.itSupportHeading}>IT Support Details for GAIL</h2>

      <div className={styles.timeline}>
        {itSupportSteps.map((step, index) => (
          <div key={index} className={styles.timelineItem}>
            <div className={styles.timelineContent}>
              <h3 className={styles.timelineTitle}>{step.title}</h3>
              <p className={styles.timelineDescription}>{step.description}</p>
            </div>
            <div className={styles.timelineConnector}>
              <div className={styles.connectorLine}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ItSupportLan;
