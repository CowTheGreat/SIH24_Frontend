import React, { useState } from "react";
import styles from "./ActionsComponent.module.css";

const ActionsComponent = () => {
  const [source, setSource] = useState("");
  const [action, setAction] = useState("");

  const handleCreate = () => {
    if (!source || !action) {
      alert("Please select both Source and Action.");
      return;
    }

    const payload = {
      source,
      action,
    };

    // Send the payload to the backend (example with fetch API)
    fetch(`${import.meta.env.VITE_API_BASE_URL}triggers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`, // Include JWT token
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Data sent successfully!");
        console.log(data);
      })
      .catch((error) => {
        alert("Error sending data.");
        console.error(error);
      });
  };

  const handleCancel = () => {
    setSource("");
    setAction("");
  };

  return (
    <div className={styles.container}>
      <h3>Source</h3>
      <select
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className={styles.dropdown}
      >
        <option value="">Select Source</option>
        <option value="source1">Source 1</option>
        <option value="source2">Source 2</option>
      </select>

      <h3>Actions</h3>
      <select
        value={action}
        onChange={(e) => setAction(e.target.value)}
        className={styles.dropdown}
      >
        <option value="">Select Action</option>
        <option value="action1">Action 1</option>
        <option value="action2">Action 2</option>
      </select>

      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${styles.create}`}
          onClick={handleCreate}
        >
          Create
        </button>
        <button
          className={`${styles.button} ${styles.cancel}`}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ActionsComponent;
