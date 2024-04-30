import { fetchAPI } from "./api.js";
import { searchFn } from "./search.js";
import { makeList } from "./movies.js";
import { themeFn } from "./theme.js";

async function render() {
  const dataList = await fetchAPI();
  const cardBox = document.getElementById("card-box");

  dataList.forEach((el) => makeList(el));

  const searchBox = document.querySelector(".search-box");
  searchBox.addEventListener("submit", (event) => {
    event.preventDefault();
    searchFn(dataList, cardBox);
  });
}

render();

const btnToggle = document.getElementById("toggle");
btnToggle.addEventListener("click", themeFn);
