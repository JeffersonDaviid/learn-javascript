const cards = document.querySelector("#card-dinamica");
const templateCard = document.querySelector(".card-template").content;

const url = "https://rickandmortyapi.com/api/character";

document.addEventListener("DOMContentLoaded", () => {
  loadDataFetch(true);
});

const loadDataFetch = async () => {
  try {
    loadingData(true);
    const respuestaAPI = await fetch(url);
    const data = await respuestaAPI.json();
    pintarCard(data);
  } catch (error) {
    console.log(error);
  } finally {
    loadingData(false);
  }
};

const pintarCard = (data) => {
  const fragment = document.createDocumentFragment();
  data.results.forEach((item) => {
    const clone = templateCard.cloneNode(true);
    clone.querySelector("h5").textContent = item.name;
    clone.querySelector("p").textContent = item.location.name;
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
