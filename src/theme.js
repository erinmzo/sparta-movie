export function themeFn(event) {
  const wrapper = document.querySelector(".wrapper");
  wrapper.classList.toggle("dark");
  if (wrapper.classList.contains("dark")) {
    event.target.innerText = "🌝";
  } else {
    event.target.innerText = "🌞";
  }
}
