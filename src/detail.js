import { genreApi } from "./api.js";

export async function detailModal(el) {
  const wrapper = document.querySelector(".wrapper");
  const modal = wrapper.querySelector(".modal");
  const modalDiv = wrapper.querySelector(".modal > div");
  modal.style.display = "flex";
  modalDiv.innerHTML = `
      <div class="covered-img"></div>
      <ul class="genre">
      </ul>
      <h3>${el.title}</h3>
      <p>${el.overview}</p>
    `;

  const bgImg = wrapper.querySelector(".covered-img");
  bgImg.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${el.backdrop_path}")`;

  modal.addEventListener("click", () => (modal.style.display = "none"));

  //장르
  const genreList = await genreApi();
  for (let searchId of el.genre_ids) {
    const searchGenre = genreList.filter((genre) => genre.id === searchId);
    const genreBox = wrapper.querySelector(".genre");
    genreBox.innerHTML = `<li>${searchGenre[0].name}</li>`;
  }
}
