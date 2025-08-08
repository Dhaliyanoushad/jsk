"use client";

import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show preloader for 5–10 seconds (use e.g. 7000ms here)
    const timer = setTimeout(() => {
      setFadeOut(true); // Start fade out
      // Wait for fade-out animation, then hide preloader
      setTimeout(() => setLoading(false), 700); // 700ms matches fade duration
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full relative bg-white flex items-center justify-center">
      {/* Preloader */}
      {loading && <Preloader fadeOut={fadeOut} />}
      {/* Main Home Content */}
      <main
        className={`flex flex-col items-center justify-center w-full min-h-screen transition-opacity duration-700 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1 className="text-black text-5xl md:text-8xl font-black tracking-tight text-center">
          Are you a goon or a aadu???
        </h1>
      </main>
    </div>
  );
}
