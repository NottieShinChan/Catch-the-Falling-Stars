const game = document.getElementById('game');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');

let score = 0;
let missed = 0;

// Move player with arrow keys
document.addEventListener('keydown', (e) => {
  const playerPos = player.offsetLeft;
  if (e.key === 'ArrowLeft' && playerPos > 0) {
    player.style.left = playerPos - 20 + 'px';
  } else if (e.key === 'ArrowRight' && playerPos < game.offsetWidth - player.offsetWidth) {
    player.style.left = playerPos + 20 + 'px';
  }
});

// Spawn falling stars
function spawnStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.left = Math.random() * (game.offsetWidth - 20) + 'px';
  game.appendChild(star);

  let starFall = setInterval(() => {
    const starTop = parseInt(window.getComputedStyle(star).getPropertyValue('top')) || 0;

    // Move star down
    star.style.top = starTop + 5 + 'px';

    // Check collision with player
    const starLeft = star.offsetLeft;
    const playerLeft = player.offsetLeft;
    if (
      starTop >= game.offsetHeight - player.offsetHeight - 20 &&
      starLeft >= playerLeft &&
      starLeft <= playerLeft + player.offsetWidth
    ) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      star.remove();
      clearInterval(starFall);
    }

    // Remove star if it reaches the bottom
    if (starTop > game.offsetHeight) {
      star.remove();
      missed++;
      clearInterval(starFall);

      // End game if too many misses
      if (missed >= 3) {
        alert(`Game Over! Final Score: ${score}`);
        document.location.reload();
      }
    }
  }, 30);
}

// Spawn stars every second
setInterval(spawnStar, 1000);
