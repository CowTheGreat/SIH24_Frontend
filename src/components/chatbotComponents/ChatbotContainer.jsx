import React, { useState, useEffect, useRef } from "react";
import Classes from "./ChatbotContainer.module.css";
import UserMsg from "./UserMsg";
import BotMsg from "./BotMsg";
import HistoryPanel from "./HistoryPanel";

const ChatbotContainer = () => {
  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);
  const [sessionId, setSessionId] = useState(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Fetch the session ID when the component mounts
  useEffect(() => {
    const fetchSessionId = async () => {
      let storedSessionId = localStorage.getItem("session_id");
      if (!storedSessionId) {
        const response = await fetch("http://localhost:8080/session");
        const data = await response.json();
        storedSessionId = data.session_id;
        localStorage.setItem("session_id", storedSessionId);
      }
      setSessionId(storedSessionId);
    };

    fetchSessionId();
  }, []);

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

  const sendMessage = async () => {
    if (input.trim() && sessionId) {
      const newMessage = { text: input, sender: "user" };

      // Update the state with the new user message
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Send the user message to the backend
      try {
        // Send message to AI backend
        const response = await fetch("http://localhost:8080/ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: input, session_id: sessionId }),
        });

        const data = await response.json();
        const botMessage = { text: data.answer, sender: "bot" };

        // Update the state with the bot message
        setMessages((prevMessages) => [...prevMessages, botMessage]);

        // Send the user message to SQL backend
        await fetch("http://localhost:8080/save-message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_id: sessionId,
            sender: "user",
            message: input,
          }),
        });

        // Send the bot response to SQL backend
        await fetch("http://localhost:8080/save-message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_id: sessionId,
            sender: "bot",
            message: data.answer,
          }),
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setInput(""); // Clear the input field
    }
  };

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className={Classes.chatcontainer}>
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

      <div className={Classes.inputcontainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>
          <span className={Classes.sendarrow}>&#x27A4;</span>
        </button>
      </div>
    </div>
  );
};

export default ChatbotContainer;
