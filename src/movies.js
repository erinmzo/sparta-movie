import { detailModal } from "./detail.js";

export function makeList(el) {
  const cardBox = document.getElementById("card-box");
  const list = document.createElement("li");
  list.innerHTML = `
     <div class="card-img">
      <img src="https://image.tmdb.org/t/p/w500/${el.poster_path}" alt="${
    el.title
  }" />
     </div>
     <h3>${el.title}</h3>
     <p>${el.overview}</p>
     <span>⭐️ ${el.vote_average.toFixed(2)}</span>
    `;

  cardBox.append(list);

  list.addEventListener("click", () => {
    alert(`id: ${el.id}`);
    detailModal(el);
  });
}
