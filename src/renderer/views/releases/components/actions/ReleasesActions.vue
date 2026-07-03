<template>
  <loader v-if="loading || !release"/>
  <div class="release-actions" v-else>

    <!-- Show video -->
    <!-- Show release -->
    <v-btn
      variant="elevated"
      color="grey-darken-3"
      rounded="lg"
      class="release-actions__button me-3"
      @click="$emit('toVideo')">
      {{ $t('releasesView.watch') }}
    </v-btn>
    <v-btn
      variant="elevated"
      color="grey-darken-3"
      rounded="lg"
      class="release-actions__button"
      @click="$emit('toRelease')">
      {{ $t('common.release') }}
    </v-btn>

  </div>
</template>

<script>

import Loader from './components/loader'

const props = {
  loading: {
    type: Boolean,
    default: false
  },
  release: {
    type: Object,
    default: null
  }
}
export default {
  props,
  emits: ['toVideo', 'toRelease'],
  components: {
    Loader,
  },
}
</script>

<style scoped lang="scss">

.release-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &__button {
    min-width: 0;
    height: 42px;
    padding-left: 25px !important;
    padding-right: 25px !important;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    font-size: 1rem;
    color: #fff !important;
  }
}

</style>
