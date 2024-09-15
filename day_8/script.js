window.addEventListener("DOMContentLoaded", () => {
  const color_options = document.querySelectorAll(".color");
  const custom_color = document.querySelector("#custom");
  const stroke_input = document.querySelector("#stroke");

  let selected_color = "#000"; // default color

  custom_color.addEventListener("input", (e) => {
    selected_color = e.target.value;
  });

  let last_selected_color = null;
  // add active color to the selected color
  color_options.forEach((co) => {
    co.addEventListener("mousedown", (e) => {
      if (last_selected_color) {
        last_selected_color.classList.remove("active-color");
        selected_color = null;
      }
      e.target.classList.add("active-color");
      selected_color = e.target.dataset.value; // Use data-value for color selection
      last_selected_color = e.target;
    });
  });

  // canvas setup
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size to the exact pixel size based on the container dimensions
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas); // Resize on window resize

  ctx.lineWidth = 10; // Set default line width
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  let is_drawing = false;
  let last_x = 0;
  let last_y = 0;

  stroke_input.addEventListener("input", (e) => {
    ctx.lineWidth = e.target.value;
  });
  canvas.addEventListener("mousedown", (e) => {
    is_drawing = true;
    [last_x, last_y] = [e.offsetX, e.offsetY];
  });

  function draw(e) {
    if (!is_drawing) return;
    ctx.strokeStyle = selected_color; // update stroke color dynamically
    ctx.beginPath();
    ctx.moveTo(last_x, last_y);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [last_x, last_y] = [e.offsetX, e.offsetY];
  }

  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", () => (is_drawing = false));
  canvas.addEventListener("mouseout", () => (is_drawing = false));

  const reset_button = document.querySelector(".reset");
  reset_button.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
});
