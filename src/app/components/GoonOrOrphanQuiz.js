// components/GoonOrOrphanQuiz.js
"use client";
import React, { useState } from "react";
import { useScores } from "../context/ScoreContext";
import Link from "next/link";

// --- Quiz Data ---
// Using more cinematic and less offensive terms.
const quizQuestions = [
  {
    type: "personality",
    question: "You arrive in a new town with a single goal. What is it?",
    answerOptions: [
      {
        text: "To make a name for myself, so everyone knows who I am.",
        scoreType: "hero",
      },
      {
        text: "To find a long-lost family member or a piece of my past.",
        scoreType: "wanderer",
      },
      {
        text: "To start a new job and live a quiet life.",
        scoreType: "neutral",
      },
    ],
  },
  {
    type: "knowledge",
    question: "In 'Spadikam', what is the primary identity of Aadu Thoma?",
    answerOptions: [
      {
        text: "A kind-hearted teacher",
        isCorrect: false,
        scoreType: "wanderer",
      },
      {
        text: "A powerful local 'mass hero'",
        isCorrect: true,
        scoreType: "hero",
      },
      {
        text: "A struggling lone wanderer",
        isCorrect: false,
        scoreType: "wanderer",
      },
    ],
  },
  {
    type: "personality",
    question: "What's your signature outfit for an important day?",
    answerOptions: [
      {
        text: "A crisp white shirt, top buttons open, maybe a gold chain.",
        scoreType: "hero",
      },
      {
        text: "A simple, faded shirt that holds sentimental value.",
        scoreType: "wanderer",
      },
      { text: "Whatever is clean and ironed.", scoreType: "neutral" },
    ],
  },
  {
    type: "knowledge",
    question: "What is the background of Bellary Raja in 'Rajamanikyam'?",
    answerOptions: [
      {
        text: "He's a fearsome action hero from another town.",
        isCorrect: false,
        scoreType: "hero",
      },
      {
        text: "He's the long-lost son of a wealthy man.",
        isCorrect: false,
        scoreType: "hero",
      },
      {
        text: "He was a lone wanderer adopted by the family patriarch.",
        isCorrect: true,
        scoreType: "wanderer",
      },
    ],
  },
  {
    type: "personality",
    question: "Someone challenges you. What's your go-to dialogue?",
    answerOptions: [
      {
        text: "'Nee arinja? Njan aaranennu...?' (Do you know who I am?)",
        scoreType: "hero",
      },
      {
        text: "'Enikku ee lokathil aarumilla...' (I have no one in this world...)",
        scoreType: "wanderer",
      },
      { text: "'Sorry, I don't want any trouble.'", scoreType: "neutral" },
    ],
  },
  {
    type: "knowledge",
    question: "In the hit movie 'Aavesham', what is Ranga's profession?",
    answerOptions: [
      {
        text: "A flamboyant and powerful Bangalore 'mass hero'.",
        isCorrect: true,
        scoreType: "hero",
      },
      {
        text: "A lonely wanderer who runs a local tea shop.",
        isCorrect: false,
        scoreType: "wanderer",
      },
      {
        text: "A strict college professor.",
        isCorrect: false,
        scoreType: "neutral",
      },
    ],
  },
];

