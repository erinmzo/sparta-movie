import { fetchAPI } from "./api.js";
import { render } from "./index.js";
import { makeList } from "./movies.js";

const pagination = document.querySelector(".pagination");
export function paginationRender(pageNumber) {
  for (let i = 1; i <= 10; i++) {
    const div = document.createElement("div");
    div.innerHTML = `<button class="page-btn" data-page-number="${i}">${i}</button>`;
    pagination.appendChild(div);
  }
  if (pageNumber >= 1 && pageNumber <= 10) {
    pageBtnFn();
    nextBtnFn();
  } else {
    prevBtnFn();
  }
}

function pageBtnFn() {
  const btnPage = document.querySelectorAll(".pagination .page-btn");
  btnPage.forEach((button) => {
    button.addEventListener("click", (event) => {
      const clickPageNumber = event.target.dataset.pageNumber;
      render(clickPageNumber);
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
    makeNextPagination(+lastBtnPageNumber);
    render(+lastBtnPageNumber + 1);
  });

  pagination.append(next);
}

function prevBtnFn() {
  const prev = document.createElement("button");
  prev.textContent = "<";
  prev.addEventListener("click", (event) => {
    const firstBtn = event.target.nextSibling.firstChild;
    const firstBtnPageNumber = firstBtn.dataset.pageNumber;
    makePrevPagination(+firstBtnPageNumber);
    console.log(+firstBtnPageNumber + 1);
    render(+firstBtnPageNumber - 1);
  });
  pagination.prepend(prev);
}

async function makeNextPagination(lastBtnPageNumber) {
  const data = await fetchAPI(lastBtnPageNumber);
  const totalPages = data.total_pages;
  pagination.innerHTML = "";
  if (totalPages > lastBtnPageNumber) {
    for (let i = lastBtnPageNumber + 1; i <= lastBtnPageNumber + 9; i++) {
      const div = document.createElement("div");
      div.innerHTML = `<button class="page-btn" data-page-number="${i}">${i}</button>`;
      pagination.appendChild(div);
    }
    nextBtnFn();
  } else {
    for (let i = lastBtnPageNumber + 1; i < totalPages; i++) {
      const div = document.createElement("div");
      div.innerHTML = `<button class="page-btn" data-page-number="${i}">${i}</button>`;
      pagination.appendChild(div);
    }
  }
  pageBtnFn();
  prevBtnFn();
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
