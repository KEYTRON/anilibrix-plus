<template>
  <v-icon v-if="isSeen" color="success">mdi-check-circle</v-icon>
  <v-icon v-else color="grey darken-2">mdi-circle-outline</v-icon>
</template>

<script>

import { useWatchStore } from '@store/app/watch/useWatchStore'

const props = {
  release: {
    type: Object,
    default: null
  },
  episode: {
    type: Object,
    default: null
  }
}

export default {
  props,
  computed: {

    /**
     * Get watch data
     *
     * @return {*}
     */
    watch () {
      if (this.release && this.episode) {
        const release_id = this.release.id
        const episode_id = this.episode.id
        return useWatchStore().getWatchedEpisode({ release_id, episode_id })
      }
    },

    /**
     * Check if episode is seen
     *
     * @return {boolean}
     */
    isSeen () {
      return this.$__get(this.watch, 'isSeen') || false
    }

  }
}
</script>
