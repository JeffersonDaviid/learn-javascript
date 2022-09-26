const scorePc = document.querySelector(".score-pc");
const scorePlayer = document.querySelector(".score-player");

const FIRE = 1;
const WATER = 2;
const EARTH = 3;
let conclusion = 0;

const opcionPc = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const play = (player) => {
  const pcWater = document.getElementById("cardPc-water");
  const pcFire = document.getElementById("cardPc-fire");
  const pcEarth = document.getElementById("cardPc-earth");
  const pc = opcionPc(1, 3);

  if (pc == player) {
    console.log("EMPATE ");
    conclusion = 0;
  } else if (
    (player == FIRE && pc == EARTH) ||
    (player == WATER && pc == FIRE) ||
    (player == EARTH && pc == WATER)
  ) {
    console.log("GANASTE");
    conclusion = 1;
  } else {
    console.log("PERDISTE");
    conclusion = -1;
  }

  if (pc == FIRE) {
    pcFire.classList.add("seleccionPc");
    pcWater.classList.remove("seleccionPc");
    pcEarth.classList.remove("seleccionPc");
    console.log("PC eligio Piedra ", FIRE);
    setTimeout(() => {
      pcFire.classList.remove("seleccionPc");
    }, 1000 * 1);
  } else if (pc == WATER) {
    pcFire.classList.remove("seleccionPc");
    pcWater.classList.add("seleccionPc");
    pcEarth.classList.remove("seleccionPc");
    console.log("PC eligio Papel ", WATER);
    setTimeout(() => {
      pcWater.classList.remove("seleccionPc");
    }, 1000 * 1);
  } else {
    pcFire.classList.remove("seleccionPc");
    pcWater.classList.remove("seleccionPc");
    pcEarth.classList.add("seleccionPc");
    console.log("PC eligio Tijera ", EARTH);
    setTimeout(() => {
      pcEarth.classList.remove("seleccionPc");
    }, 1000 * 1);
  }
};

function playerWin(puntosPlayer, puntosPc) {
  if (puntosPlayer + 1 == 5) {
    document.querySelector(".modalSnake").classList.remove("d-none");
    document.querySelector(".modalSnake-center p").textContent = "YOU WIN";
    scorePc.textContent = "0";
    scorePlayer.textContent = "0";
    setTimeout(() => {
      document.querySelector(".modalSnake").classList.add("d-none");
    }, 1000 * 5);
    return true;
  } else if (puntosPc + 1 == 5) {
    document.querySelector(".modalSnake").classList.remove("d-none");
    document.querySelector(".modalSnake-center p").textContent = "YOU LOST";
    scorePc.textContent = "0";
    scorePlayer.textContent = "0";
    setTimeout(() => {
      document.querySelector(".modalSnake").classList.add("d-none");
    }, 1000 * 5);
    return true;
  }
  return false;
}

const score = (conclusion) => {
  let valorPlayer = parseInt(scorePlayer.textContent);
  let valorPc = parseInt(scorePc.textContent);

  if (!playerWin(valorPlayer, valorPc)) {
    conclusion == 1
      ? (scorePlayer.textContent = valorPlayer + conclusion)
      : (scorePc.textContent = valorPc - conclusion);
  }
};

document.addEventListener("click", (e) => {
  if (e.target.matches("#cardPlayer-piedra")) {
    const piedra = document.querySelector(".cardPlayer-piedra");
    piedra.classList.toggle("seleccionPlayer");
    play(FIRE);
    score(conclusion);
    setTimeout(() => {
      piedra.classList.toggle("seleccionPlayer");
    }, 1000 * 1);
  }

  if (e.target.matches("#cardPlayer-papel")) {
    const papel = document.querySelector(".cardPlayer-papel");
    papel.classList.toggle("seleccionPlayer");
    play(WATER);
    score(conclusion);
    setTimeout(() => {
      papel.classList.toggle("seleccionPlayer");
    }, 1000 * 1);
  }

  if (e.target.matches("#cardPlayer-tijera")) {
    const tijera = document.querySelector(".cardPlayer-tijera");
    tijera.classList.toggle("seleccionPlayer");
    play(EARTH);
    score(conclusion);
    setTimeout(() => {
      tijera.classList.toggle("seleccionPlayer");
    }, 1000 * 1);
  }

  if (e.target.matches(".modalSnake")) {
    console.log("diste click es modal");
  }
});
