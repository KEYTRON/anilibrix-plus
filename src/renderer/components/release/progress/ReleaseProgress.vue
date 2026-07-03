<template>

  <!-- Compact pill badge, sized like the toolbar nav pills (rounded, fixed height) -->
  <div
    v-if="compact"
    class="release__progress release__progress--compact"
    :class="trackColorClass">
    <span v-if="!loading && showNumbers" class="caption white--text font-weight-bold">
      <span v-if="isComplete">{{ $t('release.progressAllWatched', { total }) }}</span>
      <span v-else-if="isUnseen">{{ $t('release.progressNone', { episodes: episodes.length, total }) }}</span>
      <span v-else>{{ $t('release.progressPartial', { watched, episodes: episodes.length, total }) }}</span>
    </span>
  </div>

  <!-- Full-width proportional bar -->
  <v-progress-linear
    v-else
    v-bind="{height}"
    :color="isComplete ? '#2e7d32' : (isUnseen ? '#424242' : '#c62828')"
    class="release__progress"
    :class="{square}"
    bg-color="#212121"
    bg-opacity="1"
    :model-value="progress"
    :indeterminate="loading">

    <template v-if="!loading && showNumbers" v-slot:default>
      <div class="release__progress__description caption white--text font-weight-bold px-4 ellipsis-container">
        <!-- Complete All Episodes -->
        <span v-if="isComplete" class="ellipsis-text">
          <span v-if="!dense">{{ $t('release.progressAllWatched', { total }) }}</span>
          <span v-else>{{ $t('release.progressAllWatchedDense', { total }) }}</span>
        </span>

        <!-- Not seen episodes -->
        <span v-else-if="isUnseen" class="ellipsis-text">
          <span v-if="!dense">{{ $t('release.progressNone', { episodes: episodes.length, total }) }}</span>
          <span v-else>{{ $t('release.progressNoneDense', { episodes: episodes.length, total }) }}</span>
        </span>

        <!-- Episodes Progress -->
        <span v-else class="ellipsis-text">
          <span v-if="!dense">{{ $t('release.progressPartial', { watched, episodes: episodes.length, total }) }}</span>
          <span v-else>{{ $t('release.progressPartialDense', { watched, episodes: episodes.length, total }) }}</span>
        </span>

      </div>
    </template>

  </v-progress-linear>
</template>

<script>

import pluralize from '@utils/strings/pluralize'
import { useWatchStore } from '@store/app/watch/useWatchStore'

const props = {
  release: {
    type: Object,
    default: null
  },
  episodes: {
    type: Array,
    default: null
  },
  totalEpisodes: {
    type: String,
    default: ''
  },
  showNumbers: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    default: 'secondary'
  },
  height: {
    type: [Number, String],
    default: '25'
  },
  dense: {
    type: Boolean,
    default: false
  },
  center: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  square: {
    type: Boolean,
    default: false
  },
  compact: {
    type: Boolean,
    default: false
  }
}

export default {
  props,
  computed: {
    total () {
      const totalValue = this.totalEpisodes
        .replace('(0)', '(?)')
        .replace(/^(\d+)$/, '($1)')
        .replace(/^\d+\-(\d+)$/, '($1)')
      return totalValue && this.totalEpisodes !== 'null' ? ' ' + totalValue : ''
    },

    /**
     * Calculate total seen progress
     *
     * @return {*}
     */
    progress () {
      const release_id = this.release.id
      const episodes = (this.episodes || []).map(x => x.id)
      const payload = {
        release_id,
        episodes
      }

      return useWatchStore().getReleaseProgress(payload)

    },

    /**
     * Get watched episodes
     *
     * @return {*}
     */
    watched () {
      const release_id = this.release.id

      const episodes = (this.episodes || []).map(x => x.id)
      const payload = {
        release_id,
        episodes
      }

      // Get watched episodes
      // Convert to string with suffix
      const watched_episodes = useWatchStore().getWatchedEpisodes(payload)
      return pluralize(watched_episodes.length, this.$t('units.episode'))

    },

    /**
     * Check if release is fully watched
     *
     * @return {boolean}
     */
    isComplete () {
      return this.progress === 100
    },

    /**
     * Check if release is not seen
     *
     * @return {boolean}
     */
    isUnseen () {
      return this.progress === 0
    },

    /**
     * Background color class for the compact pill (matches the bar's state colors)
     *
     * @return {string}
     */
    trackColorClass () {
      return this.isComplete ? 'bg-green-darken-4' : (this.isUnseen ? 'bg-grey-darken-3' : 'bg-red-darken-1')
    }

  }
}
</script>

<style lang="scss" scoped>

.release__progress {
  cursor: default;
  border-radius: 4px !important;
  transition: height 0s;

  &.square {
    border-radius: 0 !important;
  }

  &--compact {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    height: 34px;
    border-radius: 999px !important;
    padding: 0 16px;
    line-height: 1;
  }

  &__description {
    left: 0;
    position: absolute;
    width: 100%;
    overflow: hidden;

    .ellipsis-text {
      display: block;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

</style>
