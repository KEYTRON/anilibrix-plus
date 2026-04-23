<template>
  <div class="d-flex shrink">
    <v-skeleton-loader
      v-for="i in 14"
      boilerplate
      type="image"
      width="14.5vw"
      height="34.5vh"
      min-width="175"
      min-height="250"
      :key="i">
    </v-skeleton-loader>
  </div>
</template>
