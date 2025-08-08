import React from "react";

const Preloader = ({ fadeOut }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <h1 className="text-white text-4xl md:text-6xl font-extrabold text-center select-none">
        Are you a goon or a aadu?
      </h1>
    </div>
  );
};

export default Preloader;
