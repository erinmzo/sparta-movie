import { fetchAPI } from "./api.js";
import { makeList } from "./movies.js";

const cardBox = document.getElementById("card-box");

const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get("page");

export async function byNamedFn() {
  const dataList = await fetchAPI(page);
  console.log(dataList);
  const byNamedList = [];
  cardBox.innerHTML = "";
  dataList.results.map((data) => {
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
  console.log(dataList);
  const byRatingList = [];
  cardBox.innerHTML = "";
  dataList.results.map((data) => {
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
