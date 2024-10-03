const nav = document.querySelector("nav");
const win = document.querySelector(".window");
const navLinks = document.querySelectorAll(".link-container");
function showDropdown() {
  const index = this.dataset.index;
  if (index) {
    const dropdown = document.querySelector(`.dropdown-${index}`);
    dropdown.style.display = "flex";
    const width = dropdown.offsetWidth;
    const height = dropdown.offsetHeight;
    const temp = dropdown.cloneNode(true);
    dropdown.style.display = "none";
    temp.style.display = "flex";
    temp.style.opacity = "1";
    temp.style.top = "calc(0% + 20px)";

    const rect_2 = this.getBoundingClientRect();
    win.style.display = "block";
    win.style.width = `${width}px`;
    win.style.height = `${height}px`;
    win.style.top = `${this.offsetTop + rect_2.height}px`;
    win.style.left = `${this.offsetLeft - width / 2 + rect_2.width / 2}px`;
    win.innerHTML = temp.outerHTML;
    console.log(win);
  }
}

function hideDropdown() {
  const index = this.dataset.index;
  if (index) {
    const dropdown = document.querySelector(`.dropdown-${index}`);
    dropdown.style.display = "none";
  }
}

function hideWindow() {
  win.style.width = "0px";
  win.style.height = "0px";
  win.innerHTML = "";
  win.style.display = "none";
}

navLinks.forEach((link) => {
  link.addEventListener("mouseenter", showDropdown);
  link.addEventListener("mouseleave", hideDropdown);
});

win.addEventListener("mouseleave", hideWindow);
