/**
 * Store compatibility layer for main process.
 * Replaces the old vuex-electron @store import.
 *
 * Settings are read from electron-store (persisted by pinia-plugin-persistedstate).
 * Non-persisted state (session, releases) is synced from renderer via IPC.
 */
import Storage from 'electron-store'
import { ipcMain } from 'electron'

const storage = new Storage({ name: 'anilibrix', clearInvalidConfig: true })

// In-memory state synced from renderer via IPC
const _mem = {
  session: null,
  releases: []
}

// Renderer sends state updates to main via 'store:sync' channel
ipcMain.on('store:sync', (event, payload) => {
  if (payload.session !== undefined) _mem.session = payload.session
  if (payload.releases !== undefined) _mem.releases = payload.releases
})

function getSetting (path, defaultValue = null) {
  return storage.get(`settings.${path}`, defaultValue)
}

/**
 * Vuex-compatible store-like object for main process.
 * Only exposes what main utilities actually need.
 */
const store = {
  state: {
    app: {
      settings: {
        system: {
          get proxy () { return getSetting('system.proxy', '') },
          get drpc_enabled () { return getSetting('system.drpc_enabled', true) },
          get ignore_certs () { return getSetting('system.ignore_certs', false) },
          get staticEndpoint () { return getSetting('system.staticEndpoint', 'https://static.anilibria.tv') }
        }
      },
      account: {
        get session () { return _mem.session }
      }
    },
    releases: {
      get data () { return _mem.releases }
    }
  },

  getters: {
    'app/settings/system/staticEndpoint' () {
      return getSetting('system.staticEndpoint', 'https://static.anilibria.tv')
    }
  },

  // Stub for dispatch — main should use IPC to trigger renderer actions
  dispatch (action, ...args) {
    console.warn('[store-compat] dispatch called from main process:', action, '— use IPC instead')
    return Promise.resolve()
  }
}

export default store
export const getStore = () => store
export const setUserId = () => Promise.resolve()
