import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, feature }) => {
  if (!isOpen || !feature) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalInfo}>
            <h2 className={styles.modalTitle}>{feature.title}</h2>
            <p className={styles.modalDescription}>{feature.description}</p>
          </div>
          <div className={styles.modalImage}>
            <img src={feature.image} alt={feature.title} />
          </div>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
