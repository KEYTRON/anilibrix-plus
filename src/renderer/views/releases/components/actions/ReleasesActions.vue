<template>
  <loader v-if="loading"/>
  <div class="d-flex shrink" v-else>

    <!-- Show video -->
    <!-- Show release -->
    <v-btn class="mr-1" @click="$emit('toVideo')">{{ $t('releasesView.watch') }}</v-btn>
    <v-btn class="mr-1" @click="$emit('toRelease')">{{ $t('common.release') }}</v-btn>

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
  components: {
    Loader,
  },
}
</script>
