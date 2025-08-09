"use client";

import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 700);
    }, 2500); // Shorter, snappier load

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full relative bg-black text-white-900">
      {/* Preloader */}
      {loading && <Preloader fadeOut={fadeOut} />}

      {/* Main Content */}
      <main
        className={`flex flex-col items-center justify-center min-h-screen px-4 transition-opacity duration-700 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-center leading-tight">
          Are you a <span className="text-indigo-500">goon</span> or an{" "}
          <span className="text-pink-500">aadu</span>?
        </h1>
        <p className="mt-4 text-lg text-white-500 text-center max-w-md">
          Discover the truth — one click at a time.
        </p>
      </main>
    </div>
  );
}
