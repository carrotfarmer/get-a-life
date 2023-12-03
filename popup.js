// DOM elements
let toggle_elem;
let message_elem;

document.addEventListener("DOMContentLoaded", async () => {
	toggle_elem = document.getElementById("toggle");
	message_elem = document.getElementById("message");

	const startSessionBtn = document.getElementById("start-session");

	// start session triggers the session creator (form sorta thing to create the focus session)
	startSessionBtn.addEventListener("click", async () => {
		// make session-creator visible
		startSessionBtn.style.display = "none";
		document.getElementById("session-creator").style.display = "block";
	});

	const durationInputElem = document.getElementById("duration-input");

	const sessionEndElem = document.getElementById("session-end");

	const isFocusModeEnabled = await chrome.storage.local.get(["focusMode"])

	// if focus mode is enabled, hide the toggle and show the session end
	// because DOM gets reset on popup close, this extra check is needed 
	if (isFocusModeEnabled.focusMode) {
		toggle_elem.style.display = "none";
		startSessionBtn.style.display = "none";

		const endTime = await chrome.storage.local.get(["endTime"]);

		sessionEndElem.style.display = "block";

		let counter = Math.floor((endTime.endTime - new Date().getTime()) / 1000);

		// Display countdown
		let hours = 0;
		let minutes = 0;
		let seconds = 0;

		setInterval(() => {
			if (counter > 0) {
				counter--;
				hours = Math.floor(counter / 3600);
				minutes = Math.floor((counter - (hours * 3600)) / 60);
				seconds = counter - (hours * 3600) - (minutes * 60);
			}

			document.getElementById("hours").style.setProperty('--value', hours);
			document.getElementById("minutes").style.setProperty('--value', minutes);
			document.getElementById("seconds").style.setProperty('--value', seconds);
		}, 1000)
	}

	toggle_elem.addEventListener("click", async (e) => {
		const duration = durationInputElem.value;
		e.preventDefault();

		if (duration) {
			const currTime = new Date().getTime();

			// Duration is in minutes
			const endTime = currTime + (duration * 60 * 1000);

			// just for debugging
			alert("Start time is: " + new Date().toLocaleString());
			alert("End time set to: " + new Date(endTime).toLocaleString());

			// cache the end time
			await chrome.storage.local.set({ "endTime": endTime });

			// hide the session creator
			durationInputElem.style.display = "none";
			toggle_elem.style.display = "none";
			startSessionBtn.style.display = "block";

			sessionEndElem.innerText = "Session ends at: " + new Date(endTime).toLocaleString();

			// initialize checkbox value based on current focus mode
			const { focusMode } = await chrome.storage.local.get(["focusMode"]);
			setMode(!focusMode);

			// force update
			window.close();
		} else {
			alert("enter a duration dawg");
		}
	});
});

const setMode = async (mode) => {
	await chrome.storage.local.set({ focusMode: mode });

	toggle_elem.checked = mode;
	message_elem.innerText = mode ?
		"Locked in!" :
		"Need help focusing? Flip the switch!";
}
