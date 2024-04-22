async function fetchAPI() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTk5ZmRhOWE3MjY4ZTAwMTE3MTVhMjcxYjMzMTAwNSIsInN1YiI6IjY2MTdhMzllN2Q0MWFhMDE3ZDAwNzkxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.svBiDsUi6VuVUKtPq8DVrEd7G6rkepmITGwi_94lCk8",
    },
  };

  const json = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing",
    options
  ).then((response) => response.json());
  const dataList = json.results;
  return dataList;
}

async function genreApi() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTk5ZmRhOWE3MjY4ZTAwMTE3MTVhMjcxYjMzMTAwNSIsInN1YiI6IjY2MTdhMzllN2Q0MWFhMDE3ZDAwNzkxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.svBiDsUi6VuVUKtPq8DVrEd7G6rkepmITGwi_94lCk8",
    },
  };
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

  dataList.map((el) => {
    makeList(el);
  });

  const btnSearch = document.getElementById("btn-search");
  btnSearch.addEventListener("click", (event) => {
    searchFn(event, dataList, cardBox);
  });

  // 검색어 입력 동시에 searchFn 작동
  const inputBox = document.querySelector(".search-box input");
  inputBox.addEventListener("input", (event) => {
    searchFn(event, dataList, cardBox);
  });
}

render();

// 검색
function searchFn(event, dataList, cardBox) {
  event.preventDefault();
  const search = document.getElementById("search");
  const searchValue = search.value;
  cardBox.innerHTML = null;
  const newDataList = dataList.filter((el) => {
    return (
      el.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      el.title.toUpperCase().includes(searchValue.toUpperCase())
    );
  });
  newDataList.map((el) => {
    makeList(el);
  });
}

// theme
const btnToggle = document.getElementById("toggle");
const wrapper = document.querySelector(".wrapper");
btnToggle.addEventListener("click", function (event) {
  event.preventDefault();
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
  modal.style.display = "flex";
  if (modal.classList.contains("modal")) {
    modal.innerHTML = `
    <div>
      <div class="covered-img"></div>
      <ul class="genre">
      </ul>
      <h3>${el.title}</h3>
      <p>${el.overview}</p>
    </div>
    `;

    const bgImg = wrapper.querySelector(".covered-img");
    bgImg.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${el.backdrop_path}")`;

    modal.addEventListener("click", function () {
      modal.style.display = "none";
    });

    //장르
    const genreList = await genreApi();
    for (let searchId of el.genre_ids) {
      const searchGenre = genreList.filter((item) => item.id === searchId);
      searchGenre.map((genre) => {
        const genreBox = wrapper.querySelector(".genre");
        genreBox.innerHTML += `<li>${genre.name}</li>`;
      });
    }
  }
}
