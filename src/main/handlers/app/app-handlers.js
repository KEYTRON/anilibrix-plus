// Only ipcRenderer is needed renderer-side; everything else is lazy-loaded in handler (main-process) functions
import { ipcRenderer } from 'electron'
import { debounce } from 'lodash';

// Lazy getters — loaded only when handler functions are called (main process only)
const _main = () => require('@main/utils/windows')
const _ipcMain = () => require('electron').ipcMain
const _app = () => require('electron').app
const _shell = () => require('electron').shell
const _path = () => require('path')
const _sleepBlocker = () => require('../../utils/power-save-blocker')
const _safeStorage = () => require('@main/utils/safe-storage')
const _catGirlFetch = () => require('@utils/fetch').catGirlFetch
const _parse = () => require('content-disposition-attachment').parse
const _showAppError = () => require('@main/handlers/notifications/notifications-handler').showAppError
const _t = () => require('@main/utils/i18n').t

export const APP_DISCORD_RICH_PRESENSE = 'app:richpresense'
export const APP_ABOUT = 'app:about'
export const APP_SYSTEM_SLEEP_DISABLE = 'app:system:disable_sleep'
export const APP_SYSTEM_SLEEP_ENABLE = 'app:system:enable_sleep'
export const APP_DOCK_NUMBER = 'app:dock:number'
export const APP_DEVTOOLS_MAIN = 'app:devtools:main'
export const APP_DEVTOOLS_TORRENT = 'app:devtools:torrent'
export const APP_SAFE_STORAGE_ENCRYPT_REQUEST = 'app:system:safe_storage:encrypt'
export const APP_SHOW_CONFIG = 'app:show_config'
export const APP_RAND = 'app:rand'
export const APP_TORRENT_PARSE = 'app:torrent_parse'
export const APP_UPDATE_PROXY = 'app:update_proxy'
export const APP_GET_SYSTEM_LOCALE = 'app:get_system_locale'
export const APP_SET_LOCALE = 'app:set_locale'

const _trackers = () => [
  'aHR0cDovL3RyLmxpYnJpYS5mdW46MjcxMC9hbm5vdW5jZQ==',
  'dWRwOi8vdHJhY2tlci50b3JyZW50LmV1Lm9yZzo0NTEvYW5ub3VuY2U=',
  'dWRwOi8vdHJhY2tlci5vcGVudHJhY2tyLm9yZzoxMzM3L2Fubm91bmNl',
  'dWRwOi8vdHJhY2tlci5vcGVuYml0dG9ycmVudC5jb206Njk2OS9hbm5vdW5jZQ==',
  'dWRwOi8vdHJhY2tlci50b3JyZW50LmV1Lm9yZzo0NTEvYW5ub3VuY2U='
].map((value) => atob(value))

const _m2t = () => new (require('magnet2torrent-js'))({
  timeout: 30,
  addTrackersToTorrent: true,
  trackers: _trackers()
})

/**
 * Send app about event
 *
 * @return {void}
 */
export const sendAppAboutEvent = () => ipcRenderer.send(APP_ABOUT)

/**
 * Listen app about event
 *
 * @return {Electron.IpcMain}
 */
export const catchAppAboutEvent = () => _ipcMain().on(APP_ABOUT, () => _app().showAboutPanel())

/**
 * Send app devtools main event
 *
 * @return {void}
 */
export const sendAppDevtoolsMainEvent = () => ipcRenderer.send(APP_DEVTOOLS_MAIN)

/**
 * Listen app devtools main event
 *
 * @return {Electron.IpcMain}
 */
export const catchAppDevtoolsMainEvent = () => _ipcMain().on(APP_DEVTOOLS_MAIN, () => _main().Main.showDevTools())

/**
 * Send app devtools torrent event
 *
 * @return {void}
 */
export const sendAppDevtoolsTorrentEvent = () => ipcRenderer.send(APP_DEVTOOLS_TORRENT)

