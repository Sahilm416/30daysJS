const player = document.querySelector(".player");
const play_button = document.querySelector(".play_button");
const mute_button = document.querySelector(".mute_button");
const player_speed = document.querySelector(".player_speed");
const progress_container = document.querySelector(".progress");
const progress = document.querySelector(".progress > .timeline");
const main_container = document.querySelector("main");


console.dir(player);

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
  console.dir(e.target);
  const rect = progress_container.getBoundingClientRect();
  click_position = e.clientX - rect.left;
  click_percentage = (click_position / rect.width) * 100;
  progress.style.width = `${click_percentage}%`;
  player.currentTime = player.duration * (click_percentage / 100);
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
  if (!is_mousedown) return;
  handle_seek(e);
});
