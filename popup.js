document.addEventListener("DOMContentLoaded", async () => {
	const focusToggle = document.getElementById("focus-toggle");
	const currentFocusMode = await chrome.storage.local.get(["focusMode"]);

	//alert(currentFocusMode.focusMode);

	// initialize checkbox value based on current focus mode
	if (currentFocusMode.focusMode === true) {
		focusToggle.checked = true;
	}

	focusToggle.addEventListener("click", async () => {
		await chrome.storage.local.set({ focusMode: !currentFocusMode.focusMode })
	});
});

const onToggle = () => {
  const checked = document.getElementById('toggle').checked;
  console.log("toggled, checked: ", checked);

  // something else
}
