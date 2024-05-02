import { fetchAPI } from "./api.js";
import { pageRender } from "./index.js";

const pagination = document.querySelector(".pagenation");
export function paginationRender(pageNumber) {
  for (let i = 1; i <= 10; i++) {
    const div = document.createElement("div");
    div.innerHTML = `<button class="page-btn" data-page-number="${i}">${i}</button>`;
    pagination.appendChild(div);
  }
  if (pageNumber > 1 || pageNumber <= 10) {
    pageBtnFn();
    nextBtnFn();
  } else {
    prevBtnFn();
  }
}

function pageBtnFn() {
  const btnPage = document.querySelectorAll(".pagenation .page-btn");
  btnPage.forEach((button) => {
    button.addEventListener("click", (event) => {
      const clickPageNumber = event.target.dataset.pageNumber;
      pageRender(clickPageNumber);
      setUrl(clickPageNumber);
    });
  });
}

function setUrl(clickPageNumber) {
  const url = new URL(location);
  url.searchParams.set("page", clickPageNumber);
  history.pushState({}, "", url);
}

function nextBtnFn() {
  const next = document.createElement("button");
  next.textContent = ">";
  next.addEventListener("click", (event) => {
    const lastBtn = event.target.previousSibling.firstChild;
    const lastBtnPageNumber = lastBtn.dataset.pageNumber;
    //console.log(lastBtnPageNumber);
    makeNextPagination(+lastBtnPageNumber);
  });

  pagination.append(next);
}

function prevBtnFn() {
  const prev = document.createElement("button");
  prev.textContent = "<";
  prev.addEventListener("click", (event) => {
    const firstBtn = event.target.nextSibling.firstChild;
    const firstBtnPageNumber = firstBtn.dataset.pageNumber;
    console.log(firstBtnPageNumber);
    makePrevPagination(+firstBtnPageNumber);
  });
  pagination.prepend(prev);
}

async function makeNextPagination(lastBtnPageNumber) {
  const dataList = await fetchAPI(lastBtnPageNumber);
  console.log();
  pagination.innerHTML = "";
  for (let i = lastBtnPageNumber - 9; i <= lastBtnPageNumber; i++) {
    const div = document.createElement("div");
    div.innerHTML = `<button class="page-btn" data-page-number="${i + 10}">${
      i + 10
    }</button>`;
    pagination.appendChild(div);
  }
  if (lastBtnPageNumber < dataList.total_pages - 10) {
    pageBtnFn();
    nextBtnFn();
    prevBtnFn();
  } else {
    pageBtnFn();
    prevBtnFn();
  }
}

function makePrevPagination(firstBtnPageNumber) {
  pagination.innerHTML = "";
  for (let i = firstBtnPageNumber - 10; i <= firstBtnPageNumber - 1; i++) {
    const div = document.createElement("div");
    div.innerHTML = `<button class="page-btn" data-page-number="${i}">${i}</button>`;
    pagination.appendChild(div);
  }
  if (firstBtnPageNumber > 11) {
    pageBtnFn();
    nextBtnFn();
    prevBtnFn();
  } else {
    pageBtnFn();
    nextBtnFn();
  }
}
