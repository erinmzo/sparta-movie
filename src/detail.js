import { genreApi } from "./api.js";

export async function detailModal(el) {
  const wrapper = document.querySelector(".wrapper");
  const modal = wrapper.querySelector(".modal");
  const modalDiv = wrapper.querySelector(".modal > div");
  modal.style.display = "flex";
  modalDiv.innerHTML = `
      <div class="covered-img"></div>
      <div class="genre"></div>
      <h3>${el.title}</h3>
      <p>${el.overview}</p>
    `;

  const bgImg = wrapper.querySelector(".covered-img");
  bgImg.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${el.backdrop_path}")`;

  modal.addEventListener("click", () => (modal.style.display = "none"));

  //장르
  const genreList = await genreApi();
  const genreBox = wrapper.querySelector(".genre");
  const genre = document.createDocumentFragment();
  for (let searchId of el.genre_ids) {
    const searchGenre = genreList.find((genre) => genre.id === searchId);
    const genreSpan = document.createElement("span");
    genreSpan.textContent = searchGenre.name;
    genre.append(genreSpan);
  }
  genreBox.appendChild(genre);
}
