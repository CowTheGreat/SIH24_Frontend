import React, { useState, useEffect } from "react";
import Classes from "./HistoryPanel.module.css"; // Add your custom styles here
import UserMsg from "./UserMsg";
import BotMsg from "./BotMsg";

const HistoryPanel = () => {
  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(`http://localhost:8080/sessions`);
        const data = await response.json();
        setSessions(data.sessions);
      } catch (error) {
        console.error("Error fetching session titles:", error);
      }
    };

    fetchSessions();
  }, []);

  const handleTitleChange = (e) => {
    setCurrentTitle(e.target.value);
  };

  const updateSessionTitle = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/update-session-title`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_id: sessionId, // You need to make sure `sessionId` is available here
            new_title: currentTitle,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setIsEditing(false);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error updating session title:", error);
    }
  };

  const fetchMessagesByTitle = async (title) => {
    try {
      const response = await fetch(
        `http://localhost:8080/messages/title/${encodeURIComponent(title)}`
      );
      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching messages by title:", error);
    }
  };

  return (
    <div>
      <div className={Classes.topright}>
        <h2>Chat History</h2>
        <div>
          {sessions.length > 0 ? (
            sessions.map((session, index) => (
              <button
                key={index}
                onClick={() => fetchMessagesByTitle(session.session_title)}
              >
                {session.session_title}
              </button>
            ))
          ) : (
            <p>No sessions found</p>
          )}
        </div>
      </div>

      <div
        className={Classes.historypanel}
        style={{ overflowY: "auto", maxHeight: "80vh", padding: "10px" }}
      >
        <div className={Classes.titlecontainer}>
          {isEditing ? (
            <input
              type="text"
              value={currentTitle}
              onChange={handleTitleChange}
              onBlur={updateSessionTitle}
              autoFocus
              className="editable-title"
            />
          ) : (
            <h4
              className={Classes.titletext}
              onClick={() => setIsEditing(true)}
            >
              {currentTitle}
            </h4>
          )}
        </div>

        {messages.map((msg, index) => (
          <div key={index}>
            {msg.sender === "user" ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end", // Aligns user messages to the right
                  marginBottom: "10px",
                }}
              >
                <UserMsg message={msg.text} />
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start", // Aligns bot messages to the left
                  marginBottom: "10px",
                }}
              >
                <BotMsg message={msg.text} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;
