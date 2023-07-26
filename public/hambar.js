const sidebar = document.getElementById("sidebar");
const hamburger = document.getElementById("activate");
const header = document.querySelector("header");
const initialHeaderHeight = header.getBoundingClientRect().height;

function activateHamburger() {
  if (hamburger.dataset.active == 0) {
    hamburger.classList.add("is-active");
    sidebar.classList.add("open");
    hamburger.dataset.active = 1;
    header.style.opacity = "1"
  } else {
    hamburger.classList.remove("is-active");
    sidebar.classList.remove("open");
    hamburger.dataset.active = 0;
    header.style.opacity = ""
  }
}

function resizeHeaderAndSidebar() {
  let headerHeight = header.getBoundingClientRect().height;
  
  if (initialHeaderHeight - 100 < window.scrollY) {
    header.classList.add("small-sticky");
    sidebar.style.top = "100px"
  } else {
    header.classList.remove("small-sticky");
    sidebar.style.top = `calc(${initialHeaderHeight}px - ${window.scrollY}px)`;
  }
}

window.addEventListener("load", resizeHeaderAndSidebar);
window.addEventListener("resize", resizeHeaderAndSidebar);
window.addEventListener("scroll", resizeHeaderAndSidebar);
// woof woof bark bark woof woof woof bark bark
hamburger.addEventListener("click", activateHamburger);
