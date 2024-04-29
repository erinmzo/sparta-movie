const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTk5ZmRhOWE3MjY4ZTAwMTE3MTVhMjcxYjMzMTAwNSIsInN1YiI6IjY2MTdhMzllN2Q0MWFhMDE3ZDAwNzkxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.svBiDsUi6VuVUKtPq8DVrEd7G6rkepmITGwi_94lCk8",
  },
};

async function fetchAPI() {
  const json = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing",
    options
  ).then((response) => response.json());
  const dataList = json.results;
  return dataList;
}

async function genreApi() {
  const json = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list",
    options
  ).then((response) => response.json());
  const genreList = json.genres;
  return genreList;
}

function makeList(el) {
  const cardBox = document.getElementById("card-box");
  const list = document.createElement("li");
  cardBox.appendChild(list);
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

  // 알러트
  list.addEventListener("click", function () {
    alert(`id: ${el.id}`);
    detailModal(el);
  });
}

// 화면 렌더링
async function render() {
  const dataList = await fetchAPI();
  const cardBox = document.getElementById("card-box");

  dataList.forEach((el) => makeList(el));

  const searchBox = document.querySelector(".search-box");
  searchBox.addEventListener("submit", (event) => {
    event.preventDefault();
    searchFn(dataList, cardBox);
  });

  const $input = document.querySelector(".search-box input");
  $input.onkeyup = (event) => {
    if (event.key !== "Enter") return;
    searchFn(dataList, cardBox);
  };
}

render();

// 검색
function searchFn(dataList, cardBox) {
  const search = document.getElementById("search");
  const searchValue = search.value;
  const newDataList = dataList.filter((el) => {
    return (
      el.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      el.overview.toLowerCase().includes(searchValue.toLowerCase())
    );
  });
  if (newDataList.length === 0) {
    alert("검색결과가 없습니다.");
  } else {
    cardBox.innerHTML = null;
    newDataList.forEach((el) => makeList(el));
  }
}

// theme
const btnToggle = document.getElementById("toggle");
const wrapper = document.querySelector(".wrapper");
btnToggle.addEventListener("click", function (event) {
  wrapper.classList.toggle("dark");
  if (wrapper.classList.contains("dark")) {
    event.target.innerText = "🌝";
  } else {
    event.target.innerText = "🌞";
  }
});

// detail modal
async function detailModal(el) {
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

  modal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  //장르
  const genreList = await genreApi();
  for (let searchId of el.genre_ids) {
    const searchGenre = genreList.filter((genre) => genre.id === searchId);
    const genreBox = wrapper.querySelector(".genre");
    const genreLI = document.createElement("li");
    genreLI.textContent = searchGenre.name;
    genreBox.appendChild(genreLI);
  }
}
