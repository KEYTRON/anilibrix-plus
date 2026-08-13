// Proxy
import ReleaseProxy from '@proxies/release'
import FavoritesProxy from '@proxies/favorites'

// Transformer
import ReleaseTransformer from '@transformers/release'
import EpisodesTransformer from '@transformers/episode'

// Utils
import axios from 'axios'
import { getLocale, translate } from '@/i18n'
import { showAppError } from '@utils/notifications'

import { defineStore } from 'pinia'
import { useAccountStore } from '../app/account/useAccountStore'

// Module-level cancel tokens
let REQUEST_FOR_FAVORITES = null
const REQUESTS_FOR_CHANGES = {}

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: [],
    loading: false,
    settings: {
      sort: 'original',
      group: 'years',
      show_seen: true,
      show_completed: false,
      years_collapsed: []
    }
  }),

  getters: {
    /**
     * Check if user is authorized (delegates to account store)
     */
    isAuthorized: () => {
      const accountStore = useAccountStore()
      return accountStore.isAuthorized
    },

    /**
     * Check if provided release is in favorites
     */
    isInFavorite: state => release => {
      const accountStore = useAccountStore()
      return accountStore.isAuthorized && ((state.items || []).findIndex(item => item.id === release.id) > -1)
    }
  },

  actions: {
    /**
     * Get favorites
     */
    async getFavorites () {
      if (!this.isAuthorized) return

      const loadFav = async (errorShow) => {
        try {
          this.loading = true

          if (REQUEST_FOR_FAVORITES) REQUEST_FOR_FAVORITES.cancel()
          REQUEST_FOR_FAVORITES = axios.CancelToken.source()

          const { items } = await new FavoritesProxy().getFavorites({ cancelToken: REQUEST_FOR_FAVORITES.token })
          const releases = new ReleaseTransformer().fetchCollection(items)

          const processedReleases = (await Promise.allSettled(
            releases.map(async release => ({
              ...release,
              episodes: await new EpisodesTransformer({
                cancelToken: REQUEST_FOR_FAVORITES.token,
                skipTorrents: true
              }).fetchItem(release.episodes)
            }))
          ))
            .filter(promise => promise.status === 'fulfilled')
            .map(promise => promise.value)
            .map(release => ({
              ...release,
              poster: new ReleaseProxy().getReleasePosterPath(release.poster)
            }))

          this.items = processedReleases
        } catch (error) {
          if (!axios.isCancel(error)) {
            console.error(error)
            if (errorShow) showAppError(translate('errors.genericLoadFavorites', {}, getLocale()))
          }
        } finally {
          this.loading = false
        }
      }

      const success = await loadFav(false).then(() => true).catch(() => false)
      if (!success) {
        console.error('Failed to load favorites, retrying...')
        await loadFav(true)
      }
    },

    /**
     * Add release to favorites (optimistic update with rollback)
     */
    async addToFavorites (release) {
      if (!release || !this.isAuthorized) return

      try {
        if (REQUESTS_FOR_CHANGES[release.id]) REQUESTS_FOR_CHANGES[release.id].cancel()
        REQUESTS_FOR_CHANGES[release.id] = axios.CancelToken.source()

        this.items.unshift(release)

        await new FavoritesProxy().addToFavorites(release.id, { cancelToken: REQUESTS_FOR_CHANGES[release.id].token })
      } catch (error) {
        if (!axios.isCancel(error)) {
          const idx = this.items.findIndex(item => item.id === release.id)
          if (idx > -1) this.items.splice(idx, 1)
          showAppError(error)
        }
      }
    },

    /**
     * Remove release from favorites (optimistic update with rollback)
     */
    async removeFromFavorites (release) {
      if (!release || !this.isAuthorized) return

      const idx = this.items.findIndex(item => item.id === release.id)

      try {
        if (REQUESTS_FOR_CHANGES[release.id]) REQUESTS_FOR_CHANGES[release.id].cancel()
        REQUESTS_FOR_CHANGES[release.id] = axios.CancelToken.source()

        if (idx > -1) this.items.splice(idx, 1)

        await new FavoritesProxy().removeFromFavorites(release.id, { cancelToken: REQUESTS_FOR_CHANGES[release.id].token })
      } catch (error) {
        if (!axios.isCancel(error)) {
          // Rollback: re-add the removed item
          this.items.unshift(release)
          showAppError(error)
        }
      }
    },

    /**
     * Toggle year collapsed state
     */
    setSettingsYearsCollapsed (year) {
      const years = [...this.settings.years_collapsed]
      const yearIndex = years.findIndex(item => item === year)

      if (yearIndex > -1) years.splice(yearIndex, 1)
      if (yearIndex === -1) years.push(year)

      this.settings.years_collapsed = years
    },

    setSettingsSort (sort) { this.settings.sort = sort },
    setSettingsGroup (group) { this.settings.group = group },
    setSettingsShowSeen (state) { this.settings.show_seen = state },
    setSettingsShowCompleted (state) { this.settings.show_completed = state }
  },

  // `pinia-plugin-persistedstate` v4 renamed `paths` to `pick` — see
  // useCatalogStore.js for why the old key silently persisted/restored the
  // full state, including `items` with poster URLs tied to a dead session.
  persist: {
    pick: ['settings']
  }
})
