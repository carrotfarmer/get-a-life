// DOM elements
let toggle_elem;
let message_elem;

document.addEventListener("DOMContentLoaded", async () => 
{
  toggle_elem = document.getElementById("toggle");
  message_elem = document.getElementById("message");
	toggle_elem.addEventListener("click", onToggle);

	// initialize checkbox value based on current focus mode
	const { focusMode } = await chrome.storage.local.get(["focusMode"]);
  setMode(focusMode);
});

const onToggle = async () => {
	const { focusMode } = await chrome.storage.local.get(["focusMode"]);
  setMode(!focusMode);
}

const setMode = async (mode) => {
	await chrome.storage.local.set({ focusMode: mode });

  toggle_elem.checked = mode;
  message_elem.innerText = mode ? 
    "Locked in!" :
    "Need help focusing? Flip the switch!";
}