/**
 * Listen app devtools torrent event
 *
 * @return {Electron.IpcMain}
 */
export const catchAppDevtoolsTorrentEvent = () => _ipcMain().on(APP_DEVTOOLS_TORRENT, () => _main().Torrent.showDevTools())

/**
 * Send app docker number event
 *
 * @param number
 * @return {void}
 */
export const sendAppDockNumberEvent = (number) => ipcRenderer.send(APP_DOCK_NUMBER, number)

/**
 * Listen app dock number event
 *
 * @return {void}
 */

export const catchAppDockNumberEvent = () => {
  _ipcMain().on(APP_DOCK_NUMBER, (e, number) => {
    if (_app().dock) _app().dock.setBadge(number && number > 0 ? number.toString() : '')
  })
}

/**
 * Send app system sleep blocker enable event
 *
 * @param number
 * @return {void}
 */
export const sendEnableSystemSleepBlockerEvent = (number) => ipcRenderer.send(APP_SYSTEM_SLEEP_DISABLE)

/**
 * Listen app system sleep blocker enable event
 *
 * @return {void}
 */
export const catchEnableSystemSleepBlockerEvent = () => {
  _ipcMain().on(APP_SYSTEM_SLEEP_DISABLE, (e) => {
    _sleepBlocker().start()
  })
}

/**
 * Send app system sleep blocker disable event
 *
 * @param number
 * @return {void}
 */
export const sendDisableSystemSleepBlockerEvent = (number) => ipcRenderer.send(APP_SYSTEM_SLEEP_ENABLE)

/**
 * Listen app system sleep blocker disable event
 *
 * @return {void}
 */
export const catchDisableSystemSleepBlockerEvent = () => {
  _ipcMain().on(APP_SYSTEM_SLEEP_ENABLE, (e) => {
    _sleepBlocker().stop()
  })
}

/**
 * Send encrypt request to safe storage
 *
 * @param {string} prop Property name
 * @param {string} data Data to encrypt
 * @return {Promise<string>}
 */
export const invokeSafeStorageEncrypt = (prop, data) => ipcRenderer.invoke(APP_SAFE_STORAGE_ENCRYPT_REQUEST, prop, data)

/**
 * Listen encrypt request to safe storage
 *
 * @return {void}
 */
export const handleSafeStorageEncrypt = () => {
  _ipcMain().handle(APP_SAFE_STORAGE_ENCRYPT_REQUEST, async (event, prop, data) => {
    return _safeStorage().setEncrypted(prop, data)
  })
}

/**
 * Send activity for discord rich presence
 *
 * @param {object} data
 * @return {Promise}
 */
export const invokeRichPresense = (data) => ipcRenderer.invoke(APP_DISCORD_RICH_PRESENSE, data)

/**
 * Listens for activity for discord rich presence
 *
 * @return {void}
 */
export const handleRichPresense = (setActivity) => {
  _ipcMain().handle(APP_DISCORD_RICH_PRESENSE, async (event, data) => {
    return setActivity(data)
  })
}

/**
 * Send activity for discord rich presence
 *
 * @param {object} data
 * @return {Promise}
 */
export const invokeShowConfig = () => ipcRenderer.invoke(APP_SHOW_CONFIG)

/**
 * Listens for activity for discord rich presence
 *
 * @return {void}
 */
export const handleShowConfig = () => {
  _ipcMain().handle(APP_SHOW_CONFIG, async (event, data) => {
    return _shell().showItemInFolder(_path().join(_app().getPath('userData'), 'anilibrix.json'))
  })
}

/**
 * Send activity for discord rich presence
 *
 * @param {object} data
 * @return {Promise}
 */
export const invokeRand = () => ipcRenderer.invoke(APP_RAND)

/**
 * Listens for activity for discord rich presence
 *
 * @return {void}
 */
