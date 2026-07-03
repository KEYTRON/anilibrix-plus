<template>
  <div class="slider-loader">
    <v-skeleton-loader
      v-for="i in 14"
      boilerplate
      type="image"
      width="118"
      height="176"
      class="slider-loader__item"
      :key="i">
    </v-skeleton-loader>
  </div>
</template>

<style scoped lang="scss">

.slider-loader {
  display: flex;
  gap: 14px;
  width: max-content;
}

</style>
