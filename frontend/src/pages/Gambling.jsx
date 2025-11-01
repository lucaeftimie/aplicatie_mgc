// /aplicatie_mgc/frontend/src/pages/Gambling.jsx
import React, { useState, useEffect, useRef } from "react";
import { Wheel } from "spin-wheel";

export default function Gambling({ initialPoints = 5000, costPerSpin = 1000 }) {
  const JACKPOT_LABEL = "Paid Holiday";
  const sectors = [
    "Small Bonus",
    "Nothing",
    "Voucher",
    "Nothing",
    "Extra Points",
    "Nothing",
    "Discount",
    "Nothing",
    JACKPOT_LABEL,
    "Nothing",
    "Bonus XP",
    "Nothing",
  ];

  const wheelRef = useRef(null);
  const [wheelInstance, setWheelInstance] = useState(null);
  const [points, setPoints] = useState(initialPoints);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState("");

  // Init wheel
  useEffect(() => {
    if (!wheelRef.current) return;

    const wheel = new Wheel(wheelRef.current, {
      sectors,
      radius: 200, // mareste roata
      outerRadius: 220,
      innerRadius: 0,
      spinTime: 5000,
      onFinish: (sector) => {
        setSpinning(false);
        if (sector === JACKPOT_LABEL) {
          setMessage(
            "🎉 Congratulations! You won a Paid Holiday! Contact HR to arrange it."
          );
        } else {
          setMessage(`You landed on "${sector}".`);
        }
      },
    });

    setWheelInstance(wheel);
  }, [wheelRef]);

  const canSpin = () => !spinning && points >= costPerSpin;

  const handleSpin = () => {
    if (!canSpin()) {
      setMessage(points < costPerSpin ? "Not enough points." : "");
      return;
    }
    setPoints((p) => p - costPerSpin);
    setMessage("");
    setSpinning(true);

    // Deterministic spin for jackpot probability
    const JACKPOT_PROB = 0.005;
    let chosenIndex;
    if (Math.random() < JACKPOT_PROB) {
      chosenIndex = sectors.indexOf(JACKPOT_LABEL);
    } else {
      const nonJackpot = sectors
        .map((s, i) => (s !== JACKPOT_LABEL ? i : null))
        .filter((i) => i !== null);
      chosenIndex = nonJackpot[Math.floor(Math.random() * nonJackpot.length)];
    }

    wheelInstance.spinToSector(chosenIndex);
  };

  const handleReset = () => {
    if (spinning) return;
    setPoints(initialPoints);
    setMessage("");
  };

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Arial, sans-serif",
        maxWidth: 720,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h2>Gamble for a Paid Holiday 🎰</h2>
      <p>
        Cost per spin: {costPerSpin} points • Chance to win Paid Holiday: 0.5%
      </p>

      <div
        ref={wheelRef}
        style={{
          margin: "40px auto",
          width: 450,
          height: 450,
          position: "relative",
        }}
      />

      <div style={{ marginBottom: 12, fontSize: 18 }}>
        <strong>Your points:</strong> {points}
      </div>

      <button
        onClick={handleSpin}
        disabled={!canSpin()}
        style={{
          padding: "12px 18px",
          fontSize: 16,
          cursor: canSpin() ? "pointer" : "not-allowed",
          background: "#0b8f6f",
          color: "white",
          border: "none",
          borderRadius: 6,
          marginRight: 12,
          opacity: canSpin() ? 1 : 0.6,
        }}
      >
        {spinning ? "Spinning..." : `Spin (-${costPerSpin} pts)`}
      </button>

      <button
        onClick={handleReset}
        disabled={spinning}
        style={{
          padding: "10px 14px",
          fontSize: 14,
          cursor: spinning ? "not-allowed" : "pointer",
          background: "#ddd",
          border: "none",
          borderRadius: 6,
        }}
      >
        Reset
      </button>

      <div style={{ marginTop: 16, minHeight: 42 }}>
        {message && (
          <div
            style={{
              padding: 12,
              background: message.includes("Congratulations")
                ? "#e9f7ef"
                : "#fff3f3",
              borderRadius: 6,
              border: message.includes("Congratulations")
                ? "1px solid #c6efd5"
                : "1px solid #f5c6c6",
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