export const handleRand = () => {
  _ipcMain().handle(APP_RAND, async (event) => {
    // delay 500 - 1.5 sec
    await new Promise((r) => setTimeout(r, Math.random() * 1000 + 500))

    try {
      const apiUrl = `http://localhost:${global.internalServerPort}/public/api/index.php`;

      const randomReleaseFormData = new FormData();
      randomReleaseFormData.append('query', 'random_release');

      const randomResponse = await _catGirlFetch()(apiUrl, {
        method: 'POST',
        body: randomReleaseFormData
      })

      if (!randomResponse.ok) {
        throw new Error(`Failed to fetch random release: ${randomResponse.status}`);
      }

      const { data: randomData } = await randomResponse.json();

      if (!randomData?.id) {
        throw new Error('Invalid response: missing release ID');
      }

      const releaseFormData = new FormData();
      releaseFormData.append('query', 'release');
      releaseFormData.append('id', randomData.id);

      const releaseResponse = await _catGirlFetch()(apiUrl, {
        method: 'POST',
        body: releaseFormData
      });

      if (!releaseResponse.ok) {
        throw new Error(`Failed to fetch release details: ${releaseResponse.status}`);
      }

      const releaseData = await releaseResponse.json();

      const { id, names } = releaseData.data;
      const name = names.pop();

      return { id, name };
    } catch (error) {
      console.error('Error in handleRand:', error);
      throw new Error(`Random release fetch failed: ${error.message}`);
    }
  });
};

export const invokeUpdateProxy = (url) => ipcRenderer.invoke(APP_UPDATE_PROXY, url)
export const handleUpdateProxy = (cb) => {
  _ipcMain().handle(APP_UPDATE_PROXY, async (event, url) => {
    return cb(url)
  })
}

export const invokeGetSystemLocale = () => ipcRenderer.invoke(APP_GET_SYSTEM_LOCALE)
export const handleGetSystemLocale = (cb) => {
  _ipcMain().handle(APP_GET_SYSTEM_LOCALE, async () => cb())
}

export const invokeSetAppLocale = (locale) => ipcRenderer.invoke(APP_SET_LOCALE, locale)
export const handleSetAppLocale = (cb) => {
  _ipcMain().handle(APP_SET_LOCALE, async (event, locale) => cb(locale))
}

export const invokeTorrentParse = (url) => ipcRenderer.invoke(APP_TORRENT_PARSE, url)

const showTorrentError = debounce(
  () => _showAppError()(_t()('errors.torrentFileExpired')),
  1000
)

export const handleTorrentParse = () => {
  _ipcMain().handle(APP_TORRENT_PARSE, async (event, url) => {
    url = new URL('https://' + global.upstreamDomainV1Tv + url)

    const abortCtrl = new AbortController()

    console.log('Downloading torrent file', url.toString())

    const timer = setTimeout(() => {
      abortCtrl.abort()
    }, 5000)

    const torrent = await _catGirlFetch()(url, { signal: abortCtrl.signal })
      .then(async x => {
        clearTimeout(timer)
        return {
          name: parse(x.headers.get('content-disposition')).filename || 'unknown.torrent',
          file: Buffer.from(await x.arrayBuffer()),
          url
        }
      })
      .catch(() => {
        clearTimeout(timer)
      })

    const magnet = global.apiCacheService.torrentsRaw.get(+url.searchParams.get('id'))?.magnet

    if (!torrent?.name || torrent?.name === 'unknown.torrent') {
      try {
        console.log('Resolve magnet via torrent net', magnet)
        const t = await _m2t().getTorrent(magnet)
        console.log('Resolved successfully via torrent net', t.name, t.infoHash)

        const file = t.toTorrentFile()

        return {
          file: file.toString('base64'),
          name: t.name,
          magnet: magnet
        }
      } catch (e) {
        showTorrentError()
      }
    }

    return {
      file: torrent?.file ? torrent.file.toString('base64') : '',
      name: torrent?.name || 'fuckyou',
      magnet: magnet
    }
  })
}
