const DEFAULT_MINUTES = 30;

// Turns "https://www.YouTube.com/watch" into { host: "youtube.com", path: "/watch" }
function parseEntry(raw) {
  let s = String(raw).trim().toLowerCase();
  if (!s) return null;
  s = s.replace(/^[a-z][a-z0-9+.-]*:\/\//, "").replace(/^www\./, "");
  const i = s.search(/[\/?#]/);
  const host = i === -1 ? s : s.slice(0, i);
  const path = (i === -1 ? "" : s.slice(i)).replace(/\/+$/, "");
  return host ? { host, path } : null;
}

function matches(url, entry) {
  let u;
  try {
    u = new URL(url);
  } catch {
    return false;
  }
  const h = u.hostname.toLowerCase().replace(/^www\./, "");
  if (!(h === entry.host || h.endsWith("." + entry.host))) return false;
  if (!entry.path) return true;
  return (u.pathname + u.search).toLowerCase().startsWith(entry.path);
}

function flashBadge(text) {
  chrome.action.setBadgeBackgroundColor({ color: "#2e7d32" });
  chrome.action.setBadgeText({ text });
  setTimeout(() => chrome.action.setBadgeText({ text: "" }), 1500);
}

chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "clear-history") return;

  const { minutes = DEFAULT_MINUTES, links = [] } =
    await chrome.storage.sync.get(["minutes", "links"]);
  const endTime = Date.now();
  const startTime = endTime - minutes * 60 * 1000;

  const entries = links.map(parseEntry).filter(Boolean);

  // No links saved: delete everything in the time range
  if (entries.length === 0) {
    await chrome.history.deleteRange({ startTime, endTime });
    flashBadge("✓");
    return;
  }

  // Links saved: delete only matching URLs within the time range
  const toDelete = new Set();
  for (const entry of entries) {
    const results = await chrome.history.search({
      text: entry.host,
      startTime,
      endTime,
      maxResults: 100000,
    });
    for (const item of results) {
      if (matches(item.url, entry)) toDelete.add(item.url);
    }
  }

  await Promise.all([...toDelete].map((url) => chrome.history.deleteUrl({ url })));
  flashBadge(String(toDelete.size));
});
