"use client";
import { useScores } from "../context/ScoreContext";

export default function ScoreBar() {
  const { combinedScore } = useScores();

  let side = "Neutral",
    color = "bg-gray-400",
    labelColor = "text-gray-600";
  if (combinedScore > 10) {
    side = "Goon";
    color = "bg-red-500";
    labelColor = "text-red-600";
  } else if (combinedScore < -10) {
    side = "Orphan";
    color = "bg-blue-600";
    labelColor = "text-blue-700";
  }

  // Convert to percentage width
  const percent = Math.max(0, Math.min(100, (combinedScore + 100) / 2));

  return (
    <nav className="w-full px-4 py-2 bg-gray-100 shadow sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        <span className="font-bold text-lg text-gray-800">
          Inclination Score:
        </span>
        <div className="relative w-3/4 h-6 rounded bg-gray-300 overflow-hidden mx-4">
          <div
            className={`absolute left-0 top-0 h-full ${color} transition-all duration-700`}
            style={{ width: `${percent}%` }}
          />
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-400" />
        </div>
        <span className={`font-semibold text-lg ${labelColor}`}>{side}</span>
      </div>
    </nav>
  );
}
