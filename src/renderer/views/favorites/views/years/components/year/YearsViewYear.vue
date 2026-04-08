<template>
  <v-card flat color="transparent">

    <!-- Year -->
    <v-card-title :style="{cursor: 'pointer'}" @click="_setSettingsYearsCollapsed(year)">
      <span>{{ year }}</span>
      <v-divider class="mx-6"/>
      <v-btn icon color="grey" @click.stop="_setSettingsYearsCollapsed(year)">
        <v-icon>mdi-arrow-{{ collapsed ? 'down' : 'up' }}</v-icon>
      </v-btn>
    </v-card-title>

    <!-- Subtitle -->
    <v-card-subtitle v-text="subtitle" class="pb-0"/>
    <v-card-subtitle v-text="genres" class="pt-0"/>

    <!-- Releases -->
    <v-row v-if="!collapsed" dense>
      <template v-for="release in releases" :key="release.id">
        <v-col cols="3" lg="2">
          <release
            v-bind="{release}"
            @click="$emit('toRelease', release)">
          </release>
        </v-col>
      </template>
    </v-row>

  </v-card>
</template>

<script>

import Release from './../../../../components/release'

import pluralize from '@utils/strings/pluralize'
import { useFavoritesStore } from '@store/favorites/useFavoritesStore'

const props = {
  year: {
    type: String,
    default: null
  },
  releases: {
    type: Array,
    default: null
  }
}

export default {
  props,
  components: {
    Release
  },

  computed: {
    _years () { return useFavoritesStore().settings.years_collapsed },

    /**
     * Check if year is collapsed
     *
     * @return {boolean}
     */
    collapsed () {
      return (this._years || []).findIndex(year => year === this.year) > -1
    },

    /**
     * Get subtitle string
     *
     * @return {string}
     */
    subtitle () {
      return [this.items, this.episodes].join(', ')
    },

    /**
     * Get releases number
     *
     * @return {string}
     */
    items () {
      return pluralize((this.releases || []).length, this.$t('units.release'))
    },

    /**
     * Get episodes number
     *
     * @return {T | *}
     */
    episodes () {
      const episodes = (this.releases || [])
        .reduce((storage, release) => storage + (this.$__get(release, 'episodes') || []).length, 0)

      return pluralize(episodes, this.$t('units.episode'))

    },

    /**
     * Get genres
     *
     * @return {string}
     */
    genres () {
      const genres = (this.releases || [])
        .reduce((storage, release) => [...storage, ...(this.$__get(release, 'genres') || [])], [])

      return [...new Set(genres)]
        .sort((a, b) => a.localeCompare(b))
        .join(', ')
    }

  },

  methods: {
    _setSettingsYearsCollapsed (year) { useFavoritesStore().setSettingsYearsCollapsed(year) }
  }

}
</script>

