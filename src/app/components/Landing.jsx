"use client";
import { motion } from "framer-motion";
import Link from "next/link";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", damping: 10 },
  },
};

export default function HomeLanding() {
  return (
    <div className="min-h-screen h-screen bg-neutral-900 flex flex-col text-white">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={container}
        className="py-20 px-6 text-center"
      >
        <motion.div variants={item} className="mb-16">
          <span className="text-sm uppercase tracking-widest text-amber-400">
            Discover Your Nature
          </span>
          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl font-light mt-4 mb-6 leading-tight"
          >
            <span className="font-medium text-red-400">Gunda</span> or{" "}
            <span className="font-medium text-blue-400">Orphan</span>?
          </motion.h1>
          <motion.p
            variants={item}
            className="max-w-2xl mx-auto text-neutral-300 text-lg"
          >
            A minimalist journey through three dimensions of self-discovery.
          </motion.p>
        </motion.div>

        <motion.div variants={item} className="mt-12">
          <div className="h-px w-24 mx-auto bg-neutral-700 mb-12"></div>
        </motion.div>
      </motion.section>

      {/* Levels as Cards */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="visible"
        className="px-6 pb-12 -mt-12 w-full max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quiz */}
          <motion.div variants={item}>
            <Link
              href="/quiz"
              className="group h-full block p-8 bg-neutral-800 rounded-xl border border-neutral-700 hover:border-neutral-500 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start mb-6">
                <span className="text-xs font-medium px-3 py-1 bg-indigo-900 text-indigo-300 rounded-full">
                  Level 1
                </span>
              </div>
              <h3 className="text-2xl font-light mb-3 text-white group-hover:text-indigo-200">
                Cognitive Quiz
              </h3>
              <p className="text-neutral-400 mb-6 leading-relaxed">
                Answer intuitively. Your choices reveal more than you think.
              </p>
              <div className="text-indigo-300 text-sm font-medium flex items-center group-hover:text-indigo-200">
                Begin
                <svg
                  className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          </motion.div>

          {/* Classifier */}
          <motion.div variants={item}>
            <Link
              href="/classifier"
              className="group h-full block p-8 bg-neutral-800 rounded-xl border border-neutral-700 hover:border-neutral-500 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start mb-6">
                <span className="text-xs font-medium px-3 py-1 bg-emerald-900 text-emerald-300 rounded-full">
                  Level 2
                </span>
              </div>
              <h3 className="text-2xl font-light mb-3 text-white group-hover:text-emerald-200">
                Visual Analysis
              </h3>
              <p className="text-neutral-400 mb-6 leading-relaxed">
                Upload an image. Our AI detects subtle traits invisible to most.
              </p>
              <div className="text-emerald-300 text-sm font-medium flex items-center group-hover:text-emerald-200">
                Analyze
                <svg
                  className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          </motion.div>

          {/* Game */}
          <motion.div variants={item}>
            <Link
              href="/game"
              className="group h-full block p-8 bg-neutral-800 rounded-xl border border-neutral-700 hover:border-neutral-500 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start mb-6">
                <span className="text-xs font-medium px-3 py-1 bg-amber-900 text-amber-300 rounded-full">
                  Level 3
                </span>
              </div>
              <h3 className="text-2xl font-light mb-3 text-white group-hover:text-amber-200">
                Behavioral Game
              </h3>
              <p className="text-neutral-400 mb-6 leading-relaxed">
                Play reveals truth. Your decisions will categorize you
                naturally.
              </p>
              <div className="text-amber-300 text-sm font-medium flex items-center group-hover:text-amber-200">
                Play
                <svg
                  className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-auto py-6 px-6 text-center border-t border-neutral-800"
      >
        <p className="text-neutral-500 text-sm">
          This is not just a test—it's a revelation.
        </p>
      </motion.footer>
    </div>
  );
}
