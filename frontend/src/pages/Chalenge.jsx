import React, { useEffect, useRef, useState } from "react";

const COUNT = 10; // how many numbers to memorize
const DISPLAY_MS = 5000; // how long numbers are visible (ms)

export default function Challenge() {
  const [numbers, setNumbers] = useState([]);
  const [showNumbers, setShowNumbers] = useState(false);
  const [inputs, setInputs] = useState(Array(COUNT).fill(""));
  const [results, setResults] = useState(null); // array of booleans or null
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  function generateNumbers() {
    // generate COUNT random integers 0-99
    return Array.from({ length: COUNT }, () =>
      Math.floor(Math.random() * 1000000)
    );
  }

  function startChallenge() {
    clearTimeout(timerRef.current);
    const nums = generateNumbers();
    setNumbers(nums);
    setInputs(Array(COUNT).fill(""));
    setResults(null);
    setShowNumbers(true);
    setRunning(true);
    timerRef.current = setTimeout(() => {
      setShowNumbers(false);
    }, DISPLAY_MS);
  }

  function submitAnswers(e) {
    e?.preventDefault();
    const parsed = inputs.map((v) => {
      const n = parseInt(v, 10);
      return Number.isFinite(n) ? n : null;
    });
    const res = parsed.map((v, i) => v === numbers[i]);
    setResults(res);
    setRunning(false);
  }

  function handleChange(idx, value) {
    setInputs((prev) => {
      const copy = [...prev];
      // strip spaces
      copy[idx] = value.replace(/[^\d-]/g, "");
      return copy;
    });
  }

  function reset() {
    clearTimeout(timerRef.current);
    setNumbers([]);
    setInputs(Array(COUNT).fill(""));
    setResults(null);
    setShowNumbers(false);
    setRunning(false);
  }

  const correctCount = results ? results.filter(Boolean).length : 0;

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "24px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Memory Challenge — remember the sequence</h2>
      <div style={{ marginBottom: 12 }}>
        <button
          onClick={startChallenge}
          disabled={running}
          style={{ marginRight: 8 }}
        >
          Start (show {COUNT} numbers for {DISPLAY_MS / 1000}s)
        </button>
        <button onClick={reset}>Reset</button>
      </div>

      <div
        style={{
          padding: 12,
          border: "1px solid #ddd",
          borderRadius: 6,
          minHeight: 72,
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {numbers.length === 0 && (
          <div style={{ color: "#666" }}>No challenge generated yet.</div>
        )}

        {numbers.length > 0 &&
          (showNumbers
            ? // visible numbers
              numbers.map((n, i) => (
                <div
                  key={i}
                  style={{
                    minWidth: 44,
                    textAlign: "center",
                    padding: "6px 8px",
                    background: "#111827",
                    color: "#fff",
                    borderRadius: 4,
                    fontWeight: "600",
                  }}
                >
                  {n}
                </div>
              ))
            : // hidden numbers: show placeholders
              numbers.map((_, i) => (
                <div
                  key={i}
                  style={{
                    minWidth: 44,
                    height: 32,
                    background: "#f3f4f6",
                    borderRadius: 4,
                  }}
                />
              )))}
      </div>

      {/* Input area */}
      {numbers.length > 0 && !showNumbers && (
        <form onSubmit={submitAnswers} style={{ marginTop: 16 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {numbers.map((_, i) => {
              const correct = results ? results[i] : null;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    inputMode="numeric"
                    value={inputs[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    disabled={results !== null}
                    placeholder={String(i + 1)}
                    style={{
                      width: 60,
                      padding: "6px 8px",
                      textAlign: "center",
                      borderRadius: 4,
                      border:
                        correct === null
                          ? "1px solid #ccc"
                          : correct
                          ? "1px solid #16a34a"
                          : "1px solid #ef4444",
                      background:
                        correct === null
                          ? "white"
                          : correct
                          ? "#dcfce7"
                          : "#fee2e2",
                    }}
                  />
                  <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>
                    #{i + 1}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 12 }}>
            <button
              type="submit"
              disabled={results !== null}
              style={{ marginRight: 8 }}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setInputs(Array(COUNT).fill(""))}
              disabled={results !== null}
            >
              Clear
            </button>
          </div>
        </form>
      )}

      {/* Results */}
      {results && (
        <div style={{ marginTop: 16 }}>
          <div>
            Score: {correctCount} / {COUNT}
          </div>
          <div
            style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}
          >
            {numbers.map((n, i) => (
              <div
                key={i}
                style={{
                  padding: "6px 8px",
                  borderRadius: 4,
                  background: results[i] ? "#dcfce7" : "#fee2e2",
                  border: results[i]
                    ? "1px solid #16a34a"
                    : "1px solid #ef4444",
                }}
              >
                <div style={{ fontSize: 12, color: "#444" }}>#{i + 1}</div>
                <div style={{ fontWeight: 700 }}>{n}</div>
                {!results[i] && (
                  <div style={{ fontSize: 12, color: "#9b1c1c" }}>
                    your: {inputs[i] || "—"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
