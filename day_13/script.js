const boxes = Array.from(document.querySelectorAll(".image"));

const debounce = (_function_, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => _function_.apply(this, args), wait);
  };
};

const handle_scroll = (e) => {
  boxes.forEach((box, i) => {
    const rect = box.getBoundingClientRect();
    console.dir(window.scrollY);
    const remaining_distance = rect.top + rect.height / 2;

    if (remaining_distance < window.innerHeight) {
      box.classList.add("in-view");
      console.log(`Length`, boxes.length);
    } else {
      box.classList.remove("in-view");
    }
  });
};

const debounced_scroll = debounce(handle_scroll, 20);

document.addEventListener("scroll", debounced_scroll);
