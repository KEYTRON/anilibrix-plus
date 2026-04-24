// Shim for electron imports in renderer process (nodeIntegration: true)
// Using Function() bypasses Vite's static analysis which would fail on require('electron')
const electron = Function('return require("electron")')()
export const { ipcRenderer, ipcMain, shell, clipboard, remote } = electron
export default electron
