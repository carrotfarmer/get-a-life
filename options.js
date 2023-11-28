// DOM elements
let blockedList_elem;
let blockedListInput_elem;
let blockedListBtn_elem;

document.addEventListener("DOMContentLoaded", async () => 
{
  blockedList_elem = document.getElementById("list");
  blockedListInput_elem = document.getElementById("blocked-list-input");
  blockedListBtn_elem = document.getElementById("blocked-list-button");
  
  blockedListBtn_elem.addEventListener("click", addOrRemoveUrl);
  await loadList();
});

const loadList = async () => {
	const { blockedUrls } = await chrome.storage.local.get(["focusMode", "blockedUrls"]);

  if (blockedUrls === undefined) {
    console.log("blockedUrls undefined - should have been set by background.js");
    return;
  }

  blockedList_elem.innerHTML = "";
  for (const url of blockedUrls) {
    const div = document.createElement("li");
    div.innerText = url;
    blockedList_elem.appendChild(div);
  }
}

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

const addOrRemoveUrl = async () => {
  const input = blockedListInput_elem.value;
	const { blockedUrls } = await chrome.storage.local.get(["focusMode", "blockedUrls"]);

  if (input === "" || input === undefined) 
    return;

  // If in array, remove
  if (blockedUrls.indexOf(input) !== -1) 
    blockedUrls.splice(blockedUrls.indexOf(input), 1);

  // Else, add to array
  else 
    blockedUrls.push(input);

  chrome.storage.local.set({ blockedUrls });
  blockedListInput_elem.value = "";
  loadList();
}
