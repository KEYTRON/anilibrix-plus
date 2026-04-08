// Proxy
import ReleaseProxy from '@proxies/release'

// Transformers
import ReleaseTransformer from '@transformers/release'
import EpisodesTransformer from '@transformers/episode'

// Utils
import axios from 'axios'
import { getLocale, translate } from '@/renderer/i18n'

// Handlers
import { showAppError } from '@main/handlers/notifications/notifications-handler'

import { defineStore } from 'pinia'

// Module-level cancel token
let REQUEST = null

export const useReleaseStore = defineStore('release', {
  state: () => ({
    data: null,
    loading: false
  }),

  actions: {
    /**
     * Get release data
     */
    async getRelease (releaseId) {
      // Cancel previous request if it was stored
      if (REQUEST !== null) REQUEST.cancel()

      // Reset data, set loading
      this.data = null
      this.loading = true

      REQUEST = axios.CancelToken.source()

      try {
        const data = await new ReleaseProxy().getRelease(releaseId, { cancelToken: REQUEST.token })
        const release = await new ReleaseTransformer().fetchItem(data)

        release.poster = new ReleaseProxy().getReleasePosterPath(release.poster)
        release.episodes = await new EpisodesTransformer().fetchItem(release.episodes)

        this.data = release
      } catch (error) {
        if (!axios.isCancel(error)) {
          showAppError(translate('errors.genericLoadRelease', {}, getLocale()))
        }
      } finally {
        this.loading = false
      }
    }
  }
})
