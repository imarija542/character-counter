import React, { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [limit, setLimit] = useState(250);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Kalkulacije
  const charCount = text.length;
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const sentenceCount =
    text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(Boolean).length;

  // Letter Density (izračun učestalosti slova)
  const getLetterDensity = () => {
    const letters = text.toLowerCase().replace(/[^a-z]/g, "");
    const stats = {};
    for (let char of letters) {
      stats[char] = (stats[char] || 0) + 1;
    }
    return Object.entries(stats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5); // Prikazujemo top 5 najčešćih slova
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

        <div className="config-area">
          <label>Set Character Limit:</label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value) || 0)}
            min="0"
          />
        </div>

        <textarea
          placeholder="Start typing here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={limit > 0 ? limit : undefined}
        ></textarea>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="label">Total Characters</span>
            <span className="number">{charCount}</span>
          </div>
          <div className="stat-card">
            <span className="label">Remaining</span>
            <span className="number">
              {limit > 0 ? Math.max(0, limit - charCount) : "∞"}
            </span>
          </div>
          <div className="stat-card">
            <span className="label">Words</span>
            <span className="number">{wordCount}</span>
          </div>
          <div className="stat-card">
            <span className="label">Sentences</span>
            <span className="number">{sentenceCount}</span>
          </div>
        </div>

        {text.length > 0 && (
          <div className="density-section">
            <h3>Letter Density (Top 5)</h3>
            {getLetterDensity().map(([char, count]) => (
              <div key={char} className="density-bar-wrapper">
                <span className="char-name">{char.toUpperCase()}</span>
                <div className="bar-bg">
                  <div
                    className="bar-fill"
                    style={{ width: `${(count / charCount) * 100}%` }}
                  ></div>
                </div>
                <span className="char-percent">
                  {((count / charCount) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
