<template>
  <v-app>
    <app-settings/>

    <app-loader v-if="loading"/>
    <component :is="layout" v-else>
      <router-view :key="$route.fullPath"/>
    </component>

    <app-errors/>
    <app-notifications/>

    <AppUpdate :notes="update_notes" ref="appUpdate"/>
  </v-app>
</template>

<script>
import AppLoader from '@components/app/loader'
import AppErrors from '@components/app/errors'
import AppToolBar from '@components/app/toolbar'
import AppSettings from '@components/app/settings'
import AppBaseLayout from '@layouts/base'
import AppNotifications from '@components/app/notifications'
import AppUpdate from '@components/app/AppUpdate.vue'
import { version } from '@package'
import { setLocale } from './i18n'
import { setVuetifyLocale } from '@plugins/vuetify'
import { invokeSetAppLocale } from '@main/handlers/app/app-handlers'
import dayjs from 'dayjs'

import { useAppStore } from '@store/app/useAppStore'
import { useSettingsStore } from '@store/app/settings/useSettingsStore'
import { useReleasesStore } from '@store/releases/useReleasesStore'
import { useFavoritesStore } from '@store/favorites/useFavoritesStore'
import { useAccountStore } from '@store/app/account/useAccountStore'
import { mapStores } from 'pinia'
import get from 'lodash/get'

export default {
  name: 'AniLibrix',
  components: {
    AppLoader,
    AppErrors,
    AppToolBar,
    AppSettings,
    AppBaseLayout,
    AppNotifications,
    AppUpdate
  },

  setup () {
    return {
      appStore: useAppStore(),
      settingsStore: useSettingsStore(),
      releasesStore: useReleasesStore(),
      favoritesStore: useFavoritesStore(),
      accountStore: useAccountStore()
    }
  },

  data () {
    return {
      loading: false,
      update_handler: null,
      update_notes: ''
    }
  },

  computed: {
    _isAuthorized () { return this.accountStore.isAuthorized },
    _welcome_view () { return this.appStore.welcome_view },
    _updates_enabled () { return this.settingsStore.system?.updates?.enabled },
    _updates_timeout () {
      const t = this.settingsStore.system?.updates?.timeout
      return (t > 0 ? t : 1) * 60 * 1000
    },
    _language () { return this.settingsStore.system?.language },

    layout () {
      return get(this.$route, 'meta.layout.is', AppBaseLayout)
    },

    view () {
      return this.$route.name || null
    }
  },

  methods: {
    toggleUpdates () {
      if (this.update_handler) clearInterval(this.update_handler)
      if (this._updates_enabled === true) {
        this.update_handler = setInterval(() => {
          this.releasesStore.getReleases()
          this.favoritesStore.getFavorites()
        }, this._updates_timeout)
      }
    },

    async syncLocale (locale) {
      if (!locale) return
      setLocale(locale)
      setVuetifyLocale(locale)
      dayjs.locale(locale)
      try {
        await invokeSetAppLocale(locale)
      } catch (error) {
        console.error('Failed to sync app locale', error)
      }
    }
  },

  async mounted () {
    try {
      const data = await fetch('https://raw.githubusercontent.com/KEYTRON/anilibrix-prime/refs/heads/lord/latest.json')
        .then(async x => {
          const text = await x.text()
          try { return JSON.parse(text) } catch (e) {
            console.error('Check version error', x.status, x.statusText, text, e)
            throw e
          }
        })

      if (version.includes('beta') && data.beta !== version) {
        this.update_notes = data.beta_notes
      }
      if (!version.includes('beta') && data.stable !== version) {
        this.update_notes = data.stable_notes
      }
    } catch (e) {
      console.error('Check version error', e)
    }
  },

  async created () {
    const last_page_release = localStorage.getItem('last_page_release')
    this.loading = true
    setTimeout(() => (this.loading = false), 1000)

    this.releasesStore.getReleases()
    this.favoritesStore.getFavorites()

    if (last_page_release) {
      await this.$router.push({ name: 'release', params: JSON.parse(last_page_release) })
    } else if (this._welcome_view !== null && this.view !== this._welcome_view) {
      this.$router.push({ name: this._welcome_view })
    }
  },

  watch: {
    // The initial getFavorites() call in created() fires immediately on
    // mount, racing against the silent-login/session-restore sequence
    // (which needs a real network round-trip and reliably loses that
    // race) — without this, favorites never gets a second chance once the
    // session actually becomes available.
    _isAuthorized: {
      handler (isAuthorized) {
        if (isAuthorized) this.favoritesStore.getFavorites()
      }
    },
    _updates_enabled: {
      immediate: true,
      handler () { this.toggleUpdates() }
    },
    _updates_timeout: {
      handler () { this.toggleUpdates() }
    },
    _language: {
      immediate: true,
      handler (locale) { this.syncLocale(locale) }
    },
    view: {
      handler (view) {
        if (['releases', 'catalog', 'favorites'].includes(view)) {
          this.appStore.setWelcomeView(view)
        }
      }
    }
  }
}
</script>
