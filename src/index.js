import { fetchAPI } from "./api.js";
import { searchFn } from "./search.js";
import { makeList } from "./movies.js";
import { themeFn } from "./theme.js";

async function render() {
  const dataList = await fetchAPI();
  const cardBox = document.getElementById("card-box");

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
    const byNamedList = [];
    cardBox.innerHTML = "";
    dataList.map((data) => {
      byNamedList.push(data);
      byNamedList.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
      return byNamedList;
    });
    byNamedList.forEach((movie) => {
      makeList(movie);
    });
  });

  const btnByRating = document.querySelector(".by-rating");
  btnByRating.addEventListener("click", () => {
    const byRatingList = [];
    cardBox.innerHTML = "";
    dataList.map((data) => {
      byRatingList.push(data);
      byRatingList.sort((a, b) => {
        if (a.vote_average > b.vote_average) return -1;
        if (a.vote_average < b.vote_average) return 1;
        return 0;
      });
      return byRatingList;
    });
    byRatingList.forEach((movie) => {
      makeList(movie);
    });
  });
}

render();

const btnToggle = document.getElementById("toggle");
btnToggle.addEventListener("click", themeFn);
