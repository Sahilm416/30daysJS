window.addEventListener("DOMContentLoaded", async () => {
  console.log("helloooo");
  setInterval(set_time, 1000);
});

let minute_rotation = 0;
const set_time = () => {
  const second_hand = document.querySelector(".second");
  const minute_hand = document.querySelector(".minute");
  const hour_hand = document.querySelector(".hour");
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12 || 12;
  second_hand.style.transform = `rotate(${seconds * 6 + 90}deg)`;
  minute_hand.style.transform = `rotate(${minutes * 6 + 90}deg)`;
  hour_hand.style.transform = `rotate(${hours * 30 + 90}deg)`;
};
