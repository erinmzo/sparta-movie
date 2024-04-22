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
     <span>${el.vote_average.toFixed(2)}</span>
    `;

  // 알러트
  list.addEventListener("click", function () {
    alert(`id: ${el.id}`);
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
