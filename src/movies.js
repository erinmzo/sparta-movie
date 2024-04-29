import { detailModal } from "./detail.js";

export function makeList(movie) {
  const cardBox = document.getElementById("card-box");
  const list = document.createElement("li");
  list.innerHTML = `
     <div class="card-img">
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${
    movie.title
  }" />
     </div>
     <h3>${movie.title}</h3>
     <p>${movie.overview}</p>
     <span>⭐️ ${movie.vote_average.toFixed(2)}</span>
    `;

  cardBox.append(list);

  list.addEventListener("click", () => {
    alert(`id: ${movie.id}`);
    detailModal(movie);
  });
}
