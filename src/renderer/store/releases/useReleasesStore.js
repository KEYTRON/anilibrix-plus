// Proxy
import ReleaseProxy from '@proxies/release'

// Transformers
import SearchTransformer from '@transformers/search'
import ReleaseTransformer from '@transformers/release'
import EpisodesTransformer from '@transformers/episode'

// Utils
import axios from 'axios'
import { getLocale, translate } from '@/renderer/i18n'

// Handlers
import { sendReleaseNotification, showAppError } from '@main/handlers/notifications/notifications-handler'

import { defineStore } from 'pinia'

// Module-level cancel tokens
let REQUEST_FOR_SEARCH = null
let REQUEST_FOR_RELEASES = null

async function transformAndProcessReleases (items) {
  const transformer = new ReleaseTransformer()
  const proxy = new ReleaseProxy()

  let releases = transformer.fetchCollection(items)

  /* Start m3u8 rewrite */
  for (const release of releases) {
    const { playlist } = release

    for (const ep in playlist) {
      if (playlist[ep].sources.is_rutube) {
        playlist[ep].fullhd = 'http://localhost:' + global.internalServerPort + '/rutube/' + playlist[ep].rutube_id + '/main.m3u8'
      } else {
        const { sd, hd, fullhd } = playlist[ep]

        if (fullhd) {
          playlist[ep].fullhd = 'http://localhost:' + global.internalServerPort + '/hls/' + encodeURIComponent(playlist[ep].fullhd)
        }

        if (hd) {
          playlist[ep].hd = 'http://localhost:' + global.internalServerPort + '/hls/' + encodeURIComponent(playlist[ep].hd)
        }

        if (sd) {
          playlist[ep].sd = 'http://localhost:' + global.internalServerPort + '/hls/' + encodeURIComponent(playlist[ep].sd)
        }
      }
    }
  }
  /* End m3u8 rewrite */

  releases = releases
    .map(release => ({
      ...release,
      poster: proxy.getReleasePosterPath(release.poster)
    }))
    .sort((a, b) => new Date(b.datetime.system) - new Date(a.datetime.system))

  const episodesTransformer = new EpisodesTransformer({
    cancelToken: REQUEST_FOR_RELEASES.token
  })

  const processedReleases = await Promise.allSettled(
    releases.map(async release => ({
      ...release,
      episodes: await episodesTransformer.fetchItem(release.episodes)
    }))
  )

  return processedReleases
    .filter(promise => promise.status === 'fulfilled')
    .map(promise => promise.value)
    .filter(release => release.episodes.length > 0)
}

export const useReleasesStore = defineStore('releases', {
  state: () => ({
    data: [],
    index: null,
    loading: false,
    datetime: null,
    has_error: false
  }),

  actions: {
    /**
     * Set slider index
     */
    setIndex (index) {
      this.index = index
    },

    /**
     * Get all releases
     */
    async getReleases () {
      try {
        this.loading = true
        this.has_error = false

        if (await global.apiCacheService.initialize() === 'already_initialized') {
          await global.apiCacheService.downloadCache()
          await global.apiCacheService.processCache()
        }

        if (REQUEST_FOR_RELEASES) {
          REQUEST_FOR_RELEASES.cancel()
        }

        REQUEST_FOR_RELEASES = axios.CancelToken.source()

        const { items } = await new ReleaseProxy().getReleases({
          cancelToken: REQUEST_FOR_RELEASES.token
        })

        const releases = await transformAndProcessReleases(items)

        await this._handleNewReleaseNotifications(releases)

        this.data = releases
        this.datetime = new Date()
      } catch (error) {
        if (!axios.isCancel(error)) {
          this.has_error = true
          console.log(error)
          showAppError(translate('errors.genericLoadReleases', {}, getLocale()))
        }
      } finally {
        this.loading = false
      }
    },

    /**
     * Handle new release notifications (internal helper)
     */
    async _handleNewReleaseNotifications (releases) {
      if (!this.data || this.data.length === 0) return

      const { useNotificationsStore } = await import('../notifications/useNotificationsStore')
      const notificationsStore = useNotificationsStore()

      const newReleases = releases.filter(release => {
        const previousRelease = this.data.find(
          item => item.id === release.id && item.episodes.length === release.episodes.length
        )
        return previousRelease === null
      })

      for (const release of newReleases) {
        sendReleaseNotification(release)
        notificationsStore.setRelease(release)
      }
    },

    /**
     * Search releases
     */
    async searchReleases (searchQuery) {
      try {
        if (REQUEST_FOR_SEARCH) REQUEST_FOR_SEARCH.cancel()
        REQUEST_FOR_SEARCH = axios.CancelToken.source()

        const response = await new ReleaseProxy().searchReleases(searchQuery, {
          cancelToken: REQUEST_FOR_SEARCH.token
        })

        return new SearchTransformer()
          .fetchCollection(response || [])
          .map(release => ({
            ...release,
            poster: new ReleaseProxy().getReleasePosterPath(release.poster)
          }))
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.log(error)
          showAppError(translate('errors.genericSearchReleases', {}, getLocale()))
          return []
        }
      }
    }
  }
})
