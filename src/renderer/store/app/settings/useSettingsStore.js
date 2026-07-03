import { defineStore } from 'pinia'

const DEFAULT_API_ENDPOINT = 'https://anilibriaqt.anilib.top'
const DEFAULT_STATIC_ENDPOINT = 'https://anilibriaqt.anilib.top'

function normalizeEndpoint (endpoint) {
  if (!endpoint || typeof endpoint !== 'string') {
    return ''
  }

  if (endpoint.endsWith('/')) {
    return endpoint.slice(0, -1).trim()
  }
  return endpoint.replace(/([^:]\/)\/+/g, '$1').trim()
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    // --- player settings ---
    quality: null,
    upscale: {
      bold: 6,
      blur: 2,
      process: false
    },
    episodes: { order: 'asc' },
    torrents: { process: false },
    autoplayNext: true,
    opening: {
      skip_time: 30,
      skip_button: false,
      skip_button_key: '',
      autoSkip: false,
      autoSkipKey: ''
    },
    video: {
      buffer: 300
    },

    // --- system settings ---
    ads: {
      enabled: true,
      maximum: false
    },
    ads__maximum: false,
    appbar_right: false,
    filter_notify: false,
    devtools: false,
    updates: {
      enabled: true,
      timeout: 10
    },
    api: {
      _endpoint: process.env.API_ENDPOINT_URL || DEFAULT_API_ENDPOINT,
      _static_endpoint: process.env.STATIC_ENDPOINT_URL || DEFAULT_STATIC_ENDPOINT
    },
    notifications: {
      system: true
    },
    torrentType: 'magnet',
    drpc_enabled: true,
    proxy: '',
    ignore_certs: false,
    language: null
  }),

  getters: {
    apiEndpoint: state => {
      return normalizeEndpoint(state.api?._endpoint || process.env.API_ENDPOINT_URL || DEFAULT_API_ENDPOINT)
    },
    staticEndpoint: state => {
      return normalizeEndpoint(state.api?._static_endpoint || process.env.STATIC_ENDPOINT_URL || DEFAULT_STATIC_ENDPOINT)
    }
  },

  actions: {
    // --- player actions ---
    setQuality (quality) { this.quality = quality },
    setEpisodesSort (order) { this.episodes.order = order },
    setVideoBuffer (buffer) { this.video.buffer = buffer },
    setTorrentsProcess (state) { this.torrents.process = state },
    setAutoplayNext (state) { this.autoplayNext = state },
    setUpscaleBlur (value) { this.upscale.blur = value },
    setUpscaleBold (value) { this.upscale.bold = value },
    setUpscaleProcess (state) { this.upscale.process = state },
    setUpscaleParameters ({ bold, blur }) {
      this.upscale.blur = blur
      this.upscale.bold = bold
    },
    setOpeningSkipTime (time) { this.opening.skip_time = time },
    setOpeningSkipButton (state) { this.opening.skip_button = state },
    setOpeningSkipButtonKey (state) { this.opening.skip_button_key = state },
    setAutoSkip (state) { this.opening.autoSkip = state },
    setAutoSkipKey (state) { this.opening.autoSkipKey = state },

    // --- system actions ---
    setUpdates (state) { this.updates.enabled = state },
    setUpdatesTimeout (timeout) { this.updates.timeout = timeout },
    setAPIEndpoint (state) { this.api._endpoint = state },
    setAPIStaticEndpoint (state) { this.api._static_endpoint = state },
    setProxy (state) { this.proxy = state },
    setSystemNotifications (state) { this.notifications.system = state },
    toggleDevtools () { this.devtools = !this.devtools },
    setAds (state) { this.ads.enabled = state },
    setAdsMaximum (state) { this.ads.maximum = state },
    setAppbarRight (appbar_right) { this.appbar_right = appbar_right },
    setFilterNotify (filter_notify) { this.filter_notify = filter_notify },
    setTorrentType (type) { this.torrentType = type },
    setDRPC (type) { this.drpc_enabled = type },
    setIgnoreCerts (type) { this.ignore_certs = type },
    setLanguage (type) { this.language = type }
  },

  persist: true
})
