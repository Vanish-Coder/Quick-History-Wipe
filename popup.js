const input = document.getElementById("minutes");
const status = document.getElementById("status");
const linksBox = document.getElementById("links");

chrome.storage.sync.get(["minutes", "links"]).then(({ minutes = 30, links = [] }) => {
  input.value = minutes;
  linksBox.value = links.join("\n");
});

input.addEventListener("input", () => {
  const n = Math.floor(Number(input.value));
  if (n >= 1) {
    chrome.storage.sync.set({ minutes: n });
    status.textContent = "Saved";
  } else {
    status.textContent = "Enter a number of 1 or more";
  }
});

linksBox.addEventListener("input", () => {
  const links = linksBox.value
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  chrome.storage.sync.set({ links });
});

chrome.commands.getAll().then((cmds) => {
  const c = cmds.find((c) => c.name === "clear-history");
  document.getElementById("current-key").textContent = c?.shortcut || "Not set by default";
});

document.getElementById("shortcuts").addEventListener("click", () => {
  chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
});
