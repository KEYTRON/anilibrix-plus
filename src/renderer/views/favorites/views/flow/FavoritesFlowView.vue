<template>
  <v-row dense>
    <template v-for="release in releases" :key="release.id">
      <v-col cols="3" lg="2">
        <release
          v-bind="{release}"
          @click="$emit('toRelease', release)">
        </release>
      </v-col>
    </template>
  </v-row>
</template>

<script>

import Release from './../../components/release'

const props = {
  releases: {
    type: Array,
    default: null
  }
}

export default {
  props,
  components: {
    Release,
  }
}
</script>
