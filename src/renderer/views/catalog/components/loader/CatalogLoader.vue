<template>
  <div class="d-flex align-start">

    <v-skeleton-loader boilerplate type="image" width="160" height="240"/>
    <div class="d-flex flex-column ma-4">
      <v-skeleton-loader boilerplate type="heading" width="400px" height="24px"/>
      <v-skeleton-loader boilerplate type="text" class="mt-3" width="140"/>
      <v-skeleton-loader boilerplate type="text" class="mt-1" width="240"/>
      <div class="d-flex mt-3">
        <v-skeleton-loader boilerplate type="button" width="100" class="mr-1"/>
        <v-skeleton-loader boilerplate type="button" width="65" class="mr-1"/>
        <v-skeleton-loader boilerplate type="button" width="160" class="mr-1"/>
        <v-skeleton-loader boilerplate type="button" width="125"/>
      </div>
      <v-skeleton-loader boilerplate type="text@3" width="100%" class="mt-5"/>
    </div>

  </div>
</template>
