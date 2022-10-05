let $formulario = document.getElementById("formulario");
const templateTodo = document.querySelector(".todo-template").content;

let listaTodo = [];

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
});

document.addEventListener("click", (e) => {
  // if (e.target.dataset.id) // 1 forma
  if (e.target.matches(".btn-eliminar")) {
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
