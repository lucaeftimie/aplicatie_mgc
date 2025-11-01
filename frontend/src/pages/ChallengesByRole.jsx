// src/pages/ChallengesByRole.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const challengesData = {
  Developer: [
    { id: 1, text: "Fă code review la un coleg 👀", completed: false },
    { id: 2, text: "Publică un update tehnic în feed 💻", completed: false },
    { id: 3, text: "Propune o îmbunătățire la aplicație 🚀", completed: false },
  ],
  Manager: [
    { id: 1, text: "Scrie un mesaj motivațional echipei 💬", completed: false },
    { id: 2, text: "Apreciază o postare a unui coleg 👏", completed: false },
    {
      id: 3,
      text: "Creează un challenge nou pentru echipă 🧩",
      completed: false,
    },
  ],
  HR: [
    {
      id: 1,
      text: "Postează o poveste despre cultura echipei 🌈",
      completed: false,
    },
    { id: 2, text: "Adaugă o felicitare virtuală cuiva 🪅", completed: false },
    {
      id: 3,
      text: "Creează un nou badge de recunoaștere 🏅",
      completed: false,
    },
  ],
};

export default function ChallengesByRole() {
  const [role, setRole] = useState("Developer");
  const [challenges, setChallenges] = useState(challengesData[role]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`challenges_${role}`);
    if (saved) setChallenges(JSON.parse(saved));
    else setChallenges(challengesData[role]);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(`challenges_${role}`, JSON.stringify(challenges));
  }, [challenges, role]);

  const handleComplete = (id) => {
    const updated = challenges.map((ch) =>
      ch.id === id ? { ...ch, completed: !ch.completed } : ch
    );
    setChallenges(updated);
    const allDone = updated.every((ch) => ch.completed);
    if (allDone) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  };

  const progress =
    (challenges.filter((c) => c.completed).length / challenges.length) * 100;

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-800">
      {showConfetti && <Confetti />}
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4">🎯 Challenges by Role</h1>

        <select
          className="border p-2 rounded mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          {Object.keys(challengesData).map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <div className="mb-4">
          <div className="text-sm font-semibold mb-1">
            Progres: {progress.toFixed(0)}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-blue-500 h-3 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <ul className="space-y-3">
          {challenges.map((ch) => (
            <li
              key={ch.id}
              className={`p-3 rounded-xl cursor-pointer transition ${
                ch.completed ? "bg-green-100 line-through" : "bg-gray-50"
              } hover:bg-blue-50`}
              onClick={() => handleComplete(ch.id)}
            >
              {ch.text}
            </li>
          ))}
        </ul>

        {progress === 100 && (
          <div className="text-center mt-6">
            <p className="font-semibold text-green-700">
              🏆 Felicitări! Ai completat toate provocările pentru rolul {role}!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
