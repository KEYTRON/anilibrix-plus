import { useToast } from 'vue-toastification'

export function showAppError (error) {
  const toast = useToast()
  toast.error(typeof error === 'string' ? error : String(error))
}

export function showAppNotification (message) {
  const toast = useToast()
  toast.info(typeof message === 'string' ? message : String(message))
}

// Trigger release notification locally in renderer (mirrors main→renderer IPC flow)
export function sendReleaseNotification (release) {
  const { ipcRenderer } = require('electron')
  ipcRenderer.emit('app:notification:release', null, release)
}
