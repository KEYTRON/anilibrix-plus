<script>

// Utils
import { meta } from '@package'
import { toVideo } from '@utils/router/views/routerViews'
import { useSettingsStore } from '@store/app/settings/useSettingsStore'
import { useNotificationsStore } from '@store/notifications/useNotificationsStore'
import { useFavoritesStore } from '@store/favorites/useFavoritesStore'

// Handlers
import { sendAppDockNumberEvent } from '@main/handlers/app/app-handlers'
import { catchReleaseNotification } from '@main/handlers/notifications/notifications-handler'

export default {
  render: () => null,
  computed: {
    _items () {
      return useNotificationsStore().items
    },
    _notifications () {
      return useSettingsStore().notifications.system
    },
    _filter_notify () {
      return useSettingsStore().filter_notify
    },

    /**
     * Get unseen notifications
     *
     * @return {number}
     */
    unseen () {
      return this._items.filter(item => item.is_seen === false).length
    }

  },

  created () {
    catchReleaseNotification((release => {

      // Check if release is set
      // Check if system notifications is enabled
      if (release && this._notifications === true) {
        if (this._filter_notify && !useFavoritesStore().isInFavorite(release)) return

        // Show notification
        const episode = release.episodes[0]
        const title = episode ? episode.title : null
        const poster = release.poster
        const name = release.names.ru

        if (title && name) {

          // Set notification name
          require('@electron/remote').app.setAppUserModelId(meta.name)

          // Create notification
          // If the user clicks in the Notifications Center, show the app
          const notification = new window.Notification(title, {
            body: name,
            icon: poster
          })
          notification.onclick = () => toVideo(release, episode)

        }
      }

    }))
  },

  watch: {
    unseen: {
      immediate: true,
      handler (unseen) {
        sendAppDockNumberEvent(unseen)
      }
    }
  }

}
</script>
