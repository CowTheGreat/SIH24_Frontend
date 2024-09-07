import React, { useState, useEffect, useRef } from "react";
import "./ChatbotContainer.module.css"; // Adjust the path to your CSS file if needed
import UserMsg from "./UserMsg";
import BotMsg from "./BotMsg";
import FileUpload from "./FileUpload";

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
        const response = await fetch("http://localhost:8080/ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: input }),
        });

        const data = await response.json();
        const botMessage = { text: data.answer, sender: "bot" };
        console.log(botMessage);

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

      <div className="input-container">
        <button>
          <FileUpload />
        </button>
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
