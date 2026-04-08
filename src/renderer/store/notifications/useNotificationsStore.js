import { defineStore } from 'pinia'
import { useSettingsStore } from '../app/settings/useSettingsStore'
import { useFavoritesStore } from '../favorites/useFavoritesStore'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    items: []
  }),

  actions: {
    /**
     * Add release to notifications.
     * Respects filter_notify setting: if enabled, only adds if release is in favorites.
     */
    setRelease (release) {
      const settingsStore = useSettingsStore()
      const favoritesStore = useFavoritesStore()

      const filterNotify = settingsStore.filter_notify
      const isFavorite = favoritesStore.isInFavorite(release)

      if (filterNotify && !isFavorite) return

      if (release && release.episodes[0]) {
        this.items.push({
          release,
          episode: release.episodes[0],
          is_seen: false,
          datetime: new Date()
        })
      }

      // Filter: keep only last 7 days
      this.items = this.items.filter(
        item => (new Date(item.datetime).getTime() / 1000) + (60 * 60 * 24 * 7) > new Date().getTime() / 1000
      )

      // Sort descending by datetime
      this.items = this.items.sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
    },

    /**
     * Mark all notifications as seen
     */
    setSeen () {
      this.items = this.items.map(item => ({ ...item, is_seen: true }))
    },

    /**
     * Clear all notifications
     */
    clearNotifications () {
      this.items = []
    }
  },

  persist: true
})
