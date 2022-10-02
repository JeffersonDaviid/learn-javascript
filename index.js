let counter = document.querySelector(".counter");

function aumentarContador() {
  let valorAux = parseInt(document.querySelector(".counter").textContent) + 1;
  counter.textContent = valorAux;
  if (valorAux > 0) counter.style.color = "green";
  if (valorAux == 0) counter.style.color = "#000";
}
function disminuirContador() {
  let valorAux = parseInt(document.querySelector(".counter").textContent) - 1;
  counter.textContent = valorAux;
  if (valorAux < 0) counter.style.color = "red";
  if (valorAux == 0) counter.style.color = "#000";
}
function reinciarContador() {
  counter.textContent = "0";
  counter.style.color = "#000";
}

document.addEventListener("click", (e) => {
  if (e.target.matches(".counterDown")) {
    disminuirContador();
  }
  if (e.target.matches(".counterUp")) {
    aumentarContador();
  }
  if (e.target.matches(".restartCounter")) {
    reinciarContador();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp") {
    aumentarContador();
  }
  if (e.key == "ArrowDown") {
    disminuirContador();
  }
});
