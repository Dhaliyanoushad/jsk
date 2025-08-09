"use client";
import { useScores } from "../context/ScoreContext";

export default function ScoreBar() {
  const { combinedScore } = useScores();

  // Defaults
  let side = "Neutral";
  let color = "bg-gray-400";
  let labelColor = "text-gray-600";
  let leftLabelColor = "text-gray-600";
  let rightLabelColor = "text-gray-600";

  if (combinedScore > 10) {
    side = "Goon";
    color = "bg-red-500";
    labelColor = "text-red-600";
    rightLabelColor = "text-red-700 font-semibold";
  } else if (combinedScore < -10) {
    side = "Orphan";
    color = "bg-blue-600";
    labelColor = "text-blue-700";
    leftLabelColor = "text-blue-800 font-semibold";
  }

  // Clamp percent 0–100
  const percent = Math.max(0, Math.min(100, (combinedScore + 100) / 2));

  return (
    <nav className="w-full px-4 py-2 bg-gray-100 shadow sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {/* Left Label */}
        <span className={`font-bold text-lg ${leftLabelColor}`}>Orphan</span>

        {/* Progress Bar */}
        <div className="relative w-3/4 h-6 rounded bg-gray-300 overflow-hidden mx-4">
          <div
            className={`absolute left-0 top-0 h-full ${color} transition-all duration-700`}
            style={{ width: `${percent}%` }}
          />
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-400" />
        </div>

        {/* Right Label */}
        <span className={`font-bold text-lg ${rightLabelColor}`}>Goon</span>
      </div>
    </nav>
  );
}
