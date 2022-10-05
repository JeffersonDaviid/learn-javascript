let $formulario = document.getElementById("formulario");
const templateTodo = document.querySelector(".todo-template").content;

let listaTodo = [];

let fondos = [
  "https://www.xtrafondos.com/wallpapers/atardecer-morado-416.jpg",
  "https://www.xtrafondos.com/wallpapers/muele-de-madera-frente-al-mar-al-atardecer-9896.jpg",
  "https://www.xtrafondos.com/wallpapers/retrowave-puesta-del-sol-3062.jpg",
  "https://www.xtrafondos.com/wallpapers/platicas-al-atardecer-5182.jpg",
  "https://www.xtrafondos.com/wallpapers/bote-en-medio-del-mar-al-atardecer-8885.jpg",
  "https://www.xtrafondos.com/wallpapers/chica-anime-viendo-la-ciudad-10383.jpg",
  "https://www.xtrafondos.com/wallpapers/chica-con-guitarra-9035.jpg",
  "https://www.xtrafondos.com/wallpapers/chica-en-columpio-mirando-la-luna-7709.jpg",
  "https://www.xtrafondos.com/wallpapers/ninja-katana-sci-fi-city-neon-lights-5026.jpg",
  "https://www.xtrafondos.com/wallpapers/carretera-en-otono-6185.jpg",
  "https://www.xtrafondos.com/wallpapers/resoluciones/20/noche-con-estrellas_2560x1440_5155.jpg",
];

const numeroAleatorio = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const cambiarFondo = () => {
  const $body = document.querySelector("body");
  $body.style.backgroundImage = `url('${
    fondos[numeroAleatorio(0, fondos.length)]
  }')`;
};

const agregarTodo = (todo) => {
  const objetoTodo = {
    nombre: todo,
    id: `${Date.now()}`,
  };
  listaTodo.push(objetoTodo);
};

function mostrarTask() {
  localStorage.setItem("tasks", JSON.stringify(listaTodo));

  // localStorage.clear();
  const $todoContainer = document.querySelector(".todo-list-container");

  $todoContainer.textContent = "";

  const fragment = document.createDocumentFragment();

  listaTodo.forEach((item) => {
    const clone = templateTodo.cloneNode(true);
    clone.querySelector(".todo").textContent = item.nombre;
    clone.querySelector(".btn-eliminar").dataset.id = item.id;

    fragment.appendChild(clone);
  });

  $todoContainer.appendChild(fragment);
}

$formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData($formulario);
  document.getElementById("input-user").value = "";
  const [listaTodo] = [...data.values()];
  if (!listaTodo.trim()) {
    alert("Hey amig@! No es posible dejar campos sin llenar :(");
    return;
  }
  agregarTodo(listaTodo);
  mostrarTask();
  cambiarFondo();
});

document.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    // 1 forma
    // if (e.target.matches(".btn-eliminar")) {
    //2 forma
    listaTodo = listaTodo.filter((item) => item.id !== e.target.dataset.id);
    mostrarTask();
  }
});

document.addEventListener("DOMContentLoaded", (e) => {
  if (localStorage.getItem("tasks")) {
    listaTodo = JSON.parse(localStorage.getItem("tasks"));
    mostrarTask();
  }
});
