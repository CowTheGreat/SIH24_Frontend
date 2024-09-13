import React, { useEffect, useRef, useState } from "react";
import styles from "./FeatureLan.module.css";
import Modal from "./Modal"; // Assuming Modal component is present

const features = [
  {
    title: "Two-Factor Authentication",
    description:
      "Enhance security with two-factor authentication to ensure secure user access.",
  },
  {
    title: "Multimedia Handling",
    description:
      "Expand the chatbot to handle voice interactions, images, and documents, and provide visual outputs like charts.",
  },
  {
    title: "Personalized Interaction",
    description:
      "Use machine learning to tailor the chatbot's personality, language, and responses to individual employees.",
  },
  {
    title: "Enterprise System Integration",
    description:
      "Integrate the chatbot with other enterprise systems like HRIS, IT ticketing systems, and learning management systems.",
  },
  {
    title: "Predictive Analytics",
    description:
      "Employ predictive analytics to proactively suggest HR policies, IT solutions, and upcoming events.",
  },
  {
    title: "Advanced Document Processing",
    description:
      "Develop robust document processing capabilities that can extract structured data from documents and provide tailored summaries.",
  },
];

const FeatureLan = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const [isVisible, setIsVisible] = useState(false);
  const featuresRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
    setModalVisible(true);
  };

  return (
    <section
      id="features"
      ref={featuresRef}
      className={`${styles.featuresSection} ${isVisible ? styles.fadeIn : ""}`}
    >
      <h2 className={styles.featuresHeading}>Features</h2>
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div
            key={index}
            className={styles.featureBox}
            onClick={() => handleFeatureClick(feature)}
          >
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
      {modalVisible && (
        <Modal
          feature={selectedFeature}
          onClose={() => setModalVisible(false)}
        />
      )}
    </section>
  );
};

export default FeatureLan;
