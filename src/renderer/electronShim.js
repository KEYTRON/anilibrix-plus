// Shim for electron imports in renderer process (nodeIntegration: true)
// Using Function() bypasses Vite's static analysis which would fail on require('electron')
const _electron = Function('return require("electron")')()

export const ipcRenderer = _electron.ipcRenderer
export const ipcMain = _electron.ipcMain
export const app = _electron.app
export const shell = _electron.shell
export const clipboard = _electron.clipboard
export const nativeImage = _electron.nativeImage
export const desktopCapturer = _electron.desktopCapturer
export const remote = _electron.remote
export default _electron
