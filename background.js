chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, _) {
	if (changeInfo.url) {
		if (blockedUrls.some(el => changeInfo.url.includes(el))) {
			chrome.tabs.executeScript(tabId, { file: "content.js" });
		}
	}
}
);

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
