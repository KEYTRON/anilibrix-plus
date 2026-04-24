<template>
  <v-list-item v-on:click="toVideo(release, episode)">
    <!-- Avatar -->
    <template v-slot:prepend><v-avatar>
      <v-img :transition="false" v-bind="{src}"/>
    </v-avatar></template>

    <!-- Content -->
    
      <v-list-item-title v-text="name"/>
      <v-list-item-subtitle>{{ $t('toolbar.notificationEpisode', { episodeNumber }) }}</v-list-item-subtitle>
      <v-list-item-subtitle v-text="datetime" class="grey--text text--darken-2"/>
    

  </v-list-item>
</template>

<script>

import { toVideo } from '@utils/router/views/routerViews'
import { getInternalServerUrl } from '@utils/internalServer'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const props = {
  notification: {
    type: Object,
    default: null
  }
}

export default {
  props,
  computed: {

    /**
     * Get release
     *
     * @return {*}
     */
    release () {
      return this.$__get(this.notification, 'release')
    },

    /**
     * Get episode
     *
     * @return {*}
     */
    episode () {
      return this.$__get(this.notification, 'episode')
    },

    /**
     * Get release poster src
     *
     * @return {*}
     */
    src () {
      const url = new URL(this.$__get(this.release, 'poster'))
      if (url.pathname === '/proxy-static') {
        const u = url.searchParams.get('url')
        const { pathname } = new URL(u)

        return getInternalServerUrl(`/proxy-static?url=${pathname}`)
      }
    },

    /**
     * Get release name
     *
     * @return {*}
     */
    name () {
      return this.$__get(this.release, 'names.ru')
    },

    /**
     * Get episode number
     *
     * @return {*}
     */
    episodeNumber () {
      return this.$__get(this.episode, 'id')
    },

    /**
     * Get datetime
     *
     * @return {string}
     */
    datetime () {
      return dayjs(this.notification.datetime).fromNow()
    }

  },

  methods: {
    toVideo (release, episode) { toVideo(release, episode) },
  }
}
</script>
