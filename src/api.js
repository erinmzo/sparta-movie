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
