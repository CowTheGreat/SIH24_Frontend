import React, { useState, useEffect, useRef } from "react";
import Classes from "./ChatbotContainer.module.css";
import UserMsg from "./UserMsg";
import BotMsg from "./BotMsg";
import chatbotpin from "../../assets/chatbotpin.png";
import msgicon from "../../assets/msgicon.png";

const ChatbotContainer = () => {
  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);
  const [sessionId, setSessionId] = useState(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [youtubeURL, setYoutubeURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // const fetchMessagesByTitle = async (title) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8080/messages/title/${encodeURIComponent(title)}`
  //     );
  //     const data = await response.json();
  //     setMessages(data.messages);
  //   } catch (error) {
  //     console.error("Error fetching messages by title:", error);
  //   }
  // };

  const fetchMessagesByTitle = async (title) => {
    try {
      // Fetch messages by the session title
      const response = await fetch(
        `http://localhost:8080/messages/title/${encodeURIComponent(title)}`
      );
      const data = await response.json();

      // Set the messages and session title in state
      setMessages(data.messages);
      setCurrentTitle(title); // Set the session title
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
      const formData = new FormData();
      formData.append("user_id", "user3");
      formData.append("question", input);
      if (pdfFile) {
        formData.append("pdf", pdfFile);
      }
      if (videoFile) {
        formData.append("video", videoFile);
      }
      try {
        // Send message to AI backend
        const response = await fetch("http://localhost:8080/query", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        const botMessage = { text: data.answer, sender: "bot" };

        // Update the state with the bot message
        setMessages((prevMessages) => [...prevMessages, botMessage]);

        // Send the user message to SQL backend
        await fetch("http://localhost:8080/submit", {
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

        setInput(""); // Clear the input field

        // Send the bot response to SQL backend
        await fetch("http://localhost:8080/submit", {
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
    }
  };

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  //Hairpin
  //Hairpin
  //Hairpin
  //Hairpin

  const toggleOptions = () => setShowOptions(!showOptions);

  const handleFileChange = (e) => {
    if (e.target.name === "pdf") setPdfFile(e.target.files[0]);
    if (e.target.name === "video") setVideoFile(e.target.files[0]);
  };

  const handleUrlChange = (e) => setYoutubeURL(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (pdfFile) formData.append("pdf", pdfFile);
    if (videoFile) formData.append("video", videoFile);
    if (youtubeURL) formData.append("url", youtubeURL);

    try {
      const response = await fetch("http://127.0.0.1:8080/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data.message); // Log the response message
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await fetch(`http://localhost:8080/sessions`);
      const data = await response.json();
      setSessions(data.sessions); // Update the session list in the state
    } catch (error) {
      console.error("Error fetching session titles:", error);
    }
  };

  const messagesEndRef = useRef(null); // Reference to the end of the messages

  // Scroll to bottom when messages are loaded or updated
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Runs every time the messages array changes

  return (
    <div className={Classes.chatcontainer}>
      <div className={Classes.topright}>
        <h1 className={Classes.chathistory}>Chats</h1>
        <div>
          {sessions.length > 0 ? (
            sessions.map((session, index) => (
              <div className={Classes.chatCard} key={index}>
                <button
                  className={Classes.sessionButton}
                  onClick={() => fetchMessagesByTitle(session.session_title)}
                >
                  <div className={Classes.sessionContent}>
                    <div className={Classes.iconWrapper}>
                      <i className="fas fa-comment"></i>{" "}
                      <img src={msgicon} className={Classes.msgicon} />
                    </div>
                    <div className={Classes.textWrapper}>
                      <p className={Classes.sessionTitle}>
                        {session.session_title}
                      </p>
                      {/* <p className={Classes.sessionPreview}>
                        {session.session_preview || "No preview available"}{" "}
                        Add preview text
                      </p> */}
                    </div>
                    <div className={Classes.menuWrapper}>
                      <i className="fas fa-ellipsis-h"></i>{" "}
                      {/* For the dots menu */}
                    </div>
                  </div>
                </button>
              </div>
            ))
          ) : (
            <p>No sessions found</p>
          )}
        </div>
      </div>

      {showOptions && (
        <div className={Classes.optionsContainer}>
          <label>
            Submit PDF:
            <input type="file" name="pdf" onChange={handleFileChange} />
          </label>
          <label>
            Submit Video:
            <input type="file" name="video" onChange={handleFileChange} />
          </label>
          <label>
            Submit YouTube URL:
            <input
              type="text"
              placeholder="Enter YouTube URL"
              onChange={handleUrlChange}
            />
          </label>
          {/* <button onClick={handleSubmit}>Submit</button> */}
        </div>
      )}

      <div
        className={Classes.centerpanel}
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
              <div className={Classes.currentSessionTitle}> {currentTitle}</div>
            </h4>
          )}
        </div>

        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            {msg.sender === "user" ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end", // Aligns user messages to the right
                }}
              >
                <UserMsg message={msg.text} />
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start", // Aligns bot messages to the left
                }}
              >
                <BotMsg message={msg.text} />
              </div>
            )}
          </div>
        ))}

        <div ref={messagesEndRef} />

        {
          <div className={Classes.inputContainer}>
            {/* Attachment Button */}
            <button
              className={Classes.attachmentButton}
              onClick={toggleOptions}
            >
              <img src={chatbotpin} className={Classes.hairpin} alt="Attach" />
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className={Classes.textInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            {/* Send Button */}
            <button className={Classes.sendButton} onClick={sendMessage}>
              <span className={Classes.sendArrow}>&#x27A4;</span>
            </button>
          </div>
        }
      </div>
    </div>
  );
};
export default ChatbotContainer;
