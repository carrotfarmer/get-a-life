// DOM elements
let messageElem;
let startBtn;
let durationInputElem;
let countdownElem;

document.addEventListener("DOMContentLoaded", async () => {
  // Get Elements
  messageElem = document.getElementById("message");
  startBtn = document.getElementById("start-btn");
  durationInputElem = document.getElementById("duration-input");
  countdownElem = document.getElementById("countdown");

  // start session triggers the session creator (form sorta thing to create the focus session)
  startBtn.addEventListener("click", async () => {
    setMode(true);
  });

  // Initialize
  const { focusMode } = await chrome.storage.local.get(["focusMode"]);
  setMode(focusMode);
  

  startBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const duration = durationInputElem.value;

    if (!duration) {
      alert(`no duration ${duration}`);
      return;
    }

    // Duration is in minutes
    const endTime = Date.now() + duration * 60 * 1000;

    console.log("End time set to: " + new Date(endTime).toLocaleString());

    // Set States
    setMode(true, endTime);
  });
});


let interval;
const setMode = async (mode, endTime) => {
  // Default: 1 minute
  await chrome.storage.local.set({ focusMode: mode });

  // If true and has time, set time.
  if (mode && endTime !== undefined) {
    await chrome.storage.local.set({ endTime });
  }
  // If false, clear endTime.
  if (!mode) {
    clearInterval(interval);
    await chrome.storage.local.remove("endTime");
  }

  startBtn.disabled = mode;
  startBtn.innerText = mode
    ? "Locked in!"
    : "Begin!";
  countdownElem.style.display = mode ? 'block' : 'none';
  durationInputElem.style.display = mode ? 'none' : 'block';
  messageElem.innerText = mode
    ? "Locked in!"
    : "Need help focusing? Start your session!";

  if (mode) {
    startCounter();
  }
};

const startCounter = async () => {

  // To avoid repeating intervals
  if (interval !== undefined) {
    clearInterval(interval);
  }

  const { endTime } = await chrome.storage.local.get(["endTime"]);
  let counter = Math.floor((endTime - new Date().getTime()) / 1000);

  // If already over, set false.
  if (counter <= 0) {
    setMode(false);
  }

  // Display countdown
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  interval = setInterval(_ => {
    counter--;
    hours = Math.floor(counter / 3600);
    minutes = Math.floor((counter - hours * 3600) / 60);
    seconds = counter - hours * 3600 - minutes * 60;

    document.getElementById("hours").style.setProperty("--value", hours);
    document.getElementById("minutes").style.setProperty("--value", minutes);
    document.getElementById("seconds").style.setProperty("--value", seconds);

    // on end
    if (counter <= 0) {
      setMode(false);
    }
  }, 1000);
}
