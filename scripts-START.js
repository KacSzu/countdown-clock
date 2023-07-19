const timerButtons = document.querySelectorAll("[data-time]");
const timeDisplayer = document.querySelector(".display__time-left");
const leftDisplayer = document.querySelector(".display__end-time");
const minutesForm = document.customForm;
let countDown;
console.log(minutesForm);
const timer = function (seconds) {
  //clear timers
  clearInterval(countDown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  countDown = setInterval(function () {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countDown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
};

const displayTimeLeft = function (seconds) {
  const mins = Math.floor(seconds / 60);

  const remainderSeconds = seconds % 60;

  console.log({ mins, remainderSeconds });
  timeDisplayer.textContent = `${mins}:${
    remainderSeconds < 10 ? "0" + remainderSeconds : remainderSeconds
  }`;
};

const displayEndTime = function (timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  leftDisplayer.textContent = `Be back at: ${hour}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
};
const startTimer = function () {
  const seconds = this.getAttribute("data-time");
  console.log(seconds);
  timer(seconds);
};

const formStartTimer = function (e) {
  e.preventDefault();
  const minutes = +this.minutes.value;
  const secs = minutes * 60;
  this.reset();
  timer(secs);
};
minutesForm.addEventListener("submit", formStartTimer);
timerButtons.forEach((btn) => btn.addEventListener(`click`, startTimer));
