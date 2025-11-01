// src/pages/ChallengesByRole.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const challengesData = {
  Developer: [
    { id: 1, text: "Fă code review la un coleg", completed: false },
    { id: 2, text: "Publică un update tehnic în feed", completed: false },
    { id: 3, text: "Propune o îmbunătățire la aplicație", completed: false },
  ],
  Manager: [
    { id: 1, text: "Scrie un mesaj motivațional echipei", completed: false },
    { id: 2, text: "Apreciază o postare a unui coleg", completed: false },
    { id: 3, text: "Creează un challenge nou pentru echipă", completed: false },
  ],
  HR: [
    {
      id: 1,
      text: "Postează o poveste despre cultura echipei",
      completed: false,
    },
    { id: 2, text: "Adaugă o felicitare virtuală cuiva", completed: false },
    { id: 3, text: "Creează un nou badge de recunoaștere", completed: false },
  ],
};

// Define gradient per role
const roleGradient = {
  Developer: "from-blue-400 to-blue-600",
  Manager: "from-orange-400 to-orange-600",
  HR: "from-green-400 to-green-600",
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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-indigo-50 flex flex-col items-center p-8">
      {showConfetti && <Confetti />}
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          TODAY'S CHALLENGES FOR{" "}
          <span className="text-indigo-600">{role.toUpperCase()}</span>
        </h1>

        <div className="flex justify-center mb-6">
          <select
            className="border border-indigo-300 rounded-lg p-3 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {Object.keys(challengesData).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="text-md font-semibold mb-2 text-center">
            Progress: {progress.toFixed(0)}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden shadow-inner">
            <motion.div
              className={`h-5 rounded-full bg-gradient-to-r ${roleGradient[role]}`}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>

        {/* Challenge List */}
        <ul className="grid gap-6 sm:grid-cols-2">
          {challenges.map((ch) => (
            <motion.li
              key={ch.id}
              onClick={() => handleComplete(ch.id)}
              className={`relative cursor-pointer p-6 rounded-3xl shadow-lg flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${
                ch.completed
                  ? "bg-green-100 line-through text-green-800"
                  : "bg-white hover:bg-indigo-50"
              }`}
              layout
            >
              <span className="text-xl font-semibold text-center">
                {ch.text}
              </span>
              <AnimatePresence>
                {ch.completed && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="absolute top-2 right-3 text-green-600 text-2xl font-bold"
                  >
                    ✓
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>

        {progress === 100 && (
          <div className="text-center mt-10">
            <p className="font-bold text-green-700 text-2xl animate-pulse">
              🎉 Felicitări! Ai completat toate provocările pentru {role}!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
