/* Ref: https://developer.chrome.com/docs/extensions/reference/storage/
 * storage.sync is synced across browsers on multiple devices, local is not.
 * Since focus mode's ideal behavior is device/session-specific, we use storage.localeCompare();
 */
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
	const { focusMode, blockedUrls, endTime } = await chrome.storage.local.get(["focusMode", "blockedUrls", "endTime"]);

	/* Reference: https://developer.chrome.com/docs/extensions/reference/tabs/#event-onUpdated
	 * Only injects if "stats" is "complete"
	 *  ^ this fires when the page is done loading. you can find this on the linked page.
	 * This is necessary since "onUpdated" will be fired when the injection happens, leading to an infinite loop. */
	if (changeInfo.status !== 'complete') { return; }

	const { url } = tab;

	const currTime = new Date().getTime();
	const isSessionLapsed = currTime > endTime;

	// when current time is greater than end time (i.e. end time is passed)
	// set focus mode to false
	if (isSessionLapsed) {
		await chrome.storage.local.set({ focusMode: false });
	}

	if (!blockedUrls.some(blocked => url.includes(blocked)) && isSessionLapsed) {
		console.log("Imma let this slide: ", url);
		return;
	}

	console.log("blocked url: ", url);

	/* Reference: https://developer.chrome.com/docs/extensions/reference/scripting/#method-executeScript */
	const injection = {
		files: ["content.js"],
		target: { tabId }
	};

	// inject when focusMode is true
	if (focusMode === true && blockedUrls.some(blocked => url.includes(blocked))) {
		chrome.scripting.executeScript(injection);
	}
});


const blockedUrls = [
	"facebook.com",
	"instagram.com",
	"twitter.com",
	"youtube.com",
	"reddit.com",
	"tumblr.com",
	"pinterest.com",
	"linkedin.com",
	"snapchat.com",
	"whatsapp.com",
	"messenger.com",
	"quora.com",
	"viber.com",
	"discord.com",
	"tiktok.com",
	"wechat.com",
	"qq.com",
	"qzone.com",
	"sina.com",
	"weibo.com",
]

chrome.storage.local.set({ blockedUrls });
