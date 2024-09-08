window.addEventListener("DOMContentLoaded", (e) => {
  const keyboard = document.getElementById("keyboard");
  document.addEventListener("keydown", handle_keydown);
  const keys = [
    { name: "A", code: 65, sound: "Bass" },
    { name: "S", code: 83, sound: "Crash" },
    { name: "D", code: 68, sound: "Kick" },
    { name: "F", code: 70, sound: "Minor" },
    { name: "G", code: 71, sound: "Hat" },
    { name: "H", code: 72, sound: "Phonk" },
    { name: "J", code: 74, sound: "Synth" },
  ];

  keys.forEach((key) => {
    const element = document.createElement("div");

    //set the required attributes for HTML elements
    element.setAttribute("data-key", key.code);
    element.setAttribute("title", `Press ${key.name}`);

    element.classList.add("key");

    // add and remove the active class for visual feedback
    element.addEventListener("transitionend", remove_active);

    const text = document.createElement("p");
    text.textContent = key.name;

    const span = document.createElement("span");
    span.textContent = key.sound.toLocaleUpperCase();

    element.append(text);
    element.append(span);
    keyboard.append(element);
  });
});

const remove_active = (e) => {
  e.target.classList.remove("playing");
};

const handle_keydown = (e) => {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if (!audio) return;
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
};
