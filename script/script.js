let ascomido = new Audio("ascomido.mp3");
    let gameOve = new Audio("gameover.mp3");
    const canvas = document.getElementById("snekCanvas");
    const ctx = canvas.getContext("2d");

    const box = 20;
    let snek = [{ x: 200, y: 200 }];
    let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
    let score = 0;

    let d;
    document.addEventListener("keydown", direction);

    function direction(event) {
      if (event.keyCode === 37 && d !== "RIGHT") {
        d = "LEFT";
      } else if (event.keyCode === 38 && d !== "DOWN") {
        d = "UP";
      } else if (event.keyCode === 39 && d !== "LEFT") {
        d = "RIGHT";
      } else if (event.keyCode === 40 && d !== "UP") {
        d = "DOWN";
      }
    }

    function collision(head, array) {
      for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
          return true;
        }
      }
      return false;
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < snek.length; i++) {
        ctx.fillStyle = (i === 0) ? "green" : "green";
        ctx.fillRect(snek[i].x, snek[i].y, box, box);
        ctx.font = "none"
        ctx.strokeRect(snek[i].x, snek[i].y, box, box);
      }

      ctx.fillStyle = "red";
      ctx.fillRect(food.x, food.y, box, box);

      let snekX = snek[0].x;
      let snekY = snek[0].y;

      if (d === "LEFT") snekX -= box;
      if (d === "UP") snekY -= box;
      if (d === "RIGHT") snekX += box;
      if (d === "DOWN") snekY += box;

      if (snekX === food.x && snekY === food.y) {
        score++;
ascomido.load();
ascomido.play();
        food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
      } else {
        snek.pop();
      }

      let newHead = { x: snekX, y: snekY };

      if (snekX < 0 || snekY < 0 || snekX >= canvas.width || snekY >= canvas.height || collision(newHead, snek)) {
        gameOver();
      }

      snek.unshift(newHead);

      ctx.fillStyle = "cyan";
      ctx.font = "20px Arial";
      ctx.fillText("Puntuación: " + score, 10, 30);
    }

    let game = setInterval(draw, 100);

    function gameOver() {
      clearInterval(game);
      gameOve.load();
      gameOve.play();
      document.getElementById("gameOverScreen").style.transform = "translateY(0)";
      document.getElementById("finalScore").textContent = score;
    }

    document.getElementById("restartButton").addEventListener("click", function() {
      snek = [{ x: 200, y: 200 }];
     
      food = { x: Math.floor(Math.random() *20) * box, y: Math.floor(Math.random() * 20) * box };
      score = 0;
      d = undefined;
      game = setInterval(draw, 100);
      document.getElementById("gameOverScreen").style.transform = "translateY(-120vh)";
    });
