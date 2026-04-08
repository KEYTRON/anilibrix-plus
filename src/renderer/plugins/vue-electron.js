// In Electron + Vue 3, access electron APIs via window.electron (contextBridge)
// or import directly in main/preload. This plugin kept as no-op for compatibility.
export default {
  install (app) {
    app.config.globalProperties.$electron = window?.electron || null
  }
}
