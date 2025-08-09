"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useScores } from "../context/ScoreContext";

export default function ShootingGame() {
  const [visibleImageIndex, setVisibleImageIndex] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [gameEnded, setGameEnded] = useState(false); // ✅ state

  const gameAreaRef = useRef(null);
  const playerRef = useRef(null);
  const scoreDisplayRef = useRef(null);
  const healthBarRef = useRef(null);

  const shootSoundRef = useRef(null);
  const hitSoundRef = useRef(null);
  const damageSoundRef = useRef(null);
  const deathSoundRef = useRef(null);
  const loserSongRef = useRef(null);

  const gundaSongRef = useRef(null);
  const gundaSequenceRef = useRef(null);
  const gundaTextRef = useRef(null);

  const { setGameScore } = useScores();

  useEffect(() => {
    const gameArea = gameAreaRef.current;
    const player = playerRef.current;
    const scoreDisplay = scoreDisplayRef.current;
    const healthBar = healthBarRef.current;

    const shootSound = shootSoundRef.current;
    const hitSound = hitSoundRef.current;
    const damageSound = damageSoundRef.current;
    const deathSound = deathSoundRef.current;
    const gundaSong = gundaSongRef.current;
    const gundaText = gundaTextRef.current;

    let bullets = [];
    let enemyBullets = [];
    let enemies = [];
    let playerX = 180;
    let score = 0;
    let health = 100;
    let enemiesKilled = 0;

    // Player setup
    Object.assign(player.style, {
      left: `${playerX}px`,
      bottom: "20px",
      position: "absolute",
      width: "35px",
      height: "35px",
      backgroundColor: "#fff",
      fontSize: "28px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    });
    player.textContent = "🧑";

    const storyLines = [
      "Nthinaada Konnitt?...",
      "Paranj kodu...",
      "Ulupp indoo?...",
      "Aano??...",
      "Pakshe nee oru GUNDA aan.",
      "Ivan oru Criminal aan Anto sir ee!!!",
      "YOU.ARE.A.GUNDA.",
    ];

    function playGundaSequence() {
      gundaSequenceRef.current.style.display = "flex";
      gundaSong.currentTime = 0;
      gundaSong.play().catch(() => {});

      let i = 0;
      setShowNextButton(false);

      function showNextLine() {
        if (!gundaText) return;
        if (i < storyLines.length) {
          gundaText.innerText = storyLines[i];
          gundaText.style.opacity = "1";
          setVisibleImageIndex(i % 2);

          setTimeout(() => {
            gundaText.style.opacity = "0";
            setTimeout(() => {
              i++;
              showNextLine();
            }, 500);
          }, 1300);
        } else {
          gundaText.innerText = "";
          setTimeout(() => setShowNextButton(true), 300);
        }
      }
      showNextLine();
      setGameScore(score);
    }

    function createBullet(xPx) {
      const bullet = document.createElement("div");
      Object.assign(bullet.style, {
        position: "absolute",
        left: `${xPx - 5}px`,
        bottom: "50px",
        width: "30px",
        height: "30px",
        fontSize: "26px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
      });
      bullet.textContent = "🍅";
      gameArea.appendChild(bullet);
      return bullet;
    }

    function createEnemy(xPx) {
      const enemy = document.createElement("div");
      Object.assign(enemy.style, {
        position: "absolute",
        width: "35px",
        height: "35px",
        backgroundColor: "#ef4444",
        left: `${xPx}px`,
        top: "10px",
        fontSize: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      });
      enemy.textContent = "💂";
      gameArea.appendChild(enemy);
      return enemy;
    }

    function createEnemyBullet(xPx, yPx) {
      const bullet = document.createElement("div");
      Object.assign(bullet.style, {
        position: "absolute",
        width: "8px",
        height: "16px",
        backgroundColor: "#22d3ee",
        left: `${xPx}px`,
        top: `${yPx}px`,
        borderRadius: "9999px",
      });
      gameArea.appendChild(bullet);
      return bullet;
    }

    function isColliding(a, b) {
      if (!a || !b) return false;
      const aRect = a.getBoundingClientRect();
      const bRect = b.getBoundingClientRect();
      return !(
        aRect.bottom < bRect.top ||
        aRect.top > bRect.bottom ||
        aRect.right < bRect.left ||
        aRect.left > bRect.right
      );
    }

    function shootBullet() {
      shootSound.currentTime = 0;
      shootSound.play().catch(() => {});
      bullets.push(createBullet(playerX + 17));
    }

    function spawnEnemies() {
      [50, 150, 250, 330].forEach((pos) => enemies.push(createEnemy(pos)));
    }

    function enemyShoot() {
      if (gameEnded) return;
      enemies.forEach((enemy) => {
        enemyBullets.push(
          createEnemyBullet(enemy.offsetLeft + 17, enemy.offsetTop + 40)
        );
      });
    }

    function keyHandler(e) {
      if (gameEnded) return;
      if (e.key === "ArrowLeft" || e.key === "a") {
        playerX = Math.max(0, playerX - 20);
      } else if (e.key === "ArrowRight" || e.key === "d") {
        playerX = Math.min(360, playerX + 20);
      } else if (e.key === " " || e.key === "Spacebar") {
        shootBullet();
      }
      player.style.left = `${playerX}px`;
    }

    document.addEventListener("keydown", keyHandler);

    function gameLoop() {
      bullets.forEach((bullet, index) => {
        const next = parseInt(bullet.style.bottom, 10) + 7;
        bullet.style.bottom = `${next}px`;
        if (next > 600) {
          bullet.remove();
          bullets.splice(index, 1);
        }
      });

      enemyBullets.forEach((bullet, index) => {
        const next = parseInt(bullet.style.top, 10) + 4;
        bullet.style.top = `${next}px`;
        if (next > 600) {
          bullet.remove();
          enemyBullets.splice(index, 1);
          return;
        }
        if (isColliding(bullet, player)) {
          damageSound.currentTime = 0;
          damageSound.play().catch(() => {});
          enemyBullets.splice(index, 1);
          bullet.remove();
          health = Math.max(0, health - 20);
          healthBar.style.width = `${health}%`;
          if (score >= 10) score -= 10;
          scoreDisplay.textContent = `Score: ${score}`;
          if (health === 0 && !gameEnded) {
            deathSound.currentTime = 0;
            deathSound.play().catch(() => {});
            setGameEnded(true);
            alert(`💀 Game Over! Final Score: ${score}`);
            window.location.reload();
            return;
          }
        }
      });

      enemies.forEach((enemy, eIndex) => {
        bullets.forEach((bullet, bIndex) => {
          if (isColliding(bullet, enemy)) {
            hitSound.currentTime = 0;
            hitSound.play().catch(() => {});
            enemy.textContent = "💥";
            enemy.style.backgroundColor = "#fbbf24";
            setTimeout(() => enemy.remove(), 250);
            bullet.remove();
            enemies.splice(eIndex, 1);
            bullets.splice(bIndex, 1);
            enemiesKilled++;
            score += enemiesKilled * 10;
            scoreDisplay.textContent = `Score: ${score}`;
          }
        });
      });

      if (!gameEnded && enemies.length === 0) {
        setGameEnded(true);
        playGundaSequence();
        return;
      }

      requestAnimationFrame(gameLoop);
    }

    spawnEnemies();
    const enemyInterval = setInterval(enemyShoot, 1000);
    requestAnimationFrame(gameLoop);

    return () => {
      document.removeEventListener("keydown", keyHandler);
      clearInterval(enemyInterval);
      bullets.forEach((b) => b.remove());
      enemyBullets.forEach((b) => b.remove());
      enemies.forEach((e) => e.remove());
    };
  }, [setGameScore, gameEnded]);

  return (
    <div className="min-h-[100dvh] bg-black text-white relative">
      <div className="mx-auto max-w-5xl px-4 py-4">
        <h2 ref={scoreDisplayRef} className="text-center text-lg font-semibold">
          Score: 0
        </h2>
        <div className="mx-auto my-3 h-5 w-[200px] border-2 border-white bg-gray-500">
          <div ref={healthBarRef} className="h-full w-full bg-red-600" />
        </div>

        {/* Fixed space container for game or overlay */}
        <div className="relative mx-auto mt-6 h-[600px] w-[400px] overflow-hidden rounded-md border border-white/30 bg-neutral-900">
          {/* Game area */}
          <div
            id="gameArea"
            ref={gameAreaRef}
            className={`${
              gameEnded ? "hidden" : "block"
            } relative h-full w-full`}
          >
            <div id="player" ref={playerRef} />
          </div>

          {/* Story overlay */}
          <div
            ref={gundaSequenceRef}
            className={`absolute inset-0 z-10 flex-col items-center justify-center bg-black text-center ${
              gameEnded ? "flex" : "hidden"
            }`}
          >
            <div ref={gundaTextRef} className="max-w-3xl px-4 text-3xl mb-6" />
            <div className="relative w-full max-w-xs h-40 mb-8">
              <img
                src="/images/sura.jpg"
                alt="Story Image 1"
                className={`absolute inset-0 object-contain transition-opacity duration-700 ${
                  visibleImageIndex === 0 ? "opacity-100" : "opacity-0"
                }`}
              />
              <img
                src="/images/saru.jpg"
                alt="Story Image 2"
                className={`absolute inset-0 object-contain transition-opacity duration-700 ${
                  visibleImageIndex === 1 ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
            {showNextButton && (
              <Link
                href="/classifier"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-7 mt-6 text-2xl rounded-lg transition-colors"
              >
                Go to Next Level
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Sounds */}
      <audio ref={shootSoundRef} src="/sounds/tishu.ogg" preload="auto" />
      <audio ref={hitSoundRef} src="/sounds/ammae.ogg" />
      <audio ref={damageSoundRef} src="/sounds/hambadi.ogg" />
      <audio ref={deathSoundRef} src="/sounds/ayyo.ogg" />
      <audio ref={loserSongRef} src="/sounds/loser.mp3" preload="auto" />
      <audio ref={gundaSongRef} src="/sounds/gunda.mp3" preload="auto" />
    </div>
  );
}
