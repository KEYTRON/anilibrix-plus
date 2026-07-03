<template>
  <v-navigation-drawer
    v-model="visible"
    location="left"
    temporary
    width="400"
    color="#1a1a1a"
    :style="{zIndex: 100}">

    <!-- Episodes -->
    <v-card color="transparent" flat>
      <v-card-title>{{ $t('common.episodes') }}</v-card-title>
      <v-card-subtitle>{{ $t('player.toEpisodes') }}</v-card-subtitle>
      <episodes
        v-bind="{release, episodes}"
        class="pa-4"
        :playing="episode"
        @episode="onEpisodeClick">
      </episodes>
    </v-card>

  </v-navigation-drawer>
</template>

<script>

import Episodes from '@components/release/episodes'
import { toVideo } from '@utils/router/views/routerViews'

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
  components: {
    Episodes,
  },

  data () {
    return {
      visible: false,
    }
  },

  computed: {

    /**
     * Get episodes
     *
     * @return {*|*[]}
     */
    episodes () {
      return this.$__get(this.release, 'episodes') || []
    }

  },

  methods: {

    /**
     * Show playlist
     *
     * @return void
     */
    show () {
      this.visible = true
    },

    /**
     * Close drawer and navigate to clicked episode
     *
     * @param episode
     */
    onEpisodeClick (episode) {
      this.visible = false
      toVideo(this.release, episode)
    },

  }

}
</script>
