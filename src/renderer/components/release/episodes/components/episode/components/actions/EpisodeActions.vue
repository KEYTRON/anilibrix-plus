<template>
  <div>

    <v-menu
      v-model="visible"
      location="bottom end"
      close-on-click
      ref="menu"
      :attach="container">

      <template v-slot:activator="{ props }">
        <v-btn icon variant="text" size="small" v-bind="props">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list dense class="grey darken-4">
        <template v-for="(item, k) in actions" :key="k">
          <v-divider v-if="k > 0"/>
          <v-list-item :disabled="loading" @click.stop="item.action">

            <!-- Icon -->
            <template v-slot:prepend>
              <v-icon color="grey">{{ item.icon }}</v-icon>
            </template>

            <!-- Item -->
            <v-list-item-title>{{ item.title }}</v-list-item-title>

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
  episode: {
    type: Object,
    default: null
  },
  container: {
    type: HTMLDivElement,
    default: null,
  }
}

export default {
  props,
  data () {
    return {
      loading: false,
      visible: false,
    }
  },
  computed: {

    actions () {
      return [
        {
          icon: 'mdi-check',
          title: this.$t('release.markEpisodeSeen'),
          action: this.setWatched,
          visible: true,
        },
        {
          icon: 'mdi-close',
          title: this.$t('release.unmarkEpisodeSeen'),
          action: this.removeWatched,
          visible: true,
        }
      ].filter(item => item.visible)
    }

  },

  methods: {
    /**
     * Set episode watch data
     *
     * @return {Promise<void>}
     */
    async setWatched () {

      // Get data for watched episode action
      // Prepare payload
      const release_id = this.release.id
      const episode_id = this.episode.id
      const payload = {
        release_id,
        episode_id,
        percentage: 100
      }

      // Set watched episode data
      await useWatchStore().setWatchedEpisode(payload)

      // Deactivate menu
      this.visible = false
    },

    /**
     * Remove watch package data
     *
     * @return {Promise<void>}
     */
    async removeWatched () {

      // Remove watch data
      const release_id = this.release.id
      const episode_id = this.episode.id
      const payload = {
        release_id,
        episode_id
      }

      await useWatchStore().removeWatchedEpisode(payload)

      // Deactivate menu
      this.visible = false
    }

  }
}
</script>
