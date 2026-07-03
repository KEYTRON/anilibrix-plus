<template>
  <v-menu location="top">

    <!-- Quality -->
    <template v-slot:activator="{ props: menuProps }">
      <v-btn v-bind="menuProps" icon variant="text" size="large" :title="$t('player.quality') || 'Качество'">
        <v-icon size="24">{{ getSourceIcon(source) || 'mdi-quality-high' }}</v-icon>
      </v-btn>
    </template>

    <!-- Qualities -->
    <v-list density="compact" bg-color="#1e1e1e">
      <v-list-item
        v-for="(s, k) in sortedSources"
        :key="k"
        :active="s.alias === source.alias"
        @click="$emit('click', s)">
        <template v-slot:prepend>
          <v-icon class="mr-2" color="grey">{{ getSourceIcon(s) }}</v-icon>
        </template>
        <v-list-item-title>{{ s.label }}</v-list-item-title>
      </v-list-item>
    </v-list>

  </v-menu>
</template>

<script>

const props = {
  source: {
    type: Object,
    default: null
  },
  episode: {
    type: Object,
    default: null
  },
  attach: {
    type: HTMLDivElement,
    default: null
  }
}

export default {
  props,
  emits: ['click'],
  computed: {

    /**
     * Get sources from episode
     *
     * @return {array}
     */
    sources () {
      return this.$__get(this.episode, 'sources') || []
    },

    /**
     * Get upscale sources
     *
     * @return {array}
     */
    upscaleSources () {
      return (this.sources || []).filter(item => item.type === 'upscale')
    },

    /**
     * Get server sources
     *
     * @return {array}
     */
    serverSources () {
      return (this.sources || []).filter(item => item.type === 'server')
    },

    /**
     * Get torrent sources
     *
     * @return {array}
     */
    torrentSources () {
      return (this.sources || []).filter(item => item.type === 'torrent')
    },

    /**
     * Get sorted sources
     *
     * @return {array}
     */
    sortedSources () {
      return [
        ...this.upscaleSources,
        ...this.serverSources,
        ...this.torrentSources,
      ].filter(item => item)
    }

  },
  methods: {

    /**
     * Get source icon
     *
     * @param source
     * @return {string|null}
     */
    getSourceIcon (source) {

      const type = this.$__get(source, 'type')
      const alias = this.$__get(source, 'alias')

      if (alias === 'sd') return 'mdi-standard-definition'
      if (alias === 'hd') return 'mdi-high-definition'
      if (alias === 'fhd') return 'mdi-high-definition'
      if (alias === '2k') return 'mdi-ultra-high-definition'
      if (alias === '4k') return 'mdi-ultra-high-definition'
      if (type === 'torrent') return 'mdi-alpha-t'

      return null
    }

  },
}
</script>
