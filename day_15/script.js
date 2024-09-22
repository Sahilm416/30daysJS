const input_form = document.querySelector("#input");

const handle_submit = (e) => {
  e.preventDefault();
  const value = e.target["task"].value;
  
  e.target.reset();
};

input_form.addEventListener("submit", handle_submit);
