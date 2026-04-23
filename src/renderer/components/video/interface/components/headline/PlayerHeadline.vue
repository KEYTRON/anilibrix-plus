<template>
  <div class="d-flex align-content-end justify-space-between" :style="{lineHeight: 1}">

    <description v-bind="{release, episode}"/>
    <duration v-bind="{player}"/>

  </div>
</template>

<script>

import Duration from './components/duration'
import Description from './components/description'

const props = {
  player: {
    type: Object,
    default: null
  },
  release: {
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
  components: {
    Duration,
    Description
  }
}

</script>
