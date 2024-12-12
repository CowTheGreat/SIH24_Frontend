import React from "react";
import styles from "./FeatureLan.module.css";
import FA from "../../assets/2FA-feat.png";
import Mul from "../../assets/mul-feat.png";
import PER from "../../assets/per-feat.png";
import ENT from "../../assets/ent-feat.png";
import PRED from "../../assets/pred.png";
import ADOC from "../../assets/doc.png";

const features = [
  {
    title: "Two-Factor Authentication",
    description:
      "Enhance security with two-factor authentication to ensure secure user access.",
    image: FA,
  },
  {
    title: "Multimedia Handling",
    description:
      "Expand the chatbot to handle voice interactions, images, and documents, and provide visual outputs like charts.",
    image: Mul,
  },
  {
    title: "Personalized Interaction",
    description:
      "Use machine learning to tailor the chatbot's personality, language, and responses to individual employees.",
    image: PER,
  },
  {
    title: "Enterprise System Integration",
    description:
      "Integrate the chatbot with other enterprise systems like HRIS, IT ticketing systems, and learning management systems.",
    image: ENT,
  },
  {
    title: "Predictive Analytics",
    description:
      "Employ predictive analytics to proactively suggest HR policies, IT solutions, and upcoming events.",
    image: PRED,
  },
  {
    title: "Advanced Document Processing",
    description:
      "Develop robust document processing capabilities that can extract structured data from documents and provide tailored summaries.",
    image: ADOC,
  },
];

const FeatureLan = () => {
  return (
    <section id="features" className={styles.featuresSection}>
      <h2 className={styles.featuresHeading}>Features</h2>
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className={styles.featureImage}
                />
                <h3 className={styles.featureTitle}>{feature.title}</h3>
              </div>
              <div className={styles.cardBack}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureLan;
