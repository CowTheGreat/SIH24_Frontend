import React, { useState, useEffect, useRef } from "react";
import "./ChatbotContainer.module.css"; // Adjust the path to your CSS file if needed
import UserMsg from "./UserMsg";
import BotMsg from "./BotMsg";
import { FaFileUpload } from "react-icons/fa";

const ChatbotContainer = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);
  const fileInputRef = useRef(null);

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: "user" };

      // Update the state with the new user message
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      try {
        const response = await fetch("http://localhost:5000/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        const botMessage = { text: data.message, sender: "bot" };

        // Update the state with the bot message
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setInput(""); // Clear the input field
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

  const handleUploadClick = () => {
    // Trigger the hidden file input
    fileInputRef.current.click();
  };

// Scroll to the bottom of the chat box whenever messages change
  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className="chat-container">
      <div
        className="chat-box"
        ref={chatBoxRef}
        style={{ overflowY: "auto", maxHeight: "80vh" }}
      >
        {messages.slice(-6).map((msg, index) => (
          <div key={index}>
            {msg.sender === "user" ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end", // Aligns user messages to the right
                  marginBottom: "10px",
                }}
              >
                <UserMsg
                  message={msg.text}
                  style={{
                    backgroundColor: "#007bff", // Background color for user message
                    color: "white", // Text color for user message
                    borderRadius: "10px 10px 0 10px", // Rounded corners for user message
                    padding: "10px",
                    maxWidth: "60%", // Limit width of user message
                    textAlign: "left", // Align text inside the user message
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start", // Aligns bot messages to the left
                  marginBottom: "10px",
                }}
              >
                <BotMsg
                  message={msg.text}
                  style={{
                    backgroundColor: "#e5e5ea", // Background color for bot message
                    color: "black", // Text color for bot message
                    borderRadius: "10px 10px 10px 0", // Rounded corners for bot message
                    padding: "10px",
                    maxWidth: "60%", // Limit width of bot message
                    textAlign: "left", // Align text inside the bot message
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
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
    </div>
  );
};

export default ChatbotContainer;