export default function GoonOrOrphanQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [heroScore, setHeroScore] = useState(0);
  const [wandererScore, setWandererScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const { setQuizScore } = useScores();

  const handleAnswerClick = (answer, index) => {
    if (isAnswered) return;
    setSelectedAnswerIndex(index);
    setIsAnswered(true);

    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (currentQuestion.type === "personality") {
      if (answer.scoreType === "hero") setHeroScore((s) => s + 1);
      if (answer.scoreType === "wanderer") setWandererScore((s) => s + 1);
    } else if (currentQuestion.type === "knowledge" && answer.isCorrect) {
      if (answer.scoreType === "hero") setHeroScore((s) => s + 1);
      if (answer.scoreType === "wanderer") setWandererScore((s) => s + 1);
    }

    setTimeout(() => {
      const nextQuestionIndex = currentQuestionIndex + 1;

      // Calculate what the new hero/wanderer score would be after this answer
      let nextHeroScore = heroScore;
      let nextWandererScore = wandererScore;
      if (currentQuestion.type === "personality") {
        if (answer.scoreType === "hero") nextHeroScore += 1;
        if (answer.scoreType === "wanderer") nextWandererScore += 1;
      } else if (currentQuestion.type === "knowledge" && answer.isCorrect) {
        if (answer.scoreType === "hero") nextHeroScore += 1;
        if (answer.scoreType === "wanderer") nextWandererScore += 1;
      }

      if (nextQuestionIndex < quizQuestions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setSelectedAnswerIndex(null);
        setIsAnswered(false);
        // State updates for scores already happened above
      } else {
        setShowResult(true);
        setQuizScore(nextHeroScore); // update global context with FINAL hero score!
      }
    }, 1500);
  };

  // const handleReset = () => {
  //   setCurrentQuestionIndex(0);
  //   setHeroScore(0);
  //   setWandererScore(0);
  //   setShowResult(false);
  //   setIsAnswered(false);
  //   setSelectedAnswerIndex(null);
  //   setQuizScore(null); // Reset ScoreContext for quiz when restart
  // };

  // Dynamically determine the result
  const getResult = () => {
    if (heroScore > wandererScore) {
      return {
        title: "You're a Mass Hero!",
        emoji: "😎",
        description:
          "You've got charisma and command respect. You solve problems with style and your friends know you're the one to call.",
      };
    }
    if (wandererScore > heroScore) {
      return {
        title: "You're a Lone Wanderer!",
        emoji: "❤️‍🩹",
        description:
          "You've got a heart of gold and a powerful backstory. Your journey is about finding your place in the world, and you win people over with your kindness.",
      };
    }
    return {
      title: "You're The Unlikely Hero!",
      emoji: "🥺",
      description:
        "You have the heart of a wanderer but the attitude of a mass hero. You're a complex character, probably the star of a blockbuster movie.",
    };
  };

  // Helper to get button styles
  const getButtonClass = (answer, index) => {
    let baseClass =
      "w-full text-left p-4 my-2 rounded-lg border-2 transition-all duration-300";
    if (!isAnswered) {
      return `${baseClass} border-gray-600 bg-gray-700 hover:bg-gray-600 hover:border-blue-500`;
    }
    if (index === selectedAnswerIndex) {
      if (quizQuestions[currentQuestionIndex].type === "knowledge") {
        return answer.isCorrect
          ? `${baseClass} bg-green-500/20 border-green-500 scale-105`
          : `${baseClass} bg-red-500/20 border-red-500 scale-105`;
      }
      return `${baseClass} bg-blue-500/20 border-blue-500 scale-105`;
    }
    return `${baseClass} border-gray-700 bg-gray-800 opacity-60`;
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
        {showResult ? (
          // --- Result View ---
          <div className="text-center">
            <div className="text-7xl mb-4">{getResult().emoji}</div>
            <h2 className="text-3xl font-bold text-yellow-400 mb-2">
              {getResult().title}
            </h2>
            <p className="text-gray-400 mb-8">{getResult().description}</p>
            <Link
              href="/classifier"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Next
            </Link>
          </div>
        ) : (
          // --- Quiz View ---
          <div>
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </span>
                <span>
                  Hero: {heroScore} | Wanderer: {wandererScore}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-yellow-400 h-2.5 rounded-full"
                  style={{
                    width: `${
                      ((currentQuestionIndex + 1) / quizQuestions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <h2 className="text-2xl font-semibold mb-6 min-h-[80px]">
              {quizQuestions[currentQuestionIndex].question}
            </h2>

            {/* Answers */}
            <div>
              {quizQuestions[currentQuestionIndex].answerOptions.map(
                (answer, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(answer, index)}
                    disabled={isAnswered}
                    className={getButtonClass(answer, index)}
                  >
                    {answer.text}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
