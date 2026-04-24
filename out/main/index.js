"use strict";
const electron = require("electron");
const child_process = require("child_process");
const path$2 = require("path");
const windowStateKeeper = require("electron-window-state");
const lodash = require("lodash");
const Storage = require("electron-store");
const proxy = require("node-global-proxy");
const express = require("express");
const expressProxy = require("express-http-proxy");
const multer = require("multer");
const getPort$2 = require("get-port");
const fs = require("fs/promises");
const fs$1 = require("fs");
const Fuse = require("fuse.js");
const AdmZip = require("adm-zip");
const asyncMutex = require("async-mutex");
const crypto = require("crypto");
const FormData$1 = require("form-data");
const util = require("util");
const stream = require("logrotate-stream");
const dns = require("dns");
const archiver = require("archiver");
const remoteMain = require("@electron/remote/main");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const path__namespace = /* @__PURE__ */ _interopNamespaceDefault(path$2);
const dns__namespace = /* @__PURE__ */ _interopNamespaceDefault(dns);
function applyAppSwitches() {
  electron.app.commandLine.appendSwitch("no-sandbox");
  electron.app.commandLine.appendSwitch("disable-site-isolation-trials");
  electron.app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");
  electron.app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");
}
const version = "2.0.0";
const repository = { "url": "https://github.com/KEYTRON/anilibrix-plus" };
const meta = { "name": "AniLibrix", "links": { "donate": "https://www.anilibria.tv/pages/donate.php", "telegram": "tg://resolve?domain=anilibrix", "anilibria": "https://anilibria.tv", "unofficial": "tg://resolve?domain=anilibrix_plus" } };
class Window {
  /**
   * Constructor
   *
   * @return Window
   */
  constructor() {
    this._window = null;
  }
  /**
   * Get window configuration
   *
   * @return Object
   */
  getWindowConfiguration() {
    return {};
  }
  /**
   * Get window url
   *
   * @return String|null
   */
  getWindowUrl() {
    return null;
  }
  /**
   * Get window
   *
   * @return {BrowserWindow|null}
   */
  getWindow() {
    return this._window;
  }
  /**
   * Create window
   *
   * @return this
   */
  createWindow(configuration) {
    const windowsConfig = this.getWindowConfiguration();
    let opts = { ...windowsConfig, ...configuration };
    const mainWindowState = windowStateKeeper({
      file: "window-state.json",
      defaultWidth: opts.width,
      defaultHeight: opts.height,
      fullScreen: false
    });
    if (this.isMain === true) {
      opts = Object.assign(opts, {
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height
      });
      this._window = new electron.BrowserWindow(opts);
      this._window.on("show", () => {
        mainWindowState.manage(this._window);
      });
    } else {
      this._window = new electron.BrowserWindow(opts);
    }
    return this;
  }
  /**
   * Load window url
   *
   * @return this
   */
  loadUrl() {
    const window = this.getWindow();
    const windowUrl = this.getWindowUrl();
    if (window && windowUrl) {
      window.loadURL(windowUrl);
    }
    return this;
  }
  /**
   * Send to window
   *
   * @param channel
   * @param payload
   */
  sendToWindow(channel, payload) {
    const window = this.getWindow();
    if (window) {
      window.webContents.send(channel, payload);
      if (process.env.NODE_ENV === "development") {
        console.log({
          channel,
          payload
        });
      }
    }
    return this;
  }
  /**
   * Show devtools
   *
   * @return void
   */
  showDevTools() {
    this.getWindow().openDevTools({ mode: "detach" });
  }
}
class MainWindow extends Window {
  /**
   * Get window configuration
   *
   * @return Object
   */
  getWindowConfiguration() {
    const width = 1120;
    const height = 720;
    const minWidth = 820;
    const minHeight = 520;
    return {
      height,
      width,
      minWidth,
      minHeight,
      show: false,
      frame: false,
      darkTheme: true,
      icon: electron.nativeImage.createFromPath(
        path__namespace.join(process.resourcesPath, "icons", "icon.png")
      ),
      titleBarStyle: "hiddenInset",
      useContentSize: true,
      webPreferences: {
        webgl: true,
        webviewTag: true,
        webSecurity: false,
        autoplayPolicy: "no-user-gesture-required",
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
        experimentalFeatures: true,
        allowRunningInsecureContent: true
      },
      backgroundColor: "#121212"
    };
  }
  get isMain() {
    return true;
  }
  /**
   * Get window url
   *
   * @return {string}
   */
  getWindowUrl() {
    return process.env.NODE_ENV === "development" ? process.env.VITE_DEV_SERVER_URL || "http://localhost:5173" : `file://${__dirname}/index.html`;
  }
}
const Main = new MainWindow();
class TorrentWindow extends Window {
  /**
   * Get window configuration
   *
   * @return Object
   */
  getWindowConfiguration() {
    return {
      show: false,
      skipTaskbar: true,
      icon: electron.nativeImage.createFromPath(
        path__namespace.join(process.resourcesPath, "icons", "icon.png")
      ),
      webPreferences: {
        devTools: true,
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
      }
    };
  }
  /**
   * Get window url
   *
   * @return {string}
   */
  getWindowUrl() {
    const base = process.env.NODE_ENV === "development" ? process.env.VITE_DEV_SERVER_URL || "http://localhost:5173" : `file://${__dirname}/`;
    return `${base}webtorrent.html`;
  }
}
const Torrent = new TorrentWindow();
const _main = () => require("@main/utils/windows");
const _ipcMain$1 = () => require("electron").ipcMain;
const _app = () => require("electron").app;
const _shell = () => require("electron").shell;
const _path = () => require("path");
const _sleepBlocker = () => require("../../utils/power-save-blocker");
const _safeStorage = () => require("@main/utils/safe-storage");
const _catGirlFetch = () => require("@utils/fetch").catGirlFetch;
const _showAppError = () => require("@main/handlers/notifications/notifications-handler").showAppError;
const _t = () => require("@main/utils/i18n").t;
const APP_DISCORD_RICH_PRESENSE = "app:richpresense";
const APP_ABOUT = "app:about";
const APP_SYSTEM_SLEEP_DISABLE = "app:system:disable_sleep";
const APP_SYSTEM_SLEEP_ENABLE = "app:system:enable_sleep";
const APP_DOCK_NUMBER = "app:dock:number";
const APP_DEVTOOLS_MAIN = "app:devtools:main";
const APP_DEVTOOLS_TORRENT = "app:devtools:torrent";
const APP_SAFE_STORAGE_ENCRYPT_REQUEST = "app:system:safe_storage:encrypt";
const APP_SHOW_CONFIG = "app:show_config";
const APP_RAND = "app:rand";
const APP_TORRENT_PARSE = "app:torrent_parse";
const APP_UPDATE_PROXY = "app:update_proxy";
const APP_GET_SYSTEM_LOCALE = "app:get_system_locale";
const APP_SET_LOCALE = "app:set_locale";
const _trackers = () => [
  "aHR0cDovL3RyLmxpYnJpYS5mdW46MjcxMC9hbm5vdW5jZQ==",
  "dWRwOi8vdHJhY2tlci50b3JyZW50LmV1Lm9yZzo0NTEvYW5ub3VuY2U=",
  "dWRwOi8vdHJhY2tlci5vcGVudHJhY2tyLm9yZzoxMzM3L2Fubm91bmNl",
  "dWRwOi8vdHJhY2tlci5vcGVuYml0dG9ycmVudC5jb206Njk2OS9hbm5vdW5jZQ==",
  "dWRwOi8vdHJhY2tlci50b3JyZW50LmV1Lm9yZzo0NTEvYW5ub3VuY2U="
].map((value) => atob(value));
const _m2t = () => new (require("magnet2torrent-js"))({
  timeout: 30,
  addTrackersToTorrent: true,
  trackers: _trackers()
});
const catchAppAboutEvent = () => _ipcMain$1().on(APP_ABOUT, () => _app().showAboutPanel());
const catchAppDevtoolsMainEvent = () => _ipcMain$1().on(APP_DEVTOOLS_MAIN, () => _main().Main.showDevTools());
const catchAppDevtoolsTorrentEvent = () => _ipcMain$1().on(APP_DEVTOOLS_TORRENT, () => _main().Torrent.showDevTools());
const catchAppDockNumberEvent = () => {
  _ipcMain$1().on(APP_DOCK_NUMBER, (e, number) => {
    if (_app().dock) _app().dock.setBadge(number && number > 0 ? number.toString() : "");
  });
};
const catchEnableSystemSleepBlockerEvent = () => {
  _ipcMain$1().on(APP_SYSTEM_SLEEP_DISABLE, (e) => {
    _sleepBlocker().start();
  });
};
const catchDisableSystemSleepBlockerEvent = () => {
  _ipcMain$1().on(APP_SYSTEM_SLEEP_ENABLE, (e) => {
    _sleepBlocker().stop();
  });
};
const handleSafeStorageEncrypt = () => {
  _ipcMain$1().handle(APP_SAFE_STORAGE_ENCRYPT_REQUEST, async (event, prop, data) => {
    return _safeStorage().setEncrypted(prop, data);
  });
};
const handleRichPresense = (setActivity2) => {
  _ipcMain$1().handle(APP_DISCORD_RICH_PRESENSE, async (event, data) => {
    return setActivity2(data);
  });
};
const handleShowConfig = () => {
  _ipcMain$1().handle(APP_SHOW_CONFIG, async (event, data) => {
    return _shell().showItemInFolder(_path().join(_app().getPath("userData"), "anilibrix.json"));
  });
};
const handleRand = () => {
  _ipcMain$1().handle(APP_RAND, async (event) => {
    await new Promise((r) => setTimeout(r, Math.random() * 1e3 + 500));
    try {
      const apiUrl = `http://localhost:${global.internalServerPort}/public/api/index.php`;
      const randomReleaseFormData = new FormData();
      randomReleaseFormData.append("query", "random_release");
      const randomResponse = await _catGirlFetch()(apiUrl, {
        method: "POST",
        body: randomReleaseFormData
      });
      if (!randomResponse.ok) {
        throw new Error(`Failed to fetch random release: ${randomResponse.status}`);
      }
      const { data: randomData } = await randomResponse.json();
      if (!randomData?.id) {
        throw new Error("Invalid response: missing release ID");
      }
      const releaseFormData = new FormData();
      releaseFormData.append("query", "release");
      releaseFormData.append("id", randomData.id);
      const releaseResponse = await _catGirlFetch()(apiUrl, {
        method: "POST",
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
      console.error("Error in handleRand:", error);
      throw new Error(`Random release fetch failed: ${error.message}`);
    }
  });
};
const handleUpdateProxy = (cb) => {
  _ipcMain$1().handle(APP_UPDATE_PROXY, async (event, url2) => {
    return cb(url2);
  });
};
const handleGetSystemLocale = (cb) => {
  _ipcMain$1().handle(APP_GET_SYSTEM_LOCALE, async () => cb());
};
const handleSetAppLocale = (cb) => {
  _ipcMain$1().handle(APP_SET_LOCALE, async (event, locale) => cb(locale));
};
const showTorrentError = lodash.debounce(
  () => _showAppError()(_t()("errors.torrentFileExpired")),
  1e3
);
const handleTorrentParse = () => {
  _ipcMain$1().handle(APP_TORRENT_PARSE, async (event, url2) => {
    url2 = new URL("https://" + global.upstreamDomainV1Tv + url2);
    const abortCtrl = new AbortController();
    console.log("Downloading torrent file", url2.toString());
    const timer = setTimeout(() => {
      abortCtrl.abort();
    }, 5e3);
    const torrent = await _catGirlFetch()(url2, { signal: abortCtrl.signal }).then(async (x) => {
      clearTimeout(timer);
      return {
        name: parse(x.headers.get("content-disposition")).filename || "unknown.torrent",
        file: Buffer.from(await x.arrayBuffer()),
        url: url2
      };
    }).catch(() => {
      clearTimeout(timer);
    });
    const magnet = global.apiCacheService.torrentsRaw.get(+url2.searchParams.get("id"))?.magnet;
    if (!torrent?.name || torrent?.name === "unknown.torrent") {
      try {
        console.log("Resolve magnet via torrent net", magnet);
        const t2 = await _m2t().getTorrent(magnet);
        console.log("Resolved successfully via torrent net", t2.name, t2.infoHash);
        const file = t2.toTorrentFile();
        return {
          file: file.toString("base64"),
          name: t2.name,
          magnet
        };
      } catch (e) {
        showTorrentError();
      }
    }
    return {
      file: torrent?.file ? torrent.file.toString("base64") : "",
      name: torrent?.name || "fuckyou",
      magnet
    };
  });
};
const _windows$1 = () => require("@main/utils/windows");
const _ipcMain = () => require("electron").ipcMain;
const TORRENT_CLEAR = "torrent:clear";
const TORRENT_ERROR = "torrent:error";
const TORRENT_START = "torrent:start";
const TORRENT_SERVER = "torrent:server";
const TORRENT_DESTROY = "torrent:destroy";
const TORRENT_DOWNLOAD = "torrent:download";
const broadcastTorrentEvents = () => {
  const { Main: Main2, Torrent: Torrent2 } = _windows$1();
  const ipcMain = _ipcMain();
  const communications = [
    { channel: TORRENT_CLEAR, window: () => Main2 },
    { channel: TORRENT_ERROR, window: () => Main2 },
    { channel: TORRENT_START, window: () => Torrent2 },
    { channel: TORRENT_SERVER, window: () => Main2 },
    { channel: TORRENT_DESTROY, window: () => Torrent2 },
    { channel: TORRENT_DOWNLOAD, window: () => Main2 }
  ];
  communications.forEach((communication) => {
    ipcMain.on(
      communication.channel,
      (e, payload) => communication.window().sendToWindow(communication.channel, payload)
    );
  });
};
const storage = new Storage({ name: "anilibrix", clearInvalidConfig: true });
const _mem = {
  session: null,
  releases: []
};
electron.ipcMain.on("store:sync", (event, payload) => {
  if (payload.session !== void 0) _mem.session = payload.session;
  if (payload.releases !== void 0) _mem.releases = payload.releases;
});
function getSetting(path2, defaultValue = null) {
  return storage.get(`settings.${path2}`, defaultValue);
}
const store = {
  state: {
    app: {
      settings: {
        system: {
          get proxy() {
            return getSetting("system.proxy", "");
          },
          get drpc_enabled() {
            return getSetting("system.drpc_enabled", true);
          },
          get ignore_certs() {
            return getSetting("system.ignore_certs", false);
          },
          get staticEndpoint() {
            return getSetting("system.staticEndpoint", "https://static.anilibria.tv");
          }
        }
      },
      account: {
        get session() {
          return _mem.session;
        }
      }
    },
    releases: {
      get data() {
        return _mem.releases;
      }
    }
  },
  getters: {
    "app/settings/system/staticEndpoint"() {
      return getSetting("system.staticEndpoint", "https://static.anilibria.tv");
    }
  },
  // Stub for dispatch — main should use IPC to trigger renderer actions
  dispatch(action, ...args) {
    console.warn("[store-compat] dispatch called from main process:", action, "— use IPC instead");
    return Promise.resolve();
  }
};
const en = {
  common: {
    appTitle: "AniLibrix Plus",
    noData: "No data",
    back: "Back",
    close: "Close",
    cancel: "Cancel",
    reload: "Reload",
    settings: "Settings",
    filters: "Filters",
    saveLogs: "Save logs",
    restart: "Restart",
    loading: "Saving...",
    logsSaved: "Logs saved",
    showMore: "Show more",
    home: "Home",
    episodes: "Episodes",
    comments: "Comments",
    torrents: "Torrents",
    linked: "Related",
    release: "Release",
    releaseLink: "Release link",
    shareVk: "Share on VK",
    shareTelegram: "Share on Telegram",
    shareTwitter: "Share on Twitter",
    login: "Log in",
    logout: "Log out",
    minutesShort: "min",
    secondsShort: "sec"
  },
  toolbar: {
    releases: "Releases",
    catalog: "Catalog",
    favorites: "Favorites",
    randomRelease: "Random release",
    settings: "App settings",
    searchPlaceholder: "Search release...",
    refreshTitle: "Refresh latest releases",
    refreshedAt: "Updated at {datetime}",
    login: "Log in",
    notificationsWeek: "Latest notifications this week",
    notificationsEmptyTitle: "There are no notifications here yet",
    notificationsEmptySubtitle: "Maybe something interesting will be released soon...",
    notificationEpisode: "Episode {episodeNumber} is out",
    accountFavorites: "In favorites",
    accountWatched: "Watched",
    accountSpent: "Time spent watching"
  },
  language: {
    switchToEnglish: "Switch interface to English",
    switchToRussian: "Переключить интерфейс на русский"
  },
  update: {
    title: "Update available",
    github: "Download from GitHub",
    telegram: "Download from Telegram"
  },
  settings: {
    title: "App settings",
    playbackTitle: "Release playback settings",
    playbackDescription: "Here you can configure torrent playback support and other playback settings.",
    systemTitle: "App settings",
    systemDescription: "Here you can configure automatic release updates, system notifications, and other application settings.",
    torrentsTitle: "Torrents",
    torrentsDescriptionPrimary: "You can enable torrents that will automatically be linked to release episodes and made available for playback.",
    torrentsDescriptionSecondary: "Torrents do not require an external player or client and are available online in the quality selection menu.",
    torrentsEnabled: "Play torrents",
    torrentsHint: "Using torrents requires more connection and parsing time, which can negatively affect release data loading speed, especially when using a proxy server.",
    autoplayNext: "Autoplay next episode",
    autoplayNextHint: "After an episode ends, the player will automatically start the next episode in the release if it is available.",
    bufferTitle: "Video buffer size",
    bufferHint: "Buffered preload size. Default is 5 minutes.",
    bufferLabel: "Buffer size in seconds",
    bufferDescription: "Defines the amount of buffer the player keeps in memory and preloads while watching.",
    autoSkip: "Auto-skip opening",
    autoSkipHint: "If opening skip markers are available, the opening will be skipped automatically.",
    autoSkipHotkey: "Hotkey to toggle auto-skip",
    openingSkipButton: "Opening skip button",
    openingSkipButtonHint: "An extra button will appear in the player UI and seek forward by the specified number of seconds.",
    openingSkipButtonHintExtra: "This button does not guarantee an accurate opening skip.",
    openingSkipButtonHotkey: "Hotkey for the opening skip button",
    hotkeyInput: "Press a key combination here",
    openingSkipTimeHint: "You can set how many seconds to skip for the opening.",
    openingSkipTimeLabel: "Opening skip time in seconds",
    moveWindowButtons: "Move window controls to the right",
    moveWindowButtonsHint: "Moves the window control buttons (minimize, close, maximize) to the right.",
    favoriteNotifications: "Filter notifications by favorites",
    favoriteNotificationsHint: "Shows notifications only for releases in favorites.",
    ignoreCerts: "Ignore certificate errors",
    ignoreCertsHint: "Ignore trusted certificate validation errors.",
    operaProxy: "Use Opera Proxy",
    proxyServer: "Proxy server",
    proxyHint: "Proxy used for static and API servers. HTTP and HTTPS are supported.",
    restartAfterServerChange: "Restarting the app after changing servers is recommended.",
    apiEndpoint: "API server address (select one or enter your own)",
    staticEndpoint: "Static server address (select one or enter your own)",
    apiDescription: "You can use the main server if it is not blocked by your provider, or use additional servers. You can also enter your own API and static server addresses.",
    richPresenceHint: "The app will show information about the currently watched release in Discord Rich Presence.",
    systemNotifications: "Show system notifications",
    systemNotificationsHint: "If the app detects an updated release while loading the latest releases, it will show a system notification about the new episode.",
    autoUpdates: "Automatic release updates",
    autoUpdatesHint: "The app will refresh latest releases in the background even when minimized.",
    updatesTimeoutHint: "You can set how often the app refreshes releases in the background.",
    updatesTimeoutLabel: "Release update interval",
    snapshots: "Snapshots",
    snapshotsHint: "You can create backups of app data linked to your account.",
    snapshotsList: "Snapshots list",
    credentialsBuild: "Unofficial build {version}",
    about: "About",
    debugTools: "Debug tools",
    credentialsDisclaimer: "All materials in the app are provided for personal preview viewing only.",
    actionsTitle: "System commands",
    actionsDescription: "Useful commands for managing the application",
    reloadApp: "Reload application",
    showConfig: "Show config file location",
    minimizeApp: "Minimize application",
    closeApp: "Close application",
    resetCache: "Reset app cache and settings",
    debugTitle: "Debug tools",
    debugDescription: "A list of debugging tools for the application, mainly intended for developers",
    appConsole: "Application console",
    torrentConsole: "Torrent server console",
    addNotification: "Add notification to store",
    logStore: "Print store data to console"
  },
  releases: {
    pageTitle: "Latest releases",
    refreshUnsupported: "This feature is not supported by the selected API server"
  },
  catalog: {
    pageTitle: "Catalog",
    title: "Release catalog",
    subtitle: "You can choose genres and years to fine-tune the release list.",
    sort: "Sorting",
    sortNew: "Newest first",
    sortPopular: "Most popular",
    genres: "Genres",
    genresSubtitle: "Filter the release list by selected genres.",
    years: "Period",
    yearsSubtitle: "Filter the release list by release years.",
    sortSubtitle: "Sort the release list by popularity or novelty.",
    yearsPlaceholder: "Years",
    genresPlaceholder: "Select genres",
    releaseDomain: "Link domain"
  },
  favorites: {
    pageTitle: "Favorites",
    title: "Favorite releases",
    subtitle: "List of your favorite releases",
    searchPlaceholder: "Search favorite releases...",
    watchedReleases: "Watched releases",
    watchedReleasesHint: "Show or hide releases you already watched.",
    completedOnly: "Completed only",
    completedOnlyHint: "Show or hide unfinished releases.",
    sorting: "Sorting",
    sortingHint: "Choose how releases are sorted.",
    grouping: "Grouping",
    groupingHint: "Choose how releases are grouped.",
    noGrouping: "No grouping",
    yearsGrouping: "By year",
    sortTitle: "By title",
    sortPopularity: "By popularity",
    sortFavoriteDate: "By favorite date",
    sortUpdates: "By update date",
    authorizationHint: "You need to log in to view this section.",
    authorize: "Log in",
    releaseDomain: "Link domain"
  },
  release: {
    missingTitle: "Release not found",
    missingBody: "This content is unavailable in the local app storage.",
    missingReasons: "Possible reasons:",
    missingReasonCache: "Outdated app cache",
    missingReasonSync: "Server synchronization issues",
    missingReasonTemporary: "Temporary data outage",
    whatHappened: "What happened?",
    startWatching: "Start watching",
    continueWatching: "Continue from episode {episode}",
    voicedBy: "Voiced by",
    creditsOther: "Translation, design, subtitles, timing",
    copySuccess: "Link copied to clipboard",
    copyError: "Failed to copy the link",
    shareText: 'Watch "{title}" on {domain}',
    torrentMagnet: "Use magnet links",
    torrentSeries: "Episode {series}",
    torrentCopyError: "Failed to copy the link",
    torrentFetchError: "Unable to get the torrent file from the server. Check your connection or use Magnet.",
    progressAllWatched: "All episodes watched {total}",
    progressAllWatchedDense: "All episodes {total}",
    progressNone: "No episodes watched out of {episodes} {total}",
    progressNoneDense: "None out of {episodes} {total}",
    progressPartial: "Watched {watched} out of {episodes} {total}",
    progressPartialDense: "{watched} of {episodes} {total}",
    markEpisodeSeen: "Mark episode as watched",
    unmarkEpisodeSeen: "Remove watched mark",
    markAllSeen: "Mark all episodes as watched",
    unmarkAllSeen: "Remove all watched marks"
  },
  player: {
    noSourceData: "No playback data available",
    autoSkipOff: "Auto-skip opening disabled",
    autoSkipOn: "Auto-skip opening enabled",
    unsupportedAudioTrack: "Audio track is not supported",
    skip: "Skip",
    watch: "Watch",
    markSkipped: "Marker skipped",
    nextCancel: "Cancel",
    toReleases: "Back to releases",
    toCatalog: "Catalog",
    toFavorites: "Favorites",
    toEpisodes: "Episodes",
    toTorrent: "Torrent",
    openingSeek: "Opening seek",
    torrentTitle: "Torrent",
    torrentSubtitle: "Information about the current torrent and connection",
    torrentWarning: "A low number of seeders and leechers may negatively affect download speed and cause playback buffering.",
    torrentName: "Torrent name",
    torrentCreatedAt: "Torrent created at",
    torrentSeeders: "Seeders",
    torrentLeechers: "Leechers",
    torrentFile: "Playing file",
    torrentSize: "File size",
    torrentDownloadSpeed: "Download speed",
    torrentUploadSpeed: "Upload speed",
    torrentProgress: "Progress"
  },
  notifications: {
    commentsLoadError: "Failed to load comments",
    commentsLoadCertError: "Failed to load comments. Certificate error."
  },
  login: {
    title: "Log in",
    subtitle: "Enter the credentials you used on the AniLibria website.",
    emailPlaceholder: "Email or login",
    passwordPlaceholder: "Password",
    vkLogin: "Sign in with VK",
    userNotRegistered: "User is not registered"
  },
  blank: {
    title: "What happened?",
    subtitle: "The issue may be related to an internal API error or a navigation error in the app.",
    backBug: "If you see this after pressing Back, this is a known issue that has not been fixed yet.",
    defaultError: "An error occurred while loading the episode"
  },
  dialogs: {
    exitTitle: "Exit",
    exitSubtitle: "Do you really want to exit the application?",
    exitConfirm: "Exit",
    cacheTitle: "Application cache",
    cacheSubtitle: "Do you really want to reset the app cache and settings?",
    cacheConfirm: "Reset",
    warning: "WARNING",
    confirmSnapshotConsent: "Consent is required to transfer session data to a third-party server to work with snapshots",
    confirmSnapshotNoPassword: "Your account password is never exposed or transferred in any form",
    confirmAccept: "I agree",
    confirmDecline: "No, thanks",
    createSnapshotTitle: "Create snapshot",
    createSnapshotQuestion: "Do you really want to create a snapshot?",
    yes: "Yes",
    removeSnapshotQuestion: "Do you really want to delete the snapshot?",
    restoreSnapshotQuestion: "Do you really want to restore data from the snapshot?",
    restoreSnapshotWarning: "This action cannot be undone. Current data will be replaced with snapshot data.",
    snapshotsListTitle: "Snapshots list",
    newSnapshot: "New snapshot",
    createdAt: "Created at",
    actions: "Actions",
    snapshotApplied: "Snapshot data applied"
  },
  releasesView: {
    errorTitle: "Failed to load releases",
    errorSubtitlePrimary: "The problem may be related to your connection or the API server",
    errorSubtitleSecondary: "Try changing connection settings or try again later",
    retry: "Retry",
    watch: "Watch"
  },
  main: {
    about: "About",
    telegram: "Telegram channel",
    sourceCode: "Source code on GitHub",
    anilibria: "AniLibria",
    unofficial: "Unofficial releases channel",
    donate: "Support the project",
    minimize: "Minimize app",
    quit: "Quit app",
    debug: "Debug",
    appConsole: "App console",
    torrentConsole: "Torrent server console",
    addNotification: "Add notification to store",
    logStore: "Print store data to console",
    forceReload: "Reload app",
    window: "Window",
    saveLogsDialog: "Save logs",
    splashStartTitle: "Starting Anilibrix Plus..."
  },
  errors: {
    genericLoadReleases: "Failed to load releases",
    genericSearchReleases: "Failed to search releases",
    genericLoadGenres: "Failed to load genre filters",
    genericLoadYears: "Failed to load year filters",
    genericLoadRelease: "Failed to load release",
    genericLoadFavorites: "Failed to load favorite releases",
    requestFailed: "Request failed",
    sessionUndefined: "Session is not defined",
    serverError: "Server error",
    authFailed: "Authorization failed",
    torrentFileExpired: "Failed to get the torrent file. The link expired or the torrent does not exist.",
    torrentNoSource: "Failed to determine playback source",
    torrentConnectFailed: "Failed to connect to the playback source",
    torrentInitFailed: "An error occurred while initializing the torrent file",
    torrentNotFound: "Torrent not found",
    torrentStopFailed: "An error occurred while stopping and destroying the torrent file"
  },
  generated: {
    episode: "Episode {number}",
    shareThisRelease: "this release"
  },
  facts: [
    "Fact #1: About 60 percent of all animation on Earth is Japanese anime.",
    "Fact #2: The first anime to become famous outside Japan was Astro Boy in 1963.",
    "Fact #3: The first anime shown in the USSR was “The Flying Phantom Ship”.",
    "Fact #4: The anime hair and body drawing style was developed in Japan, and the eye style was inspired by Walt Disney.",
    "Fact #5: By unspoken anime law, the more important a character is, the more detailed their eyes are.",
    "Fact #6: In Japan, more paper is used to print comics than to make toilet paper rolls.",
    "Fact #8: In Japan, the term “otaku” often has a negative meaning for people obsessed with something.",
    "Fact #9: There is a rule with no exceptions yet: if an anime adaptation is released for a manga, its sales increase by at least 10 percent.",
    "Fact #10: The longest-running anime series is “Sazae-san”, airing since 1969 with more than 7,000 episodes."
  ],
  units: {
    release: ["release", "releases"],
    episode: ["episode", "episodes"],
    hour: ["hour", "hours"]
  }
};
const ru = {
  common: {
    appTitle: "AniLibrix Plus",
    noData: "Нет данных",
    back: "Назад",
    close: "Закрыть",
    cancel: "Отмена",
    reload: "Обновить",
    settings: "Настройки",
    filters: "Фильтры",
    saveLogs: "Сохранить логи",
    restart: "Перезапустить",
    loading: "Сохранение...",
    logsSaved: "Логи сохранены",
    showMore: "Показать еще",
    home: "На главную",
    episodes: "Эпизоды",
    comments: "Комментарии",
    torrents: "Торренты",
    linked: "Связанное",
    release: "Релиз",
    releaseLink: "Ссылка на релиз",
    shareVk: "Поделиться в VK",
    shareTelegram: "Поделиться в Telegram",
    shareTwitter: "Поделиться в Twitter",
    login: "Авторизация",
    logout: "Выход",
    minutesShort: "мин",
    secondsShort: "сек"
  },
  toolbar: {
    releases: "Релизы",
    catalog: "Каталог",
    favorites: "Избранное",
    randomRelease: "Случайный релиз",
    settings: "Настройки приложения",
    searchPlaceholder: "Поиск релиза ...",
    refreshTitle: "Обновить последние релизы",
    refreshedAt: "Обновлено в {datetime}",
    login: "Авторизация",
    notificationsWeek: "Последние уведомления за неделю",
    notificationsEmptyTitle: "Пока что здесь нет ни одного уведомления",
    notificationsEmptySubtitle: "Возможно скоро выйдет что-то интересное ...",
    notificationEpisode: "Вышла {episodeNumber} серия",
    accountFavorites: "В избранном",
    accountWatched: "Просмотрено",
    accountSpent: "Потрачено на просмотр"
  },
  language: {
    switchToEnglish: "Switch interface to English",
    switchToRussian: "Переключить интерфейс на русский"
  },
  update: {
    title: "Доступно обновление",
    github: "Скачать Github",
    telegram: "Скачать Telegram"
  },
  settings: {
    title: "Настройки приложения",
    playbackTitle: "Настройки воспроизведения релизов",
    playbackDescription: "В данном разделе вы можете настроить возможность смотреть релизы, используя торренты, а также другие настройки воспроизведения",
    systemTitle: "Настройки приложения",
    systemDescription: "В данном разделе вы можете настроить автоматическое обновление релизов, системные уведомления и другие параметры приложения",
    torrentsTitle: "Торренты",
    torrentsDescriptionPrimary: "Вы можете подключить торренты, которые автоматически будут связаны с эпизодами релизов и доступны для просмотра.",
    torrentsDescriptionSecondary: "Торренты не требуют стороннего плеера или клиента и доступны онлайн, в меню выбора качества воспроизведения релиза.",
    torrentsEnabled: "Воспроизводить торренты",
    torrentsHint: "Использование торрентов требует большего времени подключения и парсинга, что может негативно сказаться на скорости загрузки данных по релизам, особенно при использовании прокси-сервера",
    autoplayNext: "Автовоспроизведение следующего эпизода",
    autoplayNextHint: "После окончания эпизода плеер автоматически начнет воспроизведение следующего эпизода в релизе, при его наличии",
    bufferTitle: "Размер видео буфера",
    bufferHint: "Величина буфера подгрузки видео, по умолчанию 5 минут",
    bufferLabel: "Размер буфера в секундах",
    bufferDescription: "Указывает величину буфера, который плеер держит в памяти и предзагружает видео во время просмотра",
    autoSkip: "Автоматический пропуск опенинга",
    autoSkipHint: "При наличии меток пропуска опенинга, он будет автоматически пропускаться",
    autoSkipHotkey: "Горячая клавиша включения и выключения авто пропуска",
    openingSkipButton: "Кнопка пропуска опенинга",
    openingSkipButtonHint: "В интерфейсе плеера появится дополнительная кнопка, которая перемотает плеер на указанное количество секунд",
    openingSkipButtonHintExtra: "Данная кнопка не гарантирует корректный пропуск опенинга",
    openingSkipButtonHotkey: "Горячая клавиша кнопки пропуска опенинга",
    hotkeyInput: "Нажми тут сочетание клавиш",
    openingSkipTimeHint: "Вы можете указать на сколько секунд пропускать опенинг",
    openingSkipTimeLabel: "Количество секунд для пропуска опенинга",
    moveWindowButtons: "Переместить кнопки контроля вправо",
    moveWindowButtonsHint: "Перемещает кнопки управления окном (свернуть, закрыть и развернуть) вправо",
    favoriteNotifications: "Фильтровать уведомления по избранному",
    favoriteNotificationsHint: "Включает показ уведомлений только для избранных релизов",
    ignoreCerts: "Игнорировать ошибки сертификатов",
    ignoreCertsHint: "Игнорирование проверки доверенных сертификатов",
    operaProxy: "Использовать Opera Proxy",
    proxyServer: "Прокси сервер",
    proxyHint: "Прокси для подключения к серверам статики и API. Поддерживаются HTTP и HTTPS",
    restartAfterServerChange: "После изменения серверов рекомендуется перезагрузить приложение",
    apiEndpoint: "Адрес сервера API (выберите или впишите свой)",
    staticEndpoint: "Адрес сервера статики (выберите или впишите свой)",
    apiDescription: "Вы можете использовать основной сервер, если он не заблокирован вашим провайдером, или использовать дополнительные сервера. Также вы можете ввести свои адреса серверов API и статики в соответствующие поля.",
    richPresenceHint: "Приложение будет выводить информацию о просматриваемом релизе в Discord Rich Presence",
    systemNotifications: "Показывать системные уведомления",
    systemNotificationsHint: "Если при загрузке последних релизов приложение обнаружит обновленный релиз, то оно покажет системное уведомление о новом эпизоде",
    autoUpdates: "Автоматическое обновление релизов",
    autoUpdatesHint: "Приложение будет в фоне обновлять последние релизы, даже если оно свернуто",
    updatesTimeoutHint: "Вы можете указать с какой периодичностью приложение будет обновлять релизы в фоновом режиме",
    updatesTimeoutLabel: "Периодичность обновления релизов",
    snapshots: "Снапшоты",
    snapshotsHint: "Вы можете создавать резервные копии данных приложения, привязанные к вашему аккаунту",
    snapshotsList: "Список снапшотов",
    credentialsBuild: "Не официальная сборка {version}",
    about: "О приложении",
    debugTools: "Инструменты отладки",
    credentialsDisclaimer: "Весь материал в приложении представлен исключительно для домашнего ознакомительного просмотра.",
    actionsTitle: "Системные команды",
    actionsDescription: "Некоторые полезные команды для управления приложением",
    reloadApp: "Перезагрузить приложение",
    showConfig: "Показать расположение конфиг файла",
    minimizeApp: "Свернуть приложение",
    closeApp: "Закрыть приложение",
    resetCache: "Сбросить кеш и настройки приложения",
    debugTitle: "Инструменты отладки",
    debugDescription: "Список инструментов для отладки приложения. Предназначены, в основном, для разработчиков",
    appConsole: "Консоль приложения",
    torrentConsole: "Консоль торрент-сервера",
    addNotification: "Добавить уведомление в хранилище",
    logStore: "Показать данные хранилища в консоли"
  },
  releases: {
    pageTitle: "Последние релизы",
    refreshUnsupported: "Функция не поддерживается выбранным API сервером"
  },
  catalog: {
    pageTitle: "Каталог",
    title: "Каталог релизов",
    subtitle: "Вы можете выбрать жанры и года для более тонкой настройки списка релизов",
    sort: "Сортировка",
    sortNew: "По новизне",
    sortPopular: "По популярности",
    genres: "Жанры",
    genresSubtitle: "Вы можете отфильтровать список релизов по указанным жанрам",
    years: "Период",
    yearsSubtitle: "Вы можете отфильтровать список релизов по годам выпуска",
    sortSubtitle: "Вы можете отсортировть список релизов по популярности или новизне",
    yearsPlaceholder: "Года",
    genresPlaceholder: "Выбрать жанры",
    releaseDomain: "Домен для ссылки"
  },
  favorites: {
    pageTitle: "Избранное",
    title: "Избранные релизы",
    subtitle: "Список ваших избранных релизов",
    searchPlaceholder: "Поиск по избранным релизам ...",
    watchedReleases: "Просмотренные релизы",
    watchedReleasesHint: "Вы можете показать или скрыть уже просмотренные релизы",
    completedOnly: "Только завершенные",
    completedOnlyHint: "Вы можете показать или скрыть незаконченные релизы",
    sorting: "Сортировка",
    sortingHint: "Вы можете настроить способ сортировки релизов",
    grouping: "Группировка",
    groupingHint: "Вы можете настроить способ группровки релизов",
    noGrouping: "Без группировки",
    yearsGrouping: "По годам",
    sortTitle: "По названию",
    sortPopularity: "По популярности",
    sortFavoriteDate: "По дате добавления в избранное",
    sortUpdates: "По дате обновления релизов",
    authorizationHint: "Для просмотра необходимо авторизоваться в приложении",
    authorize: "Авторизоваться",
    releaseDomain: "Домен для ссылки"
  },
  release: {
    missingTitle: "Релиз не найден",
    missingBody: "Данный контент недоступен в локальном хранилище приложения.",
    missingReasons: "Возможные причины:",
    missingReasonCache: "Устаревший кеш приложения",
    missingReasonSync: "Проблемы синхронизации с сервером",
    missingReasonTemporary: "Временная недоступность данных",
    whatHappened: "Что произошло?",
    startWatching: "Начать смотреть",
    continueWatching: "Смотреть с {episode} серии",
    voicedBy: "Озвучили",
    creditsOther: "Перевод, оформление, субтитры, тайминг",
    copySuccess: "Ссылка скопирована в буфер",
    copyError: "Не удалось скопировать ссылку",
    shareText: 'Смотри "{title}" на {domain}',
    torrentMagnet: "Использовать magnet ссылки",
    torrentSeries: "Серия {series}",
    torrentCopyError: "Не удалось скопировать ссылку",
    torrentFetchError: "Невозможно получить файл торрента с сервера, проверьте подключение к интернету или воспользуйтесь Magnet",
    progressAllWatched: "Просмотрены все эпизоды {total}",
    progressAllWatchedDense: "Все эпизоды {total}",
    progressNone: "Не просмотрено ни одного эпизода из {episodes} {total}",
    progressNoneDense: "Ни одного эпизода из {episodes} {total}",
    progressPartial: "Просмотрено {watched} из {episodes} {total}",
    progressPartialDense: "{watched} из {episodes} {total}",
    markEpisodeSeen: "Отметить серию как просмотренную",
    unmarkEpisodeSeen: "Снять отметку о просмотре",
    markAllSeen: "Отметить все серии как просмотренные",
    unmarkAllSeen: "Снять все отметки о просмотре"
  },
  player: {
    noSourceData: "Нет данных для воспроизведения",
    autoSkipOff: "Авто пропуск опенинга выключен",
    autoSkipOn: "Авто пропуск опенинга включен",
    unsupportedAudioTrack: "Аудио дорожка не поддерживается",
    skip: "Пропустить",
    watch: "Смотреть",
    markSkipped: "Метка пропущена",
    nextCancel: "Отмена",
    toReleases: "К списку релизов",
    toCatalog: "Каталог",
    toFavorites: "Избранное",
    toEpisodes: "Эпизоды",
    toTorrent: "Торрент",
    openingSeek: "Перемотка опенинга",
    torrentTitle: "Торрент",
    torrentSubtitle: "Данные по воспроизводимому торренту и соединению",
    torrentWarning: "Малое количество сидеров и личеров может негативно сказаться на скорости загрузки и привести к буфферизации воспроизведения",
    torrentName: "Название торрента",
    torrentCreatedAt: "Дата создания торрента",
    torrentSeeders: "Количество сидеров",
    torrentLeechers: "Количество личеров",
    torrentFile: "Воспроизводимый файл",
    torrentSize: "Размер файла",
    torrentDownloadSpeed: "Скорость загрузки",
    torrentUploadSpeed: "Скорость раздачи",
    torrentProgress: "Прогресс"
  },
  notifications: {
    commentsLoadError: "Произошла ошибка при загрузке комментариев",
    commentsLoadCertError: "Произошла ошибка при загрузке комментариев. Ошибка с сертификатом"
  },
  login: {
    title: "Авторизация",
    subtitle: "Укажите данные, с которыми вы зарегистрировались на сайте Анилибрии",
    emailPlaceholder: "Email или логин",
    passwordPlaceholder: "Пароль",
    vkLogin: "Вход через VK",
    userNotRegistered: "Пользователь не зарегистрирован"
  },
  blank: {
    title: "Что произошло?",
    subtitle: "Возможно, проблема связана с внутренней ошибкой API или ошибкой навигации в приложении.",
    backBug: 'Если вы видите эту ошибку после нажатия кнопки "Назад", это известная проблема, которую мы ещё не исправили.',
    defaultError: "При загрузке эпизода произошла ошибка"
  },
  dialogs: {
    exitTitle: "Выход",
    exitSubtitle: "Вы действительно хотите выйти из приложения?",
    exitConfirm: "Выйти",
    cacheTitle: "Кэш приложения",
    cacheSubtitle: "Вы действительно хотите сбросить кеш и настройки приложения?",
    cacheConfirm: "Сбросить",
    warning: "ПРЕДУПРЕЖДЕНИЕ",
    confirmSnapshotConsent: "Требуется согласие на передачу данных (сессионного идентификатора) на сторонний сервер для работы со снапшотами",
    confirmSnapshotNoPassword: "Пароль учетной записи не раскрывается и не передается ни в каком виде",
    confirmAccept: "Я согласен",
    confirmDecline: "Нет, спасибо",
    createSnapshotTitle: "Создание снапшота",
    createSnapshotQuestion: "Вы действительно хотите создать снапшот?",
    yes: "Да",
    removeSnapshotQuestion: "Вы действительно хотите удалить снапшот?",
    restoreSnapshotQuestion: "Вы действительно хотите восстановить данные из снапшота?",
    restoreSnapshotWarning: "Данное действие нельзя отменить, текущие данные будут заменены данными из снапшота",
    snapshotsListTitle: "Список снапшотов",
    newSnapshot: "Новый снапшот",
    createdAt: "Дата и время создания",
    actions: "Действия",
    snapshotApplied: "Данные из снапшота применены"
  },
  releasesView: {
    errorTitle: "Ошибка при загрузке релизов",
    errorSubtitlePrimary: "Возможно проблема связана с вашим соединением или API сервера",
    errorSubtitleSecondary: "Попробуйте изменить настройки соединения или попробуйте позже",
    retry: "Повторить",
    watch: "Смотреть"
  },
  main: {
    about: "О приложении",
    telegram: "Telegram-канал",
    sourceCode: "Исходный код на GitHub",
    anilibria: "Анилибрия",
    unofficial: "Канал не официальных релизов",
    donate: "Поддержать проект",
    minimize: "Свернуть приложение",
    quit: "Закрыть приложение",
    debug: "Отладка",
    appConsole: "Консоль приложения",
    torrentConsole: "Консоль торрент-сервер",
    addNotification: "Добавить уведомление в хранилище",
    logStore: "Показать данные хранилища в консоли",
    forceReload: "Перезагрузить приложение",
    window: "Окно",
    saveLogsDialog: "Save logs",
    splashStartTitle: "Starting Anilibrix Plus..."
  },
  errors: {
    genericLoadReleases: "Произошла ошибка при загрузке релизов",
    genericSearchReleases: "Произошла ошибка при поиске релизов",
    genericLoadGenres: "Произошла ошибка при загрузке фильтров по жанрам",
    genericLoadYears: "Произошла ошибка при загрузке фильтров по годам",
    genericLoadRelease: "Произошла ошибка при загрузке релиза",
    genericLoadFavorites: "Произошла ошибка при загрузке избранных релизов",
    requestFailed: "Ошибка при запросе",
    sessionUndefined: "Сессия не определена",
    serverError: "Ошибка сервера",
    authFailed: "Произошла ошибка при авторизации",
    torrentFileExpired: "Ошибка получения файла торрента, ссылка просрочена или торрент не существует",
    torrentNoSource: "Не удалось определить источник воспроизведения",
    torrentConnectFailed: "Не удалось подключиться к источнику воспроизведения",
    torrentInitFailed: "Произошла ошибка при инициализации торрент-файла",
    torrentNotFound: "Торрент не найден",
    torrentStopFailed: "Произошла ошибка при остановке и уничтожении торрент-файла"
  },
  generated: {
    episode: "Серия {number}",
    shareThisRelease: "этот релиз"
  },
  facts: [
    "Факт №1: 60 процентов всей анимации, что существует на нашей планете, это японское аниме.",
    "Факт №2: Первым аниме, которое прославилось за пределами Японии, был сериал Astro Boy 1963 года.",
    "Факт №3: Первое аниме, которое показали в СССР, был «Летающий корабль-призрак».",
    "Факт №4: Рисовку волос и тела в аниме придумали японцы, а стиль глаз был скопирован у Уолта Диснея.",
    "Факт №5: По негласному закону аниме, чем важнее герой, тем детальнее ему прорисовывают глаза.",
    "Факт №6: В Японии на печать комиксов тратится больше бумаги, чем на производство туалетных рулонов.",
    "Факт №8: В Японии термин «отаку» используется в негативном ключе для описания людей, которые чем-то одержимы.",
    "Факт №9: Существует правило, из которого ещё не было исключений: если по манге выходит аниме, продажи первой возрастают как минимум на 10 процентов.",
    "Факт №10: Самый длинный аниме-сериал это «Садзаэ-сан», который выходит с 1969 года по сей день. В нем больше 7 тысяч серий."
  ],
  units: {
    release: ["релиз", "релиза", "релизов"],
    episode: ["эпизод", "эпизода", "эпизодов"],
    hour: ["час", "часа", "часов"]
  }
};
const SUPPORTED_LOCALES = ["ru", "en"];
const DEFAULT_LOCALE = "en";
const messages = { en, ru };
let currentLocale = DEFAULT_LOCALE;
function getValue(source, path2) {
  return path2.split(".").reduce((value, key) => value && value[key] !== void 0 ? value[key] : void 0, source);
}
function interpolate(value, params = {}) {
  if (typeof value !== "string") {
    return value;
  }
  return value.replace(/\{(\w+)\}/g, (match, key) => params[key] !== void 0 ? params[key] : match);
}
function setMainLocale(locale) {
  currentLocale = locale || DEFAULT_LOCALE;
}
function t(key, params = {}, locale = currentLocale) {
  const localized = getValue(messages[locale] || messages[DEFAULT_LOCALE], key);
  const fallback = localized !== void 0 ? localized : getValue(messages[DEFAULT_LOCALE], key);
  if (fallback === void 0) {
    return key;
  }
  return interpolate(fallback, params);
}
function getFacts(locale = currentLocale) {
  return messages[locale]?.facts || messages[DEFAULT_LOCALE].facts;
}
const createAboutTemplate = () => [
  {
    role: "about",
    label: t("main.about")
  },
  {
    label: t("main.telegram"),
    click: () => electron.shell.openExternal(meta.links.telegram)
  },
  {
    label: t("main.sourceCode"),
    click: () => electron.shell.openExternal(repository.url)
  },
  {
    type: "separator"
  },
  {
    label: t("main.anilibria"),
    click: () => electron.shell.openExternal(meta.links.anilibria)
  },
  {
    label: t("main.unofficial"),
    click: () => electron.shell.openExternal(meta.links.unofficial)
  },
  {
    label: t("main.donate"),
    click: () => electron.shell.openExternal(meta.links.donate)
  },
  {
    type: "separator"
  },
  {
    role: "minimize",
    label: t("main.minimize")
  },
  {
    role: "quit",
    label: t("main.quit")
  }
];
class AppMenu {
  constructor() {
    this._menu = null;
    this._mainWindow = null;
    this._torrentWindow = null;
  }
  init() {
    this._menu = electron.Menu.buildFromTemplate(this._getMenuTemplate());
    this._mainWindow.setMenu(this._menu);
    this._torrentWindow.setMenu(this._menu);
    return this;
  }
  setWindows(main = null, torrent = null) {
    this._mainWindow = main;
    this._torrentWindow = torrent;
    return this;
  }
  _getMenuTemplate() {
    return [
      {
        label: meta.name,
        submenu: createAboutTemplate()
      },
      {
        label: t("main.debug"),
        submenu: [
          {
            role: "toggledevtools",
            label: t("main.appConsole"),
            click: () => this._mainWindow.showDevTools()
          },
          {
            label: t("main.torrentConsole"),
            click: () => this._torrentWindow.showDevTools()
          },
          {
            type: "separator"
          },
          {
            label: t("main.addNotification"),
            click: () => store.dispatch("notifications/setRelease", store.state.releases.data[0])
          },
          {
            label: t("main.logStore"),
            click: () => console.log(store.state)
          },
          {
            type: "separator"
          },
          {
            role: "forcereload",
            label: t("main.forceReload")
          }
        ]
      },
      {
        label: t("main.window"),
        submenu: [
          { role: "cut" },
          { role: "copy" },
          { role: "paste" },
          { role: "selectall" }
        ]
      }
    ];
  }
}
class AppTray {
  constructor() {
    this._tray = null;
  }
  /**
   * Get tray template
   *
   * @return Array
   */
  getTemplate() {
    return [...createAboutTemplate()];
  }
  /**
   * Create tray icon
   *
   * @param MainWindow
   * @param iconPath
   * @return this
   */
  createTrayIcon({ iconPath }) {
    this._tray = new electron.Tray(electron.nativeImage.createFromPath(iconPath));
    this._tray.setContextMenu(electron.Menu.buildFromTemplate(this.getTemplate()));
    this._tray.setIgnoreDoubleClickEvents(true);
    return this;
  }
  /**
   * Set tooltip
   *
   * @param tooltip
   * @return this
   */
  setTooltip(tooltip) {
    this._tray.setToolTip(tooltip);
    return this;
  }
  refreshMenu() {
    if (this._tray) {
      this._tray.setContextMenu(electron.Menu.buildFromTemplate(this.getTemplate()));
    }
    return this;
  }
}
function openWindowInterceptor(details) {
  if (!details.url.startsWith("resource://")) {
    if (!details.url.startsWith("https://oauth.vk.com/authorize") && !details.url.startsWith("https://id.vk.com/auth")) {
      electron.shell.openExternal(details.url);
      return { action: "deny" };
    }
  }
  return {
    action: "allow",
    overrideBrowserWindowOptions: {
      autoHideMenuBar: true
    }
  };
}
const path$1 = require("path");
const readline = require("readline");
const getPort$1 = require("get-port");
const spawn$1 = require("cross-spawn");
const osMap$1 = {
  darwin: "mac",
  win32: "win",
  linux: "linux"
};
let port$1;
let spawnedProcess$1;
const operaFile = process.env.NODE_ENV === "development" ? path$1.join(path$1.dirname(__dirname), "..", "..", "build", osMap$1[process.platform], process.arch, "opera-proxy" + (process.platform === "win32" ? ".exe" : "")) : path$1.join(path$1.dirname(__dirname), "..", "..", "bin", "opera-proxy" + (process.platform === "win32" ? ".exe" : ""));
async function stopOperaProxy() {
  if (spawnedProcess$1) {
    spawnedProcess$1.kill();
    spawnedProcess$1 = null;
    console.log("Opera Proxy stopped");
  }
}
async function startOperaProxy() {
  if (spawnedProcess$1) {
    return;
  }
  port$1 = await getPort$1();
  const opera = spawn$1(operaFile, ["-country", "EU", "--bind-address", "127.0.0.1:" + port$1]);
  spawnedProcess$1 = opera;
  console.log("Opera Proxy started on port " + port$1);
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: opera.stderr
    });
    let isResolved = false;
    rl.on("close", () => {
      console.log("Opera Proxy closed");
      if (!isResolved) {
        reject(new Error("Opera proxy closed before initialization"));
      }
    });
    rl.on("line", (line) => {
      console.log("Opera Proxy", line);
      if (line.includes("Init complete")) {
        console.log("Opera Proxy initialized successfully", port$1);
        isResolved = true;
        resolve(port$1);
      }
    });
    opera.on("error", (error) => {
      console.log("Opera Proxy error:", error);
      if (!isResolved) {
        reject(error);
      }
    });
    setTimeout(() => {
      if (!isResolved) {
        console.warn("Timeout waiting for Opera proxy initialization");
        resolve(port$1);
      }
    }, 1e4);
  });
}
function getActiveOperaProxyURL() {
  return "http://127.0.0.1:" + port$1;
}
const path = require("path");
require("readline");
const getPort = require("get-port");
const spawn = require("cross-spawn");
const osMap = {
  darwin: "mac",
  win32: "win",
  linux: "linux"
};
let port;
let spawnedProcess;
const forwardFile = process.env.NODE_ENV === "development" ? path.join(path.dirname(__dirname), "..", "..", "build", osMap[process.platform], process.arch, "forward-proxy" + (process.platform === "win32" ? ".exe" : "")) : path.join(path.dirname(__dirname), "..", "..", "bin", "forward-proxy" + (process.platform === "win32" ? ".exe" : ""));
async function stopForwardProxy() {
  if (spawnedProcess) {
    spawnedProcess.kill();
    spawnedProcess = null;
    console.log("forward Proxy stopped");
  }
}
async function startForwardProxy() {
  if (spawnedProcess) {
    console.log("Forward Proxy already started, skipping");
    return;
  }
  let resolve, reject;
  const forwardPromise = new Promise((_r, _rj) => {
    resolve = _r;
    reject = _rj;
  });
  port = await getPort();
  const forward = spawn(forwardFile, ["-port", port, "-host", "127.0.0.1", "-verbose"]);
  spawnedProcess = forward;
  forward.stdout.on("data", (data) => {
    if (data.toString().includes("OK_SUCCESS")) {
      resolve();
      console.log("Forward Proxy send OK_SUCCESS");
      return;
    }
    console.log("Forward Proxy:", data.toString());
  });
  forward.on("error", (error) => {
    console.log(error);
    reject();
  });
  forward.on("close", () => {
    console.log("forward Proxy closed");
    reject();
  });
  forward.on("disconnect", () => {
    console.log("forward Proxy disconnected");
    reject();
  });
  return forwardPromise;
}
function getActiveForwardProxyURL() {
  return "http://127.0.0.1:" + port;
}
const OPERA_PROXY = "http://opera";
const proxyServerSetting = store.state.app.settings.system.proxy;
let proxyServer = "";
let _windows = [];
async function setProxy(url2) {
  let currentProxy = "";
  if (url2) {
    try {
      new URL(url2);
    } catch (e) {
      await startForwardProxy();
      return;
    }
    if (url2 === OPERA_PROXY) {
      await startOperaProxy();
      currentProxy = getActiveOperaProxyURL();
    } else {
      await stopOperaProxy().catch(console.error);
      currentProxy = url2;
    }
  } else {
    await startForwardProxy();
    currentProxy = getActiveForwardProxyURL();
  }
  for (const w of _windows) {
    console.log("Set renderer proxy", currentProxy);
    w.webContents.session.setProxy({ proxyRules: currentProxy, proxyBypassRules: "localhost,127.0.0.1,*.local" });
  }
  proxy.setConfig({
    http: currentProxy,
    https: currentProxy
  });
  global.GLOBAL_AGENT.NO_PROXY = "localhost,127.0.0.1,*.local";
  process.env.GLOBAL_AGENT_NO_PROXY = "localhost,127.0.0.1,*.local";
  proxy.start();
}
async function initProxy(windows) {
  _windows = windows;
  if (electron.app.commandLine.hasSwitch("proxy-server")) {
    proxyServer = electron.app.commandLine.getSwitchValue("proxy-server");
  } else {
    proxyServer = proxyServerSetting;
  }
  await setProxy(proxyServer);
}
const DOMAIN = "wwnd.space";
const OLD_IP = "78.46.255.254";
const NEW_IP = "31.184.217.238";
let fixWwndChecked = false;
let fixWwwdNeeded = false;
async function checkWwnd() {
  if (fixWwndChecked) return;
  try {
    const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${DOMAIN}&type=A`, {
      headers: { Accept: "application/dns-json" }
    });
    const data = await res.json();
    const answer = data?.Answer?.find((a) => a.type === 1);
    if (answer?.data === OLD_IP) {
      fixWwwdNeeded = true;
      console.log("EU IP OF WWND.SPACE FOUND, ENABLE REWRITE");
    }
  } catch (e) {
  }
  fixWwndChecked = true;
}
async function catGirlFetch(url2, init = {}) {
  await checkWwnd();
  const u = new URL(url2);
  if (fixWwwdNeeded && u.host === DOMAIN) {
    url2 = url2.replace(DOMAIN, NEW_IP);
    if (!init.headers) init.headers = {};
    init.headers.Host = DOMAIN;
    console.log("FIX WWND.SPACE REQUEST");
  }
  init.redirect = "follow";
  return fetch(url2, init);
}
class APICacheService {
  constructor(cachePath) {
    this.cachePath = cachePath;
    console.log("API Cache Path:", this.cachePath);
    this.isInitialized = false;
    this.cache = /* @__PURE__ */ new Map();
    this.search = null;
    this.mutex = new asyncMutex.Mutex();
    this.initializationPromise = null;
    this.initializationResolve = null;
    this.initializationReject = null;
    this.createInitializationPromise();
  }
  createInitializationPromise() {
    this.initializationPromise = new Promise((resolve, reject) => {
      this.initializationResolve = resolve;
      this.initializationReject = reject;
    });
  }
  async setCacheKey(key, value) {
    const metadataPath = path$2.join(this.cachePath, `${key}.json`);
    this.cache.set(key, value);
    await fs.writeFile(metadataPath, JSON.stringify(value));
  }
  async getCacheKey(key) {
    if (this.cache.has(key)) return this.cache.get(key);
    const metadataPath = path$2.join(this.cachePath, `${key}.json`);
    const metadataContent = await fs.readFile(metadataPath, "utf8");
    const value = JSON.parse(metadataContent);
    this.cache.set(key, value);
    return value;
  }
  async loadCacheMetadata() {
    const activeCachePrefix = await fs.readFile(path$2.join(this.cachePath, "active.cache"), "utf8");
    const metadataPath = path$2.join(this.cachePath, activeCachePrefix + "_metadata");
    const metadataContent = await fs.readFile(metadataPath, "utf8");
    return JSON.parse(metadataContent);
  }
  async loadJsonFiles(filePrefix, count, withoutIndex) {
    const filesData = await Promise.all(
      Array.from({ length: count }, async (_, index) => {
        const filePath = path$2.join(this.cachePath, `${filePrefix}${withoutIndex ? "" : index}.json`);
        const content = await fs.readFile(filePath, "utf8");
        return JSON.parse(content);
      })
    );
    return Object.freeze(filesData.flat());
  }
  async downloadFile(url2, filePath) {
    return new Promise(async (resolve, reject) => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3e4);
        controller.signal.addEventListener("abort", () => clearTimeout(timeoutId), { once: true });
        const response = await catGirlFetch(url2, { signal: controller.signal });
        if (!response.ok) {
          const res = await response.text();
          throw new Error(`Error downloading file: ${response.status} ${res}`);
        }
        const writeStream = fs$1.createWriteStream(filePath);
        if (response.body) {
          for await (const chunk of response.body) {
            writeStream.write(chunk);
          }
          writeStream.end();
        }
        writeStream.on("finish", () => {
          console.log(`File downloaded successfully: ${path$2.basename(filePath)}`);
          resolve();
        });
        writeStream.on("error", (error) => {
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  async downloadCache() {
    try {
      const activeCachePrefix = await fs.readFile(path$2.join(this.cachePath, "active.cache"), "utf8").catch((e) => {
        if (e.code === "ENOENT") {
          console.log("Active cache not found");
          return null;
        }
        throw e;
      });
      const uuid = crypto.randomUUID();
      const pathToHashes = path$2.join(this.cachePath, activeCachePrefix + "_hashes.json");
      const pathToHashesTmp = path$2.join(this.cachePath, "hashes.json");
      const hashes = await fs.readFile(pathToHashes, "utf8").catch((e) => {
        if (e.code === "ENOENT") {
          return null;
        }
        throw e;
      });
      let oldHashes;
      if (hashes) {
        console.log("Hashes file found, loading");
        try {
          oldHashes = JSON.parse(hashes);
        } catch (e) {
          console.log("can't parse hashes file", e);
        }
      }
      let newHashesFileContent;
      try {
        console.log("Downloading hashes file from ", global.cacheHashesURL);
        await this.downloadFile(global.cacheHashesURL, pathToHashesTmp);
        newHashesFileContent = await fs.readFile(pathToHashesTmp, "utf8");
        const newHashes = JSON.parse(newHashesFileContent);
        if (oldHashes) {
          if (oldHashes?.cache_files && newHashes?.cache_files) {
            const oldFiles = Object.keys(oldHashes.cache_files);
            const newFiles = Object.keys(newHashes.cache_files);
            const hasNewFiles = newFiles.filter((f) => !oldFiles.includes(f));
            const hasRemovedFiles = oldFiles.filter((f) => !newFiles.includes(f));
            const hasUpdatedFiles = newFiles.filter(
              (f) => oldFiles.includes(f) && oldHashes.cache_files[f].toLowerCase() !== newHashes.cache_files[f].toLowerCase()
            );
            if (!hasNewFiles.length && !hasRemovedFiles.length && !hasUpdatedFiles.length) {
              console.log("No changes detected in cache, skipping download");
              return;
            }
            if (hasNewFiles.length) console.log("New files:", hasNewFiles);
            if (hasRemovedFiles.length) console.log("Removed files:", hasRemovedFiles);
            if (hasUpdatedFiles.length) console.log("Updated files:", hasUpdatedFiles);
            console.log("Changes detected, proceeding with download");
          }
        } else {
          console.log("No old hashes found, nothing to diff, downloading");
        }
      } catch (e) {
        console.log("can't download hashes file", e);
      }
      const pathToZip = path$2.join(this.cachePath, "main.zip");
      await this.downloadFile(global.cacheURL, pathToZip);
      const zip = new AdmZip(pathToZip);
      const entries = zip.getEntries();
      const cacheFiles = entries.filter(
        (entry) => entry.entryName.includes("cache/") && !entry.isDirectory
      );
      const [prefix] = cacheFiles[0].entryName.split("/");
      for (const entry of cacheFiles) {
        const relativePath = entry.entryName.replaceAll(prefix + "/cache/", "");
        const outputPath = path$2.join(this.cachePath, relativePath);
        const dir = path$2.dirname(outputPath);
        if (!fs$1.existsSync(dir)) {
          await fs.mkdir(dir, { recursive: true });
        }
        const newOutputPath = path$2.join(dir, `${uuid}_${path$2.basename(outputPath)}`);
        await fs.writeFile(newOutputPath, entry.getData());
      }
      if (newHashesFileContent) {
        await fs.writeFile(path$2.join(this.cachePath, `${uuid}_hashes.json`), newHashesFileContent);
      }
      await fs.unlink(pathToZip).catch(console.error);
      await fs.writeFile(path$2.join(this.cachePath, "active.cache"), uuid);
      if (activeCachePrefix !== null) {
        const files = await fs.readdir(this.cachePath);
        await Promise.all(
          files.filter((file) => !file.startsWith(uuid) && !["active.cache", "user.json", "favorites.json"].includes(file)).map((file) => fs.unlink(path$2.join(this.cachePath, file)).catch(console.error))
        );
      }
      console.log("Cache downloaded successfully and old cache deleted");
    } catch (e) {
      console.error("Cache download failed", e);
      console.log("Fallback to last cache...");
    }
  }
  async processCache() {
    const activeCachePrefix = await fs.readFile(path$2.join(this.cachePath, "active.cache"), "utf8");
    const { countEpisodes, countReleases } = await this.loadCacheMetadata();
    const [releasesData, episodesData, franchisesData, torrentsData] = await Promise.all([
      this.loadJsonFiles(activeCachePrefix + "_releases", countReleases),
      this.loadJsonFiles(activeCachePrefix + "_episodes", countEpisodes),
      this.loadJsonFiles(activeCachePrefix + "_releaseseries", 1, true),
      this.loadJsonFiles(activeCachePrefix + "_torrents", 1, true)
    ]);
    this.torrentsRaw = /* @__PURE__ */ new Map();
    this.torrents = /* @__PURE__ */ new Map();
    for (const torrent of torrentsData) {
      if (!this.torrents.has(torrent.releaseId)) {
        this.torrents.set(torrent.releaseId, []);
      }
      const torrentNew = {
        id: torrent.id,
        hash: torrent.hash,
        leechers: 0,
        seeders: torrent.seeders,
        completed: 9999,
        quality: `${torrent.type.value} ${torrent.quality.value} ${torrent.codec.value}`,
        series: torrent.description,
        size: torrent.size,
        url: "/public/torrent/download.php?id=" + torrent.id,
        magnet: torrent.magnet,
        ctime: torrent.time
      };
      this.torrentsRaw.set(torrent.id, torrentNew);
      this.torrents.get(torrent.releaseId).push(torrentNew);
    }
    this.years = /* @__PURE__ */ new Set();
    this.genres = /* @__PURE__ */ new Set();
    this.releases = /* @__PURE__ */ new Map();
    releasesData.forEach((release) => {
      release.year && this.years.add(release.year.toString());
      if (release.genres) release.genres.split(",").forEach((v) => v && this.genres.add(v.trim()));
      return this.releases.set(release.id, release);
    });
    this.years = [...this.years].sort((a, b) => b - a);
    this.genres = [...this.genres].sort();
    this.episodes = episodesData;
    this.buildEpisodesIndex();
    this.buildSortedCache();
    this.buildFranchisesCache(franchisesData);
    this.buildSearchCache();
  }
  async initialize() {
    if (this.isInitialized) return "already_initialized";
    console.log("Initializing API cache...");
    try {
      await fs.mkdir(this.cachePath).catch(console.error);
      await this.downloadCache();
      await this.processCache();
      this.isInitialized = true;
      console.log("API cache initialized successfully");
      this.initializationResolve();
      electron.ipcMain.handle("getTorrent", (event, torrentId) => {
        return this.torrentsRaw.get(torrentId);
      });
    } catch (error) {
      console.error("Failed to initialize API cache:", error);
      this.initializationReject(error);
      this.createInitializationPromise();
      throw error;
    }
  }
  buildSearchCache() {
    const releases = Array.from(this.releases.values());
    const fusejs = new Fuse(releases, { keys: ["title", "description", "originalName"], includeScore: true });
    this.search = fusejs;
  }
  buildEpisodesIndex() {
    this.episodesByReleaseId = /* @__PURE__ */ new Map();
    this.episodes.forEach((episode) => {
      this.episodesByReleaseId.set(episode.releaseId, episode.items);
    });
  }
  buildSortedCache() {
    this.sortedEpisodesByFreshness = this.episodes.map((episode, index) => ({
      index,
      releaseId: episode.releaseId,
      updatedAt: Math.max(...episode.items.map((x) => new Date(x.updatedAt).getTime()))
    })).sort((a, b) => a.updatedAt - b.updatedAt);
  }
  buildFranchisesCache(franchisesData) {
    this.franchises = franchisesData;
    this.franchiseByReleaseId = /* @__PURE__ */ new Map();
    franchisesData.forEach((franchise) => {
      if (franchise.releasesIds?.length) {
        franchise.releasesIds.forEach((releaseId) => {
          this.franchiseByReleaseId.set(
            releaseId,
            franchise.releasesIds.map((releaseId2) => {
              const release = this.releases.get(releaseId2);
              if (!release) {
                console.log("Franchise release not found", releaseId2);
                return null;
              }
              return {
                id: release.id,
                names: {
                  ru: release.title,
                  en: release.originalName
                },
                poster: release.poster,
                type: release.type + (release.series && release.series !== "(0)" ? ` (${release.series.replace(/[\(\)]/g, "")} эп.)` : ""),
                status: release.status.replace("Сейчас в озвучке", "В работе").replace("Озвучка завершена", "Завершен")
              };
            }).filter((x) => x !== null)
          );
        });
      }
    });
  }
  async getSortedReleases() {
    return this.sortedEpisodesByFreshness.map((episode) => this.releases.get(episode.releaseId)).filter(Boolean).reverse();
  }
  async searchByQuery(query) {
    return await this.mutex.runExclusive(async () => {
      return this.search?.search(query).sort((a, b) => a.score - b.score).map((x) => x.item) || [];
    });
  }
  async getList() {
    return await this.mutex.runExclusive(async () => {
      return this.getSortedReleases();
    });
  }
  async getUniqueSortedReleases() {
    return await this.mutex.runExclusive(async () => {
      const seenIds = /* @__PURE__ */ new Set();
      const result = [];
      const sortedReleases = await this.getSortedReleases();
      for (const release of sortedReleases) {
        if (!seenIds.has(release.id)) {
          result.push(release);
          seenIds.add(release.id);
        }
      }
      return result;
    });
  }
  async ensureInitialized() {
    if (!this.isInitialized) {
      return this.initializationPromise;
    }
  }
}
class APIResponseTransformer {
  static transformRelease(release, episodes, franchises, torrents) {
    return {
      announce: release.announce,
      blockedInfo: {
        bakanim: false,
        blocked: false,
        kinopoisk: false,
        reason: null,
        wakanim: false
      },
      code: release.code,
      day: "",
      // TODO
      description: release.description,
      externalPlaylist: [],
      favorite: { added: true, rating: release.rating },
      franchises: franchises?.map((x) => {
        return {
          // no mutation way
          ...x,
          poster: `http://localhost:${global.internalServerPort}/proxy-static?url=` + x.poster
        };
      }) ?? [],
      genres: release.genres?.split(",").map((x) => x.trim()),
      id: release.id,
      last: "",
      // TODO
      members: {
        decorating: [],
        editing: [],
        timing: [],
        translating: [],
        voicing: []
      },
      moon: null,
      // TODO
      names: [release.title, release.originalName].filter(Boolean),
      playlist: episodes.map((x) => {
        return APIResponseTransformer.createPlaylistItem(release, x);
      }),
      poster: release.poster,
      season: release.season,
      series: release.series,
      status: release.status.replace("Сейчас в озвучке", "В работе").replace("Озвучка завершена", "Завершен"),
      statusCode: "1",
      torrents,
      type: release.type + (release.series && release.series !== "(0)" ? ` (${release.series.replace(/[\(\)]/g, "")} эп.)` : ""),
      voices: release.voices?.split(",").map((x) => x.trim()).filter((x) => x !== ""),
      team: release.team?.split(",").map((x) => x.trim()).filter((x) => x !== ""),
      year: release.year
    };
  }
  static createPlaylistItem(release, episode) {
    return {
      fullhd: episode.hls_1080,
      hd: episode.hls_720,
      sd: episode.hls_480,
      id: episode.ordinal,
      // episode.id hmmm... if i change it to uuid (text id), broke next / forward for player
      name: episode.name,
      ordinal: episode.ordinal,
      poster: release.poster,
      poster_thumbnail: episode.preview.src,
      rutube_id: null,
      skips: { ending: [episode.ending?.start, episode.ending?.stop].filter(Boolean), opening: [episode.opening?.start, episode.opening?.stop].filter(Boolean) },
      sources: { is_anilibria: true, is_rutube: false, is_youtube: false },
      title: t("generated.episode", { number: episode.ordinal }),
      updated_at: new Date(episode.updatedAt) / 1e3,
      uuid: episode.id,
      youtube_id: null
    };
  }
}
class APIController {
  constructor(cacheService2) {
    this.cacheService = cacheService2;
    this.findEpisodes = (id) => {
      return this.cacheService.episodesByReleaseId.get(id) || [];
    };
    this.endpoint = "https://" + global.upstreamDomainV1Tv;
  }
  async handleFavoritesProxy(action, id) {
    const apiUrl = `${this.endpoint}/public/api/index.php`;
    const session = store?.state?.app?.account?.session;
    const formData = this.createFormData({
      action,
      id,
      query: "favorites"
    });
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15e3);
    try {
      const response = await catGirlFetch(apiUrl, {
        method: "POST",
        body: formData,
        signal: controller.signal,
        headers: {
          Cookie: this.buildCookieHeader(session)
        }
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        console.error(response);
        throw new Error(data.error);
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }
  async handleProxyWithCache(query, extra) {
    const apiUrl = `${this.endpoint}/public/api/index.php`;
    const session = store?.state?.app?.account?.session;
    if (!query) {
      throw new Error("Query parameter is required");
    }
    try {
      const response = await this.makeApiRequest(apiUrl, session, extra);
      if (response.ok) {
        const data = await response.json();
        await this.cacheService.setCacheKey(query, data);
        return data;
      }
      await this.handleErrorResponse(response);
    } catch (error) {
      console.error("Request", query, "failed, fallback to cache", error);
      return this.handleFallbackToCache(query, error);
    }
  }
  async makeApiRequest(apiUrl, session, extra) {
    const formData = this.createFormData(extra);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15e3);
    try {
      return await catGirlFetch(apiUrl, {
        method: "POST",
        body: formData,
        signal: controller.signal,
        headers: {
          Cookie: this.buildCookieHeader(session)
        }
      });
    } finally {
      clearTimeout(timeoutId);
    }
  }
  createFormData(extra) {
    const formData = new FormData$1();
    for (const [key, value] of Object.entries(extra || {})) {
      formData.append(key, value);
    }
    return formData;
  }
  buildCookieHeader(session) {
    if (!session) return "";
    return `PHPSESSID=${session}; Path=/; Secure; HttpOnly`;
  }
  async handleErrorResponse(response) {
    if (response.status === 401) {
      await this.clearUserData();
      throw new Error("Unauthorized");
    }
    throw new Error(`API request failed with status: ${response.status}`);
  }
  async clearUserData() {
    await this.cacheService.setCacheKey("user", null);
    await this.cacheService.setCacheKey("favorites", null);
  }
  async handleFallbackToCache(query, error) {
    const cachedValue = await this.cacheService.getCacheKey(query);
    if (cachedValue) {
      console.warn(`Using cached data for query "${query}" due to error:`, error.message);
      return cachedValue;
    }
    throw error;
  }
  async handleRequest(body, type) {
    await this.cacheService.ensureInitialized();
    try {
      let data = {};
      if (type === "list") {
        data = await this.handleListRequest(body);
      } else if (type === "release") {
        data = await this.handleReleaseRequest(body);
      } else if (type === "catalog") {
        data = await this.handleCatalogRequest(body);
      } else if (type === "random_release") {
        const releases = this.cacheService.releases;
        const index = Math.floor(Math.random() * releases.size);
        data = await this.handleReleaseRequest({ id: [...releases.keys()][index] });
      } else if (type === "search") {
        data = await this.handleSearchRequest(body);
      } else if (type === "years") {
        data = this.cacheService.years;
      } else if (type === "genres") {
        data = this.cacheService.genres;
      }
      return { data, error: null, status: true };
    } catch (error) {
      return { data: null, error: error.message, status: false };
    }
  }
  async handleListRequest({ perPage = 10, page = 1 }) {
    const validatedPerPage = this.validatePerPage(perPage);
    if (validatedPerPage.error) throw new Error(validatedPerPage.error);
    const sortedReleases = await this.cacheService.getList();
    const items = sortedReleases.slice(
      (page - 1) * validatedPerPage.value,
      page * validatedPerPage.value
    );
    return {
      items: items.map(
        (x) => APIResponseTransformer.transformRelease(
          x,
          this.findEpisodes(x.id),
          this.cacheService.franchiseByReleaseId.get(x.id),
          this.cacheService.torrents.get(x.id)
        )
      ),
      pagination: this.createPagination(validatedPerPage.value, page, sortedReleases.length)
    };
  }
  async handleReleaseRequest({ id }) {
    const release = this.cacheService.releases.get(id) || this.cacheService.releases.get(Number(id));
    if (!release) throw new Error("Release not found");
    return APIResponseTransformer.transformRelease(
      release,
      this.findEpisodes(release.id),
      this.cacheService.franchiseByReleaseId.get(release.id),
      this.cacheService.torrents.get(release.id)
    );
  }
  async handleTorrentRequest({ id }) {
    const torrents = this.cacheService.torrents.get(id);
    if (!torrents) throw new Error("Torrents not found");
    return torrents;
  }
  async handleSearchRequest({ search }) {
    const sortedReleases = await this.cacheService.searchByQuery(search);
    return sortedReleases.map(
      (x) => APIResponseTransformer.transformRelease(
        x,
        this.findEpisodes(x.id),
        this.cacheService.franchiseByReleaseId.get(x.id),
        this.cacheService.torrents.get(x.id)
      )
    );
  }
  async handleCatalogRequest({ perPage = 10, page = 1, search, sort }) {
    const validatedPerPage = this.validatePerPage(perPage);
    if (validatedPerPage.error) throw new Error(validatedPerPage.error);
    const uniqueReleases = await this.cacheService.getUniqueSortedReleases();
    if (sort === "2") {
      uniqueReleases.sort((a, b) => b.rating - a.rating);
    }
    let uniqueReleasesFiltered = uniqueReleases;
    if (search) {
      try {
        let { year, genre } = JSON.parse(search);
        if (year) {
          year = year.split(",").map((x) => {
            if (!x) return null;
            x = x.trim();
            const parsed = parseInt(x, 10);
            return parsed > 1900 && parsed < 3e3 ? parsed : null;
          }).filter(Boolean);
          uniqueReleasesFiltered = uniqueReleases.filter((x) => year.includes(+x.year));
        }
        if (genre) {
          genre = genre.split(",").map((x) => x.trim()).filter(Boolean);
          uniqueReleasesFiltered = uniqueReleasesFiltered.filter((x) => {
            if (!x.genres) return false;
            const genres = x.genres.split(",").map((x2) => x2.trim());
            return genre.some((g) => genres.includes(g));
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
    const items = uniqueReleasesFiltered.slice(
      (page - 1) * validatedPerPage.value,
      page * validatedPerPage.value
    );
    return {
      items: items.map(
        (x) => APIResponseTransformer.transformRelease(
          x,
          this.findEpisodes(x.id),
          this.cacheService.franchiseByReleaseId.get(x.id),
          this.cacheService.torrents.get(x.id)
        )
      ),
      pagination: this.createPagination(validatedPerPage.value, page, uniqueReleasesFiltered.length)
    };
  }
  validatePerPage(perPage) {
    const parsed = Number(perPage);
    return parsed > 0 ? { value: parsed } : { error: "Invalid perPage" };
  }
  createPagination(perPage, currentPage, totalItems) {
    return {
      allItems: totalItems,
      allPages: Math.ceil(totalItems / perPage),
      page: currentPage,
      perPage
    };
  }
}
const CACHE_SETTINGS = {
  MAX_FILE_SIZE: 50 * 1024 * 1024
};
class CacheManager {
  constructor(cachePath) {
    this.cachePath = cachePath;
  }
  async initialize() {
    try {
      await fs$1.promises.mkdir(this.cachePath, { recursive: true });
      console.log(`Cache initialized at: ${this.cachePath}`);
    } catch (err) {
      if (err.code !== "EEXIST") throw err;
    }
  }
  async getCacheKey(url2) {
    return crypto.createHash("md5").update(url2).digest("hex");
  }
  async getCache(cacheName, originalUrl) {
    try {
      const filePath = path$2.join(this.cachePath, `${cacheName}.dat`);
      const file = await fs$1.promises.readFile(filePath);
      const metaLength = file.readUInt32BE(0);
      const metaEnd = 4 + metaLength;
      if (metaEnd >= file.length) {
        throw new Error("Invalid cache format: metadata out of bounds");
      }
      const meta2 = JSON.parse(file.subarray(4, metaEnd).toString());
      const buf = file.subarray(metaEnd);
      return {
        meta: meta2,
        buf,
        fromCache: true
      };
    } catch (cacheError) {
      console.warn(`Cache miss (${cacheName}):`, cacheError.message);
      const result = await catGirlFetch(originalUrl);
      if (!result.ok && result.status !== 404) {
        throw new Error(`Failed to fetch: ${result.status}`);
      }
      const buf = Buffer.from(await result.arrayBuffer());
      const headers = new Headers({
        "content-type": result.headers.get("content-type"),
        "x-cache-hit": "false",
        "x-cache-age": "0"
      });
      if (buf.length > CACHE_SETTINGS.MAX_FILE_SIZE) {
        console.warn(`File too large (${buf.length} bytes), not caching`);
        return {
          meta: {
            headers: Object.fromEntries(headers.entries()),
            status: result.status,
            timestamp: Date.now()
          },
          buf,
          fromCache: false
        };
      }
      const meta2 = {
        headers: Object.fromEntries(headers.entries()),
        status: result.status,
        timestamp: Date.now()
      };
      this.setCache(cacheName, buf, meta2).catch((e) => console.error("Cache update failed:", e));
      return { meta: meta2, buf, fromCache: false };
    }
  }
  async setCache(cacheName, data, meta2) {
    try {
      const metaBuffer = Buffer.from(JSON.stringify(meta2));
      const header = Buffer.alloc(4);
      header.writeUInt32BE(metaBuffer.length, 0);
      await fs$1.promises.writeFile(
        path$2.join(this.cachePath, `${cacheName}.dat`),
        Buffer.concat([header, metaBuffer, data])
      );
    } catch (err) {
      console.error("Failed to write cache:", err);
      throw err;
    }
  }
}
function mainEndpoint(apiController, cacheService2) {
  return async (req, res, next) => {
    try {
      const { query } = req.body;
      if (["user", "favorites"].includes(query)) {
        let response2 = null;
        if (query === "favorites" && req.body.action) {
          console.log("Favorites action received", req.body);
          response2 = await apiController.handleFavoritesProxy(req.body.action, req.body.id);
        } else {
          response2 = await apiController.handleProxyWithCache(query, {
            ...req.body
          });
        }
        if (query === "favorites" && !response2.error && !req.body.action) {
          await cacheService2.ensureInitialized();
          response2.data.items.forEach((v, i) => {
            v.total_series = cacheService2.releases.get(v.id)?.series || "(0)";
          });
        }
        if (response2.error) {
          res.status(400).send(response2);
        } else {
          res.send(response2);
        }
        return;
      }
      if (!["list", "release", "catalog", "random_release", "search", "years", "genres"].includes(query)) {
        res.status(404).send({
          error: "Endpoint not found",
          status: false
        });
        return;
      }
      const response = await apiController.handleRequest(req.body, query);
      if (response.error) {
        res.status(400).send(response);
      } else {
        res.send(response);
      }
    } catch (e) {
      console.error(e);
      res.status(400).send({
        error: "Internal server error",
        status: false
      });
    }
  };
}
const lazyRutube = (req, res) => {
  catGirlFetch(`https://rutube.ru/api/play/options/${req.params.id}/?no_404=true&referer&pver=v2`).then((x) => x.json()).then((x) => {
    res.redirect(x.video_balancer.m3u8);
  }).catch((x) => res.status(500).send());
};
const lazyVideo = async (req, res) => {
  try {
    const url2 = req.params.url;
    if (!url2) {
      return res.status(400).send("URL parameter is required");
    }
    const u = new URL(url2);
    u.host = "cache.libria.fun";
    const alternativeUrl = u.toString();
    const fetchPromises = [
      catGirlFetch(url2).then((response) => ({
        response,
        source: "original",
        url: url2
      })),
      catGirlFetch(alternativeUrl).then((response) => ({
        response,
        source: "alternative",
        url: alternativeUrl
      }))
    ];
    const result = await Promise.any(
      fetchPromises.map(
        (promise) => promise.catch((error) => {
          console.log("Fetch playlist error: ", error, url2);
          throw error;
        })
      )
    );
    const data = await result.response.text();
    res.send(data);
  } catch (error) {
    console.error("All playlist fetch attempts failed:", error, url);
    return res.status(500).send("Failed to fetch from all sources");
  }
};
function proxyStatic(cacheManager2) {
  return async (req, res) => {
    try {
      if (!req.query.url) {
        return res.status(400).json({ error: "URL parameter is required" });
      }
      let parsedUrl;
      try {
        parsedUrl = new URL(store.getters["app/settings/system/staticEndpoint"] + req.query.url);
        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          return res.status(400).json({ error: "Only HTTP/HTTPS URLs are allowed" });
        }
      } catch (e) {
        return res.status(400).json({ error: "Invalid URL format" });
      }
      const cacheName = await cacheManager2.getCacheKey(parsedUrl.toString());
      const { meta: meta2, buf, fromCache } = await cacheManager2.getCache(cacheName, parsedUrl.toString());
      const headers = new Headers({
        "content-type": meta2.headers["content-type"],
        "x-cache-hit": fromCache ? "true" : "false",
        "x-cache-age": fromCache ? `${Date.now() - meta2.timestamp}ms` : "0"
      });
      res.set(Object.fromEntries(headers.entries())).status(meta2.status).send(buf);
    } catch (e) {
      console.error("Proxy error:", e);
      res.status(500).json({
        error: "Internal Server Error",
        details: e.message
      });
    }
  };
}
const server = express();
server.disable("x-powered-by");
const mediaCachePath = path$2.join(electron.app.getPath("userData"), "media-cache");
const apiCachePath = path$2.join(electron.app.getPath("userData"), "api-cache");
const cacheManager = new CacheManager(mediaCachePath);
const cacheService = new APICacheService(apiCachePath);
global.apiCacheService = cacheService;
async function initInternalServer() {
  const apiController = new APIController(cacheService);
  server.get("/proxy-static", proxyStatic(cacheManager));
  server.post("/public/api/index.php", multer().none(), mainEndpoint(apiController, cacheService));
  server.get("/rutube/:id/*", lazyRutube);
  server.get("/hls/:url", lazyVideo);
  server.all("/", (req, res) => res.send("Hello from Anilibrix Plus!"));
  server.get("/public/torrent/download.php", expressProxy(apiController.endpoint));
  server.post("/public/login.php", expressProxy(apiController.endpoint));
  server.post("/public/logout.php", expressProxy(apiController.endpoint, {
    userResDecorator: function(proxyRes, proxyResData) {
      apiController.clearUserData();
      return proxyResData;
    }
  }));
  await cacheManager.initialize();
  const port2 = await getPort$2();
  server.listen(port2);
  return port2;
}
function defaultFormatter(level, args) {
  return `${(/* @__PURE__ */ new Date()).toISOString()} [${level}] ` + [...args].map((item) => util.inspect(item)).join(" ") + "\n";
}
function consoleLogToFile({ logFilePath, formatter = defaultFormatter, includes = [] }) {
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalInfo = console.info;
  if (!logFilePath) {
    throw new Error('"logFilePath" is required');
  }
  const logFileStream = stream({ file: logFilePath, size: "40m", keep: 3 });
  console.log = function(...args) {
    originalLog.apply(console, args);
    logToFile("log", args);
  };
  console.warn = function(...args) {
    originalWarn.apply(console, args);
    logToFile("warn", args);
  };
  console.error = function(...args) {
    originalError.apply(console, args);
    logToFile("error", args);
  };
  console.info = function(...args) {
    originalInfo.apply(console, args);
    logToFile("info", args);
  };
  function logToFile(level, args) {
    if (Array.isArray(includes) && includes.length) {
      if (!includes.includes(level)) return;
    }
    logFileStream.write(formatter(level, args));
  }
}
const defaultsValues = {
  upstreamDomainV1Tv: process.env.DEFAULT_V1_TV,
  cacheURL: process.env.CACHE_URL,
  cacheHashesURL: process.env.CACHE_HASHES_URL,
  overrideNet: false
};
const dnsGoogleURL = "https://dns.google/resolve?type=TXT&name=";
const dnsCloudflareURL = "https://one.one.one.one/dns-query?type=TXT&name=";
const dnsCloudflareAdGuardSecure = "https://94.140.14.140/resolve?type=TXT&name=";
function parseTxtRecord(record) {
  if (record.startsWith('"') && record.endsWith('"')) {
    return record.slice(1, -1);
  }
  return record;
}
async function resolveTxtRecordGoogle(domain) {
  let timeoutId;
  try {
    const controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), 600);
    controller.signal.addEventListener("abort", () => clearTimeout(timeoutId), { once: true });
    return await catGirlFetch(dnsGoogleURL + domain, {
      cache: "no-cache",
      signal: controller.signal
    }).then((e) => e.json()).then((response) => parseTxtRecord(response.Answer.pop().data));
  } finally {
    clearTimeout(timeoutId);
  }
}
async function resolveTxtRecordCloudflare(domain) {
  let timeoutId;
  try {
    const controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), 600);
    controller.signal.addEventListener("abort", () => clearTimeout(timeoutId), { once: true });
    return await catGirlFetch(dnsCloudflareURL + domain, {
      headers: {
        accept: "application/dns-json"
      },
      cache: "no-cache",
      signal: controller.signal
    }).then((e) => e.json()).then((response) => parseTxtRecord(response.Answer.pop().data));
  } finally {
    clearTimeout(timeoutId);
  }
}
async function resolveTxtRecordDefaultDns(domain) {
  let timeoutId;
  try {
    const controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), 600);
    controller.signal.addEventListener("abort", () => clearTimeout(timeoutId), { once: true });
    return new Promise((resolve, reject) => {
      if (controller.signal.aborted) {
        reject(new Error("Aborted"));
      }
      controller.signal.addEventListener("abort", () => reject(new Error("Aborted")), { once: true });
      dns__namespace.resolveTxt(domain, (err, addresses) => {
        if (err) {
          reject(err);
        } else {
          const addr = addresses?.pop()?.pop();
          if (!addr) {
            reject(new Error("No addresses found"));
          }
          resolve(addr);
        }
      });
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
async function resolveTxtRecordAdGuardSecure(domain) {
  let timeoutId;
  try {
    const controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), 600);
    controller.signal.addEventListener("abort", () => clearTimeout(timeoutId), { once: true });
    return await catGirlFetch(dnsCloudflareAdGuardSecure + domain, {
      headers: {
        accept: "application/dns-json"
      },
      cache: "no-cache",
      signal: controller.signal
    }).then((e) => e.json()).then((response) => parseTxtRecord(response.Answer.pop().data));
  } finally {
    clearTimeout(timeoutId);
  }
}
async function initGlobals() {
  try {
    const defaults = await fs.readFile(path$2.join(electron.app.getPath("userData"), "defaults.json"), "utf-8");
    const parsedDefaults = JSON.parse(defaults);
    defaultsValues.cacheURL = parsedDefaults.cacheURL;
    defaultsValues.upstreamDomainV1Tv = parsedDefaults.upstreamDomainV1Tv;
    defaultsValues.overrideNet = parsedDefaults.overrideNet;
    console.log("Defaults file read", parsedDefaults);
  } catch (e) {
    if (e.code === "ENOENT") {
      console.log("Defaults file not found, using default values");
    } else {
      console.error("Can't read defaults file", e);
    }
  }
  if (defaultsValues.overrideNet) {
    if (defaultsValues.upstreamDomainV1Tv) {
      global.upstreamDomainV1Tv = defaultsValues.upstreamDomainV1Tv;
    }
    if (defaultsValues.cacheURL) {
      global.cacheURL = defaultsValues.cacheURL;
    }
    if (defaultsValues.cacheHashesURL) {
      global.cacheHashesURL = defaultsValues.cacheHashesURL;
    }
    return;
  }
  let promiseResolve = null;
  let promiseReject = null;
  const promise = new Promise((resolve, reject) => {
    promiseResolve = resolve;
    promiseReject = reject;
  });
  let resolved = false;
  let count = 4;
  function processResult(provider, success) {
    return function(result) {
      if (success) {
        if (!resolved) {
          count--;
          const [upstreamDomainV1Tv, cacheURL] = result;
          defaultsValues.upstreamDomainV1Tv = upstreamDomainV1Tv;
          defaultsValues.cacheURL = cacheURL;
          resolved = true;
          console.log(`Winner resolved txt record with ${provider}`, result);
          promiseResolve();
        }
      } else if (!resolved) {
        count--;
        if (count === 0) {
          promiseReject();
          console.log("Failed to resolve txt record with all providers");
        } else {
          console.log(`Failed to resolve txt record with ${provider} (${result.message}). Wait for ${count} others.`);
        }
      }
    };
  }
  async function startResolve() {
    await Promise.all([
      Promise.all([
        resolveTxtRecordGoogle("anilibrix-plus-v1-tv.animehaze.me"),
        resolveTxtRecordGoogle("anilibrix-plus-cache.animehaze.me"),
        resolveTxtRecordGoogle("anilibrix-plus-cache-hashes.animehaze.me")
      ]).then(processResult("google", true)).catch(processResult("google", false)),
      Promise.all([
        resolveTxtRecordCloudflare("anilibrix-plus-v1-tv.animehaze.me"),
        resolveTxtRecordCloudflare("anilibrix-plus-cache.animehaze.me"),
        resolveTxtRecordCloudflare("anilibrix-plus-cache-hashes.animehaze.me")
      ]).then(processResult("cloudflare", true)).catch(processResult("cloudflare", false)),
      Promise.all([
        resolveTxtRecordAdGuardSecure("anilibrix-plus-v1-tv.animehaze.me"),
        resolveTxtRecordAdGuardSecure("anilibrix-plus-cache.animehaze.me"),
        resolveTxtRecordAdGuardSecure("anilibrix-plus-cache-hashes.animehaze.me")
      ]).then(processResult("adguard", true)).catch(processResult("adguard", false))
    ]);
    if (!resolved) {
      Promise.all([
        resolveTxtRecordDefaultDns("anilibrix-plus-v1-tv.animehaze.me"),
        resolveTxtRecordDefaultDns("anilibrix-plus-cache.animehaze.me"),
        resolveTxtRecordDefaultDns("anilibrix-plus-cache-hashes.animehaze.me")
      ]).then(processResult("default-dns", true)).catch(processResult("default-dns", false));
    }
  }
  startResolve();
  try {
    await promise;
    console.log("Txt record resolved successfully");
    global.upstreamDomainV1Tv = defaultsValues.upstreamDomainV1Tv;
    global.cacheURL = defaultsValues.cacheURL;
    global.cacheHashesURL = defaultsValues.cacheHashesURL;
  } catch (e) {
    console.error("Failed to resolve txt record, using default values", e);
    global.upstreamDomainV1Tv = defaultsValues.upstreamDomainV1Tv;
    global.cacheURL = defaultsValues.cacheURL;
    global.cacheHashesURL = defaultsValues.cacheHashesURL;
  }
}
function getSplashHTML() {
  return `<body>
  <div class="container">
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 209 193" width="150" height="150" style=" animation: pulse 2s ease-in-out infinite, wobble 3s ease-in-out infinite; filter: drop-shadow(0 0 10px #fff) drop-shadow(0 0 20px #ff001e); margin-bottom: 30px; ">
           <path d="M0 15.2c8.6-5 17.1-10 25.9-15.2C41.2 24.5 56.5 48.8 72 73.6c4.3-11.2 8.4-21.7 12.4-32.2 5-12.9 9.9-25.8 14.8-38.7.7-1.9 1.5-2.6 3.8-2.5 6.6.1 13.2.1 20.2.1 11.2 34.3 22.2 68.5 33.5 103.3 10.3-6.1 20.4-12 30.8-18.1 3.4 9.5 6.8 18.7 10.2 27.8.7 1.8-.5 2.4-1.7 3.1-8.9 5.3-17.8 10.7-26.7 15.9-2.1 1.2-2.6 2.3-1.8 4.5 1.5 3.8 2.6 7.7 4 12 10.8-6.4 21.4-12.8 32.3-19.2 1.8 4.5 3.5 8.7 5.3 13.1-4.3 2.1-8.3 4.2-12.5 6.3-6.4 3.2-12.8 6.4-19.2 9.5-1.8.9-2.2 1.7-1.6 3.6 3.2 9.2 6 18.5 9.1 27.8.3 1 .5 1.9.9 3.1h-35.2c-1.8-5.9-3.6-11.9-5.5-18.3-12.4 6.1-24.4 12.1-36.8 18.2-.9-1.4-1.7-2.7-2.8-4.3 1.5-.9 2.9-1.9 4.4-2.7 10-6 20-12 30.2-18 1.9-1.1 2.6-2.1 1.8-4.2-1.4-3.9-2.4-7.9-3.8-12.4-13.5 8.1-26.7 16-40.4 24.1-7-11.4-13.8-22.6-21-34.4-.5 1.2-.8 1.9-1 2.6-4.4 15.4-9 30.8-13.3 46.2-.7 2.5-1.7 3.4-4.7 3.3-10.3-.2-20.6-.1-31.3-.1 1.4-3.8 2.8-7.4 4.1-11 8.8-22.9 17.6-45.7 26.5-68.6.9-2.3.5-4-.7-6.1C38 77.7 20 48 1.9 18.3c-.7-.9-1.2-1.9-1.9-3.1zM128.8 120c-7.7-26.1-15.4-52.1-23.2-78.4-.7.7-.9.8-.9.9C99.3 60.8 94 79.3 88.8 97.7c-.3 1.2.2 2.9.9 4 5.8 9.4 11.7 18.8 17.5 28.1.4.7 1 1.3 1.5 2 6.8-3.9 13.3-7.8 20.1-11.8z" stroke="white" fill="none" stroke-width="2" stroke-dasharray="1800" stroke-dashoffset="1800" style="animation: draw 3s linear forwards;" />
        </svg>
    </div>

    <div id="message"></div>
    <div id="logs-saved"></div>

    <div style="display: flex; flex-direction: row;">
        <button class="action" id="logs">${t("common.saveLogs")}</button>
        <button style="margin-left: 20px" id="close" class="action">${t("common.close")}</button>
        <button style="margin-left: 20px" id="restart" class="action">${t("common.restart")}</button>
    </div>
  </div>

  <script>
    const msg = document.getElementById('message');
    const btn = document.getElementById('logs');
    const btn2 = document.getElementById('close');
    const btn3 = document.getElementById('restart');

    function showMessage({ text, type = 'info', button = false }) {
      msg.textContent = text;
      msg.style.opacity = 1;
      msg.style.transform = 'translateY(0)';
      msg.style.background = type === 'error' ? 'rgba(255,0,30,0.35)' : 'rgba(255,255,255,0.08)';

      btn.style.display = button ? 'block' : 'none';
      btn2.style.display = button ? 'block' : 'none';
      btn3.style.display = button ? 'block' : 'none';
    }

    const { ipcRenderer } = require('electron');

    window.addEventListener('DOMContentLoaded', () => {
      ipcRenderer.on('update', (event, data) => {
        showMessage(data.payload);
      });

      btn2.onclick = async () => {
        btn.disabled = true;
        await ipcRenderer.invoke('exit');
      };

      btn3.onclick = async () => {
        btn.disabled = true;
        await ipcRenderer.invoke('restart');
      };

      btn.onclick = async () => {
        btn.disabled = true;
        btn.textContent = '${t("common.loading")}';

        if (await ipcRenderer.invoke('save-logs') !== true) {
          document.querySelector('#logs-saved').textContent = '';
          btn.textContent = '${t("common.saveLogs")}';
          btn.disabled = false;
          return;
        }

        document.querySelector('#logs-saved').textContent = '${t("common.logsSaved")}';
        btn.textContent = '${t("common.saveLogs")}';
        btn.disabled = false;
      };
    });
  <\/script>

  <style>
    body {
      overflow: hidden;
      user-select: none;
      margin: 0;
      font-family: sans-serif;
      color: white;
      text-align: center;
    }

    .action {
      display: none;
      padding: 10px;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      background: rgba(255,0,30,0.35);
      color: white;
      font-size: 13px;
    }

    .container {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 100%;
      border-radius: 10%;
      background: linear-gradient(135deg,#1e1e1e,#2c2c2c);
    }

    #message {
      font-size: 1rem;
      max-width: 320px;
      line-height: 1.5;
      background: rgba(255,0,30,0.42);
      backdrop-filter: blur(8px);
      padding: 14px 20px;
      border-radius: 14px;
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      transition: opacity 1s ease, transform 1s ease;
      font-weight: 500;
    }

    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
    @keyframes wobble { 0%,100% { transform: rotate(0deg); } 25% { transform: rotate(3deg) translateX(1px); } 50% { transform: rotate(-3deg) translateX(-1px); } 75% { transform: rotate(2deg) translateX(0); } }
  </style>
</body>`;
}
function createSplash() {
  const splash = new electron.BrowserWindow({
    title: t("main.splashStartTitle"),
    icon: electron.nativeImage.createFromPath(
      path__namespace.join(process.resourcesPath, "icons", "icon.png")
    ),
    show: false,
    frame: false,
    resizable: false,
    width: 400,
    height: 400,
    maxHeight: 400,
    maxWidth: 400,
    minHeight: 400,
    minWidth: 400,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  splash.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(getSplashHTML())}`).catch((error) => {
    console.error("Error loading splash window:", error);
  });
  splash.once("ready-to-show", () => {
    const facts = getFacts();
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    splash.webContents.send("update", {
      payload: {
        text: randomFact,
        type: "info"
      }
    });
    splash.center();
    splash.show();
    splash.focus();
    splash.on("closed", () => {
      splash.removeAllListeners();
    });
  });
  splash.setMessage = (text, type = "info", button = false) => {
    try {
      splash.webContents.postMessage("update", {
        payload: {
          text,
          type,
          button
        }
      });
    } catch (error) {
      console.error("Error updating splash window:", error);
    }
  };
  splash.reloadLocale = () => {
    splash.setTitle(t("main.splashStartTitle"));
    splash.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(getSplashHTML())}`).catch((error) => console.error("Error reloading splash window locale:", error));
  };
  return splash;
}
electron.ipcMain.handle("save-logs", async () => {
  const { filePath, canceled } = await electron.dialog.showSaveDialog({
    title: t("main.saveLogsDialog"),
    defaultPath: "anilibrix-logs.zip",
    properties: ["dontAddToRecent", "showOverwriteConfirmation"]
  });
  if (canceled) {
    return false;
  }
  const dir = electron.app.getPath("userData");
  const output = fs$1.createWriteStream(filePath);
  const archive = archiver("zip", { zlib: { level: 9 } });
  return new Promise((resolve, reject) => {
    output.on("close", function() {
      resolve(true);
    });
    archive.on("warning", reject);
    archive.on("error", reject);
    archive.pipe(output);
    archive.glob("anilibrix.log*", { cwd: dir });
    archive.finalize();
  });
});
function normalizeLocale(input) {
  if (typeof input !== "string" || input.trim() === "") {
    return DEFAULT_LOCALE;
  }
  const normalized = input.trim().toLowerCase().replace(/_/g, "-");
  if (normalized.startsWith("ru")) {
    return "ru";
  }
  return SUPPORTED_LOCALES.includes(normalized) ? normalized : DEFAULT_LOCALE;
}
const logs = !!process.env.DISCORD_RICH_PRESENCE_DEBUG;
const logger = logs ? console.log : () => {
};
const RECONNECT_DELAY = 1e3;
const UPDATE_INTERVAL = 1e3;
function discordActivity() {
  let client = null;
  let activity = null;
  let destroyed = false;
  let reconnectTimeout = null;
  let RPCClient = null;
  const ensureReadableStream = () => {
    if (!global.ReadableStream) {
      const { ReadableStream } = require("readable-stream-polyfill");
      global.ReadableStream = ReadableStream;
    }
  };
  const getDRPCClient = () => {
    if (!RPCClient) {
      const RPC = require("@xhayper/discord-rpc");
      RPCClient = RPC.Client;
    } else {
      return RPCClient;
    }
  };
  const scheduleReconnect = () => {
    if (destroyed || reconnectTimeout) return;
    reconnectTimeout = setTimeout(() => {
      reconnectTimeout = null;
      connect();
    }, RECONNECT_DELAY);
  };
  const connect = async () => {
    if (destroyed) return;
    try {
      ensureReadableStream();
      const Client = getDRPCClient();
      client = new Client({
        clientId: process.env.DISCORD_CLIENT_ID
      });
      client.on("disconnected", async () => {
        logger("Discord rich presence disconnected");
        try {
          await client.destroy();
        } catch {
        }
        client = null;
        scheduleReconnect();
      });
      client.on("error", logger);
      client.on("ready", () => {
        logger("Discord rich presence ready");
      });
      await client.login();
    } catch (error) {
      logger("Discord login failed", error);
      scheduleReconnect();
    }
  };
  const syncActivity = async () => {
    if (destroyed || !client || !client.isConnected) {
      return;
    }
    const enabled = store.state.app.settings.system.drpc_enabled;
    try {
      if (!enabled || !activity) {
        await client.user.clearActivity();
        return;
      }
      await client.user.setActivity(activity);
      logger("Discord set activity", activity);
    } catch (error) {
      logger("Discord activity sync error", error);
    }
  };
  connect();
  const interval = setInterval(syncActivity, UPDATE_INTERVAL);
  return {
    setActivity(discordPresence) {
      activity = discordPresence;
    },
    destroy() {
      destroyed = true;
      clearInterval(interval);
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      logger("Discord rich presence destroyed");
      if (client) {
        client.destroy().catch(logger);
      }
    }
  };
}
consoleLogToFile({
  logFilePath: path$2.join(electron.app.getPath("userData") + "/anilibrix.log")
});
applyAppSwitches();
const {
  setActivity,
  destroy: destroyRichPresence
} = discordActivity();
remoteMain.initialize();
const trayController = new AppTray();
const menuController = new AppMenu();
function resolveSystemLocale() {
  const preferred = typeof electron.app.getPreferredSystemLanguages === "function" ? electron.app.getPreferredSystemLanguages()[0] : null;
  return preferred || electron.app.getLocale();
}
if (process.env.NODE_ENV !== "development") {
  global.__static = path$2.join(__dirname, "/static").replace(/\\/g, "\\\\");
}
process.on("uncaughtException", (error) => console.log("Unhandled Error", error));
process.on("unhandledRejection", (error) => console.log("Unhandled Promise Rejection", error));
let isQuitting = false;
electron.app.on("before-quit", async (event) => {
  if (!isQuitting) {
    event.preventDefault();
    isQuitting = true;
    destroyRichPresence();
    await stopForwardProxy().catch(console.error);
    await stopOperaProxy().catch(console.error);
    electron.app.quit();
  }
});
electron.app.on("window-all-closed", () => {
  electron.app.quit();
});
electron.app.on("web-contents-created", (event, webContents) => {
  webContents.on("did-finish-load", async () => {
    if (webContents.getURL().startsWith("https://id.vk.com/")) {
      webContents.on("will-redirect", async (event2, url2) => {
        if (!url2.startsWith("https://www.anilibria.tv/")) {
          return true;
        }
        const cookies = await webContents.session.cookies.get({ url: "https://www.anilibria.tv" });
        const { value: sessionId } = cookies.find((cookie) => cookie.name === "PHPSESSID") || {};
        if (sessionId) {
          Main.getWindow().webContents.send("VK_CODE", sessionId);
        }
        electron.BrowserWindow.fromWebContents(webContents).hide();
        webContents.on("did-finish-load", async () => {
          await webContents.session.clearStorageData();
          webContents.destroy();
        });
        return true;
      });
    }
  });
  webContents.setWindowOpenHandler(openWindowInterceptor);
  webContents.setUserAgent(`${meta.name}/${version}`);
  webContents.on("will-attach-webview", (event2, webPreferences, params) => {
    delete webPreferences.preload;
    webPreferences.nodeIntegration = false;
    webPreferences.contextIsolation = true;
  });
});
const gotTheLock = process.env.NODE_ENV !== "development" ? electron.app.requestSingleInstanceLock() : true;
console.log("GotTheLock", gotTheLock);
if (!gotTheLock) {
  electron.app.quit();
} else {
  if (process.env.NODE_ENV !== "development") {
    electron.app.on("second-instance", (event, commandLine, workingDirectory) => {
      const mainWindow = Main.getWindow();
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
        mainWindow.webContents.send("second-instance-opened", {
          commandLine,
          workingDirectory
        });
      }
    });
  }
  electron.app.whenReady().then(async () => {
    setMainLocale(normalizeLocale(resolveSystemLocale()));
    const splash = createSplash();
    const mWindowInstance = Main.createWindow({ title: meta.name });
    const tWindowInstance = Torrent.createWindow({ title: `${meta.name} Torrent` });
    const mainWindow = Main.getWindow();
    const torrentWindow = Torrent.getWindow();
    try {
      await initProxy([mainWindow, torrentWindow]);
    } catch (e) {
      console.log("Proxy start err", e);
    }
    global.splash = splash;
    console.log("Start init globals");
    await initGlobals();
    console.log("App is ready");
    global.internalServerPort = await initInternalServer();
    console.log("Internal server listens", global.internalServerPort);
    mWindowInstance.loadUrl();
    tWindowInstance.loadUrl();
    if (process.env.NODE_ENV === "development") {
      mainWindow.webContents.openDevTools();
      mainWindow.webContents.on("console-message", (e, level, msg, line, src) => {
        const prefix = ["[r:log]", "[r:dbg]", "[r:warn]", "[r:err]"][level] || "[r:?]";
        console.log(prefix, msg, src ? `(${src}:${line})` : "");
      });
    }
    remoteMain.enable(mainWindow.webContents);
    remoteMain.enable(torrentWindow.webContents);
    mainWindow.once("ready-to-show", () => {
      splash.destroy();
      global.splash = null;
      mainWindow.show();
    }).on("close", () => {
      destroyRichPresence();
      electron.app.quit();
    });
    menuController.setWindows(mainWindow, torrentWindow).init();
    trayController.createTrayIcon({
      iconPath: path$2.join(__dirname, "../../build/icons/tray/icon.png")
    }).setTooltip(meta.name);
    const appStorage = new Storage({ name: "anilibrix", clearInvalidConfig: true });
    electron.app.on("certificate-error", (event, webContents, url2, error, certificate, callback) => {
      const ignoreCerts = appStorage.get("settings.system.ignore_certs", false);
      if (ignoreCerts) {
        event.preventDefault();
        console.log("Certificate error ignored", url2, error);
        callback(true);
      } else {
        callback(false);
      }
    });
    function restart() {
      if (!mainWindow.isFocused()) return;
      console.log("Restart");
      const options = {
        args: process.argv.slice(1).concat(["--relaunch"]),
        execPath: process.execPath
      };
      if (electron.app.isPackaged && process.env.APPIMAGE) {
        child_process.execFile(process.env.APPIMAGE, options.args);
        electron.app.quit();
        return;
      }
      electron.app.relaunch();
      electron.app.exit();
    }
    electron.globalShortcut.register("CmdOrCtrl+shift+R", restart);
    electron.ipcMain.handle("restart", restart);
    electron.ipcMain.handle("exit", () => electron.app.quit());
    catchAppAboutEvent();
    catchAppDockNumberEvent();
    catchAppDevtoolsMainEvent();
    catchAppDevtoolsTorrentEvent();
    catchEnableSystemSleepBlockerEvent();
    catchDisableSystemSleepBlockerEvent();
    handleSafeStorageEncrypt();
    handleRichPresense(setActivity);
    handleRand();
    handleShowConfig();
    handleTorrentParse();
    handleUpdateProxy(lodash.debounce(setProxy, 2e3));
    handleGetSystemLocale(() => resolveSystemLocale());
    handleSetAppLocale((locale) => {
      const normalized = normalizeLocale(locale);
      setMainLocale(normalized);
      menuController.init();
      trayController.refreshMenu().setTooltip(meta.name);
      if (global.splash && typeof global.splash.reloadLocale === "function") {
        global.splash.reloadLocale();
      }
      return normalized;
    });
    broadcastTorrentEvents();
  });
}
