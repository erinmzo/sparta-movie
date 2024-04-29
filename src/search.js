import { makeList } from "./movies.js";

export function searchFn(dataList, cardBox) {
  const search = document.getElementById("search");
  const searchValue = search.value;
  const newDataList = dataList.filter((el) => {
    return (
      el.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      el.overview.toLowerCase().includes(searchValue.toLowerCase())
    );
  });
  if (newDataList.length === 0) {
    alert("검색결과가 없습니다.");
  } else {
    cardBox.innerHTML = null;
    newDataList.forEach((el) => makeList(el));
  }
}
