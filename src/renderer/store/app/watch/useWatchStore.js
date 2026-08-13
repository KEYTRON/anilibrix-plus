import __get from 'lodash/get'
import { defineStore } from 'pinia'
import { useReleaseStore } from '@store/release/useReleaseStore'

export const useWatchStore = defineStore('watch', {
  state: () => ({
    items: {},
    // Episode count "as of" the last watch interaction per release — freezes the
    // progress denominator so newly aired episodes don't retroactively shrink %.
    totals: {}
  }),

  getters: {
    /**
     * Get watched episode data for provided release and episode
     */
    getWatchedEpisode: state => ({ release_id, episode_id }) => {
      return __get(state, ['items', `${release_id}:${episode_id}`]) || null
    },

    /**
     * Get list of watched episodes that are marked as seen
     */
    getWatchedEpisodes: state => ({ release_id = 0, episodes = [] } = {}) => {
      const watchedEpisodes = []
      for (const ep of episodes) {
        const key = `${release_id}:${ep}`
        const episode = __get(state, ['items', key]) || null
        if (episode && episode.isSeen === true) watchedEpisodes.push(episode)
      }
      return watchedEpisodes
    },

    /**
     * Get release total progress percentage (only seen episodes)
     */
    getReleaseProgress: state => ({ release_id = 0, episodes = 0 } = {}) => {
      const watchedEpisodes = []
      for (const ep of episodes) {
        const key = `${release_id}:${ep}`
        const episode = __get(state, ['items', key]) || null
        if (episode && episode.isSeen === true) watchedEpisodes.push(episode)
      }
      const liveTotal = Array.isArray(episodes) ? episodes.length : 0
      const total = __get(state, ['totals', release_id]) || liveTotal
      return total > 0 ? (watchedEpisodes.length / total) * 100 : 0
    }
  },

  actions: {
    /**
     * Freeze the progress denominator at the release's current live episode
     * count, so episodes airing later don't shrink already-made progress.
     */
    _refreshReleaseTotal (release_id) {
      const releaseStore = useReleaseStore()
      const releaseData = releaseStore.data
      if (releaseData?.id === release_id && Array.isArray(releaseData.episodes)) {
        this.totals = { ...this.totals, [release_id]: releaseData.episodes.length }
      }
    },

    /**
     * Set episode watch data
     */
    setWatchedEpisode ({ time, release_id, episode_id, percentage }) {
      if (release_id > -1 && episode_id > -1) {
        const previouslyWatched = __get(this.items, `${release_id}:${episode_id}`) || null
        const data = {
          time,
          percentage,
          isSeen: false
        }

        const previouslySeenState = __get(previouslyWatched, 'isSeen') || null
        if (previouslySeenState !== true) {
          if (percentage >= 85) data.isSeen = true
        } else {
          data.isSeen = previouslySeenState
        }

        this.items = {
          ...this.items,
          [`${release_id}:${episode_id}`]: data
        }

        this._refreshReleaseTotal(release_id)
      }
    },

    /**
     * Remove watch data for a single episode
     */
    removeWatchedEpisode ({ release_id, episode_id }) {
      const items = { ...this.items }
      delete items[`${release_id}:${episode_id}`]
      this.items = items

      this._refreshReleaseTotal(release_id)
    },

    /**
     * Mark multiple episodes as watched
     */
    async setWatchedEpisodes ({ release_id, episodes }) {
      if (release_id && episodes && episodes.length > 0) {
        await Promise.allSettled(
          episodes.map(episode => {
            const episodeId = episode.id
            const watchedEpisode = __get(this.items, `${release_id}:${episodeId}`) || null
            const watchedEpisodeIsSeen = __get(watchedEpisode, 'isSeen') || false
            if (watchedEpisodeIsSeen !== true) {
              this.setWatchedEpisode({ release_id, episode_id: episodeId, percentage: 100 })
            }
          })
        )
      }
    },

    /**
     * Replace all watch data
     */
    replaceWatchedEpisodes ({ data }) {
      this.items = data
    },

    /**
     * Remove multiple watched episodes
     */
    async removeWatchedEpisodes ({ release_id, episodes }) {
      if (release_id && episodes && episodes.length > 0) {
        await Promise.allSettled(
          episodes.map(episode => {
            this.removeWatchedEpisode({ release_id, episode_id: episode.id })
          })
        )
      }
    }
  },

  // No persist config here previously — watch progress (and the "hours
  // watched" profile stat computed from it) never survived an app restart.
  persist: {
    pick: ['items', 'totals']
  }
})
