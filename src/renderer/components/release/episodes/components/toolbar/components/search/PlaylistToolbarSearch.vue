<template>
  <v-text-field
    variant="solo"
    density="compact"
    clearable
    hide-details
    prepend-inner-icon="mdi-magnify"
    class="playlist-search"
    :style="{ maxWidth: inputWidth }"
    :model-value="search"
    @update:model-value="$emit('update:search', $event)">
  </v-text-field>
</template>

<script>

const props = {
  search: {
    type: String,
    default: null
  }
}

export default {
  props,
  computed: {
    inputWidth() {
      if (!this.search) return '120px'
      // Use a generous pixel multiplier (15px per char) + padding (80px) 
      // so the input is always wider than the text, preventing scrolling 
      // until it hits the container's right edge (maxWidth: 100%).
      return `${Math.max(120, this.search.length * 15 + 80)}px`
    }
  }
}

</script>

<style scoped>
.playlist-search {
  /* No transition to prevent jerky scrolling when typing fast */
}
</style>
