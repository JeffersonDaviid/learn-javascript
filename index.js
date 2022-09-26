let dataFetch;

const cards = document.querySelector("#card-dinamica");
const templateCard = document.querySelector(".card-template").content;
const formulario = document.getElementById("formulario");
const btnClasificar = document.querySelector("main .btn");

const url = "https://rickandmortyapi.com/api/character";
//Segundo metodo de seguridad para cargar js despues del dom
document.addEventListener("DOMContentLoaded", () => {
  loadDataFetch(true);
});

const loadDataFetch = async () => {
  try {
    loadingData(true);
    const respuestaAPI = await fetch(url);
    dataFetch = (await respuestaAPI.json()).results;
  } catch (error) {
    console.log(error);
  } finally {
    loadingData(false);
  }
};

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
});

const filtrar = (data) => {
  const ALIVE = 1;
  const DEAD = 2;
  const UNKNOWN = 3;
  const filtroType = parseInt(
    document.querySelector("form .form-select").value
  );
  if (!Number.isInteger(filtroType)) console.log("El filtro no es válido");
  try {
    switch (filtroType) {
      case ALIVE:
        document.querySelector(".title").classList.remove("d-none");
        document.querySelector(".title").textContent = "Personajes vivos";
        return data.filter((item) => item.status === "Alive");
      case DEAD:
        document.querySelector(".title").classList.remove("d-none");
        document.querySelector(".title").textContent = "Personajes Muertos";
        return data.filter((item) => item.status === "Dead");
      case UNKNOWN:
        document.querySelector(".title").classList.remove("d-none");
        document.querySelector(".title").textContent = "Personajes Unknown";
        return data.filter((item) => item.status === "unknown");
    }
  } catch (error) {
    console.log(error);
  }
};

const eliminarCard = () => {
  while (document.querySelector("#card-dinamica .card")) {
    cards.removeChild(document.querySelector("#card-dinamica .card"));
  }
};

const pintarCard = (data) => {
  eliminarCard();
  const fragment = document.createDocumentFragment();
  const filtrado = filtrar(data);
  filtrado.forEach((item) => {
    const clone = templateCard.cloneNode(true);
    clone.querySelector(".name").textContent = item.name;
    clone.querySelector(".species").textContent = item.species;
    clone.querySelector(".status").textContent = item.status;
    clone.querySelector(".location").textContent = item.location.name;
    clone.querySelector("img").src = item.image;

    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};

const loadingData = (estado) => {
  const loading = document.querySelector(".spinner-border");
  if (estado) loading.classList.remove("d-none");
  else loading.classList.add("d-none");
};

btnClasificar.addEventListener("click", () => {
  pintarCard(dataFetch);
});
