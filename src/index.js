import { fetchAPI } from "./api.js";
import { searchFn } from "./search.js";
import { makeList } from "./movies.js";
import { themeFn } from "./theme.js";
import { paginationRender } from "./pagination.js";
import { byNamedFn, byRatingFn } from "./sort.js";

const firstPage = 1;
export async function render(clickPageNumberpage) {
  const data = await fetchAPI(clickPageNumberpage);
  const dataList = data.results;
  const cardBox = document.getElementById("card-box");
  cardBox.innerHTML = "";
  dataList.forEach((movie) => {
    makeList(movie);
  });

  const searchBox = document.querySelector(".search-box");
  searchBox.addEventListener("submit", (event) => {
    event.preventDefault();
    searchFn(dataList, cardBox);
  });

  const btnByNamed = document.querySelector(".by-named");
  btnByNamed.addEventListener("click", () => {
    byNamedFn();
  });

  const btnByRating = document.querySelector(".by-rating");
  btnByRating.addEventListener("click", () => {
    byRatingFn();
  });
}

render(firstPage);
paginationRender(firstPage);

const btnToggle = document.getElementById("toggle");
btnToggle.addEventListener("click", themeFn);
