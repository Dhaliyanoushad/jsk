"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useScores } from "../context/ScoreContext"; // Make sure path is correct!

export default function ShootingGame() {
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

  // New: Track when to show the "Go to Next Level" button.
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    // DOM elements
    const gameArea = gameAreaRef.current;
    const player = playerRef.current;
    const scoreDisplay = scoreDisplayRef.current;
    const healthBar = healthBarRef.current;

    const shootSound = shootSoundRef.current;
    const hitSound = hitSoundRef.current;
    const damageSound = damageSoundRef.current;
    const deathSound = deathSoundRef.current;
    // loserSong is currently not used but left in game logic
    const gundaSong = gundaSongRef.current;
    const gundaSequence = gundaSequenceRef.current;
    const gundaText = gundaTextRef.current;

    // Game State
    let bullets = [];
    let enemyBullets = [];
    let enemies = [];
    let playerX = 180;
    let score = 0;
    let health = 100;
    let enemiesKilled = 0;
    let gameEnded = false;

    // Initial player position
    if (player) {
      player.style.left = playerX + "px";
      player.style.bottom = "20px";
      player.style.position = "absolute";
      player.style.width = "35px";
      player.style.height = "35px";
      player.style.backgroundColor = "#fff";
      player.style.fontSize = "28px";
      player.style.display = "flex";
      player.style.justifyContent = "center";
      player.style.alignItems = "center";
      player.textContent = "🧑";
    }

    const storyLines = [
      "Nthinaada Konnitt?...",
      "Paranj kodu...",
      "Ulupp indoo?...",
      "Aano??...",
      "Pakshe nee oru GUNDA aan.",
      "Ivan oru Criminal aan Anto sir ee!!! ",
      "YOU.ARE.A.GUNDA.",
    ];

    // --- Changes below this point ---

    function playGundaSequence() {
      if (!gundaSequence || !gundaText || !gundaSong) return;
      gundaSequence.style.display = "flex";
      gundaSong.currentTime = 0;
      gundaSong.play().catch(() => {});

      let i = 0;
      setShowNextButton(false);

      function showNextLine() {
        if (!gundaText) return;
        if (i < storyLines.length) {
          gundaText.innerText = storyLines[i];
          gundaText.style.opacity = "1";
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

      setGameScore(score); // Never clear score context; only set when you win.
    }

    function createBullet(xPx) {
      const bullet = document.createElement("div");
      bullet.className = "bullet";
      bullet.style.position = "absolute";
      bullet.style.left = xPx - 5 + "px";
      bullet.style.bottom = "50px";
      bullet.style.width = "30px";
      bullet.style.height = "30px";
      bullet.style.fontSize = "26px";
      bullet.style.display = "flex";
      bullet.style.justifyContent = "center";
      bullet.style.alignItems = "center";
      bullet.style.pointerEvents = "none";
      bullet.textContent = "🍅";
      gameArea.appendChild(bullet);
      return bullet;
    }

    function createEnemy(xPx) {
      const enemy = document.createElement("div");
      enemy.className = "enemy";
      enemy.style.position = "absolute";
      enemy.style.width = "35px";
      enemy.style.height = "35px";
      enemy.style.backgroundColor = "#ef4444";
      enemy.style.left = xPx + "px";
      enemy.style.top = "10px";
      enemy.style.fontSize = "24px";
      enemy.style.display = "flex";
      enemy.style.alignItems = "center";
      enemy.style.justifyContent = "center";
      enemy.textContent = "💂";
      gameArea.appendChild(enemy);
      return enemy;
    }

    function createEnemyBullet(xPx, yPx) {
      const bullet = document.createElement("div");
      bullet.className = "enemy-bullet";
      bullet.style.position = "absolute";
      bullet.style.width = "8px";
      bullet.style.height = "16px";
      bullet.style.backgroundColor = "#22d3ee";
      bullet.style.left = xPx + "px";
      bullet.style.top = yPx + "px";
      bullet.style.borderRadius = "9999px";
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
      try {
        shootSound.currentTime = 0;
        shootSound.play().catch(() => {});
      } catch {}
      const bullet = createBullet(playerX + 17);
      bullets.push(bullet);
    }

    function spawnEnemies() {
      const positions = [50, 150, 250, 330];
      positions.forEach((pos) => {
        const enemy = createEnemy(pos);
        enemies.push(enemy);
      });
    }

    function enemyShoot() {
      if (gameEnded) return;
      enemies.forEach((enemy) => {
        const bullet = createEnemyBullet(
          enemy.offsetLeft + 17,
          enemy.offsetTop + 40
        );
        enemyBullets.push(bullet);
      });
    }

    function keyHandler(e) {
      if (gameEnded) return; // No keys after win
      if (e.key === "ArrowLeft" || e.key === "a") {
        playerX -= 20;
        if (playerX < 0) playerX = 0;
      } else if (e.key === "ArrowRight" || e.key === "d") {
        playerX += 20;
        if (playerX > 360) playerX = 360;
      } else if (e.key === " " || e.key === "Spacebar") {
        shootBullet();
      }
      if (player) player.style.left = playerX + "px";
    }

    document.addEventListener("keydown", keyHandler);

    let gameLoopId = null;
    function gameLoop() {
      // player bullets move up 🔥
      bullets.forEach((bullet, index) => {
        const bottom = parseInt(bullet.style.bottom, 10) || 0;
        const next = bottom + 7;
        bullet.style.bottom = next + "px";
        if (next > 600) {
          bullet.remove();
          bullets.splice(index, 1);
        }
      });

      // enemy bullets move down
      enemyBullets.forEach((bullet, index) => {
        const top = parseInt(bullet.style.top, 10) || 0;
        const next = top + 4;
        bullet.style.top = next + "px";
        if (next > 600) {
          bullet.remove();
          enemyBullets.splice(index, 1);
          return;
        }
        if (player && isColliding(bullet, player)) {
          try {
            damageSound.currentTime = 0;
            damageSound.play().catch(() => {});
          } catch {}
          enemyBullets.splice(index, 1);
          bullet.remove();
          health -= 20;
          if (health < 0) health = 0;
          if (healthBar) healthBar.style.width = health + "%";
          if (score >= 10) score -= 10;
          if (scoreDisplay) scoreDisplay.textContent = "Score: " + score;

          if (health === 0 && !gameEnded) {
            try {
              deathSound.currentTime = 0;
              deathSound.play().catch(() => {});
            } catch {}
            gameEnded = true;
            alert("💀 Game Over! Final Score: " + score);
            // Don't touch global score.
            window.location.reload();
            return;
          }
        }
      });

      // collisions: bullets vs enemies (💥 effect)
      enemies.forEach((enemy, eIndex) => {
        bullets.forEach((bullet, bIndex) => {
          if (isColliding(bullet, enemy)) {
            try {
              hitSound.currentTime = 0;
              hitSound.play().catch(() => {});
            } catch {}

            // 💥 blast effect!
            enemy.textContent = "💥";
            enemy.style.backgroundColor = "#fbbf24";
            setTimeout(() => {
              enemy.remove();
            }, 250);

            bullet.remove();
            enemies.splice(eIndex, 1);
            bullets.splice(bIndex, 1);
            enemiesKilled++;
            const points = enemiesKilled * 10;
            score += points;
            if (scoreDisplay) scoreDisplay.textContent = "Score: " + score;
          }
        });
      });

      // win condition: ALL changes here
      if (!gameEnded && enemies.length === 0) {
        gameEnded = true;
        playGundaSequence();
        if (gameLoopId) cancelAnimationFrame(gameLoopId);
        document.removeEventListener("keydown", keyHandler);
        return;
      }

      gameLoopId = requestAnimationFrame(gameLoop);
    }

    // Start
    spawnEnemies();
    const enemyInterval = setInterval(enemyShoot, 1000);
    gameLoopId = requestAnimationFrame(gameLoop);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", keyHandler);
      if (gameLoopId) cancelAnimationFrame(gameLoopId);
      clearInterval(enemyInterval);
      bullets.forEach((b) => b.remove());
      enemyBullets.forEach((b) => b.remove());
      enemies.forEach((e) => e.remove());
      [
        shootSound,
        hitSound,
        damageSound,
        deathSound,
        loserSongRef.current,
        gundaSong,
      ].forEach((a) => {
        if (a) {
          try {
            a.pause();
            a.currentTime = 0;
          } catch {}
        }
      });
      if (gundaSequence) gundaSequence.style.display = "none";
    };
  }, [setGameScore]);

  return (
    <div className="min-h-[100dvh] bg-black text-white relative">
      <div className="mx-auto max-w-5xl px-4 py-4">
        {/* Score */}
        <h2
          id="scoreDisplay"
          ref={scoreDisplayRef}
          className="text-center text-lg font-semibold"
        >
          Score: 0
        </h2>

        {/* Health Bar */}
        <div
          id="healthBarContainer"
          className="mx-auto my-3 h-5 w-[200px] border-2 border-white bg-gray-500"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={100}
          aria-label="Health"
        >
          <div
            id="healthBar"
            ref={healthBarRef}
            className="h-full w-full bg-red-600"
          />
        </div>

        {/* Game Area */}
        <div
          id="gameArea"
          ref={gameAreaRef}
          className="relative mx-auto mt-6 h-[600px] w-[400px] overflow-hidden rounded-md border border-white/30 bg-neutral-900"
        >
          <div id="player" ref={playerRef} />
        </div>
      </div>
      {/* Sounds */}
      <audio
        id="shootSound"
        ref={shootSoundRef}
        src="/sounds/tishu.ogg"
        preload="auto"
      />
      <audio id="hitSound" ref={hitSoundRef} src="/sounds/ammae.ogg" />
      <audio id="damageSound" ref={damageSoundRef} src="/sounds/hambadi.ogg" />
      <audio id="deathSound" ref={deathSoundRef} src="/sounds/ayyo.ogg" />
      <audio
        id="loserSong"
        ref={loserSongRef}
        src="/sounds/loser.mp3"
        preload="auto"
      />
      {/* Gunda Sequence Overlay */}
      <div
        id="gundaSequence"
        ref={gundaSequenceRef}
        className="fixed inset-0 z-[9999] hidden flex flex-col items-center justify-center bg-black font-mono text-white text-center"
        style={{ display: showNextButton ? "flex" : undefined }}
      >
        <div
          id="gundaText"
          ref={gundaTextRef}
          className="mx-auto max-w-3xl px-4 text-3xl opacity-0 transition-opacity duration-1000 ease-in-out"
        />
        {showNextButton && (
          <Link
            href="/classifier"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-7 mt-6 text-2xl rounded-lg transition-colors"
          >
            Go to Next Level
          </Link>
        )}
      </div>
      <audio
        id="gundaSong"
        ref={gundaSongRef}
        src="/sounds/gunda.mp3"
        preload="auto"
      />
    </div>
  );
}
