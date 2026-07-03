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
      const stored = this.$__get(this.release, 'poster')
      if (!stored) return null

      try {
        // Notifications are persisted indefinitely, so `poster` may be an absolute
        // URL baked with a port from a previous app session (internal server picks
        // a new random port every launch) — always re-derive it against the
        // current live port instead of trusting the stored host/port.
        const url = new URL(stored)
        if (url.pathname === '/proxy-static') {
          const u = url.searchParams.get('url')
          // `u` is a relative path (e.g. "/storage/..."), so `new URL` needs a base
          const { pathname } = new URL(u, 'http://localhost')

          return getInternalServerUrl(`/proxy-static?url=${pathname}`)
        }
        return stored
      } catch (e) {
        return null
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
