import React, { useState, useEffect, useRef } from "react";
import "./ChatbotContainer.module.css"; // Adjust the path to your CSS file if needed
import UserMsg from "./UserMsg";
import BotMsg from "./BotMsg";

const ChatbotContainer = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);

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
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>
          <span className="send-arrow">&#x27A4;</span>
        </button>
      </div>
    </div>
  );
};

export default ChatbotContainer;
