<template>
  <div
    class="slider-poster"
    :class="{'slider-poster--active': active}"
    @click="$emit('click')"
    @dblclick="$emit('dblclick')">
    <img v-if="src" :key="key" :src="src" :alt="title" class="slider-poster__image"/>
    <div v-if="!active" class="slider-poster__overlay"></div>
  </div>
</template>

<script>

const props = {
  release: {
    type: Object,
    default: null
  },
  active: {
    type: Boolean,
    default: false
  }
}

export default {
  props,
  emits: ['click', 'dblclick'],
  computed: {

    /**
     * Get get
     *
     * @return {string}
     */
    key () {
      return `poster:${this.release ? this.release.id : null}`
    },

    /**
     * Get poster full src
     *
     * @return {string|null}
     */
    src () {
      return this.$__get(this.release, 'poster')
    },

    /**
     * Get title
     *
     * @return {string}
     */
    title () {
      return this.$__get(this.release, 'names.ru') || ''
    }

  }
}
</script>

<style scoped lang="scss">

.slider-poster {
  width: max(14.5vw, 175px);
  height: max(34.5vh, 250px);
  border-radius: 2px;
  overflow: hidden;
  background: #000;
  border: none;
  cursor: pointer;
  transform: scale(0.94);
  opacity: 0.84;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease, opacity 0.22s ease, filter 0.22s ease;
  filter: brightness(0.46) saturate(0.82);

  &--active {
    transform: scale(1);
    opacity: 1;
    filter: none;
    box-shadow: none;
  }

  &__image {
    width: 100%;
    height: 100%;
    background: #000;
    object-fit: cover;
    display: block;
  }

  &__overlay {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.82);
  }
}

@media (max-width: 960px) {
  .slider-poster {
    width: max(14.5vw, 140px);
    height: max(34.5vh, 200px);
  }
}

</style>
