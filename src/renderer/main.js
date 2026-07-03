import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import router from '@router'
import vuetify from '@plugins/vuetify'
import lodashPlugin from '@plugins/lodash'
import plyrPlugin from '@plugins/plyr'
import vueElectronPlugin from '@plugins/vue-electron'

import Toast, { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import '@assets/scss/style.scss'

import App from './App.vue'

import { installI18n, setLocale } from './i18n'
import { resolveAppLocale } from '@shared/i18n/resolveLocale'
import { invokeGetSystemLocale, invokeSetAppLocale } from '@main/handlers/app/app-handlers'

import { useSettingsStore } from '@store/app/settings/useSettingsStore'
import { useAccountStore } from '@store/app/account/useAccountStore'
import { setVuetifyLocale } from '@plugins/vuetify'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import 'dayjs/locale/en'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// After pinia hydrates from persisted state, push session to main
// (so the store-compat layer in main has it for cookie-bearing requests).
pinia.use(({ store }) => {
  if (store.$id === 'account') {
    store.$subscribe((_, state) => {
      try {
        const { ipcRenderer } = require('electron')
        ipcRenderer.send('store:sync', { session: state.session })
      } catch (e) { /* ipc unavailable */ }
    }, { detached: true })
  }
})

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(lodashPlugin)
app.use(plyrPlugin)
app.use(vueElectronPlugin)
app.use(Toast, {
  position: 'bottom-right',
  timeout: 3000,
  closeOnClick: true
})

// Register $toast as global property for Options API components
app.config.globalProperties.$toast = useToast()

installI18n(app)

async function bootstrapLocale () {
  const settingsStore = useSettingsStore()
  const storedLocale = settingsStore.system?.language
  const rendererLocale = navigator.language || (navigator.languages && navigator.languages[0])

  let systemLocale = null

  try {
    systemLocale = await invokeGetSystemLocale()
  } catch (error) {
    console.error('Failed to resolve system locale', error)
  }

  const locale = resolveAppLocale({
    storedLocale,
    systemLocale,
    rendererLocale
  })

  setLocale(locale)
  setVuetifyLocale(locale)
  dayjs.locale(locale)

  try {
    await invokeSetAppLocale(locale)
  } catch (error) {
    console.error('Failed to sync app locale', error)
  }
}

async function startApp () {
  await bootstrapLocale()

  // Generate user ID if not set (was previously done in main process via vuex-electron)
  const accountStore = useAccountStore()
  accountStore.setUserId()

  app.mount('#anilibrix')
}

startApp()
