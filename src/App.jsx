import React, { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [limit, setLimit] = useState(50); // Početni limit
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleLimitChange = (e) => {
    // Pretvaramo unos u broj i osiguravamo da nije negativan
    const value = parseInt(e.target.value);
    setLimit(value >= 0 ? value : 0);
  };

  return (
    <div className={`app ${isDarkMode ? "dark" : "light"}`}>
      <div className="container">
        <header>
          <h1>Character Counter</h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="theme-btn"
          >
            {isDarkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </header>

        {/* NOVI DIO: Polje za podešavanje limita */}
        <div className="config-area">
          <label htmlFor="limit-input">Set Character Limit: </label>
          <input
            type="number"
            id="limit-input"
            value={limit}
            onChange={handleLimitChange}
            min="0"
          />
        </div>

        <textarea
          placeholder="Start typing here..."
          value={text}
          onChange={handleTextChange}
          maxLength={limit > 0 ? limit : undefined} // Ograničava unos prema limitu
        ></textarea>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="number">{text.length}</span>
            <span className="label">Total Characters</span>
          </div>
          <div className="stat-card">
            {/* Računamo preostale znakove */}
            <span className="number">
              {limit > 0 ? Math.max(0, limit - text.length) : "∞"}
            </span>
            <span className="label">Remaining</span>
          </div>
        </div>

        {/* Upozorenje ako se dosegne limit */}
        {limit > 0 && text.length >= limit && (
          <p className="warning-text">⚠️ Character limit reached!</p>
        )}
      </div>
    </div>
  );
}

export default App;
