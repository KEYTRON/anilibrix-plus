<template>
  <div class="d-flex controls" :class="`controls--${direction}`">
    <v-btn icon variant="text" size="small" :disabled="isDisabled" class="controls__button" @click="$emit('click')">
      <v-icon size="28">mdi-chevron-{{ direction }}</v-icon>
    </v-btn>
  </div>
</template>

<script>

const props = {
  loading: {
    type: Boolean,
    default: false
  },
  value: {
    type: Number,
    default: null
  },
  left: {
    type: Boolean,
    default: false,
  },
  right: {
    type: Boolean,
    default: false,
  },
  releases: {
    type: Array,
    default: null
  }
}

export default {
  props,
  emits: ['click'],
  computed: {

    /**
     * Calculate direction
     *
     * @return {string|null}
     */
    direction () {

      if (this.left) return 'left'
      if (this.right) return 'right'

      return null
    },

    /**
     * Check if control is disabled
     *
     * @return {boolean}
     */
    isDisabled () {

      const is_loading = this.loading
      let is_extremum = false

      if (this.left) is_extremum = this.value <= 0
      if (this.right) is_extremum = this.value >= this.releases.length - 1

      return is_loading || is_extremum
    }

  }
}
</script>

<style scoped lang="scss">

.controls {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;

  &--left {
    left: 0;
    margin-left: 0;
  }

  &--right {
    right: 0;
    margin-right: 0;
  }

  &__button {
    color: rgba(255, 255, 255, 0.92);
  }
}

@media (max-width: 960px) {
  .controls {
    &--left {
      margin-left: 0;
    }

    &--right {
      margin-right: 0;
    }
  }
}

</style>
