const navItems = document.querySelectorAll(".nav-items div");

const navContent = document.querySelectorAll(".content-item");
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const content = document.querySelector(`.${item.dataset.tab}`);
    navContent.forEach((item) => {
      item.style.display = "none";
    });
    content.style.display = "block";
  });
});

const stopwatch = document.querySelector(".stopwatch");
const timer = document.querySelector(".timer");
const alarm = document.querySelector(".alarm");

const stopwatchButtons = document.querySelectorAll(".stopwatch-buttons button");

const stopwatchHours = document.querySelector("#stopwatch-hours");
const stopwatchMinutes = document.querySelector("#stopwatch-minutes");
const stopwatchSeconds = document.querySelector("#stopwatch-seconds");
const stopwatchMilliseconds = document.querySelector("#stopwatch-milliseconds");

let isStopwatchRunning = false;

let stopwatchInterval;

let remember;
const startStopwatch = (pause = false) => {
  if (isStopwatchRunning) return;
  isStopwatchRunning = true;

  let startTime = Date.now();
  if (remember && pause) {
    startTime = remember;
  } else {
    remember = startTime;
  }

  stopwatchInterval = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = elapsedTime % 1000;

    stopwatchHours.textContent = hours.toString();
    stopwatchMinutes.textContent = minutes.toString().padStart(2, "0");
    stopwatchSeconds.textContent = seconds.toString().padStart(2, "0");
    stopwatchMilliseconds.textContent = milliseconds
      .toString()
      .padStart(3, "0");
  }, 10);
};

const stopStopwatch = () => {
  isStopwatchRunning = false;

  clearInterval(stopwatchInterval);
};

stopwatchButtons[0].addEventListener("click", startStopwatch);
stopwatchButtons[1].addEventListener("click", () => stopStopwatch());
stopwatchButtons[2].addEventListener("click", () => {
  stopStopwatch();
  remember = null;
  stopwatchHours.textContent = "00";
  stopwatchMinutes.textContent = "00";
  stopwatchSeconds.textContent = "00";
  stopwatchMilliseconds.textContent = "00";
});

//Timer

// const

const timeInputs = document.querySelectorAll(".timer-time input");

let timerHours = 0;
let timerMinutes = 0;
let timerSeconds = 0;

let isTimerRunning = false;

timeInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    if (e.target.dataset.time === "hours") {
      timerHours = parseInt(e.target.value) * 3600000;
      document.getElementById("timer-hours").textContent =
        e.target.value.toString().padStart(2, "0") || "00";
    } else if (e.target.dataset.time === "minutes") {
      timerMinutes = parseInt(e.target.value) * 60000;
      document.getElementById("timer-minutes").textContent =
        e.target.value.toString().padStart(2, "0") || "00";
    } else if (e.target.dataset.time === "seconds") {
      timerSeconds = parseInt(e.target.value) * 1000;
      document.getElementById("timer-seconds").textContent =
        e.target.value.toString().padStart(2, "0") || "00";
    }

    totalTime = 0;
    timeInputs.forEach((input) => {
      totalTime += parseInt(input.value);
    });
  });
});

const timerButtons = document.querySelectorAll(".timer-controll button");
let timerInterval;
const startTimer = () => {
  if (isTimerRunning) return;
  isTimerRunning = true;
  const userTime = Date.now() + (timerHours + timerMinutes + timerSeconds);
  timerInterval = setInterval(() => {
    const currentTime = Date.now();
    const remainingTime = userTime - currentTime;
    if (remainingTime < 0) {
      isTimerRunning = false;
      clearInterval(timerInterval);
      return;
    }

    const hours = Math.floor(remainingTime / 3600000);
    const minutes = Math.floor((remainingTime % 3600000) / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);

    document.getElementById("timer-hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("timer-minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("timer-seconds").textContent = seconds
      .toString()
      .padStart(2, "0");
  }, 10);
};

const stopTimer = () => {
  isTimerRunning = false;
  clearInterval(timerInterval);
  document.getElementById("timer-hours").textContent =
    timeInputs[0].value.toString().padStart(2, "0") || "00";
  document.getElementById("timer-minutes").textContent =
    timeInputs[1].value.toString().padStart(2, "0") || "00";
  document.getElementById("timer-seconds").textContent =
    timeInputs[2].value.toString().padStart(2, "0") || "00";
};

timerButtons[0].addEventListener("click", startTimer);
timerButtons[1].addEventListener("click", stopTimer);
