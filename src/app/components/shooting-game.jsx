"use client";

import { useEffect, useRef } from "react";

/**
 * ShootingGame (JavaScript + JSX)
 * - Preserves original IDs so your logic can access elements.
 * - Implements your provided script logic inside useEffect with cleanup.
 * - Fixed width/height game area (400x600) to match your coordinate math.
 * - Bullets/enemies created with inline styles (no external CSS required).
 */
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

  useEffect(() => {
    // Element bindings
    const gameArea = gameAreaRef.current;
    const player = playerRef.current;
    const scoreDisplay = scoreDisplayRef.current;
    const healthBar = healthBarRef.current;

    const shootSound = shootSoundRef.current;
    const hitSound = hitSoundRef.current;
    const damageSound = damageSoundRef.current;
    const deathSound = deathSoundRef.current;
    const loserSong = loserSongRef.current;

    const gundaSong = gundaSongRef.current;
    const gundaSequence = gundaSequenceRef.current;
    const gundaText = gundaTextRef.current;

    // State
    let bullets = [];
    let enemyBullets = [];
    let enemies = [];
    let playerX = 180; // within 0..360 for 400px width
    let score = 0;
    let health = 100;
    let enemiesKilled = 0;
    let gameEnded = false;

    // Prepare player initial position
    if (player) {
      player.style.left = playerX + "px";
      player.style.bottom = "20px";
      player.style.position = "absolute";
      player.style.width = "35px";
      player.style.height = "35px";
      player.style.backgroundColor = "#ffffff";
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

    function playGundaSequence() {
      if (!gundaSequence || !gundaText || !gundaSong) return;
      gundaSequence.style.display = "block";
      gundaSong.currentTime = 0;
      gundaSong.play().catch(() => {});

      let i = 0;
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
          }, 1500);
        } else {
          gundaText.innerText = "Press R to Restart";
          gundaText.style.opacity = "1";
        }
      }
      showNextLine();
    }

    // DOM helpers for entities
    function createBullet(xPx) {
      const bullet = document.createElement("div");
      bullet.classList.add("bullet");
      bullet.style.position = "absolute";
      bullet.style.width = "6px";
      bullet.style.height = "12px";
      bullet.style.backgroundColor = "yellow";
      bullet.style.left = xPx + "px";
      bullet.style.bottom = "50px";
      gameArea.appendChild(bullet);
      return bullet;
    }

    function createEnemy(xPx) {
      const enemy = document.createElement("div");
      enemy.classList.add("enemy");
      enemy.style.position = "absolute";
      enemy.style.width = "35px";
      enemy.style.height = "35px";
      enemy.style.backgroundColor = "#ef4444"; // red-500
      enemy.style.left = xPx + "px";
      enemy.style.top = "10px";
      gameArea.appendChild(enemy);
      return enemy;
    }

    function createEnemyBullet(xPx, yPx) {
      const bullet = document.createElement("div");
      bullet.classList.add("enemy-bullet");
      bullet.style.position = "absolute";
      bullet.style.width = "6px";
      bullet.style.height = "12px";
      bullet.style.backgroundColor = "#22d3ee"; // cyan-400
      bullet.style.left = xPx + "px";
      bullet.style.top = yPx + "px";
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

    // Actions
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

    // Keyboard
    function keyHandler(e) {
      if (gameEnded) {
        if (e.key === "r" || e.key === "R") {
          window.location.reload();
        }
        return;
      }
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

    // Game loop
    let gameLoopId = null;
    function gameLoop() {
      // player bullets move up
      bullets.forEach((bullet, index) => {
        const bottom = parseInt(bullet.style.bottom, 10) || 0;
        const next = bottom + 5;
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
            // Optional: loserSong after deathSound ends (commented in your code)
            // deathSound.onended = () => {
            //   loserSong.currentTime = 0
            //   loserSong.play()
            // }
            // You can reload immediately or wait for song end.
            window.location.reload();
            return;
          }
        }
      });

      // collisions: bullets vs enemies
      enemies.forEach((enemy, eIndex) => {
        bullets.forEach((bullet, bIndex) => {
          if (isColliding(bullet, enemy)) {
            try {
              hitSound.currentTime = 0;
              hitSound.play().catch(() => {});
            } catch {}
            enemy.remove();
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

      // win condition
      if (!gameEnded && enemies.length === 0) {
        gameEnded = true;
        playGundaSequence();
        if (gameLoopId) cancelAnimationFrame(gameLoopId);
        document.removeEventListener("keydown", keyHandler);
        return;
      }

      gameLoopId = requestAnimationFrame(gameLoop);
    }

    // Start game
    spawnEnemies();
    const enemyInterval = setInterval(enemyShoot, 1000);
    gameLoopId = requestAnimationFrame(gameLoop);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("keydown", keyHandler);
      if (gameLoopId) cancelAnimationFrame(gameLoopId);
      clearInterval(enemyInterval);
      // Remove spawned DOM nodes
      bullets.forEach((b) => b.remove());
      enemyBullets.forEach((b) => b.remove());
      enemies.forEach((e) => e.remove());
      // Stop any playing audio
      [
        shootSound,
        hitSound,
        damageSound,
        deathSound,
        loserSong,
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
  }, []);

  return (
    <div className="min-h-[100dvh] bg-black text-white">
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

        {/* Game Area (400x600 to match logic) */}
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
        className="fixed inset-0 z-[9999] hidden bg-black font-mono text-white"
        aria-hidden="true"
      >
        <div
          id="gundaText"
          ref={gundaTextRef}
          className="mx-auto mt-[30vh] max-w-3xl px-4 text-center text-3xl opacity-0 transition-opacity duration-1000 ease-in-out"
        />
      </div>

      {/* Gunda Victory Song */}
      <audio
        id="gundaSong"
        ref={gundaSongRef}
        src="/sounds/gunda.mp3"
        preload="auto"
      />
    </div>
  );
}
