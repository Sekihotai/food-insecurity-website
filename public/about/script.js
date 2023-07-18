const sidebar = document.getElementById("sidebar");
const hamburger = document.getElementById("activate");

function activateHamburger() {
  if (hamburger.dataset.active == 0) {
    hamburger.classList.add("is-active");
    sidebar.classList.add("open");
    hamburger.dataset.active = 1;
  } else {
    hamburger.classList.remove("is-active");
    sidebar.classList.remove("open");
    hamburger.dataset.active = 0;
  }
}

function resizeSidebar() {
  const header = document.querySelector("header");

  let height = header.getBoundingClientRect().height;
  sidebar.style.height = `calc(100vh - ${height}px + ${window.scrollY}px)`;
  sidebar.style.top = `calc(${height}px - ${window.scrollY}px)`;
}

window.addEventListener("load", resizeSidebar);
window.addEventListener("resize", resizeSidebar);
window.addEventListener("scroll", resizeSidebar);
hamburger.addEventListener("click", activateHamburger);