const input = document.getElementById("minutes");
const status = document.getElementById("status");

chrome.storage.sync.get("minutes").then(({ minutes = 30 }) => {
  input.value = minutes;
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

chrome.commands.getAll().then((cmds) => {
  const c = cmds.find((c) => c.name === "clear-history");
  document.getElementById("current-key").textContent = c?.shortcut || "Not set";
});

document.getElementById("shortcuts").addEventListener("click", () => {
  chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
});
