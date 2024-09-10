import React, { useEffect, useRef, useState } from "react";
import styles from "./HrPolicyLan.module.css";

const policies = [
  {
    title: "Scope",
    description:
      "The purpose of this HR policy is to provide guidelines for the development, deployment, and use of the GAIL chatbot, ensuring its ethical, responsible, and secure operation.",
  },
  {
    title: "Data Privacy and Security",
    description:
      "The purpose of this HR policy is to provide guidelines for the development, deployment, and use of the GAIL chatbot, ensuring its ethical, responsible, and secure operation.",
  },
  {
    title: "Bias and Fairness",
    description:
      "The purpose of this HR policy is to provide guidelines for the development, deployment, and use of the GAIL chatbot, ensuring its ethical, responsible, and secure operation.",
  },
];

const HrPolicyLan = () => {
  const [isVisible, setIsVisible] = useState(false);
  const hrPolicyRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (hrPolicyRef.current) {
      observer.observe(hrPolicyRef.current);
    }

    return () => {
      if (hrPolicyRef.current) {
        observer.unobserve(hrPolicyRef.current);
      }
    };
  }, []);

  return (
    <section
      id="hrPolicies"
      ref={hrPolicyRef}
      className={`${styles.hrPolicySection} ${isVisible ? styles.fadeIn : ""}`}
    >
      <h2 className={styles.hrPolicyHeading}>HR Policies</h2>
      <div className={styles.mainPolicy}>
        <h3 className={styles.mainPolicyTitle}>HR Policy for GAIL Chatbot</h3>
        <p className={styles.mainPolicyDescription}>
          The purpose of this HR policy is to provide guidelines for the
          development, deployment, and use of the GAIL chatbot, ensuring its
          ethical, responsible, and secure operation.
        </p>
      </div>
      <div className={styles.policyGrid}>
        {policies.map((policy, index) => (
          <div key={index} className={styles.policyBox}>
            <h3 className={styles.policyTitle}>{policy.title}</h3>
            <p className={styles.policyDescription}>{policy.description}</p>
            <button className={styles.learnMoreBtn}>Learn more</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HrPolicyLan;
