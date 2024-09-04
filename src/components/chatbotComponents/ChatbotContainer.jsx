import React, { useState } from "react";
import "./ChatbotContainer.module.css"; // Adjust the path to your CSS file if needed
import UserMsg from "./UserMsg";
import BotMsg from "./BotMsg";

const ChatbotContainer = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: "user" };
      setMessages([...messages, newMessage]);

      const response = await fetch("http://localhost:5000/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { text: data.message, sender: "bot" };
      setMessages([...messages, newMessage, botMessage]);
      setInput("");
    }
  };

  console.log(messages);

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div>
            {/* key={index}
            className=
            {`message ${
              msg.sender === "user" ? "user-message" : "bot-message"
            }`} */}
            {/* {msg.text} */}
            {msg.sender === "user" ? (
              <UserMsg message={msg.text} />
            ) : (
              <BotMsg message={msg.text} />
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
