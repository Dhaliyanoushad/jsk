"use client";

import Link from "next/link";
import ScoreBar from "../components/ScoreBar";

export default function HomeLanding() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12 space-y-16">
      {/* App Title and Intro */}
      <section className="text-center max-w-xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4">
          Are You a Goon or an Orphan?
        </h1>
        <p className="text-lg sm:text-xl text-gray-700">
          Challenge yourself with a 3-level experience:
          <strong> Quiz</strong>, <strong>Image Classifier</strong>, and{" "}
          <strong>Game</strong> — Test your wits, intuition, and have fun!
        </p>
      </section>

      {/* Navigation / Features */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl w-full">
        {/* Level 1: Quiz */}
        <Link
          href="/quiz"
          className="group block rounded-xl bg-white p-6 shadow-lg hover:shadow-2xl transition-shadow border border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600">
            Level 1: Quiz
          </h2>
          <p className="text-gray-600">
            Answer fun and challenging questions to see how well you know the
            difference.
          </p>
        </Link>

        {/* Level 2: Image Classifier */}
        <Link
          href="/classifier"
          className="group block rounded-xl bg-white p-6 shadow-lg hover:shadow-2xl transition-shadow border border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600">
            Level 2: Image Classifier
          </h2>
          <p className="text-gray-600">
            Upload or take a picture and let the AI decide if you’re a goon or
            an orphan.
          </p>
        </Link>

        {/* Level 3: Game */}
        <Link
          href="/game"
          className="group block rounded-xl bg-white p-6 shadow-lg hover:shadow-2xl transition-shadow border border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600">
            Level 3: Game
          </h2>
          <p className="text-gray-600">
            Put your skills to the test in an interactive game designed for fun
            and learning.
          </p>
        </Link>
      </section>

      {/* Footer or Call to Action */}
      <section className="text-center max-w-xl">
        <p className="text-gray-500 italic">
          Ready to find out who you really are? Start your journey now!
        </p>
      </section>
      <ScoreBar score={10} />
    </main>
  );
}
