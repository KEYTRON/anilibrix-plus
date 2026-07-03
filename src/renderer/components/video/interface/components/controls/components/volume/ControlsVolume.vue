<template>
  <div class="d-flex align-center shrink ga-2">

    <!-- Volume Mute -->
    <v-btn icon variant="text" size="large" @click="$emit('change', 0)">
      <v-icon size="24">mdi-volume-{{ getVolumeState }}</v-icon>
    </v-btn>

    <!-- Volume Level -->
    <v-slider
      hide-details
      :min="0"
      :max="1"
      :step="0.05"
      track-size="3"
      :model-value="volume"
      :style="{maxWidth: '90px', width: '90px'}"
      @update:model-value="$emit('change', $event)">
    </v-slider>

  </div>
</template>

<script>

const props = {
  player: {
    type: Object,
    default: null
  }
}

export default {
  props,
  emits: ['change'],
  data () {
    return {
      volume: .5,
    }
  },
  computed: {

    /**
     * Get volume state
     *
     * @return {string}
     */
    getVolumeState () {
      if (this.volume === 0) return 'off'
      if (this.volume <= .33) return 'low'
      if (this.volume > .33 && this.volume <= .66) return 'medium'
      if (this.volume > .66) return 'high'
    },

  },

  mounted () {

    // Set initial values
    this.volume = this.player.volume

    // Watch for player volume change
    // Update player interface
    this.player.on('volumechange', e => this.volume = this.player.volume)

  },

}
</script>
