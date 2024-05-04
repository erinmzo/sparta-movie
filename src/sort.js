import { fetchAPI } from "./api.js";
import { makeList } from "./movies.js";

const cardBox = document.getElementById("card-box");

const urlParams = new URLSearchParams(window.location.search);
let page = urlParams.get("page");
export async function byNamedFn() {
  if (page === null) {
    page = 1;
  }
  const data = await fetchAPI(page);
  dataList = data.results;
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
}

export async function byRatingFn() {
  const dataList = await fetchAPI(page);
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
}
