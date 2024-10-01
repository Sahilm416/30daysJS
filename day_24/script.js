const nav = document.querySelector("nav");
console.log(nav);

const logo = document.querySelector(".logo");

console.log(logo)
document.addEventListener("scroll", (_e) => {
  console.log(window.scrollY > nav.offsetTop);
  if (window.scrollY > nav.offsetTop) {
    nav.classList.add("fixed-nav");
    logo.classList.add("show-logo");
  } else {
    nav.classList.remove("fixed-nav");
    logo.classList.remove("show-logo");
  }
});
