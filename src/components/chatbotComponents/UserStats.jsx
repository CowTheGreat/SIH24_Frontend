import React, { useState, useEffect } from "react";
import axios from "axios";

const UserStats = () => {
  const storedUserData = localStorage.getItem("user_data");
  const user = storedUserData ? JSON.parse(storedUserData) : null;

  // Use the stored username or default to "Guest"
  const uname = user?.name || "Guest";

  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    if (uname && uname !== "Guest") {
      fetchStats();

      const interval = setInterval(() => {
        fetchStats();
      }, 15000);

      return () => clearInterval(interval);
    } else {
      setError("No username found in local storage.");
    }
  }, [uname]);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchStats = async () => {
    try {
      setError("");
      const response = await axios.get(
        `${apiBaseUrl}user-stats/${uname}` // Pass uname as username with dynamic base URL
      );
      setStats(response.data);

      const { unique_sessions, total_rows } = response.data;

      // Calculate memory usage as a percentage
      const memoryUsed = (total_rows / 10000) * 100;

      // Check if memory is 100% used
      if (memoryUsed >= 100) {
        setPopupMessage("Memory usage is at 100%!");
        setShowPopup(true);
      }

      // Check if 20 session titles have been created
      if (unique_sessions >= 20) {
        setPopupMessage("You have created 20 session titles!");
        setShowPopup(true);
      }
    } catch (err) {
      setError(
        "Failed to fetch user stats. Please check the username and try again."
      );
      setStats(null);
    }
  };

  // Fetch stats when the component loads
  useEffect(() => {
    if (uname && uname !== "Guest") {
      fetchStats();
    } else {
      setError("No username found in local storage.");
    }
  }, [uname]);

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  return (
    <div style={{ margin: "20px" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {stats ? (
        <div>
          <h3>Memory Stats</h3>

          <p>Memory Used: {(stats.total_rows / 10000) * 100}%</p>
          <p>
            Session Used {stats.unique_sessions} / 20
            {/* {stats.unique_sessions / 20} */}
          </p>
        </div>
      ) : (
        !error && <p>Loading stats...</p>
      )}

      {/* Popup */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "white",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          <p>{popupMessage}</p>
          <button onClick={closePopup} style={{ marginTop: "10px" }}>
            Close
          </button>
        </div>
      )}
      {/* Overlay */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 999,
          }}
          onClick={closePopup}
        ></div>
      )}
    </div>
  );
};

export default UserStats;
