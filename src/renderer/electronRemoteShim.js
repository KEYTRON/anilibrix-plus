// Shim for @electron/remote imports in renderer (nodeIntegration: true)
const remote = Function('return require("@electron/remote")')()
export const { app, getCurrentWindow, getCurrentWebContents, getGlobal, shell: remoteShell } = remote
export default remote
