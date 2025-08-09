"use client";
import { motion } from "framer-motion";
import Link from "next/link";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
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
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={container}
        className="py-24 px-6 text-center"
      >
        <motion.div variants={item} className="mb-16">
          <span className="text-sm uppercase tracking-widest text-black">
            Discover Your Nature
          </span>
          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl font-light mt-4 mb-6 leading-tight"
          >
            <span className="font-medium text-black">Gunda</span> or{" "}
            <span className="font-medium text-black">Orphan</span>?
          </motion.h1>
          <motion.p
            variants={item}
            className="max-w-2xl mx-auto text-black text-lg"
          >
            A minimalist journey through three dimensions of self-discovery.
          </motion.p>
        </motion.div>

        <motion.div variants={item} className="mt-12">
          <div className="h-px w-24 mx-auto bg-neutral-200 mb-12"></div>
        </motion.div>
      </motion.section>

      {/* Levels as Cards (Horizontal Scroll on Mobile) */}
      <motion.section
        variants={container}
        className="px-6 pb-24 -mt-12 w-full max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quiz Card */}
          <motion.div variants={item}>
            <Link
              href="/quiz"
              className="group h-full block p-8 bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 transition-all duration-300 hover:shadow-sm"
            >
              <div className="flex items-start mb-6">
                <span className="text-xs font-medium px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full">
                  Level 1
                </span>
              </div>
              <h3 className="text-2xl font-light mb-3 text-neutral-800 group-hover:text-neutral-900 transition-colors">
                Cognitive Quiz
              </h3>
              <p className="text-neutral-500 mb-6 leading-relaxed">
                Answer intuitively. Your choices reveal more than you think.
              </p>
              <div className="text-indigo-500 text-sm font-medium flex items-center group-hover:text-indigo-600 transition-colors">
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

          {/* Classifier Card */}
          <motion.div variants={item}>
            <Link
              href="/classifier"
              className="group h-full block p-8 bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 transition-all duration-300 hover:shadow-sm"
            >
              <div className="flex items-start mb-6">
                <span className="text-xs font-medium px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full">
                  Level 2
                </span>
              </div>
              <h3 className="text-2xl font-light mb-3 text-neutral-800 group-hover:text-neutral-900 transition-colors">
                Visual Analysis
              </h3>
              <p className="text-neutral-500 mb-6 leading-relaxed">
                Upload an image. Our AI detects subtle traits invisible to most.
              </p>
              <div className="text-emerald-500 text-sm font-medium flex items-center group-hover:text-emerald-600 transition-colors">
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

          {/* Game Card */}
          <motion.div variants={item}>
            <Link
              href="/game"
              className="group h-full block p-8 bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 transition-all duration-300 hover:shadow-sm"
            >
              <div className="flex items-start mb-6">
                <span className="text-xs font-medium px-3 py-1 bg-amber-50 text-amber-600 rounded-full">
                  Level 3
                </span>
              </div>
              <h3 className="text-2xl font-light mb-3 text-neutral-800 group-hover:text-neutral-900 transition-colors">
                Behavioral Game
              </h3>
              <p className="text-neutral-500 mb-6 leading-relaxed">
                Play reveals truth. Your decisions will categorize you naturally.
              </p>
              <div className="text-amber-500 text-sm font-medium flex items-center group-hover:text-amber-600 transition-colors">
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

      {/* Footer CTA */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-auto py-12 px-6 text-center border-t border-neutral-100"
      >
        <p className="text-neutral-400 text-sm">
          This is not just a test—it's a revelation.
        </p>
      </motion.footer>
    </div>
  );
}