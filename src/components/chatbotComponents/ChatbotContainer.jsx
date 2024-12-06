import React, { useState, useEffect, useRef } from "react";
import Classes from "./ChatbotContainer.module.css";
import UserMsg from "./UserMsg";
import BotMsg from "./BotMsg";
import { FaFileUpload } from "react-icons/fa";
import chatbotpin from "../../assets/chatbotpin.png";
import chatbotpindark from "../../assets/chatbotpindark.png";
import chatbotpinorange from "../../assets/chatbotpinorange.svg";
import Markdown from "./Markdown";
import Onboarding from "./Onboarding"; // Import Onboarding
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import pdf from "../../assets/pdf-icon.png";
import vid from "../../assets/video-icon.png";
import yt from "../../assets/youtube-icon.png";

const ChatbotContainer = () => {
  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);
  const fileInputRef = useRef(null);
  const [sessionId, setSessionId] = useState(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [youtubeURL, setYoutubeURL] = useState("");
  const [query, setQuery] = useState(""); // State to store the search query
  const [results, setResults] = useState([]); // State to store search results
  const [searchClicked, setSearchClicked] = useState(false);

  const [uploadedPDF, setUploadedPDF] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [uploadedURL, setUploadedURL] = useState("");

  // Fetch the session ID when the component mounts
  useEffect(() => {
    const fetchSessionId = async () => {
      let storedSessionId = localStorage.getItem("session_id");
      if (!storedSessionId) {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}session`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`, // Include JWT token
            },
          }
        );
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
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}sessions`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`, // Include JWT token
            },
          }
        );
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
        `${import.meta.env.VITE_API_BASE_URL}update-session-title`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`, // Include JWT token
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

  //to display hest query output

  const fetchMessagesByTitle = async (title) => {
    try {
      setSearchClicked(true);
      // Fetch messages by the session title
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }messages/title/${encodeURIComponent(title)}`
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
      formData.append("user_id", "user3"); // Use the actual user ID
      formData.append("question", input);
      if (pdfFile) {
        formData.append("pdf", pdfFile);
      }
      if (videoFile) {
        formData.append("video", videoFile);
      }

      try {
        // First POST to submit user message
        await fetch(`${import.meta.env.VITE_API_BASE_URL}submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
          body: JSON.stringify({
            session_id: sessionId,
            sender: "user",
            message: input,
          }),
        });

        setInput("");

        // Second POST to send message to AI backend (including files)
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}query`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
            body: formData, // FormData will automatically set the correct content type
          }
        );

        // Handle the streaming response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let botMessage = { text: "", sender: "bot" };

        // Add bot message placeholder
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        let botMessageIndex = null;

        // Read in chunks and update the bot message
        const stream = new ReadableStream({
          async start(controller) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                controller.close();
                break;
              }
              const chunk = decoder.decode(value, { stream: true });
              botMessage.text += chunk;
              setMessages((prevMessages) => {
                if (botMessageIndex === null) {
                  botMessageIndex = prevMessages.length - 1;
                }
                const updatedMessages = [...prevMessages];
                updatedMessages[botMessageIndex].text = botMessage.text;
                return updatedMessages;
              });
            }
          },
        });

        await stream.getReader().read(); // Start reading the stream

        // Send the bot response to SQL backend
        await fetch(`${import.meta.env.VITE_API_BASE_URL}submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
          body: JSON.stringify({
            session_id: sessionId,
            sender: "bot",
            message: botMessage.text,
          }),
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  //Hairpin
  //Hairpin
  //Hairpin
  //Hairpin

  const toggleOptions = () => setShowOptions(!showOptions);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const fileName = files[0].name;
      if (name === "pdf") setUploadedPDF(fileName);
      if (name === "video") setUploadedVideo(fileName);
      toggleOptions(); // Automatically close options after uploading
    }
  };

  const handleUrlChange = (e) => {
    setYoutubeURL(e.target.value);
    if (e.target.value) {
      toggleOptions(); // Automatically close options after entering a URL
    }
  };

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
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}sessions`
      );
      const data = await response.json();
      setSessions(data.sessions); // Update the session list in the state
    } catch (error) {
      console.error("Error fetching session titles:", error);
    }
  };

  // Function to handle search submissions
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send GET request to the FastAPI backend with the search query
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}search/?query=${query}`
      );
      const data = await response.json(); // Parse the JSON response

      // Set the results to be displayed
      setResults(data.sessions || []); // Default to an empty array if no sessions found
    } catch (error) {
      console.error("Error fetching search results:", error); // Log any errors
    }
  };

  const messagesEndRef = useRef(null); // Reference to the end of the messages

  // Scroll to bottom when messages are loaded or updated
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Runs every time the messages array changes

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}download_chat/cow`,
        {
          responseType: "blob", // Important for handling binary files
        }
      );

      // Create a blob from the PDF data
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "chat.pdf"); // File name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the chat:", error);
    }
  };

  return (
    <div className={Classes.chatcontainer}>
      <div className={Classes.topright}>
        <h1 className={Classes.chathistory}>Chat History</h1>
        {/* <SearchBar /> */}

        <div>
          <div className={Classes.searchContainer}>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search sessions..." // Placeholder for the input field
                value={query} // Value is controlled by the query state
                onChange={(e) => setQuery(e.target.value)} // Update the query state on input change
              />
            </form>
            <button
              type="submit"
              onClick={handleSearch}
              className={Classes.searchiconcont}
            >
              <span>&#x1F50D;</span>
            </button>
          </div>

          <div className={Classes.historycard}>
            {results.length > 0
              ? results.map((session, index) => (
                  <div className={Classes.chatCard} key={index}>
                    <button
                      className={Classes.sessionButton}
                      onClick={() => fetchMessagesByTitle(session)}
                    >
                      <div className={Classes.sessionContent}>
                        <div className={Classes.iconWrapper}>
                          <span className={Classes.msgicon}>&#x2709;</span>
                        </div>
                        <div className={Classes.textWrapper}>
                          <p className={Classes.sessionTitle}>{session}</p>
                        </div>
                      </div>
                    </button>
                  </div>
                ))
              : searchClicked && query && <p>No results found for "{query}"</p>}
          </div>
        </div>
        <hr className={Classes.searchline} />
        <div className={Classes.historycard}>
          {sessions.length > 0 ? (
            sessions.map((session, index) => (
              <div className={Classes.chatCard} key={index}>
                <button
                  className={Classes.sessionButton}
                  onClick={() => fetchMessagesByTitle(session.session_title)}
                >
                  <div className={Classes.sessionContent}>
                    <div className={Classes.iconWrapper}>
                      <span className={Classes.msgicon}>&#x2709;</span>
                    </div>
                    <div className={Classes.textWrapper}>
                      <p className={Classes.sessionTitle}>
                        {session.session_title}
                      </p>
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

      <div className={Classes.onboardingleft}>
        {/* Onboarding Component */}
        <Onboarding setInput={setInput} />
      </div>

      {showOptions && (
        <div className={Classes.optionsContainer}>
          <label className={Classes.optionLabel}>
            {uploadedPDF ? (
              <div className={Classes.uploadedFile}>
                <img src={pdf} alt="PDF Icon" className={Classes.iconImage} />
                <span>{uploadedPDF}</span>
              </div>
            ) : (
              <label className={Classes.optionLabel}>
                <img src={pdf} alt="PDF Icon" className={Classes.iconImage} />
                <span>Upload PDF</span>
                <input
                  type="file"
                  name="pdf"
                  onChange={handleFileChange}
                  placeholder="Select a PDF file..."
                />
              </label>
            )}
          </label>
          <label className={Classes.optionLabel}>
            {uploadedVideo ? (
              <div className={Classes.uploadedFile}>
                <img src={vid} alt="Video Icon" className={Classes.iconImage} />
                <span>{uploadedVideo}</span>
              </div>
            ) : (
              <label className={Classes.optionLabel}>
                <img src={vid} alt="Video Icon" className={Classes.iconImage} />
                <span>Upload Video File</span>
                <input
                  type="file"
                  name="video"
                  onChange={handleFileChange}
                  placeholder="Select a video file..."
                />
              </label>
            )}
          </label>
          {uploadedURL ? (
            <div className={Classes.uploadedFile}>
              <img src={yt} alt="YouTube Icon" className={Classes.iconImage} />
              <span>{uploadedURL}</span>
            </div>
          ) : (
            <label className={Classes.youtubeContainer}>
              <img src={yt} alt="YouTube Icon" className={Classes.iconImage} />
              <input
                type="text"
                placeholder="Upload YouTube Link"
                onChange={handleUrlChange}
              />
            </label>
          )}
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
                <Markdown text={msg.text} image={msg.image} />
                {/* <BotMsg message={msg.text} /> */}
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
              <img
                className={Classes.hairpin}
                src={chatbotpindark}
                alt="Attach"
              />
            </button>

            {/* Text Input */}
            {/* <textarea
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
            /> */}
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "20px";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              placeholder="Type a message..."
              className={Classes.textInput}
              rows={1} // Start with a single row
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // Prevent newline on Enter
                  sendMessage();
                  setInput(""); // Clear the input

                  e.target.style.height = "20px"; // Reset height to the original value
                }
              }}
              style={{
                overflow: "hidden", // Prevent scrollbars
                resize: "none", // Disable manual resizing
              }}
            />

            {/* Send Button */}
            <button className={Classes.sendButton} onClick={sendMessage}>
              <span className={Classes.sendArrow}>&#x27A4;</span>
            </button>
            <button className={Classes.downButton} onClick={handleDownload}>
              <FontAwesomeIcon icon={faDownload} />
            </button>
          </div>
        }
      </div>
    </div>
  );
};
export default ChatbotContainer;
