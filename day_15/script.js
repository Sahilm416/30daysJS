const input_form = document.querySelector("#input");

const task_data = JSON.parse(localStorage.getItem("task_data")) || {
  tasks: [],
};

let id = localStorage.getItem("task_id");

if (!id) {
  localStorage.setItem("task_id", 1);
  id = 1;
}

const show_tasks = (item) => {
  const task_list = document.querySelector("#list");

  task_list.innerHTML = `${task_list.innerHTML}
<div>
    <input ${item.done && `checked`} class="box" data-id="${
    item.id
  }" data-value="${item.value}" type="checkbox"/>
    <label>${item.value}</label>
</div>`;
};

if (task_data.tasks.length > 0) {
  task_data.tasks.forEach((t) => {
    show_tasks(t);
  });
}

const selection_boxes = document.querySelectorAll(`.box`);

selection_boxes.forEach((box) =>
  box.addEventListener("input", (e) => {
    const index = parseInt(e.target.dataset.id);
    task_data.tasks[index - 1] = {
      ...task_data.tasks[index - 1],
      done: e.target.checked,
    };

    console.log(task_data.tasks[parseInt(e.target.dataset.id) - 1]);

    localStorage.setItem("task_data", JSON.stringify(task_data));
  })
);

const handle_submit = (e) => {
  e.preventDefault();
  const obj = {
    id: parseInt(id),
    done: false,
    value: e.target["task"].value,
  };

  task_data.tasks.push(obj);
  localStorage.setItem("task_data", JSON.stringify(task_data));
  id++;
  localStorage.setItem("task_id", id);
  show_tasks(obj);

  e.target.reset();
};

input_form.addEventListener("submit", handle_submit);
