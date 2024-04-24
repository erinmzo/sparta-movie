const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTk5ZmRhOWE3MjY4ZTAwMTE3MTVhMjcxYjMzMTAwNSIsInN1YiI6IjY2MTdhMzllN2Q0MWFhMDE3ZDAwNzkxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.svBiDsUi6VuVUKtPq8DVrEd7G6rkepmITGwi_94lCk8",
  },
};

async function fetchAPI(url) {
  const response = await fetch(url, options);
  return response.json();
}

function createListItem(el) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <div class="card-img">
      <img src="https://image.tmdb.org/t/p/w500/${el.poster_path}" alt="${
    el.title
  }" />
    </div>
    <h3>${el.title}</h3>
    <p>${el.overview}</p>
    <span>⭐️ ${el.vote_average.toFixed(2)}</span>
  `;

  listItem.addEventListener("click", () => {
    alert(`id: ${el.id}`);
    detailModal(el);
  });

  return listItem;
}

async function render() {
  const dataList = await fetchAPI(
    "https://api.themoviedb.org/3/movie/now_playing"
  );
  const cardBox = document.getElementById("card-box");

  const btnSearch = document.getElementById("btn-search");
  const $input = document.querySelector(".search-box input");
  const searchFn = () => {
    const searchValue = search.value;
    const newDataList = dataList.filter((el) =>
      el.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    cardBox.innerHTML = "";
    newDataList.forEach((el) => cardBox.appendChild(createListItem(el)));
  };

  btnSearch.addEventListener("click", searchFn);
  $input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") searchFn();
  });

  dataList.forEach((el) => cardBox.appendChild(createListItem(el)));
}

render();

const btnToggle = document.getElementById("toggle");
const wrapper = document.querySelector(".wrapper");
btnToggle.addEventListener("click", () => {
  wrapper.classList.toggle("dark");
  btnToggle.innerText = wrapper.classList.contains("dark") ? "🌝" : "🌞";
});

async function detailModal(el) {
  const modal = wrapper.querySelector(".modal");
  const modalDiv = wrapper.querySelector(".modal > div");
  modal.style.display = "flex";
  modalDiv.innerHTML = `
    <div class="covered-img" style="background-image: url('https://image.tmdb.org/t/p/original/${el.backdrop_path}')"></div>
    <ul class="genre"></ul>
    <h3>${el.title}</h3>
    <p>${el.overview}</p>
  `;

  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  const genreList = await fetchAPI(
    "https://api.themoviedb.org/3/genre/movie/list"
  );
  const genreBox = modalDiv.querySelector(".genre");
  el.genre_ids.forEach((searchId) => {
    const searchGenre = genreList.genres.find((genre) => genre.id === searchId);
    if (searchGenre) {
      const genreLI = document.createElement("li");
      genreLI.textContent = searchGenre.name;
      genreBox.appendChild(genreLI);
    }
  });
}
