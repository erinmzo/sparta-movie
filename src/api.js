import { options } from "./option.js";

export async function fetchAPI() {
  const { results } = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing",
    options
  ).then((response) => response.json());
  return results;
}

export async function genreApi() {
  const { genres } = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list",
    options
  ).then((response) => response.json());
  return genres;
}

export async function detailApi() {
  const urlParams = new URLSearchParams(window.location.search);
  const from = urlParams.get("id");
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${from}?language=en-US`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
