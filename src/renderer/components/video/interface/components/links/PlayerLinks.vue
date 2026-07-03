<template>
  <div class="player-links" ref="links">
    <template v-if="isMounted">

      <v-tooltip location="top" :text="$t('player.toReleases')">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon variant="text" size="large" @click="toReleases">
            <v-icon size="24">mdi-view-column</v-icon>
          </v-btn>
        </template>
      </v-tooltip>

      <v-tooltip location="top" :text="title">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon variant="text" size="large" @click="() => toRelease(release)">
            <img v-if="src" :src="src" alt="" class="player-links__avatar"/>
            <v-icon v-else size="24">mdi-image</v-icon>
          </v-btn>
        </template>
      </v-tooltip>

      <v-tooltip location="top" :text="$t('player.toCatalog')">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon variant="text" size="large" :to="{name: 'catalog'}">
            <v-icon size="24">mdi-folder-text-outline</v-icon>
          </v-btn>
        </template>
      </v-tooltip>

      <v-tooltip location="top" :text="$t('player.toFavorites')">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon variant="text" size="large" @click="() => toFavorites()">
            <v-icon size="24">mdi-star</v-icon>
          </v-btn>
        </template>
      </v-tooltip>

      <v-tooltip location="top" :text="$t('player.toEpisodes')">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon variant="text" size="large" @click="episodes().show()">
            <v-icon size="24">mdi-playlist-play</v-icon>
          </v-btn>
        </template>
      </v-tooltip>

      <v-tooltip v-if="source.type === 'torrent'" location="top" :text="$t('player.toTorrent')">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon variant="text" size="large" @click="torrent().show()">
            <v-icon size="20">mdi-file-table-box-multiple</v-icon>
          </v-btn>
        </template>
      </v-tooltip>

      <v-tooltip v-if="_opening_skip_button" location="top" :text="$t('player.openingSeek')">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon variant="text" size="large" @click="skipOpening">
            <span class="text-caption font-weight-bold">+{{ _opening_skip_time }}</span>
          </v-btn>
        </template>
      </v-tooltip>

    </template>
  </div>
</template>

<style scoped lang="scss">
.player-links {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;

  &__avatar {
    width: 24px;
    height: 24px;
    object-fit: cover;
    border-radius: 50%;
    display: block;
    flex-shrink: 0;
  }
}
</style>

<script>

import { useSettingsStore } from '@store/app/settings/useSettingsStore'
import { toFavorites, toRelease, toReleases } from '@utils/router/views/routerViews'
import screenfull from 'screenfull'

const props = {
  player: {
    type: Object,
    default: null
  },
  release: {
    type: Object,
    default: null
  },
  source: {
    type: Object,
    default: null
  },
  episodes: {
    type: Function,
    default: null
  },
  torrent: {
    type: Function,
    default: null
  },
  upscale: {
    type: Function,
    default: null
  }
}

export default {
  props,
  data () {
    return {
      isMounted: false
    }
  },
  computed: {
    _opening_skip_time () { return useSettingsStore().opening.skip_time },
    _opening_skip_button () { return useSettingsStore().opening.skip_button },

    /**
     * Get release poster src
     *
     * @return {string}
     */
    src () {
      return this.$__get(this.release, 'poster')
    },

    /**
     * Get title
     *
     * @return {string}
     */
    title () {
      return this.$__get(this.release, 'names.ru')
    }

  },
  methods: {
    toRelease (release) {
      screenfull.exit()
      return toRelease(release)
    },
    toReleases () {
      screenfull.exit()
      return toReleases()
    },
    toFavorites () {
      screenfull.exit()
      return toFavorites()
    },

    /**
     * Skip opening
     *
     * @return {void}
     */
    skipOpening () {
      this.$emit('set:time', this.player.currentTime + (this._opening_skip_time || 0))
    }
  },

  mounted () {

    // Set mounted state
    this.isMounted = true

  }
}
</script>
