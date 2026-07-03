<template>
  <div class="release__slider" v-if="loading || releases.length > 0">

    <!-- Prev -->
    <control :loading="loading" :value="modelValue" :releases="releases" left @click="$emit('previous')"/>

    <!-- Posters -->
    <div class="release__slider-viewport">
      <loader v-if="loading"/>
      <div
        v-else
        class="release__slider-track"
        :style="trackStyle">
        <poster
          v-for="(release, k) in releases"
          :key="release.id || k"
          :release="release"
          :active="modelValue === k"
          @click="$emit('update:modelValue', k)"
          @dblclick="$emit('toVideo')">
        </poster>
      </div>
    </div>


    <!-- Next -->
    <control :loading="loading" :value="modelValue" :releases="releases" right @click="$emit('next')"/>

  </div>
</template>

<script>

import Loader from './components/loader'
import Poster from './components/poster'
import Control from './components/control'

const props = {
  modelValue: {
    type: Number,
    default: null
  },
  releases: {
    type: Array,
    default: null
  },
  loading: {
    type: Boolean,
    default: true,
  }
}

export default {
  props,
  components: {
    Loader,
    Poster,
    Control,
  },
  data () {
    return {
      windowWidth: window.innerWidth,
    }
  },
  mounted () {
    this._onResize = () => { this.windowWidth = window.innerWidth }
    window.addEventListener('resize', this._onResize)
  },
  beforeUnmount () {
    window.removeEventListener('resize', this._onResize)
  },
  computed: {
    posterWidth () {
      // Must match the CSS `max(14.5vw, 175px)` (`140px` under the 960px breakpoint)
      // poster width *exactly* (no rounding) — otherwise each translate3d step drifts
      // a fraction of a pixel away from where the posters actually sit, and the gap
      // compounds with every slide.
      const floor = this.windowWidth <= 960 ? 140 : 175
      return Math.max(floor, this.windowWidth * 0.145)
    },
    trackStyle () {
      const activeIndex = Number.isInteger(this.modelValue) ? this.modelValue : 0
      const offset = 8 - (activeIndex * this.posterWidth)
      return {
        transform: `translate3d(${offset}px, 0, 0)`
      }
    }
  },
}

</script>

<style scoped lang="scss">

.release__slider {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 268px;

  &-viewport {
    position: relative;
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    padding: 4px 28px 8px 30px;
  }

  &-track {
    display: flex;
    align-items: flex-start;
    gap: 0;
    width: max-content;
    transition: transform 0.28s ease;
    will-change: transform;
  }
}

@media (max-width: 960px) {
  .release__slider {
    min-height: 220px;

    &-viewport {
      padding: 4px 20px 8px 24px;
    }
  }
}

</style>
