import Window from './app-window'
import { nativeImage } from 'electron'
import * as path from 'path'

class TorrentWindow extends Window {
  /**
   * Get window configuration
   *
   * @return Object
   */
  getWindowConfiguration () {
    return {
      show: false,
      skipTaskbar: true,
      icon: nativeImage.createFromPath(
        path.join(process.resourcesPath, 'icons', 'icon.png')
      ),
      webPreferences: {
        devTools: true,
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
      }
    }
  }

  /**
   * Get window url
   *
   * @return {string}
   */
  getWindowUrl () {
    const base = process.env.NODE_ENV === 'development'
      ? (process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173')
      : `file://${__dirname}/`
    return `${base}webtorrent.html`
  }
}

export default new TorrentWindow()
