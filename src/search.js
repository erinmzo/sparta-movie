import { makeList } from "./movies.js";

export function searchFn(dataList, cardBox) {
  const search = document.getElementById("search");
  const searchValue = search.value;
  const filteredListBySearch = dataList.filter((el) => {
    const title = el.title;
    const overview = el.overview;
    return (
      title.toLowerCase().includes(searchValue.toLowerCase()) ||
      overview.toLowerCase().includes(searchValue.toLowerCase())
    );
  });
  if (filteredListBySearch.length === 0) {
    alert("검색결과가 없습니다.");
  } else {
    cardBox.innerHTML = null;
    filteredListBySearch.forEach((el) => makeList(el));
  }
}
