import React, { useState, useEffect, useRef } from "react";
import Classes from "./ChatbotContainer.module.css";
import UserMsg from "./UserMsg";
import BotMsg from "./BotMsg";
<<<<<<< HEAD
import { FaFileUpload } from "react-icons/fa";
=======
import chatbotpin from "../../assets/chatbotpin.png";
>>>>>>> 08d95fdb1b54d1dee1620f86bcbdb484e9a72f09

const ChatbotContainer = () => {
  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);
<<<<<<< HEAD
  const fileInputRef = useRef(null);
=======
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
>>>>>>> 08d95fdb1b54d1dee1620f86bcbdb484e9a72f09

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
  //File Upload 
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert('Please choose a file!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('File uploaded successfully:', result.message);
        // Optionally, you can add a message to the chat about the file upload
        const newMessage = { text: `File uploaded: ${file.name}`, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        const errorResult = await response.json();
        console.error('Error uploading file:', errorResult.error);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

<<<<<<< HEAD
  const handleUploadClick = () => {
    // Trigger the hidden file input
    fileInputRef.current.click();
  };

// Scroll to the bottom of the chat box whenever messages change
=======
>>>>>>> 08d95fdb1b54d1dee1620f86bcbdb484e9a72f09
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

  return (
    <div className={Classes.chatcontainer}>
      <div className={Classes.topright}>
        <h1 className={Classes.chathistory}>Chat History</h1>
        <div>
          {sessions.length > 0 ? (
            sessions.map((session, index) => (
              <button
                className={Classes.sessionTitles}
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
<<<<<<< HEAD
      <div className="input-container">
       <FaFileUpload style={{
          fontSize: '24px',  
          color: '#007bff',  
          cursor: 'pointer',
          transition: 'color 0.3s ease', 
          marginRight: '10px',
          
        }}onClick={handleUploadClick}/><input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>
          <span className="send-arrow">&#x27A4;</span>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }} // Hide the file input
          onChange={handleFileChange}
        />
      </div>
=======

      {
        <div className={Classes.inputContainer}>
          {/* Attachment Button */}
          <button className={Classes.attachmentButton} onClick={toggleOptions}>
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
>>>>>>> 08d95fdb1b54d1dee1620f86bcbdb484e9a72f09
    </div>
  );
};
export default ChatbotContainer;
