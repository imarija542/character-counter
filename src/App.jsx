import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [excludeSpaces, setExcludeSpaces] = useState(false);
  const [charLimit, setCharLimit] = useState(false);

  const charCount = excludeSpaces
    ? text.replace(/\s/g, "").length
    : text.length;
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const sentenceCount =
    text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
  const readingTime = Math.ceil(wordCount / 200);

  const getLetterDensity = () => {
    const letters = text.toLowerCase().match(/[a-z]/g) || [];
    const counts = {};
    letters.forEach((l) => (counts[l] = (counts[l] || 0) + 1));
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const letterDensity = getLetterDensity();

  return (
    <div className={`app ${isDarkMode ? "dark" : "light"}`}>
      <div className="bg-wrapper">
        <header className="header">
          <img
            src={isDarkMode ? "/logo-dark-theme.svg" : "/logo-light-theme.svg"}
            alt="Logo"
          />
          <button
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            <img
              src={isDarkMode ? "/icon-sun.svg" : "/icon-moon.svg"}
              alt="Toggle"
            />
          </button>
        </header>

        <main className="container">
          <h1 className="main-title">
            Analyze your text <br /> in real-time.
          </h1>

          <div className="input-container">
            <textarea
              placeholder="Start typing here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={charLimit && text.length > 250 ? "error" : ""}
            ></textarea>
            {charLimit && text.length > 250 && (
              <p className="warning">
                <img src="/icon-info.svg" alt="" /> Limit reached! Max 250
                characters.
              </p>
            )}
          </div>

          <div className="options-bar">
            <label>
              <input
                type="checkbox"
                checked={excludeSpaces}
                onChange={() => setExcludeSpaces(!excludeSpaces)}
              />{" "}
              Exclude Spaces
            </label>
            <label>
              <input
                type="checkbox"
                checked={charLimit}
                onChange={() => setCharLimit(!charLimit)}
              />{" "}
              Set Character Limit (250)
            </label>
            <span className="reading-time">
              Approx. reading time: {readingTime} min
            </span>
          </div>

          <div className="stats-grid">
            <div className="stat-box purple">
              <div className="stat-text">
                <h2>{charCount}</h2>
                <p>Total Characters</p>
              </div>
              <img
                src="/pattern-character-count.svg"
                className="pattern"
                alt=""
              />
            </div>
            <div className="stat-box orange">
              <div className="stat-text">
                <h2>{wordCount}</h2>
                <p>Word Count</p>
              </div>
              <img src="/pattern-word-count.svg" className="pattern" alt="" />
            </div>
            <div className="stat-box pink">
              <div className="stat-text">
                <h2>{sentenceCount}</h2>
                <p>Sentence Count</p>
              </div>
              <img
                src="/pattern-sentence-count.svg"
                className="pattern"
                alt=""
              />
            </div>
          </div>

          <section className="density-section">
            <h3>Letter Density</h3>
            {letterDensity.length > 0 ? (
              letterDensity.map(([letter, count]) => (
                <div key={letter} className="density-row">
                  <span className="letter">{letter.toUpperCase()}</span>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${(count / text.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="count">
                    {count} ({((count / text.length) * 100).toFixed(1)}%)
                  </span>
                </div>
              ))
            ) : (
              <p>No characters found</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
