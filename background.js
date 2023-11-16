/* Ref: https://developer.chrome.com/docs/extensions/reference/storage/
 * storage.sync is synced across browsers on multiple devices, local is not.
 * Since focus mode's ideal behavior is device/session-specific, we use storage.localeCompare();
 */
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
	const currentFocusMode = await chrome.storage.local.get(["focusMode"]);

	/* Reference: https://developer.chrome.com/docs/extensions/reference/tabs/#event-onUpdated
	 * Only injects if "stats" is "complete"
	 *  ^ this fires when the page is done loading. you can find this on the linked page.
	 * This is necessary since "onUpdated" will be fired when the injection happens, leading to an infinite loop. */
	if (changeInfo.status !== 'complete') { return; }

	const { url } = tab;

	if (!blockedUrls.some(blocked => url.includes(blocked))) {
		console.log("Imma let this slide: ", url);
		return;
	}

	console.log("blocked url: ", url);

	/* Reference: https://developer.chrome.com/docs/extensions/reference/scripting/#method-executeScript */
	const injection = {
		files: ["content.js"],
		target: { tabId }
	};

	if (currentFocusMode.focusMode === true) {
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
