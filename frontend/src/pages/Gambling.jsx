import React, { useState, useRef } from "react";

export default function Gambling({ initialPoints = 5000, costPerSpin = 0.5 }) {
  const JACKPOT_PROB = 0.005;
  const sectors = [
    "Small Bonus",
    "Nothing 1",
    "Voucher",
    "Nothing 2",
    "Extra Points",
    "Nothing 3",
    "Discount",
    "Nothing 4",
    "Extra Day Paid Holiday",
    "Nothing 5",
    "Bonus XP",
    "Nothing 6",
  ];

  const jackpotIndex = sectors.indexOf("Extra Day Paid Holiday");
  const sectorCount = sectors.length;
  const sectorAngle = 360 / sectorCount;

  const [points, setPoints] = useState(initialPoints);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState("");
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);

  const canSpin = () => !spinning && points >= costPerSpin;

  const handleSpin = () => {
    if (!canSpin()) {
      setMessage(points < costPerSpin ? "Not enough points." : "");
      return;
    }

    setMessage("");
    setSpinning(true);
    setPoints((p) => p - costPerSpin);

    const win = Math.random() < JACKPOT_PROB;
    let landingIndex;

    if (win) landingIndex = jackpotIndex;
    else {
      const nonJackpot = [];
      for (let i = 0; i < sectorCount; i++)
        if (i !== jackpotIndex) nonJackpot.push(i);
      landingIndex = nonJackpot[Math.floor(Math.random() * nonJackpot.length)];
    }

    // ✅ Correct rotation math for pointer-at-top (12 o’clock)
    // Add +90° so 0° aligns to the top instead of right side
    const rounds = 6 + Math.floor(Math.random() * 3);
    const randomOffset = (Math.random() - 0.5) * sectorAngle * 0.7;
    const targetDeg =
      rounds * 360 +
      (360 - (landingIndex * sectorAngle + sectorAngle / 2)) +
      90 +
      randomOffset;

    const newRotation = rotation + targetDeg;
    setRotation(newRotation);

    if (wheelRef.current) {
      wheelRef.current.style.transition =
        "transform 5s cubic-bezier(.17,.67,.34,1)";
      wheelRef.current.style.transform = `rotate(${newRotation}deg)`;
    }

    setTimeout(() => {
      setSpinning(false);
      setMessage(
        win
          ? "🎉 Congratulations! You won a Paid Holiday!"
          : `Unlucky this time. You landed on "${sectors[landingIndex]}".`
      );
    }, 5200);
  };

  const handleReset = () => {
    if (spinning) return;
    setPoints(initialPoints);
    setMessage("");
    setRotation(0);
    if (wheelRef.current) {
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = "rotate(0deg)";
    }
  };

  const wheelSize = 450;
  const radius = wheelSize / 2 - 40;
  const textRadius = radius - 30;

  const colors = sectors.map((_, i) =>
    i === jackpotIndex ? "#FFD700" : `hsl(${(i * 360) / sectorCount}, 70%, 50%)`
  );
  const gradient = `conic-gradient(${colors
    .map((c, i) => `${c} ${i * sectorAngle}deg ${(i + 1) * sectorAngle}deg`)
    .join(", ")})`;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 space-y-8"
      style={{
        backgroundImage:
          "url(https://travelnevada.com/wp-content/uploads/2020/09/Vegas_Desktop.jpg)",
      }}
    >
      <h2 className="text-3xl font-bold text-gray-800">
        Get a day of Paid Holiday. Free of Charge!
      </h2>
      <p className="text-gray-600">
        Cost per spin: {costPerSpin} points • Chance to win Paid Holiday: 0.05%
      </p>

      <div className="relative flex items-center justify-center">
        {/* Wheel */}
        <div
          ref={wheelRef}
          style={{
            width: wheelSize,
            height: wheelSize,
            borderRadius: "50%",
            background: gradient,
            position: "relative",
            boxShadow: "0 12px 24px rgba(0,0,0,0.3)",
            overflow: "hidden",
          }}
        >
          {/* Curved text */}
          <svg
            viewBox={`0 0 ${wheelSize} ${wheelSize}`}
            width={wheelSize}
            height={wheelSize}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              transform: "rotate(-90deg)", // baseline adjustment
            }}
          >
            {sectors.map((label, i) => {
              const startAngle = i * sectorAngle;
              const endAngle = (i + 1) * sectorAngle;
              const largeArc = sectorAngle > 180 ? 1 : 0;

              const startX =
                wheelSize / 2 +
                textRadius * Math.cos((startAngle * Math.PI) / 180);
              const startY =
                wheelSize / 2 +
                textRadius * Math.sin((startAngle * Math.PI) / 180);
              const endX =
                wheelSize / 2 +
                textRadius * Math.cos((endAngle * Math.PI) / 180);
              const endY =
                wheelSize / 2 +
                textRadius * Math.sin((endAngle * Math.PI) / 180);

              const pathId = `path-${i}`;

              return (
                <g key={i}>
                  <path
                    id={pathId}
                    d={`M${startX},${startY} A${textRadius},${textRadius} 0 ${largeArc},1 ${endX},${endY}`}
                    fill="none"
                  />
                  <text
                    fill="#fff"
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle"
                    style={{
                      textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                      letterSpacing: "0.5px",
                    }}
                  >
                    <textPath
                      href={`#${pathId}`}
                      startOffset="50%"
                      method="align"
                      spacing="auto"
                    >
                      {label}
                    </textPath>
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Center Spin Button */}
          <div
            onClick={handleSpin}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: wheelSize * 0.3,
              height: wheelSize * 0.3,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #10b981, #059669)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 18,
              color: "#fff",
              boxShadow:
                "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 6px rgba(255,255,255,0.2)",
              cursor: spinning ? "default" : "pointer",
              zIndex: 20,
              userSelect: "none",
            }}
          >
            {spinning ? "Spinning..." : "Spin"}
          </div>
        </div>

        {/* 🔻 Pointer (top, pointing down) */}
        <div
          style={{
            position: "absolute",
            top: -32,
            width: 0,
            height: 0,
            borderLeft: "22px solid transparent",
            borderRight: "22px solid transparent",
            borderTop: "34px solid transparent",
            borderBottom: "34px solid #222",
            zIndex: 30,
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
          }}
        />
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-6">
        <div className="text-2xl font-extrabold text-gray-900">
          Your points: <span className="text-green-500">{points}</span>
        </div>

        {message && (
          <div
            className={`p-4 rounded-2xl border w-80 text-center text-md font-semibold shadow-md transition-colors ${
              message.includes("Congratulations")
                ? "bg-green-50 border-green-400 text-green-700"
                : "bg-red-50 border-red-400 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
