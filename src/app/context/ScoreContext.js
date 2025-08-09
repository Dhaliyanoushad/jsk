"use client";
import React, { createContext, useContext, useState } from "react";

const ScoreContext = createContext();

export function ScoreProvider({ children }) {
  const [gameScore, setGameScore] = useState(null); // 10-100
  const [imageScore, setImageScore] = useState(null); // 0–100 (percent)
  const [quizScore, setQuizScore] = useState(null); // 0–6

  // Normalization helpers
  function normalizeGame(score) {
    if (score == null) return 0;
    return ((score - 10) / 90) * 200 - 100;
  }
  function normalizeImage(score) {
    if (score == null) return 0;
    return score * 2 - 100;
  }
  function normalizeQuiz(score) {
    if (score == null) return 0;
    return (score / 6) * 200 - 100;
  }

  const normalizedGame = normalizeGame(gameScore);
  const normalizedImage = normalizeImage(imageScore);
  const normalizedQuiz = normalizeQuiz(quizScore);

  const combinedScore = (normalizedGame + normalizedImage + normalizedQuiz) / 3;

  return (
    <ScoreContext.Provider
      value={{
        gameScore,
        setGameScore,
        imageScore,
        setImageScore,
        quizScore,
        setQuizScore,
        combinedScore,
        normalizedGame,
        normalizedImage,
        normalizedQuiz,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
}

export function useScores() {
  return useContext(ScoreContext);
}
