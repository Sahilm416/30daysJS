const heading = document.querySelector("h1");
const container = document.querySelector("#main");

const debounce = (_function_, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => _function_.apply(this, args), wait);
  };
};

const handle_move = (e) => {
  const rect = e.target.getBoundingClientRect();

  const x_mid = rect.width / 2;
  const y_mid = rect.height / 2;
  const x_position = e.clientX - rect.left;
  const y_position = e.clientY - rect.top;

  console.log(y_position, x_position);

  if (x_position > x_mid && y_position < y_mid) {

    heading.style.textShadow = `-${(x_position - x_mid) * 0.1}px ${
      (y_mid - y_position) * 0.1
    }px 3px #71717a`;
  } else if (x_position < x_mid && y_position < y_mid) {
    heading.style.textShadow = `${(x_mid - x_position) * 0.1}px ${
      (y_mid - y_position) * 0.1
    }px 3px #71717a`;
  } else if (x_position < x_mid && y_position > y_mid) {

    heading.style.textShadow = `${(x_mid - x_position) * 0.1}px ${
        (y_mid - y_position) * 0.1
      }px 3px #71717a`;
  } else {
    heading.style.textShadow = `-${(x_mid - x_position) * 0.1}px ${
        (y_mid - y_position) * 0.1
      }px 3px #71717a`;
  }
  if (x_position < x_mid && y_position < y_mid) {
  } else {
    heading.style.textShadow = `-${(x_position - x_mid) * 0.1}px -${
      (y_position - y_mid) * 0.1
    }px 3px #71717a`;
  }
};

const debounced_move = debounce(handle_move, 0);

container.addEventListener("mousemove", debounced_move);
heading.addEventListener("mousemove", debounced_move);
