import React, { useEffect, useState } from "react";

const Preloader = ({ fadeOut }) => {
  const [showFirstImage, setShowFirstImage] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirstImage((prev) => !prev);
    }, 2500); // swap every 2.5s for smoother feel
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Glowing background */}
        <div className="absolute w-[220px] h-[220px] rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 blur-2xl opacity-40 animate-pulse"></div>

        {/* Rotating image with smooth fade */}
        <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden shadow-2xl border border-white/20">
          <img
            src="/images/gundey.png"
            alt="Preloader 1"
            className={`absolute w-full h-full object-cover rounded-full transition-opacity duration-700 ${
              showFirstImage ? "opacity-100 rotateClockwise" : "opacity-0"
            }`}
          />
          <img
            src="/images/anathan.png"
            alt="Preloader 2"
            className={`absolute w-full h-full object-cover rounded-full transition-opacity duration-700 ${
              showFirstImage
                ? "opacity-0"
                : "opacity-100 rotateAnticlockwise secondImageOffset"
            }`}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes clockwise {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes anticlockwise {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }

        .rotateClockwise {
          animation: clockwise 5s linear infinite;
        }

        .rotateAnticlockwise {
          animation: anticlockwise 5s linear infinite;
        }

        .secondImageOffset {
          object-position: center 55%; /* lower second image without cropping */
        }
      `}</style>
    </div>
  );
};

export default Preloader;
