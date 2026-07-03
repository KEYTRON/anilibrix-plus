<template>
  <v-list-item lines="two" ref="container" @click="$emit('click')">

    
    <template v-slot:prepend>
      <!-- Episode Progress -->
      <div class="d-flex align-center justify-center mr-4" :style="{width: '32px'}">
        <playing v-if="isPlaying"/>
        <watched v-else v-bind="{episode, release}"/>
      </div>
    </template>

    <template v-slot:title>
      <v-list-item-title v-text="title"/>
    </template>

    <template v-slot:subtitle>
      <v-list-item-subtitle>
        <span class="caption mr-2" v-if="time">{{ time }}</span>
        <quality v-bind="{episode}"/>
      </v-list-item-subtitle>
    </template>

    <template v-slot:append>
      <!-- Actions -->
      <actions v-bind="{episode, release, container}"/>
    </template>

  </v-list-item>
</template>

<script>

import Quality from './components/quality'
import Watched from './components/watched'
import Playing from './components/playing'
import Actions from './components/actions'
import dayjs from 'dayjs';

const props = {
  release: {
    type: Object,
    default: null
  },
  episode: {
    type: Object,
    default: null,
  },
  isPlaying: {
    type: Boolean,
    default: false,
  }
}

export default {
  props,
  components: {
    Quality,
    Watched,
    Playing,
    Actions,
  },
  data () {
    return {
      container: null
    }
  },

  mounted () {
    this.container = this.$refs.container.$el
  },

  methods: {
    formatTimestamp(time) {
      return dayjs.unix(time).format('DD.MM.YYYY HH:mm:ss')
    }
  },

  computed: {
    title() {
      return this.episode.title + (this.episode.sources.find(x => x.payload.playlist?.includes('/rutube/')) ? ' [RUTUBE] ' : '') + (this.episode.name ? ' — ' + this.episode.name : '')
    },

    time() {
      return this.episode.updated_at ? this.formatTimestamp(this.episode.updated_at) : null
    }
  }
}
</script>
