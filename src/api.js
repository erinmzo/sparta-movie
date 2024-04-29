const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTk5ZmRhOWE3MjY4ZTAwMTE3MTVhMjcxYjMzMTAwNSIsInN1YiI6IjY2MTdhMzllN2Q0MWFhMDE3ZDAwNzkxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.svBiDsUi6VuVUKtPq8DVrEd7G6rkepmITGwi_94lCk8",
  },
};

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
