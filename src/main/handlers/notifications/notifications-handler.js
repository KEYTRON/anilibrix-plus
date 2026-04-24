import { ipcRenderer } from 'electron'

const _Main = () => require('@main/utils/windows').Main

export const APP_ERROR = 'app:error'
export const APP_NOTIFICATION_RELEASE = 'app:notification:release'

export const showAppError = (error) => _Main().sendToWindow(APP_ERROR, error)

export const sendReleaseNotification = (release) => _Main().sendToWindow(APP_NOTIFICATION_RELEASE, release)

export const catchReleaseNotification = (callback) =>
  ipcRenderer.on(APP_NOTIFICATION_RELEASE, (e, release) => callback(release))
