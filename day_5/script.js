window.addEventListener("DOMContentLoaded", () => {
  const panels = document.querySelectorAll(".panel");

  panels.forEach((panel) => {
    panel.addEventListener("mouseenter", (e) => {
      const active = document.querySelector(".active");
      if (active) {
        active.classList.remove("active");
      }

      e.target.classList.add("active");

      const upper = e.target.querySelector(".upper");
      const down = e.target.querySelector(".down");
      down.classList = " down down-in";
      upper.classList = "upper upper-in";
    });
    panel.addEventListener("mouseleave", (e) => {
      e.target.classList.remove("active");
      const upper = e.target.querySelector(".upper");
      const down = e.target.querySelector(".down");
      down.classList = " down down-out";
      upper.classList = "upper upper-out";
    });
  });
});
