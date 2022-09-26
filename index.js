const PIEDRA = 1;
const PAPEL = 2;
const TIJERA = 3;
let conclusion = 0;

const opcionPc = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const play = (player) => {
  const pcPiedra = document.getElementById("cardPc-piedra");
  const pcPapel = document.getElementById("cardPc-papel");
  const pcTijera = document.getElementById("cardPc-tijera");
  const pc = opcionPc(1, 3);
  if (pc == PIEDRA) {
    pcPiedra.classList.add("seleccionPc");
    pcPapel.classList.remove("seleccionPc");
    pcTijera.classList.remove("seleccionPc");
    console.log("PC eligio Piedra ", PIEDRA);
    setTimeout(() => {
      pcPiedra.classList.remove("seleccionPc");
    }, 1000 * 3);
  } else if (pc == PAPEL) {
    pcPiedra.classList.remove("seleccionPc");
    pcPapel.classList.add("seleccionPc");
    pcTijera.classList.remove("seleccionPc");
    console.log("PC eligio Papel ", PAPEL);
    setTimeout(() => {
      pcPapel.classList.remove("seleccionPc");
    }, 1000 * 3);
  } else {
    pcPiedra.classList.remove("seleccionPc");
    pcPapel.classList.remove("seleccionPc");
    pcTijera.classList.add("seleccionPc");
    console.log("PC eligio Tijera ", TIJERA);
    setTimeout(() => {
      pcTijera.classList.remove("seleccionPc");
    }, 1000 * 3);
  }

  if (pc == player) {
    console.log("EMPATE ");
    conclusion = 0;
  } else if (
    (player == PIEDRA && pc == TIJERA) ||
    (player == PAPEL && pc == PIEDRA) ||
    (player == TIJERA && pc == PAPEL)
  ) {
    console.log("GANASTE");
    conclusion = 1;
  } else {
    console.log("PERDISTE");
    conclusion = -1;
  }
};

const score = (conclusion) => {
  const scorePc = document.querySelector(".score-pc");
  const scorePlayer = document.querySelector(".score-player");
  let valorPlayer = parseInt(scorePlayer.textContent);
  let valorPc = parseInt(scorePc.textContent);

  conclusion == 1
    ? (scorePlayer.textContent = valorPlayer + conclusion)
    : (scorePc.textContent = valorPc - conclusion);
};

document.addEventListener("click", (e) => {
  if (e.target.matches("#cardPlayer-piedra")) {
    const piedra = document.querySelector(".cardPlayer-piedra");
    piedra.classList.toggle("seleccionPlayer");
    play(PIEDRA);
    score(conclusion);
    setTimeout(() => {
      piedra.classList.toggle("seleccionPlayer");
    }, 1000 * 3);
  }

  if (e.target.matches("#cardPlayer-papel")) {
    const papel = document.querySelector(".cardPlayer-papel");
    papel.classList.toggle("seleccionPlayer");
    play(PAPEL);
    score(conclusion);
    setTimeout(() => {
      papel.classList.toggle("seleccionPlayer");
    }, 1000 * 3);
  }

  if (e.target.matches("#cardPlayer-tijera")) {
    const tijera = document.querySelector(".cardPlayer-tijera");
    tijera.classList.toggle("seleccionPlayer");
    play(TIJERA);
    score(conclusion);
    setTimeout(() => {
      tijera.classList.toggle("seleccionPlayer");
    }, 1000 * 3);
  }
});
