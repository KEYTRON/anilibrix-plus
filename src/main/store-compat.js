/**
 * Store compatibility layer for main process.
 * Replaces the old vuex-electron @store import.
 *
 * Settings are read from electron-store (persisted by pinia-plugin-persistedstate).
 * Non-persisted state (session, releases) is synced from renderer via IPC.
 */
import Storage from 'electron-store'
import { ipcMain } from 'electron'
import get from 'lodash/get'

const storage = new Storage({ name: 'anilibrix', clearInvalidConfig: true })
const DEFAULT_STATIC_ENDPOINT = 'https://anilibriaqt.anilib.top'

// In-memory state synced from renderer via IPC
const _mem = {
  session: null,
  releases: []
}

// Sync helper — applied to both ipc.on (fire-and-forget) and ipc.handle (awaitable)
function applySync (payload) {
  if (payload?.session !== undefined) _mem.session = payload.session
  if (payload?.releases !== undefined) _mem.releases = payload.releases
}
ipcMain.on('store:sync', (event, payload) => applySync(payload))
ipcMain.handle('store:sync', (event, payload) => { applySync(payload); return true })

function getSetting (path, defaultValue = null) {
  const directValue = storage.get(`settings.${path}`)
  if (directValue !== undefined) {
    return directValue
  }

  const legacyStateRaw = storage.get('anilibrix')
  if (typeof legacyStateRaw === 'string' && legacyStateRaw.length > 0) {
    try {
      const legacyState = JSON.parse(legacyStateRaw)
      const legacyValue = get(legacyState, `app.settings.system.${path}`)

      if (legacyValue !== undefined) {
        return legacyValue
      }
    } catch (error) {
      console.warn('[store-compat] failed to parse legacy state', error)
    }
  }

  return defaultValue
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
          get staticEndpoint () { return getSetting('api._static_endpoint', DEFAULT_STATIC_ENDPOINT) }
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
      return getSetting('api._static_endpoint', DEFAULT_STATIC_ENDPOINT)
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
