const DEFAULT_MINUTES = 30;

chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "clear-history") return;

  const { minutes = DEFAULT_MINUTES } = await chrome.storage.sync.get("minutes");
  const endTime = Date.now();
  const startTime = endTime - minutes * 60 * 1000;

  await chrome.history.deleteRange({ startTime, endTime });

  chrome.action.setBadgeBackgroundColor({ color: "#2e7d32" });
  chrome.action.setBadgeText({ text: "✓" });
  setTimeout(() => chrome.action.setBadgeText({ text: "" }), 1500);
});
