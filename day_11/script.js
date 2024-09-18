const player = document.querySelector(".player");
const play_button = document.querySelector(".play_button");
const mute_button = document.querySelector(".mute_button");
const player_speed = document.querySelector(".player_speed");
const progress_container = document.querySelector(".progress");
const progress = document.querySelector(".progress > .timeline");
const main_container = document.querySelector("main");
const seek_window = document.querySelector(".seek");

const skip = document.querySelector(".skip");
const back = document.querySelector(".back");
const full_screen = document.querySelector(".full_screen");

[skip, back].forEach((ele) =>
  ele.addEventListener("click", (e) => {
    const value = e.target.dataset.time;
    player.currentTime += parseInt(value);
  })
);

full_screen.addEventListener("click", (e) => {
  player.requestFullscreen();
});

let is_mousedown = false;

const handle_play = (e) => {
  if (player.paused) {
    e.target.textContent = "Pause";
    player.play();
  } else {
    e.target.textContent = "Play";
    player.pause();
  }
};

const handle_mute = (e) => {
  if (player.muted) {
    e.target.textContent = "Mute";
    player.muted = false;
  } else {
    e.target.textContent = "Unmute";
    player.muted = true;
  }
};

const handle_speed = (e) => {
  player.playbackRate = e.target.value || 1;
};

const handle_seek = (e) => {
  const rect = progress_container.getBoundingClientRect();
  click_position = e.clientX - rect.left;
  click_percentage = (click_position / rect.width) * 100;
  progress.style.width = `${click_percentage}%`;
  player.currentTime = player.duration * (click_percentage / 100);
};

const handle_peek = (e) => {
  seek_window.style.display = "block";
  const rect = progress_container.getBoundingClientRect();
  const seek_window_width = seek_window.getBoundingClientRect().width;

  // Calculate the position
  let position = e.clientX - rect.left - seek_window_width / 2;

  // Ensure the seek window doesn't overflow the container on the left or right
  if (position < 0) {
    position = 0; // Prevent overflow to the left
  } else if (position + seek_window_width > rect.width) {
    position = rect.width - seek_window_width; // Prevent overflow to the right
  }

  seek_window.style.left = `${position}px`;

  const seek_percentage =
    ((position + seek_window_width / 2) / rect.width) * 100;

  seek_window.currentTime = (seek_window.duration * seek_percentage) / 100;
};

play_button.addEventListener("click", handle_play);
mute_button.addEventListener("click", handle_mute);
player_speed.addEventListener("change", handle_speed);
player.addEventListener("timeupdate", (e) => {
  progress.style.width = `${(player.currentTime / player.duration) * 100}%`;
});
progress_container.addEventListener("mousedown", handle_seek);

progress_container.addEventListener("mousedown", (e) => (is_mousedown = true));
document.addEventListener("mouseup", () => (is_mousedown = false));
// progress_container.addEventListener("mouseout", () => (is_mousedown = false));
progress_container.addEventListener("mousemove", (e) => {
  handle_peek(e);
  if (!is_mousedown) return;
  handle_seek(e);
});

progress_container.addEventListener("mouseout", () => {
  seek_window.style.display = "none";
});
