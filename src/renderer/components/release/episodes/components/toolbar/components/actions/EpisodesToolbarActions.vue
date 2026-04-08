<template>
  <div>

    <v-btn id="episodes__actions" height="48">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>

    <v-menu bottom left activator="#episodes__actions" :attach="container">
      <v-list dense class="grey darken-4">
        <template v-for="(item, k) in actions">
          <v-divider v-if="k > 0" :key="`d:${k}`"/>
          <v-list-item :key="k" :disabled="loading" @click="item.action">

            <!-- Icon -->
            <v-icon class="mr-2">{{ item.icon }}</v-icon>

            <!-- Item -->
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </template>
      </v-list>
    </v-menu>

  </div>
</template>

<script>

import { useWatchStore } from '@store/app/watch/useWatchStore'

const props = {
  release: {
    type: Object,
    default: null
  },
}

export default {
  props,
  data () {
    return {
      loading: false,
      container: null,
    }
  },
  computed: {

    actions () {
      return [
        {
          icon: 'mdi-check',
          title: this.$t('release.markAllSeen'),
          action: this.setWatched,
        },
        {
          icon: 'mdi-close',
          title: this.$t('release.unmarkAllSeen'),
          action: this.removeWatched,
        }
      ]
    }

  },

  methods: {
    /**
     * Set watch package data
     *
     * @return {Promise<void>}
     */
    async setWatched () {
      this.loading = true

      const release_id = this.release.id
      const episodes = this.release.episodes || []
      const payload = {
        release_id,
        episodes
      }

      await useWatchStore().setWatchedEpisodes(payload)

      this.loading = false
    },

    /**
     * Remove watch package data
     *
     * @return {Promise<void>}
     */
    async removeWatched () {
      this.loading = true

      const release_id = this.release.id
      const episodes = this.release.episodes || []
      const payload = {
        release_id,
        episodes
      }

      await useWatchStore().removeWatchedEpisodes(payload)

      this.loading = false
    },

  },

  mounted () {
    this.container = document.getElementById('playlist')
  }

}
</script>
