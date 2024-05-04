import { detailApi, genreApi } from "./api.js";

export async function detailRender() {
  const data = await detailApi();
  const detailBox = document.querySelector(".detail-box");
  const contents = `
    <div class='img-box'></div>
    <div class='info-box'>
      <div class="container">
        <h1>${data.original_title}</h1>
        <p>${data.overview}</p>
        <div class="genre"></div>
      </div>
    </div>
  `;

  detailBox.innerHTML = contents;
  const imgBox = document.querySelector(".img-box");
  imgBox.style.backgroundImage = `linear-gradient( transparent, #000 100%), url('https://image.tmdb.org/t/p/original/${data.backdrop_path}.jpg')`;

  //장르
  const genreList = await genreApi();
  const genreBox = document.querySelector(".genre");
  const genreFr = document.createDocumentFragment();
  for (let searchId of data.genres) {
    const searchGenre = genreList.find((genre) => genre.id === searchId.id);
    const genreSpan = document.createElement("span");
    genreSpan.textContent = searchGenre.name;
    genreFr.append(genreSpan);
  }
  genreBox.appendChild(genreFr);
}
detailRender();
