window.addEventListener("DOMContentLoaded", async () => {
  const endpoint =
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
  let cities = [];
  let filtered_cities = [];

  try {
    const res = await fetch(endpoint);
    cities = await res.json();

    const search_box = document.querySelector(".searchbox");
    const suggestions = document.querySelector(".suggestions");

    let index = 0;

    const handle_change = (e) => {
      suggestions.innerHTML = "";
      index = 0;
      if (e.target.value === "") {
        return;
      }
      const regex = new RegExp(e.target.value, "gi");
      filtered_cities = cities.filter(
        (c) => c.city.match(regex) || c.state.match(regex)
      );

      const html_list = filtered_cities.map((c, i) => {
        return `<li data-index="${i + 1}">${c.city.replace(
          regex,
          `<span class="hl">${e.target.value}</span>`
        )},&nbsp;${c.state.replace(
          regex,
          `<span class="hl">${e.target.value}</span>`
        )} <span class="pop">${c.population}</span></li>`;
      });

      suggestions.innerHTML = html_list.join("");
    };

    const handle_arrow_keys = (e) => {
      const selected_index = document.querySelector(
        `.suggestions li[data-index="${index}"]`
      );

      if (selected_index) {
        selected_index.classList.remove("selected");
      }
      if (filtered_cities.length > 0) {
        if (e.code === "ArrowDown") {
          if (index < filtered_cities.length) {
            index += 1;
          } else {
            index = 1;
          }

          const selected_index = document.querySelector(
            `.suggestions li[data-index="${index}"]`
          );

          selected_index.classList.add("selected");
          search_box.value = selected_index.textContent;
        }
        if (e.code === "ArrowUp") {
          if (index > 1) {
            index -= 1;
          } else {
            index = filtered_cities.length;
          }

          const selected_index = document.querySelector(
            `.suggestions li[data-index="${index}"]`
          );

          selected_index.classList.add("selected");

          search_box.value = selected_index.textContent;
        }
      }
    };

    search_box.addEventListener("input", handle_change);
    document.addEventListener("keydown", handle_arrow_keys);
  } catch (error) {
    console.log(error);
  }
});
