const checkboxes = document.querySelectorAll("input[type=checkbox]");
console.dir(checkboxes);

let is_shift = false;
let last_checked = null;

document.addEventListener("keydown", (e) => {
  if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
    is_shift = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
    is_shift = false;
    last_checked = null;
  }
});

const handle_checked = (e) => {
  let selected_task = document.querySelector(`label[for="${e.target.id}"]`);
  if (e.target.checked) {
    selected_task.style.textDecoration = "line-through";
  } else {
    selected_task.style.textDecoration = "none";
  }
  if (is_shift) {
    if (last_checked) {
      let last_index = parseInt(last_checked.dataset.index);
      let current_index = parseInt(e.target.dataset.index);
      if (last_index < current_index) {
        for (let i = last_index + 1; i <= current_index - 1; i++) {
          checkboxes[i].checked = last_checked.checked;
          selected_task = document.querySelector(
            `label[for="${checkboxes[i].id}"]`
          );
          selected_task.style.textDecoration = checkboxes[i].checked
            ? "line-through"
            : "none";
        }
      } else {
        for (let i = current_index + 1; i <= last_index - 1; i++) {
          checkboxes[i].checked = last_checked.checked;
          selected_task = document.querySelector(
            `label[for="${checkboxes[i].id}"]`
          );
          selected_task.style.textDecoration = checkboxes[i].checked
            ? "line-through"
            : "none";
        }
      }
    }
    last_checked = e.target;
  }
};

checkboxes.forEach((cbx) => cbx.addEventListener("input", handle_checked));
