// src/app/page.js
import GoonOrOrphanQuiz from "../components/GoonOrOrphanQuiz";
import ScoreBar from "../components/ScoreBar";

export default function Home() {
  return (
    <main>
      <ScoreBar />
      <GoonOrOrphanQuiz />
    </main>
  );
}
