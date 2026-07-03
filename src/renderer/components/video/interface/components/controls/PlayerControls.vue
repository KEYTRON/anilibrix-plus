<template>
  <div class="d-flex align-center justify-end ga-2" ref="controls">
    <template v-if="is_mounted">

      <!-- Volume -->
      <volume v-bind="{player}" @change="$emit('set:volume', $event)"/>

      <!-- Quality -->
      <quality v-if="source" v-bind="{episode, source}" @click="$emit('set:source', $event)"/>

      <!-- Speed -->
      <speed v-bind="{player}" @click="$emit('set:speed', $event)"/>

      <!-- PIP -->
      <v-tooltip location="top">
        <template v-slot:activator="{ props: tooltipProps }">
          <v-btn v-bind="tooltipProps" icon variant="text" size="large" @click="$emit('toggle:pip')">
            <v-icon size="22">mdi-picture-in-picture-bottom-right</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('player.pip') || 'Picture-in-Picture' }}</span>
      </v-tooltip>

      <!-- Fullscreen -->
      <v-tooltip location="top">
        <template v-slot:activator="{ props: tooltipProps }">
          <v-btn v-bind="tooltipProps" icon variant="text" size="large" @click="$emit('toggle:fullscreen')">
            <v-icon size="28">mdi-fullscreen</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('player.fullscreen') || 'Полный экран' }}</span>
      </v-tooltip>

    </template>
  </div>
</template>

<script>

import Speed from './components/speed'
import Volume from './components/volume'
import Quality from './components/quality'

const props = {
  player: {
    type: Object,
    default: null
  },
  source: {
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
  emits: ['set:volume', 'set:source', 'set:speed', 'toggle:pip', 'toggle:fullscreen'],
  components: {
    Speed,
    Volume,
    Quality,
  },

  data () {
    return {
      is_mounted: false
    }
  },

  mounted () {
    this.is_mounted = true
  },

}

</script>
