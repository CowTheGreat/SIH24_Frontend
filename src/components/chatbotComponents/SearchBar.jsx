import React, { useState } from "react";
import Classes from "./SearchBar.module.css";

const SearchBar = () => {
  const [query, setQuery] = useState(""); // State to store the search query
  const [results, setResults] = useState([]); // State to store search results

  // Function to handle search submissions
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send GET request to the FastAPI backend with the search query
      const response = await fetch(
        `http://localhost:8080/search/?query=${query}`
      );
      const data = await response.json(); // Parse the JSON response

      // Set the results to be displayed
      setResults(data.sessions || []); // Default to an empty array if no sessions found
    } catch (error) {
      console.error("Error fetching search results:", error); // Log any errors
    }
  };

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

  return (
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
        <button type="submit" onClick={handleSearch}>
          <span>&#x1F50D;</span>
        </button>
      </div>

      <div className={Classes.historycard}>
        {
          results.length > 0
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
            : query && <p>No results found for "{query}"</p> //
        }
      </div>
    </div>
  );
};

{
  /* <ul>
{results.map((session, index) => (
  <li key={index}>{session}</li> // Display session titles as list items
))}
</ul> */
}

export default SearchBar;
