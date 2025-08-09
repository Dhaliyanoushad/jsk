"use client";

import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import Test from "./components/Landing"; // Assuming Test is your main content component

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 700);
    }, 5000); // Shorter, snappier load

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full relative bg-black text-white-900">
      {/* Preloader */}
      {loading && <Preloader fadeOut={fadeOut} />}

      {/* Main Content */}
      <Test />
    </div>
  );
}
