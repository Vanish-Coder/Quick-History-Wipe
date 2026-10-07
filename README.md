# Quick History Wipe

A tiny Chrome extension that deletes the last N minutes of your browsing history with a single keyboard shortcut. No menus, no confirmation dialogs.

- Deletes **history only** (nothing else: no cookies, cache, or downloads)
- Only affects the Chrome profile it is installed in
- Default duration: **30 minutes** (changeable to any number)
- No default keybind: you choose your own

## Setup

1. Put these files together in one folder: `manifest.json`, `background.js`, `popup.html`, `popup.js`.
2. Open `chrome://extensions` in Chrome.
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and select the folder.
5. Set your keybind (see below). The extension does nothing until a keybind is assigned.

## Setting the keybind

Chrome only lets users assign extension shortcuts, so this is done on Chrome's own page:

1. Click the extension icon, then **Change keybind** (or go to `chrome://extensions/shortcuts` directly).
2. Find **Quick History Wipe** > **Clear recent history**.
3. Click the box and press the combination you want.

Notes:
- Chrome requires at least one modifier (Cmd, Ctrl, Alt, or Shift) plus a key.
- Pick something you won't hit by accident. Shift-based combos like `Cmd+Shift+1` are a good choice.
- Some built-in Chrome or macOS shortcuts can't be overridden. If a combo won't stick, try another.
- Shortcuts can be set to work only in Chrome, or globally (even when Chrome isn't focused). Use the dropdown next to the shortcut.

## Usage

**Delete history:** press your keybind. The last N minutes of history are deleted immediately, and a green ✓ badge flashes on the extension icon for about 1.5 seconds to confirm.

**Change the duration:**
1. Click the extension icon.
2. Type any number of minutes into the box (for example `500`). It saves automatically.
3. Empty or invalid values (like `0` or `-5`) are ignored.

For "everything", use a very large number such as `5256000` (about 10 years).

## Things to know

- **There is no confirmation and no undo.** Deleted history is gone.
- If Chrome Sync is on, deletions sync to your other devices.
- The duration setting is saved with `chrome.storage.sync`, so it follows your Google account across devices where the extension is installed.
- The popup shows your current keybind, or "Not set by default" if you haven't assigned one.

## Updating

After editing any file, go to `chrome://extensions` and click the reload icon on the extension.

## Permissions

- `history`: needed to delete history entries
- `storage`: needed to remember your chosen duration

## Files

| File | Purpose |
| --- | --- |
| `manifest.json` | Extension config and command definition |
| `background.js` | Listens for the keybind and deletes history |
| `popup.html` / `popup.js` | Popup for setting the duration and linking to the shortcuts page |
